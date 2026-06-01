import React from "react";
import { MessageSquare, X, FileText, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import type { InternReport } from "../../../data/dosenMockData";

interface ReviewFeedbackModalProps {
  selectedReport: InternReport | null;
  feedbackText: string;
  selectedStatus: InternReport["status"];
  onClose: () => void;
  onFeedbackChange: (text: string) => void;
  onStatusChange: (status: InternReport["status"]) => void;
  onSubmit: () => void;
}

export const ReviewFeedbackModal: React.FC<ReviewFeedbackModalProps> = ({
  selectedReport,
  feedbackText,
  selectedStatus,
  onClose,
  onFeedbackChange,
  onStatusChange,
  onSubmit,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              Beri Feedback Laporan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {selectedReport && (
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100">
              <p className="font-semibold text-slate-800">
                {selectedReport.studentName}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {selectedReport.title}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Umpan Balik / Catatan Revisi
            </label>
            <textarea
              placeholder="Tulis komentar, saran revisi, atau apresiasi untuk mahasiswa..."
              value={feedbackText}
              onChange={(e) => onFeedbackChange(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Status Keputusan
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onStatusChange("waiting")}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl flex-1 transition-all ${
                  selectedStatus === "waiting"
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Clock
                  className={`w-4 h-4 ${
                    selectedStatus === "waiting"
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    selectedStatus === "waiting"
                      ? "text-amber-700"
                      : "text-slate-600"
                  }`}
                >
                  Menunggu Review
                </span>
              </button>

              <button
                onClick={() => onStatusChange("approved")}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl flex-1 transition-all ${
                  selectedStatus === "approved"
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    selectedStatus === "approved"
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    selectedStatus === "approved"
                      ? "text-emerald-700"
                      : "text-slate-600"
                  }`}
                >
                  Setujui Laporan
                </span>
              </button>

              <button
                onClick={() => onStatusChange("revision")}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl flex-1 transition-all ${
                  selectedStatus === "revision"
                    ? "border-rose-500 bg-rose-50 ring-2 ring-rose-500/20"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <AlertCircle
                  className={`w-4 h-4 ${
                    selectedStatus === "revision"
                      ? "text-rose-600"
                      : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    selectedStatus === "revision"
                      ? "text-rose-700"
                      : "text-slate-600"
                  }`}
                >
                  Perlu Revisi
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Kirim Feedback
          </button>
        </div>
      </div>
    </div>
  );
};
