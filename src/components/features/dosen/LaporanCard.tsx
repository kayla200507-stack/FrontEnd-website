import { Button } from "@/components/common/Button";
import { Calendar, File } from "lucide-react";

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
}

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
}: LaporanCardProps) {
  const statusBadgeText = {
    approved: "Disetujui",
    awaiting: "Menunggu Review",
    rejected: "Ditolak",
  };
  return (
    <div>
      <h4>{title}</h4>
      <p>{`${studentName} (${studentId})`}</p>
      <div>
        <div>
          <Calendar /> Submit : {submitDate}
        </div>
        <div>
          <File />
          {filePageCount} halaman . {fileSize} MB
        </div>
      </div>
      <div>{statusBadgeText[status]}</div>
      <div />
      <div>
        <Button variant="outline">Download</Button>
        <Button>Review Laporan</Button>
      </div>
    </div>
  );
}
