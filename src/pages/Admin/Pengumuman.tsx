import React, { useState } from 'react';
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
  X,
  Loader2
} from "lucide-react";
import { usePengumuman, usePengumumanMutation } from '../../hooks/usePengumuman';
import type { Pengumuman } from '../../services/pengumumanService';

export default function PengumumanPage() {
  const { data: response, isLoading } = usePengumuman();
  
  // Handle different possible response structures defensively
  const responseData = response as any;
  const pengumumanList: Pengumuman[] = Array.isArray(responseData?.data) 
    ? responseData.data 
    : (Array.isArray(responseData?.data?.data) ? responseData.data.data : []);

  const { createPengumuman, updatePengumuman, deletePengumuman, isCreating, isUpdating, isDeleting } = usePengumumanMutation();

  // Create Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Pengumuman['kategori']>('Informasi');
  const [newTarget, setNewTarget] = useState<Pengumuman['target_audience']>('Semua');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState<Pengumuman['status']>('Dipublikasi');

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<Pengumuman['kategori']>('Informasi');
  const [editTarget, setEditTarget] = useState<Pengumuman['target_audience']>('Semua');
  const [editDesc, setEditDesc] = useState('');
  const [editStatus, setEditStatus] = useState<Pengumuman['status']>('Dipublikasi');

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Pengumuman | null>(null);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => {
    setNewTitle('');
    setNewCategory('Informasi');
    setNewTarget('Semua');
    setNewDesc('');
    setNewStatus('Dipublikasi');
    setIsCreateModalOpen(false);
  };

  const handleOpenEditModal = (item: Pengumuman) => {
    setSelectedItem(item);
    setEditTitle(item.judul);
    setEditCategory(item.kategori);
    setEditTarget(item.target_audience);
    setEditDesc(item.isi_pengumuman);
    setEditStatus(item.status);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setIsEditModalOpen(false);
  };

  const handleCreate = () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      alert("Judul dan isi pengumuman wajib diisi!");
      return;
    }
    createPengumuman({
      judul: newTitle,
      kategori: newCategory,
      target_audience: newTarget,
      isi_pengumuman: newDesc,
      status: newStatus,
      tanggal_publish: newStatus === 'Dipublikasi' ? new Date().toISOString() : null,
    }, {
      onSuccess: () => {
        handleCloseCreateModal();
      }
    });
  };

  const handleUpdate = () => {
    if (!selectedItem) return;
    if (!editTitle.trim() || !editDesc.trim()) {
      alert("Judul dan isi pengumuman wajib diisi!");
      return;
    }
    updatePengumuman({
      id: selectedItem.id_pengumuman,
      payload: {
        judul: editTitle,
        kategori: editCategory,
        target_audience: editTarget,
        isi_pengumuman: editDesc,
        status: editStatus,
        tanggal_publish: editStatus === 'Dipublikasi' && selectedItem.status !== 'Dipublikasi' 
          ? new Date().toISOString() 
          : selectedItem.tanggal_publish,
      }
    }, {
      onSuccess: () => {
        handleCloseEditModal();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      deletePengumuman(id);
    }
  };

  const totalPengumuman = pengumumanList.length;
  const dipublikasiCount = pengumumanList.filter(p => p.status === 'Dipublikasi').length;
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const bulanIniCount = pengumumanList.filter(p => {
    const d = new Date(p.created_at || p.tanggal_publish || currentDate.getTime());
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const getTagColor = (kategori: string) => {
    switch(kategori) {
      case 'Deadline': return "bg-[#FBE9E7] text-[#D32F2F]";
      case 'Kebijakan': return "bg-[#F3E5F5] text-[#7B1FA2]";
      case 'Informasi': return "bg-[#E3F2FD] text-[#1976D2]";
      default: return "bg-[#F3E8FA] text-[#A855F7]";
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <>
      <div className="font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[32px] font-bold text-[#4263AC] tracking-tight leading-tight">Pengumuman</h1>
          <p className="text-[#64748B] text-[15px] mt-1">Kelola pengumuman untuk mahasiswa terkait program magang</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          disabled={isCreating}
          className="flex items-center gap-2 bg-[#D0E3F3] hover:bg-[#b8d4eb] text-[#0F172A] px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-colors shadow-sm disabled:opacity-50"
        >
          {isCreating ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />}
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
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">{isLoading ? '-' : totalPengumuman}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#EAF7ED] rounded-xl text-[#22C55E]">
            <Send className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Dipublikasi</p>
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">{isLoading ? '-' : dipublikasiCount}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#FDEAEA] rounded-xl text-[#EF4444]">
            <CalendarDays className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Bulan ini</p>
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">{isLoading ? '-' : bulanIniCount}</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 h-[100px]">
          <div className="w-12 h-12 flex items-center justify-center bg-[#F3E8FA] rounded-xl text-[#A855F7]">
            <Users className="w-[22px] h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] text-[#64748B]">Total Pembaca</p>
            <h3 className="text-[26px] font-bold text-[#0F172A] leading-none mt-1">-</h3>
          </div>
        </div>
      </div>

      {/* List Item Pengumuman */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#4263AC]" />
        </div>
      ) : pengumumanList.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Megaphone className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-[18px] font-semibold text-gray-800 mb-1">Belum Ada Pengumuman</h3>
          <p className="text-[14px] text-gray-500">Klik "Buat Pengumuman" untuk menambahkan data baru.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pengumumanList.map((item) => (
            <div key={item.id_pengumuman} className="bg-white rounded-[16px] border border-gray-200 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] p-6 transition-all hover:shadow-md">
              
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-[17px] font-semibold text-[#1E293B]">
                    {item.judul}
                  </h2>
                  <span className={`px-2.5 py-1 text-[12px] font-medium rounded-full ${getTagColor(item.kategori)}`}>
                    {item.kategori}
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
                  <button 
                    onClick={() => handleDelete(item.id_pengumuman)}
                    disabled={isDeleting}
                    className="w-9 h-9 flex items-center justify-center text-[#EF4444] hover:text-[#DC2626] border border-gray-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Date and Target */}
              <div className="flex items-center gap-4 text-[14px] text-[#64748B] mt-2 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>{item.tanggal_publish ? formatDate(item.tanggal_publish) : formatDate(item.created_at)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UsersRound className="w-4 h-4" strokeWidth={1.5} />
                  <span>{item.target_audience}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] text-[#475569] leading-relaxed mb-5 pr-4 whitespace-pre-wrap">
                {item.isi_pengumuman}
              </p>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gray-100 mb-4" />

              {/* Footer Row */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-[13px] font-medium rounded-md ${
                  item.status === 'Dipublikasi' ? 'bg-[#EAF7ED] text-[#16A34A]' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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
                <p className="text-xs text-gray-500 mt-1">Buat pengumuman untuk mahasiswa atau dosen</p>
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
                    onChange={(e) => setNewCategory(e.target.value as Pengumuman['kategori'])}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option value="Deadline">Deadline</option>
                    <option value="Kebijakan">Kebijakan</option>
                    <option value="Informasi">Informasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Target Audiens</label>
                  <select 
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value as Pengumuman['target_audience'])}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Status</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Pengumuman['status'])}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  <option value="Dipublikasi">Dipublikasi</option>
                  <option value="Draft">Draft</option>
                </select>
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
                disabled={isCreating}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={handleCreate}
                disabled={isCreating}
                className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50"
              >
                {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Simpan
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

            {/* Form Content */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Judul Pengumuman</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Kategori</label>
                  <select 
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as Pengumuman['kategori'])}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option value="Deadline">Deadline</option>
                    <option value="Kebijakan">Kebijakan</option>
                    <option value="Informasi">Informasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Target Audiens</label>
                  <select 
                    value={editTarget}
                    onChange={(e) => setEditTarget(e.target.value as Pengumuman['target_audience'])}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Status</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Pengumuman['status'])}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  <option value="Dipublikasi">Dipublikasi</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Isi Pengumuman</label>
                <textarea 
                  rows={5}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={handleCloseEditModal}
                disabled={isUpdating}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <SquarePen className="w-4 h-4" />} Perbarui
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </>
  );
}
