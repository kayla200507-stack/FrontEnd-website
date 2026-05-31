import React from 'react';
import { 
  BriefcaseBusiness, 
  Building2, 
  Users, 
  Eye, 
  User, 
  ArrowLeft 
} from 'lucide-react';

const LoginPage: React.FC = () => {
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
              Selangkah Lebih<br />
              Dekat Dengan<br />
              Suksesmu
            </h1>
            <p className="text-blue-100/90 text-[15px] leading-relaxed max-w-[90%]">
              Satu platform terintegrasi untuk mengelola seluruh<br />
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
              <p className="text-[9px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">Lowongan<br/>Aktif</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">50+</p>
              <p className="text-[9px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">Perusahaan<br/>Mitra</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">3500+</p>
              <p className="text-[9px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">Pengguna<br/>Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form Section */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 bg-white">
        <div className="max-w-[420px] w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h2>
            <p className="text-gray-500 text-sm">Silakan masuk untuk mengakses dashboard Anda</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[14px] font-semibold text-gray-900">
                Email/NIM/NIP
              </label>
              <input
                type="text"
                placeholder="Masukkan email, NIM, atau NIP"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[14px] font-semibold text-gray-900">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Masukkan kata sandi Anda"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-10"
                />
                <button 
                  type="button" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-[13px] text-gray-600 font-medium">Ingat Saya</span>
              </label>
              <a href="#" className="text-[13px] text-[#0A46D2] font-semibold hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold rounded-lg py-3.5 mt-2 text-[15px] hover:bg-gray-800 transition-colors"
            >
              Masuk
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-400 text-sm">atau</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mb-10">
            Belum memiliki akun?{' '}
            <a href="#" className="text-[#0A46D2] font-bold hover:underline">
              Daftar di sini
            </a>
          </p>

          {/* Back to Home Link */}
          <a 
            href="#" 
            className="flex items-center justify-center gap-2 text-sm text-[#0A46D2] font-medium hover:underline"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;