import React, { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Star,
  Users,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  GraduationCap,
  Building,
  Calendar,
  User,
  Download,
  Send,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/common/Input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Type definitions
interface InternAssessment {
  id: number;
  nim: string;
  studentName: string;
  company: string;
  position: string;
  periodStart: string;
  periodEnd: string;
  logbookScore: number;
  reportScore?: number;
  presentationScore?: number;
  finalScore?: number;
  grade?: string;
  status: "pending" | "assessed" | "completed";
  feedback?: string;
}

// Mock data
const initialAssessments: InternAssessment[] = [
  {
    id: 1,
    nim: "12200001",
    studentName: "Budi Santoso",
    company: "PT Teknologi Maju",
    position: "Frontend Developer Intern",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    logbookScore: 88,
    status: "pending",
  },
  {
    id: 2,
    nim: "12200002",
    studentName: "Siti Rahmawati",
    company: "PT Digital Kreatif",
    position: "UI/UX Designer Intern",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    logbookScore: 92,
    status: "pending",
  },
  {
    id: 3,
    nim: "12200003",
    studentName: "Ahmad Faizal",
    company: "PT Inovasi Sistem",
    position: "Backend Developer Intern",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    logbookScore: 78,
    status: "pending",
  },
  {
    id: 4,
    nim: "12200004",
    studentName: "Dewi Lestari",
    company: "PT Solusi Cerdas",
    position: "Data Analyst Intern",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    logbookScore: 95,
    finalScore: 88,
    grade: "A",
    status: "assessed",
    feedback: "Kerja bagus, laporan sangat sistematis.",
  },
  {
    id: 5,
    nim: "12200005",
    studentName: "Rizki Maulana",
    company: "PT Edukasi Nusantara",
    position: "Fullstack Developer Intern",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    logbookScore: 82,
    finalScore: 85,
    grade: "AB",
    status: "assessed",
    feedback: "Performa baik, tingkatkan lagi komunikasi tim.",
  },
];

// Grade conversion reference
const gradeReference = [
  { grade: "A", minScore: 85, maxScore: 100, predicate: "Sangat Baik" },
  { grade: "AB", minScore: 80, maxScore: 84, predicate: "Baik Sekali" },
  { grade: "B", minScore: 75, maxScore: 79, predicate: "Baik" },
  { grade: "BC", minScore: 70, maxScore: 74, predicate: "Cukup Baik" },
  { grade: "C", minScore: 60, maxScore: 69, predicate: "Cukup" },
  { grade: "D", minScore: 50, maxScore: 59, predicate: "Kurang" },
  { grade: "E", minScore: 0, maxScore: 49, predicate: "Tidak Lulus" },
];

const getGradeFromScore = (score: number): string => {
  const grade = gradeReference.find(
    (g) => score >= g.minScore && score <= g.maxScore,
  );
  return grade?.grade || "E";
};

const getPredicateFromScore = (score: number): string => {
  const grade = gradeReference.find(
    (g) => score >= g.minScore && score <= g.maxScore,
  );
  return grade?.predicate || "Tidak Lulus";
};

const StatusBadge: React.FC<{ status: InternAssessment["status"] }> = ({
  status,
}) => {
  const config = {
    pending: {
      icon: Clock,
      label: "Perlu Dinilai",
      className: "bg-amber-100 text-amber-700 border-amber-200",
    },
    assessed: {
      icon: CheckCircle,
      label: "Sudah Dinilai",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    completed: {
      icon: Award,
      label: "Selesai",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
  };

  const { icon: Icon, label, className } = config[status];

  return (
    <Badge
      variant="outline"
      className={`${className} gap-1.5 px-3 py-1.5 text-xs font-medium`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};

const GradeBadge: React.FC<{ grade: string }> = ({ grade }) => {
  const colorMap: Record<string, string> = {
    A: "bg-emerald-100 text-emerald-700 border-emerald-200",
    AB: "bg-green-100 text-green-700 border-green-200",
    B: "bg-blue-100 text-blue-700 border-blue-200",
    BC: "bg-sky-100 text-sky-700 border-sky-200",
    C: "bg-yellow-100 text-yellow-700 border-yellow-200",
    D: "bg-orange-100 text-orange-700 border-orange-200",
    E: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${colorMap[grade] || colorMap.E} px-3 py-1 text-sm font-bold`}
    >
      {grade}
    </Badge>
  );
};

const PenilaianMagangPage: React.FC = () => {
  const [assessments, setAssessments] =
    useState<InternAssessment[]>(initialAssessments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState<InternAssessment | null>(null);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [reportScore, setReportScore] = useState<number>(0);
  const [presentationScore, setPresentationScore] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

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
      selectedStudent.logbookScore,
      reportScore,
      presentationScore,
    );
    const grade = getGradeFromScore(finalScore);

    setAssessments((prev) =>
      prev.map((a) =>
        a.id === selectedStudent.id
          ? {
              ...a,
              reportScore,
              presentationScore,
              finalScore,
              grade,
              status: "assessed",
              feedback: feedback || "Tidak ada catatan tambahan.",
            }
          : a,
      ),
    );

    toast.success(
      `Penilaian untuk ${selectedStudent.studentName} telah disimpan (Nilai: ${grade})`,
    );

    setAssessmentModalOpen(false);
    setSelectedStudent(null);
    setReportScore(0);
    setPresentationScore(0);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            Penilaian Magang
          </h1>
          <p className="text-slate-500 text-sm">
            Review dan berikan feedback untuk laporan akhir mahasiswa
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Seleksi Magang Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Seleksi Magang
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Menunggu Penilaian Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Menunggu Penilaian
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Sudah Dinilai Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Sudah Dinilai
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.assessed}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Rata - Rata Nilai Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Rata - Rata Nilai
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-slate-800">
                    {stats.avgGrade}
                  </span>
                  <span className="text-sm text-slate-400">
                    ({stats.avgScore})
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Skala Penilaian Reference */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-sm font-semibold text-slate-800">
              Skala Penilaian
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Referensi konversi skor ke nilai huruf
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">
                    Nilai
                  </th>
                  {gradeReference.map((g) => (
                    <th
                      key={g.grade}
                      className="px-4 py-3 text-center text-xs font-semibold text-slate-600"
                    >
                      {g.grade}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-center text-xs font-medium text-slate-600 bg-slate-50">
                    Skor
                  </td>
                  {gradeReference.map((g) => (
                    <td
                      key={g.grade}
                      className="px-4 py-3 text-center text-xs text-slate-700"
                    >
                      {g.minScore} - {g.maxScore}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center text-xs font-medium text-slate-600 bg-slate-50">
                    Predikat
                  </td>
                  {gradeReference.map((g) => (
                    <td
                      key={g.grade}
                      className="px-4 py-3 text-center text-xs text-slate-700"
                    >
                      {g.predicate}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Daftar Mahasiswa Bimbingan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-slate-600" />
                  Daftar Mahasiswa Bimbingan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pantau progress dan status mahasiswa bimbingan Anda
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Cari berdasarkan nama atau NIM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    NIM
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Perusahaan
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Posisi
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Periode
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Skor Logbook
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-12 text-slate-500"
                    >
                      <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        Tidak ada mahasiswa yang ditemukan
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAssessments.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-slate-700">
                        {student.nim}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">
                            {student.studentName}
                          </p>
                          {student.grade && (
                            <GradeBadge grade={student.grade} />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{student.company}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {student.position}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {student.periodStart} - {student.periodEnd}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-12 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
                          {student.logbookScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={student.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        {student.status === "pending" ? (
                          <Button
                            size="sm"
                            onClick={() => openAssessmentModal(student)}
                            className="gap-1.5 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Beri Nilai
                          </Button>
                        ) : (
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openAssessmentModal(student)}
                              className="gap-1 h-8 text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Lihat
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openAssessmentModal(student)}
                              className="gap-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      <Dialog open={assessmentModalOpen} onOpenChange={setAssessmentModalOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-amber-500" />
              {selectedStudent?.status === "pending"
                ? "Beri Penilaian"
                : "Detail Penilaian"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              {selectedStudent?.studentName} - {selectedStudent?.nim}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4">
            {/* Logbook Score (Readonly) */}
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-slate-700">
                  Skor Logbook
                </Label>
                <span className="text-lg font-bold text-blue-600">
                  {selectedStudent?.logbookScore}
                </span>
              </div>
            </div>

            {/* Report Score */}
            <div className="space-y-2">
              <Label
                htmlFor="reportScore"
                className="text-sm font-semibold text-slate-700"
              >
                Nilai Laporan (40%)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="reportScore"
                  type="number"
                  min="0"
                  max="100"
                  value={reportScore}
                  onChange={(e) => setReportScore(Number(e.target.value))}
                  className="w-32 text-center"
                  disabled={selectedStudent?.status === "assessed"}
                />
                <span className="text-sm text-slate-500">/ 100</span>
              </div>
            </div>

            {/* Presentation Score */}
            <div className="space-y-2">
              <Label
                htmlFor="presentationScore"
                className="text-sm font-semibold text-slate-700"
              >
                Nilai Presentasi (30%)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="presentationScore"
                  type="number"
                  min="0"
                  max="100"
                  value={presentationScore}
                  onChange={(e) => setPresentationScore(Number(e.target.value))}
                  className="w-32 text-center"
                  disabled={selectedStudent?.status === "assessed"}
                />
                <span className="text-sm text-slate-500">/ 100</span>
              </div>
            </div>

            {/* Auto-calculated Final Score Preview */}
            {selectedStudent && reportScore > 0 && presentationScore > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">
                    Nilai Akhir (Estimasi)
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-blue-700">
                      {calculateFinalScore(
                        selectedStudent.logbookScore,
                        reportScore,
                        presentationScore,
                      )}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">/ 100</span>
                    <div className="text-xs text-slate-500">
                      Grade:{" "}
                      {getGradeFromScore(
                        calculateFinalScore(
                          selectedStudent.logbookScore,
                          reportScore,
                          presentationScore,
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback */}
            <div className="space-y-2">
              <Label
                htmlFor="feedback"
                className="text-sm font-semibold text-slate-700"
              >
                Feedback / Catatan
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tulis feedback untuk mahasiswa..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="resize-none text-sm"
                disabled={selectedStudent?.status === "assessed"}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-200 gap-2">
            <Button
              variant="outline"
              onClick={() => setAssessmentModalOpen(false)}
              className="h-9 text-sm"
            >
              Tutup
            </Button>
            {selectedStudent?.status !== "assessed" && (
              <Button
                onClick={handleSubmitAssessment}
                className="gap-2 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
                Simpan Penilaian
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PenilaianMagangPage;
