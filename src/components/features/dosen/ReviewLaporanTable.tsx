import React from "react";
import { User, Calendar, Building, Download, MessageSquare, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { InternReport } from "../../../data/dosenMockData";

interface ReviewLaporanTableProps {
  reports: InternReport[];
  onDownload: (report: InternReport) => void;
  onReview: (report: InternReport) => void;
}

export const ReviewLaporanTable: React.FC<ReviewLaporanTableProps> = ({
  reports,
  onDownload,
  onReview,
}) => {
  const getStatusBadge = (status: InternReport["status"]) => {
    const config = {
      waiting: {
        icon: Clock,
        label: "Menunggu Review",
        className: "bg-amber-100 text-amber-800",
      },
      approved: {
        icon: CheckCircle,
        label: "Disetujui",
        className: "bg-emerald-100 text-emerald-800",
      },
      revision: {
        icon: AlertCircle,
        label: "Perlu Revisi",
        className: "bg-rose-100 text-rose-800",
      },
    };

    const { icon: Icon, label, className } = config[status];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${className}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left p-4 font-semibold text-sm text-slate-700">
              Laporan / Mahasiswa
            </th>
            <th className="text-left p-4 font-semibold text-sm text-slate-700">
              Perusahaan & Posisi
            </th>
            <th className="text-left p-4 font-semibold text-sm text-slate-700">
              Status
            </th>
            <th className="text-left p-4 font-semibold text-sm text-slate-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-12 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Tidak ada laporan yang ditemukan</p>
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
              >
                <td className="p-4">
                  <div className="space-y-1.5">
                    <p className="font-semibold text-slate-800">
                      {report.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="w-3.5 h-3.5" />
                      <span>
                        {report.studentName} ({report.nim})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>Submit: {report.submitDate}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-medium text-slate-700">
                        {report.company}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 ml-5">
                      {report.position}
                    </p>
                  </div>
                </td>
                <td className="p-4">{getStatusBadge(report.status)}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDownload(report)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                    <button
                      onClick={() => onReview(report)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
