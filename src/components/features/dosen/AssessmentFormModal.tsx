import React from "react";
import { Modal } from "../../common/Modal";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getGradeFromScore } from "./AssessmentScale";
import type { InternAssessment } from "./AssessmentTable";

interface AssessmentFormModalProps {
  open: boolean;
  onClose: () => void;
  student: InternAssessment | null;
  logbookScore: number; // Tambahkan ini
  onLogbookScoreChange: (score: number) => void; // Tambahkan ini
  reportScore: number;
  onReportScoreChange: (score: number) => void;
  presentationScore: number;
  onPresentationScoreChange: (score: number) => void;
  feedback: string;
  onFeedbackChange: (feedback: string) => void;
  onSubmit: () => void;
  calculateFinalScore: (
    logbook: number,
    report: number,
    presentation: number,
  ) => number;
}

export const AssessmentFormModal: React.FC<AssessmentFormModalProps> = ({
  open,
  onClose,
  student,
  logbookScore,
  onLogbookScoreChange,
  reportScore,
  onReportScoreChange,
  presentationScore,
  onPresentationScoreChange,
  feedback,
  onFeedbackChange,
  onSubmit,
  calculateFinalScore,
}) => {
  // Hitung final score untuk preview
  const finalScore = React.useMemo(() => {
    if (!student) return 0;
    return calculateFinalScore(logbookScore, reportScore, presentationScore);
  }, [
    student,
    logbookScore,
    reportScore,
    presentationScore,
    calculateFinalScore,
  ]);

  const grade = React.useMemo(() => {
    return getGradeFromScore(finalScore);
  }, [finalScore]);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-amber-500" />
          <span>
            {student?.status === "pending"
              ? "Beri Penilaian"
              : "Detail Penilaian"}
          </span>
        </div>
      }
      description={`${student?.studentName || "Mahasiswa"} - ${student?.nim || "-"}`}
      footer={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl font-semibold px-6"
          >
            Tutup
          </Button>
          {student?.status !== "assessed" && (
            <Button
              onClick={onSubmit}
              className="rounded-xl bg-[#0A46D2] hover:bg-blue-700 flex items-center gap-2 px-6"
            >
              <Send className="w-4 h-4" />
              Simpan Penilaian
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        {/* Logbook Score (30%) - EDITABLE */}
        <div className="space-y-3">
          <Label
            htmlFor="logbookScore"
            className="text-sm font-bold text-slate-700"
          >
            Nilai Logbook{" "}
            <span className="text-blue-600 text-xs">(Bobot 30%)</span>
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="logbookScore"
              type="number"
              min="0"
              max="100"
              value={logbookScore}
              onChange={(e) => onLogbookScoreChange(Number(e.target.value))}
              className="w-32 rounded-xl text-center font-bold"
              disabled={student?.status === "assessed"}
            />
            <span className="text-sm text-slate-400 font-medium">
              dari 100 poin
            </span>
          </div>
        </div>

        {/* Report Score (40%) */}
        <div className="space-y-3">
          <Label
            htmlFor="reportScore"
            className="text-sm font-bold text-slate-700"
          >
            Nilai Laporan{" "}
            <span className="text-blue-600 text-xs">(Bobot 40%)</span>
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="reportScore"
              type="number"
              min="0"
              max="100"
              value={reportScore}
              onChange={(e) => onReportScoreChange(Number(e.target.value))}
              className="w-32 rounded-xl text-center font-bold"
              disabled={student?.status === "assessed"}
            />
            <span className="text-sm text-slate-400 font-medium">
              dari 100 poin
            </span>
          </div>
        </div>

        {/* Presentation Score (30%) */}
        <div className="space-y-3">
          <Label
            htmlFor="presentationScore"
            className="text-sm font-bold text-slate-700"
          >
            Nilai Presentasi{" "}
            <span className="text-blue-600 text-xs">(Bobot 30%)</span>
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="presentationScore"
              type="number"
              min="0"
              max="100"
              value={presentationScore}
              onChange={(e) =>
                onPresentationScoreChange(Number(e.target.value))
              }
              className="w-32 rounded-xl text-center font-bold"
              disabled={student?.status === "assessed"}
            />
            <span className="text-sm text-slate-400 font-medium">
              dari 100 poin
            </span>
          </div>
        </div>

        {/* Detail Perhitungan Bobot */}
        {student && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Detail Perhitungan Nilai Akhir
              </span>

              {/* Breakdown */}
              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Logbook ({logbookScore} × 0.3)</span>
                  <span className="font-medium">
                    {(logbookScore * 0.3).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Laporan ({reportScore} × 0.4)</span>
                  <span className="font-medium">
                    {(reportScore * 0.4).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Presentasi ({presentationScore} × 0.3)</span>
                  <span className="font-medium">
                    {(presentationScore * 0.3).toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="border-t border-blue-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Nilai Akhir
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase mt-0.5 block">
                      Estimasi Otomatis
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end">
                      <span className="text-2xl font-black text-blue-700">
                        {finalScore}
                      </span>
                      <span className="text-xs text-blue-400 ml-1 font-bold">
                        / 100
                      </span>
                    </div>
                    <div className="inline-flex items-center mt-1 px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-black uppercase">
                      Grade: {grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback */}
        <div className="space-y-3">
          <Label
            htmlFor="feedback"
            className="text-sm font-bold text-slate-700"
          >
            Feedback / Catatan
          </Label>
          <Textarea
            id="feedback"
            placeholder="Tulis feedback untuk mahasiswa..."
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            rows={3}
            className="rounded-xl border-slate-200 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
            disabled={student?.status === "assessed"}
          />
        </div>
      </div>
    </Modal>
  );
};
