import DashboardLayout from "../components/common/Dashboard/DashboardLayout";
import { DashboardHeader } from "../components/common/Dashboard/Header";
import { DashboardSidebar } from "../components/common/Dashboard/Sidebar";
import { DashboardContent } from "../components/common/Dashboard/DashboardContent";
import { data } from "@/data";

export default function DosenLayout() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardSidebar menus={data.dosenMenus} />
      <DashboardContent />
    </DashboardLayout>
  );
}
