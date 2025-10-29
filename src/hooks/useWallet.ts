import { useCallback, useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { toast } from "react-hot-toast";
import useHashConnect from "./useHashConnect";
import { HashConnectConnectionState } from "hashconnect";

export function useWallet() {
  const { hashConnect, state, pairingData } = useHashConnect();
  const { address, isConnected, setAddress, setIsConnected, disconnect: storeDisconnect } = useWalletStore();

  // Handle pairing events
  useEffect(() => {
    if (pairingData?.accountIds?.[0]) {
      const accountId = pairingData.accountIds[0];
      if (accountId !== address) { // Only update if changed
        setAddress(accountId);
        setIsConnected(true);
        toast.success("Wallet connected!");
      }
    }
  }, [pairingData, setAddress, setIsConnected, address]);

  // Handle connection state changes
  useEffect(() => {
    if (state === HashConnectConnectionState.Disconnected && isConnected) {
      storeDisconnect();
      toast.error("Wallet disconnected");
    }
  }, [state, isConnected, storeDisconnect]);

  const connect = useCallback(async () => {
    if (!hashConnect) {
      toast.error("HashConnect not initialized");
      return;
    }

    try {
      // Open pairing modal - shows QR code and pairing string
      hashConnect.openPairingModal();
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  }, [hashConnect]);

  const disconnect = useCallback(() => {
    if (hashConnect) {
      hashConnect.disconnect();
      storeDisconnect();
      toast.success("Wallet disconnected");
    }
  }, [hashConnect, storeDisconnect]);

  return {
    address,
    isConnected,
    connect,
    disconnect,
    hashConnect, // Expose for transaction signing
  };
}