"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockUserProfile, mockTransactions } from "@/lib/mockData";
import { Wallet, TrendingUp, Leaf, ArrowUpRight, Settings } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(mockUserProfile);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // Redirect to register if not logged in
      window.location.href = "/register";
    }
  }, []);

  const handleConnectWallet = () => {
    setWalletConnected(true);
    // TODO: Integrate Hedera wallet connection here
    // const wallet = await connectHederaWallet();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 py-10"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      <Header />

      <section className="flex-1 py-8 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 bg-green-500 text-white rounded-lg font-semibold"
                >
                  Dashboard
                </Link>
                <Link
                  href="/projects"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Projects
                </Link>
                <Link
                  href="/carbon-credits"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Carbon Credits
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
                >
                  <Settings size={18} /> Settings
                </Link>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Welcome */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600">
                  Track your investments and carbon credits
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Carbon Credits Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">
                      Carbon Credits
                    </h3>
                    <Leaf className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {user.totalCarbonCredits}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">+50 this month</p>
                </div>

                {/* Investments Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">
                      Total Invested
                    </h3>
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    ${user.totalInvested}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Across 5 projects
                  </p>
                </div>

                {/* Wallet Balance Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">
                      Wallet Balance
                    </h3>
                    <Wallet className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    ${user.walletBalance}
                  </p>
                  {!walletConnected ? (
                    <button
                      onClick={handleConnectWallet}
                      className="text-sm text-green-500 font-semibold mt-2 hover:underline"
                    >
                      Connect Hedera Wallet
                    </button>
                  ) : (
                    <p className="text-sm text-green-500 mt-2">✓ Connected</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/carbon-credits"
                  className="btn-primary text-center py-3"
                >
                  Buy Carbon Credits
                </Link>
                <Link
                  href="/projects"
                  className="btn-secondary text-center py-3"
                >
                  Invest in Projects
                </Link>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Recent Transactions
                </h2>
                <div className="space-y-4">
                  {mockTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {tx.type}
                          </p>
                          <p className="text-sm text-gray-500">
                            {tx.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">${tx.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
