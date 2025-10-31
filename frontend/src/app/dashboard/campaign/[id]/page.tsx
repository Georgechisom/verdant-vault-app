"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useCampaign,
  useVerdantVault,
  useMilestones,
  useInvestments,
  useAdmin,
  ABI,
  CONTRACT_ADDRESS,
} from "../../../../hooks/useVerdantVault";
import { formatEther, formatUnits } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";
import { CheckCircle, Clock, FileText } from "lucide-react";

export default function CampaignDetails() {
  const params = useParams();
  const router = useRouter();
  const campaignId = Number(params?.id);
  const { address } = useAccount();
  const { adminAddress } = useAdmin();

  const { campaign, isLoading, refetch } = useCampaign(campaignId);
  console.log({campaign})
  const {
    milestones,
    isLoading: milestonesLoading,
    refetch: refetchMilestones,
  } = useMilestones(campaignId);
  const {
    investments,
    isLoading: investmentsLoading,
    refetch: refetchInvestments,
  } = useInvestments(campaignId);
  const {
    invest,
    submitMilestoneProof,
    approveMilestone,
    claimRefund,
    claimCarbonCredits,
    hash,
    isPending,
  } = useVerdantVault();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const [investAmount, setInvestAmount] = useState("");
  const [milestoneIndex, setMilestoneIndex] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [proofFiles, setProofFiles] = useState<FileList | null>(null);
  const [proofNote, setProofNote] = useState("");
  const [uploadingProof, setUploadingProof] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      refetchMilestones();
      refetchInvestments();
      setInvestAmount("");
      setIpfsHash("");
      setMilestoneIndex("");
    }
  }, [isSuccess, refetch, refetchMilestones, refetchInvestments]);

  useEffect(() => {
    if (campaign && campaign[1]) {
      fetchMetadata(campaign[1]);
    }
  }, [campaign]);

  // Watch on-chain events and refetch data (keeps UI in sync)
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "InvestmentMade",
    args: { campaignId: BigInt(campaignId) },
    onLogs() {
      refetch();
      refetchInvestments();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "MilestoneProofSubmitted",
    args: { campaignId: BigInt(campaignId) },
    onLogs() {
      refetchMilestones();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "MilestoneApproved",
    args: { campaignId: BigInt(campaignId) },
    onLogs() {
      refetch();
      refetchMilestones();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "FundsReleased",
    args: { campaignId: BigInt(campaignId) },
    onLogs() {
      refetch();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CarbonCreditsMinted",
    args: { campaignId: BigInt(campaignId) },
    onLogs() {
      refetch();
      refetchInvestments();
    },
  });

  const fetchMetadata = async (ipfsHash: string) => {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
      const data = await response.json();
      setMetadata(data);
    } catch (err) {
      console.error("Failed to fetch metadata:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading campaign...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Campaign not found</div>
      </div>
    );
  }

  const [
    farmer,
    ipfsMetadata,
    fundingGoal,
    raisedAmount,
    deadline,
    estimatedCO2Tons,
    status,
  ] = campaign;
  const raisedHBAR = Number(formatEther(raisedAmount));
  const goalHBAR = Number(formatUnits(fundingGoal, 8));
  const progress = goalHBAR > 0 ? (raisedHBAR / goalHBAR) * 100 : 0;
  const isExpired = Number(deadline) * 1000 < Date.now();
  const isFarmer = address?.toLowerCase() === farmer.toLowerCase();
  const isAdmin = !!adminAddress && !!address && adminAddress.toLowerCase() === address.toLowerCase();
  console.log({ isFarmer, isAdmin });

  const getStatusText = (status: number) => {
    const statuses = ["Active", "Funded", "Completed", "Failed", "Canceled"];
    return statuses[status] || "Unknown";
  };

  const getStatusColor = (status: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-red-100 text-red-800",
      "bg-gray-100 text-gray-800",
    ];
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleInvest = async () => {
    if (!investAmount) return;
    await invest(campaignId, investAmount);
  };

  const handleSubmitProof = async () => {
    if (!milestoneIndex || !ipfsHash) return;
    await submitMilestoneProof(campaignId, Number(milestoneIndex), ipfsHash);
  };

  const handleApprove = async () => {
    if (!milestoneIndex) return;
    await approveMilestone(campaignId, Number(milestoneIndex));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-black pt-0">
      <button
        onClick={() => router.back()}
        className="mb-6 text-green-600 hover:text-green-700 flex items-center gap-2"
      >
        ← Back to Campaigns
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <div className="text-white text-center">
                <h1 className="text-4xl font-bold mb-2">
                  Campaign #{campaignId}
                </h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    status
                  )}`}
                >
                  {getStatusText(status)}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Funding Progress</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{formatEther(raisedAmount)} HBAR raised</span>
                  <span>Goal: {formatUnits(fundingGoal, 8)} HBAR</span>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Farmer Address</p>
                  <p className="font-mono text-sm break-all">{farmer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Deadline</p>
                  <p className="font-semibold">
                    {new Date(Number(deadline) * 1000).toLocaleString()}
                  </p>
                  {isExpired && <p className="text-red-600 text-sm">Expired</p>}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Estimated CO2 Offset
                  </p>
                  <p className="font-semibold text-green-600">
                    {formatUnits(estimatedCO2Tons, 18)} tons
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">IPFS Metadata</p>
                  <a
                    href={`https://ipfs.io/ipfs/${ipfsMetadata}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    View on IPFS →
                  </a>
                </div>
              </div>

              {/* Metadata */}
              {metadata && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Campaign Details
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">
                      {metadata.description || "No description available"}
                    </p>
                    {metadata.location && (
                      <p className="text-sm text-gray-600 mt-2">
                        📍 {metadata.location}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Milestones Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Milestones</h3>
            {milestonesLoading ? (
              <p className="text-gray-500">Loading milestones...</p>
            ) : milestones && milestones?.length > 0 ? (
              <div className="space-y-4">
                {milestones?.map((milestone: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:border-green-500 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-3">
                        {milestone.approved ? (
                          <CheckCircle
                            className="text-green-600 mt-1"
                            size={20}
                          />
                        ) : (
                          <Clock className="text-gray-400 mt-1" size={20} />
                        )}
                        <div>
                          <h4 className="font-semibold text-lg">
                            {milestone.description}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Release: {milestone.fundPercentage}% of funds
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                          milestone.approved
                            ? "bg-green-100 text-green-800"
                            : milestone.proofIpfsHash
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {milestone.approved
                          ? "✓ Approved"
                          : milestone.proofIpfsHash
                          ? "Pending Review"
                          : "Not Started"}
                      </span>
                    </div>
                    {milestone.proofIpfsHash && (
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <FileText size={16} className="text-gray-500" />
                        <a
                          href={`https://ipfs.io/ipfs/${milestone.proofIpfsHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          View Proof →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No milestones found</p>
            )}
          </div>

          {/* Investments Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Investments ({investments?.length})
            </h3>
            {investmentsLoading ? (
              <p className="text-gray-500">Loading investments...</p>
            ) : (investments && investments.length > 0) ? (
              <div className="space-y-3">
                {investments?.map((investment: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3 last:border-b-0"
                  >
                    <div>
                      <p className="font-mono text-sm text-gray-600">
                        {investment.investor.slice(0, 6)}...
                        {investment.investor.slice(-4)}
                      </p>
                      {investment.creditsEarned > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          Credits: {formatUnits(investment.creditsEarned, 18)}{" "}
                          tons
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-green-600">
                      {formatEther(investment.amount)} HBAR
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total Raised</span>
                    <span className="text-green-600">
                      {formatEther(raisedAmount)} HBAR
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No investments yet</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Card */}
          {status === 0 && !isExpired && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Invest Now</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount (HBAR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="10"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleInvest}
                  disabled={isLoading || !investAmount}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold disabled:bg-gray-400 hover:bg-green-700 transition"
                >
                  {isLoading ? "Processing..." : "Invest"}
                </button>
              </div>
            </div>
          )}

          {/* Farmer Actions */}
          {isFarmer && status === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Farmer Actions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Submit milestone proof once work is completed. Upload files to IPFS and then submit the returned CID.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Milestone Index (0-3)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    placeholder="0"
                    value={milestoneIndex}
                    onChange={(e) => setMilestoneIndex(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Upload Proof Files (images/PDFs)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={(e) => setProofFiles(e.target.files)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Optional note about this milestone proof"
                    value={proofNote}
                    onChange={(e) => setProofNote(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!milestoneIndex) return alert("Set a milestone index first");
                      if (!proofFiles || proofFiles.length === 0) return alert("Select at least one file");
                      try {
                        setUploadingProof(true);
                        const fd = new FormData();
                        fd.append(
                          "metadata",
                          JSON.stringify({
                            campaignId,
                            milestoneIndex: Number(milestoneIndex),
                            note: proofNote,
                            schema: "verdant-vault.milestone-proof.v1",
                          })
                        );
                        Array.from(proofFiles).forEach((f) => fd.append("files", f));
                        const res = await fetch("/api/ipfs/upload", { method: "POST", body: fd });
                        const j = await res.json();
                        if (!res.ok) throw new Error(j?.error || "IPFS upload failed");
                        setIpfsHash(j.cid);
                      } catch (e: any) {
                        alert(e?.message || "Upload failed");
                      } finally {
                        setUploadingProof(false);
                      }
                    }}
                    disabled={uploadingProof || !milestoneIndex}
                    className="w-full py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-400 hover:bg-gray-900 transition"
                  >
                    {uploadingProof ? "Uploading to IPFS..." : "Upload Files to IPFS"}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Proof IPFS CID
                  </label>
                  <input
                    type="text"
                    placeholder="QmXxx..."
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {ipfsHash && (
                    <a
                      href={`https://ipfs.io/ipfs/${ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm mt-2 inline-block"
                    >
                      Preview proof on IPFS →
                    </a>
                  )}
                </div>

                <button
                  onClick={handleSubmitProof}
                  disabled={isLoading || !milestoneIndex || !ipfsHash}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
                >
                  {isLoading ? "Submitting..." : "Submit Proof"}
                </button>
              </div>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Admin Actions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Milestone to Approve (0-3)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    placeholder="0"
                    value={milestoneIndex}
                    onChange={(e) => setMilestoneIndex(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleApprove}
                  disabled={isLoading || !milestoneIndex}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-purple-700 transition"
                >
                  {isLoading ? "Approving..." : "Approve Milestone"}
                </button>
                <button
                  onClick={() => claimRefund(campaignId)}
                  disabled={isLoading || !(isExpired && status === 0)}
                  className="w-full py-2 bg-red-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-red-700 transition"
                >
                  {isLoading ? "Claiming..." : "Claim Refund"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
