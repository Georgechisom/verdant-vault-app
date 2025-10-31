"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAccount, usePublicClient, useWatchContractEvent } from "wagmi";
import { formatUnits, formatEther } from "viem";
import { ABI, CONTRACT_ADDRESS, useCampaignCounter } from "../hooks/useVerdantVault";
import { Wallet, TrendingUp, Leaf } from "lucide-react";

type Investment = {
  investor: string;
  amount: bigint;
  creditsEarned: bigint;
  creditsClaimed: boolean;
};
type InvestorSummary = {
  totalInvestedHBAR: number;
  campaignsSupported: number;
  totalCreditsEarned: number; // tons
  claimableCredits: number;   // tons
  walletBalanceHBAR: string;
};
type CampaignInvestment = {
  campaignId: number;
  status: number;
  amountHBAR: number;
  creditsEarnedTons: number;
  creditsClaimed: boolean;
};

export default function InvestorDashboard() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { count, refetch: refetchCount } = useCampaignCounter();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<InvestorSummary>({
    totalInvestedHBAR: 0,
    campaignsSupported: 0,
    totalCreditsEarned: 0,
    claimableCredits: 0,
    walletBalanceHBAR: "0",
  });
  const [myInvestments, setMyInvestments] = useState<CampaignInvestment[]>([]);

  const loadData = async () => {
    if (!address || !publicClient) return;
    setLoading(true);
    try {
      const ids = Array.from({ length: count }, (_, i) => i + 1);

      const results = await Promise.all(
        ids.map(async (id) => {
          try {
            const [investments, campaign] = await Promise.all([
              publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: ABI,
                functionName: "getInvestments",
                args: [BigInt(id)],
              }),
              publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: ABI,
                functionName: "campaigns",
                args: [BigInt(id)],
              }),
            ]);

            return { id, investments: investments as any[], campaign: campaign as unknown as any[] };
          } catch {
            return null;
          }
        })
      );

      const filtered = (results.filter(Boolean) as { id: number; investments: any[]; campaign: any[] }[]) || [];

      let totalInvested = 0;
      let totalCredits = 0;
      let claimable = 0;
      const mine: CampaignInvestment[] = [];

      filtered.forEach(({ id, investments, campaign }) => {
        const status = Number(campaign[6]); // enum
        investments.forEach((inv: Investment) => {
          if (String(inv.investor).toLowerCase() === address!.toLowerCase()) {
            const amtHBAR = Number(formatUnits(inv.amount, 8));
            const creditsTons = Number(formatUnits(inv.creditsEarned, 18));
            totalInvested += amtHBAR;
            totalCredits += creditsTons;
            if (!inv.creditsClaimed && creditsTons > 0) {
              claimable += creditsTons;
            }
            mine.push({
              campaignId: id,
              status,
              amountHBAR: amtHBAR,
              creditsEarnedTons: creditsTons,
              creditsClaimed: inv.creditsClaimed,
            });
          }
        });
      });

      // Wallet balance
      let walletBal = "0";
      try {
        const bal = await publicClient.getBalance({ address: address as `0x${string}` });
        walletBal = Number(formatEther(bal)).toFixed(4);
      } catch {
        walletBal = "0";
      }

      setSummary({
        totalInvestedHBAR: Number(totalInvested.toFixed(4)),
        campaignsSupported: new Set(mine.map((m) => m.campaignId)).size,
        totalCreditsEarned: Number(totalCredits.toFixed(4)),
        claimableCredits: Number(claimable.toFixed(4)),
        walletBalanceHBAR: walletBal,
      });
      setMyInvestments(mine);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, count]);

  // Watch events to keep investor dashboard fresh
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CampaignCreated",
    onLogs() {
      refetchCount?.();
      loadData();
    },
  });
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "InvestmentMade",
    args: address ? { investor: address as `0x${string}` } : undefined,
    onLogs() {
      loadData();
    },
  });
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CarbonCreditsMinted",
    onLogs() {
      loadData();
    },
  });
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CarbonCreditsClaimed",
    args: address ? { investor: address as `0x${string}` } : undefined,
    onLogs() {
      loadData();
    },
  });

  const campaignsCount = useMemo(
    () => summary.campaignsSupported,
    [summary.campaignsSupported]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investor Dashboard</h1>
        <p className="text-gray-600">Track your investments and carbon credits in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">Carbon Credits (Earned)</h3>
            <Leaf className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {loading ? "…" : `${summary.totalCreditsEarned} VCC`}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Claimable now: {loading ? "…" : `${summary.claimableCredits} VCC`}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">Total Invested</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {loading ? "…" : `${summary.totalInvestedHBAR} HBAR`}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Across {loading ? "…" : campaignsCount} campaigns
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">Wallet Balance</h3>
            <Wallet className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {loading ? "…" : `${summary.walletBalanceHBAR} HBAR`}
          </p>
          {!isConnected ? (
            <p className="text-sm text-green-500 mt-2">Connect your wallet</p>
          ) : (
            <p className="text-sm text-green-500 mt-2">✓ Connected</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1">
        <Link href="/dashboard/campaigns" className="btn-primary text-center py-3">
          Invest in New Campaigns
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Investments</h2>
        {loading ? (
          <div className="text-gray-500">Loading investments…</div>
        ) : myInvestments.length === 0 ? (
          <div className="text-center text-gray-500">
            You have not invested in any campaigns yet.
          </div>
        ) : (
          <div className="space-y-3">
            {myInvestments.map((inv, idx) => (
              <div
                key={`${inv.campaignId}-${idx}`}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Campaign #{inv.campaignId}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {inv.creditsEarnedTons} VCC earned
                    {!inv.creditsClaimed && inv.creditsEarnedTons > 0 ? " • claimable" : ""}
                  </p>
                </div>
                <span className="font-bold text-green-600">
                  {inv.amountHBAR} HBAR
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
