import {
  Book,
  Briefcase,
  BriefcaseBusiness,
  Calendar,
  ClipboardCheck,
  File,
  FileText,
  Home,
  NotepadText,
  Users,
} from "lucide-react";

export const data = {
  dosenMenus: [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dosen",
    },

    {
      label: "Mahasiswa Bimbingan",
      icon: Users,
      href: "/dosen/mahasiswa-bimbingan",
    },

    {
      label: "Monitoring Logbook",
      icon: Book,
      href: "/dosen/monitoring-logbook",
    },

    {
      label: "Laporan",
      icon: File,
      href: "/dosen/laporan",
    },

    {
      label: "Penilaian Magang",
      icon: ClipboardCheck,
      href: "/dosen/penilaian",
    },
  ],
  mahasiswaMenus: [
    { label: "Dashboard", icon: Home, href: "/mahasiswa" },
    { label: "Lowongan", icon: BriefcaseBusiness, href: "/mahasiswa/lowongan" },
    {
      label: "Status",
      icon: NotepadText,
      href: "/mahasiswa/status",
    },
    {
      label: "Logbook",
      icon: Book,
      href: "/mahasiswa/logbook",
    },
    {
      label: "Laporan",
      icon: File,
      href: "/mahasiswa/laporan",
    },
    {
      label: "Kalender",
      icon: Calendar,
      href: "/mahasiswa/kalender",
    },
  ],
  adminMenus: [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      label: "Data Mahasiswa",
      href: "/admin/data-mahasiswa",
      icon: Users,
    },
    {
      label: "Verifikasi Pendaftaran",
      href: "/admin/verifikasi-pendaftaran",
      icon: ClipboardCheck,
    },
    {
      label: "Lowongan Magang",
      href: "/admin/lowongan-magang",
      icon: Briefcase,
    },
    {
      label: "Pengumuman",
      href: "/admin/pengumuman",
      icon: FileText,
    },
  ],
};
const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-600",
  red: "bg-red-50 text-red-600",
  purple: "bg-purple-50 text-purple-600",
};
