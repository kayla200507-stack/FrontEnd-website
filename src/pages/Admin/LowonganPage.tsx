import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
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
  Tag,
} from "lucide-react";
import { useLowongan, useLowonganMutation } from "../../hooks/useLowongan";
import type { Lowongan } from "../../services/lowonganService";

export default function AdminLowonganPage() {
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useLowongan();
  const lowonganList = response?.data || [];

  const {
    createLowongan,
    updateLowongan,
    deleteLowongan,
    isCreating,
    isUpdating,
  } = useLowonganMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"tambah" | "edit">("tambah");
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [id_kategori, setIdKategori] = useState<number>(1);
  const [judul, setJudul] = useState("");
  const [nama_perusahaan, setNamaPerusahaan] = useState("");
  const [bidang_perusahaan, setBidangPerusahaan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tipe_pekerjaan, setTipePekerjaan] = useState<
    "Full Time" | "Part Time" | "Freelance"
  >("Full Time");
  const [penempatan, setPenempatan] = useState<"WFO" | "WFH" | "Hybrid">("WFO");
  const [durasi, setDurasi] = useState("");
  const [kuota, setKuota] = useState<number | "">("");
  const [deskripsi_singkat, setDeskripsiSingkat] = useState("");
  const [deskripsi_pekerjaan, setDeskripsiPekerjaan] = useState("");
  const [kualifikasi, setKualifikasi] = useState("");
  const [benefit, setBenefit] = useState("");
  const [skills, setSkills] = useState("");
  const [batas_lamaran, setBatasLamaran] = useState("");
  const [mulai_magang, setMulaiMagang] = useState("");
  const [status_lowongan, setStatusLowongan] = useState<
    "draft" | "active" | "closed"
  >("active");

  const resetForm = () => {
    setIdKategori(1);
    setJudul("");
    setNamaPerusahaan("");
    setBidangPerusahaan("");
    setLokasi("");
    setTipePekerjaan("Full Time");
    setPenempatan("WFO");
    setDurasi("");
    setKuota("");
    setDeskripsiSingkat("");
    setDeskripsiPekerjaan("");
    setKualifikasi("");
    setBenefit("");
    setSkills("");
    setBatasLamaran("");
    setMulaiMagang("");
    setStatusLowongan("active");
  };

  const openTambahForm = () => {
    resetForm();
    setModalType("tambah");
    setIsModalOpen(true);
  };

  const openEditModal = (item: Lowongan) => {
    setModalType("edit");
    setCurrentId(item.id_lowongan);
    setIdKategori(item.id_kategori);
    setJudul(item.judul);
    setNamaPerusahaan(item.nama_perusahaan);
    setBidangPerusahaan(item.bidang_perusahaan);
    setLokasi(item.lokasi);
    setTipePekerjaan(item.tipe_pekerjaan);
    setPenempatan(item.penempatan);
    setDurasi(item.durasi);
    setKuota(item.kuota);
    setDeskripsiSingkat(item.deskripsi_singkat || "");
    setDeskripsiPekerjaan(item.deskripsi_pekerjaan || "");
    setKualifikasi(item.kualifikasi || "");
    setBenefit(item.benefit || "");
    setSkills(item.skills ? item.skills.join(", ") : "");
    setBatasLamaran(item.batas_lamaran ? item.batas_lamaran.split("T")[0] : "");
    setMulaiMagang(item.mulai_magang ? item.mulai_magang.split("T")[0] : "");
    setStatusLowongan(item.status_lowongan);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !judul ||
      !nama_perusahaan ||
      !bidang_perusahaan ||
      !lokasi ||
      !durasi ||
      !batas_lamaran ||
      !kuota
    ) {
      toast.error("Harap isi semua kolom formulir yang wajib");
      return;
    }

    const payload = {
      id_kategori,
      judul,
      nama_perusahaan,
      bidang_perusahaan,
      lokasi,
      tipe_pekerjaan,
      penempatan,
      durasi,
      kuota: Number(kuota),
      deskripsi_singkat,
      deskripsi_pekerjaan,
      kualifikasi,
      benefit,
      skills: skills
        ? skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        : [],
      batas_lamaran,
      mulai_magang,
      status_lowongan,
    };

    if (modalType === "tambah") {
      createLowongan(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
          resetForm();
        },
      });
    } else if (modalType === "edit" && currentId !== null) {
      updateLowongan(
        { id: currentId, payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            resetForm();
          },
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      deleteLowongan(id);
    }
  };

  const filteredList = lowonganList.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_perusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "Semua" ||
      item.status_lowongan.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
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
          onClick={openTambahForm}
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
              placeholder="Cari judul lowongan, nama perusahaan, lokasi..."
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
              <option value="active">Status: Active</option>
              <option value="draft">Status: Draft</option>
              <option value="closed">Status: Closed</option>
            </select>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4769B1]"></div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 my-10">
          Gagal memuat data lowongan.
        </div>
      ) : filteredList.length === 0 ? (
        <Card className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-none">
          <Briefcase className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-gray-700">
            Tidak ada lowongan ditemukan
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Coba sesuaikan kata kunci pencarian atau status filter Anda.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <Card
              key={item.id_lowongan}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-none flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="aspect-square size-12 bg-[#EAF2FF] rounded-xl flex items-center justify-center text-[#4769B1]">
                    <Building2 size={24} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status_lowongan === "active"
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : item.status_lowongan === "draft"
                        ? "bg-yellow-50 text-yellow-600 border border-yellow-100"
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}
                  >
                    {item.status_lowongan.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
                  {item.judul}
                </h3>
                <p className="text-sm font-semibold text-[#4769B1] mt-0.5">
                  {item.nama_perusahaan}
                </p>

                <p className="text-xs text-gray-500 mt-3 line-clamp-2 min-h-[32px]">
                  {item.deskripsi_singkat || item.deskripsi_pekerjaan || "Tidak ada deskripsi."}
                </p>

                <div className="border-t border-slate-100 my-4"></div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{item.lokasi} ({item.penempatan})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Tag size={14} className="text-gray-400" />
                    <span>{item.tipe_pekerjaan}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users size={14} className="text-gray-400" />
                    <span>Kuota: {item.kuota} Mahasiswa</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock4 size={14} className="text-gray-400" />
                    <span>
                      Deadline: {new Date(item.batas_lamaran).toLocaleDateString("id-ID")}
                    </span>
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
                  onClick={() => handleDelete(item.id_lowongan)}
                  className="flex items-center justify-center h-10 w-10 border border-red-100 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="font-bold text-[#4769B1] text-lg">
                {modalType === "tambah"
                  ? "Tambah Lowongan Magang"
                  : "Edit Lowongan Magang"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 max-h-[75vh] overflow-y-auto space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Judul Lowongan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Frontend Developer Intern"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Kategori ID *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={id_kategori}
                    onChange={(e) => setIdKategori(parseInt(e.target.value) || 1)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Nama Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Teknologi Maju"
                    value={nama_perusahaan}
                    onChange={(e) => setNamaPerusahaan(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Bidang Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Technology, Finance..."
                    value={bidang_perusahaan}
                    onChange={(e) => setBidangPerusahaan(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Lokasi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jakarta"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Tipe Pekerjaan *
                  </label>
                  <select
                    value={tipe_pekerjaan}
                    onChange={(e) => setTipePekerjaan(e.target.value as any)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Penempatan *
                  </label>
                  <select
                    value={penempatan}
                    onChange={(e) => setPenempatan(e.target.value as any)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  >
                    <option value="WFO">WFO</option>
                    <option value="WFH">WFH</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Durasi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 3 Bulan"
                    value={durasi}
                    onChange={(e) => setDurasi(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Kuota *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={kuota}
                    onChange={(e) => setKuota(parseInt(e.target.value) || "")}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Batas Lamaran *
                  </label>
                  <input
                    type="date"
                    required
                    value={batas_lamaran}
                    onChange={(e) => setBatasLamaran(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Mulai Magang
                  </label>
                  <input
                    type="date"
                    value={mulai_magang}
                    onChange={(e) => setMulaiMagang(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  placeholder="Ringkasan lowongan..."
                  value={deskripsi_singkat}
                  onChange={(e) => setDeskripsiSingkat(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Deskripsi Pekerjaan
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail tugas dan tanggung jawab..."
                  value={deskripsi_pekerjaan}
                  onChange={(e) => setDeskripsiPekerjaan(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Kualifikasi
                </label>
                <textarea
                  rows={3}
                  placeholder="Syarat dan kualifikasi pelamar..."
                  value={kualifikasi}
                  onChange={(e) => setKualifikasi(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Benefit
                </label>
                <textarea
                  rows={2}
                  placeholder="Keuntungan yang didapat..."
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Skills (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: React, Node.js, TypeScript"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Status Lowongan
                  </label>
                  <select
                    value={status_lowongan}
                    onChange={(e) => setStatusLowongan(e.target.value as any)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#4769B1]/20 focus:border-[#4769B1]"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 h-11 border border-[#E5E7EB] bg-white text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 h-11 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50"
                >
                  {isCreating || isUpdating
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
