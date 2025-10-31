"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useVerdantVault,
  useCampaignCounter,
  useCampaign,
  ABI,
  CONTRACT_ADDRESS,
} from "../../../hooks/useVerdantVault";
import { formatUnits } from "viem";
import { useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";

const ActiveCampaignCard = ({ id }: { id: number }) => {
  const router = useRouter();
  const { campaign, refetch } = useCampaign(id);
  const { invest, hash } = useVerdantVault();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });
  const [investAmount, setInvestAmount] = useState("");

  // Refresh card data when investment is made
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "InvestmentMade",
    args: { campaignId: BigInt(id) },
    onLogs() {
      refetch();
    },
  });

  // Refresh card data when milestone approval might change status
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "MilestoneApproved",
    args: { campaignId: BigInt(id) },
    onLogs() {
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setInvestAmount("");
    }
  }, [isSuccess]);

  if (!campaign) return null;

  const [
    farmer,
    ipfsMetadata,
    fundingGoal,
    raisedAmount,
    deadline,
    estimatedCO2Tons,
    status,
  ] = campaign;

  // Only show Active (status === 0)
  if (status !== 0) return null;

  const handleInvest = async () => {
    if (!investAmount) return;
    await invest(id, investAmount);
  };

  const getStatusText = (status: number) => {
    const statuses = ["Active", "Funded", "Completed", "Failed", "Canceled"];
    return statuses[status] || "Unknown";
  };

  return (
    <div
      className="border rounded-lg p-6 space-y-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
      onClick={(e) => {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== "INPUT" && tag !== "BUTTON") {
          router.push(`/dashboard/campaign/${id}`);
        }
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">Campaign #{id}</h3>
          <p className="text-sm text-gray-600">
            Farmer: {farmer.slice(0, 10)}...
          </p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {getStatusText(status)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Funding Goal</p>
          <p className="font-semibold">{formatUnits(fundingGoal, 8)} HBAR</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Raised</p>
          <p className="font-semibold">{formatUnits(raisedAmount, 8)} HBAR</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">CO2 Estimate</p>
          <p className="font-semibold">
            {formatUnits(estimatedCO2Tons, 18)} tons
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Deadline</p>
          <p className="font-semibold">
            {new Date(Number(deadline) * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          step="0.01"
          placeholder="Amount in HBAR"
          value={investAmount}
          onChange={(e) => {
            e.stopPropagation();
            setInvestAmount(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleInvest();
          }}
          disabled={isLoading || status !== 0}
          className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : "Invest"}
        </button>
      </div>
    </div>
  );
};

export default function InvestIndexPage() {
  const { count, refetch } = useCampaignCounter();
  const campaignIds = Array.from({ length: count }, (_, i) => i + 1);

  // Refresh list when campaigns are created
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CampaignCreated",
    onLogs() {
      refetch?.();
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Invest in Active Campaigns</h2>
      <p className="text-gray-600">
        Browse all campaigns currently open for investment, view funding
        progress, and invest directly.
      </p>

      {count === 0 ? (
        <p className="text-gray-500">No campaigns found</p>
      ) : (
        campaignIds.map((id) => <ActiveCampaignCard key={id} id={id} />)
      )}
    </div>
  );
}