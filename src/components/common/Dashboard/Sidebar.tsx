import { Settings, LogOut, X, type LucideIcon } from "lucide-react";
import { Navlink } from "./Navlink";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { data } from "@/data";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const { user } = useAuthStore();

  const getMenus = () => {
    if (user?.role === "admin") return data.adminMenus;
    if (user?.role === "dosen") return data.dosenMenus;
    return data.mahasiswaMenus;
  };

  const menus = getMenus();

  return (
    <aside className={`w-64 fixed top-20 left-0 bg-white h-[calc(100vh-5rem)] pt-8 px-4 flex flex-col justify-between border-r shadow-sm transition-transform duration-300 ease-in-out z-40 
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      
      {/* Mobile close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-4 p-2 lg:hidden text-gray-500 hover:bg-gray-100 rounded-lg"
      >
        <X size={20} />
      </button>

      <div className="space-y-1">
        {menus.map((menu) => (
          <div key={menu.label} onClick={onClose}>
            <Navlink
              label={menu.label}
              icon={menu.icon}
              href={menu.href}
            />
          </div>
        ))}
      </div>
      <div className="space-y-1 mb-6">
        <div onClick={onClose}>
          <Navlink 
            icon={Settings} 
            label="Pengaturan" 
            href={user?.role === "admin" ? "/admin/settings" : user?.role === "dosen" ? "/dosen/settings" : "/mahasiswa/settings"} 
          />
        </div>
      </div>
    </aside>
  );
}

