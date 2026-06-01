import { Link, useLocation } from "react-router-dom";
import logoVokasi from "../assets/images/vokasi.png";

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/lowongan", label: "Lowongan" },
  { to: "/tentang", label: "Tentang" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-black/10 shadow-sm h-[82px] flex items-center px-10 sticky top-0 z-50">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between relative">

        <Link to="/" className="flex items-center gap-1">
        <img src={logoVokasi} alt="Logo Vokasi" className="w-11 h-11 object-contain"/>
       <span className="text-[#3a60a0] text-[28px] tracking-[-0.5px] font-normal" style={{ fontFamily: "'Georgia', serif" }}> Vokasi Magang</span> 
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[21px]">
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

        <div className="flex items-center gap-3">
          <Link to="/login" className="h-[37px] px-4 rounded-[8px] border border-black/30 bg-white text-[#0a0a0a] font-['Poppins,sans-serif] text-[14px] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors" >Masuk</Link>
          <Link to="/daftar" className="h-[37px] px-4 rounded-[8px] bg-[#3a60a0] text-white font-['Poppins,sans-serif] text-[14px] font-medium flex items-center justify-center hover:bg-[#2d4f8a] transition-colors" >Daftar</Link>
        </div>
      </div>
    </nav>
  );
}
