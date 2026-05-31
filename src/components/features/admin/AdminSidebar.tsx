import React from "react";
import { Settings } from "lucide-react";
import { Navlink } from "../../common/Dashboard/Navlink";
import { data } from "@/data";

export function Sidebar() {
  const menus = data.adminMenus;

  return (
    <aside className="w-50 fixed top-0 left-0 bg-white h-screen pt-21 px-2 flex flex-col justify-between border-r border-gray-100 z-40">
      <div className="space-y-2">
        {menus.map((menu: any, index) => (
          <Navlink
            label={menu.label}
            icon={menu.icon}
            href={menu.href}
            key={menu.label}
          />
        ))}
      </div>
      <div className="space-y-2 mb-6">
        <Navlink icon={Settings} label="Setting" href="/admin/settings" />
      </div>
    </aside>
  );
}

export { Sidebar as AdminSidebar };
export default Sidebar;