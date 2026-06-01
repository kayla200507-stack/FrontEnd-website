import React from "react";

interface ProfileFormProps {
  draft: Record<string, string>;
  handleChange: (field: string, value: string) => void;
}

const inputClass =
  "w-full h-11 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]";

export const ProfileForm: React.FC<ProfileFormProps> = ({ draft, handleChange }) => {
  const fields = [
    { label: "Nama Lengkap", field: "nama" }, { label: "NIP", field: "nip" },
    { label: "NIDN", field: "nidn" }, { label: "Email", field: "email" },
    { label: "Nomor Telepon", field: "telepon" }, { label: "Jabatan", field: "jabatan" },
    { label: "Departemen", field: "departemen" }, { label: "Universitas", field: "universitas" },
    { label: "Pendidikan Terakhir", field: "pendidikan" }, { label: "Alamat", field: "alamat" },
  ];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-none">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#4769B1]">Informasi Pribadi</h3>
        <p className="text-sm text-[#6B7280]">Detail informasi dosen pembimbing</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {fields.map(({ label, field }) => (
          <div key={field}>
            <label className="block mb-2 text-sm font-medium text-[#4769B1]">{label}</label>
            <input value={draft[field] || ""} onChange={(e) => handleChange(field, e.target.value)} className={inputClass} />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label className="block mb-2 text-sm font-medium text-[#4769B1]">Bidang Keahlian</label>
        <textarea
          rows={3}
          value={draft.bidangKeahlian || ""}
          onChange={(e) => handleChange("bidangKeahlian", e.target.value)}
          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4769B1]/20"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {(draft.bidangKeahlian || "").split(",").map((item) => item.trim()).filter(Boolean).map((item) => (
            <span key={item} className="px-3 py-1 rounded-full bg-[#EAF2FF] text-[#4769B1] text-xs font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
