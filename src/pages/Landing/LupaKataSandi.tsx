import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, LockKeyhole} from "lucide-react";
import { AuthLeftPanel } from "../../components/AuthLeftPanel";

function KeyIcon() {
  return <LockKeyhole size={40} className="text-[#2563EB]" />;
}

export function LupaKataSandi() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <AuthLeftPanel description="Satu platform terintegrasi untuk mengelola seluruh aktivitas magang dengan lebih terstruktur dan transparan" />

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-[36px]">
        {sent ? (
          <div className="flex flex-col items-center gap-[24px] w-[448px]">
            <div className="bg-[#eff6ff] w-[80px] flex items-center justify-center py-[20px] rounded-full shrink-0">
              <KeyIcon />
            </div>
            <div className="flex flex-col gap-[12px] w-full">
              <h2 className="font-['Poppins',sans-serif] font-bold text-[30px] text-black text-center leading-[36px]">
                Email Terkirim!
              </h2>
              <p className="font-['Poppins',sans-serif] text-[16px] text-[#6b7280] text-center leading-[24px]">
                Kami telah mengirimkan tautan reset kata sandi ke{" "}
                <span className="font-semibold text-black">{email}</span>.
                Periksa kotak masuk Anda.
              </p>
            </div>
            <Link
              to="/auth/login"
              className="flex items-center gap-[8px] font-['Poppins',sans-serif] font-semibold text-[14px] text-[#2563eb] leading-[20px] hover:underline"
            >
              <ArrowLeft size={16} />
              Kembali ke Halaman Masuk
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-[32px] w-[448px] items-center">

            {/* Icon */}
            <div className="bg-[#eff6ff] w-[80px] flex items-center justify-center py-[20px] rounded-full shrink-0">
              <KeyIcon />
            </div>

            {/* Header */}
            <div className="flex flex-col gap-[12px] w-full">
              <h1 className="font-['Poppins',sans-serif] font-bold text-[30px] text-black text-center leading-[36px] w-full">
                Lupa Kata Sandi?
              </h1>
              <p className="font-['Poppins',sans-serif] text-[16px] text-[#6b7280] text-center leading-[24px] w-full">
                Masukkan email Anda dan kami akan mengirimkan tautan<br />
                untuk mereset kata sandi.
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-[24px] w-full">
              <div className="flex flex-col gap-[8.5px]">
                <label className="font-['Poppins',sans-serif] font-semibold text-[18px] text-black leading-[20px]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[58px] w-[448px] px-[16px] rounded-[8px] border border-[#e2e8f0] font-['Poppins',sans-serif] text-[16px] text-[#0a0a0a] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 bg-white"
                />
              </div>

              <button
                onClick={() => email && setSent(true)}
                className="relative bg-black text-white font-['Poppins',sans-serif] font-semibold text-[18px] leading-[24px] py-[14px] rounded-[12px] w-full hover:bg-[#1e293b] transition-colors shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.05)]"
              >
                Kirim Tautan Reset
              </button>
            </div>

            {/* Back link */}
            <Link
              to="/auth/login"
              className="flex items-center gap-[8px] font-['Poppins',sans-serif] font-semibold text-[14px] text-[#2563eb] leading-[20px] hover:underline"
            >
              <ArrowLeft size={16} />
              Kembali ke Halaman Masuk
            </Link>

            {/* Divider */}
            <div className="w-full h-px bg-[#475569]/40" />

            {/* Footer info */}
            <div className="flex items-center gap-[4px] justify-center w-full">
              <Info size={20} className="text-[#475569] shrink-0 mt-0.5" />
              <p className="font-['Poppins',sans-serif] text-[13px] text-[#475569] leading-[19px] text-center">
                Pastikan email yang Anda masukkan terdaftar di sistem kami.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
