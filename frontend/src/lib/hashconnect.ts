
import { HashConnect, HashConnectConnectionState } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";

const appMetadata = {
  name: "Verdant Vault",
  description: "A decentralized climate finance platform",
  icons: ["https://www.hashpack.app/img/logo.svg"],
  url: typeof window !== "undefined" ? window.location.origin : "",
};

export const hashConnect = new HashConnect(
  LedgerId.TESTNET,
  "1fb95b5b2e5d04f298327f1827586cce", // Replace with real project ID from walletconnect.com
  appMetadata,
  true
);

export let state: HashConnectConnectionState = HashConnectConnectionState.Disconnected;
export let pairingData: any = null;

hashConnect.pairingEvent.on((data) => {
  pairingData = data;
});

hashConnect.connectionStatusChangeEvent.on((connectionState) => {
  state = connectionState;
});

export const initHashConnect = async () => {
  await hashConnect.init();
};
