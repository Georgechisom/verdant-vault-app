"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
// import { getCampaigns, getVerdantVaultContract } from "@/lib/hedera";
import { FarmCampaign } from "../lib/mockData";
import { ethers } from "ethers";
import GrowWealth from "../components/GrowWealth";
import ThreeSteps from "../components/ThreeSteps";
import VaultTools from "../components/VaultTools";
import RealReturns from "../components/RealReturns";

export default function Page() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaigns, setCampaigns] = useState<FarmCampaign[]>([]);

  // useEffect(() => {
  //   const fetchCampaigns = async () => {
  //     const fetchedCampaigns = await getCampaigns();
  //     setCampaigns(fetchedCampaigns as FarmCampaign[]);
  //   };
  //   fetchCampaigns();
  // }, []);

  // const handleInvest = async (campaignId: string, amount: number) => {
  //   if (!isConnected || !signer) {
  //     alert("Please connect your Hedera wallet first.");
  //     return;
  //   }

  //   try {
  //     const contract = getVerdantVaultContract(signer);
  //     const tx = await contract.invest(campaignId, {
  //       value: ethers.utils.parseEther(amount.toString()),
  //     });
  //     await tx.wait();
  //     alert("Investment successful!");
  //   } catch (error) {
  //     console.error("Investment failed:", error);
  //     alert("Investment failed. Please try again.");
  //   }
  // };

  const cropTypes = ["Maize", "Rice", "Cassava", "Beans"];

  const filteredCampaigns = selectedCrop
    ? campaigns.filter((c) => c.cropType === selectedCrop)
    : campaigns;

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative overflow-hidden hidden">
        <HeroSection />

        <section className="py-12 px-4 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 my-6 text-center">
              Farmer Campaigns
            </h2>
            <p className="text-gray-600 mb-12 text-center">
              Invest in sustainable agriculture and earn carbon credits
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 hidden">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Filter by Crop Type
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedCrop(null);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCrop === null
                          ? "bg-green-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Campaigns
                    </button>
                    {cropTypes.map((crop) => (
                      <button
                        key={crop}
                        onClick={() => {
                          setSelectedCrop(crop);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                          selectedCrop === crop
                            ? "bg-green-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campaigns Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {paginatedCampaigns.length > 0 ? (
                    paginatedCampaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition"
                      >
                        {/* Image */}
                        <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🌱</div>
                            <p className="text-gray-600 text-sm">
                              {campaign.cropType}
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {campaign.farmer}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {`Expanding ${campaign.cropType} farm in ${campaign.location}`}
                          </p>

                          {/* Location and Impact */}
                          <div className="space-y-2 mb-4 text-sm">
                            <p className="text-gray-600">
                              <span className="font-semibold">Location:</span>{" "}
                              {campaign.location}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">CO2 Reduction:</span>{" "}
                              {`${campaign.estimatedCO2Tons} tons`}
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">
                                {`${campaign.raisedAmount.toLocaleString()} / ${campaign.fundingGoal.toLocaleString()} HBAR`}
                              </span>
                              <span className="font-semibold text-green-500">
                                {`${Math.round((campaign.raisedAmount / campaign.fundingGoal) * 100)}%`}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.round((campaign.raisedAmount / campaign.fundingGoal) * 100)}%` }}
                              />
                            </div>
                          </div>

                          {/* Invest Button */}
                          <button
                            // onClick={() => handleInvest(campaign.id, 100)} // Example investment of 100 HBAR
                            className="w-full btn-primary text-center block"
                          >
                            Invest Now
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center md:col-span-2">
                      <p className="text-gray-600">
                        No campaigns available at the moment.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition ${
                          currentPage === page
                            ? "bg-green-500 text-white"
                            : "border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <main className="relative overflow-hidden">
        {/* Decorative Leaves */}
        <img
          src="/leaf-left.png"
          alt=""
          className="leaf-decoration w-64 h-96 -left-20 top-20 animate-float"
        />
        <img
          src="/leaf-right.png"
          alt=""
          className="leaf-decoration w-64 h-96 -right-20 top-[800px] animate-float"
          style={{ animationDelay: "1s" }}
        />

        <HeroSection />
        <GrowWealth />
        <ThreeSteps />
        <VaultTools />
        <RealReturns />
        {/* <ContactForm /> */}
      </main>

      <Footer />
    </div>
  );
}
