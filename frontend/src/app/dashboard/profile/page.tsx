"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, usePublicClient, useWatchContractEvent } from "wagmi";
import { formatUnits } from "viem";
import {
  ABI,
  CONTRACT_ADDRESS,
  useCampaignCounter,
} from "../../../hooks/useVerdantVault";

type Tab = "farmer" | "investor";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { count } = useCampaignCounter();
  const [tab, setTab] = useState<Tab>("farmer");
  const [loading, setLoading] = useState(false);

  const [farmerStats, setFarmerStats] = useState({
    campaignsCreated: 0,
    totalRaisedHBAR: "0",
  });

  const [investorStats, setInvestorStats] = useState({
    campaignsFunded: 0,
    totalInvestedHBAR: "0",
    co2EarnedTons: "0",
  });

  const hasCampaigns = useMemo(() => (count ?? 0) > 0, [count]);

  async function fetchAnalytics() {
    try {
      if (!publicClient || !address || !hasCampaigns) return;
      setLoading(true);

      let farmer_campaignsCreated = 0;
      let farmer_totalRaised = BigInt(0);

      let investor_campaignsFunded = 0;
      let investor_totalInvested = BigInt(0);
      let investor_co2Earned = BigInt(0);

      for (let id = 1; id <= (count || 0); id++) {
        // campaigns(uint256) → [farmer, ipfsMetadata, fundingGoal, raisedAmount, deadline, estimatedCO2Tons, status]
        const campaign = (await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "campaigns",
          args: [BigInt(id)],
        })) as any;

        if (!campaign) continue;
        const [farmerAddr, , , raisedAmount] = campaign as [
          string,
          string,
          bigint,
          bigint
        ];

        // Farmer stats
        if (farmerAddr?.toLowerCase() === address.toLowerCase()) {
          farmer_campaignsCreated += 1;
          farmer_totalRaised += BigInt(raisedAmount || BigInt(0));
        }

        // Investor stats from investments
        const investments = (await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "getInvestments",
          args: [BigInt(id)],
        })) as any[] | undefined;

        if (Array.isArray(investments) && investments.length) {
          const myInvestments = investments.filter(
            (inv) => inv?.investor?.toLowerCase?.() === address.toLowerCase()
          );

          if (myInvestments.length > 0) {
            investor_campaignsFunded += 1;

            for (const inv of myInvestments) {
              investor_totalInvested += BigInt(inv?.amount || BigInt(0));
              investor_co2Earned += BigInt(inv?.creditsEarned || BigInt(0));
            }
          }
        }
      }

      setFarmerStats({
        campaignsCreated: farmer_campaignsCreated,
        totalRaisedHBAR: formatUnits(farmer_totalRaised, 8), // HBAR 8dp per contract storage
      });

      setInvestorStats({
        campaignsFunded: investor_campaignsFunded,
        totalInvestedHBAR: formatUnits(investor_totalInvested, 8),
        co2EarnedTons: formatUnits(investor_co2Earned, 18),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to compute analytics:", e);
    } finally {
      setLoading(false);
    }
  }

  // Initial + reactive analytics load
  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, count, publicClient]);

  // Refetch on key events
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CampaignCreated",
    onLogs: () => fetchAnalytics(),
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "InvestmentMade",
    onLogs: () => fetchAnalytics(),
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "MilestoneApproved",
    onLogs: () => fetchAnalytics(),
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "CarbonCreditsMinted",
    onLogs: () => fetchAnalytics(),
  });

  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "—";

  return (
    <div className="min-h-screen flex flex-col bg-background bckgimage">
      <section className="flex-1 py-8 px-4 pt-0">
        <div className="container-custom">
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col my-4">
              <h1 className="text-3xl font-bold text-white mb-1 text-nowrap">
                Profile & Analytics
              </h1>
              <p className="text-gray-800 hidden">
                Wallet: {isConnected ? addressShort : "Not connected"}
              </p>
            </div>

            {/* Role toggle */}
            <div className="flex items-center justify-center bg-white rounded-lg shadow-sm p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  tab === "farmer"
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setTab("farmer")}
              >
                Farmer
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  tab === "investor"
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setTab("investor")}
              >
                Investor
              </button>
            </div>
          </div>

          {/* Farmer view */}
          {tab === "farmer" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                <p className="font-mono text-sm break-all text-black">
                  {address || "—"}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">Campaigns Created</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "…" : farmerStats.campaignsCreated}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">
                  Total Raised (HBAR)
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {loading ? "…" : farmerStats.totalRaisedHBAR}
                </p>
              </div>
            </div>
          )}

          {/* Investor view */}
          {tab === "investor" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                <p className="font-mono text-sm break-all">{address || "—"}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">Campaigns Funded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "…" : investorStats.campaignsFunded}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">
                  Total Invested (HBAR)
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {loading ? "…" : investorStats.totalInvestedHBAR}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-3">
                <p className="text-sm text-gray-600 mb-1">
                  CO2 Credits Earned (tons)
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {loading ? "…" : investorStats.co2EarnedTons}
                </p>
              </div>
            </div>
          )}

          {/* Helper for investors: direct link to active campaigns */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2 text-black">Invest</h3>
              <p className="text-gray-600 mb-4">
                Explore active campaigns and fund directly from the Invest page.
              </p>
              <a
                href="/dashboard/invest"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Go to Invest
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
