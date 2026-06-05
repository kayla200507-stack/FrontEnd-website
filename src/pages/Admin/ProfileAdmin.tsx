import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/common/Card";
import { Mail, GraduationCap, Phone, MapPin, Camera } from "lucide-react";

const INITIAL_PROFILE = {
  nama: "Kayla Haniyah, M.Kom",
  nip: "198705152010122001",
  email: "kaylahaniyah@university.ac.id",
  telepon: "081234567890",
  jabatan: "Admin Akademik",
  departemen: "Fakultas Vokasi",
  universitas: "Universitas Brawijaya",
  alamat: "Lowukwaru, Malang",
  avatar: "/Profiles/AdminPersonal.png",
};

const ProfileAdminPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayAvatar = avatarPreview ?? profile.avatar;

  const handleLogout = () => {
    navigate("/auth/login");
  };

  const handleChange = (field: keyof typeof draft, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setProfile({
      ...draft,
      avatar: avatarPreview ?? draft.avatar,
    });
    toast.success("Profil admin berhasil disimpan");
  };

  const handleCancel = () => {
    setDraft(profile);
    setAvatarPreview(null);
    navigate("/admin/dashboard");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]";

  return (
    <>
      <div className="p-2">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[28px] font-bold text-[#4769B1]">Edit Profil</h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="px-8 h-10 rounded-full border border-[#D1D5DB] bg-white text-sm font-medium text-[#374151] hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            className="px-8 h-10 rounded-full bg-[#4769B1] text-white text-sm font-medium hover:bg-[#3f5d9f]"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* PROFILE CARD */}
      <Card className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-5 shadow-none">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={displayAvatar}
              alt="Profile Admin"
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=Kayla+Haniyah&background=4769B1&color=fff`;
              }}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#4769B1] text-white flex items-center justify-center hover:bg-[#3f5d9f] transition-colors"
            >
              <Camera size={13} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Data Admin */}
          <div className="flex-1">
            <h2 className="text-[24px] font-bold text-[#4769B1]">
              {profile.nama.split(",")[0]}
            </h2>

            <div className="flex items-center gap-2 mt-1 text-xs text-[#9CA3AF]">
              <span>NIP: {profile.nip}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 mt-5">
              <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                <Mail size={15} />
                <span>{profile.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                <Phone size={15} />
                <span>{profile.telepon}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                <GraduationCap size={15} />
                <span>{profile.universitas}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                <MapPin size={15} />
                <span>{profile.alamat}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-xs font-medium">
                {profile.jabatan}
              </span>

              <span className="px-3 py-1 rounded-full bg-[#EAF2FF] text-[#4769B1] text-xs font-medium">
                {profile.departemen}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* INFORMASI PRIBADI */}
      <Card className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-none">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#4769B1]">
            Informasi Pribadi
          </h3>

          <p className="text-sm text-[#6B7280]">
            Detail informasi admin akademik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {(
            [
              { label: "Nama Lengkap", field: "nama" },
              { label: "NIP", field: "nip" },
              { label: "Email", field: "email" },
              { label: "Nomor Telepon", field: "telepon" },
              { label: "Jabatan", field: "jabatan" },
              { label: "Departemen", field: "departemen" },
              { label: "Universitas", field: "universitas" },
              { label: "Alamat", field: "alamat" },
            ] as {
              label: string;
              field: keyof typeof draft;
            }[]
          ).map(({ label, field }) => (
            <div key={field}>
              <label className="block mb-2 text-sm font-medium text-[#4769B1]">
                {label}
              </label>

              <input
                value={draft[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </Card>
      </div>
    </>
  );
};

export default ProfileAdminPage;