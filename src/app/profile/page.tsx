"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockUserProfile, mockTransactions } from "@/lib/mockData";
import { User, Award, History, Settings } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("investments");
  const user = mockUserProfile;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 py-10"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      <Header />

      <section className="flex-1 py-12 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-green-500" />
                </div>

                {/* Profile Info */}
                <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-center text-sm mb-4">
                  {user.email}
                </p>
                <p className="text-gray-600 text-center text-sm mb-6">
                  {user.bio}
                </p>

                {/* Stats */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div>
                    <p className="text-gray-600 text-sm">Member Since</p>
                    <p className="font-semibold text-gray-900">
                      {user.joinDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Invested</p>
                    <p className="font-bold text-green-500 text-lg">
                      ${user.totalInvested}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Carbon Credits</p>
                    <p className="font-bold text-green-500 text-lg">
                      {user.totalCarbonCredits}
                    </p>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <Link
                  href="/settings"
                  className="w-full btn-secondary text-center mt-6"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Right Column - Activity */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("investments")}
                    className={`flex-1 px-6 py-4 font-semibold transition ${
                      activeTab === "investments"
                        ? "text-green-500 border-b-2 border-green-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Award className="inline mr-2" size={18} />
                    Investments
                  </button>
                  <button
                    onClick={() => setActiveTab("credits")}
                    className={`flex-1 px-6 py-4 font-semibold transition ${
                      activeTab === "credits"
                        ? "text-green-500 border-b-2 border-green-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Award className="inline mr-2" size={18} />
                    Carbon Credits
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`flex-1 px-6 py-4 font-semibold transition ${
                      activeTab === "history"
                        ? "text-green-500 border-b-2 border-green-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <History className="inline mr-2" size={18} />
                    History
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "investments" && (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">
                            Solar Farm Initiative
                          </h3>
                          <span className="text-green-500 font-bold">$500</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Kenya</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">
                            Reforestation Project
                          </h3>
                          <span className="text-green-500 font-bold">$300</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Brazil</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "credits" && (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Verified Carbon Credits
                            </h3>
                            <p className="text-gray-600 text-sm">
                              From renewable energy projects
                            </p>
                          </div>
                          <span className="text-green-500 font-bold text-lg">
                            250
                          </span>
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Reforestation Credits
                            </h3>
                            <p className="text-gray-600 text-sm">
                              From tree planting initiatives
                            </p>
                          </div>
                          <span className="text-green-500 font-bold text-lg">
                            150
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "history" && (
                    <div className="space-y-4">
                      {mockTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {tx.type}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {tx.date.toLocaleDateString()}
                            </p>
                          </div>
                          <span className="font-bold text-gray-900">
                            ${tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hedera Integration Placeholder */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-2">
                  Hedera Integration
                </h3>
                <p className="text-blue-800 text-sm">
                  TODO: Fetch user transactions from Hedera account using mirror
                  node API and display real-time transaction history
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
