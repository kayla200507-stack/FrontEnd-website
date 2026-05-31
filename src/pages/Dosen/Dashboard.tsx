import StatusCard from "../../components/features/dosen/StatusCard";
import DashboardHeader from "../../components/features/dosen/DashboardHeader";
import {
  LaporanCard,
  type LaporanCardProps,
} from "../../components/features/dosen/LaporanCard";
import { Card } from "@/components/common/Card";

export const laporanData: LaporanCardProps[] = [
  {
    title: "Laporan Akhir Magang Sistem Informasi Akademik",
    studentName: "Ahmad Fauzi",
    studentId: "22051204001",
    companyName: "PT Teknologi Nusantara",
    jobRole: "Frontend Developer",
    submitDate: "20 Mei 2026",
    lectureFeedback:
      "Laporan sudah cukup baik dan sistematis. Perbaiki bagian metodologi serta tambahkan referensi terbaru.",
    filePageCount: 87,
    fileSize: 4.2,
    status: "approved",
  },
  {
    title: "Laporan Magang Pengembangan Website Perusahaan",
    studentName: "Siti Rahmawati",
    studentId: "22051204015",
    companyName: "CV Digital Kreasi Indonesia",
    jobRole: "UI/UX Designer",
    submitDate: "18 Mei 2026",
    lectureFeedback:
      "Desain dan dokumentasi sudah baik, namun perlu penjelasan lebih rinci pada proses pengujian.",
    filePageCount: 72,
    fileSize: 3.5,
    status: "awaiting",
  },
  {
    title: "Laporan Praktik Kerja Lapangan Analisis Data Penjualan",
    studentName: "Muhammad Rizky",
    studentId: "22051204027",
    companyName: "PT Sumber Rejeki Abadi",
    jobRole: "Data Analyst Intern",
    submitDate: "15 Mei 2026",
    lectureFeedback:
      "Masih terdapat kesalahan format penulisan dan beberapa grafik belum diberi keterangan yang jelas.",
    filePageCount: 65,
    fileSize: 2.8,
    status: "rejected",
  },
  {
    title: "Laporan Akhir Magang Pengembangan Aplikasi Mobile",
    studentName: "Nabila Putri",
    studentId: "22051204033",
    companyName: "PT Inovasi Digital Indonesia",
    jobRole: "Mobile Developer",
    submitDate: "21 Mei 2026",
    filePageCount: 94,
    fileSize: 5.1,
    status: "awaiting",
  },
  {
    title: "Laporan Kegiatan Magang Divisi Infrastruktur TI",
    studentName: "Dimas Prasetyo",
    studentId: "22051204045",
    companyName: "PT Telekomunikasi Indonesia",
    jobRole: "Network Engineer Intern",
    submitDate: "17 Mei 2026",
    lectureFeedback:
      "Pembahasan sudah lengkap dan sesuai pedoman. Revisi minor pada tata bahasa.",
    filePageCount: 80,
    fileSize: 4.0,
    status: "approved",
  },
];

export default function DashboardDosen() {
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <DashboardHeader
        title="Dashboard"
        subtitle="Daftar mahasiswa yang berada di bawah bimbingan anda"
      />

      {/* STATISTIK */}
      <Card>
        <h2 className="text-xl font-semibold text-[#3D5DA8]">
          Statistik Bimbingan
        </h2>

        <p className="text-[#5E7BC7] text-sm mt-1">
          Ringkasan aktivitas pembimbingan mahasiswa magang
        </p>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <StatusCard label="Total Mahasiswa" value={20} color="blue" />

          <StatusCard label="Sedang Aktif" value={11} color="green" />

          <StatusCard label="Selesai Magang" value={4} color="purple" />

          <StatusCard label="Rata-rata Nilai" value="A" color="red" />
        </div>
      </Card>

      {/* LAPORAN */}
      <Card className="mt-5">
        {laporanData.map((laporan) => (
          <LaporanCard {...laporan} />
        ))}
      </Card>
    </div>
  );
}
