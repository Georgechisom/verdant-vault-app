"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, usePublicClient, useWatchContractEvent } from "wagmi";
import { formatUnits } from "viem";
import { ABI, CONTRACT_ADDRESS, useCampaignCounter } from "../hooks/useVerdantVault";
import { TrendingUp, Layers, PlusCircle } from "lucide-react";

type UCampaign = {
  id: number;
  farmer: string;
  fundingGoal: bigint;
  raisedAmount: bigint;
  deadline: bigint;
  estimatedCO2Tons: bigint;
  status: number;
};

export default function FarmerDashboard() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { count, refetch: refetchCount } = useCampaignCounter();

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRaisedHBAR: 0,
    campaigns: 0,
    active: 0,
    funded: 0,
    completed: 0,
  });
  const [myCampaigns, setMyCampaigns] = useState<UCampaign[]>([]);

  const loadData = async () => {
    if (!address || !publicClient) return;
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
            return { id, data };
          } catch {
            return null;
          }
        })
      );

      const filtered = (results.filter(Boolean) as { id: number; data: any }[]) || [];
      const mine = filtered.filter(({ data }) => {
        const farmer = String(data[0] || "").toLowerCase();
        return farmer === address!.toLowerCase();
      });

      let totalRaised = 0;
      let active = 0,
        funded = 0,
        completed = 0;

      const mapped: UCampaign[] = mine.map(({ id, data }) => {
        const status = Number(data[6]);
        const raised = data[3] as bigint;
        totalRaised += Number(formatUnits(raised, 8));
        if (status === 0) active++;
        else if (status === 1) funded++;
        else if (status === 2) completed++;

        return {
          id,
          farmer: data[0],
          fundingGoal: data[2],
          raisedAmount: data[3],
          deadline: data[4],
          estimatedCO2Tons: data[5],
          status,
        };
      });

      setStats({
        totalRaisedHBAR: Number(totalRaised.toFixed(4)),
        campaigns: mapped.length,
        active,
        funded,
        completed,
      });
      setMyCampaigns(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, count]);

  // Watch events to keep dashboard data up-to-date
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CampaignCreated",
    args: address ? { farmer: address as `0x${string}` } : undefined,
    onLogs() {
      refetchCount?.();
      loadData();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "InvestmentMade",
    onLogs() {
      loadData();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "MilestoneApproved",
    onLogs() {
      loadData();
    },
  });

  const getStatusText = (status: number) => {
    const statuses = ["Active", "Funded", "Completed", "Failed", "Canceled"];
    return statuses[status] || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
        <p className="text-gray-600">Manage your campaigns and track your funding in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-semibold">Total Raised</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {loading ? "…" : `${stats.totalRaisedHBAR} HBAR`}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-semibold">My Campaigns</h3>
            <Layers className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{loading ? "…" : stats.campaigns}</p>
          <div className="flex gap-2 text-xs mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{stats.active} Active</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{stats.funded} Funded</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
              {stats.completed} Completed
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-semibold">Actions</h3>
            <PlusCircle className="w-6 h-6 text-green-500" />
          </div>
          <Link href="/dashboard/create-campaign" className="btn-primary text-center py-2 block">
            Create New Campaign
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Campaigns</h2>
        {loading ? (
          <div className="text-gray-500">Loading your campaigns…</div>
        ) : myCampaigns.length === 0 ? (
          <div className="text-gray-500">No campaigns yet. Create your first campaign.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCampaigns.map((c) => {
              const goal = Number(formatUnits(c.fundingGoal, 8));
              const raised = Number(formatUnits(c.raisedAmount, 8));
              const progress = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;
              const statusBadge =
                c.status === 0
                  ? "bg-blue-100 text-blue-800"
                  : c.status === 1
                  ? "bg-green-100 text-green-800"
                  : c.status === 2
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800";

              return (
                <div key={c.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Campaign #{c.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusBadge}`}>
                      {getStatusText(c.status)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {raised} / {goal} HBAR
                    </span>
                    <span>{new Date(Number(c.deadline) * 1000).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/dashboard/campaign/${c.id}`}
                    className="mt-3 inline-block text-green-600 hover:underline text-sm"
                  >
                    View details →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
