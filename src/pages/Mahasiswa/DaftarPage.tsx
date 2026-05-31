import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload, FileText, Image, User, Award, Camera,
  X, CheckCircle2, Info, ChevronRight,
} from "lucide-react";
import { jobs } from "../../../data/jobs";
import { uploadDocuments } from "../../../data/documents";
import type { UploadDocument } from "../../../utils/types";
import { useParams } from "react-router-dom";


const job = jobs[0];

// Local component – tidak dipisah ke file tersendiri
function UploadItem({
  doc,
  uploadedFile,
  onUpload,
  onReset,
}: {
  doc: UploadDocument;
  uploadedFile: string | null;
  onUpload: (name: string) => void;
  onReset: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = doc.icon;
  const fileToShow = uploadedFile ?? doc.preloaded;

  return (
    <div className="bg-white border-2 border-[rgba(0,0,0,0.12)] rounded-[16px] overflow-hidden">
      <div className="flex items-start gap-3 px-4 pt-4 pb-2">
        <div className="bg-[rgba(189,216,233,0.4)] rounded-[14px] p-2.5 border border-[rgba(189,216,233,0.3)] shrink-0">
          <Icon size={20} className="text-[#898f94]" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[#0a0a0a] font-medium text-sm leading-tight truncate">{doc.title}</p>
          <p className="text-[#4a5565] text-[10px] mt-0.5 leading-tight">{doc.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[#4a5565] text-[11px]">Format: {doc.format} | Maks. {doc.maxSize}</span>
        <button
          onClick={onReset}
          className="bg-white border border-[rgba(0,0,0,0.2)] text-[#0a0a0a] text-[11px] font-medium px-2.5 py-0.5 rounded-[4px] hover:bg-gray-50 cursor-pointer transition-colors"
        >
          Reset
        </button>
      </div>
      <div
        className="mx-3 mb-3 rounded-[5px] bg-[#f3f3f5] border border-[rgba(0,0,0,0.2)] h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-[#ebebed] transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) onUpload(f.name); }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f.name); }}
        />
        {fileToShow ? (
          <div className="flex flex-col items-center gap-1">
            <CheckCircle2 size={18} className="text-[#059669]" />
            <span className="text-[#0a0a0a] text-[9px] font-medium px-2 text-center truncate max-w-[200px]">{fileToShow}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[rgba(167,167,165,0.3)] flex items-center justify-center">
              <Upload size={14} className="text-[rgba(10,10,10,0.4)]" />
            </div>
            <span className="text-[rgba(10,10,10,0.5)] text-[9px] font-medium">Upload File</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function DaftarPage() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string | null>>({ cv: "CV_Zaidan Fahry.pdf" });
  const [showDesc, setShowDesc] = useState(false);
  const { id } = useParams();
  const handleUpload = (id: string, name: string) => setUploadedFiles((p) => ({ ...p, [id]: name }));
  const handleReset = (id: string) => setUploadedFiles((p) => ({ ...p, [id]: null }));

  return (
    <div className="h-full overflow-y-auto">

      {/* Stepper */}
      <div className="flex justify-center items-center py-5">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white border-[3px] border-[#1d70c1] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1d70c1]" />
            </div>
            <span className="text-[#0f172a] font-bold text-[9.5px]">Unggah dokumen</span>
          </div>
          <div className="w-32 h-0.5 bg-[#e2e8f0] mb-4" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#e2e8f0]" />
            <span className="text-[#64748b] text-[9.5px]">Pertanyaan Perusahaan</span>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="mx-5 mb-5 bg-white rounded-3xl shadow-sm border border-[rgba(226,232,240,0.4)]">
        <div className="p-10">

          {/* Job header */}
          <div className="flex items-start gap-5 pb-6 border-b border-[#f1f5f9]">
            <div className="w-[90px] h-[90px] rounded-2xl overflow-hidden bg-[#f8f9fc] shrink-0 border border-[rgba(226,232,240,0.3)]">
              <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-[#0f172a] font-bold text-2xl leading-tight">{job.title}</h2>
              <p className="text-[#475569] text-lg mt-1">{job.company}</p>
              <button
                onClick={() => setShowDesc(true)}
                className="flex items-center gap-1.5 text-[#1d70c1] text-base mt-2.5 hover:underline cursor-pointer"
              >
                Lihat deskripsi pekerjaan <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* Ketentuan Akademik */}
          <div className="mt-6 bg-[#eff6ff] rounded-2xl px-6 py-5 border border-[rgba(29,112,193,0.1)]">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-[#1d70c1] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1d70c1] font-bold text-sm mb-2">Ketentuan Akademik</p>
                <ul className="space-y-1">
                  {["Minimal menempuh 98 SKS", "IPK minimal ≥ 3.00", "Tidak memiliki nilai E"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#1e40af] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1d70c1] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Upload grid */}
          <div className="mt-7 grid grid-cols-3 gap-4">
            {uploadDocuments.map((doc) => (
              <UploadItem
                key={doc.id}
                doc={doc}
                uploadedFile={uploadedFiles[doc.id] ?? null}
                onUpload={(name) => handleUpload(doc.id, name)}
                onReset={() => handleReset(doc.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end px-10 pb-8">
          <button
            onClick={() => navigate("/")}
            className="bg-[#1d70c1] text-white text-sm font-bold px-10 py-3.5 rounded-xl hover:bg-[#1558a0] transition-colors shadow-sm cursor-pointer"
          >
            Lanjut
          </button>
        </div>
      </div>

      {/* Description slide panel */}
      <AnimatePresence>
        {showDesc && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDesc(false)} className="flex-1 bg-black/30"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white w-[420px] h-full overflow-y-auto shadow-2xl"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-[#1a1c21] font-bold text-2xl">{job.title}</h2>
                    <p className="text-[#3563E9] font-medium text-sm mt-1">{job.company}</p>
                  </div>
                  <button onClick={() => setShowDesc(false)} className="text-[#94a3b8] hover:text-[#64748b] transition-colors mt-1 cursor-pointer">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-bold text-sm text-[#1a1c21] mb-3">Deskripsi Pekerjaan :</p>
                    <ul className="space-y-2">
                      {job.descriptions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#64748b] mt-1 shrink-0">•</span>
                          <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1a1c21] mb-3">Kualifikasi :</p>
                    <ul className="space-y-2">
                      {job.kualifikasi.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#64748b] mt-1 shrink-0">•</span>
                          <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}