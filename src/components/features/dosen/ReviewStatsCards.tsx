import React from "react";
import { FolderOpen, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface ReviewStatsCardsProps {
  stats: {
    total: number;
    waiting: number;
    approved: number;
    revision: number;
  };
}

export const ReviewStatsCards: React.FC<ReviewStatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Laporan</p>
            <p className="text-3xl font-bold mt-2 text-slate-800">
              {stats.total}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
            <FolderOpen className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Menunggu Review</p>
            <p className="text-3xl font-bold mt-2 text-slate-800">
              {stats.waiting}
            </p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Disetujui</p>
            <p className="text-3xl font-bold mt-2 text-slate-800">
              {stats.approved}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Perlu Revisi</p>
            <p className="text-3xl font-bold mt-2 text-slate-800">
              {stats.revision}
            </p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl group-hover:scale-110 transition-transform">
            <AlertCircle className="w-6 h-6 text-rose-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
