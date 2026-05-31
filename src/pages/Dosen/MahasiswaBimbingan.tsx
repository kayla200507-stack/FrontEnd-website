// pages/Dosen/MahasiswaBimbingan.tsx

import {
  Search,
  Eye,
  Users,
  Briefcase,
  CheckCircle,
  BookOpen,
} from "lucide-react";

export default function MahasiswaBimbingan() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-5">
      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-[#3D5DA8]">
          Mahasiswa Bimbingan
        </h1>

        <p className="text-gray-500 mt-1 text-sm">
          Daftar mahasiswa yang berada di bawah bimbingan Anda
        </p>
      </div>

      {/* CARD STAT */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="text-blue-600" size={22} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Mahasiswa</p>

              <h1 className="text-3xl font-bold">5</h1>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <Briefcase className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Sedang Magang</p>

              <h1 className="text-3xl font-bold">4</h1>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <CheckCircle className="text-purple-600" size={22} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Selesai Magang</p>

              <h1 className="text-3xl font-bold">1</h1>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-xl">
              <BookOpen className="text-orange-500" size={22} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Rata-rata Progress</p>

              <h1 className="text-3xl font-bold">89%</h1>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        {/* TITLE */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[#3D5DA8]">
            Daftar Mahasiswa Bimbingan
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Pantau progress dan status mahasiswa bimbingan Anda
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Cari berdasarkan nama atau NIM..."
            className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-3">NIM</th>
                <th className="py-3">Nama</th>
                <th className="py-3">Perusahaan</th>
                <th className="py-3">Posisi</th>
                <th className="py-3">Progress Logbook</th>
                <th className="py-3">Status Laporan</th>
                <th className="py-3">Status</th>
                <th className="py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {/* ROW */}
              <tr className="border-b">
                <td className="py-5">11210001</td>
                <td>Budi Santoso</td>
                <td>PT Teknologi Maju</td>
                <td>Frontend Developer Intern</td>

                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-2 bg-gray-200 rounded-full">
                      <div className="w-[85%] h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <span>85%</span>
                  </div>
                </td>

                <td>
                  <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs">
                    Draft
                  </span>
                </td>

                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Sedang Magang
                  </span>
                </td>

                <td>
                  <button className="border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
                    <Eye size={15} />
                    Detail
                  </button>
                </td>
              </tr>

              {/* ROW */}
              <tr className="border-b">
                <td className="py-5">11210002</td>
                <td>Siti Rahmawati</td>
                <td>PT Digital Kreatif</td>
                <td>UI/UX Designer Intern</td>

                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-2 bg-gray-200 rounded-full">
                      <div className="w-[92%] h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <span>92%</span>
                  </div>
                </td>

                <td>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    Sudah Submit
                  </span>
                </td>

                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Sedang Magang
                  </span>
                </td>

                <td>
                  <button className="border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
                    <Eye size={15} />
                    Detail
                  </button>
                </td>
              </tr>

              {/* ROW */}
              <tr className="border-b">
                <td className="py-5">11210003</td>
                <td>Ahmad Fauzi</td>
                <td>PT Inovasi Sistem</td>
                <td>Backend Developer Intern</td>

                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-2 bg-gray-200 rounded-full">
                      <div className="w-[78%] h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <span>78%</span>
                  </div>
                </td>

                <td>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                    Belum Mulai
                  </span>
                </td>

                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Sedang Magang
                  </span>
                </td>

                <td>
                  <button className="border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
                    <Eye size={15} />
                    Detail
                  </button>
                </td>
              </tr>

              {/* ROW */}
              <tr className="border-b">
                <td className="py-5">11210004</td>
                <td>Dewi Lestari</td>
                <td>PT Media Online</td>
                <td>Data Analyst Intern</td>

                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-2 bg-gray-200 rounded-full">
                      <div className="w-full h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <span>100%</span>
                  </div>
                </td>

                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Disetujui
                  </span>
                </td>

                <td>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
                    Selesai
                  </span>
                </td>

                <td>
                  <button className="border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
                    <Eye size={15} />
                    Detail
                  </button>
                </td>
              </tr>

              {/* ROW */}
              <tr>
                <td className="py-5">11210005</td>
                <td>Rudi Hermawan</td>
                <td>PT Solusi Digital</td>
                <td>Mobile Developer Intern</td>

                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-2 bg-gray-200 rounded-full">
                      <div className="w-[88%] h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <span>88%</span>
                  </div>
                </td>

                <td>
                  <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs">
                    Draft
                  </span>
                </td>

                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Sedang Magang
                  </span>
                </td>

                <td>
                  <button className="border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
                    <Eye size={15} />
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
