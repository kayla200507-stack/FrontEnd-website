import { Notification } from "@/components/Notification";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
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
  );
}
