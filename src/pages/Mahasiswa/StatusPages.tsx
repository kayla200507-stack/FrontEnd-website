import { useState, useRef, useEffect } from "react";
import imgCompany from "../../assets/images/company-1.png";
import { Calendar, FileText, ArrowLeft, Clock, Monitor, Check } from "lucide-react";
import { StatusStepProgress } from "../../components/StatusStepProgress";
import { NavButtons } from "../../components/NavButtons";

/* ─── STATUS: MULAI MAGANG (step 4 - all done) ─── */
export function StatusMulaiMagang({ onBack }: { onBack: () => void }) {
  const dots = [
    { cx: 84, cy: 60, r: 5, color: "#4CAF50" },
    { cx: 130, cy: 30, r: 4, color: "#FFC107" },
    { cx: 160, cy: 80, r: 3.5, color: "#2196F3" },
    { cx: 48, cy: 40, r: 3.5, color: "#2196F3" },
    { cx: 55, cy: 100, r: 4, color: "#FFC107" },
    { cx: 148, cy: 130, r: 4, color: "#4CAF50" },
    { cx: 78, cy: 148, r: 3.5, color: "#FFC107" },
    { cx: 110, cy: 20, r: 3, color: "#2196F3" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-[#0f172a] text-2xl font-bold">Mulai Magang</h1>
      <p className="text-slate-500 text-sm mt-1 mb-6">Selamat! Anda siap memulai program magang</p>

      {/* Step progress — all 4 done */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
        <StatusStepProgress currentStep={5} />
      </div>

      {/* Celebration card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center">

        {/* Big checkmark with dots */}
        <div className="relative mb-6" style={{ width: 196, height: 196 }}>
          <svg width="196" height="196" viewBox="0 0 196 196" fill="none">
            {dots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.color} />
            ))}
            {/* Green circle */}
            <rect x="53" y="53" width="90" height="90" rx="45" fill="#4CAF50" />
            {/* Checkmark */}
            <path
              d="M116 78.625L91.25 103.375L80 92.125"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4.5"
            />
          </svg>
        </div>

        {/* Title */}
        <p className="text-[#191b23] font-semibold text-[18px] leading-tight text-center mb-2">
          Selamat, Zaidan Fahry!
        </p>

        {/* Subtitle */}
        <p className="text-[#434655] text-[14px] text-center leading-snug mb-1">
          Anda telah menyelesaikan semua langkah persiapan.
        </p>
        <p className="text-[#434655] text-[14px] text-center leading-snug mb-6">
          Program magang Anda di{" "}
          <span className="text-[#191b23] font-bold">PT Teknologi Maju</span>{" "}
          akan segera dimulai.
        </p>

        {/* Job card */}
        <div className="w-full max-w-[320px] bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4 mb-5">
          <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-[9px] size-[50px] flex items-center justify-center shrink-0">
            <img src={imgCompany} alt="PT Teknologi Maju" className="size-[37px] rounded-[4px] object-cover" />
          </div>
          <div>
            <p className="text-[#1e293b] font-semibold text-[14px] leading-snug">Frontend Developer</p>
            <p className="text-[rgba(0,0,0,0.5)] text-[12px] leading-snug">PT Teknologi Maju</p>
            <p className="text-[rgba(0,0,0,0.5)] text-[12px] leading-snug">Mulai: 1 April 2026</p>
          </div>
        </div>

        {/* Info banner */}
        <div className="w-full max-w-[320px] bg-[#e8f5e9] border border-[#c8e6c9] rounded-lg px-4 py-3 flex items-center gap-2.5 mb-6">
          <svg fill="none" viewBox="0 0 17 17" className="size-[17px] shrink-0">
            <g clipPath="url(#clip_info)">
              <path
                d="M8.5 15.5833C12.412 15.5833 15.5833 12.412 15.5833 8.5C15.5833 4.58798 12.412 1.41667 8.5 1.41667C4.58798 1.41667 1.41667 4.58798 1.41667 8.5C1.41667 12.412 4.58798 15.5833 8.5 15.5833Z"
                stroke="#2E7D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667"
              />
              <path d="M8.5 11.3333V8.5" stroke="#2E7D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
              <path d="M8.5 5.66667H8.50625" stroke="#2E7D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
            </g>
            <defs><clipPath id="clip_info"><rect fill="white" width="17" height="17" /></clipPath></defs>
          </svg>
          <span className="text-[#2e7d32] text-[12px] leading-snug">
            Informasi lebih lanjut akan dikirimkan melalui email
          </span>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="border border-[#3a60a0] text-[#3a60a0] rounded-[5px] px-6 py-2.5 font-bold text-[13px] hover:bg-blue-50 transition-colors"
        >
          Kembali ke Status
        </button>
      </div>
    </div>
  );
}

/* ─── Shared application info card ─── */
function AppInfoCard({ label = "Diterima", showLabel = true }: { label?: string; showLabel?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-[#f8f9fc] rounded-[15px] p-3 border border-[rgba(226,232,240,0.3)] shrink-0">
        <img src={imgCompany} alt="PT Teknologi Maju" className="size-[63px] rounded-[7px] object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-[#0f172a] font-bold text-lg leading-tight">Frontend Developer Intern</p>
        <p className="text-[#64748b] text-base mt-0.5">PT Teknologi Maju</p>
        <div className="flex items-center gap-1.5 mt-1">
          <Calendar size={13} className="text-[#3a60a0]" />
          <span className="text-[#94a3b8] text-sm">Dilamar: 20 Maret 2026</span>
        </div>
      </div>
      {showLabel && (
        <span className="bg-green-50 text-green-600 border border-green-200 text-sm font-medium px-4 py-1.5 rounded-full shrink-0">
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── STATUS: LIHAT BERKAS ─── */
const berkasData = [
  { no: 1, nama: "Curriculum Vitae.pdf", jenis: "Dokumen", tgl: "18 Maret 2026, 14:32", color: "red" },
  { no: 2, nama: "Surat Lamaran.pdf", jenis: "Dokumen", tgl: "18 Maret 2026, 14:32", color: "red" },
  { no: 3, nama: "Transkrip Nilai.docx", jenis: "Dokumen", tgl: "18 Maret 2026, 14:32", color: "blue" },
  { no: 4, nama: "Sertifikat Web Development.pdf", jenis: "Dokumen", tgl: "18 Maret 2026, 14:32", color: "red" },
  { no: 5, nama: "KTP.jpg", jenis: "Gambar", tgl: "18 Maret 2026, 14:32", color: "green" },
  { no: 6, nama: "Pas Foto.jpg", jenis: "Gambar", tgl: "18 Maret 2026, 14:32", color: "green" },
];

function FileIconBadge({ color }: { color: string }) {
  const bg = color === "red" ? "bg-red-100" : color === "blue" ? "bg-blue-100" : "bg-green-100";
  const tc = color === "red" ? "text-red-600" : color === "blue" ? "text-blue-600" : "text-green-600";
  return (
    <div className={`size-8 rounded flex items-center justify-center ${bg}`}>
      <FileText size={16} className={tc} />
    </div>
  );
}

export function StatusLihatBerkas({ onBack, onViewDetail }: { onBack: () => void; onViewDetail: (berkas: typeof berkasData[0]) => void }) {
  return (
    <div className="p-6">
      <h1 className="text-[#3a60a0] text-2xl font-bold">Lihat Berkas Lamaran</h1>
      <p className="text-[#3a60a0] text-sm mt-1 mb-6">Frontend Developer Intern - PT Teknologi Maju</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-3">Informasi Lamaran</p>
        <AppInfoCard />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3.5 border-b border-slate-100">
          <p className="text-[#3a60a0] font-semibold text-sm tracking-widest uppercase text-xs">Daftar Berkas</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-16">NO</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Berkas</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Jenis Berkas</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Tanggal Upload</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berkasData.map((row) => (
              <tr key={row.no} className="border-b border-slate-50 hover:bg-slate-50/50 last:border-0">
                <td className="px-6 py-4 text-sm text-slate-500">{row.no}.</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileIconBadge color={row.color} />
                    <span className="text-sm text-[#0f172a] font-medium">{row.nama}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{row.jenis}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{row.tgl}</td>
                <td className="px-6 py-4">
                  <button onClick={() => onViewDetail(row)} className="px-4 py-1.5 border border-slate-300 rounded-lg text-sm text-[#0f172a] hover:bg-slate-100 transition-colors">
                    Lihat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-5 h-10 rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] font-semibold text-base hover:bg-slate-200 transition-colors">
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>
    </div>
  );
}

/* ─── STATUS: DETAIL BERKAS ─── */
interface BerkasItem { no: number; nama: string; jenis: string; tgl: string; color: string; }

export function StatusDetailBerkas({ onBack, berkas }: { onBack: () => void; berkas?: BerkasItem | null }) {
  const file = berkas ?? berkasData[0];
  const iconBg = file.color === "red" ? "bg-red-100" : file.color === "blue" ? "bg-blue-100" : "bg-green-100";
  const iconColor = file.color === "red" ? "text-red-600" : file.color === "blue" ? "text-blue-600" : "text-green-600";

  return (
    <div className="p-6">
      <h1 className="text-[#3a60a0] text-2xl font-bold">Detail Berkas</h1>
      <p className="text-[#3a60a0] text-sm mt-1 mb-6">Lihat Detail dan Preview Berkas Lamaran</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-3">Informasi Lamaran</p>
        <div className="flex items-center gap-4">
          <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
            <FileText size={22} className={iconColor} />
          </div>
          <div className="flex-1">
            <p className="text-[#0a0a0a] font-semibold text-base">{file.nama}</p>
            <p className="text-[#4a5565] text-sm">{file.jenis}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar size={12} className="text-[#6a7282]" />
              <span className="text-[#6a7282] text-xs">Diupload pada {file.tgl}</span>
            </div>
          </div>
          <span className="bg-green-50 text-green-600 border border-green-200 text-sm font-medium px-4 py-1.5 rounded-full shrink-0">
            Diterima
          </span>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>1</span><span className="text-slate-300">/</span><span>3</span>
            <div className="flex items-center gap-1 ml-2">
              <button className="w-6 h-6 border border-slate-200 rounded text-sm flex items-center justify-center hover:bg-white">−</button>
              <span className="text-xs px-2">100%</span>
              <button className="w-6 h-6 border border-slate-200 rounded text-sm flex items-center justify-center hover:bg-white">+</button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-100 flex justify-center" style={{ minHeight: 400 }}>
          <div className="bg-white shadow-lg w-full max-w-xl p-8 rounded text-sm text-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800 tracking-wide">ANDI PRATAMA</h2>
                <p className="text-slate-500 text-xs">Frontend Developer</p>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-0.5">
                <p>andi.pratama@email.com</p>
                <p>(62) 0856-7890</p>
                <p>Jakarta Selatan</p>
                <p>linkedin.com/in/andipratama</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Seorang Frontend Developer dengan pengalaman 2 tahun dalam membangun aplikasi web yang menarik, responsif, dan user-friendly.
            </p>
            <div className="mb-3">
              <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2 text-xs uppercase tracking-wide">Pengalaman Kerja</h3>
              <div className="flex justify-between">
                <p className="font-semibold text-slate-700 text-xs">Frontend Developer</p>
                <p className="text-slate-400 text-xs">Jan 2019 – Sekarang</p>
              </div>
              <ul className="text-xs text-slate-400 list-disc list-inside mt-1 space-y-0.5">
                <li>Mengembangkan antarmuka menggunakan React dan Tailwind CSS</li>
                <li>Melakukan REST API integration</li>
                <li>Mengoptimalkan performa aplikasi hingga 50%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2 text-xs uppercase tracking-wide">Pendidikan</h3>
              <div className="flex justify-between">
                <p className="font-semibold text-slate-700 text-xs">Universitas Indonesia</p>
                <p className="text-slate-400 text-xs">2018 – 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-5 h-10 rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] font-semibold text-base hover:bg-slate-200 transition-colors">
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>
    </div>
  );
}

/* ─── STATUS: KONFIRMASI KESEDIAAN (step 1) ─── */
export function StatusKonfirmasiKesediaan({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [agreed, setAgreed] = useState(true);
  return (
    <div className="p-6">
      <h1 className="text-[#0f172a] text-2xl font-bold">Konfirmasi Kesediaan</h1>
      <p className="text-slate-500 text-sm mt-1 mb-6">Konfirmasi kesediaan Anda untuk mengikuti program magang.</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
        <StatusStepProgress currentStep={1} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-3">Detail Lamaran</p>
        <AppInfoCard />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-2">Konfirmasi Kesediaan</p>
        <p className="text-[#64748b] text-sm mb-4">
          Dengan ini saya menyatakan bersedia untuk mengikuti program magang di PT Teknologi Maju sesuai dengan ketentuan yang berlaku.
        </p>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setAgreed(v => !v)}
            className={`size-[22px] rounded flex items-center justify-center border-[1.33px] transition-colors ${agreed ? "bg-[#3a60a0] border-[#3a60a0]" : "bg-[#f3f3f5] border-slate-300"}`}
          >
            {agreed && <Check size={14} className="text-white" strokeWidth={3} />}
          </div>
          <span className="text-[#0f172a] font-semibold text-sm">Saya bersedia mengikuti program magang</span>
        </label>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ─── STATUS: PEMBEKALAN (step 2) ─── */
export function StatusPembekalan({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="p-6">
      <h1 className="text-[#0f172a] text-2xl font-bold">Pembekalan</h1>
      <p className="text-slate-500 text-sm mt-1 mb-6">Ikuti pembekalan dari perusahaan sebelum memulai program magang.</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
        <StatusStepProgress currentStep={2} />
      </div>

      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-[#3b82f6]" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <p className="text-[#3a60a0] text-sm">Sebelum memulai magang, Anda wajib mengikuti pembekalan dari perusahaan.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-4">Jadwal Pembekalan</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Calendar size={16} className="text-[#3a60a0]" />, label: "Tanggal", value: "24 Maret 2026" },
            { icon: <Clock size={16} className="text-[#3a60a0]" />, label: "Waktu", value: "09:00 – 12:00 WIB" },
            { icon: <Monitor size={16} className="text-[#3a60a0]" />, label: "Platform", value: "Google Meet" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">{icon}<span className="text-xs text-slate-400">{label}</span></div>
              <p className="font-bold text-[#0f172a] text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-4">Materi Pembekalan</p>
        <ol className="space-y-4">
          {[
            { t: "Pengenalan Perusahaan & Budaya Kerja", d: "Mengenal visi misi perusahaan, struktur organisasi, dan budaya kerja." },
            { t: "Etika & Aturan Kerja", d: "Pemahaman tentang etika kerja, peraturan perusahaan, dan kode etik." },
            { t: "Pengenalan Proyek & Tools", d: "Pengenalan teknologi, tools, dan alur kerja yang akan digunakan selama magang." },
          ].map(({ t, d }, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[#0f172a] font-bold text-sm shrink-0">{i + 1}.</span>
              <div>
                <p className="font-bold text-[#0f172a] text-sm">{t}</p>
                <p className="text-slate-500 text-sm mt-0.5">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Saya Sudah Mengikuti" />
    </div>
  );
}

/* ─── STATUS: PENANDATANGANAN (step 3) ─── */
export function StatusPenandatanganan({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.strokeStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.moveTo(60, 90); ctx.bezierCurveTo(85, 45, 130, 45, 145, 90);
    ctx.bezierCurveTo(158, 130, 115, 138, 100, 108);
    ctx.bezierCurveTo(88, 78, 128, 65, 175, 105);
    ctx.stroke();
  }, []);

  const getXY = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: ((e as React.MouseEvent).clientX - rect.left) * scaleX, y: ((e as React.MouseEvent).clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const c = canvasRef.current!; const ctx = c.getContext("2d")!;
    const { x, y } = getXY(e, c);
    ctx.beginPath(); ctx.moveTo(x, y);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const c = canvasRef.current!; const ctx = c.getContext("2d")!;
    ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.strokeStyle = "#1a1a1a";
    const { x, y } = getXY(e, c);
    ctx.lineTo(x, y); ctx.stroke();
  };
  const stopDraw = () => { drawing.current = false; };
  const clearSig = () => {
    const c = canvasRef.current!; const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className="p-6">
      <h1 className="text-[#0f172a] text-2xl font-bold">Penandatanganan</h1>
      <p className="text-slate-500 text-sm mt-1 mb-6">Tandatangani dokumen kerja sama sebagai tanda persetujuan.</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
        <StatusStepProgress currentStep={3} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-1">Dokumen yang Perlu Ditandatangani</p>
        <p className="text-slate-500 text-sm mb-4">Silakan baca dan tandatangani dokumen di bawa ini (wajib menggunakan E-Materai).</p>
        <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0f172a] text-sm">Perjanjian Kerja Sama Magang</p>
              <p className="text-slate-400 text-xs">Dokumen kerja sama antara Anda dan PT Teknologi Maju</p>
            </div>
          </div>
          <button className="px-4 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Lihat</button>
        </div>
      </div>

      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-[#3b82f6]" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <p className="text-[#3a60a0] text-sm">Sebelum memulai magang, Anda wajib mengikuti pembekalan dari perusahaan.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-1">Tanda Tangan Digital</p>
        <p className="text-slate-500 text-sm mb-4">Gunakan tanda tangan digital Anda untuk menandatangani dokumen.</p>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef} width={700} height={160}
            className="w-full bg-white cursor-crosshair"
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          />
          <div className="border-t border-slate-100 px-4 py-2.5 flex justify-end bg-slate-50">
            <button onClick={clearSig} className="px-4 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-white transition-colors">
              Ubah Tanda Tangan
            </button>
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ─── DAFTAR LOWONGAN ─── */
export function DaftarLowongan({ onApply, onViewStatus }: { onApply: () => void; onViewStatus: () => void }) {
  return (
    <div className="p-6">
      <h1 className="text-[#0f172a] text-2xl font-bold">Daftar Lowongan</h1>
      <p className="text-slate-500 text-sm mt-1 mb-6">Temukan lowongan magang yang sesuai dengan bidang kamu.</p>
      <div className="space-y-4">
        {[
          { title: "Frontend Developer", company: "PT. Teknologi Maju", loc: "Jakarta • On-site", deadline: "30 Jun 2026", applied: true },
          { title: "UI/UX Designer", company: "PT. Kreatif Digital", loc: "Bandung • Remote", deadline: "15 Jul 2026", applied: false },
          { title: "Backend Developer", company: "PT. Solusi Teknologi", loc: "Surabaya • Hybrid", deadline: "20 Jul 2026", applied: false },
        ].map((job, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <img src={imgCompany} alt={job.company} className="size-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-[#0f172a] font-bold text-base">{job.title}</h3>
              <p className="text-slate-500 text-sm">{job.company}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{job.loc}</span>
                <span className="text-xs text-slate-400">Deadline: {job.deadline}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {job.applied ? (
                <>
                  <button onClick={onViewStatus} className="px-4 py-2 border border-[#3a60a0] text-[#3a60a0] rounded-xl text-sm font-medium hover:bg-blue-50">Lihat Status</button>
                  <span className="bg-green-50 text-green-600 border border-green-200 text-xs font-medium px-3 py-1.5 rounded-full">Sudah Dilamar</span>
                </>
              ) : (
                <button onClick={onApply} className="px-5 py-2 bg-[#3a60a0] text-white rounded-xl text-sm font-bold hover:bg-[#2d4d82] shadow-sm">Lamar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── STATUS LIST ─── */
type ProgressStep = {
  label: string;
  date?: string;
  state: "done" | "active" | "pending";
};

type ApplicationEntry = {
  id: number;
  title: string;
  company: string;
  appliedDate: string;
  badge: { label: string; color: "green" | "blue" | "orange" };
  steps: ProgressStep[];
  showMulaiMagang?: boolean;
};

const applications: ApplicationEntry[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "PT Teknologi Maju",
    appliedDate: "20 Maret 2026",
    badge: { label: "Diterima", color: "green" },
    showMulaiMagang: true,
    steps: [
      { label: "Pengajuan Berkas", date: "20 Maret 2026", state: "done" },
      { label: "Verifikasi Admin", date: "21 Maret 2026", state: "done" },
      { label: "Seleksi Perusahaan", date: "23 Maret 2026", state: "done" },
      { label: "Diterima", date: "24 Maret 2026", state: "done" },
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer Intern",
    company: "PT Digital Kreatif",
    appliedDate: "22 Maret 2026",
    badge: { label: "Review Perusahaan", color: "blue" },
    steps: [
      { label: "Pengajuan Berkas", date: "22 Maret 2026", state: "done" },
      { label: "Verifikasi Admin", date: "23 Maret 2026", state: "done" },
      { label: "Seleksi Perusahaan", state: "active" },
      { label: "Keputusan", state: "pending" },
    ],
  },
  {
    id: 3,
    title: "Backend Developer Intern",
    company: "PT Inovasi Sistem",
    appliedDate: "23 Maret 2026",
    badge: { label: "Verifikasi Admin", color: "orange" },
    steps: [
      { label: "Pengajuan Berkas", date: "23 Maret 2026", state: "done" },
      { label: "Verifikasi Admin", state: "active" },
      { label: "Seleksi Perusahaan", state: "pending" },
      { label: "Keputusan", state: "pending" },
    ],
  },
];

function StepIcon({ state }: { state: ProgressStep["state"] }) {
  if (state === "done") {
    return (
      <div className="size-5 rounded-full bg-[#dcfce7] border border-[#bbf7d0] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 12 12" fill="none" className="size-3">
          <path d="M2 6.5L4.5 9L10 3.5" stroke="#00a63e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="size-5 rounded-full bg-[#dbeafe] border border-[#bfdbfe] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 12 12" fill="none" className="size-3">
          <circle cx="6" cy="6" r="4.5" stroke="#155dfc" strokeWidth="1.2" />
          <path d="M6 3.5V6L7.5 7" stroke="#155dfc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="size-5 rounded-full border border-[#d1d5dc] bg-white shrink-0" />
  );
}

function BadgePill({ label, color }: { label: string; color: "green" | "blue" | "orange" }) {
  const styles = {
    green: "bg-[#dcfce7] text-[#016630]",
    blue: "bg-[#dbeafe] text-[#193cb8]",
    orange: "bg-[#ffedd4] text-[#9f2d00]",
  };
  const DoneIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 shrink-0">
      <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const ClockIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 shrink-0">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.5V6L7.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 ${styles[color]}`}>
      {color === "green" ? <DoneIcon /> : <ClockIcon />}
      {label}
    </span>
  );
}

export function StatusList({ onViewBerkas, onViewProgress }: { onViewBerkas: () => void; onViewProgress: () => void }) {
  const stats = [
    { label: "Total Lamaran", value: "3", color: "text-[#0a0a0a]" },
    { label: "Diterima", value: "1", color: "text-[#00a63e]" },
    { label: "Proses Review", value: "2", color: "text-[#155dfc]" },
    { label: "Ditolak", value: "0", color: "text-[#e7000b]" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-[#0f172a] text-2xl font-bold">Status Pendaftaran</h1>
      <p className="text-slate-500 text-sm mt-1 mb-6">Lacak progress lamaran magang Anda</p>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] py-5 flex flex-col items-center justify-center gap-1">
            <p className="text-[#4a5565] text-sm">{s.label}</p>
            <p className={`text-[30px] font-bold leading-none ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Application cards */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] overflow-hidden">
            {/* Header row */}
            <div className="flex items-center gap-4 px-6 pt-6 pb-3">
              <div className="size-12 rounded-[10px] bg-[#dbeafe] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="size-6">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14,2 14,8 20,8" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="10" y1="10" x2="14" y2="10" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" />
                  <line x1="10" y1="14" x2="14" y2="14" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" />
                  <line x1="10" y1="18" x2="14" y2="18" stroke="#155dfc" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0a0a0a] font-medium text-base leading-tight">{app.title}</p>
                <p className="text-[#717182] text-sm mt-0.5">{app.company}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar size={13} className="text-[#4a5565]" />
                  <span className="text-[#4a5565] text-xs">Dilamar: {app.appliedDate}</span>
                </div>
              </div>
              <BadgePill label={app.badge.label} color={app.badge.color} />
            </div>

            {/* Progress section */}
            <div className="px-6 pb-3">
              <p className="text-[#364153] font-semibold text-sm mb-3">Progress Lamaran:</p>
              <div>
                {app.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <StepIcon state={step.state} />
                      {idx < app.steps.length - 1 && (
                        <div className="w-0.5 h-8 bg-[#e5e7eb]" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between" style={{ minHeight: 32 }}>
                      <p className={`text-sm font-medium ${step.state === "pending" ? "text-[#9ca3af]" : "text-[#101828]"}`}>
                        {step.label}
                      </p>
                      {step.date && (
                        <span className="text-[#6a7282] text-xs">{step.date}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="border-t border-[rgba(0,0,0,0.1)] px-6 py-3 flex items-center gap-3">
              <button
                onClick={onViewBerkas}
                className="flex items-center gap-1.5 px-4 py-1.5 border border-[rgba(0,0,0,0.1)] rounded-lg text-[#0a0a0a] text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <FileText size={14} />
                Lihat Berkas
              </button>
              {app.showMulaiMagang && (
                <button
                  onClick={onViewProgress}
                  className="px-4 py-1.5 bg-[#030213] text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors"
                >
                  Mulai Magang
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
