import { useState, useRef } from "react";
import { Upload, FileText, Eye, Download, CheckCircle, X } from "lucide-react";

interface Report {
  id: number;
  title: string;
  submitted: string;
  filename: string;
  badge: { label: string; color: "green" | "blue" };
  feedback: string;
  grade: number | null;
  fileUrl?: string;
  fileType?: string;
}

const initialReports: Report[] = [
  {
    id: 1,
    title: "Laporan Akhir Magang - PT Teknologi Maju",
    submitted: "22 Maret 2026",
    filename: "laporan_akhir_budi_santoso.pdf",
    badge: { label: "Dinilai - 85", color: "green" },
    feedback: "Laporan sudah baik. Analisis mendalam dan struktur rapi. Pertahankan!",
    grade: 85,
  },
  {
    id: 2,
    title: "Laporan Akhir Magang - PT Digital Kreatif",
    submitted: "25 Maret 2026",
    filename: "laporan_akhir.pdf",
    badge: { label: "Direview", color: "blue" },
    feedback: "Dokumentasi kegiatan sudah lengkap.",
    grade: null,
  },
];

const statsBase = [
  { label: "Total Lamaran", color: "text-[#0a0a0a]" },
  { label: "Dinilai", color: "text-green-600" },
  { label: "Review", color: "text-blue-600" },
  { label: "Nilai Rata - Rata", color: "text-purple-600" },
];

function Badge({ label, color }: { label: string; color: "green" | "blue" }) {
  const styles = {
    green: "bg-green-50 text-green-600 border border-green-200",
    blue: "bg-blue-50 text-blue-600 border border-blue-200",
  };
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${styles[color]}`}>
      <CheckCircle size={12} strokeWidth={2.5} />
      {label}
    </span>
  );
}

function PreviewModal({ filename, fileUrl, fileType, onClose }: { filename: string; fileUrl: string; fileType: string; onClose: () => void }) {
  const lower = filename.toLowerCase();
  const isImage = fileType.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg|bmp)$/.test(lower);
  const isPdf = fileType === "application/pdf" || lower.endsWith(".pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText size={18} className="text-blue-500 shrink-0" />
            <span className="text-[#0f172a] font-semibold text-sm truncate">{filename}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              Buka di tab baru
            </a>
            <button onClick={onClose} className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-auto bg-slate-100 flex items-center justify-center" style={{ minHeight: 400 }}>
          {isImage && (
            <img src={fileUrl} alt={filename} className="max-w-full max-h-full object-contain p-4" />
          )}
          {isPdf && (
            <embed src={fileUrl} type="application/pdf" className="w-full" style={{ height: 620 }} />
          )}
          {!isImage && !isPdf && (
            <div className="flex flex-col items-center justify-center gap-3 p-10">
              <FileText size={48} className="text-slate-300" strokeWidth={1.5} />
              <p className="text-slate-500 text-sm font-medium">Preview tidak tersedia untuk tipe file ini</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex items-center gap-1.5 bg-[#2d4a8a] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#1e3a6e] transition-colors"
              >
                Buka file
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LaporanPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [previewReport, setPreviewReport] = useState<Report | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    const now = new Date();
    const dateStr = now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const newReport: Report = {
      id: Date.now(),
      title: `Laporan Magang - ${file.name.replace(/\.[^.]+$/, "")}`,
      submitted: dateStr,
      filename: file.name,
      badge: { label: "Direview", color: "blue" },
      feedback: "Laporan sedang dalam proses review.",
      grade: null,
      fileUrl,
      fileType: file.type,
    };
    setReports((prev) => [newReport, ...prev]);
    e.target.value = "";
  };

  const dinilaiCount = reports.filter((r) => r.badge.color === "green").length;
  const reviewCount = reports.filter((r) => r.badge.color === "blue").length;
  const grades = reports.map((r) => r.grade).filter((g): g is number => g !== null);
  const avgGrade = grades.length > 0 ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length) : 0;
  const statsValues = [String(reports.length), String(dinilaiCount), String(reviewCount), avgGrade > 0 ? String(avgGrade) : "-"];

  return (
    <div className="p-6">
      {/* Hidden file input */}
      <input
        ref={uploadRef}
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#3a60a0] text-2xl font-bold">Laporan Magang</h1>
          <p className="text-[#4a5565] text-sm mt-1">Upload dan kelola laporan magang Anda</p>
        </div>
        <button
          onClick={() => uploadRef.current?.click()}
          className="flex items-center gap-2 bg-[#2d4a8a] hover:bg-[#1e3a6e] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0"
        >
          <Upload size={16} />
          Upload Laporan
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statsBase.map((s, i) => (
          <div key={s.label} className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] shadow-sm py-5 flex flex-col items-center justify-center gap-1.5">
            <p className="text-slate-500 text-sm">{s.label}</p>
            <p className={`text-[30px] font-bold leading-none ${s.color}`}>{statsValues[i]}</p>
          </div>
        ))}
      </div>

      {/* Report cards */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6">

            {/* Card header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[#0f172a] font-bold text-base leading-tight">{report.title}</p>
                  <p className="text-slate-400 text-sm mt-0.5">Disubmit: {report.submitted}</p>
                </div>
              </div>
              <Badge label={report.badge.label} color={report.badge.color} />
            </div>

            {/* File attachment */}
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-3">
              <div className="flex items-center gap-2.5">
                <FileText size={16} className="text-slate-400 shrink-0" />
                <span className="text-slate-600 text-sm">{report.filename}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => report.fileUrl && setPreviewReport(report)}
                  disabled={!report.fileUrl}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Eye size={13} />
                  Preview
                </button>
                {report.fileUrl ? (
                  <a
                    href={report.fileUrl}
                    download={report.filename}
                    className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Download size={13} />
                    Download
                  </a>
                ) : (
                  <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <Download size={13} />
                    Download
                  </button>
                )}
              </div>
            </div>

            {/* Feedback box */}
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl px-4 py-3 mb-3">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle size={14} className="text-blue-500 shrink-0" />
                <span className="text-blue-600 font-semibold text-sm">Feedback Dosen Pembimbing:</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{report.feedback}</p>
            </div>

            {/* Grade box */}
            {report.grade !== null && (
              <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-green-700 font-semibold text-sm">Nilai Akhir</p>
                  <p className="text-green-500 text-xs mt-0.5">Dievaluasi oleh Dosen Pembimbing</p>
                </div>
                <p className="text-green-600 font-bold text-3xl">{report.grade}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {previewReport && previewReport.fileUrl && (
        <PreviewModal
          filename={previewReport.filename}
          fileUrl={previewReport.fileUrl}
          fileType={previewReport.fileType ?? "application/octet-stream"}
          onClose={() => setPreviewReport(null)}
        />
      )}
    </div>
  );
}
