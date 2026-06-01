import { MapPin, Clock } from "lucide-react";

export interface JobItem {
  id: number;
  title: string;
  company: string;
  city: string;
  type: string;
  deadline: string;
  desc: string;
  img: string;
}

export function JobCard({
  job,
  onApply,
  onDetail,
}: {
  job: JobItem;
  onApply: () => void;
  onDetail: () => void;
}) {
  return (
    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] shadow-sm p-6 flex flex-col">
      {/* Logo + badge row */}
      <div className="flex items-start justify-between mb-4">
        <div className="size-12 rounded-[10px] overflow-hidden bg-[#dbeafe] shrink-0">
          <img src={job.img} alt={job.company} className="size-full object-cover" />
        </div>
        <span className="text-[#0a0a0a] text-[12px] font-medium border border-[rgba(0,0,0,0.1)] rounded-lg px-2.5 py-0.5 shrink-0">
          {job.type}
        </span>
      </div>

      {/* Title + company */}
      <p className="text-[#0a0a0a] text-base font-medium leading-tight">{job.title}</p>
      <p className="text-[#717182] text-sm mt-1">{job.company}</p>

      {/* Description */}
      <p className="text-[#4a5565] text-[13px] mt-3 leading-[20px] flex-1">{job.desc}</p>

      {/* Location + deadline */}
      <div className="flex flex-col gap-1 mt-4">
        <span className="flex items-center gap-1.5 text-[#4a5565] text-sm">
          <MapPin size={14} className="shrink-0" />
          {job.city}
        </span>
        <span className="flex items-center gap-1.5 text-[#4a5565] text-sm">
          <Clock size={14} className="shrink-0" />
          Deadline: {job.deadline}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={onApply}
          className="flex-1 h-8 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Daftar
        </button>
        <button
          onClick={onDetail}
          className="flex-1 h-8 bg-white text-[#0a0a0a] border border-[#e2e8f0] text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          Detail
        </button>
      </div>
    </div>
  );
}
