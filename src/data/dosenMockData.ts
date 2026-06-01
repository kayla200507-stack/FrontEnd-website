export interface Student {
  nim: string;
  name: string;
  email: string;
  phone: string;
  programStudi: string;
  ipk: number;
  perusahaan: string;
  posisi: string;
  progress: number;
  statusLaporan: string;
  status: "Sedang Magang" | "Selesai";
  tanggalMulai: string;
  progressAktivitas: string;
}

export const mockStudents: Student[] = [
  {
    nim: "11250001",
    name: "Budi Setiono",
    email: "budi.setiono@email.com",
    phone: "081234567890",
    programStudi: "Teknik Informatika",
    ipk: 3.75,
    perusahaan: "PT Teknologi Mpu",
    posisi: "Frontend Developer Intern",
    progress: 85,
    statusLaporan: "Draft",
    status: "Sedang Magang",
    tanggalMulai: "1 Maret 2026",
    progressAktivitas: "85%",
  },
  {
    nim: "11250002",
    name: "Siti Hartinawati",
    email: "siti.hartinawati@email.com",
    phone: "081234567891",
    programStudi: "Desain Komunikasi Visual",
    ipk: 3.82,
    perusahaan: "PT Digital Kreatif",
    posisi: "UI/UX Designer Intern",
    progress: 92,
    statusLaporan: "Sudah Submit",
    status: "Sedang Magang",
    tanggalMulai: "15 Maret 2026",
    progressAktivitas: "92%",
  },
  {
    nim: "11250003",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@email.com",
    phone: "081234567892",
    programStudi: "Teknik Informatika",
    ipk: 3.68,
    perusahaan: "PT Inovasi Sistem",
    posisi: "Backend Developer Intern",
    progress: 78,
    statusLaporan: "Belum Mulai",
    status: "Sedang Magang",
    tanggalMulai: "10 Maret 2026",
    progressAktivitas: "78%",
  },
  {
    nim: "11250004",
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    phone: "081234567893",
    programStudi: "Statistika",
    ipk: 3.9,
    perusahaan: "PT Media Online",
    posisi: "Data Analyst Intern",
    progress: 100,
    statusLaporan: "Disetujui",
    status: "Selesai",
    tanggalMulai: "1 Februari 2026",
    progressAktivitas: "100%",
  },
  {
    nim: "11250005",
    name: "Rudi Hermawan",
    email: "rudi.hermawan@email.com",
    phone: "081234567894",
    programStudi: "Teknik Informatika",
    ipk: 3.71,
    perusahaan: "PT Solusi Digital",
    posisi: "Mobile Developer Intern",
    progress: 88,
    statusLaporan: "Draft",
    status: "Sedang Magang",
    tanggalMulai: "20 Maret 2026",
    progressAktivitas: "88%",
  },
];

export interface InternReport {
  id: number;
  studentName: string;
  nim: string;
  title: string;
  submitDate: string;
  company: string;
  position: string;
  status: "waiting" | "approved" | "revision";
  feedback: string;
}

export const initialReports: InternReport[] = [
  {
    id: 1,
    studentName: "Budi Santoso",
    nim: "11210001",
    title: "Pengembangan Website E-Commerce",
    submitDate: "20 Maret 2026",
    company: "PT Teknologi Meja",
    position: "Frontend Developer Intern",
    status: "waiting",
    feedback: "",
  },
  {
    id: 2,
    studentName: "Siti Rahmawati",
    nim: "11210002",
    title: "Redesign Aplikasi Mobile Banking",
    submitDate: "22 Maret 2026",
    company: "PT Digital Kreatif",
    position: "UI/UX Designer intern",
    status: "waiting",
    feedback: "",
  },
  {
    id: 3,
    studentName: "Ahmad Fauzi",
    nim: "11210015",
    title: "Analisis Sentimen Media Sosial",
    submitDate: "18 Maret 2026",
    company: "PT Data Cerdas",
    position: "Data Analyst Intern",
    status: "approved",
    feedback: "Kerja bagus, laporan sangat sistematis. Diterima.",
  },
  {
    id: 4,
    studentName: "Dewi Lestari",
    nim: "11210022",
    title: "Implementasi CI/CD Pipeline",
    submitDate: "19 Maret 2026",
    company: "PT Solusi Cloud",
    position: "DevOps Intern",
    status: "revision",
    feedback: "Perbaiki bagian metodologi dan tambahkan diagram alur.",
  },
  {
    id: 5,
    studentName: "Rizki Maulana",
    nim: "11210007",
    title: "Optimasi Database untuk E-Learning",
    submitDate: "21 Maret 2026",
    company: "PT Edukasi Nusantara",
    position: "Backend Engineer Intern",
    status: "waiting",
    feedback: "",
  },
];
