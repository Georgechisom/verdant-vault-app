import { useCallback } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { useWalletStore } from "@/store/walletStore";
import { toast } from "react-hot-toast";
import { hederaMainnet } from "@/config/chains";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const walletStore = useWalletStore();

  const handleConnect = useCallback(async () => {
    try {
      // Find HashPack connector first
      const hashPackConnector = connectors.find((c) => c.id === "hashpack");

      if (hashPackConnector) {
        await connect({ connector: hashPackConnector });
      } else {
        // Show wallet selection modal by not specifying a connector
        await connect();
      }
    } catch (error: any) {
      console.error("Connection error:", error);
      toast.error(
        error?.message || "Failed to connect wallet. Please try again."
      );
    }
  }, [connect, connectors]);

  const handleDisconnect = useCallback(() => {
    try {
      disconnect();
      walletStore.disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Disconnect error:", error);
      toast.error("Failed to disconnect wallet");
    }
  }, [disconnect, walletStore]);

  const requestNetworkSwitch = useCallback(async () => {
    if (!window.ethereum) {
      toast.error("No Ethereum provider found");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${hederaMainnet.id.toString(16)}`,
            chainName: hederaMainnet.name,
            nativeCurrency: hederaMainnet.nativeCurrency,
            rpcUrls: hederaMainnet.rpcUrls.default.http,
            blockExplorerUrls: [
              hederaMainnet.blockExplorers?.default?.url,
            ].filter(Boolean),
          },
        ],
      });
    } catch (error) {
      console.error("Error switching network:", error);
      toast.error("Failed to switch network. Please try manually.");
    }
  }, []);

  return {
    address,
    isConnected,
    chainId: chain?.id,
    connect: handleConnect,
    disconnect: handleDisconnect,
    requestNetworkSwitch,
  };
}
