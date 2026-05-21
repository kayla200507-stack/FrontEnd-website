import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6 lg:px-20 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <GraduationCap />{" "}
            <span className="font-bold">Manajemen Magang</span>
          </div>
          <p className="text-xs">
            Universitas Brawijaya <br /> Malang, Jawa Timur
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
