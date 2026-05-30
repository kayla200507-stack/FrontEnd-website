import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  User,
  Briefcase,
  Bell,
  Shield,
  Camera,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

type TabType =
  | "informasi"
  | "wewenang"
  | "notifikasi"
  | "keamanan";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("informasi");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
  };

  // Notification States
  const [systemAlert, setSystemAlert] = useState(true);
  const [newUserNotif, setNewUserNotif] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Security States
  const [twoFactor, setTwoFactor] = useState(false);

  // Profile Form States
  const [nama, setNama] = useState("Admin Fakultas Utama");
  const [nip, setNip] = useState("198501232010121001");
  const [email, setEmail] = useState("admin.filkom@university.ac.id");
  const [telepon, setTelepon] = useState("081234567890");

  // Role Form States
  const [unitKerja, setUnitKerja] = useState("Fakultas Vokasi");
  const [peranSistem, setPeranSistem] = useState("Super Administrator");
  const [tingkatAkses, setTingkatAkses] = useState("Tingkat 1 (Akses Penuh)");

  const menuItems = [
    { id: "informasi", label: "Informasi Pribadi", icon: User },
    { id: "wewenang", label: "Tugas & Wewenang", icon: Briefcase },
    { id: "notifikasi", label: "Notifikasi Sistem", icon: Bell },
    { id: "keamanan", label: "Keamanan & Privasi", icon: Shield },
  ] as const;

  const handleSaveProfile = () => {
    toast.success("Informasi pribadi admin berhasil disimpan");
  };

  const handleSaveRole = () => {
    toast.success("Data wewenang berhasil diperbarui");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Kata sandi berhasil diubah");
  };

  return (
    <AdminLayout onLogout={handleLogout} activeMenu="settings">
      <div className="p-2">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* SIDEBAR CONTAINER */}
          <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
            {/* CARD PENGATURAN */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">
                Pengaturan Admin
              </h2>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <Icon
                        size={20}
                        className={isActive ? "text-blue-600" : "text-slate-400"}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* TOMBOL LOG OUT */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-red-100 shadow-sm transition-all font-medium text-sm text-red-600 hover:bg-red-50 hover:border-red-200"
            >
              <LogOut size={20} className="text-red-500" />
              Keluar Akun
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* INFORMASI PRIBADI */}
            {activeTab === "informasi" && (
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Informasi Pribadi Admin
                </h3>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                      <img
                        src="/Profiles/AdminPersonal.png"
                        alt="Foto Profil"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://ui-avatars.com/api/?name=Admin+Utama&background=4769B1&color=fff&size=96";
                        }}
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-md hover:bg-blue-700 transition">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-lg">
                      Foto Profil Admin
                    </h4>
                    <p className="text-sm text-slate-500 mb-2">
                      Format PNG, JPG. Maksimal 2MB
                    </p>
                    <div className="flex gap-3">
                      <button className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                        Ganti Foto
                      </button>
                      <button className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      NIP / NIK
                    </label>
                    <input
                      type="text"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Administrator
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      No. Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={telepon}
                      onChange={(e) => setTelepon(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {/* TUGAS & WEWENANG */}
            {activeTab === "wewenang" && (
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Tugas & Wewenang
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Unit Kerja / Bagian
                    </label>
                    <input
                      type="text"
                      value={unitKerja}
                      onChange={(e) => setUnitKerja(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-slate-50"
                      readOnly
                    />
                    <p className="text-xs text-slate-500 mt-1">Perubahan unit kerja harus melalui Super Admin.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Peran Sistem
                    </label>
                    <input
                      type="text"
                      value={peranSistem}
                      onChange={(e) => setPeranSistem(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-slate-50"
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tingkat Akses Keamanan
                    </label>
                    <select
                      value={tingkatAkses}
                      onChange={(e) => setTingkatAkses(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
                    >
                      <option value="Tingkat 1 (Akses Penuh)">Tingkat 1 - Akses Penuh (Manajemen User & Sistem)</option>
                      <option value="Tingkat 2 (Manajemen Data)">Tingkat 2 - Manajemen Data Akademik & Magang</option>
                      <option value="Tingkat 3 (Hanya Baca)">Tingkat 3 - Read Only / Pemantauan</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveRole}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
                  >
                    Perbarui Data
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFIKASI */}
            {activeTab === "notifikasi" && (
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Pengaturan Notifikasi Sistem
                </h3>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Peringatan & Error Sistem
                      </h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Pemberitahuan instan jika terjadi anomali atau downtime pada server
                      </p>
                    </div>
                    <button
                      onClick={() => setSystemAlert(!systemAlert)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${systemAlert ? "bg-blue-600" : "bg-slate-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${systemAlert ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>

                  <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Pendaftaran Pengguna Baru
                      </h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Notifikasi saat ada mahasiswa atau dosen baru yang membuat akun
                      </p>
                    </div>
                    <button
                      onClick={() => setNewUserNotif(!newUserNotif)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${newUserNotif ? "bg-blue-600" : "bg-slate-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${newUserNotif ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>

                  <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Rekap Aktivitas Mingguan
                      </h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Kirim log aktivitas sistem secara keseluruhan ke email admin
                      </p>
                    </div>
                    <button
                      onClick={() => setWeeklyReport(!weeklyReport)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${weeklyReport ? "bg-blue-600" : "bg-slate-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${weeklyReport ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KEAMANAN & PRIVASI */}
            {activeTab === "keamanan" && (
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Keamanan & Privasi Admin
                </h3>

                {/* Ubah Kata Sandi */}
                <form onSubmit={handleSavePassword} className="mb-10">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-blue-600" />
                    Ubah Kata Sandi Kredensial
                  </h4>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Kata Sandi Lama
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Konfirmasi Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm w-full md:w-auto mt-2"
                    >
                      Simpan Kata Sandi
                    </button>
                  </div>
                </form>

                <div className="border-t border-slate-100 my-8"></div>

                {/* 2FA */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Autentikasi Dua Langkah (2FA)
                  </h4>
                  <p className="text-sm text-slate-500 mb-5 max-w-2xl">
                    Disarankan untuk akun tingkat administrator. Tambahkan lapisan keamanan ekstra agar sistem tidak mudah diretas meskipun kata sandi diketahui.
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${twoFactor ? "bg-blue-600" : "bg-slate-200"}`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${twoFactor ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                    <span
                      className={`text-sm font-medium ${twoFactor ? "text-blue-600" : "text-slate-500"}`}
                    >
                      {twoFactor ? "2FA Aktif" : "2FA Nonaktif"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}