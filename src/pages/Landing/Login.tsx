import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AuthLeftPanel } from "../../components/AuthLeftPanel";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <AuthLeftPanel description="Satu platform terintegrasi untuk mengelola seluruh aktivitas magang dengan lebih terstruktur dan transparan" />

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-[36px]">
        <div className="flex flex-col gap-[45px] w-[448px]">

          {/* Header */}
          <div className="flex flex-col gap-[9px]">
            <h1 className="font-['Poppins',sans-serif] font-bold text-[33px] text-black text-center leading-[40.5px] w-full">
              Masuk ke Akun Anda
            </h1>
            <p className="font-['Poppins',sans-serif] text-[18px] text-[#64748b] leading-[27px] w-[471px]">
              Silakan masuk untuk mengakses dashboard Anda
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-[27px]">
            {/* Email/NIM/NIP */}
            <div className="flex flex-col gap-[9px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[18px] text-black leading-[22.5px]">
                Email/NIM/NIP
              </label>
              <input
                type="text"
                placeholder="Masukkan email, NIM, atau NIP"
                className="h-[58px] w-[448px] px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[9px]">
              <label className="font-['Poppins',sans-serif] font-semibold text-[18px] text-black leading-[22.5px]">
                Kata Sandi
              </label>
              <div className="relative w-[448px]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi Anda"
                  className="h-[58px] w-full pl-[16px] pr-[48px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] top-[17px] text-[#6b7280]"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between w-[448px]">
              <label className="flex items-center gap-[9px] cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`size-[18px] rounded-[4.5px] border-[1.125px] flex items-center justify-center cursor-pointer transition-colors shrink-0 ${remember ? "bg-[#3a60a0] border-[#3a60a0]" : "bg-white border-[#cbd5e1]"}`}
                >
                  {remember && <span className="text-white text-[11px] leading-none font-bold">✓</span>}
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[16px] text-[#475569] leading-[22.5px]">Ingat Saya</span>
              </label>
              <Link to="/lupa-kata-sandi" className="font-['Poppins',sans-serif] font-semibold text-[16px] text-[#0f5bff] leading-[22.5px] hover:underline">
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* Submit */}
            <button className="bg-black text-white font-['Poppins',sans-serif] font-bold text-[20px] leading-[27px] py-[18px] rounded-[13.5px] w-[448px] hover:bg-[#1e293b] transition-colors">
              Masuk
            </button>
          </div>

          {/* Divider */}
          <div className="relative w-[448px]">
            <div className="absolute inset-x-0 top-1/2 h-[1.125px] bg-[#475569]/40" />
            <div className="relative flex justify-center">
              <span className="bg-white px-[18px] font-['Poppins',sans-serif] text-[16px] text-[#475569] leading-[22.5px]">atau</span>
            </div>
          </div>

          {/* Additional links */}
          <div className="flex flex-col gap-[36px] items-center w-[448px]">
            <p className="font-['Poppins',sans-serif] text-[18px] text-[#475569] text-center leading-[27px]">
              Belum memiliki akun?{" "}
              <Link to="/daftar" className="font-bold text-[#0f5bff] hover:underline">Daftar di sini</Link>
            </p>
            <Link
              to="/"
              className="flex items-center gap-[9px] font-['Poppins',sans-serif] font-medium text-[18px] text-[#2563eb] leading-[27px] hover:underline"
            >
              <ArrowLeft size={18} />
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
