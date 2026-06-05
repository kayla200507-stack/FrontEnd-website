import React from "react";
import { Shield } from "lucide-react";

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition";

interface Props {
  twoFactor: boolean;
  onToggle2FA: () => void;
  onSavePassword: (e: React.FormEvent) => void;
}

export const SecurityTab: React.FC<Props> = ({ twoFactor, onToggle2FA, onSavePassword }) => (
  <div className="p-6 sm:p-8">
    <h3 className="text-xl font-bold text-slate-800 mb-6">Keamanan & Privasi</h3>

    <form onSubmit={onSavePassword} className="mb-10">
      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Shield size={18} className="text-blue-600" /> Ubah Kata Sandi Akun
      </h4>
      <div className="space-y-4 max-w-md">
        {["Kata Sandi Lama", "Kata Sandi Baru", "Konfirmasi Kata Sandi Baru"].map((label) => (
          <div key={label}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <input type="password" required placeholder="••••••••" className={inputCls} />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm w-full md:w-auto mt-2">
          Simpan Kata Sandi
        </button>
      </div>
    </form>

    <div className="border-t border-slate-100 my-8" />

    <div>
      <h4 className="font-semibold text-slate-800 mb-2">Autentikasi Dua Langkah (2FA)</h4>
      <p className="text-sm text-slate-500 mb-5 max-w-2xl">
        Tambahkan lapisan keamanan ekstra ke akun Anda. Saat aktif, Anda harus memasukkan kode unik yang dikirimkan ke perangkat Anda setiap kali login.
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggle2FA}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${twoFactor ? "bg-blue-600" : "bg-slate-200"}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${twoFactor ? "translate-x-6" : "translate-x-1"}`} />
        </button>
        <span className={`text-sm font-medium ${twoFactor ? "text-blue-600" : "text-slate-500"}`}>
          {twoFactor ? "2FA Aktif" : "2FA Nonaktif"}
        </span>
      </div>
    </div>
  </div>
);
