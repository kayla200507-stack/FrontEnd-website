import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { Card } from "@/components/common/Card";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  Clock4,
  Trash2,
  Edit,
  Briefcase,
  Users,
  X,
  FileText,
  Tag
} from "lucide-react";

interface Lowongan {
  id: number;
  posisi: string;
  perusahaan: string;
  lokasi: string;
  tipe: string;
  kuota: number;
  deadline: string;
  deskripsi: string;
  status: "Aktif" | "Tutup";
}

const INITIAL_LOWONGAN: Lowongan[] = [
  {
    id: 1,
    posisi: "Frontend Developer Intern",
    perusahaan: "PT Teknologi Maju",
    lokasi: "Jakarta (Hybrid)",
    tipe: "Full-time",
    kuota: 3,
    deadline: "2026-06-30",
    deskripsi: "Membantu pengembangan antarmuka aplikasi web menggunakan React dan TailwindCSS.",
    status: "Aktif"
  },
  {
    id: 2,
    posisi: "UI/UX Designer Intern",
    perusahaan: "PT Solusi Digital",
    lokasi: "Bandung (Onsite)",
    tipe: "Full-time",
    kuota: 2,
    deadline: "2026-07-15",
    deskripsi: "Membuat wireframe, prototype, dan desain visual user interface untuk produk mobile.",
    status: "Aktif"
  },
  {
    id: 3,
    posisi: "Data Analyst Intern",
    perusahaan: "Tech Corp Indonesia",
    lokasi: "Jakarta (Remote)",
    tipe: "Part-time",
    kuota: 1,
    deadline: "2026-06-20",
    deskripsi: "Melakukan pembersihan data, visualisasi data, dan penyusunan laporan analisis bulanan.",
    status: "Tutup"
  }
];

export default function AdminLowonganPage() {
  const navigate = useNavigate();
  const [lowonganList, setLowonganList] = useState<Lowongan[]>(INITIAL_LOWONGAN);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"tambah" | "edit">("tambah");
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Form States
  const [posisi, setPosisi] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tipe, setTipe] = useState("Full-time");
  const [kuota, setKuota] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState<"Aktif" | "Tutup">("Aktif");

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const openTambahModal = () => {
    setModalType("tambah");
    setPosisi("");
    setPerusahaan("");
    setLokasi("");
    setTipe("Full-time");
    setKuota(1);
    setDeadline("");
    setDeskripsi("");
    setStatus("Aktif");
    setIsModalOpen(true);
  };

  const openEditModal = (item: Lowongan) => {
    setModalType("edit");
    setCurrentId(item.id);
    setPosisi(item.posisi);
    setPerusahaan(item.perusahaan);
    setLokasi(item.lokasi);
    setTipe(item.tipe);
    setKuota(item.kuota);
    setDeadline(item.deadline);
    setDeskripsi(item.deskripsi);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!posisi || !perusahaan || !lokasi || !deadline || !deskripsi) {
      toast.error("Harap isi semua kolom formulir yang wajib");
      return;
    }

    if (modalType === "tambah") {
      const newItem: Lowongan = {
        id: Date.now(),
        posisi,
        perusahaan,
        lokasi,
        tipe,
        kuota,
        deadline,
        deskripsi,
        status
      };
      setLowonganList([newItem, ...lowonganList]);
      toast.success("Lowongan magang berhasil ditambahkan");
    } else if (modalType === "edit" && currentId !== null) {
      setLowonganList(
        lowonganList.map((item) =>
          item.id === currentId
            ? { ...item, posisi, perusahaan, lokasi, tipe, kuota, deadline, deskripsi, status }
            : item
        )
      );
      toast.success("Lowongan magang berhasil diperbarui");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      setLowonganList(lowonganList.filter((item) => item.id !== id));
      toast.success("Lowongan magang berhasil dihapus");
    }
  };

  // Filter & Search Logic
  const filteredList = lowonganList.filter((item) => {
    const matchesSearch =
      item.posisi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.perusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "Semua" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout onLogout={handleLogout} activeMenu="lowongan-magang">
      <div className="p-2">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#4769B1]">
              Kelola Lowongan Magang
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manajemen penerbitan lowongan magang mahasiswa program vokasi
            </p>
          </div>
          <button
            onClick={openTambahModal}
            className="flex items-center justify-center gap-2 bg-[#4769B1] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#3f5d9f] transition-all shadow-sm shrink-0"
          >
            <Plus size={18} />
            Tambah Lowongan
          </button>
        </div>

        {/* SEARCH & FILTER CARD */}
        <Card className="bg-white border border-[#E5E7EB] rounded-2xl p-5 mb-6 shadow-none">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari posisi magang, nama perusahaan, lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1] transition-all"
              />
            </div>
            <div className="w-full md:w-56">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1] transition-all"
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Status: Aktif</option>
                <option value="Tutup">Status: Tutup</option>
              </select>
            </div>
          </div>
        </Card>

        {/* VACANCY LIST GRID */}
        {filteredList.length === 0 ? (
          <Card className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-none">
            <Briefcase className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-lg font-bold text-gray-700">Tidak ada lowongan ditemukan</h3>
            <p className="text-sm text-gray-400 mt-1">
              Coba sesuaikan kata kunci pencarian atau status filter Anda.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((item) => (
              <Card
                key={item.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-none flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="aspect-square size-12 bg-[#EAF2FF] rounded-xl flex items-center justify-center text-[#4769B1]">
                      <Building2 size={24} />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Aktif"
                          ? "bg-green-50 text-green-600 border border-green-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
                    {item.posisi}
                  </h3>
                  <p className="text-sm font-semibold text-[#4769B1] mt-0.5">
                    {item.perusahaan}
                  </p>

                  <p className="text-xs text-gray-500 mt-3 line-clamp-2 min-h-[32px]">
                    {item.deskripsi}
                  </p>

                  <div className="border-t border-slate-100 my-4"></div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{item.lokasi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Tag size={14} className="text-gray-400" />
                      <span>{item.tipe}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users size={14} className="text-gray-400" />
                      <span>Kuota: {item.kuota} Mahasiswa</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock4 size={14} className="text-gray-400" />
                      <span>Deadline: {item.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-5 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 h-10 border border-[#E5E7EB] hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-600 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center justify-center h-10 w-10 border border-red-100 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAMBAH & EDIT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
              <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
                <h3 className="font-bold text-[#4769B1] text-lg">
                  {modalType === "tambah" ? "Tambah Lowongan Magang" : "Edit Lowongan Magang"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Posisi / Jabatan Magang *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Frontend Developer Intern"
                    value={posisi}
                    onChange={(e) => setPosisi(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Nama Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Teknologi Maju"
                    value={perusahaan}
                    onChange={(e) => setPerusahaan(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Lokasi Kerja *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Jakarta (Hybrid)"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Tipe Pekerjaan
                    </label>
                    <select
                      value={tipe}
                      onChange={(e) => setTipe(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Kontrak</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Kuota (Mahasiswa) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={kuota}
                      onChange={(e) => setKuota(parseInt(e.target.value) || 1)}
                      className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Batas Akhir Pendaftaran (Deadline) *
                    </label>
                    <input
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Deskripsi Pekerjaan / Kriteria *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Sebutkan deskripsi tugas pokok, keahlian yang dibutuhkan, kualifikasi..."
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full p-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Status Lowongan
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === "Aktif"}
                        onChange={() => setStatus("Aktif")}
                        className="text-[#4769B1] focus:ring-[#4769B1]"
                      />
                      <span>Aktif (Dapat Didaftar)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === "Tutup"}
                        onChange={() => setStatus("Tutup")}
                        className="text-[#4769B1] focus:ring-[#4769B1]"
                      />
                      <span>Tutup (Pendaftaran Ditutup)</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 h-11 border border-[#D1D5DB] rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 h-11 bg-[#4769B1] text-white rounded-xl text-sm font-medium hover:bg-[#3f5d9f] transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
