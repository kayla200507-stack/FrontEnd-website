// src/pages/Auth/Admin/DataMahasiswa.tsx
import React, { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { Search, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const DataMahasiswa = () => {
  const [activeMenu, setActiveMenu] = useState('data-mahasiswa');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('semua');

  const mahasiswaData = [
    {
      nim: '11210001',
      nama: 'Budi Santoso',
      prodi: 'Teknik Informatika',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Teknologi Maju',
      status: 'Sedang Magang'
    },
    {
      nim: '11210002',
      nama: 'Siti Rahmawati',
      prodi: 'Sistem Informasi',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Digital Kreatif',
      status: 'Sedang Magang'
    },
    {
      nim: '11210003',
      nama: 'Ahmad Fauzi',
      prodi: 'Teknik Informatika',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Inovasi Sistem',
      status: 'Mencari'
    },
    {
      nim: '11210004',
      nama: 'Dewi Lestari',
      prodi: 'Teknik Komputer',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Media Online',
      status: 'Selesai'
    },
    {
      nim: '11210005',
      nama: 'Rudi Hermawan',
      prodi: 'Sistem Informasi',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Solusi Digital',
      status: 'Mencari'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sedang Magang':
        return 'bg-green-100 text-green-700';
      case 'Mencari':
        return 'bg-yellow-100 text-yellow-700';
      case 'Selesai':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredData = mahasiswaData.filter(mahasiswa => {
    const matchesSearch = mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mahasiswa.nim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'semua' || mahasiswa.status === statusFilter;
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

  return (
    <AdminLayout
      title="Data Mahasiswa"
      breadcrumb={['Data Mahasiswa']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={handleLogout}
    >
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mahasiswa</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola data mahasiswa yang terdaftar dalam program magang</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau NIM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('semua')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'semua'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('Sedang Magang')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'Sedang Magang'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sedang Magang
            </button>
            <button
              onClick={() => setStatusFilter('Mencari')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'Mencari'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mencari
            </button>
            <button
              onClick={() => setStatusFilter('Selesai')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'Selesai'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Daftar Mahasiswa</h2>
          <p className="text-sm text-gray-500 mt-1">Cari dan filter data mahasiswa berdasarkan status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IPK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perusahaan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((mahasiswa, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mahasiswa.nim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mahasiswa.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mahasiswa.prodi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mahasiswa.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mahasiswa.ipk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {mahasiswa.perusahaan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${getStatusColor(mahasiswa.status)}`}>
                      {mahasiswa.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDetail(mahasiswa.nim)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Menampilkan {filteredData.length} dari {mahasiswaData.length} data
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={filteredData.length < 5}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DataMahasiswa;