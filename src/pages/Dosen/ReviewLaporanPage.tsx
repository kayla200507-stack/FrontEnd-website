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
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

// Toast notification helper
const showToast = (title: string, description: string) => {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up";
  toast.innerHTML = `
    <div class="font-semibold text-sm">${title}</div>
    <div class="text-xs text-gray-300 mt-0.5">${description}</div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("animate-fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const ReviewLaporanPage: React.FC = () => {
  const navigate = useNavigate();
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
    showToast("Download Simulasi", `Mengunduh laporan "${report.title}"`);
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

    showToast(
      "Feedback Terkirim",
      `Feedback untuk ${selectedReport.studentName} telah dikirim (Status: ${statusLabels[selectedStatus]})`,
    );

    setFeedbackModalOpen(false);
    setSelectedReport(null);
    setFeedbackText("");
  };

  const getStatusBadge = (status: InternReport["status"]) => {
    const config = {
      waiting: {
        icon: Clock,
        label: "Menunggu Review",
        className: "bg-amber-100 text-amber-800",
      },
      approved: {
        icon: CheckCircle,
        label: "Disetujui",
        className: "bg-emerald-100 text-emerald-800",
      },
      revision: {
        icon: AlertCircle,
        label: "Perlu Revisi",
        className: "bg-rose-100 text-rose-800",
      },
    };

    const { icon: Icon, label, className } = config[status];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${className}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali</span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Review Laporan Magang
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Review dan berikan feedback untuk laporan akhir mahasiswa
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Laporan
                </p>
                <p className="text-3xl font-bold mt-2 text-slate-800">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Menunggu Review
                </p>
                <p className="text-3xl font-bold mt-2 text-slate-800">
                  {stats.waiting}
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Disetujui</p>
                <p className="text-3xl font-bold mt-2 text-slate-800">
                  {stats.approved}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Perlu Revisi
                </p>
                <p className="text-3xl font-bold mt-2 text-slate-800">
                  {stats.revision}
                </p>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-800">
                  Daftar Laporan Mahasiswa
                </h2>
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau NIM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm text-slate-700">
                    Laporan / Mahasiswa
                  </th>
                  <th className="text-left p-4 font-semibold text-sm text-slate-700">
                    Perusahaan & Posisi
                  </th>
                  <th className="text-left p-4 font-semibold text-sm text-slate-700">
                    Status
                  </th>
                  <th className="text-left p-4 font-semibold text-sm text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-12 text-slate-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Tidak ada laporan yang ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <p className="font-semibold text-slate-800">
                            {report.title}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <User className="w-3.5 h-3.5" />
                            <span>
                              {report.studentName} ({report.nim})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            <span>Submit: {report.submitDate}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Building className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-medium text-slate-700">
                              {report.company}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 ml-5">
                            {report.position}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(report.status)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(report)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                          <button
                            onClick={() => openFeedbackModal(report)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Review
                          </button>
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

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setFeedbackModalOpen(false)}
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
                onClick={() => setFeedbackModalOpen(false)}
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
                  onChange={(e) => setFeedbackText(e.target.value)}
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
                    onClick={() => setSelectedStatus("waiting")}
                    className={`flex items-center gap-2 px-4 py-3 border rounded-xl flex-1 transition-all ${
                      selectedStatus === "waiting"
                        ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 ${selectedStatus === "waiting" ? "text-amber-600" : "text-slate-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${selectedStatus === "waiting" ? "text-amber-700" : "text-slate-600"}`}
                    >
                      Menunggu Review
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedStatus("approved")}
                    className={`flex items-center gap-2 px-4 py-3 border rounded-xl flex-1 transition-all ${
                      selectedStatus === "approved"
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${selectedStatus === "approved" ? "text-emerald-600" : "text-slate-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${selectedStatus === "approved" ? "text-emerald-700" : "text-slate-600"}`}
                    >
                      Setujui Laporan
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedStatus("revision")}
                    className={`flex items-center gap-2 px-4 py-3 border rounded-xl flex-1 transition-all ${
                      selectedStatus === "revision"
                        ? "border-rose-500 bg-rose-50 ring-2 ring-rose-500/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 ${selectedStatus === "revision" ? "text-rose-600" : "text-slate-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${selectedStatus === "revision" ? "text-rose-700" : "text-slate-600"}`}
                    >
                      Perlu Revisi
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setFeedbackModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Kirim Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes fade-out {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(1rem);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReviewLaporanPage;
