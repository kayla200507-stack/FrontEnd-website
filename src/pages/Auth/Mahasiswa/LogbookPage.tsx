import { Command, FilePlus } from "lucide-react";
import { Button } from "../../../components/Button";

export default function LogbookPage() {
  const logbooks = [
    {
      date: "24 Maret 2026",
      activity: "Mengembangkan fitur login dengan React dan implementasi",
      status: "Reviewed",
      reviewed: true,
    },
    {
      date: "23 Maret 2026",
      activity: "Mempelajari dokumentasi API dan membuat integrasi dengan",
      status: "Reviewed",
      reviewed: true,
    },
    {
      date: "22 Maret 2026",
      activity: "Meeting dengan tim untuk diskusi design sistem",
      status: "Pending",
      reviewed: false,
    },
    {
      date: "21 Maret 2026",
      activity: "Refactoring kode dan menambahkan unit testing",
      status: "Reviewed",
      reviewed: true,
    },
  ];

  const feedbacks = [
    {
      date: "24 Maret 2026",
      activity:
        "Mengembangkan fitur login dengan React dan implementasi autentikasi JWT",
      comment: "Bagus! Coba tambahkan validasi form yang lebih lengkap.",
    },
    {
      date: "23 Maret 2026",
      activity:
        "Mempelajari dokumentasi API dan membuat integrasi dengan backend",
      comment: "Lanjutkan dengan implementasi error handling.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex font-sans text-[#1F2937]">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Riwayat */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#4769B1] mb-1">
              Riwayat Logbook
            </h2>
            <p className="text-[#5B6B88]  mb-6">Aktivitas yang telah dicatat</p>

            <div className="space-y-4">
              {logbooks.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#E5E7EB] rounded-2xl p-5 flex justify-between items-start"
                >
                  <div>
                    <p className="text-[#6B7280] text-xs font-medium mb-2">
                      {item.date}
                    </p>
                    <p className=" text-[#1F2937] leading-relaxed max-w-[500px]">
                      {item.activity}
                    </p>
                  </div>

                  <div
                    className={`px-2 py-px rounded-xl text-[15px] font-medium border ${
                      item.reviewed
                        ? "bg-[#ECFDF3] text-[#16A34A] border-[#86EFAC]"
                        : "bg-[#F9FAFB] text-[#6B7280] border-[#D1D5DB]"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#4769B1] mb-1">
              Input Logbook Harian
            </h2>
            <p className="text-[#5B6B88] mb-6">
              Catat aktivitas magang anda setiap hari
            </p>

            <div className="w-full h-[170px] bg-[#F3F4F6] rounded-2xl flex flex-col items-center justify-center text-[#7B7B7B] mb-5">
              <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center mb-4">
                <FilePlus />
              </div>
              <p className="">Upload Foto Kegiatan</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">
                  Tanggal Kegiatan
                </label>
                <input
                  type="date"
                  className="w-full h-12 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl px-4 outline-none placeholder:text-base"
                />
              </div>

              <div>
                <label className="block  font-semibold mb-2">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan detail kegiatan yang Anda lakukan hari ini..."
                  className="w-full bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none resize-none text-[16px]"
                />
              </div>
            </div>

            <p className="text-[#8B8B8B] text-[15px] mt-3 mb-4">
              Jelaskan secara detail apa yang Anda pelajari dan kerjakan
            </p>

            <div className="flex gap-4 ">
              <Button className="w-full">Simpan Logbook</Button>
              <Button variant="outline">Reset</Button>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-sm">
          <h2 className="text-xl  font-semibold text-[#4769B1] mb-1 flex items-center gap-3">
            
            Feedback Dosen Pembimbing
          </h2>

          <p className="text-[#5B6B88] text- mb-8">
            Komentar dan saran untuk logbook terbaru
          </p>

          <div className="space-y-6">
            {feedbacks.map((item, index) => (
              <div
                key={index}
                className="bg-[#EEF5FF] border-l-[5px] border-[#3B82F6] rounded-2xl p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[#6B7280] text-[15px] font-medium mb-2">
                      {item.date}
                    </p>
                    <p className="text-base leading-relaxed">
                      <span className="font-semibold">Aktivitas:</span>{" "}
                      {item.activity}
                    </p>
                  </div>

                  <div className="bg-white border border-[#D1D5DB] px-4 py-1 rounded-full text-xs shadow-sm">
                    Dr. Rina Kusuma
                  </div>
                </div>

                <div className="bg-white rounded-xl px-5 py-4 text-[#2563EB] text-sm font-medium border border-[#E5E7EB]">
                  💬 {item.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
