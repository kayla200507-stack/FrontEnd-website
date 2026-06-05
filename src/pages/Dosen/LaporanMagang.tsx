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
import DashboardHeader from "../../components/features/dosen/DashboardHeader.tsx";

import { ReviewFeedbackModal } from "../../components/features/dosen/ReviewFeedbackModal";

import { useLaporanBimbingan, useReviewLaporan } from "../../hooks/useLaporan";
import type { Laporan } from "../../services/laporanService";
import { Loader2 } from "lucide-react";

const StatusBadge: React.FC<{ status: string }> = ({
  status,
}) => {
  const config: Record<string, any> = {
    Pending: {
      icon: Clock,
      label: "Menunggu Review",
      className: "bg-amber-100 text-amber-700 border-amber-200",
    },
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
    Selesai: {
      icon: CheckCircle,
      label: "Selesai",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    Diterima: {
      icon: CheckCircle,
      label: "Selesai",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    revision: {
      icon: AlertCircle,
      label: "Perlu Revisi",
      className: "bg-rose-100 text-rose-700 border-rose-200",
    },
    Revisi: {
      icon: AlertCircle,
      label: "Perlu Revisi",
      className: "bg-rose-100 text-rose-700 border-rose-200",
    },
  };

  const { icon: Icon, label, className } = config[status] || {
    icon: Clock, label: status || "Menunggu Review", className: "bg-amber-100 text-amber-700 border-amber-200"
  };

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
  const { data: laporanResponse, isLoading } = useLaporanBimbingan();
  const { mutate: reviewLaporan, isPending: isReviewing } = useReviewLaporan();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Laporan | null>(null);
  
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [nilai, setNilai] = useState<number | null>(null);

  const reports = (laporanResponse?.data as Laporan[]) || [];

  // Statistics
  const stats = useMemo(
    () => ({
      total: reports.length,
      waiting: reports.filter((r) => r.status_review === "waiting" || r.status_review === "Pending").length,
      approved: reports.filter((r) => r.status_review === "approved" || r.status_review === "Selesai" || r.status_review === "Diterima").length,
      revision: reports.filter((r) => r.status_review === "revision" || r.status_review === "Revisi").length,
    }),
    [reports],
  );

  // Filtered reports based on search
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports;

    const query = searchQuery.toLowerCase();
    return reports.filter((report) => {
      const studentName = report.magang?.mahasiswa?.nama_lengkap?.toLowerCase() || "";
      const nim = report.magang?.mahasiswa?.nim || "";
      const title = report.judul_laporan?.toLowerCase() || "";
      
      return studentName.includes(query) || nim.includes(query) || title.includes(query);
    });
  }, [reports, searchQuery]);

  const handleDownload = (report: Laporan) => {
    if (report.file_url) {
      window.open(report.file_url, "_blank");
    } else {
      toast.error("File laporan tidak tersedia.");
    }
  };

  const openFeedbackModal = (report: Laporan) => {
    setSelectedReport(report);
    setFeedbackText(report.feedback || "");
    setSelectedStatus(report.status_review);
    setNilai(report.nilai);
    setFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (!selectedReport) return;

    reviewLaporan(
      {
        id: selectedReport.id_laporan,
        status: selectedStatus,
        feedback: feedbackText || (selectedStatus === "Selesai" ? "Laporan disetujui tanpa catatan." : "Silakan periksa kembali laporan Anda."),
        nilai: nilai || undefined,
      },
      {
        onSuccess: () => {
          setFeedbackModalOpen(false);
          setSelectedReport(null);
          setFeedbackText("");
          setNilai(null);
        },
      }
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
          title="Review Laporan Magang"
          subtitle="Review dan berikan feedback untuk laporan akhir mahasiswa"
        />

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
                            {report.judul_laporan}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <User className="w-3 h-3" />
                            <span>
                              {report.magang?.mahasiswa?.nama_lengkap} ({report.magang?.mahasiswa?.nim})
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>Submit: {new Date(report.tanggal_upload).toLocaleDateString("id-ID")}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-slate-700">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-medium">
                              {(() => {
                                const activePendaftaran = report.magang?.mahasiswa?.pendaftarans?.find(p => p.status === 'Diterima' || p.status === 'Aktif') || report.magang?.mahasiswa?.pendaftarans?.[0];
                                return activePendaftaran?.lowongan?.nama_perusahaan || "-";
                              })()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 ml-5">
                            {(() => {
                              const activePendaftaran = report.magang?.mahasiswa?.pendaftarans?.find(p => p.status === 'Diterima' || p.status === 'Aktif') || report.magang?.mahasiswa?.pendaftarans?.[0];
                              return activePendaftaran?.lowongan?.judul || "-";
                            })()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={report.status_review} />
                        {report.nilai !== null && (
                          <div className="mt-1 text-xs font-semibold text-emerald-600">
                            Nilai: {report.nilai}
                          </div>
                        )}
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
                            disabled={isReviewing}
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

      <ReviewFeedbackModal
        isOpen={feedbackModalOpen}
        selectedReport={selectedReport as any}
        feedbackText={feedbackText}
        selectedStatus={selectedStatus}
        nilai={nilai}
        onClose={() => setFeedbackModalOpen(false)}
        onFeedbackChange={setFeedbackText}
        onStatusChange={setSelectedStatus}
        onNilaiChange={setNilai}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default LaporanMagangPage;
