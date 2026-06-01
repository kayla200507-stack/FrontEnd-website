export interface InternAssessment {
  id: number;
  nim: string;
  studentName: string;
  company: string;
  position: string;
  periodStart: string;
  periodEnd: string;
  finalScore?: number;
  grade?: string;
  status: "pending" | "assessed" | "completed";
  feedback?: string;
}

export const initialAssessmentData: InternAssessment[] = [
  {
    id: 1,
    nim: "12200001",
    studentName: "Budi Santoso",
    company: "PT Teknologi Maju",
    position: "Frontend Developer",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    status: "pending",
  },
  {
    id: 2,
    nim: "12200002",
    studentName: "Siti Rahmawati",
    company: "PT Digital Kreatif",
    position: "UI/UX Designer",
    periodStart: "1 Maret 2026",
    periodEnd: "30 April 2026",
    finalScore: 88,
    grade: "A",
    status: "assessed",
  },
];
