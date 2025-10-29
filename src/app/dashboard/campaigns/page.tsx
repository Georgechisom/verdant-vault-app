"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVerdantVault } from "@/hooks/useVerdantVault";
import { useAccount } from "wagmi";
import { Settings, TrendingUp, Calendar, Target, Users } from "lucide-react";

export default function CampaignsPage() {
  const { address, isConnected } = useAccount();
  const { campaignCounter } = useVerdantVault();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const fetchCampaigns = async () => {
        try {
          // In a real implementation, you would fetch campaigns from the contract
          // For now, we'll simulate loading campaigns
          setLoading(false);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
          setLoading(false);
        }
      };
      fetchCampaigns();
    } else {
      setLoading(false);
    }
  }, [isConnected, campaignCounter]);

  const formatHBAR = (amount: bigint) => {
    return Number(amount) / 1e8 + " HBAR";
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return "Active";
      case 1: return "Funded";
      case 2: return "Completed";
      case 3: return "Failed";
      default: return "Unknown";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return "bg-green-100 text-green-800";
      case 1: return "bg-blue-100 text-blue-800";
      case 2: return "bg-gray-100 text-gray-800";
      case 3: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background bckgimage">
      <Header />

      <section className="flex-1 py-8 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/campaigns"
                  className="block px-4 py-2 bg-green-500 text-white rounded-lg font-semibold"
                >
                  Campaigns
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
                >
                  <Settings size={18} /> Settings
                </Link>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    All Campaigns
                  </h1>
                  <p className="text-gray-600">
                    Discover and invest in sustainable farming projects
                  </p>
                </div>

                {!isConnected ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Connect Your Wallet
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Please connect your wallet to view and interact with campaigns.
                    </p>
                  </div>
                ) : loading ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ) : campaigns.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      No Campaigns Available
                    </h2>
                    <p className="text-gray-600 mb-4">
                      There are currently no active campaigns. Check back later or create your own campaign.
                    </p>
                    <Link
                      href="/submit-project"
                      className="btn-primary inline-block"
                    >
                      Create Campaign
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Campaign #{campaign.id}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.campaign.status)}`}>
                            {getStatusText(campaign.campaign.status)}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users size={16} />
                            <span>Farmer: {campaign.campaign.farmer.slice(0, 8)}...{campaign.campaign.farmer.slice(-6)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Target size={16} />
                            <span>Goal: {formatHBAR(campaign.campaign.fundingGoal)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp size={16} />
                            <span>Raised: {formatHBAR(campaign.campaign.raisedAmount)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            <span>Deadline: {formatDate(campaign.campaign.deadline)}</span>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${Math.min(100, (Number(campaign.campaign.raisedAmount) / Number(campaign.campaign.fundingGoal)) * 100)}%` 
                            }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {Math.round((Number(campaign.campaign.raisedAmount) / Number(campaign.campaign.fundingGoal)) * 100)}% funded
                          </span>
                          <Link
                            href={`/invest/${campaign.id}`}
                            className="btn-primary text-sm"
                          >
                            Invest Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}