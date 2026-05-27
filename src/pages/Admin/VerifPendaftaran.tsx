// src/pages/Auth/Admin/VerifPendaftaran.tsx
import React, { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { 
  FileText, 
  CircleAlert, 
  CheckCircle, 
  XCircle, 
  ChevronDown,
  Search,
  X,
  Check,
  Eye
} from "lucide-react";

export default function VerifPendaftaranPage() {
  const [activeMenu, setActiveMenu] = useState('verifikasi-pendaftaran');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // State untuk Pop-Up Modal Verifikasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPendaftaran, setSelectedPendaftaran] = useState<any>(null);
  const [catatanPenolakan, setCatatanPenolakan] = useState('');

  // Data ditingkatkan nilainya dengan menyertakan berkas lampiran & semester sesuai gambar mockup
  const tableData = [
    {
      nim: "11210001",
      nama: "Budi Santoso",
      perusahaan: "PT Teknologi Maju",
      posisi: "Frontend Developer Intern",
      ipk: 3.75,
      semester: 6,
      tanggal: "25 Maret 2026",
      status: "Menunggu",
      fileTranskrip: "transkrip_11210001.pdf",
      fileCv: "cv_budi_santoso.pdf",
      fileSuratIzin: "surat_izin_11210001.pdf"
    },
    {
      nim: "11210002",
      nama: "Siti Rahmawati",
      perusahaan: "PT Digital Kreatif",
      posisi: "UI/UX Designer Intern",
      ipk: 3.68,
      semester: 6,
      tanggal: "25 Maret 2026",
      status: "Menunggu",
      fileTranskrip: "transkrip_11210002.pdf",
      fileCv: "cv_siti_rahmawati.pdf",
      fileSuratIzin: "surat_izin_11210002.pdf"
    },
    {
      nim: "11210003",
      nama: "Ahmad Fauzi",
      perusahaan: "PT Inovasi Sistem",
      posisi: "Backend Developer Intern",
      ipk: 3.85,
      semester: 6,
      tanggal: "24 Maret 2026",
      status: "Menunggu",
      fileTranskrip: "transkrip_11210003.pdf",
      fileCv: "cv_ahmad_fauzi.pdf",
      fileSuratIzin: "surat_izin_11210003.pdf"
    },
    {
      nim: "11210004",
      nama: "Dewi Lestari",
      perusahaan: "PT Media Online",
      posisi: "Data Analyst Intern",
      ipk: 3.52,
      semester: 6,
      tanggal: "24 Maret 2026",
      status: "Disetujui",
      fileTranskrip: "transkrip_11210004.pdf",
      fileCv: "cv_dewi_lestari.pdf",
      fileSuratIzin: "surat_izin_11210004.pdf"
    },
    {
      nim: "11210005",
      nama: "Rudi Hermawan",
      perusahaan: "PT Solusi Digital",
      posisi: "Mobile Developer Intern",
      ipk: 2.95,
      semester: 6,
      tanggal: "23 Maret 2026",
      status: "Ditolak",
      fileTranskrip: "transkrip_11210005.pdf",
      fileCv: "cv_rudi_hermawan.pdf",
      fileSuratIzin: "surat_izin_11210005.pdf"
    },
  ];

  // Hitung akumulasi statistik secara dinamis
  const totalPengajuan = tableData.length;
  const menungguCount = tableData.filter(d => d.status === "Menunggu").length;
  const disetujuiCount = tableData.filter(d => d.status === "Disetujui").length;
  const ditolakCount = tableData.filter(d => d.status === "Ditolak").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Menunggu":
        return "bg-[#FFF3E0] text-[#D97706] border border-[#FDE68A]";
      case "Disetujui":
        return "bg-[#EAF7ED] text-[#16A34A] border border-[#BBE5C3]";
      case "Ditolak":
        return "bg-[#FDEAEA] text-[#DC2626] border border-[#FECACA]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Handler Filter & Search
  const filteredData = tableData.filter(item => {
    const matchesSearch = item.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.nim.includes(searchTerm);
    const matchesStatus = statusFilter === "Semua Status" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Fungsi navigasi menu layout
  const handleMenuChange = (menuId: string) => {
    setActiveMenu(menuId);
  };

  // Fungsi pemicu modal verifikasi
  const handleOpenVerifikasi = (mahasiswa: any) => {
    setSelectedPendaftaran(mahasiswa);
    setCatatanPenolakan('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPendaftaran(null);
  };

  // Simulasi Aksi Form Verifikasi
  const handleSetujui = () => {
    alert(`Pendaftaran ${selectedPendaftaran.nama} Berhasil DISETUJUI!`);
    handleCloseModal();
  };

  const handleTolak = () => {
    if (!catatanPenolakan.trim()) {
      alert('Harap isi catatan penolakan terlebih dahulu.');
      return;
    }
    alert(`Pendaftaran ${selectedPendaftaran.nama} telah DITOLAK dengan alasan: ${catatanPenolakan}`);
    handleCloseModal();
  };

  return (
    <AdminLayout
      title="Verifikasi Pendaftaran"
      breadcrumb={['Verifikasi Pendaftaran']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={() => console.log('Logout')}
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#4263AC] tracking-tight leading-tight">
          Verifikasi Pendaftaran
        </h1>
        <p className="text-[#64748B] text-[15px] mt-1">
          Validasi kelengkapan berkas dan syarat akademik mahasiswa
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 h-[110px]">
          <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#EBF4FA] rounded-xl text-[#3B82F6]">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#64748B]">Total Pengajuan</p>
            <h3 className="text-[28px] font-bold text-[#0F172A] leading-tight">{totalPengajuan}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 h-[110px]">
          <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#FFF3E0] rounded-xl text-[#F97316]">
            <CircleAlert className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#64748B]">Menunggu</p>
            <h3 className="text-[28px] font-bold text-[#0F172A] leading-tight">{menungguCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 h-[110px]">
          <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#EAF7ED] rounded-xl text-[#22C55E]">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#64748B]">Disetujui</p>
            <h3 className="text-[28px] font-bold text-[#0F172A] leading-tight">{disetujuiCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 h-[110px]">
          <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#FDEAEA] rounded-xl text-[#EF4444]">
            <XCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#64748B]">Ditolak</p>
            <h3 className="text-[28px] font-bold text-[#0F172A] leading-tight">{ditolakCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari Posisi atau Perusahaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors font-medium placeholder:text-gray-400"
            />
          </div>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-[14px] font-medium rounded-lg px-4 py-2.5 pr-10 outline-none hover:bg-gray-100 cursor-pointer min-w-[160px]"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-gray-500 font-medium">
            Menampilkan {filteredData.length} dari {tableData.length} Pengajuan
          </span>
          <button 
            onClick={() => { setSearchTerm(''); setStatusFilter('Semua Status'); }}
            className="text-[14px] font-medium border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#3B62A4]">
            Daftar Pengajuan Pendaftaran
          </h2>
          <p className="text-[14px] text-gray-500 mt-1">
            Klik "Verifikasi" untuk memeriksa kelengkapan dokumen dan syarat akademik
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100 w-[100px]">NIM</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100">Nama</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100">Perusahaan</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100 w-[200px]">Posisi</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100">IPK</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100">Tanggal</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100">Status</th>
                <th className="py-4 px-4 text-[13px] font-bold text-gray-700 border-b border-gray-100 text-center w-[180px]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-4 text-[14px] text-gray-600 border-b border-gray-100">{row.nim}</td>
                  <td className="py-5 px-4 text-[14px] font-semibold text-gray-800 border-b border-gray-100">{row.nama}</td>
                  <td className="py-5 px-4 text-[14px] text-gray-600 border-b border-gray-100">{row.perusahaan}</td>
                  <td className="py-5 px-4 text-[13px] text-gray-600 border-b border-gray-100 pr-4 leading-snug w-[200px]">
                    {row.posisi}
                  </td>
                  <td className={`py-5 px-4 text-[14px] font-semibold border-b border-gray-100 ${row.ipk >= 3.0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {row.ipk.toFixed(2)}
                  </td>
                  <td className="py-5 px-4 text-[14px] text-gray-600 border-b border-gray-100">{row.tanggal}</td>
                  <td className="py-5 px-4 border-b border-gray-100">
                    <span className={`px-3 py-1 text-[12px] font-semibold rounded-full ${getStatusBadge(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => alert(`Detail mahasiswa: ${row.nama}`)}
                        className="px-4 py-1.5 text-[13px] font-medium border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Detail
                      </button>
                      <button 
                        onClick={() => handleOpenVerifikasi(row)}
                        className="px-4 py-1.5 text-[13px] font-medium bg-[#0F172A] text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                      >
                        Verifikasi
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================= */}
      {/* POP-UP MODAL VERIFIKASI PENDAFTARAN MAHASISWA */}
      {/* ========================================= */}
      {isModalOpen && selectedPendaftaran && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Verifikasi Pendaftaran Mahasiswa</h2>
                <p className="text-xs text-gray-500 mt-0.5">Periksa kelengkapan berkas dan syarat akademik</p>
              </div>
              <button 
                onClick={handleCloseModal} 
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Grid Profil Singkat */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Nama</p>
                  <p className="font-bold text-gray-800 mt-0.5">{selectedPendaftaran.nama}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">NIM</p>
                  <p className="font-bold text-gray-800 mt-0.5">{selectedPendaftaran.nim}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Perusahaan</p>
                  <p className="font-semibold text-gray-700 mt-0.5">{selectedPendaftaran.perusahaan}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Posisi</p>
                  <p className="font-semibold text-gray-700 mt-0.5">{selectedPendaftaran.posisi}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">IPK</p>
                  <p className={`font-bold mt-0.5 ${selectedPendaftaran.ipk >= 3.0 ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedPendaftaran.ipk.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Semester</p>
                  <p className="font-semibold text-gray-700 mt-0.5">{selectedPendaftaran.semester}</p>
                </div>
              </div>

              {/* Box Biru: Pengecekan Syarat Akademik */}
              <div className="bg-[#F0F6FF] border border-[#D4E5FF] rounded-xl p-4 space-y-2.5">
                <h4 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Pengecekan Syarat Akademik
                </h4>
                <div className="space-y-2 text-sm font-medium text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>IPK minimal 3.0</span>
                    {selectedPendaftaran.ipk >= 3.0 ? (
                      <CheckCircle className="w-4 h-4 text-green-600 fill-green-50" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 fill-red-50" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Semester minimal 6</span>
                    {selectedPendaftaran.semester >= 6 ? (
                      <CheckCircle className="w-4 h-4 text-green-600 fill-green-50" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 fill-red-50" />
                    )}
                  </div>
                </div>
              </div>

              {/* Seksi Berkas Dokumen */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Dokumen Lampiran
                </h4>
                
                {/* File 1: Transkrip */}
                <div className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="max-w-[280px] sm:max-w-xs">
                      <p className="text-xs font-semibold text-gray-800">Transkrip Nilai</p>
                      <p className="text-[11px] text-gray-400 truncate">{selectedPendaftaran.fileTranskrip}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Membuka berkas: ${selectedPendaftaran.fileTranskrip}`)}
                    className="px-3 py-1 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>

                {/* File 2: CV */}
                <div className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="max-w-[280px] sm:max-w-xs">
                      <p className="text-xs font-semibold text-gray-800">Curriculum Vitae</p>
                      <p className="text-[11px] text-gray-400 truncate">{selectedPendaftaran.fileCv}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Membuka berkas: ${selectedPendaftaran.fileCv}`)}
                    className="px-3 py-1 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>

                {/* File 3: Surat Izin */}
                <div className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="max-w-[280px] sm:max-w-xs">
                      <p className="text-xs font-semibold text-gray-800">Surat Izin Magang</p>
                      <p className="text-[11px] text-gray-400 truncate">{selectedPendaftaran.fileSuratIzin}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Membuka berkas: ${selectedPendaftaran.fileSuratIzin}`)}
                    className="px-3 py-1 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>
              </div>

              {/* Textarea Catatan Penolakan */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Catatan Penolakan (Jika ditolak)
                </h4>
                <textarea
                  rows={2}
                  placeholder="Berikan alasan penolakan jika tidak memenuhi syarat..."
                  value={catatanPenolakan}
                  onChange={(e) => setCatatanPenolakan(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 outline-none focus:border-red-400 transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-2.5">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 bg-white rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleTolak}
                className="px-4 py-2 border border-red-200 text-red-600 bg-white rounded-xl text-sm font-semibold flex items-center gap-1.5 hover:bg-red-50 transition-colors"
              >
                <XCircle className="w-4 h-4" /> Tolak Pendaftaran
              </button>
              <button
                onClick={handleSetujui}
                className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 hover:bg-gray-800 transition-colors shadow-sm"
              >
                <Check className="w-4 h-4" /> Setujui Pendaftaran
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}