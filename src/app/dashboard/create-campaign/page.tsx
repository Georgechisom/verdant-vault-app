"use client";

import { useState, useEffect } from "react";
import { useVerdantVault } from "@/hooks/useVerdantVault";
import { useWaitForTransactionReceipt } from "wagmi";

export default function CreateCampaign() {
  const { createCampaign, hash, isPending } = useVerdantVault();
  const { isSuccess, isLoading} = useWaitForTransactionReceipt({hash})
  const [formData, setFormData] = useState({
    ipfsMetadata: "",
    fundingGoal: "",
    durationDays: "",
    estimatedCO2: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        ipfsMetadata: "",
        fundingGoal: "",
        durationDays: "",
        estimatedCO2: "",
      });
      alert(`Campaign created successfully! Tx: ${hash}`);
    }
  }, [isSuccess, hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(
        formData.ipfsMetadata,
        formData.fundingGoal,
        Number(formData.durationDays),
        formData.estimatedCO2
      );
      
      await createCampaign(
        formData.ipfsMetadata,
        formData.fundingGoal,
        Number(formData.durationDays),
        formData.estimatedCO2
      );
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            IPFS Metadata Hash
          </label>
          <input
            type="text"
            name="ipfsMetadata"
            value={formData.ipfsMetadata}
            onChange={handleChange}
            placeholder="QmXxx..."
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload your campaign details to IPFS first
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Funding Goal (HBAR)
          </label>
          <input
            type="number"
            name="fundingGoal"
            value={formData.fundingGoal}
            onChange={handleChange}
            placeholder="100"
            step="0.01"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Duration (Days)
          </label>
          <input
            type="number"
            name="durationDays"
            value={formData.durationDays}
            onChange={handleChange}
            placeholder="30"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Estimated CO2 (tons)
          </label>
          <input
            type="number"
            name="estimatedCO2"
            value={formData.estimatedCO2}
            onChange={handleChange}
            placeholder="50"
            step="0.01"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || isPending}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold disabled:bg-gray-400"
        >
          {(isLoading || isPending) ? "Creating Campaign..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}