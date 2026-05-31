import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../layouts/AdminLayout';
import { 
  Megaphone, 
  Send, 
  CalendarDays, 
  Users, 
  Plus, 
  SquarePen, 
  Trash2,
  Calendar,
  UsersRound,
  X
} from "lucide-react";

export default function Pengumuman() {
  const [activeMenu, setActiveMenu] = useState('pengumuman');
  const navigate = useNavigate();

  const handleMenuChange = (menuId: string, submenuId?: string) => {
    setActiveMenu(submenuId || menuId);
    const target = submenuId || menuId;
    if (target === 'dashboard') navigate('/admin/dashboard');
    else if (target === 'data-mahasiswa') navigate('/admin/data-mahasiswa');
    else if (target === 'verifikasi-pendaftaran') navigate('/admin/verifikasi-pendaftaran');
    else if (target === 'pengumuman') navigate('/admin/pengumuman');
    else if (target === 'settings') navigate('/admin/settings');
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  // State untuk Data Pengumuman (Sekarang ditambahkan setDataPengumuman)
  const [dataPengumuman, setDataPengumuman] = useState([
    {
      id: 1,
      title: "Perpanjangan Deadline Pendaftaran Magang Semester Genap 2026",
      tag: "Deadline",
      tagColor: "bg-[#FBE9E7] text-[#D32F2F]",
      date: "20 Maret 2026",
      target: "Semua Mahasiswa",
      desc: "Kepada seluruh mahasiswa, kami informasikan bahwa deadline pendaftaran magang untuk semester genap 2026 diperpanjang hingga 31 Maret 2026. Harap segera melengkapi berkas pendaftaran.",
      status: "Dipublikasi",
      stats: "Dibaca oleh 45 mahasiswa"
    },
    {
      id: 2,
      title: "Persyaratan Baru untuk Magang di Perusahaan Luar Negeri",
      tag: "Kebijakan",
      tagColor: "bg-[#F3E5F5] text-[#7B1FA2]",
      date: "18 Maret 2026",
      target: "Semua Mahasiswa",
      desc: "Mulai semester ini, mahasiswa yang ingin magang di perusahaan luar negeri diwajibkan melampirkan sertifikat TOEFL/IELTS dengan skor minimal 500/6.0. Untuk informasi lebih lanjut, hubungi admin akademik.",
      status: "Dipublikasi",
      stats: "Dibaca oleh 45 mahasiswa"
    },
    {
      id: 3,
      title: "Workshop Persiapan Interview Magang",
      tag: "Event",
      tagColor: "bg-[#E3F2FD] text-[#1976D2]",
      date: "15 Maret 2026",
      target: "Mahasiswa Semester 6",
      desc: "Kami akan mengadakan workshop persiapan interview untuk mahasiswa yang akan mengikuti seleksi magang. Workshop akan dilaksanakan pada tanggal 28 Maret 2026 pukul 13.00-16.00 WIB di Ruang Seminar Lt. 3.",
      status: "Dipublikasi",
      stats: "Dibaca oleh 45 mahasiswa"
    }
  ]);

  // State baru untuk menampung input Form Buat Pengumuman
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Deadline');
  const [newTarget, setNewTarget] = useState('Semua Mahasiswa');
  const [newDesc, setNewDesc] = useState('');

  // State untuk mengontrol Pop-Up Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Handler Buka/Tutup Modal
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => {
    // Reset form saat modal ditutup
    setNewTitle('');
    setNewCategory('Deadline');
    setNewTarget('Semua Mahasiswa');
    setNewDesc('');
    setIsCreateModalOpen(false);
  };

  const handleOpenEditModal = (item: any) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setIsEditModalOpen(false);
  };

  return (
    <AdminLayout
      title="Pengumuman"
      breadcrumb={['Pengumuman']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={handleLogout}
    >
      <div className="font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[32px] font-bold text-[#4263AC] tracking-tight leading-tight">Pengumuman</h1>
          <p className="text-[#64748B] text-[15px] mt-1">Kelola pengumuman untuk mahasiswa terkait program magang</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#D0E3F3] hover:bg-[#b8d4eb] text-[#0F172A] px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
          Buat Pengumuman
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#EBF4FA] rounded-xl text-[#3B82F6]">
            <Megaphone className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Total Pengumuman</p>
            {/* Total pengumuman disesuaikan otomatis dengan jumlah data */}
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">{dataPengumuman.length}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#EAF7ED] rounded-xl text-[#22C55E]">
            <Send className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Dipublikasi</p>
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">{dataPengumuman.length}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#FDEAEA] rounded-xl text-[#EF4444]">
            <CalendarDays className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Bulan ini</p>
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">{dataPengumuman.length}</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#F3E8FA] rounded-xl text-[#A855F7]">
            <Users className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Total Pembaca</p>
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">327</h3>
          </div>
        </div>
      </div>

      {/* List Item Pengumuman */}
      <div className="space-y-4">
        {dataPengumuman.map((item) => (
          <div key={item.id} className="bg-white rounded-[16px] border border-gray-200 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] p-6 transition-all hover:shadow-md">
            
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[17px] font-semibold text-[#1E293B]">
                  {item.title}
                </h2>
                <span className={`px-2.5 py-1 text-[12px] font-medium rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleOpenEditModal(item)}
                  className="w-9 h-9 flex items-center justify-center text-[#64748B] hover:text-[#3B82F6] border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <SquarePen className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center text-[#EF4444] hover:text-[#DC2626] border border-gray-200 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Date and Target */}
            <div className="flex items-center gap-4 text-[14px] text-[#64748B] mt-2 mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UsersRound className="w-4 h-4" strokeWidth={1.5} />
                <span>{item.target}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[14px] text-[#475569] leading-relaxed mb-5 pr-4">
              {item.desc}
            </p>

            {/* Divider */}
            <div className="h-[1px] w-full bg-gray-100 mb-4" />

            {/* Footer Row */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-[#EAF7ED] text-[#16A34A] text-[13px] font-medium rounded-md">
                {item.status}
              </span>
              <span className="text-[#94A3B8] text-[13px]">
                {item.stats}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================= */}
      {/* MODAL: BUAT PENGUMUMAN BARU */}
      {/* ========================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Buat Pengumuman Baru</h2>
                <p className="text-xs text-gray-500 mt-1">Buat pengumuman untuk mahasiswa terkait program magang</p>
              </div>
              <button 
                onClick={handleCloseCreateModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Judul Pengumuman</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Tulis judul pengumuman..." 
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Kategori</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option value="Deadline">Deadline</option>
                    <option value="Kebijakan">Kebijakan</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Target Audiens</label>
                  <select 
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option value="Semua Mahasiswa">Semua Mahasiswa</option>
                    <option value="Mahasiswa Semester 6">Mahasiswa Semester 6</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Isi Pengumuman</label>
                <textarea 
                  rows={5}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Tulis isi pengumuman..." 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={handleCloseCreateModal}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  if (!newTitle.trim() || !newDesc.trim()) {
                    alert("Judul dan isi pengumuman wajib diisi!");
                    return;
                  }

                  // Tentukan warna tag berdasarkan kategori yang dipilih
                  let tagColor = "bg-[#FBE9E7] text-[#D32F2F]"; // Default Deadline
                  if (newCategory === "Kebijakan") tagColor = "bg-[#F3E5F5] text-[#7B1FA2]";
                  else if (newCategory === "Event") tagColor = "bg-[#E3F2FD] text-[#1976D2]";

                  // Format tanggal hari ini (Bahasa Indonesia)
                  const formattedDate = new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  });

                  // Struktur objek pengumuman baru
                  const newAnnouncement = {
                    id: Date.now(),
                    title: newTitle,
                    tag: newCategory,
                    tagColor: tagColor,
                    date: formattedDate,
                    target: newTarget,
                    desc: newDesc,
                    status: "Dipublikasi",
                    stats: "Dibaca oleh 0 mahasiswa"
                  };

                  // Masukkan data baru ke baris paling atas layar
                  setDataPengumuman([newAnnouncement, ...dataPengumuman]);

                  alert("Pengumuman Baru Berhasil Dipublikasikan!");
                  handleCloseCreateModal();
                }}
                className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" /> Publikasikan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL: EDIT PENGUMUMAN */}
      {/* ========================================= */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Edit Pengumuman</h2>
                <p className="text-xs text-gray-500 mt-1">Perbarui informasi pengumuman</p>
              </div>
              <button 
                onClick={handleCloseEditModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content (Pre-filled dengan state selectedItem) */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Judul Pengumuman</label>
                <input 
                  type="text" 
                  defaultValue={selectedItem.title}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Kategori</label>
                  <select 
                    defaultValue={selectedItem.tag}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option>Deadline</option>
                    <option>Kebijakan</option>
                    <option>Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Target Audiens</label>
                  <select 
                    defaultValue={selectedItem.target}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option>Semua Mahasiswa</option>
                    <option>Mahasiswa Semester 6</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Isi Pengumuman</label>
                <textarea 
                  rows={5}
                  defaultValue={selectedItem.desc}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={handleCloseEditModal}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  alert("Pengumuman Berhasil Diperbarui!");
                  handleCloseEditModal();
                }}
                className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
              >
                <SquarePen className="w-4 h-4" /> Perbarui Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </AdminLayout>
  );
}