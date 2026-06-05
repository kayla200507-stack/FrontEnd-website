import React from "react";
import { FileText, Upload, CheckCircle } from "lucide-react";

const docs = [
  { title: "SK Pembimbing Magang (Semester Ini)", desc: "Format PDF, maksimal 10MB", status: "Terunggah" },
  { title: "Sertifikat Pendidik (Serdos)", desc: "Format PDF, maksimal 5MB", status: "Terunggah" },
  { title: "Surat Tugas Pengabdian / Bimbingan Lapangan", desc: "Opsional. Format PDF, maksimal 5MB", status: "Belum diunggah" },
];

export const DocumentsTab: React.FC = () => (
  <div className="p-6 sm:p-8">
    <h3 className="text-xl font-bold text-slate-800 mb-6">Dokumen & SK Pembimbing Magang</h3>
    <div className="space-y-4">
      {docs.map((doc, idx) => (
        <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-blue-200 transition bg-slate-50/50 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">{doc.title}</h4>
              <p className="text-sm text-slate-500">{doc.desc}</p>
              {doc.status === "Terunggah" ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
                  <CheckCircle size={14} className="text-emerald-500" /> {doc.status}
                </span>
              ) : (
                <span className="inline-block text-xs font-medium text-slate-400 mt-1">{doc.status}</span>
              )}
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition">
            <Upload size={16} /> Unggah Dokumen
          </button>
        </div>
      ))}
    </div>
  </div>
);
