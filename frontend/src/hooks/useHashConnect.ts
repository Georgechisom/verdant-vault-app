import { useState, useEffect } from "react";
import { hashConnect, initHashConnect, state as hashConnectState, pairingData as hashConnectPairingData } from "../lib/hashconnect";
import { HashConnectConnectionState } from "hashconnect";

const useHashConnect = () => {
  const [state, setState] = useState<HashConnectConnectionState>(hashConnectState);
  const [pairingData, setPairingData] = useState<any>(hashConnectPairingData);

  useEffect(() => {
    const initialize = async () => {
      await initHashConnect();
      setState(hashConnectState);
      setPairingData(hashConnectPairingData);
    };

    initialize();

    const pairingSub = hashConnect.pairingEvent.on((data) => {
      setPairingData(data);
    });

    const connectionStatusChangeSub = hashConnect.connectionStatusChangeEvent.on((connectionState) => {
      setState(connectionState);
    });

    return () => {
      // pairingSub.off();
      // connectionStatusChangeSub.off();
    };
  }, []);

  return { hashConnect, state, pairingData };
};

export default useHashConnect;