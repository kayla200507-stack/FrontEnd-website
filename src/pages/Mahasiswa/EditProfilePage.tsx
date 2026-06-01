import { useState } from "react";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import imgUser from "../../assets/images/user-avatar.png";

interface EditProfilePageProps {
  onBack: () => void;
}

interface FormData {
  namaLengkap: string;
  nim: string;
  email: string;
  nomorTelepon: string;
  alamat: string;
  universitas: string;
  programStudi: string;
  semester: string;
  ipk: string;
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#3a60a0] text-sm font-medium">{label}</label>
      <div className="opacity-50 focus-within:opacity-100 transition-opacity">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-9 px-3 bg-[#f3f3f5] border border-[rgba(0,0,0,0.3)] rounded-lg text-sm text-[#0a0a0a] placeholder:text-slate-400 outline-none focus:border-[#3a60a0] focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
}

export function EditProfilePage({ onBack }: EditProfilePageProps) {
  const [form, setForm] = useState<FormData>({
    namaLengkap: "Zaidan Fahry",
    nim: "253140700111055",
    email: "zaidanfahry098@email.com",
    nomorTelepon: "085770980489",
    alamat: "Sumbersari, Malang",
    universitas: "Universitas Brawijaya",
    programStudi: "Teknologi Informasi",
    semester: "5",
    ipk: "3.75",
  });

  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="p-6 space-y-5">
      {/* Page header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-[#3a60a0] text-[28px] font-bold leading-tight">Edit Profil</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-6 h-[42px] rounded-[20px] border border-[rgba(0,0,0,0.3)] bg-white text-[#0a0a0a] text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onBack}
            className="px-6 h-[42px] rounded-[20px] bg-[#3a60a0] border border-[rgba(0,0,0,0.3)] text-white text-sm font-medium hover:bg-[#2d4d82] transition-colors shadow-md"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] shadow-sm px-6 py-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="size-24 rounded-full overflow-hidden bg-[#dbeafe] shrink-0 flex items-center justify-center">
            <img
              src={imgUser}
              alt="Zaidan Fahry"
              className="size-full object-cover"
            />
          </div>

          {/* Right info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[#3a60a0] text-[21px] font-bold leading-tight">Zaidan Fahry</h2>
            <p className="text-[#4a5565] text-[12.5px] mt-0.5">NIM: 253140700111055</p>

            {/* Info grid: 2 cols */}
            <div className="grid grid-cols-2 gap-x-14 gap-y-3 mt-4">
              {/* Col 1 */}
              <div className="flex items-center gap-2 text-[#0a0a0a] text-[12px]">
                <Mail size={13} className="text-[#6a7282] shrink-0" />
                <span>zaidanfahry098@email.com</span>
              </div>
              {/* Col 2 */}
              <div className="flex items-center gap-2 text-[#0a0a0a] text-[12px]">
                <Phone size={13} className="text-[#6a7282] shrink-0" />
                <span>085770980489</span>
              </div>
              {/* Col 1 row 2 */}
              <div className="flex items-center gap-2 text-[#0a0a0a] text-[12px]">
                <Phone size={13} className="text-[#6a7282] shrink-0" />
                <span>085770980489</span>
              </div>
              {/* Col 2 row 2 */}
              <div className="flex items-center gap-2 text-[#0a0a0a] text-[12px]">
                <Building2 size={13} className="text-[#6a7282] shrink-0" />
                <span>Universitas Brawijaya</span>
              </div>
              {/* Col 1 row 3 */}
              <div className="flex items-center gap-2 text-[#0a0a0a] text-[12px]">
                <MapPin size={13} className="text-[#6a7282] shrink-0" />
                <span>Sumbersari, Malang</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 mt-4">
              <span className="bg-[#dbeafe] text-[#193cb8] text-[12px] font-medium px-3 py-1 rounded-[8px]">
                Teknologi Informasi
              </span>
              <span className="bg-[#dcfce7] text-[#016630] text-[12px] font-medium px-3 py-1 rounded-[8px]">
                Semester 5
              </span>
              <span className="bg-[#f3e8ff] text-[#6e11b0] text-[12px] font-medium px-3 py-1 rounded-[8px]">
                IPK: 3.75
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Pribadi */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] shadow-sm">
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <p className="text-[#3a60a0] text-base font-medium">Data Pribadi</p>
          <p className="text-[#0a0a0a] text-sm mt-1">Informasi detail tentang mahasiswa</p>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Lengkap" value={form.namaLengkap} onChange={set("namaLengkap")} />
            <FormField label="NIM" value={form.nim} onChange={set("nim")} />
            <FormField label="Email" value={form.email} onChange={set("email")} />
            <FormField label="Nomor Telepon" value={form.nomorTelepon} onChange={set("nomorTelepon")} />
          </div>
          <FormField label="Alamat" value={form.alamat} onChange={set("alamat")} />
        </div>
      </div>

      {/* Informasi Akademik */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] shadow-sm">
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <p className="text-[#3a60a0] text-base font-medium">Informasi Akademik</p>
          <p className="text-[#0a0a0a] text-sm mt-1">Data pendidikan dan akademik</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Universitas" value={form.universitas} onChange={set("universitas")} />
            <FormField label="Program Studi" value={form.programStudi} onChange={set("programStudi")} />
            <FormField label="Semester" value={form.semester} onChange={set("semester")} />
            <FormField label="IPK" value={form.ipk} onChange={set("ipk")} />
          </div>
        </div>
      </div>
    </div>
  );
}
