import { useState, useRef } from "react";
import { CheckCircle, Clock, UploadCloud, Calendar, MessageSquare } from "lucide-react";

const initialHistory = [
  {
    id: 1,
    date: "24 Maret 2026",
    status: "Reviewed",
    desc: "Mengembangkan fitur login dengan React dan implementasi autentikasi JWT",
  },
  {
    id: 2,
    date: "23 Maret 2026",
    status: "Reviewed",
    desc: "Mempelajari dokumentasi API dan membuat integrasi dengan backend",
  },
  {
    id: 3,
    date: "22 Maret 2026",
    status: "Pending",
    desc: "Meeting dengan tim untuk diskusi design sistem",
  },
  {
    id: 4,
    date: "21 Maret 2026",
    status: "Reviewed",
    desc: "Refactoring kode dan menambahkan unit testing",
  },
];

const feedbacks = [
  {
    id: 1,
    date: "24 Maret 2026",
    dosen: "Dr. Rina Kusuma",
    aktivitas: "Mengembangkan fitur login dengan React dan implementasi autentikasi JWT",
    komentar: "Bagus! Coba tambahkan validasi form yang lebih lengkap.",
  },
  {
    id: 2,
    date: "23 Maret 2026",
    dosen: "Dr. Rina Kusuma",
    aktivitas: "Mempelajari dokumentasi API dan membuat integrasi dengan backend",
    komentar: "Lanjutkan dengan implementasi error handling.",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Reviewed") {
    return (
      <span className="flex items-center gap-1.5 bg-[#f0fdf4] text-[#008236] text-[12px] font-medium px-2.5 py-1 rounded-[8px] border border-[#b9f8cf] shrink-0">
        <CheckCircle size={11} strokeWidth={2.5} />
        Reviewed
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 bg-white border border-[rgba(0,0,0,0.2)] text-[#4a5565] text-[12px] font-medium px-2.5 py-1 rounded-[8px] shrink-0">
      <Clock size={11} strokeWidth={2} />
      Pending
    </span>
  );
}

export function LogbookPage() {
  const [history, setHistory] = useState(initialHistory);
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    if (!tanggal && !deskripsi) return;
    const newEntry = {
      id: Date.now(),
      date: tanggal
        ? new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
        : new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      status: "Pending",
      desc: deskripsi || "(tanpa deskripsi)",
    };
    setHistory((prev) => [newEntry, ...prev]);
    setTanggal("");
    setDeskripsi("");
    setPhoto(null);
  }

  function handleReset() {
    setTanggal("");
    setDeskripsi("");
    setPhoto(null);
  }

  return (
    <div className="p-6">
      {/* Top 2-column grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Left: Riwayat Logbook */}
        <div className="col-span-7 bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm p-6">
          <div className="mb-4">
            <p className="text-[#3a60a0] text-lg font-semibold">Riwayat Logbook</p>
            <p className="text-[#3a60a0] text-sm mt-0.5">Aktivitas yang telah dicatat</p>
          </div>

          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="border border-[rgba(0,0,0,0.1)] rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#4a5565] text-[12px] font-medium">{item.date}</span>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-[#0a0a0a] text-[14px] leading-[20px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Input Logbook Harian */}
        <div className="col-span-5 bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm p-6">
          <div className="mb-4">
            <p className="text-[#3a60a0] text-lg font-semibold">Input Logbook Harian</p>
            <p className="text-[#3a60a0] text-sm mt-0.5">Catat aktivitas magang anda setiap hari</p>
          </div>

          {/* Upload photo */}
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPhoto(URL.createObjectURL(file));
              e.target.value = "";
            }}
          />
          <button
            onClick={() => photoRef.current?.click()}
            className="w-full bg-[#f3f4f6] border border-[rgba(0,0,0,0.08)] rounded-lg flex flex-col items-center justify-center gap-2 py-7 mb-4 hover:bg-slate-100 transition-colors overflow-hidden"
          >
            {photo ? (
              <img src={photo} alt="preview" className="max-h-28 object-contain rounded" />
            ) : (
              <>
                <UploadCloud size={28} className="text-[#9ca3af]" strokeWidth={1.5} />
                <span className="text-[#9ca3af] text-sm">Upload Foto Kegiatan</span>
              </>
            )}
          </button>

          {/* Tanggal Kegiatan */}
          <div className="mb-4">
            <label className="block text-[#3a60a0] text-sm font-medium mb-2">Tanggal Kegiatan</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-white border border-[rgba(0,0,0,0.15)] rounded-lg text-sm text-[#0a0a0a] outline-none focus:border-[#3a60a0] transition-colors"
              />
            </div>
          </div>

          {/* Deskripsi Kegiatan */}
          <div className="mb-4">
            <label className="block text-[#3a60a0] text-sm font-medium mb-2">Deskripsi Kegiatan</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan detail kegiatan yang Anda lakukan hari ini..."
              rows={4}
              className="w-full px-3 py-2.5 bg-white border border-[rgba(0,0,0,0.15)] rounded-lg text-sm text-[#0a0a0a] placeholder:text-[#9ca3af] outline-none focus:border-[#3a60a0] resize-none transition-colors"
            />
            <p className="text-[#9ca3af] text-xs mt-1">
              Jelaskan secara detail apa yang Anda pelajari dan kerjakan
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex-1 h-9 bg-[#0a0a0a] hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Simpan Logbook
            </button>
            <button
              onClick={handleReset}
              className="px-5 h-9 bg-white border border-[rgba(0,0,0,0.2)] text-[#0a0a0a] text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Feedback Dosen Pembimbing */}
      <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-[#3a60a0]" />
            <p className="text-[#3a60a0] text-lg font-semibold">Feedback Dosen Pembimbing</p>
          </div>
          <p className="text-[#3a60a0] text-sm mt-0.5">Komentar dan saran untuk logbook terbaru</p>
        </div>

        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-[#eff6ff] border-l-4 border-[#2b7fff] rounded-r-[10px] px-5 py-4"
            >
              {/* Row 1: date + dosen */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#0a0a0a] text-[12px] font-medium">{fb.date}</span>
                <span className="bg-white text-[#0a0a0a] text-[12px] font-medium px-3 py-1 rounded-full border border-[rgba(0,0,0,0.08)] shadow-sm">
                  {fb.dosen}
                </span>
              </div>

              {/* Row 2: aktivitas */}
              <p className="text-[#0a0a0a] text-[14px] leading-[20px] mb-3">
                <span className="font-bold">Aktivitas:</span> {fb.aktivitas}
              </p>

              {/* Row 3: komentar */}
              <div className="bg-white rounded-lg px-4 py-3 flex items-start gap-2.5">
                <MessageSquare size={14} className="text-[#1447e6] shrink-0 mt-0.5" />
                <p className="text-[#1447e6] text-[14px] font-medium">{fb.komentar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
