import { Link } from "react-router-dom";
import { Database, Clock, Zap, ShieldCheck, Users, GraduationCap, BookOpen, MapPin, ArrowRight, Calendar } from "lucide-react";
import { jobs, jobLogos } from "../../tampilanAwalData";
import heroImg from "../../assets/images/hero.png";

const whyCards = [
  { icon: <Database size={24} className="text-[#2563ff]" />, title: "Data Terpusat", desc: "Semua informasi magang tersimpan dalam satu sistem terintegrasi yang aman dan terstruktur" },
  { icon: <Clock size={24} className="text-[#2563ff]" />, title: "Monitoring Real-Time", desc: "Pantau progress magang mahasiswa secara langsung melalui logbook digital dan laporan berkala" },
  { icon: <Zap size={24} className="text-[#2563ff]" />, title: "Proses Cepat", desc: "Pendaftaran hingga verifikasi dilakukan digital, hemat waktu dan efisien untuk semua pihak" },
  { icon: <ShieldCheck size={24} className="text-[#2563ff]" />, title: "Terverifikasi", desc: "Semua lowongan dan perusahaan telah melalui proses verifikasi oleh admin akademik kampus" },
];

const steps = [
  { num: 1, title: "Daftar Akun", desc: "Mahasiswa mendaftar menggunakan email kampus dan melengkapi profil akademik" },
  { num: 2, title: "Cari Lowongan", desc: "Eksplorasi lowongan magang yang tersedia dan pilih sesuai minat dan keahlian" },
  { num: 3, title: "Mulai Magang", desc: "Setelah diterima, lakukan aktivitas magang dan catat dalam logbook digital" },
];

const heroStats = [
  { value: "10+", label: "Lowongan Aktif" },
  { value: "9+", label: "Perusahaan Mitra" },
  { value: "2000+", label: "Mahasiswa Terdaftar" },
];

const featuredJobs = jobs.slice(0, 4);

export function Beranda() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-14 px-10" style={{ backgroundImage: "linear-gradient(163.813deg, rgb(239, 246, 255) 0%, rgb(224, 231, 255) 100%)" }}>
        <div className="max-w-[1200px] mx-auto flex items-center gap-16">
          <div className="flex-1">
            <h1 className="font-['Poppins,sans-serif] font-bold text-[38px] text-[#101828] leading-[54px] mb-4">
              Temukan Tempat Magang Terbaik untuk Masa Depanmu
            </h1>
            <p className="font-['Poppins',sans-serif] text-[14px] text-[#4a5565] leading-[22px] mb-8 max-w-[480px]">
              Platform resmi kampus untuk menghubungkan mahasiswa, dosen, dan mitra industri dalam pelaksanaan program magang secara terintegrasi
            </p>
            <div className="flex gap-10">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="font-['Poppins',sans-serif] font-bold text-[22px] text-[#155dfc] leading-[27px]">{s.value}</p>
                  <p className="font-['Poppins',sans-serif] text-[12px] text-[#4a5565]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative rounded-[12px] overflow-hidden shadow-2xl max-w-[440px] w-full" >
              <img src={heroImg}
                alt="Platform Magang" className="w-full h-[287px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-[12px] pointer-events-none"></div>
              <div className="absolute top-4 -left-10 bg-white rounded-[8px] shadow-lg p-3 flex items-center gap-3">
                <div className="bg-[#dce1ff] rounded-[6px] size-[24px] flex items-center justify-center">
                  <GraduationCap size={14} className="text-[#2563ff]" />
                </div>
                <div>
                  <p className="text-[8px] text-[#6a7282]">Alumni Magang</p>
                  <p className="text-[9px] font-semibold text-[#0a0a0a]">1500+</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-[-10px] bg-white rounded-[8px] shadow-lg px-3 py-2 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#2563ff]" />
                <p className="text-[9px] font-semibold text-[#0a0a0a]">Diterima Magang!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mengapa Menggunakan Sistem Kami */}
      <section className="py-16 px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Poppins',sans-serif] font-bold text-[26px] text-[#101828] mb-3">Mengapa Menggunakan Sistem Kami?</h2>
            <p className="font-['Poppins',sans-serif] font-semibold text-[16px] text-[#4a5565]">Solusi terpadu untuk kemudahan proses magang mahasiswa</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {whyCards.map((card) => (
              <div key={card.title} className="bg-white rounded-[14px] border border-black/10 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="bg-[#dbeafe] size-[55px] rounded-[10px] flex items-center justify-center">{card.icon}</div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-[20px] text-[#101828]">{card.title}</h3>
                <p className="font-['Poppins',sans-serif] text-[12px] text-[#4a5565] leading-[20px]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lowongan Magang Terbaru */}
      <section className="py-14 px-10">
        <div className="max-w-[1200px] mx-auto bg-[#f8fafc] rounded-[24px] p-10 border border-[#e2e8f0]">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-['Poppins',sans-serif] font-bold text-[28px] text-[#0a0a0a] mb-2">
                Lowongan Magang Terbaru
              </h2>
              <p className="font-['Poppins',sans-serif] text-[16px] text-[#475569]">
                Peluang magang dari perusahaan terpercaya
              </p>
            </div>
            <Link to="/lowongan" className="font-['Poppins',sans-serif] font-medium text-[#2563ff] flex items-center gap-2 hover:underline">
              Lihat Semua Lowongan <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-[16px] border border-[#e2e8f0] p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="size-[54px] rounded-[12px] border border-[#e2e8f0] flex items-center justify-center p-2 mb-4">
                  <img src={jobLogos[job.id]} alt={job.company} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-['Poppins',sans-serif] font-bold text-[18px] text-[#0a0a0a] leading-tight mb-1">{job.title}</h3>
                <p className="font-['Poppins',sans-serif] text-[14px] text-[#64748b] mb-4">{job.company}</p>
                
                <div className="flex flex-col gap-2 mt-auto mb-4">
                  <div className="flex items-center gap-2 text-[#64748b] text-[13px] font-['Poppins',sans-serif]">
                    <MapPin size={16} />
                    <span>{job.location.split(',')[0]} • {job.penempatan}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748b] text-[13px] font-['Poppins',sans-serif]">
                    <Calendar size={16} />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                <Link to={`/lowongan/${job.id}`} className="mt-2 w-full py-2.5 rounded-[10px] border border-[#e2e8f0] text-[#0a0a0a] font-['Poppins',sans-serif] font-semibold text-[14px] text-center hover:bg-[#f8fafc] transition-colors">
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Sistem */}
      <section className="py-14 px-10">
        <div className="max-w-[1200px] mx-auto flex gap-14 items-start">
          <div className="flex-1">
            <h2 className="font-['Poppins',sans-serif] font-bold text-[26px] text-black text-center mb-4">Tentang Sistem Vokasi Magang</h2>
            <p className="font-['Poppins',sans-serif] text-[12px] text-black text-justify leading-[19px] mb-5 max-w-[533px]">
              Platform digital yang dirancang khusus untuk memfasilitasi program magang/praktik kerja. Sistem ini menghubungkan mahasiswa, dosen pembimbing, dan admin akademik dalam satu ekosistem terintegrasi.
            </p>
            <div className="flex flex-col gap-3">
              {["Manajemen lowongan magang yang terstruktur", "Monitoring aktivitas mahasiswa secara real-time", "Penilaian dan evaluasi berbasis digital"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-black shrink-0" />
                  <span className="font-['Poppins',sans-serif] text-[12px] text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[500px]">
            <h3 className="font-['Poppins',sans-serif] font-bold text-[26px] text-black mb-5">Fitur Unggulan</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: <Users size={30} className="text-white shrink-0" />, title: "Untuk Mahasiswa", desc: "Cari lowongan, kirim lamaran, lapor aktivitas" },
                { icon: <BookOpen size={30} className="text-white shrink-0" />, title: "Untuk Dosen", desc: "Monitor mahasiswa, beri feedback, nilai kinerja" },
              ].map((f) => (
                <div key={f.title} className="bg-[#3a60a0] rounded-[7px] p-4 flex items-center gap-4">
                  {f.icon}
                  <div>
                    <p className="font-['Poppins',sans-serif] font-semibold text-[14px] text-white">{f.title}</p>
                    <p className="font-['Poppins',sans-serif] text-[12px] text-[#dbeafe]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Panduan Penggunaan */}
      <section className="py-16 px-10 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Poppins',sans-serif] font-bold text-[26px] text-[#101828] mb-3">Panduan Penggunaan Sistem</h2>
            <p className="font-['Poppins',sans-serif] font-semibold text-[16px] text-[#4a5565]">Langkah mudah untuk memulai program magang</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-white rounded-[14px] border border-black/10 p-5 flex flex-col gap-4">
                <div className="bg-[#155dfc] size-[47px] rounded-full flex items-center justify-center">
                  <span className="font-['Inter',sans-serif] font-bold text-[19px] text-white">{step.num}</span>
                </div>
                <h3 className="font-['Inter',sans-serif] font-semibold text-[19px] text-[#0a0a0a]">{step.title}</h3>
                <p className="font-['Inter',sans-serif] text-[13px] text-[#4a5565] leading-[19px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
