import { CheckCircle, MapPin, Clock, Building2, ChevronRight } from "lucide-react";
import imgLogo1 from "../../assets/images/company-1.png";
import imgLogo2 from "../../assets/images/company-2.png";
import imgLogo3 from "../../assets/images/company-3.png";

const lowongan = [
  { title: "Frontend Developer", company: "PT Teknologi Maju",  city: "Jakarta", deadline: "30 Maret 2026", img: imgLogo1, bg: null },
  { title: "UI/UX Designer",     company: "PT Digital Kreatif", city: "Bandung", deadline: "5 April 2026",  img: imgLogo2, bg: null },
  { title: "Backend Developer",  company: "PT Inovasi Sistem",  city: "Malang",  deadline: "15 April 2026", img: imgLogo3, bg: "#dbeafe" },
];

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="p-6 space-y-5">
      {/* Welcome */}
      <div>
        <h1 className="text-[#3a60a0] text-3xl font-bold leading-tight">Selamat Datang, Zaidan Fahry!</h1>
        <p className="text-[#3a60a0] text-base mt-1">Kelola magang anda dengan mudah dan efisien</p>
      </div>

      {/* Progress Magang */}
      <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm px-6 py-6 space-y-3">
        <div>
          <p className="text-[#3a60a0] text-lg font-medium">Progress Magang</p>
          <p className="text-[#3a60a0] text-sm">Status perkembangan magang Anda</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#3a60a0] font-medium">Sedang Berjalan</span>
          <span className="text-[#155dfc] font-bold text-base">50%</span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-[rgba(3,2,19,0.1)] rounded-full h-[11px] overflow-hidden">
          <div className="bg-[#bdd8e9] h-full rounded-full" style={{ width: "50%" }} />
        </div>
        <div className="flex items-center gap-1.5 text-[#3a60a0] text-xs">
          <svg viewBox="0 0 13 13" fill="none" className="size-3.5 shrink-0">
            <path d="M4.33 1.08V3.25M8.66 1.08V3.25" stroke="#3A60A0" strokeWidth="0.76" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="1.625" y="2.167" width="9.75" height="9.75" rx="1.083" stroke="#3A60A0" strokeWidth="0.76" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.625 5.417H11.375" stroke="#3A60A0" strokeWidth="0.76" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>15 hari tersisa dari 30 hari total</span>
        </div>
      </div>

      {/* Three info cards */}
      <div className="grid grid-cols-3 gap-4">
        {/* Status Pendaftaran */}
        <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm px-7 py-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={22} className="text-[#00C950] shrink-0" />
            <span className="text-[#0a0a0a] text-lg font-medium">Status Pendaftaran</span>
          </div>
          <span className="inline-block bg-[#dcfce7] text-[#016630] text-xs font-medium px-3 py-1 rounded-lg">
            Validasi Admin Selesai
          </span>
          <div className="text-[#4a5565] text-sm space-y-0.5">
            <p>Selamat!</p>
            <p>Berkas Anda lolos verifikasi</p>
          </div>
          <div className="flex items-center gap-1.5 text-[#4a5565] text-sm font-semibold">
            <Building2 size={15} className="shrink-0" />
            PT Telkom Indonesia (Persero)
          </div>
        </div>

        {/* Pengingat Logbook */}
        <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm px-7 py-6 flex flex-col gap-7">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 22 22" fill="none" className="size-[22px] shrink-0">
              <circle cx="10.67" cy="10.67" r="8.89" stroke="#FF6900" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.67 5.33V10.67L14.22 12.44" stroke="#FF6900" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#0a0a0a] text-lg font-medium">Pengingat Logbook</span>
          </div>
          <div>
            <p className="text-[#0a0a0a] text-sm font-medium">Terakhir diisi:</p>
            <p className="text-[#4a5565] text-xs mt-0.5">24 Maret 2026</p>
          </div>
          <button
            onClick={() => onNavigate("logbook")}
            className="w-full border border-[rgba(0,0,0,0.3)] rounded-lg py-1.5 text-[#0a0a0a] text-sm font-medium text-center hover:bg-slate-50 transition-colors"
          >
            Isi Logbook Hari Ini
          </button>
        </div>

        {/* Notifikasi Terbaru */}
        <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm px-6 py-6 space-y-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 18 20" fill="none" className="size-[18px] shrink-0">
              <path d="M7.05 17.47C7.2 17.74 7.43 17.97 7.7 18.12C7.97 18.28 8.27 18.36 8.58 18.36C8.9 18.36 9.2 18.28 9.47 18.12C9.74 17.97 9.97 17.74 10.12 17.47" stroke="#2B7FFF" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M0.82 12.43C1.99 11.21 3.25 9.92 3.25 5.92C3.25 4.5 3.81 3.15 4.81 2.15C5.81 1.15 7.17 0.58 8.58 0.58C10 0.58 11.35 1.15 12.35 2.15C13.36 3.15 13.92 4.5 13.92 5.92C13.92 9.92 15.17 11.21 16.35 12.43C16.47 12.56 16.54 12.72 16.57 12.89C16.6 13.06 16.58 13.23 16.51 13.39C16.44 13.55 16.32 13.68 16.18 13.77C16.04 13.87 15.87 13.92 15.69 13.92H1.47C1.3 13.92 1.13 13.87 0.99 13.77C0.84 13.68 0.73 13.55 0.66 13.39C0.59 13.23 0.57 13.06 0.6 12.89C0.62 12.72 0.7 12.56 0.82 12.43Z" stroke="#2B7FFF" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#0a0a0a] text-lg font-medium">Notifikasi Terbaru</span>
          </div>
          <div className="bg-[#eff6ff] rounded-lg px-3 py-2">
            <p className="text-[#0a0a0a] text-xs font-medium">Komentar Baru dari Dosen</p>
            <p className="text-[#4a5565] text-[11px] mt-0.5">2 jam yang lalu</p>
          </div>
          <div className="bg-[#f1f2f4] rounded-lg px-3 py-2">
            <p className="text-[#0a0a0a] text-xs font-medium">Lowongan Baru Tersedia</p>
            <p className="text-[#4a5565] text-[11px] mt-0.5">1 hari yang lalu</p>
          </div>
        </div>
      </div>

      {/* Lowongan Magang Terbaru */}
      <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#3a60a0] text-lg font-semibold">Lowongan Magang Terbaru</p>
            <p className="text-[#3a60a0] text-sm">3 lowongan terbaru yang mungkin menarik untuk Anda</p>
          </div>
          <button
            onClick={() => onNavigate("lowongan")}
            className="flex items-center gap-1 border border-[rgba(0,0,0,0.2)] rounded-lg px-3 py-1.5 text-[#0a0a0a] text-sm hover:bg-slate-50 transition-colors shrink-0"
          >
            Lihat Semua
            <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {lowongan.map((job) => (
            <div
              key={job.title}
              className="flex items-center gap-3 border border-[rgba(0,0,0,0.15)] rounded-lg px-4 py-3"
            >
              {job.bg ? (
                <div
                  className="size-[42px] rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ background: job.bg }}
                >
                  <img src={job.img} alt={job.company} className="size-full object-cover" />
                </div>
              ) : (
                <img src={job.img} alt={job.company} className="size-[44px] object-cover shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-[#0a0a0a] font-semibold text-sm leading-tight">{job.title}</p>
                <p className="text-[#4a5565] text-xs mt-0.5">{job.company}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[#6a7282] text-xs">
                    <MapPin size={10} />
                    {job.city}
                  </span>
                  <span className="flex items-center gap-1 text-[#6a7282] text-xs">
                    <Clock size={10} />
                    Deadline: {job.deadline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
