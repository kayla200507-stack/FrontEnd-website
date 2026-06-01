import { useState, useRef } from "react";
import { Upload, RotateCcw, CheckCircle2, FileText, User, CreditCard, Award, Image } from "lucide-react";
import { CompanyCard } from "../../components/CompanyCard";
import { StepProgress } from "../../components/StepProgress";
import { NavButtons } from "../../components/NavButtons";

interface FileCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  format: string;
  uploaded?: string | null;
  onUpload: (f: File) => void;
  onReset: () => void;
}

function FileCard({ icon, title, desc, format, uploaded, onUpload, onReset }: FileCardProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-[15.7px] border-[2.7px] border-slate-200 p-0 overflow-hidden flex flex-col" style={{ minHeight: 191 }}>
      {/* Card header */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-2">
        <div className="size-[50px] rounded-[14px] bg-[rgba(189,216,233,0.4)] border border-[rgba(189,216,233,0.3)] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[#0a0a0a] text-[15px] font-medium leading-snug">{title}</p>
          <p className="text-[#4a5565] text-[10px] mt-0.5 leading-snug">{desc}</p>
        </div>
      </div>

      {/* Format + Reset row */}
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[#4a5565] text-[12px]">{format}</span>
        {uploaded && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 rounded border border-slate-200 text-[7.6px] text-[#0a0a0a] hover:bg-slate-50 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Upload zone */}
      <div
        onClick={() => !uploaded && ref.current?.click()}
        className={`mx-3 mb-3 flex-1 rounded-[5.2px] bg-[#f3f3f5] border border-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center gap-1 transition-colors ${!uploaded ? "cursor-pointer hover:bg-slate-100" : ""}`}
        style={{ minHeight: 78 }}
      >
        {uploaded ? (
          <div className="flex items-center gap-2 px-3">
            <CheckCircle2 size={15} className="text-green-500 shrink-0" />
            <span className="text-[9px] font-medium text-[#0a0a0a] truncate max-w-[160px]">{uploaded}</span>
          </div>
        ) : (
          <>
            <Upload size={20} className="text-slate-400" />
            <span className="text-[9px] font-medium text-[rgba(10,10,10,0.5)]">Upload File</span>
          </>
        )}
      </div>
      <input ref={ref} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }} />
    </div>
  );
}

interface Props { onBack: () => void; onNext: () => void; onViewDesc: () => void; }

export function UnggahDokumenPage({ onBack, onNext, onViewDesc }: Props) {
  const [files, setFiles] = useState<Record<string, string | null>>({
    surat: null, cv: "CV_Zaidan Fahry.pdf", transkrip: null, foto: null, kartu: null, sertifikat: null,
  });
  const set = (k: string) => (f: File) => setFiles(p => ({ ...p, [k]: f.name }));
  const reset = (k: string) => () => setFiles(p => ({ ...p, [k]: null }));

  const cards = [
    { key: "surat",     icon: <FileText   size={20} className="text-[#898F94]" />, title: "Surat Pengantar Magang",       desc: "Surat pengantar resmi dari akademik.",               format: "Format: PDF | Maks. 5MB" },
    { key: "cv",        icon: <User       size={20} className="text-[#898F94]" />, title: "Curiculum Vitae (CV)",          desc: "CV terbaru.",                                        format: "Format: PDF | Maks. 5MB" },
    { key: "kartu",     icon: <CreditCard size={20} className="text-[#898F94]" />, title: "Kartu Mahasiswa",               desc: "Bukti mahasiswa aktif.",                             format: "Format: JPG, PNG, PDF | Maks. 5MB" },
    { key: "transkrip", icon: <FileText   size={20} className="text-[#898F94]" />, title: "Transkrip Nilai",               desc: "Memenuhi pernyaratan akademik.",                     format: "Format: PDF | Maks. 5MB" },
    { key: "foto",      icon: <Image      size={20} className="text-[#898F94]" />, title: "Foto Terbaru",                  desc: "Pastikan memakai baju formal dan rapi.",             format: "Format: JPG, PNG, PDF | Maks. 5MB" },
    { key: "sertifikat",icon: <Award      size={20} className="text-[#898F94]" />, title: "Sertifikat/Dokumen Pendukung", desc: "Upload sertifikat atau dokumen pendukung lain.",      format: "Format: PDF | Maks. 5MB" },
  ];

  return (
    <div className="p-6 max-w-full">
      {/* Progress stepper */}
      <div className="flex justify-center mb-2">
        <StepProgress currentStep={1} />
      </div>

      <div className="bg-white rounded-[20.75px] border border-[#e2e8f0] shadow-sm p-[41.5px]">
        {/* Job header */}
        <CompanyCard onViewDesc={onViewDesc} />
        <div className="border-t border-[#f1f5f9] mt-5 mb-5" />

        {/* Academic requirements */}
        <div className="bg-[rgba(189,216,233,0.4)] rounded-[10px] p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#2F6BFF" />
            </svg>
            <span className="text-[#2f6bff] font-medium text-[16px]">Ketentuan Akademik</span>
          </div>
          <ul className="text-[14px] text-[rgba(0,0,0,0.7)] space-y-0.5 ml-8 list-disc">
            <li>Minimal menempuh 98 SKS</li>
            <li>IPK minimal ≥ 3.00</li>
            <li>Tidak memiliki nilai E</li>
          </ul>
        </div>

        {/* Upload grid */}
        <div className="grid grid-cols-3 gap-4">
          {cards.map(c => (
            <FileCard key={c.key} icon={c.icon} title={c.title} desc={c.desc} format={c.format} uploaded={files[c.key]} onUpload={set(c.key)} onReset={reset(c.key)} />
          ))}
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
