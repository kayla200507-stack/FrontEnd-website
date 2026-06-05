import { Notification } from "@/components/Notification";
import { useAuthStore } from "@/stores/authStore";
import { LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logoVokasi from "../../../assets/images/vokasi.png";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="bg-white fixed top-0 py-3 w-full left-0 px-4 md:px-6 flex justify-between z-40 items-center border-b shadow-sm h-20">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden text-gray-600"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <img src={logoVokasi} alt="Logo Vokasi" className="w-10 h-10 md:w-11 md:h-11 object-contain"/>
          <span className="text-[#3a60a0] text-[22px] md:text-[28px] tracking-[-0.5px] font-normal" style={{ fontFamily: "'Georgia', serif" }}> Vokasi Magang</span> 
        </Link>
      </div>

      <div className="flex gap-2 md:gap-6 items-center">
        <Notification />

        <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2"></div>

        <div className="flex gap-2 md:gap-3 items-center">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 leading-tight truncate max-w-[120px]">
              {user?.nama || "User"}
            </p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
              {user?.role}
            </p>
          </div>

          <Link
            to={
              user?.role === "mahasiswa" 
                ? "/mahasiswa/settings" 
                : user?.role === "admin" 
                ? "/admin/settings" 
                : "/dosen/settings"
            }
            className="aspect-square size-9 md:size-10 bg-blue-100 rounded-full overflow-hidden border-2 border-white shadow-sm hover:border-blue-200 transition-all flex items-center justify-center"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-blue-600 font-bold text-base md:text-lg">
                {(user?.nama || "U").charAt(0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}


