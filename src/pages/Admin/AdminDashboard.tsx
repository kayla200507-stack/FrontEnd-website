import React, { useState } from "react";
import { Users, Clock, Briefcase, CheckCircle2, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAllPendaftaran } from "../../hooks/usePendaftaran";
import { useUsers } from "../../hooks/useUsers";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { useAuthStore } from "../../stores/authStore";

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
  const navigate = useNavigate();
  const { data: pendaftaranResponse, isLoading: pendaftaranLoading } = useAllPendaftaran();
  const { data: usersResponse, isLoading: usersLoading } = useUsers({ role: 'mahasiswa' });
  const { user } = useAuthStore();

  const pendaftaranData = Array.isArray(pendaftaranResponse?.data) ? pendaftaranResponse.data : [];
  const usersData = Array.isArray(usersResponse?.data) ? usersResponse.data : [];

  const totalMahasiswa = usersData.length;
  const menungguVerifikasi = pendaftaranData.filter((p: any) => p.status_pendaftaran === 'Pending').length;
  
  let sedangMagang = 0;
  let selesaiMagang = 0;

  usersData.forEach((u: any) => {
    if (u.mahasiswa?.magangs) {
       const active = u.mahasiswa.magangs.some((m: any) => m.status_magang === 'Aktif');
       if (active) sedangMagang++;
       const selesai = u.mahasiswa.magangs.some((m: any) => m.status_magang === 'Selesai');
       if (selesai && !active) selesaiMagang++;
    }
  });

  const STATS_DATA = [
    { title: "Total Mahasiswa", value: totalMahasiswa, subtitle: "Terdaftar di sistem", icon: Users, color: "bg-blue-500" },
    { title: "Menunggu Verifikasi", value: menungguVerifikasi, subtitle: "Perlu ditindaklanjuti", icon: Clock, color: "bg-orange-500" },
    { title: "Sedang Magang", value: sedangMagang, subtitle: totalMahasiswa ? `${Math.round((sedangMagang/totalMahasiswa)*100)}% dari total` : "0% dari total", icon: Briefcase, color: "bg-green-500" },
    { title: "Selesai Magang", value: selesaiMagang, subtitle: "Telah lulus magang", icon: CheckCircle2, color: "bg-purple-500" },
  ];

  const recentApplications = pendaftaranData
    .filter((p: any) => p.status_pendaftaran === 'Pending' || p.status_pendaftaran === 'Diterima')
    .slice(0, 5)
    .map((p: any) => ({
      id: p.id_pendaftaran,
      nim: p.nim_mahasiswa,
      nama: p.mahasiswa?.user?.name || '-',
      perusahaan: p.lowongan?.nama_perusahaan || '-',
      tanggal: new Date(p.tanggal_daftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: p.status_pendaftaran === 'Pending' ? 'Menunggu' : p.status_pendaftaran === 'Diterima' ? 'Disetujui' : p.status_pendaftaran,
      raw: p
    }));

  if (pendaftaranLoading || usersLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-500 font-medium">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {/* HEADER PAGE */}
      <DashboardHeader
        title={`Selamat Datang, ${user?.nama || "Admin"}!`}
        description="Kelola verifikasi dan administrasi magang mahasiswa"
      />

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
            onClick={() => navigate('/admin/verifikasi-pendaftaran')}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Lihat Semua Verifikasi
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
              {recentApplications.map((row: any) => (
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
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => navigate('/admin/verifikasi-pendaftaran')}
                        className="px-4 py-1.5 bg-black text-white rounded-md text-xs font-medium hover:bg-gray-800 transition"
                      >
                        Detail Verifikasi
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {recentApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Belum ada pengajuan terbaru
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}