"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockCarbonCredits } from "@/lib/mockData";
import { Search, Filter } from "lucide-react";

export default function CarbonCreditsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [totalPurchased, setTotalPurchased] = useState(0);

  const types = [
    "Renewable Energy",
    "Reforestation",
    "Clean Energy",
    "Clean Water",
  ];

  const filteredCredits = mockCarbonCredits.filter((credit) => {
    const matchesSearch =
      credit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || credit.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBuyNow = (credit: (typeof mockCarbonCredits)[0]) => {
    setTotalPurchased((prev) => prev + credit.price);
    toast.success(`Added ${credit.name} to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 py-10"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      <Header />

      <section className="flex-1 py-12 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-2">
            Carbon Credit Marketplace
          </h1>
          <p className="text-gray-100 mb-12">
            Browse and purchase verified carbon credits from sustainable
            projects
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={20} /> Filters
                </h3>

                {/* Type Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Credit Type
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedType(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedType === null
                          ? "bg-green-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Types
                    </button>
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition ${
                          selectedType === type
                            ? "bg-green-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Total Purchased</p>
                  <p className="text-2xl font-bold text-green-500">
                    ${totalPurchased}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search carbon credits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Credits List */}
              <div className="space-y-4">
                {filteredCredits.length > 0 ? (
                  filteredCredits.map((credit) => (
                    <div
                      key={credit.id}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {credit.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {credit.description}
                        </p>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <p className="text-gray-600">Type</p>
                            <p className="font-semibold text-gray-900">
                              {credit.type}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Available</p>
                            <p className="font-semibold text-gray-900">
                              {credit.available.toLocaleString()} units
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <p className="text-3xl font-bold text-green-500 mb-4">
                          ${credit.price}
                        </p>
                        <button
                          onClick={() => handleBuyNow(credit)}
                          className="btn-primary whitespace-nowrap"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <p className="text-gray-600">
                      No carbon credits found matching your criteria
                    </p>
                  </div>
                )}
              </div>

              {/* Hedera Integration Placeholder */}
              <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-2">
                  Hedera Integration
                </h3>
                <p className="text-blue-800 text-sm">
                  TODO: Integrate search from Hedera mirror node to fetch
                  real-time carbon credit data and pricing
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
