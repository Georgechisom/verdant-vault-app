"use client";

import { useAccount, useSwitchChain } from 'wagmi'
import { Button } from "./ui/button"
import { toast } from "react-hot-toast"

export function NetworkConfig() {
  const { chainId } = useAccount()
  const { switchChain } = useSwitchChain()

  const handleAddNetwork = async () => {
    try {
      await switchChain({ chainId: 296 })
      toast.success('Hedera Testnet added to your wallet!')
    } catch (error) {
      console.error('Failed to add network:', error)
      toast.error('Failed to add Hedera network. Please add manually.')
    }
  }

  const isHederaNetwork = chainId === 296

  return (
    <div className="p-4 border rounded-lg bg-background">
      <h3 className="text-lg font-semibold mb-2">Network Configuration</h3>
      <p className="text-sm text-muted-foreground mb-4">
        To use Verdant Vault, please add the Hedera Testnet to your wallet.
      </p>
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-medium">Current Network:</span> {isHederaNetwork ? 'Hedera Testnet' : 'Unsupported Network'}
        </div>
        {!isHederaNetwork && (
          <Button onClick={handleAddNetwork} size="sm">
            Add Hedera Testnet
          </Button>
        )}
      </div>
    </div>
  )
}