import { BriefcaseBusiness, Building2, User, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* Left Panel - Blue Section */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0A46D2] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div>
          {/* Logo / Header */}
          <h2 className="font-bold text-lg tracking-wide">Vokasi Magang</h2>

          {/* Main Copy */}
          <div className="mt-16">
            <h1 className="text-[2.75rem] font-bold leading-[1.1] mb-6">
              Selangkah Lebih
              <br />
              Dekat Dengan
              <br />
              Suksesmu
            </h1>
            <p className="text-blue-100/90 text-[15px] leading-relaxed max-w-[90%]">
              Satu platform terintegrasi untuk mengelola seluruh
              <br />
              aktivitas magang dengan lebih terstruktur dan transparan
            </p>
          </div>

          {/* Mockup Card Illustration */}
          <div className="bg-white rounded-xl p-7 shadow-xl w-full max-w-[380px] relative mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0A46D2] rounded-full flex items-center justify-center text-white">
                <User size={20} strokeWidth={2.5} />
              </div>
              <div className="h-3 bg-gray-100 rounded-full w-24"></div>
            </div>
            <div className="space-y-4">
              <div className="h-3 bg-gray-100 rounded-full w-full"></div>
              <div className="h-3 bg-gray-100 rounded-full w-11/12"></div>
              <div className="h-3 bg-gray-100 rounded-full w-3/4"></div>
            </div>
            {/* Floating Action Button */}
            <div className="absolute -right-3 -bottom-3 bg-[#0066FF] w-12 h-12 rounded-[14px] flex items-center justify-center text-white shadow-lg">
              <Building2 size={22} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-6 mt-12 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <BriefcaseBusiness size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">2000+</p>
              <p className="text-[9px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">
                Lowongan
                <br />
                Aktif
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">50+</p>
              <p className="text-[9px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">
                Perusahaan
                <br />
                Mitra
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">3500+</p>
              <p className="text-[9px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">
                Pengguna
                <br />
                Aktif
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form Section */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 bg-white">
        <Outlet />
      </div>
    </div>
  );
}
