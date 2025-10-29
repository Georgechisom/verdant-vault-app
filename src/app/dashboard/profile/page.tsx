"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

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
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/campaigns"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Campaigns
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 bg-green-500 text-white rounded-lg font-semibold"
                >
                  Campaigns
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 bg-green-500 text-white rounded-lg font-semibold"
                >
                  Profile
                </Link>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  User Profile
                </h1>
                <p className="text-gray-600">
                  Manage your account information and preferences
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
