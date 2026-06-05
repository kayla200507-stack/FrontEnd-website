import React, { useState } from "react";
import { toast } from "sonner";
import { SettingsSidebar } from "../../components/features/dosen/settings/SettingsSidebar";
import { PersonalInfoTab } from "../../components/features/dosen/settings/PersonalInfoTab";
import { AcademicTab } from "../../components/features/dosen/settings/AcademicTab";
import { DocumentsTab } from "../../components/features/dosen/settings/DocumentsTab";
import { NotificationsTab } from "../../components/features/dosen/settings/NotificationsTab";
import { SecurityTab } from "../../components/features/dosen/settings/SecurityTab";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { useAuthStore } from "../../stores/authStore";

export default function MahasiswaSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<string>("informasi");
  
  const form = {
    nama: user?.nama || "",
    email: user?.email || "",
    no_hp: user?.no_telp || "",
    nim: (user as any)?.mahasiswa?.nim || "",
    alamat: (user as any)?.profile?.alamat || "",
    fakultas: (user as any)?.profile?.fakultas || "",
    program_studi: (user as any)?.profile?.program_studi || "",
    semester: (user as any)?.mahasiswa?.semester || "",
    ipk: (user as any)?.mahasiswa?.ipk || "",
    tanggal_lahir: (user as any)?.profile?.tanggal_lahir || "",
    institusi: (user as any)?.profile?.institusi || "",
    linkedin_url: (user as any)?.profile?.linkedin_url || "",
    github_url: (user as any)?.profile?.github_url || "",
    portfolio_url: (user as any)?.profile?.portfolio_url || "",
    bio: (user as any)?.profile?.bio || "",
    avatar: user?.avatar || "/Profiles/UserPersonal.png",
  };
  
  // States for toggles (mocked for now, can be connected to backend settings later)
  const [pushNotif, setPushNotif] = useState(true);
  const [emailReport, setEmailReport] = useState(false);
  const [deadlineAlert, setDeadlineAlert] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="p-6">
      <DashboardHeader
        title="Pengaturan Akun"
        description="Kelola profil, data akademik, dan dokumen magang Anda"
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <SettingsSidebar activeTab={activeTab as any} onTabChange={setActiveTab as any} />

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
          {activeTab === "informasi" && (
            <PersonalInfoTab form={form} onChange={() => {}} onSave={() => {}} role="mahasiswa" />
          )}
          {activeTab === "keamanan" && (
            <SecurityTab />
          )}
        </div>
      </div>
    </div>
  );
}
