"use client";

import { useEffect, useState } from "react";
import FarmerDashboard from "../../components/FarmerDashboard";
import InvestorDashboard from "../../components/InvestorDashboard";
import { useAccount, usePublicClient, useWatchContractEvent } from "wagmi";
import {
  ABI,
  CONTRACT_ADDRESS,
  useCampaignCounter,
} from "../../hooks/useVerdantVault";
import "./css/bgImage.css";

/**
 * DashboardPage
 * - Detects role based on on-chain data:
 *   If connected wallet is the farmer for at least one campaign → default "farmer"
 *   else → default "investor".
 * - Allows manual override via a simple View toggle: Auto / Farmer / Investor
 * - Auto-refreshes on CampaignCreated and InvestmentMade events.
 */
export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { count, refetch: refetchCount } = useCampaignCounter();

  type RoleOpt = "auto" | "farmer" | "investor";
  const [view, setView] = useState<RoleOpt>("auto");
  const [detectedRole, setDetectedRole] =
    useState<Exclude<RoleOpt, "auto">>("investor");
  const [loading, setLoading] = useState(false);

  const detectRole = async () => {
    if (!address || !publicClient) {
      setDetectedRole("investor");
      return;
    }
    setLoading(true);
    try {
      const ids = Array.from({ length: count }, (_, i) => i + 1);
      const results = await Promise.all(
        ids.map(async (id) => {
          try {
            const data: any = await publicClient.readContract({
              address: CONTRACT_ADDRESS,
              abi: ABI,
              functionName: "campaigns",
              args: [BigInt(id)],
            });
            return data;
          } catch {
            return null;
          }
        })
      );

      const mine = results
        .filter(Boolean)
        .some(
          (data: any) =>
            String(data[0]).toLowerCase() === address!.toLowerCase()
        );

      setDetectedRole(mine ? "farmer" : "investor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) detectRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, count]);

  // Watch new campaigns and investments to keep detection fresh
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CampaignCreated",
    onLogs() {
      refetchCount?.();
      detectRole();
    },
  });
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "InvestmentMade",
    onLogs() {
      detectRole();
    },
  });

  const resolvedRole: Exclude<RoleOpt, "auto"> =
    view === "auto" ? detectedRole : (view as Exclude<RoleOpt, "auto">);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col lg:flex-row  items-center gap-3 mb-4 z-50">
        <span className="text-sm text-gray-600 hidden lg:flex">View:</span>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded text-sm ${
              view === "auto"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setView("auto")}
          >
            Auto{loading ? "…" : ""}
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              view === "farmer"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setView("farmer")}
          >
            Farmer
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              view === "investor"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setView("investor")}
          >
            Investor
          </button>
        </div>
        <span className="ml-auto text-xs text-gray-500">
          Detected: {detectedRole}
        </span>
      </div>

      {resolvedRole === "farmer" ? <FarmerDashboard /> : <InvestorDashboard />}
    </div>
  );
}
