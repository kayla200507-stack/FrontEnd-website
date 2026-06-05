import { Link2, BarChart2, TrendingUp, Monitor, FileText, ShieldCheck, Clock, Users, Building, Briefcase, GraduationCap } from "lucide-react";
import { lowonganStats, partnerLogos } from "../../tampilanAwalData";

const missionCards = [
  { icon: <Link2 size={24} className="text-white" />, title: "Menghubungkan", desc: "Menjadi jembatan antara mahasiswa dan perusahaan mitra yang relevan dan terpercaya." },
  { icon: <BarChart2 size={24} className="text-white" />, title: "Mengelola", desc: "Membantu kampus mengelola seluruh proses magang dengan mudah, tertib dan efisien." },
  { icon: <TrendingUp size={24} className="text-white" />, title: "Meningkatkan", desc: "Meningkatkan kualitas pengalaman magang bagi mahasiswa untuk masa depan yang lebih baik." },
];

const platformFeatures = [
  { icon: <Monitor size={24} className="text-[#2563ff]" />, title: "Sistem Terintegrasi", desc: "Semua proses magang terintegrasi dalam satu platform mulai dari pengajuan hingga evaluasi." },
  { icon: <FileText size={24} className="text-[#2563ff]" />, title: "Mitra Berkualitas", desc: "Lowongan magang hanya dari perusahaan yang telah bekerja sama dengan kampus." },
  { icon: <ShieldCheck size={24} className="text-[#2563ff]" />, title: "Aman & Terpercaya", desc: "Data dan informasi dikelola dengan standar keamanan tinggi dan dapat diandalkan." },
  { icon: <FileText size={24} className="text-[#2563ff]" />, title: "Laporan Lengkap", desc: "Menyediakan laporan dan rekapitulasi data magang secara otomatis dan akurat." },
  { icon: <Clock size={24} className="text-[#2563ff]" />, title: "Efisien & Praktis", desc: "Menghemat waktu dan tenaga dalam pengelolaan magang secara digital." },
  { icon: <Users size={24} className="text-[#2563ff]" />, title: "Dukungan Penuh", desc: "Tim kami siap membantu kampus dan pengguna kapan saja dibutuhkan." },
];

export function Tentang() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* Header Banner */}
      <section className="relative bg-[#E7ECFF] pt-10 md:pt-12 pb-14 md:pb-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto w-full relative z-10">
          <div className="uppercase font-['Poppins',sans-serif] font-semibold text-[14px] text-black mb-8 md:mb-16 text-center md:text-left">
            TENTANG KAMI
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start text-center md:text-left">
            <div className="flex-1 w-full">
              <p className="font-normal text-[#3a60a0] text-[40px] md:text-[54px] leading-[50px] md:leading-[64px]" style={{ fontFamily: "'Georgia', serif" }}>
                Vokasi Magang
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <p className="font-['Poppins',sans-serif] text-[15px] md:text-[16px] text-[#4a5565] leading-[26px] md:leading-[28px]">
                <span className="font-bold text-black">Vokasi Magang</span> adalah platform manajemen magang yang dirancang khusus untuk membantu kampus dalam mengelola program magang secara terstruktur, efisien, dan terintegrasi.
              </p>
              <p className="font-['Poppins',sans-serif] text-[15px] md:text-[16px] text-[#4a5565] leading-[26px] md:leading-[28px]">
                Kami menghubungkan mahasiswa dengan perusahaan mitra terpercaya yang bekerja sama dengan kampus untuk memberikan pengalaman magang terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats card */}
      <section className="px-4 md:px-10 mt-[-20px] md:mt-10 relative z-20">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[21px] border border-[#e2e8f0] px-6 md:px-10 py-6 md:py-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
            {lowonganStats.map((s, idx) => {
              const icons = [
                <Building key="1" size={24} className="text-[#2563ff]" />,
                <Briefcase key="2" size={24} className="text-[#2563ff]" />,
                <GraduationCap key="3" size={24} className="text-[#2563ff]" />,
                <Users key="4" size={24} className="text-[#2563ff]" />,
              ];
              return (
                <div key={s.label} className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-3 md:gap-4 text-center md:text-left">
                  <div className="bg-[#e0e7ff] rounded-[14px] size-[48px] md:size-[54px] flex items-center justify-center shrink-0">
                    {icons[idx]}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-['Poppins',sans-serif] font-bold text-[18px] md:text-[22px] text-[#2563ff] leading-none mb-1.5">{s.value}</p>
                    <p className="font-['Poppins',sans-serif] font-semibold text-[11px] md:text-[13px] text-[#737687]">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Misi Kami */}
      <section className="py-12 md:py-14 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10 md:12">
            <h2 className="font-['Poppins',sans-serif] font-bold text-[24px] md:text-[26px] text-[#191b24] mb-3">Misi Kami</h2>
            <p className="font-['Poppins',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#434656] max-w-[600px] mx-auto">
              Mendukung kampus dalam menciptakan ekosistem magang yang berkualitas melalui teknologi dan kolaborasi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionCards.map((card) => (
              <div key={card.title} className="bg-white rounded-[21px] border border-black/10 shadow-md p-6 md:p-8 relative">
                <div className="bg-[#2563ff] rounded-full size-[50px] flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-[18px] md:text-[20px] text-[#191b24] mb-4">{card.title}</h3>
                <p className="font-['Poppins',sans-serif] text-[13px] md:text-[14px] text-[#434656] leading-[22px] md:leading-[23px]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Platform Kami */}
      <section className="py-12 md:py-14 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 md:10">
            <h2 className="font-['Poppins',sans-serif] font-bold text-[24px] md:text-[26px] text-[#191b24] mb-3">Tentang Platform Kami</h2>
            <p className="font-['Poppins',sans-serif] font-semibold text-[14px] md:text-[16px] text-[#434656] max-w-[700px] mx-auto">
              Vokasi Magang dikembangkan untuk menjawab kebutuhan kampus dalam mengelola program magang yang melibatkan banyak pihak
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platformFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-4">
                <div className="bg-[#dce1ff] rounded-[15px] size-[54px] md:size-[60px] flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-['Poppins',sans-serif] font-semibold text-[18px] md:text-[22px] text-[#191b24] mb-2">{f.title}</h3>
                  <p className="font-['Poppins',sans-serif] text-[13px] md:text-[14px] text-[#434656] leading-[22px] md:leading-[24px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perusahaan Mitra Kami */}
      <section className="py-12 md:py-14 px-6 md:px-10 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 md:10">
            <h2 className="font-['Poppins',sans-serif] font-bold text-[24px] md:text-[26px] text-[#191b24] mb-3">Perusahaan Mitra Kami</h2>
            <p className="font-['Poppins',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#434656] max-w-[700px] mx-auto">
              Bekerja sama dengan perusahaan-perusahaan terpercaya untuk menyediakan peluang magang terbaik bagi mahasiswa
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 py-6">
            {partnerLogos.map((src, i) => (
              <div key={i} className="aspect-square rounded-[10px] overflow-hidden border border-black/10 bg-white">
                <img src={src} alt={`Mitra ${i + 1}`} className="w-full h-full object-contain p-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
