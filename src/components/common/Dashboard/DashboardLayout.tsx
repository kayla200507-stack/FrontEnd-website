import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./Header";
import { DashboardSidebar } from "./Sidebar";
import { useAuthStore } from "@/stores/authStore";

export default function DashboardLayout() {
  const { isInitializing } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 transition-all duration-300 pt-24 p-4 md:p-8 md:pt-28 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-64"}`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

