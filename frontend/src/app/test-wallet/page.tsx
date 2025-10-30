"use client";

import { Button } from "../../components/ui/button";
import { useWagmiWallet } from "../../hooks/useWagmiWallet";

export default function TestWalletPage() {
  const { address, isConnected, connect, disconnect } = useWagmiWallet();

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Wallet Connection Test
      </h1>
    </div>
  );
}