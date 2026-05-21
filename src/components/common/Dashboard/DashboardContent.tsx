import { Outlet } from "react-router-dom";

export function DashboardContent() {
  return (
    <div className="px-6 pl-55 pb-20 bg-[#F3F4F6] pt-21 space-y-8">
      <Outlet />
    </div>
  );
}
