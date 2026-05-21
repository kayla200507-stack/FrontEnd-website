import { Settings, type LucideIcon } from "lucide-react";
import { Navlink } from "./Navlink";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

interface DashboardSidebarProps {
  menus: MenuItem[];
}

export function DashboardSidebar({ menus }: DashboardSidebarProps) {
  return (
    <aside className="w-50 fixed top-0 left-0 bg-white h-screen pt-21 px-2 flex flex-col justify-between">
      <div className="space-y-2">
        {menus.map((menu) => (
          <Navlink
            label={menu.label}
            icon={menu.icon}
            href={menu.href}
            key={menu.label}
          />
        ))}
      </div>
      <div className="space-y-2">
        <Navlink icon={Settings} label="Setting" href="/mahasiswa/settings" />
      </div>
    </aside>
  );
}
