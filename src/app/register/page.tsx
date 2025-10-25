'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletConnect from '@/components/WalletConnect';

export default function RegisterPage() {
  const handleWalletConnect = (accountId: string) => {
    // Store wallet connection data
    localStorage.setItem('user', JSON.stringify({
      accountId,
      connectedAt: new Date().toISOString(),
    }));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <Header />

      <section className="relative z-10 flex-1 py-12 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Wallet Connection */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Connect Your Wallet
              </h1>
              <p className="text-gray-600 mb-8">
                Join Verdant Vault by connecting your HashPack wallet to start investing in sustainable projects
              </p>

              <WalletConnect onConnect={handleWalletConnect} />

              {/* Sign In Link */}
              <p className="text-center text-gray-600 mt-6">
                Already have a wallet connected?{' '}
                <Link href="/login" className="text-green-500 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Visual Elements */}
            <div className="hidden md:block relative">
              {/* Palm tree decoration */}
              <div
                className="w-full h-96 bg-no-repeat bg-contain bg-center"
                style={{
                  backgroundImage: "url('/images/palmtree.png')",
                }}
              ></div>

              {/* Floating leaves */}
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-no-repeat bg-contain"
                style={{
                  backgroundImage: "url('/images/Top leaves.png')",
                }}
              ></div>

              <div className="absolute bottom-0 left-0 text-center text-white bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Secure & Sustainable</h3>
                <p className="text-sm">Connect with confidence using Hedera's eco-friendly blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

