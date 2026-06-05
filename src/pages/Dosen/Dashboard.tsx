import { useMemo } from "react";
import {
  Users,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Building,
  MapPin,
  Loader2,
  UserIcon,
} from "lucide-react";

import { DashboardHeader } from "../../components/common/DashboardHeader";
import { useAuthStore } from "../../stores/authStore";
import { useBimbingan } from "../../hooks/useMagang";
import { Card } from "../../components/common/Card";

export default function DashboardDosen() {
  const { user } = useAuthStore();
  const { data: bimbingan = [], isLoading } = useBimbingan();

  const stats = useMemo(() => {
    const total = bimbingan.length;
    const aktif = bimbingan.filter((m: any) => m.status_magang === "Aktif").length;
    const selesai = bimbingan.filter((m: any) => m.status_magang === "Selesai").length;
    return { total, aktif, selesai };
  }, [bimbingan]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-gray-500 font-medium">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Selamat Datang, ${user?.nama || "Dosen"}!`}
        description="Kelola dan pantau mahasiswa bimbingan magang Anda"
      />

      {/* Statistik Bimbingan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            label: "Total Mahasiswa Bimbingan",
            value: stats.total,
            icon: Users,
            color: "bg-blue-500",
            sub: "Seluruh bimbingan",
          },
          {
            label: "Sedang Aktif",
            value: stats.aktif,
            icon: Briefcase,
            color: "bg-green-500",
            sub: "Magang berjalan",
          },
          {
            label: "Selesai Magang",
            value: stats.selesai,
            icon: CheckCircle2,
            color: "bg-purple-500",
            sub: "Telah selesai",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${stat.color} shadow-sm shrink-0`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 leading-none mb-1">{stat.value}</h3>
                <p className="text-xs text-gray-400">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daftar Mahasiswa Bimbingan */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Daftar Mahasiswa Bimbingan</h2>
              <p className="text-sm text-gray-400 mt-0.5">Mahasiswa yang magang di bawah bimbingan Anda</p>
            </div>
          </div>
        </div>

        {bimbingan.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-gray-400 gap-3">
            <UserIcon size={48} strokeWidth={1} className="opacity-20" />
            <p className="text-sm font-medium">Belum ada mahasiswa bimbingan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mahasiswa</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tempat Magang</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tanggal Mulai</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {bimbingan.map((m: any) => {
                  const nama = m.mahasiswa?.user?.profile?.nama || m.mahasiswa?.nim || "-";
                  const nim = m.mahasiswa?.nim || "-";
                  const avatar = m.mahasiswa?.user?.avatar;

                  // Ambil lowongan diterima
                  const pendaftaranDiterima = m.mahasiswa?.pendaftarans?.find(
                    (p: any) => p.status_pendaftaran === "Diterima"
                  );
                  const perusahaan = pendaftaranDiterima?.lowongan?.perusahaan || "-";
                  const posisi = pendaftaranDiterima?.lowongan?.judul || "-";
                  const lokasi = pendaftaranDiterima?.lowongan?.lokasi;

                  const tanggalMulai = m.tanggal_mulai
                    ? new Date(m.tanggal_mulai).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-";

                  const statusMap: Record<string, string> = {
                    Aktif: "bg-blue-50 text-blue-700 border-blue-200",
                    Selesai: "bg-green-50 text-green-700 border-green-200",
                    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
                  };

                  return (
                    <tr
                      key={m.id_magang}
                      className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 overflow-hidden flex items-center justify-center shrink-0">
                            {avatar ? (
                              <img src={avatar} alt={nama} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-blue-600 font-bold text-sm">{nama.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{nama}</p>
                            <p className="text-xs text-gray-400">{nim}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-2">
                          <Building size={14} className="text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{perusahaan}</p>
                            <p className="text-xs text-gray-400">{posisi}</p>
                            {lokasi && (
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <MapPin size={10} /> {lokasi}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{tanggalMulai}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusMap[m.status_magang] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {m.status_magang}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
