import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, GraduationCap, Database, Activity, 
  Zap, ShieldCheck, Users
} from 'lucide-react';

const LandingPage = () => {
  // Inisialisasi fungsi navigasi
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      
      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Vokasi Magang
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-blue-600 font-semibold text-sm">Beranda</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 font-medium text-sm transition">Lowongan</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 font-medium text-sm transition">Tentang</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol Masuk yang memanggil fungsi navigate ke /login */}
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition cursor-pointer"
            >
              Masuk
            </button>
            <button className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-100 transition cursor-pointer">
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section className="bg-[#F8FAFF] pt-32 pb-20 px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-left">
          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900">
            Temukan Tempat <br /> Magang Terbaik untuk <br /> Masa Depanmu
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Platform resmi kampus untuk menghubungkan mahasiswa, dosen, dan mitra industri dalam pelaksanaan program magang secara terintegrasi.
          </p>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center gap-3 shadow-xl shadow-slate-200">
            <Search size={20} /> Eksplorasi Lowongan
          </button>
          
          <div className="flex gap-12 pt-8 border-t border-gray-200">
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-sm text-gray-400 font-medium">Lowongan Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">150+</p>
              <p className="text-sm text-gray-400 font-medium">Perusahaan Mitra</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">2000+</p>
              <p className="text-sm text-gray-400 font-medium">Mahasiswa Terdaftar</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
               alt="Collaboration" 
               className="object-cover w-full h-full"
             />
             
             {/* Floating Card: Alumni - Menggunakan animate-bounce standar tailwind */}
             <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Alumni Magang</p>
                  <p className="text-sm font-extrabold text-slate-800">1500+</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 2. WHY CHOOSE US --- */}
      <section className="py-24 px-6 lg:px-20 text-center bg-white">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Menggunakan Sistem Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            { icon: <Database />, title: "Data Terpusat", desc: "Semua informasi magang tersimpan dalam satu sistem yang aman" },
            { icon: <Activity />, title: "Monitoring Real-Time", desc: "Pantau progress magang secara langsung melalui logbook digital" },
            { icon: <Zap />, title: "Proses Cepat", desc: "Pendaftaran hingga verifikasi dilakukan digital, hemat waktu dan efisien" },
            { icon: <ShieldCheck />, title: "Terverifikasi", desc: "Semua lowongan telah melalui proses verifikasi oleh admin akademik" }
          ].map((item, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl transition-all text-left">
              <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-16 px-6 lg:px-20 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-12">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-white">
                <GraduationCap /> <span className="font-bold">Manajemen Magang</span>
             </div>
             <p className="text-xs">Universitas Brawijaya <br/> Malang, Jawa Timur</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;