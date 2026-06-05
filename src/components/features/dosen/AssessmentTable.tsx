import React from "react";
import { Search, GraduationCap, Building, Calendar, Edit, FileText } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Input } from "../../../components/common/Input";
import { Button } from "../../ui/button";
import StatusBadge from "./StatusBadge";

// Match the main types
export interface InternAssessment {
  id: number;
  nim: string;
  studentName: string;
  company: string;
  position: string;
  periodStart: string;
  periodEnd: string;
  logbookScore: number;
  reportScore?: number;
  presentationScore?: number;
  finalScore?: number;
  grade?: string;
  status: "pending" | "assessed" | "completed" | "uncompleted";
  feedback?: string;
}

interface AssessmentTableProps {
  assessments: InternAssessment[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAssess: (student: InternAssessment) => void;
}

const GradeBadge: React.FC<{ grade: string }> = ({ grade }) => {
  const colorMap: Record<string, string> = {
    A: "bg-emerald-100 text-emerald-700 border-emerald-200",
    AB: "bg-green-100 text-green-700 border-green-200",
    B: "bg-blue-100 text-blue-700 border-blue-200",
    BC: "bg-sky-100 text-sky-700 border-sky-200",
    C: "bg-yellow-100 text-yellow-700 border-yellow-200",
    D: "bg-orange-100 text-orange-700 border-orange-200",
    E: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${colorMap[grade] || colorMap.E} px-3 py-1 text-sm font-bold ml-2`}
    >
      {grade}
    </Badge>
  );
};

export const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessments,
  searchQuery,
  onSearchChange,
  onAssess,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-slate-600" />
              Daftar Mahasiswa Bimbingan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau progress dan status mahasiswa bimbingan Anda
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cari berdasarkan nama atau NIM..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                NIM
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Nama
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Perusahaan
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Posisi
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Periode
              </th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Skor Logbook
              </th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {assessments.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-500">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Tidak ada mahasiswa yang ditemukan</p>
                </td>
              </tr>
            ) : (
              assessments.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono text-slate-700">
                    {student.nim}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="font-semibold text-slate-800 text-sm">
                        {student.studentName}
                      </span>
                      {student.grade && <GradeBadge grade={student.grade} />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{student.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {student.position}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {student.periodStart} - {student.periodEnd}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
                      {student.logbookScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={student.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => onAssess(student)}
                      disabled={student.status === "uncompleted"}
                      className={`gap-1.5 h-8 text-xs cursor-pointer ${
                        student.status === "uncompleted"
                          ? "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-100"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Beri Nilai
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
