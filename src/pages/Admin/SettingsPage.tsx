import React, { useState } from "react";
import { toast } from "sonner";
import { SettingsSidebar } from "../../components/features/dosen/settings/SettingsSidebar";
import { PersonalInfoTab } from "../../components/features/dosen/settings/PersonalInfoTab";
import { SecurityTab } from "../../components/features/dosen/settings/SecurityTab";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { useAuthStore } from "../../stores/authStore";

export default function AdminSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<string>("informasi");
  
  const [form, setForm] = useState({
    nama: user?.nama || "",
    email: user?.email || "",
    bio: (user as any)?.profile?.bio || "",
    avatar: user?.avatar || "/Profiles/AdminPersonal.png",
    no_hp: (user as any)?.profile?.no_hp || "",
  });
  
  // States for toggles
  const [pushNotif, setPushNotif] = useState(true);
  const [emailReport, setEmailReport] = useState(true);
  const [deadlineAlert, setDeadlineAlert] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const handleFormChange = (field: string, value: string) => {
    // Note: handling is actually inside PersonalInfoTab now.
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Pengaturan Akun"
        description="Kelola informasi profil dan keamanan akun Anda"
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
          {activeTab === "informasi" && (
            <PersonalInfoTab form={form} onChange={() => {}} onSave={() => {}} role="admin" />
          )}

          {activeTab === "keamanan" && (
            <SecurityTab />
          )}
        </div>
      </div>
    </div>
  );
}
