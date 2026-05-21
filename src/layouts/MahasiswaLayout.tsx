import { DashboardContent } from "../components/common/Dashboard/DashboardContent";
import DashboardLayout from "../components/common/Dashboard/DashboardLayout";
import { DashboardHeader } from "../components/common/Dashboard/Header";
import { DashboardSidebar } from "../components/common/Dashboard/Sidebar";
import { data } from "@/data";

export default function MahasiswaLayout() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardSidebar menus={data.mahasiswaMenus} />
      <DashboardContent />
    </DashboardLayout>
  );
}
