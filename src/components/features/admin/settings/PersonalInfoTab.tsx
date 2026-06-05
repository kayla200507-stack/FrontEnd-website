import React from "react";
import { Camera } from "lucide-react";

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition";

interface Props {
  form: { nama: string; nip: string; nidn: string; email: string; telepon: string; bidang: string };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}

export const PersonalInfoTab: React.FC<Props> = ({ form, onChange, onSave }) => (
  <div className="p-6 sm:p-8">
    <h3 className="text-xl font-bold text-slate-800 mb-6">Informasi Pribadi</h3>

    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
          <img
            src="/Profiles/UserPersonal.png"
            alt="Foto Profil"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=Budi+Aziz&background=4769B1&color=fff&size=96";
            }}
          />
        </div>
        <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-md hover:bg-blue-700 transition">
          <Camera size={16} />
        </button>
      </div>
      <div className="text-center sm:text-left">
        <h4 className="font-semibold text-slate-800 text-lg">Foto Profil Admin</h4>
        <p className="text-sm text-slate-500 mb-2">Format PNG, JPG. Maksimal 2MB</p>
        <div className="flex gap-3 justify-center sm:justify-start">
          <button className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">Ganti Foto</button>
          <button className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition">Hapus</button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {([
        ["Nama Lengkap", "nama"], ["NIP / NIK", "nip"], ["Email", "email"],
        ["No. Telepon / WhatsApp", "telepon"], ["Alamat Kantor", "alamat"], ["Unit Kerja", "bidang"],
      ] as [string, string][]).map(([label, field]) => (
        <div key={field}>
          <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
          <input type="text" value={(form as Record<string, string>)[field]} onChange={(e) => onChange(field, e.target.value)} className={inputCls} />
        </div>
      ))}
    </div>

    <div className="flex justify-end">
      <button onClick={onSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
        Simpan Perubahan
      </button>
    </div>
  </div>
);
