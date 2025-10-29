'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, LogOut, Loader2, AlertCircle } from 'lucide-react';

interface WalletConnectProps {
  onConnect?: (accountId: string) => void;
  showBalance?: boolean;
  className?: string;
}

export default function WalletConnect({ 
  onConnect, 
  showBalance = true, 
  className = '' 
}: WalletConnectProps) {
  const router = useRouter();
  const {
    isConnected,
    address,
    connect,
    disconnect,
  } = useWallet();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);


  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await connect();
      if (address) {
        toast.success('Wallet connected successfully!');
        onConnect?.(address);
        // Redirect to dashboard after successful connection
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (error) {
      const e = error as Error
      toast.error(e.message ?? 'Failed to connect wallet');
      setError(e.message ?? 'Failed to connect wallet');
      console.error('Wallet connection error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
      console.error('Wallet disconnection error:', error);
    }
  };

  if (error) {
    return (
      <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <div className="flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <div>
            <h3 className="font-semibold">Connection Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
        <button
          onClick={handleConnect}
          className="mt-4 btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className={`p-6 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Wallet Connected</h3>
              <p className="text-sm text-green-700">
                {address.slice(0, 8)}...{address.slice(-6)}
              </p>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Connect your HashPack wallet to start trading carbon credits and investing in sustainable projects.
        </p>
      </div>

      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5" />
            Connect HashPack Wallet
          </>
        )}
      </button>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Don't have HashPack?</h4>
        <p className="text-sm text-blue-700 mb-3">
          HashPack is the leading wallet for the Hedera network. Download it to get started.
        </p>
        <a
          href="https://www.hashpack.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          Download HashPack
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}