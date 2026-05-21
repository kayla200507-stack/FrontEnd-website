// src/pages/Auth/Admin/Pengumuman.tsx
import React, { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { 
  Megaphone, 
  Calendar, 
  Users, 
  Eye, 
  ChevronRight,
  Clock,
  FileText,
  CheckCircle
} from 'lucide-react';

const Pengumuman = () => {
  const [activeMenu, setActiveMenu] = useState('pengumuman-nav');

  // Hitung statistik
  const totalPengumuman = 4;
  const dipublikasi = 4;
  const bulanIni = 4;
  const totalPembaca = 327;

  const pengumumanData = [
    {
      id: 1,
      judul: 'Perpanjangan Deadline Pendaftaran Magang Semester Genap 2026',
      deadline: '20 Maret 2026',
      target: 'Semua Mahasiswa',
      deskripsi: 'Kepada seluruh mahasiswa, kami informasikan bahwa deadline pendaftaran magang untuk semester genap 2026 diperpanjang hingga 31 Maret 2026. Harap segera melengkapi berkas pendaftaran.',
      pembaca: 'Dibaca oleh 45 mahasiswa'
    },
    {
      id: 2,
      judul: 'Persyaratan Baru untuk Magang di Perusahaan Luar Negeri',
      tanggal: '18 Maret 2026',
      target: 'Semua Mahasiswa',
      deskripsi: 'Mulai semester ini, mahasiswa yang ingin magang di perusahaan luar negeri diwajibkan melampirkan sertifikat TOEFL/IELTS dengan skor minimal 500/6.0. Untuk informasi lebih lanjut, hubungi admin akademik.',
      pembaca: 'Dibaca oleh 45 mahasiswa'
    },
    {
      id: 3,
      judul: 'Workshop Persiapan Interview Magang',
      tanggal: '15 Maret 2026',
      target: 'Mahasiswa Semester 6',
      deskripsi: 'Kami akan mengadakan workshop persiapan interview untuk mahasiswa yang akan mengikuti seleksi magang. Workshop akan dilaksanakan pada tanggal 28 Maret 2026 pukul 13.00-16.00 WIB di Ruang Seminar Lt. 3.',
      pembaca: 'Dibaca oleh 45 mahasiswa'
    }
  ];

  const handleMenuChange = (menuId: string, submenuId?: string) => {
    setActiveMenu(menuId);
    console.log('Menu changed:', menuId, submenuId);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleBuatPengumuman = () => {
    console.log('Buat pengumuman baru');
  };

  return (
    <AdminLayout
      title="Pengumuman"
      breadcrumb={['Pengumuman']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={handleLogout}
    >
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengumuman</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola pengumuman untuk mahasiswa terkait program magang</p>
        </div>
        <button
          onClick={handleBuatPengumuman}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Megaphone className="w-4 h-4" />
          <span className="text-sm font-medium">Buat Pengumuman</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Pengumuman */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Total Pengumuman</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalPengumuman}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dipublikasi */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Dipublikasi</p>
              <h3 className="text-3xl font-bold text-gray-800">{dipublikasi}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Bulan ini */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Bulan ini</p>
              <h3 className="text-3xl font-bold text-gray-800">{bulanIni}</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Total Pembaca */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Total Pembaca</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalPembaca}</h3>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <Eye className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Pengumuman List */}
      <div className="space-y-6">
        {/* Pengumuman 1 - dengan deadline */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {pengumumanData[0].judul}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-red-500" />
                Deadline: {pengumumanData[0].deadline}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-500" />
                Target: {pengumumanData[0].target}
              </span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {pengumumanData[0].deskripsi}
            </p>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Dipublikasi
                </span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {pengumumanData[0].pembaca}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pengumuman 2 & 3 */}
        {pengumumanData.slice(1).map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {item.judul}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {item.tanggal}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  Target: {item.target}
                </span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {item.deskripsi}
              </p>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Dipublikasi
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {item.pembaca}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Pengumuman;