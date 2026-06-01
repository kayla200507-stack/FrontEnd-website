import React from "react";
import { X } from "lucide-react";
import type { Student } from "../../../data/dosenMockData";

interface StudentDetailModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
}) => {
  const getStatusColor = (status: Student["status"]): string => {
    switch (status) {
      case "Sedang Magang":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Selesai":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLaporanColor = (status: string): string => {
    switch (status) {
      case "Sudah Submit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Disetujui":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Belum Mulai":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Detail Mahasiswa
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Informasi lengkap mahasiswa bimbingan
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs">
          {/* Informasi Pribadi */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Informasi Pribadi
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div>
                <p className="font-medium text-slate-400 text-[11px]">NIM</p>
                <p className="text-slate-800 font-semibold mt-0.5">{student.nim}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">
                  Nama Lengkap
                </p>
                <p className="text-slate-800 font-semibold mt-0.5">
                  {student.name}
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">Email</p>
                <p className="text-slate-700 mt-0.5">{student.email}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">
                  Telepon
                </p>
                <p className="text-slate-700 mt-0.5">{student.phone}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">
                  Program Studi
                </p>
                <p className="text-slate-700 mt-0.5">{student.programStudi}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">IPK</p>
                <p className="font-bold text-slate-900 mt-0.5">
                  {student.ipk.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Informasi Magang */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Informasi Magang
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div>
                <p className="font-medium text-slate-400 text-[11px]">
                  Perusahaan
                </p>
                <p className="text-slate-700 mt-0.5">{student.perusahaan}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">Posisi</p>
                <p className="text-slate-700 mt-0.5">{student.posisi}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">
                  Tanggal Mulai
                </p>
                <p className="text-slate-700 mt-0.5">{student.tanggalMulai}</p>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px]">
                  Tanggal Selesai
                </p>
                <p className="text-slate-700 mt-0.5">30 Juni 2026</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="font-medium text-slate-400 text-[11px] mb-1">
                Status Magang
              </p>

              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(
                  student.status
                )}`}
              >
                {student.status}
              </span>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Progress Aktivitas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Progress Aktivitas
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-slate-400 text-[11px] mb-1">
                  Progress Logbook
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${student.progress}%`,
                      }}
                    />
                  </div>

                  <span className="font-bold text-slate-700 text-[10px]">
                    {student.progress}%
                  </span>
                </div>
              </div>

              <div>
                <p className="font-medium text-slate-400 text-[11px] mb-1">
                  Status Laporan
                </p>

                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getLaporanColor(
                    student.statusLaporan
                  )}`}
                >
                  {student.statusLaporan}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-[11px] font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
