"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useVerdantVault } from "@/hooks/useVerdantVault";
import { useAccount } from "wagmi";
import { Wallet, TrendingUp, Leaf, ArrowUpRight } from "lucide-react";

export default function InvestorDashboard() {
  const { address, isConnected } = useAccount();
  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Track your investments and carbon credits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">
              Carbon Credits
            </h3>
            <Leaf className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            0 VCC
          </p>
          <p className="text-sm text-gray-500 mt-2">+0 this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">
              Total Invested
            </h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            0 HBAR
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Across 0 campaigns
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">
              Wallet Balance
            </h3>
            <Wallet className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            0 HBAR
          </p>
          {!isConnected ? (
            <p className="text-sm text-green-500 mt-2">Connect your wallet</p>
          ) : (
            <p className="text-sm text-green-500 mt-2">✓ Connected</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1">
        <Link
          href="/dashboard/campaigns"
          className="btn-primary text-center py-3"
        >
          Invest in New Campaigns
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          My Investments
        </h2>
        <div className="text-center text-gray-500">
          You have not invested in any campaigns yet.
        </div>
      </div>
    </div>
  );
}
