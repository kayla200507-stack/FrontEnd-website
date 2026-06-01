import React from "react";
import { Sidebar } from "./AdminSidebar";
import { Header } from "./AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
  onLogout?: () => void;
  title?: string;
  breadcrumb?: string[];
  onMenuChange?: (menuId: string, submenuId?: string) => void;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="relative bg-[#F3F4F6] min-h-screen">
      <Header />
      <Sidebar />
      <div className="px-6 pl-55 pb-20 bg-[#F3F4F6] pt-21 space-y-8">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;