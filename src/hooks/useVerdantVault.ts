"use client";

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { VERDANT_VAULT_CONTRACT_ADDRESS } from '@/lib/constants';
import verdantVaultABI from '@/lib/abi.json';

export interface Campaign {
  farmer: string;
  ipfsMetadata: string;
  fundingGoal: bigint;
  raisedAmount: bigint;
  deadline: bigint;
  estimatedCO2Tons: bigint;
  status: number; // 0: Active, 1: Funded, 2: Completed, 3: Failed
}

export function useVerdantVault() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Read functions
  const { data: admin } = useReadContract({
    address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'admin',
  });

  const { data: campaignCounter } = useReadContract({
    address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'campaignCounter',
  });

  // Write functions
  const createCampaign = (
    ipfsMetadata: string,
    fundingGoal: bigint,
    durationDays: bigint,
    estimatedCO2: bigint
  ) => {
    return writeContract({
      address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'createCampaign',
    args: [ipfsMetadata, fundingGoal, durationDays, estimatedCO2],
    });
  };

  const invest = (
    campaignId: number,
    value: bigint
  ) => {
    return writeContract({
      address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'invest',
    args: [BigInt(campaignId)],
      value,
    });
  };

  const submitMilestoneProof = (
    campaignId: number,
    milestoneIndex: number,
    ipfsHash: string
  ) => {
    return writeContract({
      address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'submitMilestoneProof',
    args: [BigInt(campaignId), BigInt(milestoneIndex), ipfsHash],
    });
  };

  const approveMilestone = (
    campaignId: number,
    milestoneIndex: number
  ) => {
    return writeContract({
      address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'approveMilestone',
    args: [BigInt(campaignId), BigInt(milestoneIndex)],
    });
  };

  const mintCarbonCredits = (campaignId: number) => {
    return writeContract({
      address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'mintCarbonCredits',
    args: [BigInt(campaignId)],
    });
  };

  const claimRefund = (campaignId: number) => {
    return writeContract({
      address: VERDANT_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: verdantVaultABI,
    functionName: 'claimRefund',
    args: [BigInt(campaignId)],
    });
  };

  return {
    // Read data
    admin,
    campaignCounter,

    // Write functions
    createCampaign,
    invest,
    submitMilestoneProof,
    approveMilestone,
    mintCarbonCredits,
    claimRefund,

    // Current user
    address,
  };
}