import { Button } from "@/components/common/Button";
import { Calendar, File, Download, Eye, Building, User } from "lucide-react";
import { Card } from "@/components/common/Card";

export interface LaporanCardProps {
  title: string;
  studentName: string;
  studentId: string;
  companyName: string;
  jobRole?: string;
  submitDate: string;
  lectureFeedback?: string;
  filePageCount?: number;
  fileSize?: number;
  status: "approved" | "awaiting" | "rejected";
  onDownload?: () => void; // ← TAMBAHKAN INI
  onReview?: () => void; // ← TAMBAHKAN INI
}

const statusConfig = {
  approved: { text: "Disetujui", className: "bg-green-100 text-green-700" },
  awaiting: {
    text: "Menunggu Review",
    className: "bg-yellow-100 text-yellow-700",
  },
  rejected: { text: "Revisi", className: "bg-red-100 text-red-700" },
};

export function LaporanCard({
  title,
  studentName,
  studentId,
  companyName,
  submitDate,
  lectureFeedback,
  filePageCount,
  fileSize,
  jobRole,
  status,
  onDownload, // ← TAMBAHKAN INI
  onReview, // ← TAMBAHKAN INI
}: LaporanCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Card className="p-4 hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo.className}`}
            >
              {statusInfo.text}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <User className="h-3.5 w-3.5" />
            <span>
              {studentName} ({studentId})
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
            <Building className="h-3.5 w-3.5" />
            <span>
              {companyName} {jobRole && `- ${jobRole}`}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Submit: {submitDate}
            </span>
            {filePageCount && fileSize && (
              <span className="flex items-center gap-1">
                <File className="h-3 w-3" /> {filePageCount} halaman ·{" "}
                {fileSize} MB
              </span>
            )}
          </div>

          {lectureFeedback && (
            <div className="mt-2 text-xs p-2 rounded bg-gray-50 text-gray-600 border-l-2 border-blue-300">
              <span className="font-medium">Feedback Dosen:</span>{" "}
              {lectureFeedback}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload} // ← PASTIKAN INI ADA
            className="flex items-center gap-1"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
          <Button
            size="sm"
            onClick={onReview} // ← PASTIKAN INI ADA
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
          >
            <Eye className="h-3.5 w-3.5" /> Review
          </Button>
        </div>
      </div>
    </Card>
  );
}
