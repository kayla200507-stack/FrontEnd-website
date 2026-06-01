import img1 from "../assets/images/pt-teknologi-maju.png";
import img2 from "../assets/images/pt-digital-kreatif.png";
import img3 from "../assets/images/pt-inovasi-sistem.png";
import img4 from "../assets/images/pt-media-online.png";
import img5 from "../assets/images/studio-kreatif-nusa.png";
import img6 from "../assets/images/pt-analitika-indonesia.png";
import img7 from "../assets/images/startup-inovasi-digital.png";
import img8 from "../assets/images/pt-infrastruktur-maju.png";
import img9 from "../assets/images/cloud-indonesia-tech.png";

export const jobLogos: Record<number, string> = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  9: img9,
};

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  deadline: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  category: string;
  penempatan: string;
  mulaiMagang: string;
}

export const jobs: Job[] = [
  {
    id: 1, title: "Frontend Developer", company: "PT Teknologi Maju", location: "Jakarta, DKI Jakarta",
    type: "FULL TIME", duration: "6 Bulan", deadline: "31 Mei 2026", category: "Frontend",
    penempatan: "WFO", mulaiMagang: "Juni 2026",
    tags: ["React", "Tailwind CSS", "JavaScript", "REST API", "Git"],
    description: "Bergabung dengan tim developer untuk membangun aplikasi web modern dan responsif menggunakan React dan teknologi terkini.",
    responsibilities: ["Membangun antarmuka pengguna yang responsif dan user-friendly.", "Mengembangkan komponen reusable dengan React.", "Mengintegrasikan frontend dengan RESTful API.", "Melakukan debugging dan meningkatkan performa aplikasi.", "Berpartisipasi dalam code review dan diskusi teknis tim."],
    requirements: ["Mahasiswa aktif minimal semester 4 (diutamakan Teknik Informatika).", "Memahami HTML, CSS, dan JavaScript.", "Memiliki pengalaman dengan React.js (diutamakan).", "Memahami konsep responsive design.", "Mampu bekerja dalam tim dan komunikatif.", "Bersedia magang minimal 6 bulan."],
    benefits: ["Uang saku.", "Sertifikat magang.", "Pembelajaran.", "Kesempatan karier."],
  },
  {
    id: 2, title: "UI/UX Designer", company: "PT Digital Kreatif", location: "Malang, Jawa Timur", 
    type: "FULL TIME", duration: "3 Bulan", deadline: "25 Juli 2026", category: "Design",
    penempatan: "WFO", mulaiMagang: "Agustus 2026",
    tags: ["Figma", "Prototyping", "User Research"],
    description: "Desainer UI/UX yang akan membantu merancang pengalaman pengguna yang intuitif dan menarik untuk produk digital.",
    responsibilities: ["Merancang wireframe dan prototype", "Melakukan user research", "Berkolaborasi dengan developer", "Membuat design system", "Testing usability"],
    requirements: ["Mahasiswa jurusan desain atau informatika", "Menguasai Figma atau tools desain lainnya", "Memahami prinsip UX", "Portofolio desain yang baik", "Kreatif dan detail-oriented"],
    benefits: ["Sertifikat magang resmi", "Uang saku", "Pengembangan portofolio", "Mentoring dari desainer senior"],
  },
  {
    id: 3, title: "Backend Developer", company: "PT Inovasi Sistem", location: "Surabaya, Jawa Timur",
    type: "FULL TIME", duration: "4 Bulan", deadline: "15 Juli 2026", category: "Backend",
    penempatan: "WFH", mulaiMagang: "Agustus 2026",
    tags: ["Node.js", "PostgreSQL", "REST API"],
    description: "Bergabunglah dengan tim backend kami untuk membangun API yang scalable dan reliable menggunakan Node.js dan PostgreSQL.",
    responsibilities: ["Mengembangkan dan memelihara REST API", "Mendesain skema database", "Menulis unit test", "Berkolaborasi dengan tim frontend", "Mendokumentasikan API"],
    requirements: ["Mahasiswa aktif semester 5 atau lebih", "Menguasai Node.js atau bahasa backend lainnya", "Familiar dengan database relasional", "Memahami RESTful API", "Mampu bekerja mandiri"],
    benefits: ["Sertifikat magang resmi", "Uang saku kompetitif", "Akses ke cloud infrastructure", "Referensi kerja"],
  },
  {
    id: 4, title: "Data Analyst", company: "PT Media Online", location: "Jakarta, DKI Jakarta",
    type: "PART TIME", duration: "3 Bulan", deadline: "20 Juni 2026", category: "Marketing",
    penempatan: "WFH", mulaiMagang: "Juli 2026",
    tags: ["Python", "Excel", "Tableau"],
    description: "Posisi Data Analyst Intern untuk mengolah dan memvisualisasikan data bisnis perusahaan.",
    responsibilities: ["Mengolah dan membersihkan data", "Membuat laporan dan dashboard", "Analisis tren data", "Presentasi temuan kepada tim", "Mendukung pengambilan keputusan berbasis data"],
    requirements: ["Mahasiswa aktif jurusan statistik/informatika/bisnis", "Menguasai Python dan SQL", "Familiar dengan tools visualisasi data", "Analitis dan teliti", "Komunikasi baik"],
    benefits: ["Sertifikat magang resmi", "Uang saku", "Portofolio nyata", "Networking industri"],
  },
  {
    id: 5, title: "Digital Marketing", company: "Studio Kreatif Nusa", location: "Bandung, Jawa Barat",
    type: "PART TIME", duration: "3 Bulan", deadline: "30 Juni 2026", category: "Marketing",
    penempatan: "WFH", mulaiMagang: "Juli 2026",
    tags: ["SEO", "Social Media", "Content"],
    description: "Intern Digital Marketing untuk membantu mengembangkan strategi pemasaran digital dan konten kreatif.",
    responsibilities: ["Membuat konten media sosial", "Analisis performa kampanye", "SEO dan SEM", "Email marketing", "Laporan pemasaran"],
    requirements: ["Mahasiswa jurusan marketing/komunikasi", "Memahami platform media sosial", "Kreatif dan komunikatif", "Familiar dengan tools analitik", "Mampu membuat konten"],
    benefits: ["Sertifikat magang resmi", "Uang saku", "Portofolio kampanye", "Mentoring"],
  },
  {
    id: 6, title: "Content Creator", company: "PT Media Online", location: "Jakarta, DKI Jakarta",
    type: "PART TIME", duration: "3 Bulan", deadline: "10 Juli 2026", category: "Marketing",
    penempatan: "WFH", mulaiMagang: "Agustus 2026",
    tags: ["Copywriting", "Design", "Video Editing"],
    description: "Content Creator intern untuk menghasilkan konten kreatif dan berkualitas bagi platform digital perusahaan.",
    responsibilities: ["Membuat konten tulisan, gambar, dan video", "Riset tren konten", "Kolaborasi dengan tim desain", "Manajemen jadwal posting", "Analisis engagement"],
    requirements: ["Mahasiswa aktif semester 3 ke atas", "Memiliki kreativitas tinggi", "Familiar dengan tools editing", "Komunikatif", "Portfolio konten"],
    benefits: ["Sertifikat magang resmi", "Uang saku", "Akses tools premium", "Portofolio konten"],
  },
  {
    id: 7, title: "Mobile Developer", company: "Startup Inovasi Digital", location: "Yogyakarta, DIY",
    type: "FULL TIME", duration: "5 Bulan", deadline: "10 Juli 2026", category: "Frontend",
    penempatan: "WFO", mulaiMagang: "Agustus 2026",
    tags: ["Flutter", "Dart", "Firebase"],
    description: "Developer mobile yang akan membangun aplikasi cross-platform menggunakan Flutter untuk berbagai kebutuhan bisnis.",
    responsibilities: ["Mengembangkan aplikasi mobile dengan Flutter", "Integrasi Firebase", "Optimasi performa aplikasi", "Testing dan debugging", "Deploy ke App Store/Play Store"],
    requirements: ["Mahasiswa aktif jurusan informatika", "Menguasai Dart/Flutter", "Familiar dengan Firebase", "Pengalaman membuat aplikasi mobile", "Problem solver"],
    benefits: ["Sertifikat magang resmi", "Uang saku kompetitif", "Akses premium tools", "Letter of recommendation"],
  },
  {
    id: 8, title: "Network Engineer", company: "PT Infrastruktur Maju", location: "Malang, Jawa Timur",
    type: "FULL TIME", duration: "3 Bulan", deadline: "5 Juli 2026", category: "Networking",
    penempatan: "WFO", mulaiMagang: "Agustus 2026",
    tags: ["Cisco", "Linux", "Mikrotik"],
    description: "Intern Network Engineer untuk mendukung tim infrastruktur jaringan dan keamanan sistem perusahaan.",
    responsibilities: ["Konfigurasi dan monitoring jaringan", "Troubleshooting koneksi", "Dokumentasi jaringan", "Support tim IT", "Implementasi keamanan jaringan"],
    requirements: ["Mahasiswa jurusan teknik informatika/jaringan", "Familiar dengan Cisco atau Mikrotik", "Menguasai Linux dasar", "Sertifikasi CCNA lebih diutamakan", "Teliti dan bertanggung jawab"],
    benefits: ["Sertifikat magang resmi", "Uang saku", "Akses lab jaringan", "Referensi kerja"],
  },
  {
    id: 9, title: "DevOps Engineer", company: "Cloud Indonesia Tech", location: "Surabaya, Jawa Timur",
    type: "FULL TIME", duration: "3 Bulan", deadline: "30 Juli 2026", category: "Backend",
    penempatan: "WFH", mulaiMagang: "Agustus 2026",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    description: "DevOps Intern yang akan membantu tim dalam otomasi dan pengelolaan infrastruktur cloud modern.",
    responsibilities: ["Konfigurasi CI/CD pipeline", "Manajemen container Docker", "Monitoring infrastruktur", "Otomasi deployment", "Dokumentasi proses DevOps"],
    requirements: ["Mahasiswa aktif informatika/sistem informasi", "Familiar dengan Docker dan Linux", "Mengerti konsep CI/CD", "Pengalaman cloud (AWS/GCP/Azure) lebih diutamakan", "Proaktif belajar teknologi baru"],
    benefits: ["Sertifikat magang resmi", "Uang saku", "Akses platform cloud", "Referensi kerja"],
  },
];

export const authStats = [
  { value: "10+", label: "LOWONGAN\nAKTIF" },
  { value: "9+", label: "PERUSAHAAN\nMITRA" },
  { value: "4+", label: "PENGGUNA\nAKTIF" },
];

export const lowonganStats = [
  { value: "9+", label: "Perusahaan Mitra" },
  { value: "10+", label: "Lowongan Magang" },
  { value: "3+", label: "Program Studi" },
  { value: "2+", label: "Mahasiswa Aktif" },
];

export const partnerLogos = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
];
