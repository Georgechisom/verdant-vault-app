'use client';

import React, { Dispatch, SetStateAction } from "react";
import { formatUnits } from "viem";
import { CheckCircle, Clock, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../components/ui/dialog";

export function getStatusText(status: number) {
  const statuses = ["Active", "Funded", "Completed", "Failed", "Canceled"];
  return statuses[status] || "Unknown";
}

export function getStatusColor(status: number) {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-red-100 text-red-800",
    "bg-gray-100 text-gray-800",
  ];
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function CampaignHero({ campaignId, status }: { campaignId: number; status: number }) {
  return (
    <div className="h-64 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Campaign #{campaignId}</h1>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </span>
      </div>
    </div>
  );
}

export function CampaignProgress({
  raisedAmount,
  fundingGoal,
}: {
  raisedAmount: bigint;
  fundingGoal: bigint;
}) {
  const raisedHBAR = Number(formatUnits(raisedAmount, 8));
  const goalHBAR = Number(formatUnits(fundingGoal, 8));
  const progress = goalHBAR > 0 ? (raisedHBAR / goalHBAR) * 100 : 0;
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Funding Progress</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-green-600 h-3 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{formatUnits(raisedAmount, 8)} HBAR raised</span>
        <span>Goal: {formatUnits(fundingGoal, 8)} HBAR</span>
      </div>
    </div>
  );
}

export function CampaignInfo({
  farmer,
  deadline,
  estimatedCO2Tons,
  ipfsMetadata,
}: {
  farmer: string;
  deadline: bigint;
  estimatedCO2Tons: bigint;
  ipfsMetadata: string;
}) {
  const isExpired = Number(deadline) * 1000 < Date.now();
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <p className="text-sm text-gray-600 mb-1">Farmer Address</p>
        <p className="font-mono text-sm break-all">{farmer}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">Deadline</p>
        <p className="font-semibold">{new Date(Number(deadline) * 1000).toLocaleString()}</p>
        {isExpired && <p className="text-red-600 text-sm">Expired</p>}
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">Estimated CO2 Offset</p>
        <p className="font-semibold text-green-600">{formatUnits(estimatedCO2Tons, 18)} tons</p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">IPFS Metadata</p>
        <a href={`https://ipfs.io/ipfs/${ipfsMetadata}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">
          View on IPFS →
        </a>
      </div>
    </div>
  );
}

export function CampaignMetadata({ metadata }: { metadata: any }) {
  if (!metadata) return null;
  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="text-lg font-semibold mb-3">Campaign Details</h3>
      {metadata.farmName && <p className="text-xl font-bold">{metadata.farmName}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metadata.location && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="font-semibold">{metadata.location}</p>
          </div>
        )}
        {metadata.hectares && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Farm Size</p>
            <p className="font-semibold">{metadata.hectares} hectares</p>
          </div>
        )}
        {metadata.cropType && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Crop Type</p>
            <p className="font-semibold">{metadata.cropType}</p>
          </div>
        )}
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700">{metadata.description || "No description available"}</p>
      </div>
      {Array.isArray(metadata.files) && metadata.files.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Media</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metadata.files.map((uri: string, idx: number) => {
              const cid = uri.replace("ipfs://", "");
              const url = `https://ipfs.io/ipfs/${cid}`;
              return (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt={`Campaign media ${idx + 1}`}
                    className="w-full h-40 object-cover bg-gray-100"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <a href={url} target="_blank" rel="noopener noreferrer" className="block text-sm text-green-600 hover:underline p-2">
                    View File →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function MilestonesList({
  milestones,
  onOpenProofModal,
}: {
  milestones: any[];
  onOpenProofModal: (index: number, hash: string) => void;
}) {
  if (!milestones || milestones.length === 0) {
    return <p className="text-gray-500">No milestones found</p>;
  }
  return (
    <div className="space-y-4">
      {milestones.map((milestone: any, index: number) => (
        <div key={index} className="border rounded-lg p-4 hover:border-green-500 transition">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-3">
              {milestone.approved ? (
                <CheckCircle className="text-green-600 mt-1" size={20} />
              ) : (
                <Clock className="text-gray-400 mt-1" size={20} />
              )}
              <div>
                <h4 className="font-semibold text-lg">{milestone.description}</h4>
                <p className="text-sm text-gray-600 mt-1">Release: {milestone.fundPercentage}% of funds</p>
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
              {milestone.approved ? "✓ Approved" : milestone.proofIpfsHash ? "Pending Review" : "Not Started"}
            </span>
          </div>
          {milestone.proofIpfsHash && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <FileText size={16} className="text-gray-500" />
              <button type="button" onClick={() => onOpenProofModal(index, milestone.proofIpfsHash)} className="text-green-600 hover:underline">
                Review Proof →
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function InvestmentsList({
  investments,
  raisedAmount,
}: {
  investments: any[];
  raisedAmount: bigint;
}) {
  if (!investments || investments.length === 0) {
    return <p className="text-gray-500">No investments yet</p>;
  }
  return (
    <div className="space-y-3">
      {investments.map((investment: any, index: number) => (
        <div key={index} className="flex justify-between items-center border-b pb-3 last:border-b-0">
          <div>
            <p className="font-mono text-sm text-gray-600">
              {investment.investor.slice(0, 6)}...{investment.investor.slice(-4)}
            </p>
            {investment.creditsEarned > 0 && (
              <p className="text-xs text-green-600 mt-1">Credits: {formatUnits(investment.creditsEarned, 18)} tons</p>
            )}
          </div>
          <span className="font-semibold text-green-600">{formatUnits(investment.amount, 8)} HBAR</span>
        </div>
      ))}
      <div className="pt-3 border-t mt-3">
        <div className="flex justify-between font-bold">
          <span>Total Raised</span>
          <span className="text-green-600">{formatUnits(raisedAmount, 8)} HBAR</span>
        </div>
      </div>
    </div>
  );
}

export function InvestCard({
  canInvest,
  investAmount,
  setInvestAmount,
  onInvest,
  isLoading,
}: {
  canInvest: boolean;
  investAmount: string;
  setInvestAmount: Dispatch<SetStateAction<string>>;
  onInvest: () => Promise<void>;
  isLoading: boolean;
}) {
  if (!canInvest) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Invest Now</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Amount (HBAR)</label>
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
          onClick={onInvest}
          disabled={isLoading || !investAmount}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold disabled:bg-gray-400 hover:bg-green-700 transition"
        >
          {isLoading ? "Processing..." : "Invest"}
        </button>
      </div>
    </div>
  );
}

export function FarmerActions({
  isFarmer,
  status,
  milestones,
  uploadingProof,
  setProofFiles,
  proofFiles,
  proofNote,
  setProofNote,
  onUploadAndSubmit,
}: {
  isFarmer: boolean;
  status: number;
  milestones: any[];
  uploadingProof: boolean;
  setProofFiles: Dispatch<SetStateAction<FileList | null>>;
  proofFiles: FileList | null;
  proofNote: string;
  setProofNote: Dispatch<SetStateAction<string>>;
  onUploadAndSubmit: (nextIndex: number) => Promise<void>;
}) {
  if (!isFarmer || status !== 1) return null;
  const nextIndex = Array.isArray(milestones) ? milestones.findIndex((m: any) => !m.completed) : -1;
  const nextMilestone = nextIndex >= 0 ? milestones[nextIndex] : null;
  if (nextIndex < 0 || !nextMilestone) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Farmer Actions</h3>
        <p className="text-green-700">All milestones have been submitted.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Farmer Actions</h3>
      <p className="text-sm text-gray-600 mb-4">Upload your proof and submit in a single step. Only the next pending milestone is shown.</p>
      <div className="p-3 bg-gray-50 rounded-lg mb-4">
        <p className="text-sm text-gray-600 mb-1">Next Milestone</p>
        <p className="font-semibold">
          #{nextIndex} — {nextMilestone.description} ({nextMilestone.fundPercentage}%)
        </p>
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
          onClick={() => onUploadAndSubmit(nextIndex)}
          disabled={uploadingProof}
          className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
        >
          {uploadingProof ? "Uploading & Submitting..." : "Upload & Submit Proof"}
        </button>
      </div>
    </div>
  );
}

export function AdminActions({
  isAdmin,
  isExpired,
  status,
  milestoneIndex,
  setMilestoneIndex,
  onApprove,
  onRefund,
  isLoading,
}: {
  isAdmin: boolean;
  isExpired: boolean;
  status: number;
  milestoneIndex: string;
  setMilestoneIndex: Dispatch<SetStateAction<string>>;
  onApprove: () => Promise<void>;
  onRefund: () => Promise<void>;
  isLoading: boolean;
}) {
  if (!isAdmin) return null;
  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Admin Actions</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Milestone to Approve (0-3)</label>
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
          onClick={onApprove}
          disabled={isLoading || !milestoneIndex}
          className="w-full py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-purple-700 transition"
        >
          {isLoading ? "Approving..." : "Approve Milestone"}
        </button>
        <button
          onClick={onRefund}
          disabled={isLoading || !(isExpired && status === 0)}
          className="w-full py-2 bg-red-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-red-700 transition"
        >
          {isLoading ? "Claiming..." : "Claim Refund"}
        </button>
      </div>
    </div>
  );
}

export function ProofModal({
  open,
  setOpen,
  isAdmin,
  reviewMilestoneIndex,
  milestones,
  proofMetadata,
  approveMilestone,
  campaignId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  reviewMilestoneIndex: number | null;
  milestones: any[];
  proofMetadata: any;
  approveMilestone: (campaignId: number, milestoneIndex: number) => Promise<void>;
  campaignId: number;
}) {
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Milestone Proof Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {reviewMilestoneIndex !== null && milestones?.[reviewMilestoneIndex] && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Milestone</p>
              <p className="font-semibold">
                #{reviewMilestoneIndex} — {milestones[reviewMilestoneIndex].description} ({milestones[reviewMilestoneIndex].fundPercentage}%)
              </p>
            </div>
          )}
          {proofMetadata ? (
            <>
              {proofMetadata.note && <p className="text-gray-700">Note: {proofMetadata.note}</p>}
              {Array.isArray(proofMetadata.files) && proofMetadata.files.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {proofMetadata.files.map((uri: string, idx: number) => {
                    const cid = uri.replace("ipfs://", "");
                    const url = `https://ipfs.io/ipfs/${cid}`;
                    return (
                      <div key={idx} className="border rounded-lg overflow-hidden">
                        <img
                          src={url}
                          alt={`Proof media ${idx + 1}`}
                          className="w-full h-32 object-cover bg-gray-100"
                          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                        />
                        <a href={url} target="_blank" rel="noopener noreferrer" className="block text-sm text-green-600 hover:underline p-2">
                          View File →
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            reviewMilestoneIndex !== null &&
            milestones?.[reviewMilestoneIndex]?.proofIpfsHash && (
              <a
                href={`https://ipfs.io/ipfs/${milestones[reviewMilestoneIndex].proofIpfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Open proof on IPFS →
              </a>
            )
          )}
        </div>
        <DialogFooter>
          {isAdmin &&
            reviewMilestoneIndex !== null &&
            milestones?.[reviewMilestoneIndex] &&
            !milestones[reviewMilestoneIndex].approved && (
              <button
                type="button"
                onClick={async () => {
                  await approveMilestone(campaignId, reviewMilestoneIndex!);
                  setOpen(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Approve Milestone
              </button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}