// src/pages/Auth/Admin/DataMahasiswa.tsx
import React, { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { 
  Search, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Download 
} from 'lucide-react';

const DataMahasiswa = () => {
  const [activeMenu, setActiveMenu] = useState('data-mahasiswa');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('semua');
  
  // State untuk Pop Up Modal Detail
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<any>(null);

  // Data mahasiswa tetap dipertahankan sesuai milikmu
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

  // 1. Filter Data Berdasarkan Search & Status
  const filteredData = mahasiswaData.filter(mahasiswa => {
    const matchesSearch = mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mahasiswa.nim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'semua' || mahasiswa.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 2. Logika Pagination (5 Data per Halaman)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleMenuChange = (menuId: string, submenuId?: string) => {
    setActiveMenu(menuId);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  // Fungsi membuka pop up detail
  const handleDetail = (nim: string) => {
    const student = mahasiswaData.find(m => m.nim === nim);
    setSelectedMahasiswa(student);
    setIsModalOpen(true);
  };

  // Fungsi menutup pop up detail
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMahasiswa(null);
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset ke halaman 1 saat mengetik
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['semua', 'Sedang Magang', 'Mencari', 'Selesai'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1); // Reset ke halaman 1 saat ganti filter
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? status === 'Sedang Magang' ? 'bg-green-600 text-white' :
                      status === 'Mencari' ? 'bg-yellow-500 text-white' :
                      status === 'Selesai' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
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
              {currentItems.map((mahasiswa, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mahasiswa.nim}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mahasiswa.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mahasiswa.prodi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mahasiswa.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mahasiswa.ipk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mahasiswa.perusahaan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${getStatusColor(mahasiswa.status)}`}>
                      {mahasiswa.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDetail(mahasiswa.nim)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium border border-transparent hover:border-blue-200"
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-sm text-gray-500">
                    Data mahasiswa tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Panel - Sudah Diperbaiki Logikanya */}
        <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-500">
            Menampilkan {currentItems.length} dari {filteredData.length} data
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="flex items-center text-sm font-medium px-2 text-gray-700">
              Halaman {currentPage} dari {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pop Up / Modal Detail Mahasiswa */}
      {isModalOpen && selectedMahasiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden m-4 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Detail Mahasiswa</h2>
                <p className="text-sm text-gray-500 mt-0.5">Informasi lengkap mahasiswa</p>
              </div>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Seksi 1: Informasi Pribadi */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500">NIM</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedMahasiswa.nim}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Nama Lengkap</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedMahasiswa.nama}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5 mt-0.5 truncate">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      {selectedMahasiswa.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Telepon</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      {selectedMahasiswa.telepon}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="text-sm font-medium text-gray-800 flex items-start gap-1.5 mt-0.5">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      {selectedMahasiswa.alamat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seksi 2: Informasi Akademik */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Informasi Akademik</h3>
                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl text-center sm:text-left">
                  <div>
                    <p className="text-xs text-gray-500">Program Studi</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedMahasiswa.prodi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Semester</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedMahasiswa.semester}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">IPK</p>
                    <p className="text-sm font-bold text-blue-600 mt-0.5">{selectedMahasiswa.ipk}</p>
                  </div>
                </div>
              </div>

              {/* Seksi 3: Informasi Magang */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Informasi Magang</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500">Perusahaan</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedMahasiswa.perusahaan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-2.5 py-1 text-xs rounded-full font-semibold ${getStatusColor(selectedMahasiswa.status)}`}>
                      {selectedMahasiswa.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tanggal Mulai</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedMahasiswa.tanggalMulai}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tanggal Selesai</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedMahasiswa.tanggalSelesai}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => alert(`Mengunduh data ${selectedMahasiswa.nama}...`)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Data
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DataMahasiswa;