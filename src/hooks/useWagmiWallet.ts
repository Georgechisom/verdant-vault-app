import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

export function useWagmiWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const connectWallet = async () => {
    try {
      await connect({ connector: metaMask() })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  return {
    address: address || null,
    isConnected,
    chainId: chainId || null,
    connect: connectWallet,
    disconnect: disconnectWallet,
  }
}