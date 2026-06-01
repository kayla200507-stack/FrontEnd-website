import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import imgUser from "../assets/images/user-avatar.png";
import imgLogo from "../assets/images/vokasi-logo.png";

const BELL_PATH = "M8.80756 0C6.97817 0 5.22371 0.726721 3.93014 2.02029C2.63656 3.31387 1.90984 5.06833 1.90984 6.89771V10.3742C1.90998 10.527 1.87456 10.6778 1.80638 10.8146L0.114465 14.1975C0.0318174 14.3627 -0.00720825 14.5464 0.00109505 14.731C0.00939835 14.9156 0.0647548 15.095 0.161907 15.2522C0.259059 15.4094 0.394781 15.5391 0.556182 15.6291C0.717583 15.719 0.899305 15.7662 1.08409 15.7662H16.531C16.7158 15.7662 16.8975 15.719 17.0589 15.6291C17.2203 15.5391 17.3561 15.4094 17.4532 15.2522C17.5504 15.095 17.6057 14.9156 17.614 14.731C17.6223 14.5464 17.5833 14.3627 17.5007 14.1975L15.8097 10.8146C15.7412 10.6779 15.7054 10.5271 15.7053 10.3742V6.89771C15.7053 5.06833 14.9786 3.31387 13.685 2.02029C12.3914 0.726721 10.6369 0 8.80756 0ZM8.80756 18.7224C8.19597 18.7227 7.59935 18.5333 7.0999 18.1803C6.60045 17.8274 6.22277 17.3282 6.01891 16.7516H11.5962C11.3923 17.3282 11.0147 17.8274 10.5152 18.1803C10.0158 18.5333 9.41914 18.7227 8.80756 18.7224Z";

const notifications = [
  { title: "Komentar baru dari dosen",      time: "2 jam yang lalu" },
  { title: "Lowongan baru tersedia",         time: "1 hari yang lalu" },
  { title: "Status pendaftaran diperbarui",  time: "1 hari yang lalu" },
  { title: "Segera isi laporan",             time: "1 hari yang lalu" },
];

export function Header() {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="h-[82px] bg-white border-b border-slate-100 flex items-center justify-between px-4 shrink-0 z-10">
      {/* Left: logo + brand */}
      <Link
        to="/mahasiswa/lowongan"
        className="flex items-center gap-0"
      >
        <img src={imgLogo} alt="Vokasi UB" className="size-[40px] object-cover shrink-0" />
        <span
          className="text-[#3a60a0] text-[28px] leading-[28.723px] tracking-[-0.5129px] whitespace-nowrap"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}
        >
          Vokasi Magang
        </span>
      </Link>

      {/* Right: bell + user */}
      <div className="flex items-center gap-[8px]">
        {/* Bell */}
        <div className="relative size-[27px] shrink-0" ref={notifRef}>
          <button onClick={() => setShowNotif((v) => !v)} className="relative size-[27px]">
            <div className="absolute inset-[9.09%_16.58%_21.57%_18.18%]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6151 18.7224">
                <path d={BELL_PATH} fill="#3A60A0" />
              </svg>
            </div>
            <div className="absolute bg-[#fb2c36] rounded-full" style={{ top: 0, right: "7.41%", bottom: "66.67%", left: "59.26%" }} />
          </button>

          {showNotif && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-[280px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-[#3a60a0] font-semibold text-sm">Notifikasi</p>
              </div>
              <div className="divide-y divide-slate-100">
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors">
                    <p className="text-[#0a0a0a] text-sm font-medium leading-tight">{n.title}</p>
                    <p className="text-[#4a5565] text-xs mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <Link
          to="/mahasiswa/profil"
          className="flex items-center gap-[7px] hover:opacity-80 transition-opacity ml-[8px] mr-0"
        >
          <div className="size-[33px] rounded-full overflow-hidden bg-slate-200 shrink-0">
            <img src={imgUser} alt="Zaidan Fahry" className="size-full object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="text-[#3a60a0] text-[12px] not-italic whitespace-nowrap leading-[13.147px]"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
              Zaidan Fahry
            </p>
            <p className="text-[#3a60a0] text-[10px] not-italic leading-[10.517px] mt-[3px]"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
              D3 Teknologi Informasi
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
