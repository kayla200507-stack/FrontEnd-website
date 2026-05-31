import React from "react";
import { Notification } from "@/components/Notification";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white fixed top-0 py-3 w-full left-0 px-3 flex justify-between z-50 items-center border-b border-gray-100/80 shadow-sm/30">
      <Link to="/admin/dashboard" className="text-xl text-black font-serif text-blue-500 hover:opacity-90 transition-opacity">
        Vokasi Magang
      </Link>
      <div className="flex gap-2 items-center">
        <Notification />
        <Link
          to={"/admin/profile"}
          className="aspect-square size-8 bg-[#4769B1] rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-95 transition-opacity"
        >
          KH
        </Link>
        <div className="text-blue-800 font-semibold leading-tight">
          <p className="text-[14px]">Kayla Haniyah</p>
          <p className="text-[11px] text-gray-500 font-normal">Admin Akademik</p>
        </div>
      </div>
    </header>
  );
}

export { Header as AdminHeader };
export default Header;