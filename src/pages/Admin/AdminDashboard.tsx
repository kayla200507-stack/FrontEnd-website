import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Users, Clock, Briefcase, CheckCircle2, X } from "lucide-react";

// --- MOCK DATA ---
const STATS_DATA = [
  {
    title: "Total Mahasiswa",
    value: "234",
    subtitle: "+12 bulan ini",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Menunggu Verifikasi",
    value: "8",
    subtitle: "Perlu ditindaklanjuti",
    icon: Clock,
    color: "bg-orange-500",
  },
  {
    title: "Sedang Magang",
    value: "89",
    subtitle: "38% dari total",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    title: "Selesai Magang",
    value: "127",
    subtitle: "Semester ini",
    icon: CheckCircle2,
    color: "bg-purple-500",
  },
];

const RECENT_APPLICATIONS = [
  {
    id: 1,
    nim: "11210001",
    nama: "Budi Santoso",
    perusahaan: "PT Teknologi Maju",
    tanggal: "25 Maret 2026",
    status: "Menunggu",
  },
  {
    id: 2,
    nim: "11210002",
    nama: "Siti Rahmawati",
    perusahaan: "PT Digital Kreatif",
    tanggal: "25 Maret 2026",
    status: "Revisi",
  },
  {
    id: 3,
    nim: "11210003",
    nama: "Ahmad Fauzi",
    perusahaan: "PT Inovasi Sistem",
    tanggal: "24 Maret 2026",
    status: "Revisi",
  },
  {
    id: 4,
    nim: "11210004",
    nama: "Dewi Lestari",
    perusahaan: "PT Media Online",
    tanggal: "24 Maret 2026",
    status: "Disetujui",
  },
  {
    id: 5,
    nim: "11210005",
    nama: "Rudi Hermawan",
    perusahaan: "PT Solusi Digital",
    tanggal: "23 Maret 2026",
    status: "Menunggu",
  },
];

// --- HELPER UNTUK WARNA STATUS ---
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Menunggu":
      return "bg-orange-50 text-orange-600 border-orange-100";
    case "Revisi":
      return "bg-red-50 text-red-600 border-red-100";
    case "Disetujui":
      return "bg-green-50 text-green-600 border-green-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

export default function DashboardAdmin() {
  // --- STATE UNTUK MODAL VERIFIKASI ---
  const [isVerifikasiModalOpen, setIsVerifikasiModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  // --- STATE UNTUK MODAL LIHAT SEMUA ---
  const [isLihatSemuaModalOpen, setIsLihatSemuaModalOpen] = useState(false);

  const openVerifikasiModal = (row: any) => {
    setSelectedApplication(row);
    setIsVerifikasiModalOpen(true);
  };

  return (
    <AdminLayout activeMenu="dashboard">
      {/* HEADER PAGE */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#4769B1] mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Kelola verifikasi dan administrasi magang mahasiswa
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS_DATA.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center gap-5"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${stat.color} shadow-sm shrink-0`}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 leading-none mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-400">{stat.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-[#4769B1] font-semibold text-lg">
              Pengajuan Masuk Terbaru
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">
              Daftar pengajuan yang perlu diverifikasi
            </p>
          </div>
          <button 
            onClick={() => setIsLihatSemuaModalOpen(true)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Lihat Semua
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-sm font-semibold text-gray-800">
                  NIM
                </th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-800">
                  Nama
                </th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-800">
                  Perusahaan
                </th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-800">
                  Tanggal Pengajuan
                </th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-800">
                  Status Dokumen
                </th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-800 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {RECENT_APPLICATIONS.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-600 font-medium">
                    {row.nim}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-800">
                    {row.nama}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 font-medium">
                    {row.perusahaan}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {row.tanggal}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {/* Menggunakan justify-center agar satu tombol otomatis di tengah */}
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => openVerifikasiModal(row)}
                        className="px-4 py-1.5 bg-black text-white rounded-md text-xs font-medium hover:bg-gray-800 transition"
                      >
                        Verifikasi
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL VERIFIKASI (POP UP) */}
      {isVerifikasiModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="font-bold text-[#4769B1] text-lg">
                Verifikasi Pengajuan
              </h3>
              <button
                onClick={() => setIsVerifikasiModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">
                  Anda akan memverifikasi pengajuan dari:
                </p>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-semibold text-gray-900">{selectedApplication.nama} ({selectedApplication.nim})</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedApplication.perusahaan}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsVerifikasiModalOpen(false)}
                  className="w-full h-11 bg-[#4769B1] text-white rounded-xl text-sm font-medium hover:bg-[#3f5d9f] transition-colors"
                >
                  Setujui Pengajuan
                </button>
                <button
                  onClick={() => setIsVerifikasiModalOpen(false)}
                  className="w-full h-11 border border-red-200 text-red-600 bg-red-50 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Minta Revisi
                </button>
                <button
                  onClick={() => setIsVerifikasiModalOpen(false)}
                  className="w-full h-11 border border-gray-200 text-gray-600 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors mt-2"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LIHAT SEMUA (POP UP) */}
      {isLihatSemuaModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#4769B1] text-lg">
                  Semua Pengajuan Masuk
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Menampilkan seluruh data pengajuan mahasiswa
                </p>
              </div>
              <button
                onClick={() => setIsLihatSemuaModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 p-1.5 rounded-lg hover:bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase">NIM</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Nama</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Perusahaan</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_APPLICATIONS.map((row) => (
                      <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 text-sm text-gray-600 font-medium">{row.nim}</td>
                        <td className="py-3.5 px-4 text-sm font-semibold text-gray-800">{row.nama}</td>
                        <td className="py-3.5 px-4 text-sm text-gray-600 font-medium">{row.perusahaan}</td>
                        <td className="py-3.5 px-4 text-sm text-gray-600">{row.tanggal}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => {
                                setIsLihatSemuaModalOpen(false);
                                openVerifikasiModal(row);
                              }}
                              className="px-3 py-1 bg-black text-white rounded-md text-xs font-medium hover:bg-gray-800"
                            >
                              Verifikasi
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex justify-end">
              <button
                onClick={() => setIsLihatSemuaModalOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}