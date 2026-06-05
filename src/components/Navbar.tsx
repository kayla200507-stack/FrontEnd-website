import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoVokasi from "../assets/images/vokasi.png";
import { useAuthStore } from "@/stores/authStore";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/lowongan", label: "Lowongan" },
  { to: "/tentang", label: "Tentang" },
];

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "dosen") return "/dosen";
    return "/mahasiswa";
  };

  return (
    <nav className="bg-white border-b border-black/10 shadow-sm h-[82px] flex items-center px-6 md:px-10 sticky top-0 z-50">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-1 z-50">
          <img src={logoVokasi} alt="Logo Vokasi" className="w-10 h-10 md:w-11 md:h-11 object-contain"/>
          <span className="text-[#3a60a0] text-[22px] md:text-[28px] tracking-[-0.5px] font-normal" style={{ fontFamily: "'Georgia', serif" }}> Vokasi Magang</span> 
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-[21px] absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-['Poppins',sans-serif] font-medium text-[18px] hover:text-[#3a60a0] transition-colors ${location.pathname === to ? "text-[#3a60a0]" : "text-[#4a5565]"}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <Link 
              to={getDashboardLink()} 
              className="h-[37px] px-4 rounded-[8px] bg-[#3a60a0] text-white font-['Poppins,sans-serif] text-[14px] font-medium flex items-center justify-center hover:bg-[#2d4f8a] transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/auth/login" className="h-[37px] px-4 rounded-[8px] border border-black/30 bg-white text-[#0a0a0a] font-['Poppins,sans-serif] text-[14px] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors" >Masuk</Link>
              <Link to="/auth/register" className="h-[37px] px-4 rounded-[8px] bg-[#3a60a0] text-white font-['Poppins,sans-serif] text-[14px] font-medium flex items-center justify-center hover:bg-[#2d4f8a] transition-colors" >Daftar</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden z-50 p-2 text-[#3a60a0]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className={`font-['Poppins',sans-serif] font-medium text-[24px] hover:text-[#3a60a0] transition-colors ${location.pathname === to ? "text-[#3a60a0]" : "text-[#4a5565]"}`}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-4 mt-4 w-full px-10">
            {isAuthenticated ? (
              <Link 
                to={getDashboardLink()} 
                onClick={() => setIsMenuOpen(false)}
                className="w-full h-[50px] rounded-[8px] bg-[#3a60a0] text-white font-['Poppins,sans-serif] text-[18px] font-medium flex items-center justify-center"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/auth/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full h-[50px] rounded-[8px] border border-black/30 bg-white text-[#0a0a0a] font-['Poppins,sans-serif] text-[18px] font-medium flex items-center justify-center"
                >
                  Masuk
                </Link>
                <Link 
                  to="/auth/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full h-[50px] rounded-[8px] bg-[#3a60a0] text-white font-['Poppins,sans-serif] text-[18px] font-medium flex items-center justify-center"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
