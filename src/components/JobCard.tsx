import { MapPin, Clock, Building2 } from "lucide-react";
import type { Lowongan } from "../services/lowonganService";

export function JobCard({
  job,
  onApply,
  onDetail,
  isApplied = false,
}: {
  job: Lowongan;
  onApply: () => void;
  onDetail: () => void;
  isApplied?: boolean;
}) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-md transition-all duration-300 group">
      {/* Logo + badge row */}
      <div className="flex items-start justify-between mb-4">
        <div className="size-14 rounded-xl overflow-hidden bg-blue-50 shrink-0 border border-blue-100 flex items-center justify-center">
          {job.logo_perusahaan ? (
            <img src={job.logo_perusahaan} alt={job.nama_perusahaan} className="size-full object-cover" />
          ) : (
            <Building2 className="text-blue-500 w-7 h-7" />
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-blue-600 text-[11px] font-bold bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {job.tipe_pekerjaan}
          </span>
          <span className="text-gray-500 text-[11px] font-medium">
            {job.penempatan}
          </span>
        </div>
      </div>

      {/* Title + company */}
      <div className="flex-1">
        <h3 className="text-gray-900 text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">{job.judul}</h3>
        <p className="text-gray-500 text-sm font-medium mt-1 flex items-center gap-1">
          {job.nama_perusahaan}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-[13px] mt-4 leading-relaxed line-clamp-3">
          {job.deskripsi_singkat || "Klik detail untuk melihat deskripsi lengkap pekerjaan ini."}
        </p>
      </div>

      {/* Info Row */}
      <div className="grid grid-cols-2 gap-2 mt-6 pb-6 border-b border-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={14} className="text-blue-500" />
          <span className="text-xs font-medium truncate">{job.lokasi}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={14} className="text-blue-500" />
          <span className="text-xs font-medium">{job.durasi}</span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={onApply}
          disabled={isApplied}
          className={`flex-1 h-10 text-[13px] font-bold rounded-xl transition-all shadow-sm ${
            isApplied 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
          }`}
        >
          {isApplied ? "Sudah Terdaftar" : "Daftar Magang"}
        </button>
        <button
          onClick={onDetail}
          className="flex-1 h-10 bg-white text-gray-700 border border-gray-200 text-[13px] font-bold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Detail
        </button>
      </div>
      
      <div className="mt-3 flex items-center justify-center">
        <span className="text-[11px] text-gray-400 font-medium italic">
          Batas Lamaran: {formatDate(job.batas_lamaran)}
        </span>
      </div>
    </div>
  );
}
