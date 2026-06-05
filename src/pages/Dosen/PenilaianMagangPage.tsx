import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { AssessmentScale } from "../../components/features/dosen/AssessmentScale";
import {
  AssessmentTable,
  type InternAssessment,
} from "../../components/features/dosen/AssessmentTable";
import { AssessmentFormModal } from "../../components/features/dosen/AssessmentFormModal";
import DashboardHeader from "../../components/features/dosen/DashboardHeader.tsx";
import StatusCard from "../../components/features/dosen/StatusCard";
import { Users, Clock, CheckCircle, Award } from "lucide-react";
import { getGradeFromScore } from "../../components/features/dosen/AssessmentScale";

import {
  usePenilaianBimbingan,
  useSubmitPenilaian,
} from "../../hooks/usePenilaian";
import { Loader2 } from "lucide-react";

const PenilaianMagangPage: React.FC = () => {
  const { data: response, isLoading } = usePenilaianBimbingan();
  const { mutate: submitPenilaian, isPending: isSubmitting } =
    useSubmitPenilaian();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState<InternAssessment | null>(null);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [logbookScore, setLogbookScore] = useState<number>(0); // ✅ TAMBAHKAN INI
  const [reportScore, setReportScore] = useState<number>(0);
  const [presentationScore, setPresentationScore] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const assessments: InternAssessment[] = useMemo(() => {
    if (!response?.data) return [];
    return response.data.map((item) => ({
      id: item.id_magang,
      nim: item.nim,
      studentName: item.studentName,
      company: item.company,
      position: item.position,
      periodStart: item.periodStart,
      periodEnd: item.periodEnd,
      logbookScore: item.logbookScore,
      reportScore: item.reportScore,
      presentationScore: item.presentationScore,
      finalScore: item.finalScore,
      status: item.status as any,
      feedback: item.feedback || undefined,
      grade: item.grade || undefined,
    }));
  }, [response]);

  // Statistics
  const stats = useMemo(() => {
    const assessedStudents = assessments.filter((a) => a.status === "assessed");
    const avgScore =
      assessedStudents.length > 0
        ? assessedStudents.reduce((sum, a) => sum + (a.finalScore || 0), 0) /
          assessedStudents.length
        : 0;

    let avgGrade = "A";
    if (avgScore >= 85) avgGrade = "A";
    else if (avgScore >= 80) avgGrade = "AB";
    else if (avgScore >= 75) avgGrade = "B";
    else if (avgScore >= 70) avgGrade = "BC";
    else if (avgScore >= 60) avgGrade = "C";
    else if (avgScore >= 50) avgGrade = "D";
    else avgGrade = "E";

    return {
      total: assessments.length,
      pending: assessments.filter((a) => a.status === "pending").length,
      assessed: assessments.filter((a) => a.status === "assessed").length,
      avgScore: avgScore.toFixed(1),
      avgGrade: avgGrade,
    };
  }, [assessments]);

  // Filtered assessments based on search
  const filteredAssessments = useMemo(() => {
    if (!searchQuery.trim()) return assessments;

    const query = searchQuery.toLowerCase();
    return assessments.filter(
      (a) =>
        a.studentName.toLowerCase().includes(query) ||
        a.nim.includes(query) ||
        a.company.toLowerCase().includes(query),
    );
  }, [assessments, searchQuery]);

  const openAssessmentModal = (student: InternAssessment) => {
    setSelectedStudent(student);
    setLogbookScore(student.logbookScore || 0); // ✅ TAMBAHKAN INI
    setReportScore(student.reportScore || 0);
    setPresentationScore(student.presentationScore || 0);
    setFeedback(student.feedback || "");
    setAssessmentModalOpen(true);
  };

  const calculateFinalScore = (
    logbook: number,
    report: number,
    presentation: number,
  ): number => {
    // Weight: Logbook 30%, Report 40%, Presentation 30%
    return Math.round(logbook * 0.3 + report * 0.4 + presentation * 0.3);
  };

  const handleSubmitAssessment = () => {
    if (!selectedStudent) return;

    const finalScore = calculateFinalScore(
      logbookScore, // ✅ UBAH: dari selectedStudent.logbookScore menjadi logbookScore
      reportScore,
      presentationScore,
    );
    const grade = getGradeFromScore(finalScore);

    submitPenilaian(
      {
        idMagang: selectedStudent.id,
        data: {
          logbookScore: logbookScore, // ✅ UBAH: kirim logbookScore dari state
          reportScore,
          presentationScore,
          feedback,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            `Penilaian untuk ${selectedStudent.studentName} telah disimpan (Nilai: ${grade})`,
          );
          setAssessmentModalOpen(false);
          setSelectedStudent(null);
          setLogbookScore(0); // ✅ TAMBAHKAN RESET
          setReportScore(0);
          setPresentationScore(0);
          setFeedback("");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          title="Penilaian Magang"
          subtitle="Berikan nilai dan feedback untuk mahasiswa bimbingan"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatusCard
            label="Total Mahasiswa"
            value={stats.total}
            icon={<Users size={20} />}
            color="blue"
          />
          <StatusCard
            label="Menunggu Penilaian"
            value={stats.pending}
            icon={<Clock size={20} />}
            color="yellow"
          />
          <StatusCard
            label="Sudah Dinilai"
            value={stats.assessed}
            icon={<CheckCircle size={20} />}
            color="green"
          />
          <StatusCard
            label="Rata-rata Nilai"
            value={`${stats.avgGrade} (${stats.avgScore})`}
            icon={<Award size={20} />}
            color="purple"
          />
        </div>

        {/* Skala Penilaian Reference */}
        <div className="mb-6">
          <AssessmentScale />
        </div>

        {/* Daftar Mahasiswa Bimbingan */}
        <AssessmentTable
          assessments={filteredAssessments}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAssess={openAssessmentModal}
        />
      </div>

      {/* Assessment Form Modal */}
      <AssessmentFormModal
        open={assessmentModalOpen}
        onClose={() => {
          setAssessmentModalOpen(false);
          setSelectedStudent(null);
          setLogbookScore(0); // ✅ TAMBAHKAN RESET
          setReportScore(0);
          setPresentationScore(0);
          setFeedback("");
        }}
        student={selectedStudent}
        logbookScore={logbookScore} // ✅ TAMBAHKAN PROP INI
        onLogbookScoreChange={setLogbookScore} // ✅ TAMBAHKAN PROP INI
        reportScore={reportScore}
        onReportScoreChange={setReportScore}
        presentationScore={presentationScore}
        onPresentationScoreChange={setPresentationScore}
        feedback={feedback}
        onFeedbackChange={setFeedback}
        onSubmit={handleSubmitAssessment}
        calculateFinalScore={calculateFinalScore}
      />
    </div>
  );
};

export default PenilaianMagangPage;
