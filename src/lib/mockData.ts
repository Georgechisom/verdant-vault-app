// Mock data for development

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Renewable Energy' | 'Reforestation' | 'Clean Water';
  image: string;
  targetAmount: number;
  raisedAmount: number;
  progress: number;
  location: string;
  impact: string;
}

export interface CarbonCreditItem {
  id: string;
  name: string;
  type: string;
  price: number;
  available: number;
  description: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Solar Farm Initiative',
    description: 'Large-scale solar farm project in rural areas to provide clean energy',
    category: 'Renewable Energy',
    image: '/images/solar-farm.jpg',
    targetAmount: 100000,
    raisedAmount: 75000,
    progress: 75,
    location: 'Kenya',
    impact: 'Reduce 5000 tons of CO2 annually',
  },
  {
    id: '2',
    title: 'Reforestation Project',
    description: 'Plant 1 million trees to restore forest ecosystems',
    category: 'Reforestation',
    image: '/images/reforestation.jpg',
    targetAmount: 50000,
    raisedAmount: 30000,
    progress: 60,
    location: 'Brazil',
    impact: 'Sequester 10000 tons of CO2',
  },
  {
    id: '3',
    title: 'Clean Water System',
    description: 'Install water purification systems in underserved communities',
    category: 'Clean Water',
    image: '/images/water.jpg',
    targetAmount: 75000,
    raisedAmount: 45000,
    progress: 60,
    location: 'Uganda',
    impact: 'Provide clean water to 50000 people',
  },
  {
    id: '4',
    title: 'Wind Energy Park',
    description: 'Develop offshore wind farm for sustainable energy production',
    category: 'Renewable Energy',
    image: '/images/wind-farm.jpg',
    targetAmount: 200000,
    raisedAmount: 120000,
    progress: 60,
    location: 'Denmark',
    impact: 'Generate 500 GWh annually',
  },
  {
    id: '5',
    title: 'Mangrove Conservation',
    description: 'Protect and restore mangrove forests for biodiversity',
    category: 'Reforestation',
    image: '/images/mangrove.jpg',
    targetAmount: 60000,
    raisedAmount: 40000,
    progress: 67,
    location: 'Indonesia',
    impact: 'Protect 8000 hectares of mangroves',
  },
  {
    id: '6',
    title: 'Biogas Energy Project',
    description: 'Convert agricultural waste to renewable energy',
    category: 'Renewable Energy',
    image: '/images/biogas.jpg',
    targetAmount: 80000,
    raisedAmount: 55000,
    progress: 69,
    location: 'India',
    impact: 'Reduce 3000 tons of CO2 annually',
  },
];

export const mockCarbonCredits: CarbonCreditItem[] = [
  {
    id: 'cc-1',
    name: 'Verified Carbon Credit',
    type: 'Renewable Energy',
    price: 15,
    available: 10000,
    description: 'Carbon credits from verified renewable energy projects',
  },
  {
    id: 'cc-2',
    name: 'Reforestation Credit',
    type: 'Reforestation',
    price: 12,
    available: 5000,
    description: 'Credits from tree planting and forest restoration',
  },
  {
    id: 'cc-3',
    name: 'Methane Reduction Credit',
    type: 'Clean Energy',
    price: 18,
    available: 3000,
    description: 'Credits from methane capture and reduction projects',
  },
  {
    id: 'cc-4',
    name: 'Water Conservation Credit',
    type: 'Clean Water',
    price: 10,
    available: 7000,
    description: 'Credits from water conservation initiatives',
  },
];

export const mockTransactions = [
  {
    id: 'tx-1',
    type: 'Carbon Credit Purchase',
    amount: 150,
    date: new Date(Date.now() - 86400000),
    status: 'completed',
  },
  {
    id: 'tx-2',
    type: 'Project Investment',
    amount: 500,
    date: new Date(Date.now() - 172800000),
    status: 'completed',
  },
  {
    id: 'tx-3',
    type: 'Carbon Credit Purchase',
    amount: 200,
    date: new Date(Date.now() - 259200000),
    status: 'completed',
  },
];

export const mockUserProfile = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Climate enthusiast and sustainable investor',
  avatar: '/images/avatar.jpg',
  joinDate: new Date('2023-01-15'),
  totalInvested: 2500,
  totalCarbonCredits: 500,
  walletBalance: 5000,
};

