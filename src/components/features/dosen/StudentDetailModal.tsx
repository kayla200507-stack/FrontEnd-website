import React from "react";
import { Modal } from "../../common/Modal";

interface StudentDetailModalProps {
  student: any; // Magang data extended with UI properties
  onClose: () => void;
  isOpen: boolean;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  isOpen,
}) => {
  if (!student) return null;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Aktif":
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

  const tanggalMulai = student.tanggal_mulai
    ? new Date(student.tanggal_mulai).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const tanggalSelesai = student.tanggal_selesai
    ? new Date(student.tanggal_selesai).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const email = student.mahasiswa?.user?.email || "-";
  const phone = student.mahasiswa?.user?.profile?.no_hp || "-";
  const prodi = student.mahasiswa?.prodi || "-";
  const ipk = student.mahasiswa?.ipk ? Number(student.mahasiswa.ipk).toFixed(2) : "-";
  const statusLaporan = student.statusLaporan || "Belum Mulai"; // TODO: get from backend when Laporan is integrated
  const nilai = student.nilai || "Belum ada nilai"; // TODO: get from backend when Penilaian is integrated

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Mahasiswa"
      description="Informasi lengkap mahasiswa bimbingan"
      footer={null}
    >
      <div className="space-y-6">
        {/* Informasi Pribadi */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Informasi Pribadi
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-medium text-slate-400 text-xs">NIM</p>
              <p className="text-slate-800 font-bold mt-1">{student.nim}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">
                Nama Lengkap
              </p>
              <p className="text-slate-800 font-bold mt-1">
                {student.nama}
              </p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">Email</p>
              <p className="text-slate-700 font-medium mt-1">{email}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">
                Telepon
              </p>
              <p className="text-slate-700 font-medium mt-1">{phone}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">
                Program Studi
              </p>
              <p className="text-slate-700 font-medium mt-1">{prodi}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">IPK</p>
              <p className="font-bold text-slate-900 mt-1">
                {ipk}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Informasi Magang */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Informasi Magang
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-medium text-slate-400 text-xs">
                Perusahaan
              </p>
              <p className="text-slate-700 font-bold mt-1">{student.perusahaan}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">Posisi</p>
              <p className="text-slate-700 font-bold mt-1">{student.posisi}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">
                Tanggal Mulai
              </p>
              <p className="text-slate-700 font-medium mt-1">{tanggalMulai}</p>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs">
                Tanggal Selesai
              </p>
              <p className="text-slate-700 font-medium mt-1">{tanggalSelesai}</p>
            </div>
            
            <div>
              <p className="font-medium text-slate-400 text-xs">
                Nilai Akhir
              </p>
              <p className="text-blue-700 font-bold mt-1">{nilai}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium text-slate-400 text-xs mb-2">
              Status Magang
            </p>

            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                student.status_magang
              )}`}
            >
              {student.status_magang}
            </span>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Progress Aktivitas */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Progress Aktivitas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-slate-400 text-xs mb-2">
                Progress Durasi Magang (6 Bulan)
              </p>

              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 h-2 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full shadow-sm transition-all duration-1000"
                    style={{
                      width: `${student.progress}%`,
                    }}
                  />
                </div>

                <span className="font-bold text-slate-700 text-xs">
                  {student.progress}%
                </span>
              </div>
            </div>

            <div>
              <p className="font-medium text-slate-400 text-xs mb-2">
                Status Laporan
              </p>

              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getLaporanColor(
                  statusLaporan
                )}`}
              >
                {statusLaporan}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
