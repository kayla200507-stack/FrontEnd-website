import React from "react";
import { Users, Briefcase, CheckCircle, BookOpen } from "lucide-react";

interface SupervisionStatsCardsProps {
  totalStudents: number;
  activeInterns: number;
  completedInterns: number;
  avgProgress: number;
}

export const SupervisionStatsCards: React.FC<SupervisionStatsCardsProps> = ({
  totalStudents,
  activeInterns,
  completedInterns,
  avgProgress,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* CARD Total Mahasiswa */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="bg-blue-50 p-3 rounded-xl">
          <Users className="text-blue-600" size={22} />
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">Total Mahasiswa</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            {totalStudents}
          </h1>
        </div>
      </div>

      {/* CARD Sedang Magang */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="bg-emerald-50 p-3 rounded-xl">
          <Briefcase className="text-emerald-600" size={22} />
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">Sedang Magang</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            {activeInterns}
          </h1>
        </div>
      </div>

      {/* CARD Selesai Magang */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="bg-purple-50 p-3 rounded-xl">
          <CheckCircle className="text-purple-600" size={22} />
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">Selesai Magang</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            {completedInterns}
          </h1>
        </div>
      </div>

      {/* CARD Rata-rata Progress */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="bg-amber-50 p-3 rounded-xl">
          <BookOpen className="text-amber-500" size={22} />
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">
            Rata-rata Progress
          </p>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            {avgProgress}%
          </h1>
        </div>
      </div>
    </div>
  );
};
