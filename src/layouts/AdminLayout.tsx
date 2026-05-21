import { data } from "@/data";
import { DashboardContent } from "../components/common/Dashboard/DashboardContent";
import DashboardLayout from "../components/common/Dashboard/DashboardLayout";
import { DashboardHeader } from "../components/common/Dashboard/Header";
import { DashboardSidebar } from "../components/common/Dashboard/Sidebar";

export default function DosenLayout() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardSidebar menus={data.adminMenus} />
      <DashboardContent />
    </DashboardLayout>
  );
}
