"use client";

import { Button } from "@/components/ui/button";
import { useHederaWallet } from "@/hooks/useHederaWallet";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface WalletButtonProps {
  mode?: "header" | "register";
}

export function WalletButton({ mode = "header" }: WalletButtonProps) {
  const { address, isConnected, connect, disconnect } = useHederaWallet();
  const router = useRouter();

  // Handle successful connection
  useEffect(() => {
    if (isConnected && mode === "register") {
      router.push("/dashboard");
    }
  }, [isConnected, mode, router]);

  // Truncate address for display
  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  // Handle button click
  const handleClick = async () => {
    if (isConnected) {
      if (mode === "header") {
        router.push("/dashboard");
      } else {
        disconnect();
      }
    } else {
      await connect();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={mode === "header" ? "outline" : "default"}
      className={
        mode === "header" ? "bg-transparent text-white hover:bg-white/10" : ""
      }
    >
      {isConnected
        ? mode === "header"
          ? truncatedAddress
          : "Disconnect Wallet"
        : mode === "header"
        ? "Join the Vault"
        : "Connect Wallet"}
    </Button>
  );
}
