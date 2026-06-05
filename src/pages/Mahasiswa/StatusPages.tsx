import { useEffect, useRef, useState } from "react";
import imgCompany from "../../assets/images/company-1.png";
import { Calendar, FileText, ArrowLeft, Clock, Monitor, Check, Loader2, Building2 } from "lucide-react";
import { StatusStepProgress } from "../../components/StatusStepProgress";
import { NavButtons } from "../../components/NavButtons";
import { useMyPendaftaran } from "../../hooks/usePendaftaran";
import type { PendaftaranMahasiswa } from "../../services/pendaftaranService";
import {
  usePendaftaranStore,
  type PendaftaranDocumentKey,
  type SelectedPendaftaran,
  type SelectedPendaftaranDocument,
} from "../../stores/pendaftaranStore";
import { useAuthStore } from "../../stores/authStore";
import { DashboardHeader } from "../../components/common/DashboardHeader";

const documentConfig: Array<{
  key: PendaftaranDocumentKey;
  label: string;
  type: "Dokumen" | "Gambar";
  color: "red" | "blue" | "green";
}> = [
  { key: "cv_file", label: "Curriculum Vitae", type: "Dokumen", color: "red" },
  { key: "surat_pengantar", label: "Surat Pengantar", type: "Dokumen", color: "red" },
  { key: "transkrip_nilai", label: "Transkrip Nilai", type: "Dokumen", color: "blue" },
  { key: "sertifikat_file", label: "Sertifikat Pendukung", type: "Dokumen", color: "red" },
  { key: "ktm_file", label: "Kartu Mahasiswa", type: "Gambar", color: "green" },
  { key: "foto_terbaru", label: "Foto Terbaru", type: "Gambar", color: "green" },
];

type ProgressStep = {
  label: string;
  date?: string;
  state: "done" | "active" | "pending";
};

const statusBadgeMap = {
  Pending: { label: "Verifikasi Admin", color: "orange" as const },
  Diterima: { label: "Diterima", color: "green" as const },
  Ditolak: { label: "Ditolak", color: "blue" as const },
};

function formatDate(dateStr?: string | null, withTime = false) {
  if (!dateStr) return "-";

  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  });
}

function buildDocuments(item: PendaftaranMahasiswa): SelectedPendaftaranDocument[] {
  return documentConfig
    .map((document) => {
      const path = item[document.key];
      if (!path) return null;

      return {
        key: document.key,
        label: document.label,
        type: document.type,
        fileName: path.split("/").pop() || document.label,
        uploadedAt: item.updated_at || item.created_at,
        path,
      };
    })
    .filter((document): document is SelectedPendaftaranDocument => Boolean(document));
}

function mapPendaftaran(item: PendaftaranMahasiswa): SelectedPendaftaran {
  return {
    id: item.id_pendaftaran,
    title: item.lowongan?.judul || "Lowongan Magang",
    company: item.lowongan?.nama_perusahaan || "Perusahaan",
    appliedDate: item.tanggal_daftar,
    status: item.status_pendaftaran,
    lowonganId: item.id_lowongan,
    companyLogo: item.lowongan?.logo_perusahaan || null,
    documents: buildDocuments(item),
  };
}

function getProgressSteps(item: PendaftaranMahasiswa): ProgressStep[] {
  if (item.status_pendaftaran === "Diterima") {
    return [
      { label: "Pengajuan Berkas", date: formatDate(item.tanggal_daftar), state: "done" },
      { label: "Verifikasi Admin", date: formatDate(item.updated_at), state: "done" },
      { label: "Seleksi Perusahaan", date: formatDate(item.updated_at), state: "done" },
      { label: "Diterima", date: formatDate(item.updated_at), state: "done" },
    ];
  }

  if (item.status_pendaftaran === "Ditolak") {
    return [
      { label: "Pengajuan Berkas", date: formatDate(item.tanggal_daftar), state: "done" },
      { label: "Verifikasi Admin", date: formatDate(item.updated_at), state: "done" },
      { label: "Seleksi Perusahaan", date: formatDate(item.updated_at), state: "done" },
      { label: "Ditolak", date: formatDate(item.updated_at), state: "done" },
    ];
  }

  return [
    { label: "Pengajuan Berkas", date: formatDate(item.tanggal_daftar), state: "done" },
    { label: "Verifikasi Admin", state: "active" },
    { label: "Seleksi Perusahaan", state: "pending" },
    { label: "Keputusan", state: "pending" },
  ];
}

function getStatusStats(items: PendaftaranMahasiswa[]) {
  return [
    { label: "Total Lamaran", value: String(items.length), color: "text-[#1e293b]" },
    {
      label: "Diterima",
      value: String(items.filter((item) => item.status_pendaftaran === "Diterima").length),
      color: "text-[#00a63e]",
    },
    {
      label: "Proses Review",
      value: String(items.filter((item) => item.status_pendaftaran === "Pending").length),
      color: "text-[#155dfc]",
    },
    {
      label: "Ditolak",
      value: String(items.filter((item) => item.status_pendaftaran === "Ditolak").length),
      color: "text-[#e7000b]",
    },
  ];
}

function AppInfoCard({
  label,
  showLabel = true,
  application,
}: {
  label?: string;
  showLabel?: boolean;
  application: SelectedPendaftaran | null;
}) {
  const badge = application ? statusBadgeMap[application.status as keyof typeof statusBadgeMap] : null;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-[#f8f9fc] rounded-[15px] p-3 border border-[rgba(226,232,240,0.3)] shrink-0">
        {application?.companyLogo ? (
          <img
            src={application.companyLogo}
            alt={application.company}
            className="size-[63px] rounded-[7px] object-cover"
          />
        ) : (
          <img src={imgCompany} alt={application?.company || "Perusahaan"} className="size-[63px] rounded-[7px] object-cover" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-slate-900 font-bold text-lg leading-tight">{application?.title || "Belum ada lamaran"}</p>
        <p className="text-[#64748b] text-base mt-0.5">{application?.company || "Perusahaan"}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <Calendar size={13} className="text-[#3a60a0]" />
          <span className="text-[#94a3b8] text-sm">
            Dilamar: {application ? formatDate(application.appliedDate) : "-"}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="bg-green-50 text-green-600 border border-green-200 text-sm font-medium px-4 py-1.5 rounded-full shrink-0">
          {label || badge?.label || "-"}
        </span>
      )}
    </div>
  );
}

function FileIconBadge({ color }: { color: string }) {
  const bg = color === "red" ? "bg-red-100" : color === "blue" ? "bg-blue-100" : "bg-green-100";
  const tc = color === "red" ? "text-red-600" : color === "blue" ? "text-blue-600" : "text-green-600";
  return (
    <div className={`size-8 rounded flex items-center justify-center ${bg}`}>
      <FileText size={16} className={tc} />
    </div>
  );
}

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

  return <div className="size-5 rounded-full border border-[#d1d5dc] bg-white shrink-0" />;
}

function BadgePill({ label, color }: { label: string; color: "green" | "blue" | "orange" }) {
  const styles = {
    green: "bg-[#dcfce7] text-[#016630]",
    blue: "bg-[#dbeafe] text-[#193cb8]",
    orange: "bg-[#ffedd4] text-[#9f2d00]",
  };

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 ${styles[color]}`}>
      <Clock size={12} />
      {label}
    </span>
  );
}

function StatusLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
      <Loader2 className="size-10 animate-spin text-[#3a60a0]" />
      <p className="mt-4 text-sm font-medium">Memuat status pendaftaran...</p>
    </div>
  );
}

function StatusEmpty() {
  return (
    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] p-10 text-center">
      <Building2 className="mx-auto size-10 text-slate-300" />
      <p className="mt-4 text-slate-900 font-semibold">Belum ada lamaran magang</p>
      <p className="mt-1 text-sm text-slate-500">Lamaran yang sudah dikirim akan muncul di halaman ini.</p>
    </div>
  );
}

export function StatusMulaiMagang({ onBack }: { onBack: () => void }) {
  const user = useAuthStore((state) => state.user);
  const selectedPendaftaran = usePendaftaranStore((state) => state.selectedPendaftaran);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Mulai Magang" 
          description="Selamat! Anda siap memulai program magang" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 mb-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <StatusStepProgress currentStep={5} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col items-center">
        <div className="relative mb-6" style={{ width: 150, height: 150 }}>
          <svg width="150" height="150" viewBox="0 0 196 196" fill="none" className="w-full h-full">
            <rect x="53" y="53" width="90" height="90" rx="45" fill="#4CAF50" />
            <path d="M116 78.625L91.25 103.375L80 92.125" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" />
          </svg>
        </div>

        <p className="text-[#191b23] font-semibold text-base md:text-[18px] leading-tight text-center mb-2">
          Selamat, {user?.nama || "Mahasiswa"}!
        </p>
        <p className="text-[#434655] text-sm md:text-[14px] text-center leading-snug mb-6">
          Program magang Anda di <span className="text-[#191b23] font-bold">{selectedPendaftaran?.company || "perusahaan tujuan"}</span> siap dimulai.
        </p>

        <div className="w-full max-w-[320px] bg-white border border-slate-200 rounded-xl px-4 md:px-5 py-3 md:py-4 flex items-center gap-4 mb-5">
          <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-[9px] size-[50px] flex items-center justify-center shrink-0">
            <img src={selectedPendaftaran?.companyLogo || imgCompany} alt={selectedPendaftaran?.company || "Perusahaan"} className="size-[37px] rounded-[4px] object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-[#1e293b] font-semibold text-sm leading-snug truncate">{selectedPendaftaran?.title || "Posisi Magang"}</p>
            <p className="text-[rgba(0,0,0,0.5)] text-xs leading-snug truncate">{selectedPendaftaran?.company || "Perusahaan"}</p>
            <p className="text-[rgba(0,0,0,0.5)] text-xs leading-snug">Mulai: {selectedPendaftaran ? formatDate(selectedPendaftaran.appliedDate) : "-"}</p>
          </div>
        </div>

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

export function StatusLihatBerkas({
  onBack,
  onViewDetail,
}: {
  onBack: () => void;
  onViewDetail: (berkas: SelectedPendaftaranDocument) => void;
}) {
  const selectedPendaftaran = usePendaftaranStore((state) => state.selectedPendaftaran);

  if (!selectedPendaftaran) {
    return (
      <div className="p-4 md:p-6">
        <StatusEmpty />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Lihat Berkas Lamaran" 
          description={`${selectedPendaftaran.title} - ${selectedPendaftaran.company}`} 
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-3">Informasi Lamaran</p>
        <AppInfoCard application={selectedPendaftaran} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3.5 border-b border-slate-100">
          <p className="text-[#3a60a0] font-semibold text-[10px] md:text-xs tracking-widest uppercase">Daftar Berkas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
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
              {selectedPendaftaran.documents.map((row, index) => {
                const config = documentConfig.find((item) => item.key === row.key);
                return (
                  <tr key={row.key} className="border-b border-slate-50 hover:bg-slate-50/50 last:border-0">
                    <td className="px-6 py-4 text-sm text-slate-500">{index + 1}.</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileIconBadge color={config?.color || "red"} />
                        <span className="text-sm text-slate-900 font-medium">{row.fileName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{formatDate(row.uploadedAt, true)}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => onViewDetail(row)} className="px-4 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-900 hover:bg-slate-100 transition-colors">
                        Lihat
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-5 h-10 rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] font-semibold text-sm md:text-base hover:bg-slate-200 transition-colors">
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>
    </div>
  );
}

export function StatusDetailBerkas({ onBack }: { onBack: () => void }) {
  const selectedPendaftaran = usePendaftaranStore((state) => state.selectedPendaftaran);
  const selectedDocument = usePendaftaranStore((state) => state.selectedDocument);

  if (!selectedPendaftaran || !selectedDocument) {
    return (
      <div className="p-4 md:p-6">
        <StatusEmpty />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Detail Berkas" 
          description="Informasi berkas lamaran yang sudah diunggah" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-3">Informasi Lamaran</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="size-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-100">
            <FileText size={22} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#1e293b] font-semibold text-base truncate">{selectedDocument.fileName}</p>
            <p className="text-[#4a5565] text-sm">{selectedDocument.type}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar size={12} className="text-[#6a7282]" />
              <span className="text-[#6a7282] text-xs">Diupload pada {formatDate(selectedDocument.uploadedAt, true)}</span>
            </div>
          </div>
          <span className="w-fit bg-green-50 text-green-600 border border-green-200 text-sm font-medium px-4 py-1.5 rounded-full shrink-0">
            {selectedPendaftaran.status}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6">
        <p className="text-slate-900 font-semibold text-base">{selectedDocument.label}</p>
        <p className="text-slate-500 text-sm mt-2 break-all">Path file: {selectedDocument.path}</p>
      </div>

      <div className="mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-5 h-10 rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] font-semibold text-sm md:text-base hover:bg-slate-200 transition-colors">
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>
    </div>
  );
}

export function StatusKonfirmasiKesediaan({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [agreed, setAgreed] = useState(true);
  const selectedPendaftaran = usePendaftaranStore((state) => state.selectedPendaftaran);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Konfirmasi Kesediaan" 
          description="Konfirmasi kesediaan Anda untuk mengikuti program magang." 
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 mb-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <StatusStepProgress currentStep={1} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-3">Detail Lamaran</p>
        <AppInfoCard application={selectedPendaftaran} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-2">Konfirmasi Kesediaan</p>
        <p className="text-[#64748b] text-sm mb-4">
          Dengan ini saya menyatakan bersedia untuk mengikuti program magang sesuai dengan ketentuan yang berlaku.
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => setAgreed((value) => !value)}
            className={`size-[22px] rounded flex items-center justify-center border-[1.33px] transition-colors shrink-0 mt-0.5 ${agreed ? "bg-[#3a60a0] border-[#3a60a0]" : "bg-[#f3f3f5] border-slate-300"}`}
          >
            {agreed && <Check size={14} className="text-white" strokeWidth={3} />}
          </div>
          <span className="text-slate-900 font-semibold text-sm">Saya bersedia mengikuti program magang</span>
        </label>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

export function StatusPembekalan({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Pembekalan" 
          description="Ikuti pembekalan dari perusahaan sebelum memulai program magang." 
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 mb-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <StatusStepProgress currentStep={2} />
        </div>
      </div>

      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
        <Calendar className="size-5 shrink-0 text-[#3b82f6]" />
        <p className="text-[#3a60a0] text-sm">Sebelum memulai magang, Anda wajib mengikuti pembekalan dari perusahaan.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-4">Jadwal Pembekalan</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Calendar size={16} className="text-[#3a60a0]" />, label: "Tanggal", value: "Menunggu informasi" },
            { icon: <Clock size={16} className="text-[#3a60a0]" />, label: "Waktu", value: "Menunggu informasi" },
            { icon: <Monitor size={16} className="text-[#3a60a0]" />, label: "Platform", value: "Menunggu informasi" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">{icon}<span className="text-xs text-slate-400">{label}</span></div>
              <p className="font-bold text-slate-900 text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Saya Sudah Mengikuti" />
    </div>
  );
}

export function StatusPenandatanganan({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1a1a1a";
  }, []);

  const getXY = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getXY(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getXY(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearSig = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Penandatanganan" 
          description="Tandatangani dokumen kerja sama sebagai tanda persetujuan." 
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 mb-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <StatusStepProgress currentStep={3} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-4">
        <p className="text-[#3a60a0] font-semibold text-sm mb-1">Tanda Tangan Digital</p>
        <p className="text-slate-500 text-xs md:text-sm mb-4">Gunakan tanda tangan digital Anda untuk menandatangani dokumen.</p>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={700}
            height={160}
            className="w-full bg-white cursor-crosshair h-[160px]"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={() => {
              drawing.current = false;
            }}
            onMouseLeave={() => {
              drawing.current = false;
            }}
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

export function StatusList({
  onViewBerkas,
  onViewProgress,
}: {
  onViewBerkas: (application: SelectedPendaftaran) => void;
  onViewProgress: (application: SelectedPendaftaran) => void;
}) {
  const { data, isLoading, isError } = useMyPendaftaran();
  const setSelectedPendaftaran = usePendaftaranStore((state) => state.setSelectedPendaftaran);
  const applications = (data?.data || []).map(mapPendaftaran);
  const rawApplications = data?.data || [];
  const stats = getStatusStats(rawApplications);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <StatusLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-12 text-center text-red-600 font-medium">
          Gagal memuat status pendaftaran. Silakan coba beberapa saat lagi.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Status Pendaftaran" 
          description="Pantau perkembangan status pendaftaran magang Anda." 
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] py-4 md:py-5 flex flex-col items-center justify-center gap-1">
            <p className="text-[#4a5565] text-xs md:text-sm text-center px-2">{stat.label}</p>
            <p className={`text-xl md:text-[30px] font-bold leading-none ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {applications.length === 0 ? (
        <StatusEmpty />
      ) : (
        <div className="space-y-4">
          {applications.map((application) => {
            const source = rawApplications.find((item) => item.id_pendaftaran === application.id);
            if (!source) return null;

            const badge = statusBadgeMap[source.status_pendaftaran];
            const steps = getProgressSteps(source);

            return (
              <div key={application.id} className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 md:px-6 pt-4 md:pt-6 pb-3">
                  <div className="size-12 rounded-[10px] bg-[#dbeafe] flex items-center justify-center shrink-0">
                    <FileText className="size-6 text-[#155dfc]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1e293b] font-medium text-base leading-tight truncate">{application.title}</p>
                    <p className="text-[#717182] text-sm mt-0.5 truncate">{application.company}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar size={13} className="text-[#4a5565]" />
                      <span className="text-[#4a5565] text-xs">Dilamar: {formatDate(application.appliedDate)}</span>
                    </div>
                  </div>
                  <div className="w-fit">
                    <BadgePill label={badge.label} color={badge.color} />
                  </div>
                </div>

                <div className="px-4 md:px-6 pb-3 mt-2 sm:mt-0">
                  <p className="text-[#364153] font-semibold text-sm mb-3">Progress Lamaran:</p>
                  <div className="max-w-md">
                    {steps.map((step, index) => (
                      <div key={step.label} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <StepIcon state={step.state} />
                          {index < steps.length - 1 && <div className="w-0.5 h-6 md:h-8 bg-[#e5e7eb]" />}
                        </div>
                        <div className="flex-1 flex items-center justify-between" style={{ minHeight: 28 }}>
                          <p className={`text-sm font-medium ${step.state === "pending" ? "text-[#9ca3af]" : "text-[#101828]"}`}>
                            {step.label}
                          </p>
                          {step.date && <span className="text-[#6a7282] text-[10px] md:text-xs">{step.date}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[rgba(0,0,0,0.1)] px-4 md:px-6 py-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedPendaftaran(application);
                      onViewBerkas(application);
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 border border-[rgba(0,0,0,0.1)] rounded-lg text-[#1e293b] text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    <FileText size={14} />
                    Lihat Berkas
                  </button>
                  {application.status === "Diterima" && (
                    <button
                      onClick={() => {
                        setSelectedPendaftaran(application);
                        onViewProgress(application);
                      }}
                      className="px-4 py-1.5 bg-[#030213] text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors"
                    >
                      Mulai Magang
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
