// src/pages/Auth/Admin/DataMahasiswa.tsx
import React, { useState } from 'react';
import { Search, Eye, Users, TrendingUp, Briefcase, CheckCircle } from 'lucide-react';

const DataMahasiswa = () => {
  const [activeMenu, setActiveMenu] = useState('data-mahasiswa');
  const [searchTerm, setSearchTerm] = useState('');
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

  // Hitung statistik
  const totalMahasiswa = mahasiswaData.length;
  const sedangMagang = mahasiswaData.filter(m => m.status === 'Sedang Magang').length;
  const mencariMagang = mahasiswaData.filter(m => m.status === 'Mencari').length;
  const selesaiMagang = mahasiswaData.filter(m => m.status === 'Selesai').length;

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
    <>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mahasiswa</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola data mahasiswa yang terdaftar dalam program magang</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Mahasiswa */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Total Mahasiswa</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalMahasiswa}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Sedang Magang */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Sedang Magang</p>
              <h3 className="text-3xl font-bold text-gray-800">{sedangMagang}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Mencari Magang */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Mencari Magang</p>
              <h3 className="text-3xl font-bold text-gray-800">{mencariMagang}</h3>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Selesai Magang */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Selesai Magang</p>
              <h3 className="text-3xl font-bold text-gray-800">{selesaiMagang}</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Daftar Mahasiswa</h2>
          <p className="text-sm text-gray-500 mt-1">Cari dan filter data mahasiswa berdasarkan status</p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b">
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

        {/* Table */}
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
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
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

        {/* Footer with count */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            Menampilkan {filteredData.length} dari {mahasiswaData.length} data
          </div>
        </div>
      </div>
    </>
  );
};

export default DataMahasiswa;