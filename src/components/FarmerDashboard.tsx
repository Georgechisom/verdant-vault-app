"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useVerdantVault } from "@/hooks/useVerdantVault";
import { useAccount } from "wagmi";
import { Wallet, TrendingUp, Leaf, ArrowUpRight, Settings } from "lucide-react";

export default function FarmerDashboard() {
  const { address, isConnected } = useAccount();
  const { getUserCampaigns, createCampaign } = useVerdantVault();
  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      // In a real implementation, you would fetch user's campaigns
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Farmer Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your campaigns and track your funding
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">Total Raised</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {userCampaigns.reduce(
              (total, campaign) =>
                total + Number(campaign.campaign.raisedAmount),
              0
            )}{" "}
            HBAR
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">My Campaigns</h3>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <Link href="/submit-project" className="btn-primary text-center py-3">
            Create New Campaign
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Campaigns</h2>
        </div>
      </div>
    </div>
  );
}
