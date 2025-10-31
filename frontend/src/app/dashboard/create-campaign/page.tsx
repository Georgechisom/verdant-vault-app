"use client";

import { useEffect, useMemo, useState } from "react";
import { useVerdantVault } from "../../../hooks/useVerdantVault";
import { useWaitForTransactionReceipt } from "wagmi";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type CropType = "Maize" | "Rice" | "Cassava" | "Beans";

const CROP_FACTORS: Record<CropType, number> = {
  Maize: 10,
  Rice: 8,
  Cassava: 6,
  Beans: 5,
};

export default function CreateCampaign() {
  const { createCampaign, hash, isPending } = useVerdantVault();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });
  console.log({hash})

  const [form, setForm] = useState({
    farmName: "",
    location: "",
    hectares: "",
    cropType: "" as "" | CropType,
    description: "",
    fundingGoalHBAR: "",
    durationDays: "",
  });

  const [files, setFiles] = useState<{
    photos: File[];
    documents: File[];
  }>({
    photos: [],
    documents: [],
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Computed CO2 = hectares * crop factor * (durationDays / 365)
  const estimatedCO2 = useMemo(() => {
    const hectares = parseFloat(form.hectares || "0");
    const durationDays = parseFloat(form.durationDays || "0");
    const factor = form.cropType ? CROP_FACTORS[form.cropType] : 0;
    const years = durationDays > 0 ? durationDays / 365 : 0;
    const tons = hectares * factor * years;
    if (!isFinite(tons)) return "0";
    return tons.toFixed(2);
  }, [form.hectares, form.durationDays, form.cropType]);

  useEffect(() => {
    if (isSuccess) {
      // Reset form after on-chain success
      setForm({
        farmName: "",
        location: "",
        hectares: "",
        cropType: "",
        description: "",
        fundingGoalHBAR: "",
        durationDays: "",
      });
      setFiles({ photos: [], documents: [] });
      alert(`Campaign created successfully! Tx: ${hash}`);
    }
  }, [isSuccess, hash]);

  const onChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSelectCrop = (value: string) => {
    setForm((prev) => ({ ...prev, cropType: value as CropType }));
  };

  const onFiles =
    (key: "photos" | "documents") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = Array.from(e.target.files || []);
      setFiles((prev) => ({ ...prev, [key]: list }));
    };

  async function uploadMetadataAndFiles() {
    const metadata = {
      farmName: form.farmName,
      location: form.location,
      hectares: Number(form.hectares || 0),
      cropType: form.cropType || null,
      description: form.description,
      fundingGoalHBAR: Number(form.fundingGoalHBAR || 0),
      durationDays: Number(form.durationDays || 0),
      estimatedCO2Tons: Number(estimatedCO2 || 0),
      schema: "verdant-vault.campaign.v1",
    };

    const fd = new FormData();
    fd.append("metadata", JSON.stringify(metadata));
    // Attach files
    files.photos.forEach((f) => fd.append("files", f));
    files.documents.forEach((f) => fd.append("files", f));

    setUploading(true);
    try {
      const res = await fetch("/api/ipfs/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "IPFS upload failed");
      }
      const json = (await res.json()) as { cid: string };
      if (!json?.cid) {
        throw new Error("No CID returned from upload endpoint");
      }
      return json.cid as string;
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation aligned to PRD
    if (!form.farmName || !form.location || !form.hectares || !form.cropType) {
      alert("Please complete farm name, location, hectares and crop type.");
      return;
    }
    if (!form.fundingGoalHBAR || !form.durationDays) {
      alert("Please provide funding goal and campaign duration.");
      return;
    }

    try {
      setSubmitting(true);
      // 1) Upload metadata + files to IPFS (via API)
      const cid = await uploadMetadataAndFiles();

      // 2) Call contract with CID and numeric params
      await createCampaign(
        cid,
        form.fundingGoalHBAR, // will be parseUnits(..., 8) in hook
        Number(form.durationDays),
        estimatedCO2 // will be parseUnits(..., 18) in hook
      );
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Farm Name</label>
            <Input
              placeholder="Green Valley Farm"
              value={form.farmName}
              onChange={onChange("farmName")}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              placeholder="Lagos, Nigeria"
              value={form.location}
              onChange={onChange("location")}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Farm Size (hectares)</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="2"
              value={form.hectares}
              onChange={onChange("hectares")}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Crop Type</label>
            <Select value={form.cropType} onValueChange={onSelectCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maize">Maize</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
                <SelectItem value="Cassava">Cassava</SelectItem>
                <SelectItem value="Beans">Beans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Campaign Description</label>
            <Textarea
              placeholder="Tell investors your story and what the funds will be used for..."
              value={form.description}
              onChange={onChange("description")}
              rows={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Funding Goal (HBAR)</label>
            <Input
              type="number"
              step="0.01"
              placeholder="100"
              value={form.fundingGoalHBAR}
              onChange={onChange("fundingGoalHBAR")}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Stored on-chain with 8 decimals precision
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (Days)</label>
            <Input
              type="number"
              min="1"
              placeholder="30"
              value={form.durationDays}
              onChange={onChange("durationDays")}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estimated CO2 (tons)</label>
            <Input value={estimatedCO2} readOnly className="bg-gray-50" />
            <p className="text-xs text-gray-500 mt-1">
              Auto-calculated: hectares × crop factor × (days/365)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Farm Photos</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={onFiles("photos")}
            />
            <p className="text-xs text-gray-500 mt-1">You can select multiple images.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Documents (PDF/Images)</label>
            <Input
              type="file"
              accept="application/pdf,image/*"
              multiple
              onChange={onFiles("documents")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={(hash && isLoading) || isPending || uploading || submitting}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold disabled:bg-gray-400"
        >
          {uploading
            ? "Uploading to IPFS..."
            : (hash && isLoading) || isPending || submitting
            ? "Creating Campaign..."
            : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}