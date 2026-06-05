import React, { useState } from "react";
import { Shield, Loader2, AlertTriangle } from "lucide-react";
import { useChangePassword, useDeleteAccount } from "@/hooks/useUsers";

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400";

export const SecurityTab: React.FC = () => {
  const { mutate: changePassword, isPending } = useChangePassword();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [passForm, setPassForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassForm({ ...passForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({
      current_password: passForm.current_password,
      new_password: passForm.new_password,
      new_password_confirmation: passForm.new_password_confirmation,
    });
    setPassForm({
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan!")) {
      deleteAccount();
    }
  };

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-tight">Keamanan & Privasi</h3>

      <form onSubmit={handleSubmit} className="mb-10">
        <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
          <Shield size={16} className="text-blue-600" /> Ubah Kata Sandi Akun
        </h4>
        <div className="space-y-4 max-w-md">
          {[
            ["Kata Sandi Saat Ini", "current_password"],
            ["Kata Sandi Baru", "new_password"],
            ["Konfirmasi Kata Sandi Baru", "new_password_confirmation"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">{label}</label>
              <input
                type="password"
                name={field}
                value={(passForm as any)[field]}
                onChange={handlePassChange}
                className={inputCls}
                required
                disabled={isPending}
                placeholder="••••••••"
              />
            </div>
          ))}
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-[#0A46D2] text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center gap-2 mt-2"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Simpan Kata Sandi
          </button>
        </div>
      </form>

      <div className="border-t border-slate-100 my-10" />

      <div>
        <h4 className="font-bold text-red-600 mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
          <AlertTriangle size={16} /> Hapus Akun
        </h4>
        <p className="text-sm text-slate-500 mb-6 max-w-2xl font-medium leading-relaxed">
          Menghapus akun Anda akan menghapus semua data pribadi, riwayat magang, dan informasi lainnya secara permanen. Tindakan ini tidak dapat dibatalkan.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="bg-red-50 text-red-600 border border-red-200 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
        >
          {isDeleting && <Loader2 size={16} className="animate-spin" />}
          Hapus Akun Permanen
        </button>
      </div>
    </div>
  );
};
