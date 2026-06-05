import React, { useMemo, useState, useEffect } from "react";
import { Modal } from "../../common/Modal";
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
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Penilaian Magang"
      description="Berikan penilaian untuk mahasiswa berdasarkan kriteria yang telah ditentukan"
      maxWidth="xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Batal
          </Button>
          <Button onClick={handleSubmit} className="rounded-xl bg-[#0A46D2] hover:bg-blue-700">
            Simpan Penilaian
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* DATA MAHASISWA */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
          <h3 className="font-bold text-lg text-slate-900">{student.studentName}</h3>

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mt-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider block">NIM</span>
              <span className="text-slate-700 font-medium">{student.nim}</span>
            </p>

            <p>
              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider block">Perusahaan</span>
              <span className="text-slate-700 font-medium">{student.company}</span>
            </p>

            <p>
              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider block">Posisi</span>
              <span className="text-slate-700 font-medium">{student.position}</span>
            </p>

            <p>
              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider block">Periode</span>
              <span className="text-slate-700 font-medium">{student.periodStart} - {student.periodEnd}</span>
            </p>
          </div>
        </div>

        {/* KRITERIA */}
        <div>
          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Kriteria Penilaian
          </h3>

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
        <div className="space-y-2">
          <label className="font-bold text-sm text-slate-700 block">Catatan & Feedback</label>

          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="rounded-xl border-slate-200 focus:ring-blue-500"
            placeholder="Masukkan feedback untuk mahasiswa..."
          />
        </div>

        {/* NILAI AKHIR */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-lg shadow-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Nilai Akhir</p>
              <p className="text-sm text-blue-500/0 font-medium mt-0.5">Berdasarkan bobot kriteria</p>
            </div>

            <div className="text-right">
              <span className="text-4xl font-black">{finalScore}</span>
              <span className="text-blue-200 ml-1 font-bold">/ 100</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AssessmentModal;
