// src/pages/Auth/Admin/DataMahasiswa.tsx
import React, { useState } from 'react';

import { Search, Eye, ChevronLeft, ChevronRight, X, Mail, Phone, MapPin, Download } from 'lucide-react';

const DataMahasiswa = () => {
  const [activeMenu, setActiveMenu] = useState('data-mahasiswa');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('semua');
  
  // State untuk Pop Up Modal Detail
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<any>(null);

  // Data diperbarui dengan penambahan field untuk detail
  const mahasiswaData = [
    {
      nim: '11210001',
      nama: 'Budi Santoso',
      prodi: 'Teknik Informatika',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Teknologi Maju',
      status: 'Sedang Magang',
      email: 'budi.santoso@email.com',
      telepon: '081234567890',
      alamat: 'Jakarta Selatan',
      tanggalMulai: '1 Maret 2026',
      tanggalSelesai: '30 Juni 2026'
    },
    {
      nim: '11210002',
      nama: 'Siti Rahmawati',
      prodi: 'Sistem Informasi',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Digital Kreatif',
      status: 'Sedang Magang',
      email: 'siti.rahma@email.com',
      telepon: '082134567891',
      alamat: 'Jakarta Barat',
      tanggalMulai: '15 Februari 2026',
      tanggalSelesai: '15 Agustus 2026'
    },
    {
      nim: '11210003',
      nama: 'Ahmad Fauzi',
      prodi: 'Teknik Informatika',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Inovasi Sistem',
      status: 'Mencari',
      email: 'ahmad.fauzi@email.com',
      telepon: '083134567892',
      alamat: 'Depok',
      tanggalMulai: '-',
      tanggalSelesai: '-'
    },
    {
      nim: '11210004',
      nama: 'Dewi Lestari',
      prodi: 'Teknik Komputer',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Media Online',
      status: 'Selesai',
      email: 'dewi.lestari@email.com',
      telepon: '084134567893',
      alamat: 'Tangerang',
      tanggalMulai: '1 September 2025',
      tanggalSelesai: '1 Maret 2026'
    },
    {
      nim: '11210005',
      nama: 'Rudi Hermawan',
      prodi: 'Sistem Informasi',
      semester: 6,
      ipk: 3.75,
      perusahaan: 'PT Solusi Digital',
      status: 'Mencari',
      email: 'rudi.hermawan@email.com',
      telepon: '085134567894',
      alamat: 'Bekasi',
      tanggalMulai: '-',
      tanggalSelesai: '-'
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

  // Fungsi untuk membuka pop up detail
  const handleDetail = (nim: string) => {
    const student = mahasiswaData.find(m => m.nim === nim);
    setSelectedMahasiswa(student);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup pop up detail
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMahasiswa(null);
  };

  return (
    <
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

      {/* Pop Up / Modal Detail Mahasiswa */}
      {isModalOpen && selectedMahasiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 m-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Detail Mahasiswa</h2>
                <p className="text-sm text-gray-500 mt-1">Informasi lengkap mahasiswa</p>
              </div>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Informasi Pribadi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">NIM</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.nim}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.nama}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedMahasiswa.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telepon</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedMahasiswa.telepon}
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Alamat</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {selectedMahasiswa.alamat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informasi Akademik */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Akademik</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Program Studi</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.prodi}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Semester</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">IPK</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.ipk}</p>
                  </div>
                </div>
              </div>

              {/* Informasi Magang */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Magang</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Perusahaan</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.perusahaan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${getStatusColor(selectedMahasiswa.status)}`}>
                      {selectedMahasiswa.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tanggal Mulai</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.tanggalMulai}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tanggal Selesai</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMahasiswa.tanggalSelesai}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataMahasiswa;