import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  FileText,
  Bell,
  Shield,
  Upload,
  Camera,
  CheckCircle2
} from 'lucide-react';

type TabType = 'informasi' | 'pendidikan' | 'dokumen' | 'notifikasi' | 'keamanan';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('informasi');

  // Notification States
  const [pushNotif, setPushNotif] = useState(true);
  const [emailReport, setEmailReport] = useState(false);
  const [deadlineAlert, setDeadlineAlert] = useState(true);

  // Security States
  const [twoFactor, setTwoFactor] = useState(false);

  const menuItems = [
    { id: 'informasi', label: 'Informasi Pribadi', icon: User },
    { id: 'pendidikan', label: 'Latar Pendidikan', icon: GraduationCap },
    { id: 'dokumen', label: 'Dokumen Magang', icon: FileText },
    { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
    { id: 'keamanan', label: 'Keamanan & Privasi', icon: Shield },
  ] as const;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* SIDEBAR */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">Pengaturan</h2>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* INFORMASI PRIBADI */}
          {activeTab === 'informasi' && (
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Informasi Pribadi</h3>

              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    <User size={40} className="text-slate-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-md hover:bg-blue-700 transition">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">Foto Profil</h4>
                  <p className="text-sm text-slate-500 mb-2">PNG, JPG max 2MB</p>
                  <div className="flex gap-3">
                    <button className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">Ganti Foto</button>
                    <button className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition">Hapus</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                  <input type="text" defaultValue="Keisya Lanika" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">NIM</label>
                  <input type="text" defaultValue="123456789" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" defaultValue="keisya@mahasiswa.edu" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">No. Telepon</label>
                  <input type="tel" defaultValue="+62 812 3456 7890" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* PENDIDIKAN */}
          {activeTab === 'pendidikan' && (
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Latar Belakang Pendidikan</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Universitas</label>
                  <input type="text" value="Universitas Indonesia" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fakultas / Program Studi</label>
                  <input type="text" value="D3 Teknologi Informasi" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Semester Saat Ini</label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition appearance-none bg-white">
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">IPK Terakhir</label>
                  <input type="number" step="0.01" defaultValue="3.85" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
                  Perbarui Data
                </button>
              </div>
            </div>
          )}

          {/* DOKUMEN MAGANG */}
          {activeTab === 'dokumen' && (
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Dokumen Magang</h3>

              <div className="space-y-4">
                {[
                  { title: 'Resume / CV', desc: 'Format PDF, max 5MB', status: 'Terunggah' },
                  { title: 'Transkrip Nilai', desc: 'Semester 1 s.d terakhir. PDF max 5MB', status: 'Belum diunggah' },
                  { title: 'Surat Rekomendasi', desc: 'Opsional. PDF max 5MB', status: 'Belum diunggah' },
                ].map((doc, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-blue-200 transition bg-slate-50/50 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{doc.title}</h4>
                        <p className="text-sm text-slate-500">{doc.desc}</p>
                        {doc.status === 'Terunggah' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
                            <CheckCircle2 size={14} /> {doc.status}
                          </span>
                        ) : (
                          <span className="inline-block text-xs font-medium text-slate-400 mt-1">{doc.status}</span>
                        )}
                      </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition">
                      <Upload size={16} />
                      Unggah File
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTIFIKASI */}
          {activeTab === 'notifikasi' && (
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Pengaturan Notifikasi</h3>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                  <div>
                    <h4 className="font-semibold text-slate-800">Push Notification</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Terima pemberitahuan langsung di browser</p>
                  </div>
                  <button
                    onClick={() => setPushNotif(!pushNotif)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushNotif ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushNotif ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                  <div>
                    <h4 className="font-semibold text-slate-800">Email Laporan</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Laporan aktivitas magang via email</p>
                  </div>
                  <button
                    onClick={() => setEmailReport(!emailReport)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailReport ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailReport ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                  <div>
                    <h4 className="font-semibold text-slate-800">Peringatan Deadline</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Pengingat tugas dan logbook harian</p>
                  </div>
                  <button
                    onClick={() => setDeadlineAlert(!deadlineAlert)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${deadlineAlert ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${deadlineAlert ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* KEAMANAN & PRIVASI */}
          {activeTab === 'keamanan' && (
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Keamanan & Privasi</h3>

              {/* Ubah Kata Sandi */}
              <div className="mb-10">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  Ubah Kata Sandi
                </h4>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Kata Sandi Lama</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Kata Sandi Baru</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Konfirmasi Kata Sandi Baru</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm w-full md:w-auto mt-2">
                    Simpan Kata Sandi
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 my-8"></div>

              {/* 2FA */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Autentikasi Dua Langkah (2FA)</h4>
                <p className="text-sm text-slate-500 mb-5 max-w-2xl">
                  Tambahkan lapisan keamanan ekstra ke akun Anda. Saat aktif, Anda harus memasukkan kode unik yang dikirimkan ke perangkat Anda setiap kali login.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${twoFactor ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className={`text-sm font-medium ${twoFactor ? 'text-blue-600' : 'text-slate-500'}`}>
                    {twoFactor ? '2FA Aktif' : '2FA Nonaktif'}
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}