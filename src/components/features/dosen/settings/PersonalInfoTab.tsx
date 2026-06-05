import React, { useState, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { useUpdateProfile } from "@/hooks/useUsers";

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400";

interface Props {
  form: any;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  role: "mahasiswa" | "dosen" | "admin";
}

export const PersonalInfoTab: React.FC<Props> = ({ form: initialForm, role }) => {
  const [form, setForm] = useState(initialForm);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm((prev: any) => ({ ...prev, avatar_file: file, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined && key !== 'avatar' && key !== 'avatar_file' && key !== 'foto_profile') {
        formData.append(key, form[key]);
      }
    });
    
    if (form.avatar_file) {
      formData.append('avatar', form.avatar_file);
    }
    
    updateProfile(formData);
  };

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-50">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-[28px] bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl font-black text-slate-300">
                {(form.nama || "U").charAt(0)}
              </div>
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 p-2 bg-blue-600 rounded-2xl text-white shadow-lg border-2 border-white group-hover:scale-110 transition-transform cursor-pointer">
            <Camera size={16} />
            <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
          </label>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-slate-900 text-lg uppercase tracking-tight">Foto Profil {roleLabel}</h4>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Format PNG, JPG • Maks. 2MB</p>
          <div className="flex gap-2 mt-4 justify-center sm:justify-start">
            <button 
              type="button" 
              onClick={() => setForm((prev: any) => ({ ...prev, avatar_file: null, avatar: null }))}
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              Hapus
            </button>
            <label className="text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition cursor-pointer">
              Ganti Foto
              <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Bio Singkat (Opsional)</label>
          <textarea 
            value={form.bio || ""} 
            onChange={(e) => handleChange("bio", e.target.value)} 
            placeholder="Tuliskan sedikit tentang diri Anda..."
            className={`${inputCls} resize-none h-24`} 
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Nama Lengkap</label>
          <input type="text" value={form.nama || ""} onChange={(e) => handleChange("nama", e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Email Aktif</label>
          <input type="email" value={form.email || ""} onChange={(e) => handleChange("email", e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">No. Telepon / WhatsApp</label>
          <input type="tel" value={form.no_hp || form.no_telp || ""} onChange={(e) => handleChange("no_hp", e.target.value)} className={inputCls} />
        </div>



        <div className={role === "admin" ? "md:col-span-2" : ""}>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Alamat Lengkap</label>
          <input type="text" value={form.alamat || ""} onChange={(e) => handleChange("alamat", e.target.value)} className={inputCls} />
        </div>

        {role !== "dosen" && (
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Tanggal Lahir</label>
            <input type="date" value={form.tanggal_lahir || ""} onChange={(e) => handleChange("tanggal_lahir", e.target.value)} className={inputCls} />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Nama Institusi / Unit</label>
          <input type="text" value={form.institusi || form.universitas || ""} onChange={(e) => handleChange("institusi", e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Fakultas</label>
          <input type="text" value={form.fakultas || ""} onChange={(e) => handleChange("fakultas", e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Jurusan / Prodi</label>
          <input type="text" value={form.program_studi || form.prodi || ""} onChange={(e) => handleChange("program_studi", e.target.value)} className={inputCls} />
        </div>

        <div className="md:col-span-2 border-t border-slate-50 pt-6">
          <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            Media Sosial & Profesional
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">GitHub</label>
              <input type="url" value={form.github_url || ""} onChange={(e) => handleChange("github_url", e.target.value)} placeholder="github.com/username" className={inputCls} />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">Portfolio</label>
              <input type="url" value={form.portfolio_url || ""} onChange={(e) => handleChange("portfolio_url", e.target.value)} placeholder="portfolio.com" className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave} 
          disabled={isPending}
          className="bg-[#0A46D2] text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center gap-2"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};
