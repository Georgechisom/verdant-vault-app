"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { LayoutDashboard, FolderOpen, PlusCircle, Wallet, User, PanelLeftOpen } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/campaigns", label: "Campaigns", icon: FolderOpen },
    { href: "/dashboard/create-campaign", label: "Create Campaign", icon: PlusCircle },
    { href: "/dashboard/invest", label: "Invest", icon: Wallet },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    // { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background bckgimage">
      <Header />

      <section className="flex-1 pt-8 px-4">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm"
              aria-pressed={collapsed}
              aria-label="Toggle sidebar"
            >
              <PanelLeftOpen />
            </button>
            <div className="hidden text-sm text-gray-500">
              {collapsed ? "Sidebar collapsed" : "Sidebar visible"}
            </div>
          </div>
          <div className="flex gap-6 mb-8">
            {/* Sidebar (collapsible: icons-only when collapsed) */}
            <aside className={`${collapsed ? "w-16" : "w-64"} shrink-0`}>
              <nav className={`bg-white rounded-lg shadow-sm ${collapsed ? "p-2" : "p-6"} space-y-2`}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-2.5 rounded-lg font-medium transition ${
                        isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      title={item.label}
                    >
                      <Icon size={18} />
                      {!collapsed && item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-h-[calc(100vh-200px)] overflow-y-scroll">
              {children}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}