import React, { useState } from "react";
import { ProfileAvatarCard } from "../../components/features/dosen/profile/ProfileAvatarCard";
import { ProfileForm } from "../../components/features/dosen/profile/ProfileForm";

const INITIAL_PROFILE = {
  nama: "Dr. Budi Aziz, M.Kom.",
  nip: "196805121993032001",
  nidn: "0012059501",
  email: "budiaziz@university.ac.id",
  telepon: "087637676762",
  jabatan: "Dosen Pembimbing",
  departemen: "Teknologi Informasi",
  universitas: "Universitas Brawijaya",
  pendidikan: "S3 - Ilmu Komputer",
  alamat: "Lowokwaru, Malang",
  bidangKeahlian: "Software Engineering, Web Development, Mobile Computing",
  avatar: "/Profiles/UserPersonal.png",
};

const ProfileDosenPage = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const displayAvatar = avatarPreview ?? profile.avatar;

  const handleChange = (field: string, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setProfile({ ...draft, avatar: avatarPreview ?? draft.avatar });
  };

  const handleCancel = () => {
    setDraft(profile);
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#4769B1]">Edit Profil</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="px-6 sm:px-8 h-10 rounded-full border border-[#D1D5DB] bg-white text-sm font-medium text-[#374151]"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 sm:px-8 h-10 rounded-full bg-[#4769B1] text-white text-sm font-medium hover:bg-[#3f5d9f]"
          >
            Simpan
          </button>
        </div>
      </div>

      <ProfileAvatarCard
        profile={profile}
        displayAvatar={displayAvatar}
        onAvatarChange={handleAvatarChange}
      />

      <ProfileForm draft={draft} handleChange={handleChange} />
    </div>
  );
};

export default ProfileDosenPage;
