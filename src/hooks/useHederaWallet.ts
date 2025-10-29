import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { hashConnect, initHashConnect, pairingData, HashConnectConnectionState } from "@/lib/hashconnect";

export function useHederaWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const initialize = async () => {
      await initHashConnect();
      if (pairingData) {
        const provider = hashConnect.getProvider("testnet", pairingData.topic, pairingData.accountIds[0]);
        const signer = provider.getSigner();
        setAddress(pairingData.accountIds[0]);
        setIsConnected(true);
        setProvider(provider as any);
        setSigner(signer);
      }
    };

    initialize();

    hashConnect.pairingEvent.on((data) => {
      if (data.accountIds.length > 0) {
        const provider = hashConnect.getProvider("testnet", data.topic, data.accountIds[0]);
        const signer = provider.getSigner();
        setAddress(data.accountIds[0]);
        setIsConnected(true);
        setProvider(provider as any);
        setSigner(signer);
      }
    });

    hashConnect.connectionStatusChangeEvent.on((status) => {
      if (status === HashConnectConnectionState.Disconnected) {
        setAddress(null);
        setIsConnected(false);
        setProvider(null);
        setSigner(null);
      }
    });
  }, []);

  const connect = () => {
    if (hashConnect.state === HashConnectConnectionState.Disconnected) {
      hashConnect.connectToLocalWallet();
    }
  };

  const disconnect = () => {
    hashConnect.disconnect(pairingData?.topic || "");
  };

  return {
    address,
    isConnected,
    provider,
    signer,
    connect,
    disconnect,
  };
}