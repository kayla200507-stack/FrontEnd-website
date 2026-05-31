import { Users } from "lucide-react";
import type { Job } from "../../utils/types";

interface JobCardProps {
  job: Job;
  active?: boolean;
  onClick?: () => void;
}

export function JobCard({ job, active = false, onClick }: JobCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl p-7 cursor-pointer transition-all select-none w-full ${
        active
          ? "border-2 border-[#3a60a0] shadow-lg"
          : "border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md shadow-sm"
      }`}
    >
      {/* Logo + Deadline */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#f8f9fc] flex items-center justify-center border border-[rgba(226,232,240,0.3)]">
          <img src={job.logo} alt={job.company} className="w-10 h-10 object-cover rounded-xl" />
        </div>
        <span
          className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-tight ${
            job.deadlineVariant === "red"
              ? "bg-[rgba(254,226,226,0.5)] text-[#dc2626]"
              : "bg-[#f1f5f9] text-[#64748b]"
          }`}
        >
          {job.deadlineLabel}
        </span>
      </div>

      {/* Title + Location */}
      <div className="mt-4">
        <h3 className="text-[#1a1c21] font-semibold text-lg leading-7">{job.title}</h3>
        <p className="text-[#64748b] font-medium text-sm mt-0.5">{job.location}</p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-4">
        <span className="bg-[#e8fdf5] text-[#006c49] text-[11px] font-bold px-3 py-1 rounded-xl uppercase tracking-wide">
          {job.type}
        </span>
        <span className="bg-[#f1f5f9] text-[#64748b] text-[11px] font-bold px-3 py-1 rounded-xl uppercase tracking-wide">
          {job.duration}
        </span>
        <span className="bg-[#f1f5f9] text-[#64748b] text-[11px] font-bold px-3 py-1 rounded-xl uppercase tracking-wide">
          {job.workType}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-5">
        <Users size={14} className="text-[#94a3b8]" />
        <span className="text-[#94a3b8] text-xs font-medium">
          {job.positions} Posisi • {job.applicants} Pelamar
        </span>
      </div>
    </div>
  );
}