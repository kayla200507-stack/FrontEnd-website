import React, { useState } from "react";
import { toast } from "sonner";
import { SettingsSidebar, type TabType } from "../../components/features/dosen/settings/SettingsSidebar";
import { PersonalInfoTab } from "../../components/features/dosen/settings/PersonalInfoTab";
import { AcademicTab } from "../../components/features/dosen/settings/AcademicTab";
import { DocumentsTab } from "../../components/features/dosen/settings/DocumentsTab";
import { NotificationsTab } from "../../components/features/dosen/settings/NotificationsTab";
import { SecurityTab } from "../../components/features/dosen/settings/SecurityTab";
import DashboardHeader from "../../components/features/dosen/DashboardHeader.tsx";
import { useAuthStore } from "../../stores/authStore";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<TabType>("informasi");
  
  const [form, setForm] = useState({
    nama: user?.nama || "",
    nip: (user as any)?.dosen?.nip || "",
    nidn: (user as any)?.dosen?.nidn || "",
    email: user?.email || "",
    telepon: user?.no_telp || "",
    alamat: (user as any)?.profile?.alamat || "",
    fakultas: (user as any)?.profile?.fakultas || "",
    program_studi: (user as any)?.profile?.program_studi || "",
    bidang: (user as any)?.dosen?.bidang || "",
    universitas: (user as any)?.profile?.institusi || "",
    prodi: (user as any)?.profile?.program_studi || "",
    jabatan: (user as any)?.dosen?.jabatan || "",
    golongan: (user as any)?.dosen?.golongan || "",
    pendidikan: (user as any)?.dosen?.pendidikan || "",
    linkedin_url: (user as any)?.profile?.linkedin_url || "",
    github_url: (user as any)?.profile?.github_url || "",
    portfolio_url: (user as any)?.profile?.portfolio_url || "",
    bio: (user as any)?.profile?.bio || "",
    avatar: user?.avatar || "/Profiles/UserPersonal.png",
  });
  
  // States for toggles
  const [pushNotif, setPushNotif] = useState(true);
  const [emailReport, setEmailReport] = useState(false);
  const [deadlineAlert, setDeadlineAlert] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("Perubahan berhasil disimpan");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Kata sandi berhasil diperbarui");
  };

  return (
    <div className="p-6">
      <DashboardHeader
        title="Pengaturan Akun"
        subtitle="Kelola profil, data akademik, dan keamanan akun Anda"
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
          {activeTab === "informasi" && (
            <PersonalInfoTab form={form} onChange={handleFormChange} onSave={handleSave} role="dosen" />
          )}
          {activeTab === "keamanan" && (
            <SecurityTab />
          )}
        </div>
      </div>
    </div>
  );
}
