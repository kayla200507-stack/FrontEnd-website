import React from "react";
import { Modal } from "../../common/Modal";
import { MessageSquare, FileText, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InternReport } from "../../../data/dosenMockData";

interface ReviewFeedbackModalProps {
  isOpen: boolean;
  selectedReport: InternReport | null;
  feedbackText: string;
  selectedStatus: InternReport["status"] | string;
  nilai: number | null;
  onClose: () => void;
  onFeedbackChange: (text: string) => void;
  onStatusChange: (status: InternReport["status"] | string) => void;
  onNilaiChange: (nilai: number | null) => void;
  onSubmit: () => void;
}

export const ReviewFeedbackModal: React.FC<ReviewFeedbackModalProps> = ({
  isOpen,
  selectedReport,
  feedbackText,
  selectedStatus,
  nilai,
  onClose,
  onFeedbackChange,
  onStatusChange,
  onNilaiChange,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <span>Beri Feedback Laporan</span>
        </div>
      }
      description="Berikan komentar atau keputusan hasil review laporan mahasiswa"
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="rounded-xl font-semibold">
            Batal
          </Button>
          <Button 
            onClick={onSubmit} 
            className="rounded-xl bg-[#0A46D2] hover:bg-blue-700 flex items-center gap-2 px-6"
          >
            <Send className="w-4 h-4" />
            Kirim Feedback
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {selectedReport && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Mahasiswa & Judul</p>
            <p className="font-bold text-slate-900">{selectedReport.studentName}</p>
            <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{selectedReport.title}</p>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Umpan Balik / Catatan Revisi
          </label>
          <textarea
            placeholder="Tulis komentar, saran revisi, atau apresiasi untuk mahasiswa..."
            value={feedbackText}
            onChange={(e) => onFeedbackChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm leading-relaxed"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Nilai Akhir (Opsional)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="0 - 100"
            value={nilai ?? ""}
            onChange={(e) => onNilaiChange(e.target.value ? parseInt(e.target.value, 10) : null)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Status Keputusan</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onStatusChange("waiting")}
              className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl transition-all ${
                selectedStatus === "waiting"
                  ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/10"
                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Clock className={`w-4 h-4 ${selectedStatus === "waiting" ? "text-amber-600" : "text-slate-400"}`} />
              <span className={`text-xs font-bold ${selectedStatus === "waiting" || selectedStatus === "Pending" ? "text-amber-700" : ""}`}>Menunggu</span>
            </button>

            <button
              onClick={() => onStatusChange("Selesai")}
              className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl transition-all ${
                selectedStatus === "approved" || selectedStatus === "Selesai"
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10"
                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${selectedStatus === "approved" || selectedStatus === "Selesai" ? "text-emerald-600" : "text-slate-400"}`} />
              <span className={`text-xs font-bold ${selectedStatus === "approved" || selectedStatus === "Selesai" ? "text-emerald-700" : ""}`}>Setujui</span>
            </button>

            <button
              onClick={() => onStatusChange("Revisi")}
              className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl transition-all ${
                selectedStatus === "revision" || selectedStatus === "Revisi"
                  ? "border-rose-500 bg-rose-50 ring-2 ring-rose-500/10"
                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <AlertCircle className={`w-4 h-4 ${selectedStatus === "revision" || selectedStatus === "Revisi" ? "text-rose-600" : "text-slate-400"}`} />
              <span className={`text-xs font-bold ${selectedStatus === "revision" || selectedStatus === "Revisi" ? "text-rose-700" : ""}`}>Revisi</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
