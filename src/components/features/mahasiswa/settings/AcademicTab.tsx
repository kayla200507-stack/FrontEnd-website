import React from "react";

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition";

interface Props {
  form: { universitas: string; prodi: string; jabatan: string; golongan: string; pendidikan: string };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}

export const AcademicTab: React.FC<Props> = ({ form, onChange, onSave }) => (
  <div className="p-6 sm:p-8">
    <h3 className="text-xl font-bold text-slate-800 mb-6">Informasi Akademik</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Universitas / Institusi</label>
        <input type="text" value={form.universitas} onChange={(e) => onChange("universitas", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Fakultas / Program Studi</label>
        <input type="text" value={form.prodi} onChange={(e) => onChange("prodi", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Semester Saat Ini</label>
        <input type="number" value={form.semester} onChange={(e) => onChange("semester", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">IPK Terakhir</label>
        <input type="number" step="0.01" value={form.ipk} onChange={(e) => onChange("ipk", e.target.value)} className={inputCls} />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-2">Jenjang Pendidikan</label>
        <input type="text" value={form.pendidikan} onChange={(e) => onChange("pendidikan", e.target.value)} className={inputCls} />
      </div>
    </div>

    <div className="flex justify-end">
      <button onClick={onSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
        Perbarui Data
      </button>
    </div>
  </div>
);
