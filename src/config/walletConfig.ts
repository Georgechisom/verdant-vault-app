import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { hederaMainnet, hederaTestnet } from "./chains";

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID environment variable. Get it from https://cloud.walletconnect.com"
  );
}

export const { chains, publicClient } = configureChains(
  [hederaMainnet, hederaTestnet],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Hedera Native",
    wallets: [
      {
        id: "hashpack",
        name: "HashPack",
        iconUrl: "https://www.hashpack.app/img/logo.svg",
        iconBackground: "#fff",
        createConnector: () => {
          // Closure state for the connector instance and storage
          let _hashConnect: any = null;
          let _storage: any = null;

          return {
            connector: {
              id: "hashpack",
              name: "HashPack",
              // Mark as a non-standard/external wallet to avoid being treated
              // as a browser-injected `ethereum` provider by connector managers.
              // This reduces the chance of duplication with other injected
              // wallets like MetaMask.
              type: "wallet",
              ready: typeof window !== "undefined",
              // setStorage is expected by wagmi internals — provide a noop setter
              // that stores the value in closure so other methods can use it if
              // necessary.
              setStorage: (storage: any) => {
                _storage = storage;
              },
              // Connect to HashPack via HashConnect
              connect: async () => {
                // Dynamic import and resilient access to HashConnect export (default or named)
                const hashconnectModule: any = await import("hashconnect");
                const HashConnectCtor =
                  hashconnectModule?.default ?? hashconnectModule?.HashConnect;
                _hashConnect = new HashConnectCtor();

                // Try to init/connect using common patterns. Specific API may differ
                // between versions of hashconnect; if your version requires different
                // args adjust accordingly.
                try {
                  if (_hashConnect.init) {
                    await _hashConnect.init(
                      {
                        appMetadata: {
                          name: "Verdant Vault",
                          description: "Carbon Credit Trading Platform",
                          icon: "https://verdant-vault.com/logo.png",
                        },
                      },
                      "mainnet",
                      false
                    );
                  }
                } catch (err) {
                  // Some versions accept a single object; ignore init errors here
                  console.warn(
                    "HashConnect init failed or used different signature",
                    err
                  );
                }

                const state = _hashConnect.connect
                  ? await _hashConnect.connect()
                  : null;
                return {
                  account: state?.topic,
                  chain: {
                    id: chains?.[0]?.id ?? 0,
                    unsupported: false,
                  },
                };
              },
              disconnect: async () => {
                try {
                  if (_hashConnect?.disconnect) await _hashConnect.disconnect();
                } catch (err) {
                  console.warn("HashPack disconnect failed", err);
                }
              },
              // getAccount/getChainId etc. — small implementations to be compatible
              getAccount: async () => {
                try {
                  if (!_hashConnect || !_hashConnect.getConnectionState)
                    return null;
                  const s = await _hashConnect.getConnectionState();
                  return s?.accountIds?.[0] ?? s?.topic ?? null;
                } catch (err) {
                  return null;
                }
              },
              getChainId: async () => {
                // Hedera doesn't have EVM chain ids here; return the configured chain
                return chains?.[0]?.id ?? 0;
              },
              getProvider: async () => _hashConnect,
              isAuthorized: async () => {
                try {
                  if (!_hashConnect || !_hashConnect.getConnectionState)
                    return false;
                  const s = await _hashConnect.getConnectionState();
                  return !!(s?.accountIds?.length || s?.topic);
                } catch {
                  return false;
                }
              },
            },
          } as any;
        },
      },
    ],
  },
  {
    groupName: "Popular",
    wallets: [
      walletConnectWallet({ projectId: walletConnectProjectId, chains }),
      rainbowWallet({ projectId: walletConnectProjectId, chains }),
      metaMaskWallet({ projectId: walletConnectProjectId, chains }),
      coinbaseWallet({ chains, appName: "Verdant Vault" }),
      // removed injectedWallet to reduce duplicate/injected connector handling
      // which can lead to extension conflicts in the console. Use explicit
      // metaMaskWallet / walletConnectWallet / coinbaseWallet instead.
    ],
  },
]);

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
