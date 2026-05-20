import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Building2, Users, GraduationCap, CheckCircle2,
  Share2, FileText, ChevronRight, X,
} from "lucide-react";
import { jobs } from "../../../data/jobs";
import { JobCard } from "../../../components/ui/JobCard";

export function DetailPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [showDesc, setShowDesc] = useState(false);
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === selectedId) ?? jobs[0];

  return (
    <div className="flex h-full overflow-hidden">

      {/* Left: Job list */}
      <div className="w-[380px] min-w-[380px] flex flex-col gap-5 overflow-y-auto p-5 pb-8 pr-3">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} active={selectedId === j.id} onClick={() => setSelectedId(j.id)} />
        ))}
      </div>

      {/* Right: Detail panel */}
      <div className="flex-1 overflow-y-auto p-5 pl-3">
        <div className="bg-white rounded-3xl shadow-sm border border-[rgba(226,232,240,0.4)] h-full">
          <div className="p-8 h-full overflow-y-auto">

            {/* Job header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-[90px] h-[90px] rounded-2xl overflow-hidden bg-[#f8f9fc] flex items-center justify-center border border-[rgba(226,232,240,0.3)] shrink-0">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>
                <div className="pt-2">
                  <h2 className="text-[#1a1c21] font-bold text-2xl leading-tight">{job.title}</h2>
                  <p className="text-black text-sm mt-1">{job.company}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin size={12} className="text-[#6a7282]" />
                    <span className="text-[#6a7282] text-xs">{job.location}</span>
                    <span className="text-[#6a7282] text-xs">•</span>
                    <Building2 size={12} className="text-[#6a7282]" />
                    <span className="text-[#6a7282] text-xs">{job.workType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Users size={12} className="text-[#94a3b8]" />
                    <span className="text-[#94a3b8] text-xs font-medium">
                      {job.positions} Posisi • {job.applicants} Pelamar
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 min-w-[160px]">
                <button
                  onClick={() => navigate("/daftar")}
                  className="bg-[#2f6bff] text-white text-sm font-bold py-3.5 px-6 rounded-[21px] hover:bg-[#2558e8] transition-colors shadow-[0px_8px_16px_-4px_rgba(47,107,255,0.3)] cursor-pointer"
                >
                  Daftar Sekarang
                </button>
                <button className="bg-white border border-[#e2e8f0] text-[#1a1c21] text-sm font-bold py-3.5 px-6 rounded-[21px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <Share2 size={14} /> Bagikan
                </button>
              </div>
            </div>

            {/* Tab */}
            <div className="border-b border-[rgba(226,232,240,0.3)] mb-6">
              <button className="text-[#3a60a0] text-sm font-bold pb-4 uppercase tracking-wide border-b-2 border-[#3a60a0] -mb-px cursor-pointer">
                DESKRIPSI LOWONGAN
              </button>
            </div>

            {/* Two columns */}
            <div className="flex gap-6">
              <div className="flex-1 min-w-0 space-y-6">

                {/* Pendidikan */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap size={18} className="text-[#2f6bff]" />
                    <h4 className="text-[#1a1c21] font-bold text-sm uppercase tracking-[0.7px]">JENJANG PENDIDIKAN</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.education.map((edu, i) => (
                      <span key={i} className={`px-5 py-2 rounded-2xl text-sm font-medium ${i === 0 ? "bg-[#eff6ff] text-[#2f6bff] font-semibold" : "bg-[#f1f5f9] text-[#64748b]"}`}>
                        {edu}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Kualifikasi */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 size={16} className="text-[#2f6bff]" />
                    <h4 className="text-[#1a1c21] font-bold text-sm uppercase tracking-[0.7px]">KUALIFIKASI &amp; DESKRIPSI</h4>
                  </div>
                  <div className="bg-[#f8fafc] rounded-3xl p-6 border border-[rgba(226,232,240,0.4)]">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2f6bff]" />
                      <span className="text-[#1a1c21] font-bold text-base">Kualifikasi Umum</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {job.qualifications.map((q, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[#2f6bff] shrink-0 mt-0.5" />
                          <span className="text-[#64748b] text-sm leading-snug">{q.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dokumen */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText size={16} className="text-[#2f6bff]" />
                    <h4 className="text-[#1a1c21] font-bold text-sm uppercase tracking-[0.7px]">PERSYARATAN DOKUMEN</h4>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {job.documents.map((doc, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5 bg-[#f8fafc] border border-[rgba(226,232,240,0.4)] rounded-2xl px-5 py-4 min-w-[90px]">
                        <doc.icon size={20} className="text-[#94a3b8]" />
                        <span className="text-[#64748b] text-xs text-center font-medium">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar detail */}
              <div className="w-[300px] min-w-[300px] space-y-5">
                {/* Garis waktu */}
                <div className="bg-[#f8fafc] rounded-3xl border border-[rgba(226,232,240,0.4)] p-6">
                  <p className="text-[#94a3b8] text-[11px] font-black uppercase tracking-[1.1px] mb-4">GARIS WAKTU</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#059669] mt-1 shrink-0" />
                      <div>
                        <p className="text-[#94a3b8] text-[10px] font-bold uppercase">DIBUKA</p>
                        <p className="text-[#1a1c21] font-bold text-sm">{job.openDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#dc2626] mt-1 shrink-0" />
                      <div>
                        <p className="text-[#94a3b8] text-[10px] font-bold uppercase">DEADLINE</p>
                        <p className="text-[#dc2626] font-bold text-sm">{job.closeDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tentang perusahaan */}
                <div className="bg-[#ffdbcd] rounded-3xl border border-[rgba(124,45,0,0.05)] px-6 py-5">
                  <p className="text-[rgba(124,45,0,0.6)] text-[11px] font-black uppercase tracking-[1.1px] mb-2">TENTANG PERUSAHAAN</p>
                  <p className="text-[#7c2d00] font-semibold text-sm leading-snug">{job.companyDesc}</p>
                </div>

                {/* Tanggung jawab */}
                <div>
                  <p className="text-[#1a1c21] font-bold text-sm mb-3">Tanggung Jawab Utama:</p>
                  <div className="bg-white border-l-4 border-[rgba(47,107,255,0.2)] pl-5 pr-4 py-2">
                    <p className="text-[#64748b] text-sm leading-relaxed">{job.responsibilities}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lihat deskripsi link */}
            <div className="mt-6">
              <button
                onClick={() => setShowDesc(true)}
                className="flex items-center gap-1.5 text-[#1d70c1] text-sm font-medium hover:underline cursor-pointer"
              >
                Lihat deskripsi pekerjaan lengkap <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description slide panel */}
      <AnimatePresence>
        {showDesc && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDesc(false)}
              className="flex-1 bg-black/30"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white w-[420px] h-full overflow-y-auto shadow-2xl"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-[#1a1c21] font-bold text-2xl">{job.title}</h2>
                    <p className="text-[#3563E9] font-medium text-sm mt-1">{job.company}</p>
                  </div>
                  <button onClick={() => setShowDesc(false)} className="text-[#94a3b8] hover:text-[#64748b] transition-colors mt-1 cursor-pointer">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-bold text-sm text-[#1a1c21] mb-3">Deskripsi Pekerjaan :</p>
                    <ul className="space-y-2">
                      {job.descriptions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#64748b] mt-1 shrink-0">•</span>
                          <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1a1c21] mb-3">Kualifikasi :</p>
                    <ul className="space-y-2">
                      {job.kualifikasi.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#64748b] mt-1 shrink-0">•</span>
                          <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}