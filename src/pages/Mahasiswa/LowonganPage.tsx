import { useState } from "react";
import { JobCard } from "../../components/JobCard";
import { Search, MapPin, Clock, ChevronDown, RotateCcw } from "lucide-react";

import imgLogo1 from "../../assets/images/company-1.png";
import imgLogo2 from "../../assets/images/company-2.png";
import imgLogo3 from "../../assets/images/company-3.png";
import imgLogo4 from "../../assets/images/company-4.png";
import imgLogo5 from "../../assets/images/company-5.png";
import imgLogo6 from "../../assets/images/company-6.png";

const ALL_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "PT Teknologi Maju",
    type: "Full-time",
    city: "Jakarta",
    deadline: "30 Maret 2026",
    desc: "Mencari mahasiswa untuk posisi Frontend Developer dengan pengalaman React",
    img: imgLogo1,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PT Digital Kreatif",
    type: "Part-time",
    city: "Bandung",
    deadline: "5 April 2026",
    desc: "Kesempatan magang di tim design dengan portfolio yang menarik",
    img: imgLogo2,
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "PT Inovasi Sistem",
    type: "Full-time",
    city: "Surabaya",
    deadline: "15 April 2026",
    desc: "Belajar teknologi backend modern dengan mentor berpengalaman",
    img: imgLogo3,
  },
  {
    id: 4,
    title: "Content Writer",
    company: "PT Media Online",
    type: "Remote",
    city: "Jakarta",
    deadline: "20 April 2026",
    desc: "Menulis konten kreatif untuk platform digital",
    img: imgLogo4,
  },
  {
    id: 5,
    title: "Mobile Developer",
    company: "PT Solusi Digital",
    type: "Full-time",
    city: "Yogyakarta",
    deadline: "25 April 2026",
    desc: "Mengembangkan aplikasi mobile dengan Flutter atau React Native",
    img: imgLogo5,
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "PT Analitik Data",
    type: "Full-time",
    city: "Jakarta",
    deadline: "1 Mei 2026",
    desc: "Analisis data dan visualisasi dengan tools modern",
    img: imgLogo6,
  },
];

const CITIES = ["Semua Lokasi", "Jakarta", "Bandung", "Surabaya", "Yogyakarta"];
const TYPES = ["Semua Tipe", "Full-time", "Part-time", "Remote"];

interface LowonganPageProps {
  onApply: () => void;
  onViewDetail: (id: number) => void;
}

export function LowonganPage({ onApply, onViewDetail }: LowonganPageProps) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Semua Lokasi");
  const [type, setType] = useState("Semua Tipe");

  const filtered = ALL_JOBS.filter((j) => {
    const matchSearch =
      search === "" ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchCity = city === "Semua Lokasi" || j.city === city;
    const matchType = type === "Semua Tipe" || j.type === type;
    return matchSearch && matchCity && matchType;
  });

  function reset() {
    setSearch("");
    setCity("Semua Lokasi");
    setType("Semua Tipe");
  }

  return (
    <div className="p-6 space-y-5">
      {/* Page title */}
      <div>
        <h1 className="text-[#3a60a0] text-[30px] font-bold leading-tight">Pencarian Lowongan Magang</h1>
        <p className="text-[#3a60a0] text-base mt-1">Temukan lowongan magang yang sesuai dengan minat Anda</p>
      </div>

      {/* Search + filters card */}
      <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.1)] shadow-sm px-5 py-5 space-y-4">
        {/* Search row */}
        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="flex-1 flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-lg px-4 h-[46px]">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Posisi atau Perusahaan..."
              className="flex-1 text-sm text-[rgba(0,0,0,0.5)] placeholder:text-[rgba(0,0,0,0.5)] outline-none bg-transparent font-semibold"
            />
          </div>
          {/* Lokasi dropdown */}
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="appearance-none bg-[#f3f3f5] h-9 pl-3 pr-8 rounded-lg text-sm text-[#0a0a0a] font-medium outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none opacity-50" />
          </div>
          {/* Jurusan/Tipe dropdown */}
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="appearance-none bg-[#f3f3f5] h-9 pl-3 pr-8 rounded-lg text-sm text-[#0a0a0a] font-medium outline-none cursor-pointer"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none opacity-50" />
          </div>
        </div>

        {/* Count + reset */}
        <div className="flex items-center justify-between">
          <p className="text-[#4a5565] text-sm">
            Menampilkan {filtered.length} dari {ALL_JOBS.length} lowongan
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-3 h-8 text-[#0a0a0a] text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Job cards grid */}
      <div className="grid grid-cols-3 gap-5">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} onApply={onApply} onDetail={() => onViewDetail(job.id)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-slate-400">
            <Search size={40} strokeWidth={1.5} />
            <p className="mt-3 text-sm">Tidak ada lowongan yang sesuai filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
