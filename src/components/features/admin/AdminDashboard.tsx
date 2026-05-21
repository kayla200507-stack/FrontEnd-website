import React from 'react';
import { 
  Home, 
  Users, 
  ClipboardCheck, 
  FileText, 
  Settings, 
  Bell, 
  Clock, 
  Briefcase, 
  CheckSquare 
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  // Data pengajuan sesuai dengan gambar desain
  const tableData = [
    { nim: '11210001', nama: 'Budi Santoso', perusahaan: 'PT Teknologi Maju', tanggal: '25 Maret 2026', status: 'Menunggu' },
    { nim: '11210002', nama: 'Siti Rahmawati', perusahaan: 'PT Digital Kreatif', tanggal: '25 Maret 2026', status: 'Revisi' },
    { nim: '11210003', nama: 'Ahmad Fauzi', perusahaan: 'PT Inovasi Sistem', tanggal: '24 Maret 2026', status: 'Revisi' },
    { nim: '11210004', nama: 'Dewi Lestari', perusahaan: 'PT Media Online', tanggal: '24 Maret 2026', status: 'Disetujui' },
    { nim: '11210005', nama: 'Rudi Hermawan', perusahaan: 'PT Solusi Digital', tanggal: '23 Maret 2026', status: 'Menunggu' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]';
      case 'Revisi':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]';
      case 'Disetujui':
        return 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F6FA] font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="p-6">
            <h1 className="text-[22px] font-serif font-bold text-[#1E3A8A] tracking-wide">Vokasi Magang</h1>
          </div>
          
          {/* Menu Navigation */}
          <nav className="mt-2 space-y-1 px-4">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#EFF6FF] text-[#1D4ED8] rounded-xl font-semibold text-sm">
              <Home size={18} className="text-[#1D4ED8]" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl font-medium text-sm transition-all">
              <Users size={18} />
              Data Mahasiswa
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl font-medium text-sm transition-all">
              <ClipboardCheck size={18} />
              Verifikasi pendaftaran
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl font-medium text-sm transition-all">
              <FileText size={18} />
              Pengumuman
            </a>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#F1F5F9]">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl font-medium text-sm transition-all">
            <Settings size={18} />
            Settings
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* NAVBAR */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-end px-8 flex-shrink-0">
          <div className="flex items-center gap-6">
            {/* Notification */}
            <button className="text-[#1E3A8A] hover:opacity-80 relative p-1">
              <Bell size={20} className="fill-[#1E3A8A]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
            </button>
            
            {/* Admin Profile */}
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                alt="Profile Admin" 
                className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200"
              />
              <div className="text-sm">
                <p className="font-bold text-[#0F172A] leading-none">Kayla Haniyah</p>
                <p className="text-[#1D4ED8] text-xs font-semibold mt-1">Admin Akademik</p>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTAINER */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header Title */}
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-[#1E3A8A] tracking-tight">Dashboard</h2>
            <p className="text-[#64748B] text-sm mt-1">Kelola verifikasi dan administrasi magang mahasiswa</p>
          </div>

          {/* STATS CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1: Total Mahasiswa */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0">
                <Users size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B]">Total Mahasiswa</p>
                <p className="text-[26px] font-bold text-[#0F172A] leading-tight mt-0.5">234</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">+12 bulan ini</p>
              </div>
            </div>

            {/* Card 2: Menunggu Verifikasi */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EA580C] text-white flex items-center justify-center flex-shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B]">Menunggu Verifikasi</p>
                <p className="text-[26px] font-bold text-[#0F172A] leading-tight mt-0.5">8</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Perlu ditindaklanjuti</p>
              </div>
            </div>

            {/* Card 3: Sedang Magang */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#16A34A] text-white flex items-center justify-center flex-shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B]">Sedang Magang</p>
                <p className="text-[26px] font-bold text-[#0F172A] leading-tight mt-0.5">89</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">38% dari total</p>
              </div>
            </div>

            {/* Card 4: Selesai Magang */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#9333EA] text-white flex items-center justify-center flex-shrink-0">
                <CheckSquare size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B]">Selesai Magang</p>
                <p className="text-[26px] font-bold text-[#0F172A] leading-tight mt-0.5">127</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Semester ini</p>
              </div>
            </div>
          </div>

          {/* DATA TABLE CONTAINER */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            {/* Table Header Action */}
            <div className="p-6 border-b border-[#F1F5F9] flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-[#1D4ED8]">Pengajuan Masuk Terbaru</h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">Daftar pengajuan yang perlu diverifikasi</p>
              </div>
              <button className="px-4 py-2 text-xs font-bold border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-colors">
                Lihat Semua
              </button>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#F1F5F9] text-[#0F172A] font-bold bg-[#FAFBFD]">
                    <th className="p-4 pl-6 text-xs uppercase tracking-wider text-[#64748B]">NIM</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[#64748B]">Nama</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[#64748B]">Perusahaan</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[#64748B]">Tanggal Pengajuan</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[#64748B]">Status Dokumen</th>
                    <th className="p-4 pr-6 text-xs uppercase tracking-wider text-[#64748B] text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
                  {tableData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC]/60 transition-colors">
                      <td className="p-4 pl-6 text-xs font-medium">{item.nim}</td>
                      <td className="p-4 font-bold text-[#0F172A] text-xs">{item.nama}</td>
                      <td className="p-4 text-xs">{item.perusahaan}</td>
                      <td className="p-4 text-xs">{item.tanggal}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 flex gap-2 justify-center items-center">
                        <button className="px-3 py-1.5 text-xs font-bold text-[#475569] border border-[#E2E8F0] rounded-xl hover:bg-gray-50 transition-colors">
                          Detail
                        </button>
                        <button className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F172A] rounded-xl hover:bg-slate-800 transition-colors">
                          Verifikasi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;