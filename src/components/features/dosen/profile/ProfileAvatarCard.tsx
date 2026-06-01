import React, { useRef } from "react";
import { Camera, Mail, GraduationCap, Phone, MapPin } from "lucide-react";

interface ProfileAvatarProps {
  profile: {
    nama: string; nip: string; nidn: string;
    email: string; telepon: string;
    jabatan: string; departemen: string;
    universitas: string; alamat: string;
    avatar: string;
  };
  displayAvatar: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatarCard: React.FC<ProfileAvatarProps> = ({ profile, displayAvatar, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-5 shadow-none flex flex-col md:flex-row items-start gap-5">
      <div className="relative shrink-0">
        <img
          src={displayAvatar}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://ui-avatars.com/api/?name=Budi+Aziz&background=4769B1&color=fff";
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#4769B1] text-white flex items-center justify-center"
        >
          <Camera size={13} />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
      </div>

      <div className="flex-1">
        <h2 className="text-[24px] font-bold text-[#4769B1]">{profile.nama}</h2>
        <div className="flex items-center gap-2 mt-1 text-xs text-[#9CA3AF]">
          <span>NIP: {profile.nip}</span><span>•</span><span>NIDN: {profile.nidn}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 mt-5">
          <div className="flex items-center gap-2 text-sm text-[#4B5563]"><Mail size={15} /><span>{profile.email}</span></div>
          <div className="flex items-center gap-2 text-sm text-[#4B5563]"><Phone size={15} /><span>{profile.telepon}</span></div>
          <div className="flex items-center gap-2 text-sm text-[#4B5563]"><GraduationCap size={15} /><span>{profile.universitas}</span></div>
          <div className="flex items-center gap-2 text-sm text-[#4B5563]"><MapPin size={15} /><span>{profile.alamat}</span></div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <span className="px-3 py-1 rounded-full bg-[#EAF2FF] text-[#4769B1] text-xs font-medium">{profile.departemen}</span>
          <span className="px-3 py-1 rounded-full bg-[#EEFDF3] text-[#16A34A] text-xs font-medium">{profile.jabatan}</span>
        </div>
      </div>
    </div>
  );
};
