import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Send,
  Building,
  Calendar,
  User,
  FolderOpen,
  GraduationCap,
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
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

// Type definitions
interface InternReport {
  id: number;
  studentName: string;
  nim: string;
  title: string;
  submitDate: string;
  company: string;
  position: string;
  status: "waiting" | "approved" | "revision";
  feedback: string;
}

// Mock data
const initialReports: InternReport[] = [
  {
    id: 1,
    studentName: "Budi Santoso",
    nim: "11210001",
    title: "Pengembangan Website E-Commerce",
    submitDate: "20 Maret 2026",
    company: "PT Teknologi Meja",
    position: "Frontend Developer Intern",
    status: "waiting",
    feedback: "",
  },
  {
    id: 2,
    studentName: "Siti Rahmawati",
    nim: "11210002",
    title: "Redesign Aplikasi Mobile Banking",
    submitDate: "22 Maret 2026",
    company: "PT Digital Kreatif",
    position: "UI/UX Designer intern",
    status: "waiting",
    feedback: "",
  },
  {
    id: 3,
    studentName: "Ahmad Fauzi",
    nim: "11210015",
    title: "Analisis Sentimen Media Sosial",
    submitDate: "18 Maret 2026",
    company: "PT Data Cerdas",
    position: "Data Analyst Intern",
    status: "approved",
    feedback: "Kerja bagus, laporan sangat sistematis. Diterima.",
  },
  {
    id: 4,
    studentName: "Dewi Lestari",
    nim: "11210022",
    title: "Implementasi CI/CD Pipeline",
    submitDate: "19 Maret 2026",
    company: "PT Solusi Cloud",
    position: "DevOps Intern",
    status: "revision",
    feedback: "Perbaiki bagian metodologi dan tambahkan diagram alur.",
  },
  {
    id: 5,
    studentName: "Rizki Maulana",
    nim: "11210007",
    title: "Optimasi Database untuk E-Learning",
    submitDate: "21 Maret 2026",
    company: "PT Edukasi Nusantara",
    position: "Backend Engineer Intern",
    status: "waiting",
    feedback: "",
  },
];

const StatusBadge: React.FC<{ status: InternReport["status"] }> = ({
  status,
}) => {
  const config = {
    waiting: {
      icon: Clock,
      label: "Menunggu Review",
      className: "bg-amber-100 text-amber-700 border-amber-200",
    },
    approved: {
      icon: CheckCircle,
      label: "Disetujui",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    revision: {
      icon: AlertCircle,
      label: "Perlu Revisi",
      className: "bg-rose-100 text-rose-700 border-rose-200",
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

const LaporanMagangPage: React.FC = () => {
  const [reports, setReports] = useState<InternReport[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<InternReport | null>(
    null,
  );
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<InternReport["status"]>("waiting");

  // Statistics
  const stats = useMemo(
    () => ({
      total: reports.length,
      waiting: reports.filter((r) => r.status === "waiting").length,
      approved: reports.filter((r) => r.status === "approved").length,
      revision: reports.filter((r) => r.status === "revision").length,
    }),
    [reports],
  );

  // Filtered reports based on search
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports;

    const query = searchQuery.toLowerCase();
    return reports.filter(
      (report) =>
        report.studentName.toLowerCase().includes(query) ||
        report.nim.includes(query) ||
        report.title.toLowerCase().includes(query),
    );
  }, [reports, searchQuery]);

  const handleDownload = (report: InternReport) => {
    toast.success(`Mengunduh laporan "${report.title}"`);
  };

  const openFeedbackModal = (report: InternReport) => {
    setSelectedReport(report);
    setFeedbackText(report.feedback || "");
    setSelectedStatus(report.status);
    setFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (!selectedReport) return;

    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              status: selectedStatus,
              feedback:
                feedbackText ||
                (selectedStatus === "approved"
                  ? "Laporan disetujui tanpa catatan."
                  : "Silakan periksa kembali laporan Anda."),
            }
          : report,
      ),
    );

    const statusLabels = {
      waiting: "Menunggu Review",
      approved: "Disetujui",
      revision: "Perlu Revisi",
    };

    toast.success(
      `Feedback untuk ${selectedReport.studentName} telah dikirim (Status: ${statusLabels[selectedStatus]})`,
    );

    setFeedbackModalOpen(false);
    setSelectedReport(null);
    setFeedbackText("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header - Style like screenshot */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            Review Laporan Magang
          </h1>
          <p className="text-slate-500 text-sm">
            Review dan berikan feedback untuk laporan akhir mahasiswa
          </p>
        </div>

        {/* Statistics Cards - Style like screenshot (white cards with icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Laporan Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total Laporan
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Menunggu Review Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Menunggu Review
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.waiting}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Disetujui Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Disetujui</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.approved}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Perlu Revisi Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Perlu Revisi
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {stats.revision}
                </p>
              </div>
              <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table Card - Clean style like screenshot */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header with search */}
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-slate-600" />
                <h2 className="text-base font-semibold text-slate-800">
                  Daftar Laporan Mahasiswa
                </h2>
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Laporan / Mahasiswa
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Perusahaan & Posisi
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-12 text-slate-500"
                    >
                      <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        Tidak ada laporan yang ditemukan
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800 text-sm">
                            {report.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <User className="w-3 h-3" />
                            <span>
                              {report.studentName} ({report.nim})
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>Submit: {report.submitDate}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-slate-700">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-medium">
                              {report.company}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 ml-5">
                            {report.position}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(report)}
                            className="gap-1.5 h-8 text-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => openFeedbackModal(report)}
                            className="gap-1.5 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Review
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feedback Modal Dialog - Clean style */}
      <Dialog open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Beri Feedback Laporan
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              {selectedReport &&
                `Memberikan feedback untuk laporan ${selectedReport.studentName}`}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="feedback"
                className="text-sm font-semibold text-slate-700"
              >
                Umpan Balik / Catatan Revisi
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tulis komentar, saran revisi, atau apresiasi untuk mahasiswa..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                className="resize-none text-sm"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">
                Status Keputusan
              </Label>
              <RadioGroup
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(value as InternReport["status"])
                }
                className="flex flex-col sm:flex-row gap-3"
              >
                <div
                  className={`flex items-center gap-2 border rounded-lg p-3 flex-1 cursor-pointer transition-all ${
                    selectedStatus === "waiting"
                      ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedStatus("waiting")}
                >
                  <RadioGroupItem
                    value="waiting"
                    id="waiting"
                    className="mt-0"
                  />
                  <Label
                    htmlFor="waiting"
                    className="flex items-center gap-2 cursor-pointer text-sm font-normal"
                  >
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Menunggu Review</span>
                  </Label>
                </div>
                <div
                  className={`flex items-center gap-2 border rounded-lg p-3 flex-1 cursor-pointer transition-all ${
                    selectedStatus === "approved"
                      ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedStatus("approved")}
                >
                  <RadioGroupItem value="approved" id="approved" />
                  <Label
                    htmlFor="approved"
                    className="flex items-center gap-2 cursor-pointer text-sm font-normal"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Setujui Laporan</span>
                  </Label>
                </div>
                <div
                  className={`flex items-center gap-2 border rounded-lg p-3 flex-1 cursor-pointer transition-all ${
                    selectedStatus === "revision"
                      ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedStatus("revision")}
                >
                  <RadioGroupItem value="revision" id="revision" />
                  <Label
                    htmlFor="revision"
                    className="flex items-center gap-2 cursor-pointer text-sm font-normal"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Perlu Revisi</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-200 gap-2">
            <Button
              variant="outline"
              onClick={() => setFeedbackModalOpen(false)}
              className="h-9 text-sm"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              className="gap-2 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
              Kirim Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LaporanMagangPage;
