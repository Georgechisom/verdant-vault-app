"use client";

import { useState, useEffect, useCallback } from "react";
import HashConnect from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";
import { toast } from "react-hot-toast";

interface WalletState {
  isConnected: boolean;
  accountId: string | null;
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

// Minimal local type definitions for the HashConnect types we use.
// The package's type exports may vary between versions; keeping a small
// local definition prevents compilation errors while preserving type-safety
// for our usage.
type AppMetadata = {
  name: string;
  description?: string;
  icon?: string;
  url?: string;
};

type SavedPairingData = {
  topic: string;
  accountIds?: string[];
  metadata?: any;
};

type ConnectionState = string;

const APP_METADATA: AppMetadata = {
  name: "Verdant Vault",
  description: "Climate Finance Platform",
  icon: "/favicon.ico",
  url: typeof window !== "undefined" ? window.location.origin : "",
};

export const useHashPack = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    accountId: null,
    balance: null,
    isLoading: false,
    error: null,
  });

  // HashConnect's exported types vary across versions; use a local runtime
  // type for the instance to avoid depending on package type exports.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type HashConnectInstance = any;

  const [hashConnect, setHashConnect] = useState<HashConnectInstance | null>(
    null
  );
  const [pairingData, setPairingData] = useState<SavedPairingData | null>(null);

  // Initialize HashConnect
  useEffect(() => {
    const initHashConnect = async () => {
      try {
        // Initialize HashConnect. Some bundling/type setups export the class
        // as the default export but TypeScript's shape may not expose a
        // constructable signature; coerce to any for runtime construction.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const HashConnectCtor: any = HashConnect as any;
        // The constructor signature differs between versions; here we try
        // the common pattern used in the project. Adjust if your specific
        // hashconnect version requires different args.
        const hashConnectInstance: HashConnectInstance = new HashConnectCtor(
          LedgerId.TESTNET,
          "testnet",
          APP_METADATA,
          true
        );
        setHashConnect(hashConnectInstance);

        // Check for existing connection
        const savedData = localStorage.getItem("hashconnectData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setPairingData(parsedData);

          if (parsedData.accountIds?.[0]) {
            setWalletState((prev) => ({
              ...prev,
              isConnected: true,
              accountId: parsedData.accountIds[0],
            }));
          }
        }

        // Set up event listeners. The concrete types in the hashconnect
        // package can change between releases, so we type the handler params
        // loosely here to avoid compile-time errors while preserving runtime
        // behavior.
        try {
          // pairingEvent -> receives approval data when a user approves pairing
          // The shape typically contains topic, accountIds, metadata.
          // Use `any` to avoid relying on an exported type that may not exist.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (hashConnectInstance as any).pairingEvent.on((data: any) => {
            const pairingData: SavedPairingData = {
              topic: data.topic,
              accountIds: data.accountIds,
              metadata: data.metadata,
            };

            setPairingData(pairingData);

            // Save connection info
            localStorage.setItem(
              "hashconnectData",
              JSON.stringify(pairingData)
            );

            setWalletState((prev) => ({
              ...prev,
              isConnected: true,
              accountId: data.accountIds?.[0] || null,
              error: null,
            }));
            toast.success("Wallet connected successfully!");
          });

          // connectionStatusChangeEvent -> connection state updates
          (hashConnectInstance as any).connectionStatusChangeEvent.on(
            (state: ConnectionState) => {
              console.log("Connection status:", state);
              if (state === "Disconnected") {
                setPairingData(null);
                localStorage.removeItem("hashconnectData");
                setWalletState({
                  isConnected: false,
                  accountId: null,
                  balance: null,
                  isLoading: false,
                  error: null,
                });
                toast.error("Wallet connection lost");
              }
            }
          );
        } catch (err) {
          // If the runtime API differs, fall back gracefully.
          console.warn("HashConnect events not available on instance:", err);
        }
      } catch (error) {
        console.error("Failed to initialize HashConnect:", error);
        setWalletState((prev) => ({
          ...prev,
          error: "Failed to initialize wallet connection",
        }));
        toast.error("Failed to initialize wallet connection");
      }
    };

    if (typeof window !== "undefined" && !hashConnect) {
      initHashConnect();
    }

    // Cleanup on unmount
    return () => {
      if (hashConnect) {
        try {
          hashConnect.disconnect();
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }
    };
  }, []);

  // Connect to HashPack wallet
  const connectWallet = useCallback(async () => {
    if (!hashConnect) {
      toast.error("HashConnect not initialized");
      return;
    }

    setWalletState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Open the HashPack wallet modal
      hashConnect.openPairingModal();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setWalletState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to connect wallet",
      }));
      toast.error("Failed to connect wallet");
    } finally {
      setWalletState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [hashConnect]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    if (!hashConnect || !pairingData?.topic) return;

    try {
      hashConnect.disconnect();
      localStorage.removeItem("hashconnectData");
      setPairingData(null);
      setWalletState({
        isConnected: false,
        accountId: null,
        balance: null,
        isLoading: false,
        error: null,
      });
      toast.success("Wallet disconnected successfully");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  }, [hashConnect, pairingData]);

  // Get account balance
  const getBalance = useCallback(async () => {
    if (!walletState.accountId) return;

    try {
      // TODO: Replace with actual Hedera Mirror Node query when ready
      const mockBalance = "1000.00";
      setWalletState((prev) => ({
        ...prev,
        balance: mockBalance,
      }));
    } catch (error) {
      console.error("Failed to get balance:", error);
      setWalletState((prev) => ({
        ...prev,
        error: "Failed to get account balance",
      }));
      toast.error("Failed to get account balance");
    }
  }, [walletState.accountId]);

  // Get balance when account is connected
  useEffect(() => {
    if (walletState.isConnected && walletState.accountId) {
      getBalance();
    }
  }, [walletState.isConnected, walletState.accountId, getBalance]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    getBalance,
    hashConnect,
    pairingData,
  };
};
