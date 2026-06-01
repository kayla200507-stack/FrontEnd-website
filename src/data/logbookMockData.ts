export interface LogEntry {
  date: string;
  reviewed: boolean;
  activity: string;
  feedback: string;
  feedbackHistory: string;
}

export interface StudentLogbook {
  id: string;
  name: string;
  nim: string;
  logs: LogEntry[];
}

export const mockLogbookStudents: StudentLogbook[] = [
  {
    id: "budi",
    name: "Budi Santoso",
    nim: "112100",
    logs: [
      {
        date: "24 Maret 2026",
        reviewed: false,
        activity:
          "Mengembangkan fitur login dengan React dan JWT authentication.",
        feedback: "",
        feedbackHistory: "",
      },
      {
        date: "23 Maret 2026",
        reviewed: true,
        activity: "Integrasi API backend (GET & POST request).",
        feedback: "Sudah bagus.",
        feedbackHistory: "Sudah bagus.",
      },
      {
        date: "22 Maret 2026",
        reviewed: true,
        activity: "Membuat halaman dashboard mahasiswa.",
        feedback: "Baik.",
        feedbackHistory: "Baik.",
      },
      {
        date: "21 Maret 2026",
        reviewed: true,
        activity: "Implementasi routing aplikasi.",
        feedback: "Lanjutkan.",
        feedbackHistory: "Lanjutkan.",
      },
      {
        date: "20 Maret 2026",
        reviewed: true,
        activity: "Setup project React dan Tailwind.",
        feedback: "Bagus.",
        feedbackHistory: "Bagus.",
      },
    ],
  },
  {
    id: "siti",
    name: "Siti Aminah",
    nim: "112101",
    logs: [
      {
        date: "24 Maret 2026",
        reviewed: false,
        activity: "Membuat dashboard admin dengan Chart.js.",
        feedback: "",
        feedbackHistory: "",
      },
    ],
  },
];
