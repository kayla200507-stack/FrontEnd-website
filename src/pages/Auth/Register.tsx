import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { RegisterMahasiswa } from "./RegisterMahasiswa";
import { RegisterDosen } from "./RegisterDosen";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"mahasiswa" | "dosen">("mahasiswa");

  return (
    <div className="max-w-[520px] w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-[28px] font-bold text-gray-900 mb-2">
          Daftarkan Akun Anda
        </h2>
        <p className="text-gray-500 text-sm">
          Silakan buat akun kamu dengan melengkapi data di bawah
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab("mahasiswa")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === "mahasiswa"
              ? "bg-white text-[#0A46D2] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Mahasiswa
        </button>
        <button
          onClick={() => setActiveTab("dosen")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === "dosen"
              ? "bg-white text-[#0A46D2] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Dosen
        </button>
      </div>

      {/* Forms */}
      {activeTab === "mahasiswa" ? <RegisterMahasiswa /> : <RegisterDosen />}

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="text-gray-400 text-sm">atau</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mb-10">
        Sudah memiliki akun?{" "}
        <Link to="/auth/login" className="text-[#0A46D2] font-bold hover:underline">
          Masuk di sini
        </Link>
      </p>

      {/* Back to Home Link */}
      <Link
        to="/"
        className="flex items-center justify-center gap-2 text-sm text-[#0A46D2] font-medium hover:underline"
      >
        <ArrowLeft size={16} />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
