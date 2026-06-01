import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ChevronLeft, Share2, Users, ExternalLink } from "lucide-react";
import { jobs } from "../../tampilanAwalData";

const companyInfo: Record<string, { category: string; desc: string; size: string; website: string }> = {
  "PT Teknologi Maju": { category: "Teknologi, Informasi & Internet", desc: "PT Teknologi Maju adalah perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk berbagai industri di Indonesia.", size: "50-100 Karyawan", website: "https://teknologimaju.co.id" },
  "CV Digital Nusantara": { category: "Teknologi & Startup", desc: "CV Digital Nusantara adalah startup teknologi yang membangun solusi backend scalable untuk bisnis modern.", size: "10-50 Karyawan", website: "https://digitalnusantara.co.id" },
  "PT Analitika Indonesia": { category: "Data & Analytics", desc: "PT Analitika Indonesia berfokus pada analitik data untuk membantu perusahaan dalam pengambilan keputusan berbasis data.", size: "50-200 Karyawan", website: "https://analitikaindonesia.co.id" },
  "Studio Kreatif Nusa": { category: "Kreatif & Desain", desc: "Studio Kreatif Nusa adalah studio desain kreatif yang menghasilkan karya visual berkualitas tinggi untuk brand-brand terkemuka.", size: "10-30 Karyawan", website: "https://studiokreatifnusa.co.id" },
  "PT Media Online": { category: "Media & Komunikasi", desc: "PT Media Online adalah perusahaan media digital yang menghasilkan konten berkualitas untuk jutaan pembaca.", size: "100-500 Karyawan", website: "https://mediaonline.co.id" },
  "Startup Inovasi Digital": { category: "Startup & Mobile", desc: "Startup Inovasi Digital membangun aplikasi mobile inovatif yang memudahkan kehidupan sehari-hari masyarakat Indonesia.", size: "10-50 Karyawan", website: "https://inovasidigital.co.id" },
  "PT Infrastruktur Maju": { category: "Infrastruktur & Jaringan", desc: "PT Infrastruktur Maju menyediakan layanan infrastruktur IT dan jaringan untuk perusahaan-perusahaan di Indonesia.", size: "50-200 Karyawan", website: "https://infrastrukturmaju.co.id" },
  "PT Keamanan Siber": { category: "Keamanan Siber", desc: "PT Keamanan Siber adalah perusahaan keamanan informasi yang melindungi aset digital perusahaan dari ancaman siber.", size: "30-100 Karyawan", website: "https://keamanansiber.co.id" },
  "Cloud Indonesia Tech": { category: "Cloud Computing", desc: "Cloud Indonesia Tech menyediakan solusi cloud computing yang handal dan scalable untuk kebutuhan bisnis modern.", size: "50-150 Karyawan", website: "https://cloudindonesia.co.id" },
};

export function DetailLowongan() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === Number(id)) ?? jobs[0];
  const company = companyInfo[job.company] ?? { category: "Teknologi", desc: "Perusahaan mitra terpercaya.", size: "50-100 Karyawan", website: "#" };

  const infoRows = [
    { label: "Tipe Pekerjaan", value: job.type === "FULL TIME" ? "Full Time" : "Part Time", red: false },
    { label: "Durasi", value: job.duration, red: false },
    { label: "Lokasi", value: job.location, red: false },
    { label: "Penempatan", value: job.penempatan, red: false },
    { label: "Batas Lamaran", value: job.deadline, red: true },
    { label: "Mulai Magang", value: job.mulaiMagang, red: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1100px] mx-auto w-full px-6 py-8">
        {/* Breadcrumb */}
        <Link to="/lowongan" className="flex items-center gap-2 text-[#3a60a0] text-[14px] font-['Poppins',sans-serif] mb-6 hover:underline w-fit">
          <ChevronLeft size={16} />
          Kembali ke Lowongan
        </Link>

        {/* Top Card */}
        <div className="bg-white rounded-[16px] border border-black/10 p-7 mb-6">
          <div className="flex items-start justify-between gap-6">
            {/* Left: logo + info */}
            <div className="flex items-start gap-5 flex-1">
              <div className="size-[80px] rounded-[14px] bg-[#dce1ff] flex items-center justify-center shrink-0">
                <span className="font-['Poppins',sans-serif] font-bold text-[#2563ff] text-[28px]">{job.company.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <span className="bg-[#eff6ff] text-[#0f5bff] text-[11px] font-semibold font-['Poppins',sans-serif] uppercase px-3 py-1 rounded-full">{job.type}</span>
                <h1 className="font-['Poppins',sans-serif] font-bold text-[28px] text-black mt-2 mb-1">{job.title}</h1>
                <p className="font-['Poppins',sans-serif] font-medium text-[15px] text-[#334155] mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-[#64748b] text-[13px] font-['Poppins',sans-serif] mb-4">
                  <div className="flex items-center gap-1.5"><MapPin size={14} /><span>{job.location}</span></div>
                  <div className="flex items-center gap-1.5"><Clock size={14} /><span>{job.duration}</span></div>
                </div>
                <p className="font-['Poppins',sans-serif] text-[14px] text-[#4a5565] leading-[22px] mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="bg-[#f1f5f9] text-[#475569] text-[11px] font-['Poppins',sans-serif] px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: share + posted */}
            <div className="flex flex-col items-end gap-3 shrink-0">
              <button className="flex items-center gap-2 border border-[#e2e8f0] text-[#334155] font-['Poppins',sans-serif] font-medium text-[13px] px-4 py-2 rounded-[8px] hover:bg-[#f8fafc] transition-colors">
                <Share2 size={15} />
                Bagikan Lowongan
              </button>
              <p className="font-['Poppins',sans-serif] text-[12px] text-[#64748b] flex items-center gap-1">
                <Clock size={13} />
                Diposting 2 hari yang lalu
              </p>
            </div>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main content */}
          <div className="col-span-2 flex flex-col gap-5">
            {/* Deskripsi Pekerjaan */}
            <div className="bg-white rounded-[16px] border border-black/10 p-7">
              <h2 className="font-['Poppins',sans-serif] font-bold text-[18px] text-black mb-4">Deskripsi Pekerjaan</h2>
              <p className="font-['Poppins',sans-serif] text-[14px] text-[#4a5565] leading-[22px] mb-4">
                Sebagai {job.title} Intern, kamu akan terlibat langsung dalam pengembangan fitur pada aplikasi web perusahaan. Kamu akan bekerja sama dengan tim untuk memastikan pengalaman pengguna yang optimal.
              </p>
              <ul className="flex flex-col gap-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 font-['Poppins',sans-serif] text-[14px] text-[#4a5565]">
                    <span className="shrink-0 mt-1">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kualifikasi */}
            <div className="bg-white rounded-[16px] border border-black/10 p-7">
              <h2 className="font-['Poppins',sans-serif] font-bold text-[18px] text-black mb-4">Kualifikasi</h2>
              <ul className="flex flex-col gap-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 font-['Poppins',sans-serif] text-[14px] text-[#4a5565]">
                    <span className="shrink-0 mt-1">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefit */}
            <div className="bg-white rounded-[16px] border border-black/10 p-7">
              <h2 className="font-['Poppins',sans-serif] font-bold text-[18px] text-black mb-4">Benefit</h2>
              <ul className="flex flex-col gap-2">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 font-['Poppins',sans-serif] text-[14px] text-[#4a5565]">
                    <span className="shrink-0 mt-1">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Tentang Perusahaan */}
            <div className="bg-white rounded-[16px] border border-black/10 p-6">
              <h3 className="font-['Poppins',sans-serif] font-semibold text-[16px] text-black mb-4">Tentang Perusahaan</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="size-[48px] rounded-[10px] bg-[#dce1ff] flex items-center justify-center shrink-0">
                  <span className="font-['Poppins',sans-serif] font-bold text-[#2563ff] text-[16px]">{job.company.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#0a0a0a]">{job.company}</p>
                  <p className="font-['Poppins',sans-serif] text-[11px] text-[#64748b]">{company.category}</p>
                </div>
              </div>
              <p className="font-['Poppins',sans-serif] text-[12px] text-[#4a5565] leading-[18px] mb-4">{company.desc}</p>
              <div className="flex flex-col gap-2 text-[12px] text-[#64748b] font-['Poppins',sans-serif]">
                <div className="flex items-center gap-2"><Users size={13} /><span>{company.size}</span></div>
                <div className="flex items-center gap-2"><MapPin size={13} /><span>{job.location}</span></div>
                <div className="flex items-center gap-2"><ExternalLink size={13} /><a href={company.website} className="text-[#3a60a0] hover:underline">{company.website.replace("https://", "")}</a></div>
              </div>
            </div>

            {/* Informasi Lowongan */}
            <div className="bg-white rounded-[16px] border border-black/10 p-6">
              <h3 className="font-['Poppins',sans-serif] font-semibold text-[16px] text-black mb-4">Informasi Lowongan</h3>
              <div className="flex flex-col gap-3">
                {infoRows.map(({ label, value, red }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="font-['Poppins',sans-serif] text-[13px] text-[#64748b]">{label}</span>
                    <span className={`font-['Poppins',sans-serif] font-semibold text-[13px] ${red ? "text-[#dc2626]" : "text-[#0a0a0a]"}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
