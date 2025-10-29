export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'investor' | 'verifier';
  totalCarbonCredits: number;
  totalInvested: number;
  walletBalance: number;
  joinedDate: Date;
  bio?: string;
  joinDate?: Date;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: Date;
}

export type CampaignStatus = "Active" | "Funded" | "Completed" | "Failed";

export interface Milestone {
  description: string;
  fundPercentage: number;
  proofIpfsHash: string;
  completed: boolean;
}

export interface FarmCampaign {
  id: string;
  farmer: string; // Name of farmer or farm
  location: string;
  cropType: "Maize" | "Rice" | "Cassava" | "Beans";
  ipfsMetadata: string; // Link to IPFS hash with farm details, photos
  fundingGoal: number; // in HBAR
  raisedAmount: number; // in HBAR
  deadline: Date;
  estimatedCO2Tons: number;
  status: CampaignStatus;
  milestones: Milestone[];
}

export interface NFTMetadata {
  farmId: string;
  tons: number;
  sdg: string;
  coBenefits: string[];
  methodology: string;
  verified: boolean;
  timestamp: Date;
  uri?: string;
}

export interface FarmProject {
  id: string;
  farmerId: string;
  farmName: string;
  location: string;
  gpsCoordinates: string;
  carbonTons: number;
  methodology: string;
  photos: string[];
  status: 'pending' | 'verified' | 'rejected';
  verificationData?: any;
  nftId?: string;
  createdAt: Date;
}

export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'investor',
  totalCarbonCredits: 150,
  totalInvested: 5000,
  walletBalance: 2500,
  joinedDate: new Date('2025-10-01'),
  bio: 'Climate-conscious investor focused on sustainable projects',
  joinDate: new Date('2025-10-01'),
}

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-001',
    type: 'carbon_credit_purchase',
    amount: 100,
    date: new Date('2025-10-25'),
  },
  {
    id: 'tx-002',
    type: 'project_investment',
    amount: 500,
    date: new Date('2025-10-20'),
  },
  {
    id: 'tx-003',
    type: 'carbon_credit_purchase',
    amount: 50,
    date: new Date('2025-10-15'),
  },
]

export const mockCarbonCredits: CarbonCredit[] = [
  {
    id: 'credit-001',
    name: 'Verified Carbon Credit (Renewable Energy)',
    description: 'High-quality carbon credits from verified renewable energy projects',
    type: 'Renewable Energy',
    price: 15,
    available: 5000,
  },
  {
    id: 'credit-002',
    name: 'Reforestation Credit',
    description: 'Carbon credits from reforestation and afforestation projects',
    type: 'Reforestation',
    price: 12,
    available: 3000,
  },
  {
    id: 'credit-003',
    name: 'Methane Reduction Credit',
    description: 'Credits from methane capture and reduction initiatives',
    type: 'Clean Energy',
    price: 18,
    available: 2000,
  },
  {
    id: 'credit-004',
    name: 'Water Conservation Credit',
    description: 'Carbon credits from water conservation and management projects',
    type: 'Clean Water',
    price: 10,
    available: 1500,
  },
]

export const mockProjects: Project[] = [
  {
    id: 'project-001',
    title: 'Solar Farm Initiative',
    description: 'Large-scale solar farm providing clean energy to rural communities',
    category: 'Renewable Energy',
    location: 'Kenya',
    impact: 'Reduces 5000 tons CO2 annually',
    targetAmount: 50000,
    raisedAmount: 37500,
    progress: 75,
    verified: true,
    carbonTons: 5000,
    methodology: 'CarbonPlus Solar',
    coBenefits: ['energy access', 'job creation'],
  },
  {
    id: 'project-002',
    title: 'Reforestation Project',
    description: 'Planting native trees to restore degraded forest lands',
    category: 'Reforestation',
    location: 'Brazil',
    impact: 'Sequesters 3000 tons CO2 annually',
    targetAmount: 30000,
    raisedAmount: 18000,
    progress: 60,
    verified: true,
    carbonTons: 3000,
    methodology: 'CarbonPlus Forestry',
    coBenefits: ['biodiversity', 'soil conservation'],
  },
  {
    id: 'project-003',
    title: 'Clean Water Access',
    description: 'Providing clean water filtration systems to communities',
    category: 'Clean Water',
    location: 'Nigeria',
    impact: 'Reduces 2000 tons CO2 from water treatment',
    targetAmount: 25000,
    raisedAmount: 12500,
    progress: 50,
    verified: true,
    carbonTons: 2000,
    methodology: 'CarbonPlus Water',
    coBenefits: ['health improvement', 'time savings'],
  },
  {
    id: 'project-004',
    title: 'Wind Energy Farm',
    description: 'Wind turbines generating renewable electricity',
    category: 'Renewable Energy',
    location: 'South Africa',
    impact: 'Reduces 4000 tons CO2 annually',
    targetAmount: 45000,
    raisedAmount: 27000,
    progress: 60,
    verified: true,
    carbonTons: 4000,
    methodology: 'CarbonPlus Wind',
    coBenefits: ['energy independence', 'rural development'],
  },
  {
    id: 'project-005',
    title: 'Methane Capture',
    description: 'Capturing methane from agricultural waste',
    category: 'Clean Energy',
    location: 'Ethiopia',
    impact: 'Reduces 1500 tons CO2 equivalent annually',
    targetAmount: 20000,
    raisedAmount: 10000,
    progress: 50,
    verified: true,
    carbonTons: 1500,
    methodology: 'CarbonPlus Methane',
    coBenefits: ['waste management', 'renewable gas'],
  },
  {
    id: 'project-006',
    title: 'Sustainable Agriculture',
    description: 'Promoting regenerative farming practices',
    category: 'Reforestation',
    location: 'Ghana',
    impact: 'Sequesters 2500 tons CO2 annually',
    targetAmount: 35000,
    raisedAmount: 17500,
    progress: 50,
    verified: true,
    carbonTons: 2500,
    methodology: 'CarbonPlus Agriculture',
    coBenefits: ['food security', 'soil health'],
  },
]

export const mockFarmProjects: FarmProject[] = [
  {
    id: 'farm-001',
    farmerId: 'farmer-001',
    farmName: 'Green Valley Farm',
    location: 'Lagos, Nigeria',
    gpsCoordinates: '6.5244° N, 3.3792° E',
    carbonTons: 50,
    methodology: 'CarbonPlus Grazing',
    photos: ['farm-photo-1.jpg'],
    status: 'verified',
    nftId: 'nft-001',
    createdAt: new Date('2025-10-20'),
  },
  {
    id: 'farm-002',
    farmerId: 'farmer-002',
    farmName: 'Sunrise Organic Farm',
    location: 'Nairobi, Kenya',
    gpsCoordinates: '1.2921° S, 36.8219° E',
    carbonTons: 75,
    methodology: 'CarbonPlus Agriculture',
    photos: ['farm-photo-2.jpg'],
    status: 'verified',
    nftId: 'nft-002',
    createdAt: new Date('2025-10-18'),
  },
  {
    id: 'farm-003',
    farmerId: 'farmer-003',
    farmName: 'Mountain View Ranch',
    location: 'Accra, Ghana',
    gpsCoordinates: '5.6037° N, 0.1870° W',
    carbonTons: 30,
    methodology: 'CarbonPlus Forestry',
    photos: ['farm-photo-3.jpg'],
    status: 'pending',
    createdAt: new Date('2025-10-25'),
  },
]

// Mock Regen verification methodology
export const mockRegenMethodology = {
  methodology: "CarbonPlus Grazing for African Farms",
  maxTons: 1000,
  sdg: "13.2",
  coBenefits: ["soil health", "poverty alleviation", "biodiversity"],
}

// Mock NFT data
export const mockNFTs = [
  {
    id: 'nft-001',
    farmId: 'farm-001',
    tokenId: '0.0.123456',
    metadata: {
      farmId: 'farm-001',
      tons: 50,
      sdg: '13.2',
      coBenefits: ['soil health', 'poverty alleviation'],
      methodology: 'CarbonPlus Grazing',
      verified: true,
      timestamp: new Date('2025-10-20'),
      uri: 'ipfs://QmNFTMetadata1'
    },
    owner: 'farmer-001',
    retired: false,
    createdAt: new Date('2025-10-20'),
  },
  {
    id: 'nft-002',
    farmId: 'farm-002',
    tokenId: '0.0.123457',
    metadata: {
      farmId: 'farm-002',
      tons: 75,
      sdg: '13.2',
      coBenefits: ['soil health', 'biodiversity'],
      methodology: 'CarbonPlus Agriculture',
      verified: true,
      timestamp: new Date('2025-10-18'),
      uri: 'ipfs://QmNFTMetadata2'
    },
    owner: 'farmer-002',
    retired: false,
    createdAt: new Date('2025-10-18'),
  },
]

// Mock marketplace listings
export const mockMarketplaceListings = [
  {
    id: 'listing-001',
    nftId: 'nft-001',
    sellerId: 'farmer-001',
    price: 500,
    status: 'active',
    createdAt: new Date('2025-10-21'),
  },
  {
    id: 'listing-002',
    nftId: 'nft-002',
    sellerId: 'farmer-002',
    price: 750,
    status: 'active',
    createdAt: new Date('2025-10-19'),
  },
]
