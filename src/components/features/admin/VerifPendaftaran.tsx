// src/pages/Auth/Admin/VerifikasiPendaftaran.tsx
import React, { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileCheck,
  Filter,
  RotateCcw,
  Users,
  UserCheck,
  UserX,
  Hourglass
} from 'lucide-react';

const VerifikasiPendaftaran = () => {
  const [activeMenu, setActiveMenu] = useState('verifikasi-pendaftaran');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');

  const pengajuanData = [
    {
      nim: '11210001',
      nama: 'Budi Santoso',
      perusahaan: 'PT Teknologi Maju',
      posisi: 'Frontend Developer Intern',
      ipk: 3.75,
      tanggal: '25 Maret 2026',
      status: 'Menunggu'
    },
    {
      nim: '11210002',
      nama: 'Siti Rahmawati',
      perusahaan: 'PT Digital Kreatif',
      posisi: 'UI/UX Designer Intern',
      ipk: 3.68,
      tanggal: '25 Maret 2026',
      status: 'Menunggu'
    },
    {
      nim: '11210003',
      nama: 'Ahmad Fauzi',
      perusahaan: 'PT Inovasi Sistem',
      posisi: 'Backend Developer Intern',
      ipk: 3.85,
      tanggal: '24 Maret 2026',
      status: 'Menunggu'
    },
    {
      nim: '11210004',
      nama: 'Dewi Lestari',
      perusahaan: 'PT Media Online',
      posisi: 'Data Analyst Intern',
      ipk: 3.52,
      tanggal: '24 Maret 2026',
      status: 'Disetujui'
    },
    {
      nim: '11210005',
      nama: 'Rudi Hermawan',
      perusahaan: 'PT Solusi Digital',
      posisi: 'Mobile Developer Intern',
      ipk: 2.95,
      tanggal: '23 Maret 2026',
      status: 'Ditolak'
    }
  ];

  // Hitung statistik
  const totalPengajuan = pengajuanData.length;
  const menunggu = pengajuanData.filter(p => p.status === 'Menunggu').length;
  const disetujui = pengajuanData.filter(p => p.status === 'Disetujui').length;
  const ditolak = pengajuanData.filter(p => p.status === 'Ditolak').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-700';
      case 'Disetujui':
        return 'bg-green-100 text-green-700';
      case 'Ditolak':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return <Clock className="w-3 h-3 mr-1" />;
      case 'Disetujui':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'Ditolak':
        return <XCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const filteredData = pengajuanData.filter(pengajuan => {
    const matchesSearch = pengajuan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pengajuan.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pengajuan.posisi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'semua' || pengajuan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMenuChange = (menuId: string, submenuId?: string) => {
    setActiveMenu(menuId);
    console.log('Menu changed:', menuId, submenuId);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleDetail = (nim: string) => {
    console.log('Detail mahasiswa:', nim);
  };

  const handleVerifikasi = (nim: string) => {
    console.log('Verifikasi mahasiswa:', nim);
  };

  const handleResetFilter = () => {
    setSearchTerm('');
    setStatusFilter('semua');
  };

  return (
    <AdminLayout
      title="Verifikasi Pendaftaran"
      breadcrumb={['Data Mahasiswa', 'Verifikasi Pendaftaran']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={handleLogout}
    >
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Verifikasi Pendaftaran</h1>
        <p className="text-sm text-gray-500 mt-1">Validasi kelengkapan berkas dan syarat akademik mahasiswa</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Pengajuan */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Total Pengajuan</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalPengajuan}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Menunggu */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Menunggu</p>
              <h3 className="text-3xl font-bold text-gray-800">{menunggu}</h3>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <Hourglass className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Disetujui */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Disetujui</p>
              <h3 className="text-3xl font-bold text-gray-800">{disetujui}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Ditolak */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Ditolak</p>
              <h3 className="text-3xl font-bold text-gray-800">{ditolak}</h3>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <UserX className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Posisi atau Perusahaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Menampilkan {filteredData.length} dari {pengajuanData.length} Pengajuan
            </div>
            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Daftar Pengajuan Pendaftaran</h2>
          <p className="text-sm text-gray-500 mt-1">Klik "Verifikasi" untuk memeriksa kelengkapan dokumen dan syarat akademik</p>
        </div>

        {/* Filter Status Buttons */}
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('semua')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'semua'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('Menunggu')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'Menunggu'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Menunggu
            </button>
            <button
              onClick={() => setStatusFilter('Disetujui')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'Disetujui'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Disetujui
            </button>
            <button
              onClick={() => setStatusFilter('Ditolak')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'Ditolak'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ditolak
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perusahaan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IPK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((pengajuan, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pengajuan.nim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {pengajuan.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {pengajuan.perusahaan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {pengajuan.posisi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {pengajuan.ipk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {pengajuan.tanggal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-medium ${getStatusColor(pengajuan.status)}`}>
                      {getStatusIcon(pengajuan.status)}
                      {pengajuan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDetail(pengajuan.nim)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Detail
                      </button>
                      <button
                        onClick={() => handleVerifikasi(pengajuan.nim)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Verifikasi
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Status:</span>
            <span className="inline-flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              Menunggu
            </span>
            <span className="inline-flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Disetujui
            </span>
            <span className="inline-flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              Ditolak
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VerifikasiPendaftaran;