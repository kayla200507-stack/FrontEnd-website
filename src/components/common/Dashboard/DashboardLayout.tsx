import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./Header";
import { DashboardSidebar } from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative bg-[#F3F4F6] min-h-screen">{children}</div>;
}
