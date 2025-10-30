"use client";

import { useState } from "react";
import FarmerDashboard from "../../components/FarmerDashboard";
import InvestorDashboard from "../../components/InvestorDashboard";
import { mockUserProfile } from "../../lib/mockData";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState(mockUserProfile.role);

  return userRole === 'farmer' ? <FarmerDashboard /> : <InvestorDashboard />;
}