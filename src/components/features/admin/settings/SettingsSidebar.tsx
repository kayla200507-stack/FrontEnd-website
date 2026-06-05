import React from "react";
import { User, GraduationCap, FileText, Bell, Shield, LogOut, Briefcase } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export type TabType = "informasi" | "pendidikan" | "dokumen" | "notifikasi" | "keamanan";

const menuItems: { id: TabType; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "informasi", label: "Informasi Pribadi", icon: User },
  { id: "keamanan", label: "Password & Hapus Akun", icon: Shield },
];

interface Props {
  activeTab: any;
  onTabChange: (tab: any) => void;
}

export const SettingsSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return (
    <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">Pengaturan Admin</h2>
      <nav className="space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={20} className={isActive ? "text-blue-600" : "text-slate-400"} />
              {label}
            </button>
          );
        })}
      </nav>
    </div>

    <button
      onClick={() => {
        clearAuth();
        window.location.href = "/auth/login";
      }}
      className="w-full flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-red-100 shadow-sm transition-all font-medium text-sm text-red-600 hover:bg-red-50 hover:border-red-200"
    >
      <LogOut size={20} className="text-red-500" />
      Keluar Akun
    </button>
  </div>
  );
};
