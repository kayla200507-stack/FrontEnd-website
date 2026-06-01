import React from "react";
import { Eye } from "lucide-react";
import type { Student } from "../../../data/dosenMockData";

interface StudentTableProps {
  students: Student[];
  onDetailClick: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onDetailClick,
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-xs">
          <tr>
            <th className="py-3 px-6">NIM</th>
            <th className="py-3 px-6">Nama</th>
            <th className="py-3 px-6">Perusahaan</th>
            <th className="py-3 px-6">Posisi</th>
            <th className="py-3 px-6">Progress Logbook</th>
            <th className="py-3 px-6">Status Laporan</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {students.length > 0 ? (
            students.map((student) => (
              <tr
                key={student.nim}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-4 px-6 font-medium text-slate-900">
                  {student.nim}
                </td>
                <td className="py-4 px-6 font-semibold text-blue-600">
                  {student.name}
                </td>
                <td className="py-4 px-6">{student.perusahaan}</td>
                <td className="py-4 px-6 text-slate-500">
                  {student.posisi}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-2 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-slate-600 text-xs">
                      {student.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getLaporanColor(
                      student.statusLaporan
                    )}`}
                  >
                    {student.statusLaporan}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => onDetailClick(student)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-all shadow-sm cursor-pointer"
                  >
                    <Eye size={14} />
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400">
                Mahasiswa tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
