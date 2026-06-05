import { useParams, useNavigate } from "react-router-dom";
import { useLowonganDetail, useLowongan } from "../../hooks/useLowongan";
import { useMyPendaftaran } from "../../hooks/usePendaftaran";
import { Building2, Loader2, Info } from "lucide-react";
import type { Lowongan } from "../../services/lowonganService";
import { usePendaftaranStore } from "../../stores/pendaftaranStore";

const svgPaths = {
  p45c1540: "M10.5 5.667c0 1.013-.821 1.833-1.833 1.833a1.834 1.834 0 0 1-1.834-1.833c0-1.013.821-1.834 1.834-1.834 1.012 0 1.833.821 1.833 1.834Zm-5.5 0c0 1.013-.821 1.833-1.833 1.833A1.834 1.834 0 0 1 1.333 5.667c0-1.013.821-1.834 1.834-1.834C4.179 3.833 5 4.654 5 5.667Zm9.167 0c0 1.013-.821 1.833-1.834 1.833a1.834 1.834 0 0 1-1.833-1.833c0-1.013.821-1.834 1.833-1.834 1.013 0 1.834.821 1.834 1.834ZM8.667 9.333c1.287 0 2.333.596 2.333 1.334V12H6V10.667c0-.738 1.046-1.334 2.333-1.334h.334Zm-5.5 0c1.287 0 2.333.596 2.333 1.334V12H.333v-1.333c0-.738 1.046-1.334 2.334-1.334Zm8.166 0c1.288 0 2.334.596 2.334 1.334V12h-5.167v-1.333c0-.738 1.046-1.334 2.333-1.334Z",
  p18d8d580: "M6.7 12.8c0 .184-.597.37-1.491.37-.895 0-1.492-.186-1.492-.37 0-.185.597-.37 1.492-.37.894 0 1.491.185 1.491.37Z",
  p31d7f480: "M9.683 5.217c0 1.842-1.492 4.8-4.475 4.8-2.982 0-4.475-2.958-4.475-4.8a4.475 4.475 0 0 1 8.95 0Z M6.7 5.217a1.492 1.492 0 1 1-2.983 0 1.492 1.492 0 0 1 2.983 0Z",
  p2f85c800: "M11.308 3.231H9.692V2.154a1.615 1.615 0 0 0-1.615-1.616H5.846a1.615 1.615 0 0 0-1.615 1.616v1.077H2.615A2.078 2.078 0 0 0 .538 5.308v5.923a2.078 2.078 0 0 0 2.077 2.077h8.693a2.078 2.078 0 0 0 2.077-2.077V5.308a2.078 2.078 0 0 0-2.077-2.077ZM5.308 2.154a.538.538 0 0 1 .538-.538h2.23a.538.538 0 0 1 .539.538v1.077H5.308V2.154Zm7.23 9.077a1 1 0 0 1-1 1H2.616a1 1 0 0 1-1-1V5.308a1 1 0 0 1 1-1h8.692a1 1 0 0 1 1 1v5.923Z",
  p15d8a000: "M9.167 0L0 3.75l9.167 3.75 7.5-3.066v5.316h1.666V4.484L9.167 0zm0 8.867l-6.25-2.55v3.7c0 1.383 2.8 2.5 6.25 2.5s6.25-1.117 6.25-2.5v-3.7l-6.25 2.55z",
  p114afb00: "M13.333 1.667h-2.5A1.667 1.667 0 0 0 9.167 0h-3.334a1.667 1.667 0 0 0-1.666 1.667h-2.5A1.667 1.667 0 0 0 0 3.333v11.667A1.667 1.667 0 0 0 1.667 16.667h11.666A1.667 1.667 0 0 0 15 15V3.333a1.667 1.667 0 0 0-1.667-1.666ZM5 1.667a.833.833 0 0 1 .833-.834h3.334a.833.833 0 0 1 .833.834v.833H5v-.833Zm8.333 13.333H1.667V3.333h1.666v1.667h8.334V3.333h1.666V15Z",
  p363cf400: "M6.667 0a6.667 6.667 0 1 0 0 13.333A6.667 6.667 0 0 0 6.667 0Zm3.138 5.138L6.472 8.471a.667.667 0 0 1-.943 0L3.862 6.805a.667.667 0 1 1 .943-.943L6 7.057l2.862-2.862a.667.667 0 1 1 .943.943Z",
  p6200b00: "M15.417 2.917L12.5.417A1.417 1.417 0 0 0 11.5 0h-10A1.417 1.417 0 0 0 .083 1.417v10.416a1.417 1.417 0 0 0 1.417 1.417h14.583a1.417 1.417 0 0 0 1.417-1.417V3.917a1.417 1.417 0 0 0-.417-1L15.417 2.917ZM11.5 1.417l1.417 1.416H11.5V1.417Zm3.333 10.416H1.5V1.417h8.833v2.5a.708.708 0 0 0 .708.708h3.792v7.208Z",
  pc679c40: "M14 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-1 17H3V3h10v14ZM5 5h6v2H5V5Zm0 4h6v2H5V9Zm0 4h4v2H5v-2Z",
  pb257040: "M20 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 16H2V2h18v14ZM4 4h14v2H4V4Zm0 4h14v2H4V8Zm0 4h10v2H4v-2Z",
  p207ea900: "M18 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 18H2V2h16v16ZM7 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm5-6h6v2h-6V6Zm0 4h6v2h-6v-2Z",
  p12918080: "M16 0H2C.9 0 .01.9.01 2L0 14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 4l-7 4.5L2 4V2l7 4.5L16 2v2Z",
  p2a676800: "M11.25 10.313c-.469 0-.891.156-1.266.422L4.828 7.547a2.109 2.109 0 0 0 0-.844l5.156-3.188c.375.266.797.422 1.266.422a2.063 2.063 0 1 0-2.063-2.062c0 .14.016.282.047.422L3.891 5.5A2.063 2.063 0 1 0 2.25 9.375c.469 0 .891-.156 1.266-.422l5.156 3.188a2.109 2.109 0 0 0-.047.422 2.063 2.063 0 1 0 2.625-1.969v-.281Z",
};

interface Props {
  onBack: () => void;
  onApply: () => void;
}

function UsersIcon() {
  return (
    <svg className="h-[10.286px] w-[14.144px] shrink-0" fill="none" viewBox="0 0 14.6667 10.6667">
      <path d={svgPaths.p45c1540} fill="#94A3B8" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="absolute left-[1.33px] top-[3.33px] size-[13.333px] shrink-0" fill="none" viewBox="0 0 13.3333 13.3333">
      <path d={svgPaths.p363cf400} fill="#2F6BFF" />
    </svg>
  );
}

export function DetailLowonganPage({ onBack, onApply }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setLowongan = usePendaftaranStore((state) => state.setLowongan);
  
  // Fetch specific job detail
  const { data: detailResponse, isLoading: isLoadingDetail, isError: isErrorDetail } = useLowonganDetail(id || "");
  const job = detailResponse?.data;

  // Fetch list for the sidebar
  const { data: listResponse, isLoading: isLoadingList } = useLowongan();

  // Fetch student applications
  const { data: myApplications } = useMyPendaftaran();
  const appliedJobIds = (myApplications?.data || []).map((app: any) => app.id_lowongan);
  const isAlreadyApplied = job ? appliedJobIds.includes(job.id_lowongan) : false;
  
  // Defensive check for paginated response
  const rawData = listResponse as any;
  const sidebarJobs: Lowongan[] = Array.isArray(rawData?.data) 
    ? rawData.data 
    : (Array.isArray(rawData?.data?.data) ? rawData.data.data : []);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysLeft = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const deadline = new Date(dateStr);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (isLoadingDetail || isLoadingList) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-[#3a60a0]" />
        <p className="mt-4 text-gray-500 font-medium">Memuat informasi lowongan...</p>
      </div>
    );
  }

  if (isErrorDetail || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <Info className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Lowongan Tidak Ditemukan</h2>
        <p className="text-gray-500 mt-2 max-w-md">Maaf, informasi lowongan yang Anda cari tidak tersedia.</p>
        <button onClick={onBack} className="mt-8 px-8 py-3 bg-[#3a60a0] text-white rounded-2xl font-bold">
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-[#f3f4f6] min-h-full">
      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row h-full">

        {/* ── Column A: Job Cards List (Hidden on Mobile) ── */}
        <div className="hidden lg:flex w-[412px] shrink-0 relative py-6 pl-[35px] pr-2 flex-col gap-0">
          {sidebarJobs.map((item) => {
            const daysLeft = getDaysLeft(item.batas_lamaran);
            const isActive = String(item.id_lowongan) === id;
            const isApplied = appliedJobIds.includes(item.id_lowongan);
            
            return (
              <div 
                key={item.id_lowongan}
                onClick={() => navigate(`/mahasiswa/lowongan/${item.id_lowongan}`)}
                className={`bg-white rounded-[23px] p-7 mb-[18px] relative cursor-pointer transition-all ${
                  isActive 
                    ? "border-[#3a60a0] border-2 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.02),0px_10px_15px_-3px_rgba(0,0,0,0.03)]" 
                    : "border border-[#e2e8f0] drop-shadow-[0px_0.964px_0.964px_rgba(0,0,0,0.05)] hover:border-blue-200"
                }`}
              >
                {/* Logo + deadline */}
                <div className="flex items-start justify-between mb-5">
                  <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-[15px] size-[54px] flex items-center justify-center shrink-0">
                    {item.logo_perusahaan ? (
                      <img alt={item.nama_perusahaan} className="size-[40px] object-cover rounded-[7px]" src={item.logo_perusahaan} />
                    ) : (
                      <Building2 className="text-blue-500 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isApplied && (
                      <span className="bg-green-50 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase text-center">Sudah Terdaftar</span>
                    )}
                    {daysLeft !== null && (
                      <div className={`${daysLeft <= 3 ? "bg-[rgba(254,226,226,0.5)]" : "bg-[#f1f5f9]"} h-[24px] px-3 rounded-full flex items-center`}>
                        <span className={`font-['Poppins:Bold',sans-serif] text-[10.6px] ${daysLeft <= 3 ? "text-[#dc2626]" : "text-[#64748b]"} tracking-[-0.27px] whitespace-nowrap uppercase`}>
                          {daysLeft === 0 ? "TUTUP HARI INI" : daysLeft === 1 ? "TUTUP BESOK" : `${daysLeft} HARI LAGI`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="font-['Poppins:SemiBold',sans-serif] text-[17.4px] text-[#1a1c21] leading-[27px] mb-1 truncate">{item.judul}</p>
                <p className="font-['Poppins:Medium',sans-serif] text-[13.5px] text-[#64748b] leading-[19px] mb-4 truncate">{item.lokasi}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#e8fdf5] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#006c49] tracking-[0.53px] uppercase whitespace-nowrap">MAGANG</span>
                  <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">{item.durasi}</span>
                  <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">{item.penempatan}</span>
                </div>

                <div className="flex items-center gap-2">
                  <UsersIcon />
                  <span className="font-['Poppins:Medium',sans-serif] text-[11.6px] text-[#94a3b8] leading-[15px]">{item.kuota} Posisi Tersedia</span>
                </div>
              </div>
            );
          })}

          {/* Kembali button */}
          <button
            onClick={onBack}
            className="mt-6 flex items-center gap-2 h-10 w-[138px] rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] hover:bg-slate-200 transition-colors px-4"
          >
            <svg className="size-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#3A60A0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19L5 12L12 5" />
              <path d="M19 12H5" />
            </svg>
            <span className="font-['Poppins:SemiBold',sans-serif] text-[16px] leading-[19px]">Kembali</span>
          </button>
        </div>

        {/* ── Column B: Job Detail Panel ── */}
        <div className="flex-1 py-4 lg:py-6 px-4 lg:pr-[36px] lg:pl-2">
          <div className="bg-white border border-[rgba(226,232,240,0.4)] rounded-[24px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.02),0px_10px_15px_-3px_rgba(0,0,0,0.03),0px_20px_25px_-5px_rgba(0,0,0,0.01)] overflow-hidden h-full flex flex-col">

            {/* Panel header (fixed, not scrolling) */}
            <div className="relative flex flex-col md:flex-row items-start px-6 lg:px-[37px] pt-[29px] pb-6 shrink-0 gap-6">
              {/* Company logo + title info wrapper */}
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-lg size-16 md:size-[90px] flex items-center justify-center shrink-0 overflow-hidden">
                  {job.logo_perusahaan ? (
                    <img alt={job.nama_perusahaan} className="size-full object-cover" src={job.logo_perusahaan} />
                  ) : (
                    <Building2 className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <h1 className="font-['Poppins:Bold',sans-serif] text-xl md:text-[24px] text-[#1a1c21] leading-tight">{job.judul}</h1>
                  <p className="font-['Poppins:Regular',sans-serif] text-sm text-slate-800 leading-tight mt-1">{job.nama_perusahaan}</p>

                  {/* Location + work type */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-[13.4px] h-[13.6px] shrink-0" fill="none" viewBox="0 0 13.3928 13.6087">
                        <path d={svgPaths.p18d8d580} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.74" />
                        <path d={svgPaths.p31d7f480} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.74" />
                      </svg>
                      <span className="font-['Poppins:Regular',sans-serif] text-[10px] md:text-[9px] text-[#6a7282]">{job.lokasi}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="size-[13px] shrink-0" fill="none" viewBox="0 0 12.9231 12.9231">
                        <g clipPath="url(#clip-work)">
                          <path d={svgPaths.p2f85c800} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08" />
                        </g>
                        <defs><clipPath id="clip-work"><rect width="12.9231" height="12.9231" fill="white" /></clipPath></defs>
                      </svg>
                      <span className="font-['Poppins:Regular',sans-serif] text-[10px] md:text-[8.9px] text-[#6a7282]">{job.penempatan}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <svg className="w-[14.7px] h-[10.7px] shrink-0" fill="none" viewBox="0 0 14.6667 10.6667">
                      <path d={svgPaths.p45c1540} fill="#94A3B8" />
                    </svg>
                    <span className="font-['Poppins:Medium',sans-serif] text-[11px] md:text-[12px] text-[#94a3b8] leading-[16px]">{job.kuota} Posisi Tersedia</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-row md:flex-col gap-3 w-full md:w-[170px] pt-0 md:pt-2">
                <button
                  disabled={isAlreadyApplied}
                  onClick={() => {
                    setLowongan(job.id_lowongan, job);
                    onApply();
                  }}
                  className={`flex-1 rounded-xl md:rounded-[21px] py-3 md:py-[14px] flex items-center justify-center transition-all ${
                    isAlreadyApplied 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                      : "bg-[#2f6bff] text-white hover:bg-blue-700 shadow-blue-100"
                  }`}
                >
                  <span className="font-['Poppins:Bold',sans-serif] text-[12px] md:text-[12.3px] leading-[18px]">
                    {isAlreadyApplied ? "Sudah Terdaftar" : "Daftar Sekarang"}
                  </span>
                </button>
                <button className="flex-1 md:flex-none bg-white border border-[#e2e8f0] rounded-xl md:rounded-[21px] py-3 md:py-[15px] flex items-center justify-center gap-2">
                  <svg className="size-3.5 md:w-[12px] md:h-[13.2px]" fill="none" viewBox="0 0 13.5 15">
                    <path d={svgPaths.p2a676800} fill="#1A1C21" />
                  </svg>
                  <span className="font-['Poppins:Bold',sans-serif] text-[12px] md:text-[12.3px] text-[#1a1c21] leading-[18px]">Bagikan</span>
                </button>
                <button 
                  onClick={onBack}
                  className="lg:hidden flex items-center justify-center size-12 bg-gray-100 rounded-xl border border-gray-200"
                >
                   <svg className="size-6 text-[#3a60a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 lg:px-[37px] pb-6">

              {/* Tab: DESKRIPSI LOWONGAN */}
              <div className="border-b border-[rgba(226,232,240,0.3)] pb-px mb-6">
                <div className="inline-block pb-3 border-b-2 border-[#3a60a0]">
                  <span className="font-['Poppins:Bold',sans-serif] text-sm text-[#3a60a0] leading-[20px]">DESKRIPSI LOWONGAN</span>
                </div>
              </div>

              {/* Layout wrapper */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">

                {/* Main content */}
                <div className="flex-1 min-w-0 order-2 lg:order-1">

                  {/* JENJANG PENDIDIKAN */}
                  <section className="mb-8">
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-[18.3px] h-[15px] shrink-0" fill="none" viewBox="0 0 18.3333 15">
                        <path d={svgPaths.p15d8a000} fill="#2F6BFF" />
                      </svg>
                      <span className="font-bold text-[14px] text-[#1a1c21] tracking-[0.7px] uppercase leading-[20px]">JENJANG PENDIDIKAN</span>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <span className="bg-[#eff6ff] px-4 md:px-5 py-2 rounded-[16px] font-['Poppins:SemiBold',sans-serif] text-xs md:text-[14px] text-[#2f6bff] leading-[20px]">S1 / D4 / D3</span>
                      <span className="bg-[#f1f5f9] px-4 md:px-5 py-2 rounded-[16px] font-['Poppins:Medium',sans-serif] text-xs md:text-[14px] text-[#64748b] leading-[20px]">Teknologi Informasi</span>
                      <span className="bg-[#f1f5f9] px-4 md:px-5 py-2 rounded-[16px] font-['Poppins:Medium',sans-serif] text-xs md:text-[14px] text-[#64748b] leading-[20px]">Teknik Informatika</span>
                      <span className="bg-[#f1f5f9] px-4 md:px-5 py-2 rounded-[16px] font-['Poppins:Medium',sans-serif] text-xs md:text-[14px] text-[#64748b] leading-[20px]">Sistem Informasi</span>
                    </div>
                  </section>

                  {/* KUALIFIKASI & DESKRIPSI */}
                  <section className="mb-8">
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-[15px] h-[16.7px] shrink-0" fill="none" viewBox="0 0 15 16.6667">
                        <path d={svgPaths.p114afb00} fill="#2F6BFF" />
                      </svg>
                      <span className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] tracking-[0.7px] uppercase leading-[20px]">KUALIFIKASI &amp; DESKRIPSI</span>
                    </div>

                    {/* Kualifikasi Umum box */}
                    <div className="bg-[#f8fafc] border border-[rgba(226,232,240,0.4)] rounded-[24px] p-5 md:p-[25px]">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#2f6bff] size-[6px] rounded-full shrink-0" />
                        <span className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#1a1c21] leading-[24px]">Kualifikasi & Persyaratan</span>
                      </div>

                      <div className="text-sm md:text-[14px] text-[#64748b] leading-[22px] whitespace-pre-wrap italic">
                        {job.kualifikasi || "Kualifikasi detail untuk posisi ini dapat Anda baca pada deskripsi di bawah."}
                      </div>
                    </div>

                    {/* Skills section integration */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* PERSYARATAN DOKUMEN */}
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-[17.9px] h-[13.3px] shrink-0" fill="none" viewBox="0 0 17.9167 13.3333">
                        <path d={svgPaths.p6200b00} fill="#2F6BFF" />
                      </svg>
                      <span className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] tracking-[0.7px] uppercase leading-[20px]">PERSYARATAN DOKUMEN</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                      {[
                        { icon: svgPaths.pc679c40, viewBox: "0 0 16 20", cls: "w-4 h-5", label: ["Curriculum", "Vitae / CV"] },
                        { icon: svgPaths.pb257040, viewBox: "0 0 22 18", cls: "w-[22px] h-[18px]", label: ["Transkrip", "Nilai"] },
                        { icon: svgPaths.p207ea900, viewBox: "0 0 20 20", cls: "w-5 h-5", label: ["Identitas", "Diri"] },
                        { icon: svgPaths.p12918080, viewBox: "0 0 18 18", cls: "w-[18px] h-[18px]", label: ["Surat", "Pengantar"] },
                      ].map((doc, i) => (
                        <div key={i} className="border border-[#e2e8f0] h-[90px] md:h-[102px] rounded-[24px] flex items-center px-4 gap-3 bg-white">
                          <div className="bg-[rgba(47,107,255,0.05)] h-8 md:h-10 w-8 md:w-10 rounded-[12px] md:rounded-[16px] flex items-center justify-center shrink-0">
                            <svg className={doc.cls} fill="none" viewBox={doc.viewBox}>
                              <path d={doc.icon} fill="#2F6BFF" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            {doc.label.map((l, j) => (
                              <p key={j} className="font-['Poppins:SemiBold',sans-serif] text-[11px] md:text-[13px] text-[#1a1c21] leading-tight truncate">{l}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right sidebar */}
                <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-5 order-1 lg:order-2">

                  {/* Garis Waktu */}
                  <div className="bg-[#f8fafc] border border-[rgba(226,232,240,0.4)] rounded-[24px] p-[20px]">
                    <p className="font-['Poppins:Black',sans-serif] text-[11px] text-[#94a3b8] tracking-[1.1px] uppercase leading-[16.5px] mb-4">GARIS WAKTU</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#059669] size-2 rounded-full mt-[6px] shrink-0" />
                        <div>
                          <p className="font-['Poppins:Bold',sans-serif] text-[10px] text-[#94a3b8] uppercase leading-[15px]">MULAI MAGANG</p>
                          <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] leading-[20px]">{formatDate(job.mulai_magang)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-[#dc2626] size-2 rounded-full mt-[6px] shrink-0" />
                        <div>
                          <p className="font-['Poppins:Bold',sans-serif] text-[10px] text-[#94a3b8] uppercase leading-[15px]">DEADLINE</p>
                          <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#dc2626] leading-[20px]">{formatDate(job.batas_lamaran)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tentang Perusahaan */}
                  <div className="bg-[#ffdbcd] border border-[rgba(124,45,0,0.05)] rounded-[24px] p-[20px]">
                    <p className="font-['Poppins:Black',sans-serif] text-[11px] text-[rgba(124,45,0,0.6)] tracking-[1.1px] uppercase leading-[16.5px] mb-2">TENTANG Perusahaan</p>
                    <p className="font-['Poppins:SemiBold',sans-serif] text-sm text-[#7c2d00] leading-relaxed">
                      {job.nama_perusahaan} {job.tentang_perusahaan ? `- ${job.tentang_perusahaan}` : "adalah mitra terpercaya dalam program magang kami."}
                    </p>
                  </div>

                  {/* Tanggung Jawab Utama */}
                  <div>
                    <p className="font-['Poppins:Bold',sans-serif] text-sm text-[#1a1c21] leading-[22.75px] mb-2">Deskripsi & Benefit:</p>
                    <div className="bg-white border-l-4 border-[rgba(47,107,255,0.2)] pl-5 pr-4 pt-1.5 pb-4">
                      <p className="font-['Poppins:Medium',sans-serif] text-sm text-[#64748b] leading-relaxed whitespace-pre-wrap">
                        {job.deskripsi_pekerjaan || job.deskripsi_singkat}
                        {"\n\n"}
                        {job.benefit && (
                          <span className="text-green-700 font-bold block mt-2 underline">Benefit:</span>
                        )}
                        {job.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
