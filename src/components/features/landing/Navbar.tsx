import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const links = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Lowongan",
    href: "/lowongan",
  },
  {
    name: "Tentang",
    href: "/tentang-kami",
  },
];

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            Vokasi Magang
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link, idx) => (
            <Link
              to={link.href}
              className="text-blue-600 font-semibold text-sm"
              key={idx}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Tombol Masuk yang memanggil fungsi navigate ke /login */}
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            Masuk
          </button>
          <button className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-100 transition cursor-pointer">
            Daftar
          </button>
        </div>
      </div>
    </nav>
  );
}
