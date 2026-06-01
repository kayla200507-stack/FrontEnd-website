import React, { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AssessmentCriteria from "./AssessmentCriteria";

interface Student {
  id: number;
  nim: string;
  studentName: string;
  company: string;
  position: string;
  periodStart: string;
  periodEnd: string;
}

interface AssessmentModalProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
  onSubmit: (data: {
    finalScore: number;
    feedback: string;
    logbookActivity: number;
    reportQuality: number;
    companyAssessment: number;
    presentationDiscussion: number;
  }) => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({
  open,
  onClose,
  student,
  onSubmit,
}) => {
  const [logbookActivity, setLogbookActivity] = useState<number | "">("");
  const [reportQuality, setReportQuality] = useState<number | "">("");
  const [companyAssessment, setCompanyAssessment] = useState<number | "">("");
  const [presentationDiscussion, setPresentationDiscussion] = useState<
    number | ""
  >("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (open) {
      setLogbookActivity("");
      setReportQuality("");
      setCompanyAssessment("");
      setPresentationDiscussion("");
      setFeedback("");
    }
  }, [open]);

  const finalScore = useMemo(() => {
    return Math.round(
      (Number(logbookActivity) || 0) * 0.2 +
        (Number(reportQuality) || 0) * 0.3 +
        (Number(companyAssessment) || 0) * 0.3 +
        (Number(presentationDiscussion) || 0) * 0.2,
    );
  }, [
    logbookActivity,
    reportQuality,
    companyAssessment,
    presentationDiscussion,
  ]);

  const handleSubmit = () => {
    onSubmit({
      finalScore,
      feedback,
      logbookActivity: Number(logbookActivity) || 0,
      reportQuality: Number(reportQuality) || 0,
      companyAssessment: Number(companyAssessment) || 0,
      presentationDiscussion: Number(presentationDiscussion) || 0,
    });

    onClose();
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[95%] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Penilaian Magang</DialogTitle>

          <p className="text-sm text-slate-500">
            Berikan penilaian untuk mahasiswa berdasarkan kriteria yang telah
            ditentukan
          </p>
        </DialogHeader>

        {/* DATA MAHASISWA */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg">{student.studentName}</h3>

          <div className="grid md:grid-cols-2 gap-2 mt-3 text-sm text-slate-600">
            <p>
              <span className="font-medium">NIM:</span> {student.nim}
            </p>

            <p>
              <span className="font-medium">Perusahaan:</span> {student.company}
            </p>

            <p>
              <span className="font-medium">Posisi:</span> {student.position}
            </p>

            <p>
              <span className="font-medium">Periode:</span>{" "}
              {student.periodStart} - {student.periodEnd}
            </p>
          </div>
        </div>

        {/* KRITERIA */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Kriteria Penilaian</h3>

          <div className="space-y-4">
            <AssessmentCriteria
              title="Keaktifan Logbook"
              description="Konsistensi dan kualitas pengisian logbook"
              weight={20}
              value={logbookActivity}
              onChange={setLogbookActivity}
            />

            <AssessmentCriteria
              title="Kualitas Laporan"
              description="Kelengkapan dan kualitas laporan akhir"
              weight={30}
              value={reportQuality}
              onChange={setReportQuality}
            />

            <AssessmentCriteria
              title="Penilaian Perusahaan"
              description="Evaluasi mentor atau HRD perusahaan"
              weight={30}
              value={companyAssessment}
              onChange={setCompanyAssessment}
            />

            <AssessmentCriteria
              title="Presentasi & Diskusi"
              description="Kemampuan menyampaikan hasil magang"
              weight={20}
              value={presentationDiscussion}
              onChange={setPresentationDiscussion}
            />
          </div>
        </div>

        {/* FEEDBACK */}
        <div>
          <label className="font-medium block mb-2">Catatan & Feedback</label>

          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="Masukkan feedback untuk mahasiswa..."
          />
        </div>

        {/* NILAI AKHIR */}
        <div className="bg-blue-50 border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Nilai Akhir</span>

            <span className="text-2xl font-bold text-blue-700">
              {finalScore}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>

          <Button onClick={handleSubmit}>Simpan Penilaian</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentModal;
