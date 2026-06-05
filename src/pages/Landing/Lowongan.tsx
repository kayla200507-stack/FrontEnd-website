import { useState } from "react";
import { Search, MapPin, Clock, Calendar, CheckCircle, Users, Award, Building, Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicStats } from "../../hooks/useStats";
import { useLowongan } from "../../hooks/useLowongan";
import dashboardImg from "../../assets/images/dashboard.png";

const filterPills = ["Semua", "Remote", "Full Time", "Part Time", "Hybrid", "Teknologi", "Desain", "Marketing"];

const benefitCards = [
  {
    icon: <CheckCircle size={24} className="text-[#2563ff]" />,
    title: "Perusahaan Terpercaya",
    desc: "Bekerja sama dengan perusahaan terverifikasi dan kredibel di berbagai industri.",
  },
  {
    icon: <Users size={30} className="text-[#2563ff]" />,
    title: "Bimbingan Kampus",
    desc: "Didukung penuh oleh kampus dalam proses penempatan dan pembinaan mahasiswa.",
  },
  {
    icon: <Award size={30} className="text-[#2563ff]" />,
    title: "Pengalaman Nyata",
    desc: "Raih pengalaman profesional yang berharga untuk meningkatkan karier masa depanmu.",
  },
];

export function Lowongan() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const { data: response, isLoading: isLowonganLoading } = useLowongan({ status_lowongan: 'active', per_page: 100 });
  const { data: statsResponse } = usePublicStats();
  
  const allJobs = response?.data || [];
  const statsData = statsResponse?.data;
  
  const lowonganStats = [
    { label: "Perusahaan Mitra", value: `${statsData?.perusahaan_mitra || 0}+` },
    { label: "Lowongan Magang", value: `${statsData?.lowongan_aktif || 0}+` },
    { label: "Posisi Tersedia", value: "25+" }, // can be hardcoded or updated if backend provides it
    { label: "Mahasiswa Terdaftar", value: `${statsData?.mahasiswa_terdaftar || 0}+` },
  ];

  const filtered = allJobs.filter((j) => {
    const matchSearch =
      (j.judul || "").toLowerCase().includes(search.toLowerCase()) ||
      (j.nama_perusahaan || "").toLowerCase().includes(search.toLowerCase());
      
    let matchFilter = true;
    if (filter === "Remote") matchFilter = j.penempatan === "WFH";
    else if (filter === "Full Time") matchFilter = j.tipe_pekerjaan === "Full Time";
    else if (filter === "Part Time") matchFilter = j.tipe_pekerjaan === "Part Time";
    else if (filter === "Hybrid") matchFilter = j.penempatan === "Hybrid";
    // For categories, just do simple string matching if we don't have exactly mapped ids
    else if (filter === "Teknologi") matchFilter = (j.bidang_perusahaan || "").toLowerCase().includes("tech") || (j.judul || "").toLowerCase().includes("developer");
    else if (filter === "Desain") matchFilter = (j.judul || "").toLowerCase().includes("design") || (j.judul || "").toLowerCase().includes("ui");
    else if (filter === "Marketing") matchFilter = (j.judul || "").toLowerCase().includes("marketing");
    
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#E7ECFF] h-[420px] overflow-hidden flex flex-col pt-8 px-10">
        <div className="max-w-[1100px] w-full mx-auto relative h-full">
          <div className="uppercase font-['Poppins',sans-serif] font-semibold text-[14px] text-black mb-8">
            LOWONGAN MAGANG
          </div>
          <div className="max-w-[500px] relative z-10">
            <p className="font-normal text-[#3a60a0] text-[54px] leading-[64px] mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              Temukan Lowongan<br />Magang Terbaik
            </p>
            <p className="font-['Poppins',sans-serif] text-[16px] text-[#4a5565] leading-[28px]">
              Temukan berbagai lowongan magang dari perusahaan terpercaya dan raih pengalaman berharga untuk masa depanmu.
            </p>
          </div>
          <div className="absolute right-[-50px] top-[-30px] bottom-0 w-[700px] flex items-center justify-end pointer-events-none">
            <img src={dashboardImg} alt="Dashboard" className="max-h-[120%] max-w-[120%] object-contain object-right" />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-10 relative z-10 -mt-10">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[20px] border border-[#e2e8f0] p-2 shadow-sm">
          <div className="flex items-center">
            <div className="flex-1 flex items-center px-4">
              <Search size={22} className="text-[#3a60a0] shrink-0" />
              <input
                type="text"
                placeholder="Cari posisi atau perusahaan"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-[60px] px-4 text-[16px] font-['Poppins',sans-serif] placeholder:text-[#6b7280] focus:outline-none"
              />
            </div>
            <div className="w-[1px] h-[40px] bg-[#e2e8f0]"></div>
            <div className="flex-[0.8] flex items-center px-4 relative">
              <MapPin size={22} className="text-[#3a60a0] shrink-0" />
              <input
                type="text"
                placeholder="Semua Lokasi"
                className="w-full h-[60px] px-4 text-[16px] font-['Poppins',sans-serif] placeholder:text-[#6b7280] focus:outline-none bg-transparent cursor-pointer"
                readOnly
              />
              <ChevronDown size={20} className="text-[#6b7280] absolute right-4 pointer-events-none" />
            </div>
            <button className="h-[60px] px-10 bg-[#3a60a0] text-white font-['Poppins',sans-serif] font-bold text-[16px] rounded-[14px] hover:bg-[#2d4f8a] transition-colors whitespace-nowrap">
              Cari Lowongan
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-10 mt-8">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[21px] border border-[#e2e8f0] px-10 py-8 shadow-sm">
          <div className="flex justify-between items-center">
            {lowonganStats.map((s, idx) => {
              const icons = [
                <Building key="1" size={24} className="text-[#2563ff]" />,
                <Briefcase key="2" size={24} className="text-[#2563ff]" />,
                <GraduationCap key="3" size={24} className="text-[#2563ff]" />,
                <Users key="4" size={24} className="text-[#2563ff]" />,
              ];
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="bg-[#e0e7ff] rounded-[14px] size-[54px] flex items-center justify-center shrink-0">
                    {icons[idx]}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-['Poppins',sans-serif] font-bold text-[22px] text-[#2563ff] leading-none mb-1.5">{s.value}</p>
                    <p className="font-['Poppins',sans-serif] font-semibold text-[13px] text-[#737687]">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="px-10 mt-10">
        <div className="max-w-[1100px] mx-auto flex justify-center gap-4 flex-wrap">
          {filterPills.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-[30px] py-[10px] rounded-full font-['Poppins',sans-serif] font-medium text-[15px] transition-colors ${filter === f
                ? "bg-[#3a60a0] text-white"
                : "bg-white text-[#475569] border border-black/30 hover:border-[#3a60a0]"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Job Grid */}
      <section className="px-10 py-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-['Poppins',sans-serif] text-[14px] text-[#4a5565] mb-6">
            Menampilkan <span className="font-semibold text-[#0a0a0a]">{filtered.length}</span> lowongan
          </p>

          {isLowonganLoading ? (
             <div className="text-center py-20">
               <p className="font-['Poppins',sans-serif] text-[16px] text-[#94a3b8]">Memuat lowongan...</p>
             </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-8">
              {filtered.map((job) => (
                <div key={job.id_lowongan} className="bg-white rounded-[24px] border border-black/30 p-8 flex flex-col gap-5 shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                  {/* Company Logo */}
                  <div className="bg-[#f3f4f6] rounded-[12px] size-[80px] flex items-center justify-center shrink-0">
                    {job.logo_perusahaan ? (
                      <img
                        src={job.logo_perusahaan}
                        alt={job.nama_perusahaan}
                        className="size-[64px] rounded-[10px] object-cover border border-black/20"
                      />
                    ) : (
                      <Building className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  {/* Company name + title */}
                  <div>
                    <p className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#64748b] mb-1">{job.nama_perusahaan}</p>
                    <h3 className="font-['Poppins',sans-serif] font-bold text-[20px] text-[#2d4a8a] leading-[28px]">{job.judul}</h3>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 text-[#94a3b8] text-[12px] font-['Poppins',sans-serif]">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{job.lokasi?.split(",")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{job.tipe_pekerjaan}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{job.durasi}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['Poppins',sans-serif] text-[14px] text-[#64748b] leading-[20px] line-clamp-3">{job.deskripsi_singkat}</p>

                  {/* Detail Button */}
                  <Link
                    to={`/lowongan/${job.id_lowongan}`}
                    className="w-full border border-black/20 text-black font-['Poppins',sans-serif] font-semibold text-[16px] py-[13px] rounded-[16px] text-center hover:bg-gray-50 transition-colors mt-auto"
                  >
                    Lihat Detail
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-['Poppins',sans-serif] text-[16px] text-[#94a3b8]">Tidak ada lowongan yang sesuai dengan pencarian.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefit Cards */}
      <section className="px-10 py-12 pb-24">
        <div className="max-w-[1100px] mx-auto flex gap-14 items-start justify-center">
          {benefitCards.map((b) => (
            <div key={b.title} className="bg-white rounded-[24px] border border-black/30 p-8 flex-1 shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#eff6ff] rounded-[16px] size-[57px] flex items-center justify-center mb-6">
                {b.icon}
              </div>
              <h3 className="font-['Poppins',sans-serif] font-bold text-[16px] text-[#1e293b] mb-2">{b.title}</h3>
              <p className="font-['Poppins',sans-serif] text-[12px] text-[#64748b] leading-[20px]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
