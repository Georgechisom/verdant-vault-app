import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  setAddress: (address: string | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setChainId: (chainId: number | null) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      isConnected: false,
      chainId: null,
      setAddress: (address) => set({ address }),
      setIsConnected: (isConnected) => set({ isConnected }),
      setChainId: (chainId) => set({ chainId }),
      disconnect: () =>
        set({ address: null, isConnected: false, chainId: null }),
    }),
    {
      name: "wallet-storage",
    }
  )
);
