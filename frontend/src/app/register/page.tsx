"use client";

import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
   const { address, isConnected } = useAccount();
   const router = useRouter()
  
    useEffect(() => {
      if (isConnected && address) {
        router.push('/dashboard')
      }
    }, [isConnected, address]);
    
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 my-20"></div>

      <Header />

      <section className="relative z-10 flex-1 py-12 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Wallet Connection */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl text-gray-900">
                  Connect Your Wallet
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Join Verdant Vault by connecting your wallet to start
                  investing in sustainable projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {/* <WalletButton mode="register" /> */}
                  <ConnectButton />

                  <p className="text-sm text-gray-500 text-center">
                    By connecting your wallet, you agree to our Terms of Service
                    and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>

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
                <h3 className="text-xl font-semibold mb-2">
                  Secure & Sustainable
                </h3>
                <p className="text-sm">
                  Connect with confidence using Hedera's eco-friendly blockchain
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
