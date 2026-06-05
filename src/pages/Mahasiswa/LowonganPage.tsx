import { useState } from "react";
import { JobCard } from "../../components/JobCard";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { useLowongan } from "../../hooks/useLowongan";
import { usePendaftaranStore } from "../../stores/pendaftaranStore";
import { useMyPendaftaran } from "../../hooks/usePendaftaran";
import type { Lowongan } from "../../services/lowonganService";
import { DashboardHeader } from "../../components/common/DashboardHeader";

const CITIES = ["Semua Lokasi", "Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Malang"];
const TYPES = ["Semua Tipe", "Full Time", "Part Time", "Freelance"];

interface LowonganPageProps {
  onApply: () => void;
  onViewDetail: (id: number) => void;
}

export function LowonganPage({ onApply, onViewDetail }: LowonganPageProps) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Semua Lokasi");
  const [type, setType] = useState("Semua Tipe");
  const setLowongan = usePendaftaranStore((state) => state.setLowongan);

  // Fetch real data
  const { data: response, isLoading, isError } = useLowongan();
  const { data: myApplications } = useMyPendaftaran();
  
  // Defensive check for paginated response
  const rawData = response as any;
  const allJobs: Lowongan[] = Array.isArray(rawData?.data) 
    ? rawData.data 
    : (Array.isArray(rawData?.data?.data) ? rawData.data.data : []);

  // List of applied job IDs
  const appliedJobIds = (myApplications?.data || []).map((app: any) => app.id_lowongan);

  const filtered = allJobs.filter((j) => {
    const matchSearch =
      search === "" ||
      j.judul.toLowerCase().includes(search.toLowerCase()) ||
      j.nama_perusahaan.toLowerCase().includes(search.toLowerCase());
    const matchCity = city === "Semua Lokasi" || j.lokasi.includes(city);
    const matchType = type === "Semua Tipe" || j.tipe_pekerjaan === type;
    return matchSearch && matchCity && matchType;
  });

  const handleApply = (id: number) => {
    const selectedJob = allJobs.find((job) => job.id_lowongan === id) ?? null;
    setLowongan(id, selectedJob);
    onApply();
  };

  function reset() {
    setSearch("");
    setCity("Semua Lokasi");
    setType("Semua Tipe");
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Page title */}
      <div className="mb-8">
        <DashboardHeader 
          title="Pencarian Lowongan Magang" 
          description="Temukan lowongan magang yang sesuai dengan minat Anda" 
        />
      </div>

      {/* Search + filters card */}
      <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.1)] shadow-sm px-4 md:px-5 py-4 md:py-5 space-y-4">
        {/* Search row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
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
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Lokasi dropdown */}
            <div className="relative flex-1">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none bg-[#f3f3f5] h-[46px] lg:h-9 pl-3 pr-8 rounded-lg text-sm text-[#1e293b] font-medium outline-none cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none opacity-50" />
            </div>
            {/* Jurusan/Tipe dropdown */}
            <div className="relative flex-1">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full appearance-none bg-[#f3f3f5] h-[46px] lg:h-9 pl-3 pr-8 rounded-lg text-sm text-[#1e293b] font-medium outline-none cursor-pointer"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none opacity-50" />
            </div>
          </div>
        </div>

        {/* Count + reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[#4a5565] text-xs md:text-sm">
            {isLoading ? "Memuat..." : `Menampilkan ${filtered.length} dari ${allJobs.length} lowongan`}
          </p>
          <button
            onClick={reset}
            className="flex items-center justify-center gap-1.5 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-3 h-9 md:h-8 text-[#1e293b] text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Job cards grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-[#3a60a0]" />
          <p className="mt-4 text-gray-500 font-medium">Memuat daftar lowongan...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-12 text-center text-red-600 font-medium font-['Poppins']">
          Gagal memuat data lowongan. Silakan coba beberapa saat lagi.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job) => (
            <JobCard 
              key={job.id_lowongan} 
              job={job} 
              isApplied={appliedJobIds.includes(job.id_lowongan)}
              onApply={() => handleApply(job.id_lowongan)} 
              onDetail={() => onViewDetail(job.id_lowongan)} 
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
              <Search size={40} strokeWidth={1.5} />
              <p className="mt-3 text-sm font-['Poppins']">Tidak ada lowongan yang sesuai filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
