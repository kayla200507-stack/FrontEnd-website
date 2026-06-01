import React from "react";
import { User, GraduationCap, FileText, Bell, Shield, LogOut } from "lucide-react";

export type TabType = "informasi" | "pendidikan" | "dokumen" | "notifikasi" | "keamanan";

const menuItems: { id: TabType; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "informasi", label: "Informasi Pribadi", icon: User },
  { id: "pendidikan", label: "Latar Akademik", icon: GraduationCap },
  { id: "dokumen", label: "Dokumen & SK Pembimbing", icon: FileText },
  { id: "notifikasi", label: "Notifikasi", icon: Bell },
  { id: "keamanan", label: "Keamanan & Privasi", icon: Shield },
];

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const SettingsSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => (
  <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">Pengaturan Dosen</h2>
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
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }}
      className="w-full flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-red-100 shadow-sm transition-all font-medium text-sm text-red-600 hover:bg-red-50 hover:border-red-200"
    >
      <LogOut size={20} className="text-red-500" />
      Keluar Akun
    </button>
  </div>
);
