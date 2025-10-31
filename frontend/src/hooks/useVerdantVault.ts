import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, parseUnits } from 'viem';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` || '0x';

export const ABI = [
  {
    inputs: [{ internalType: "address", name: "_carbonCreditToken", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  // Functions
  {
    inputs: [
      { internalType: "string", name: "_ipfsMetadata", type: "string" },
      { internalType: "uint256", name: "_fundingGoal", type: "uint256" },
      { internalType: "uint256", name: "_durationDays", type: "uint256" },
      { internalType: "uint256", name: "_estimatedCO2", type: "uint256" }
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "invest",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_campaignId", type: "uint256" },
      { internalType: "uint256", name: "_milestoneIndex", type: "uint256" },
      { internalType: "string", name: "_ipfsHash", type: "string" }
    ],
    name: "submitMilestoneProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_campaignId", type: "uint256" },
      { internalType: "uint256", name: "_milestoneIndex", type: "uint256" }
    ],
    name: "approveMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "claimCarbonCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "claimRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  // Views
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "campaigns",
    outputs: [
      { internalType: "address payable", name: "farmer", type: "address" },
      { internalType: "string", name: "ipfsMetadata", type: "string" },
      { internalType: "uint256", name: "fundingGoal", type: "uint256" },
      { internalType: "uint256", name: "raisedAmount", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint256", name: "estimatedCO2Tons", type: "uint256" },
      { internalType: "uint8", name: "status", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "campaignCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "carbonCreditToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "getMilestones",
    outputs: [{
      components: [
        { internalType: "string", name: "description", type: "string" },
        { internalType: "uint8", name: "fundPercentage", type: "uint8" },
        { internalType: "string", name: "proofIpfsHash", type: "string" },
        { internalType: "bool", name: "completed", type: "bool" },
        { internalType: "bool", name: "approved", type: "bool" }
      ],
      internalType: "struct VerdantVault.Milestone[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "getInvestments",
    outputs: [{
      components: [
        { internalType: "address", name: "investor", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "creditsEarned", type: "uint256" },
        { internalType: "bool", name: "creditsClaimed", type: "bool" }
      ],
      internalType: "struct VerdantVault.Investment[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_campaignId", type: "uint256" },
      { internalType: "address", name: "_investor", type: "address" }
    ],
    name: "getClaimableCredits",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "claimed", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "getMilestoneCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_campaignId", type: "uint256" }],
    name: "getInvestmentCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: true, internalType: "address", name: "farmer", type: "address" },
      { indexed: false, internalType: "uint256", name: "fundingGoal", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "deadline", type: "uint256" }
    ],
    name: "CampaignCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: true, internalType: "address", name: "investor", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "InvestmentMade",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "milestoneIndex", type: "uint256" },
      { indexed: false, internalType: "string", name: "ipfsHash", type: "string" }
    ],
    name: "MilestoneProofSubmitted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "milestoneIndex", type: "uint256" }
    ],
    name: "MilestoneApproved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "FundsReleased",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" }
    ],
    name: "CarbonCreditsMinted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "campaignId", type: "uint256" },
      { indexed: true, internalType: "address", name: "investor", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "CarbonCreditsClaimed",
    type: "event"
  }
] as const;

export const useVerdantVault = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();

  const createCampaign = (
    ipfsMetadata: string,
    fundingGoal: string,
    durationDays: number,
    estimatedCO2: string
  ) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'createCampaign',
      args: [
        ipfsMetadata,
        parseUnits(fundingGoal, 8),
        BigInt(durationDays),
        parseUnits(estimatedCO2, 18)
      ],
    });
  };

  const invest = (campaignId: number, amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'invest',
      args: [BigInt(campaignId)],
      value: parseEther(amount),
    });
  };

  const submitMilestoneProof = (
    campaignId: number,
    milestoneIndex: number,
    ipfsHash: string
  ) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'submitMilestoneProof',
      args: [BigInt(campaignId), BigInt(milestoneIndex), ipfsHash],
    });
  };

  const approveMilestone = (campaignId: number, milestoneIndex: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'approveMilestone',
      args: [BigInt(campaignId), BigInt(milestoneIndex)],
    });
  };

  const claimCarbonCredits = (campaignId: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'claimCarbonCredits',
      args: [BigInt(campaignId)],
    });
  };

  const claimRefund = (campaignId: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'claimRefund',
      args: [BigInt(campaignId)],
    });
  };

  return {
    address,
    hash,
    isPending,
    createCampaign,
    invest,
    submitMilestoneProof,
    approveMilestone,
    claimCarbonCredits,
    claimRefund,
  };
};

export const useCampaign = (campaignId: number) => {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'campaigns',
    args: [BigInt(campaignId)],
  });

  return {
    campaign: data,
    isLoading,
    refetch,
  };
};

export const useCampaignCounter = () => {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'campaignCounter',
  });

  return {
    count: data ? Number(data) : 0,
    isLoading,
    refetch
  };
};

export const useAdmin = () => {
  const { data, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'admin',
  });

  return {
    adminAddress: data as string,
    isLoading,
  };
};

export const useCarbonCreditToken = () => {
  const { data, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'carbonCreditToken',
  });

  return {
    tokenAddress: data as string,
    isLoading,
  };
};

export const useMilestones = (campaignId: number) => {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getMilestones',
    args: [BigInt(campaignId)],
  });

  return {
    milestones: data,
    isLoading,
    refetch,
  };
};

export const useInvestments = (campaignId: number) => {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getInvestments',
    args: [BigInt(campaignId)],
  });

  return {
    investments: data,
    isLoading,
    refetch,
  };
};

export const useClaimableCredits = (campaignId: number, investorAddress?: string) => {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getClaimableCredits',
    args: investorAddress ? [BigInt(campaignId), investorAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!investorAddress,
    },
  });

  return {
    claimableAmount: data ? data[0] : BigInt(0),
    isClaimed: data ? data[1] : false,
    isLoading,
    refetch,
  };
};