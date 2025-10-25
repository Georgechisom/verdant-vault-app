'use client';

import { useState, useEffect, useCallback } from 'react';
import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';

interface WalletState {
  isConnected: boolean;
  accountId: string | null;
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useHashPack = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    accountId: null,
    balance: null,
    isLoading: false,
    error: null,
  });

  const [hashConnect, setHashConnect] = useState<HashConnect | null>(null);
  const [pairingData, setPairingData] = useState<HashConnectTypes.SavedPairingData | null>(null);

  // Initialize HashConnect
  useEffect(() => {
    const initHashConnect = async () => {
      try {
        const hashConnectInstance = new HashConnect(true); // true for debug mode
        setHashConnect(hashConnectInstance);

        // Set up event listeners
        hashConnectInstance.pairingEvent.on((data) => {
          console.log('Pairing event:', data);
          setPairingData(data);
          setWalletState(prev => ({
            ...prev,
            isConnected: true,
            accountId: data.accountIds[0] || null,
            error: null,
          }));
        });

        hashConnectInstance.disconnectionEvent.on(() => {
          console.log('Disconnection event');
          setPairingData(null);
          setWalletState({
            isConnected: false,
            accountId: null,
            balance: null,
            isLoading: false,
            error: null,
          });
        });

        hashConnectInstance.connectionStatusChangeEvent.on((state) => {
          console.log('Connection status change:', state);
        });

        // Initialize the connection
        const initData = await hashConnectInstance.init({
          name: 'Verdant Vault',
          description: 'Sustainable Carbon Credit Trading Platform',
          icon: '/favicon.ico',
          url: window.location.origin,
        });

        console.log('HashConnect initialized:', initData);
      } catch (error) {
        console.error('Failed to initialize HashConnect:', error);
        setWalletState(prev => ({
          ...prev,
          error: 'Failed to initialize wallet connection',
        }));
      }
    };

    initHashConnect();
  }, []);

  // Connect to HashPack wallet
  const connectWallet = useCallback(async () => {
    if (!hashConnect) {
      setWalletState(prev => ({
        ...prev,
        error: 'HashConnect not initialized',
      }));
      return;
    }

    setWalletState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Open pairing modal
      hashConnect.openPairingModal();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to connect wallet',
      }));
    }
  }, [hashConnect]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    if (!hashConnect || !pairingData) return;

    try {
      await hashConnect.disconnect(pairingData.topic);
      setPairingData(null);
      setWalletState({
        isConnected: false,
        accountId: null,
        balance: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      setWalletState(prev => ({
        ...prev,
        error: 'Failed to disconnect wallet',
      }));
    }
  }, [hashConnect, pairingData]);

  // Get account balance
  const getBalance = useCallback(async () => {
    if (!walletState.accountId) return;

    try {
      // In a real implementation, you would fetch the balance from Hedera Mirror Node
      // For now, we'll use a placeholder
      const mockBalance = '1000.00';
      setWalletState(prev => ({
        ...prev,
        balance: mockBalance,
      }));
    } catch (error) {
      console.error('Failed to get balance:', error);
      setWalletState(prev => ({
        ...prev,
        error: 'Failed to get account balance',
      }));
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
