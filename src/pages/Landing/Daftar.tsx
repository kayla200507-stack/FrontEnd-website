import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ChevronDown, ArrowLeft } from "lucide-react";
import { AuthLeftPanel } from "../../components/AuthLeftPanel";

export function Daftar() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [kategori, setKategori] = useState("Mahasiswa");

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <AuthLeftPanel description="Buat akun dan lengkapi data dirimu untuk mulai mengelola aktivitas magang dengan mudah." />

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-[36px] overflow-y-auto">
        <div className="flex flex-col gap-[32px] w-[576px] py-8">

          {/* Header */}
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-['Poppins',sans-serif] font-bold text-[33px] text-black text-center leading-[36px] w-full">
              Daftarkan Akun Anda
            </h1>
            <p className="font-['Poppins',sans-serif] text-[18px] text-[#64748b] text-center leading-[24px] w-full">
              Silakan buat akun kamu dengan melengkapi data di bawah
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-[20px]">

            {/* Nama Lengkap */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                Nama Lengkap (sesuai KTP)
              </label>
              <input
                type="text"
                placeholder="Masukkan Nama Lengkap"
                className="h-[58px] w-full px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
              />
            </div>

            {/* Kategori */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                Kategori
              </label>
              <div className="relative">
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="h-[54px] w-full px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] font-medium text-[16px] text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white appearance-none pr-[40px]"
                >
                  <option>Mahasiswa</option>
                  <option>Dosen</option>
                </select>
                <ChevronDown size={14} className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none" />
              </div>
            </div>

            {/* No HP */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                No HP
              </label>
              <div className="flex gap-2">
                <div className="h-[49px] w-[160px] bg-white border border-[#e2e8f0] rounded-[8px] flex items-center px-[16px] gap-2 shrink-0">
                  <span className="font-['Poppins',sans-serif] font-regular text-[14px] text-black">Indonesia (+62)</span>
                </div>
                <input
                  type="tel"
                  placeholder="Masukkan No HP"
                  className="flex-1 h-[49px] px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
                />
              </div>
            </div>

            {/* NIM/NIP */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                NIM / NIP
              </label>
              <input
                type="text"
                placeholder="Masukkan NIM atau NIP"
                className="h-[58px] w-full px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                Email
              </label>
              <input
                type="email"
                placeholder="nama@student.ub.ac.id"
                className="h-[58px] w-full px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
              />
            </div>

            {/* Kata Sandi */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat kata sandi"
                  className="h-[58px] w-full pl-[16px] pr-[48px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[12px] top-[17px] text-[#6b7280]">
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>
              <p className="font-['Poppins',sans-serif] text-[12px] text-[#64748b] mt-[-13px]">Gunakan 8 atau lebih karakter, dengan perpaduan huruf, angka &amp; simbol.</p>

            {/* Konfirmasi Kata Sandi */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[14px] text-[#1a1a1a] leading-[20px]">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Ulangi kata sandi"
                  className="h-[58px] w-full pl-[16px] pr-[48px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-[12px] top-[17px] text-[#6b7280]">
                  {showConfirm ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button className="bg-black text-white font-['Poppins',sans-serif] font-bold text-[20px] leading-[27px] py-[18px] rounded-[13.5px] w-full hover:bg-[#1e293b] transition-colors mt-2">
              Daftar
            </button>
          </div>

          {/* Footer links */}
          <div className="flex flex-col gap-[18px] items-center">
            <p className="font-['Poppins',sans-serif] text-[18px] text-[#475569] text-center leading-[27px]">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-bold text-[#0f5bff] hover:underline">Masuk di sini</Link>
            </p>
            <Link to="/" className="flex items-center gap-[9px] font-['Poppins',sans-serif] font-medium text-[18px] text-[#2563eb] leading-[27px] hover:underline">
              <ArrowLeft size={18} />
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
