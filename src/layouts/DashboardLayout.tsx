import {
  Book,
  BriefcaseBusiness,
  Calendar,
  File,
  Home,
  LogOut,
  NotepadText,
  Settings,
} from "lucide-react";
import { NavLink } from "../components/Navlink";
import { Notification } from "../components/Notification";
import { Link, Outlet } from "react-router-dom";

const menus = [
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
];

const menuDosen = [
  { label: "Dashboard", icon: Home, href: "/Dosen" },
  {
    label: "Mahasiswa Bimbingan",
    icon: BriefcaseBusiness,
    href: "/dosen/Mahasiswa Bimbingan",
  },
  {
    label: "Monitoring Logbook",
    icon: Book,
    href: "/mahasiswa/monitoring-logbook",
  },
  {
    label: "Laporan",
    icon: File,
    href: "/mahasiswa/report",
  },
  {
    label: "Penilaian Magang",
    icon: Calendar,
    href: "/penilaian magang",
  },
];

const DashboardLayout = () => {
  return (
    <div className="relative bg-[#F3F4F6] min-h-screen">
      <header className="bg-white fixed top-0 py-3 w-full left-0 px-3 flex justify-between z-50 items-center">
        <h1 className="text-xl text-black font-serif text-blue-500">
          Vokasi Magang
        </h1>
        <div className="flex gap-2 items-center">
          <Notification />
          <Link
            to={"/mahasiswa/profil"}
            className="aspect-square size-8 bg-blue-500 rounded-full"
          ></Link>
          <div className="text-blue-800 font-semibold">
            <p>Keisya Lanika</p>
            <p className="text-sm">D3 Teknologi Informasi</p>
          </div>
        </div>
      </header>
      <aside className="w-50 fixed top-0 left-0 bg-white h-screen pt-21 px-2 flex flex-col justify-between">
        <div className="space-y-2">
          {menus.map((menu) => (
            <NavLink
              label={menu.label}
              icon={menu.icon}
              href={menu.href}
              key={menu.label}
            />
          ))}
        </div>
        <div className="space-y-2">
          <NavLink icon={Settings} label="Setting" href="/dashboard/setting" />
          <NavLink icon={LogOut} label="Logout" href="/dashboard/setting" />
        </div>
      </aside>
      <div className="px-6 pl-55 pb-20 bg-[#F3F4F6] pt-21 space-y-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
