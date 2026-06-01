import React from "react";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Megaphone,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";

interface AdminLayoutProps {
  title: string;
  breadcrumb: string[];
  activeMenu: string;
  onMenuChange: (menuId: string, submenuId?: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  breadcrumb,
  activeMenu,
  onMenuChange,
  onLogout,
  children,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "data-mahasiswa", label: "Data Mahasiswa", icon: Users },
    { id: "verif-pendaftaran", label: "Verifikasi Pendaftaran", icon: CheckSquare },
    { id: "pengumuman", label: "Pengumuman", icon: Megaphone },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#3D5DA8] text-white flex flex-col shadow-lg">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-wider">SIP - ADMIN</h2>
          <p className="text-xs text-white/60 mt-1">Sistem Informasi Praktik</p>
        </div>

        {/* Sidebar Menus */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onMenuChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-[#3D5DA8] shadow-md"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Admin</span>
            <ChevronRight size={12} className="text-slate-400" />
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className={idx === breadcrumb.length - 1 ? "text-slate-800 font-semibold" : ""}>
                  {item}
                </span>
                {idx < breadcrumb.length - 1 && <ChevronRight size={12} className="text-slate-400" />}
              </React.Fragment>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">Administrator</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Super Admin</p>
            </div>
            <div className="bg-slate-100 p-2.5 rounded-full text-slate-600 border border-slate-200">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Main View Port */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
