import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoVokasi from "../assets/images/vokasi.png";

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/lowongan", label: "Lowongan" },
  { to: "/tentang", label: "Tentang" },
];

const socialIcons = [
  { Icon: Mail, size: 16 },
  { Icon: Mail, size: 16 },
  { Icon: Mail, size: 14 },
  { Icon: Mail, size: 16 },
];

const contactItems = [
  { Icon: Mail, size: 17, text: "vokasimagang@ub.ac.id" },
  { Icon: Phone, size: 17, text: "(+62) 57575757" },
  { Icon: MapPin, size: 20, text: "Jl. Veteran No 12-14, Ketawanggede, Malang, Jawa Timur, Indonesia" },
];

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-[50px] pb-0">
      <div className="max-w-[1440px] mx-auto px-10 pb-5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-5">
          <div className="flex gap-1 items-start">
            <img src={logoVokasi} alt="Logo Vokasi" className="w-30 h-25 object-contain -mt-3"/>
            <div className="flex flex-col">
            <div className="text-[#3a60a0] text-[28px] tracking-[-0.5px] leading-none mt-1" style={{ fontFamily: "'Georgia', serif" }}>Vokasi Magang</div>
            <p className="text-[#d1d5dc] text-[12px] leading-[20px] mt-2 font-['Poppins,sans-serif]">
              Platform terpercaya untuk menemukan pekerjaan<br />
              impian dan membangun karier yang sukses.
            </p>
          </div>
          </div>

          <div>
            <h4 className="text-white text-[14px] font-semibold font-['Poppins',sans-serif] mb-[14px]">Kontak Kami</h4>
            <div className="flex flex-col gap-3">
              {contactItems.map(({ Icon, size, text }) => (
        <div key={text} className="flex items-start gap-[8px]">
          <Icon size={size} color="white" className="shrink-0 mt-[2px]" />
          <span className="text-[#d1d5dc] text-[12px] font-['Poppins',sans-serif]">
            {text}
          </span>
        </div>
              ))}
            </div>
          </div>

          <div className="justify-self-center">
            <h4 className="text-white text-[14px] font-semibold font-['Poppins',sans-serif] mb-[14px]">Navigasi</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="text-[#d1d5dc] text-[12px] font-['Poppins',sans-serif] hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-white text-[14px] font-semibold font-['Poppins',sans-serif] mb-[14px]">Media Sosial</h4>
            <div className="flex items-center justify-center gap-4">
              {socialIcons.map(({ Icon, size }, i) => (
                <a key={i} href="#" className="bg-[#1e2939] size-[45px] rounded-full flex items-center justify-center hover:bg-[#2d3f55] transition-colors">
                  <Icon size={size} color="#EEEEEE" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e2939] pt-5 mt-5">
          <p className="text-[#d1d5dc] text-[16px] text-center font-['Inter',sans-serif]">© 2026 Vokasi Magang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
