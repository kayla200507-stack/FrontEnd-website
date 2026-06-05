import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Users,
  Briefcase,
  CheckCircle,
  BookOpen,
  ChevronRight,
  User as UserIcon,
  Loader2,
} from "lucide-react";
import DashboardHeader from "../../components/features/dosen/DashboardHeader.tsx";
import { StudentDetailModal } from "../../components/features/dosen/StudentDetailModal";
import { useBimbingan } from "../../hooks/useMagang";

export default function MahasiswaBimbingan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: bimbingan = [], isLoading } = useBimbingan();

  // Kalkulasi Progress (6 Bulan)
  const calculateProgress = (tanggalMulai: string | null) => {
    if (!tanggalMulai) return 0;
    const start = new Date(tanggalMulai);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 6);
    
    const totalHari = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const today = new Date();
    const elapsed = Math.max(0, Math.min(totalHari, Math.round((today.getTime() - start.getTime()) / (1000 * 3600 * 24))));
    
    return Math.round((elapsed / totalHari) * 100);
  };

  // Map Data
  const mappedStudents = useMemo(() => {
    return bimbingan.map((m: any) => {
      const pendaftaranDiterima = m.mahasiswa?.pendaftarans?.find(
        (p: any) => p.status_pendaftaran === "Diterima"
      );
      return {
        ...m,
        progress: calculateProgress(m.tanggal_mulai),
        nama: m.mahasiswa?.user?.profile?.nama || m.mahasiswa?.nim || "-",
        nim: m.mahasiswa?.nim || "-",
        perusahaan: pendaftaranDiterima?.lowongan?.perusahaan || "-",
        posisi: pendaftaranDiterima?.lowongan?.judul || "-",
      };
    });
  }, [bimbingan]);

  // Statistics
  const stats = useMemo(() => {
    const total = mappedStudents.length;
    const active = mappedStudents.filter((s: any) => s.status_magang === "Aktif").length;
    const finished = mappedStudents.filter((s: any) => s.status_magang === "Selesai").length;
    const avgProgress = total > 0 
      ? Math.round(mappedStudents.reduce((acc: number, curr: any) => acc + curr.progress, 0) / total)
      : 0;

    return { total, active, finished, avgProgress };
  }, [mappedStudents]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return mappedStudents.filter(
      (s: any) =>
        s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nim.includes(searchTerm)
    );
  }, [searchTerm, mappedStudents]);

  const handleOpenDetail = (student: any) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Selesai":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-gray-500 font-medium">Memuat data bimbingan...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <DashboardHeader
        title="Mahasiswa Bimbingan"
        subtitle="Kelola dan pantau perkembangan mahasiswa magang bimbingan Anda"
      />

      {/* CARD STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Mahasiswa", value: stats.total, icon: Users, color: "blue" },
          { label: "Sedang Magang", value: stats.active, icon: Briefcase, color: "green" },
          { label: "Selesai Magang", value: stats.finished, icon: CheckCircle, color: "purple" },
          { label: "Rata-rata Progress", value: `${stats.avgProgress}%`, icon: BookOpen, color: "orange" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
              <stat.icon size={26} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN TABLE SECTION */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Daftar Bimbingan</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Klik "Detail" untuk informasi lengkap akademik dan magang</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari Nama atau NIM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="py-5 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Mahasiswa</th>
                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Penempatan</th>
                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Logbook</th>
                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Status</th>
                <th className="py-5 px-8 text-center text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student: any) => (
                <tr key={student.id_magang} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-blue-50 overflow-hidden flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                        {student.mahasiswa?.user?.avatar ? (
                          <img src={student.mahasiswa.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          student.nama.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{student.nama}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{student.nim}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <p className="text-sm font-bold text-slate-700">{student.perusahaan}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{student.posisi}</p>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000 group-hover:bg-blue-600" 
                          style={{ width: `${student.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs font-black text-slate-700">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusBadge(student.status_magang)}`}>
                      {student.status_magang}
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleOpenDetail(student)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all active:scale-95"
                      >
                        <Eye size={14} />
                        Detail
                        <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <UserIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Tidak ada mahasiswa yang ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {selectedStudent && (
        <StudentDetailModal
          isOpen={isDetailOpen}
          student={selectedStudent}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </div>
  );
}
