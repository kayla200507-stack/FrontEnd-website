// pages/Dosen/MonitoringLogbook.tsx
import React, { useState, useEffect, useCallback } from "react";
import Card from "../../components/features/dosen/Card.tsx";
import StatusCard from "../../components/features/dosen/StatusCard.tsx";
import DashboardHeader from "../../components/features/dosen/DashboardHeader.tsx";
import FeedbackForm from "../../components/features/dosen/FeedbackForm.tsx";

// Types
interface LogEntry {
  date: string;
  reviewed: boolean;
  activity: string;
  feedback: string;
  feedbackHistory: string;
}

interface Student {
  id: string;
  name: string;
  nim: string;
  logs: LogEntry[];
}

interface FeedbackState {
  [studentId: string]: {
    [logIndex: number]: string;
  };
}

// Mock Data
const mockStudents: Student[] = [
  {
    id: "budi",
    name: "Budi Santoso",
    nim: "112100",
    logs: [
      {
        date: "24 Maret 2026",
        reviewed: false,
        activity:
          "Mengembangkan fitur login dengan React dan implementasi autentikasi JWT. Mempelajari best practices untuk secure authentication.",
        feedback: "",
        feedbackHistory: "",
      },
      {
        date: "23 Maret 2026",
        reviewed: true,
        activity:
          "Mempelajari dokumentasi API dan membuat integrasi dengan backend. Berhasil mengimplementasikan GET dan POST request.",
        feedback:
          "Sudah bagus, tetapi perhatikan error handling. Tambahkan loading state.",
        feedbackHistory:
          "Sudah bagus, tetapi perhatikan error handling. Tambahkan loading state.",
      },
      {
        date: "20 Maret 2026",
        reviewed: true,
        activity:
          "Setup environment React + Vite, initial commit struktur folder dan routing.",
        feedback: "Baik, dokumentasikan komponen utama.",
        feedbackHistory: "Baik, dokumentasikan komponen utama.",
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
        activity:
          "Membuat halaman dashboard admin, implementasi chart dengan Chart.js.",
        feedback: "",
        feedbackHistory: "",
      },
      {
        date: "22 Maret 2026",
        reviewed: true,
        activity: "Integrasi API profile user dan update data diri.",
        feedback: "Perbaiki validasi form, dan tambah unit testing.",
        feedbackHistory: "Perbaiki validasi form, dan tambah unit testing.",
      },
    ],
  },
  {
    id: "reza",
    name: "Reza Pratama",
    nim: "112102",
    logs: [
      {
        date: "25 Maret 2026",
        reviewed: false,
        activity: "Menyusun dokumentasi API backend dengan Swagger.",
        feedback: "",
        feedbackHistory: "",
      },
      {
        date: "24 Maret 2026",
        reviewed: false,
        activity: "Membuat unit test untuk service layer dengan Jest.",
        feedback: "",
        feedbackHistory: "",
      },
    ],
  },
];

const MonitoringLogbook: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("budi");
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize feedback state from existing data
  useEffect(() => {
    const initialFeedback: FeedbackState = {};
    students.forEach((student) => {
      initialFeedback[student.id] = {};
      student.logs.forEach((log, idx) => {
        initialFeedback[student.id][idx] = log.feedback || "";
      });
    });
    setFeedbackState(initialFeedback);
  }, []);

  const currentStudent = students.find((s) => s.id === selectedStudentId);

  // Statistics
  const totalStudents = students.length;
  const totalLogs = students.reduce((acc, s) => acc + s.logs.length, 0);
  const reviewedLogs = students.reduce(
    (acc, s) => acc + s.logs.filter((l) => l.reviewed).length,
    0,
  );
  const pendingLogs = totalLogs - reviewedLogs;

  const handleSaveFeedback = useCallback(
    async (studentId: string, logIndex: number, feedbackText: string) => {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update student's log data
      const updatedStudents = students.map((student) => {
        if (student.id === studentId) {
          const updatedLogs = [...student.logs];
          updatedLogs[logIndex] = {
            ...updatedLogs[logIndex],
            feedback: feedbackText,
            feedbackHistory: feedbackText,
            reviewed:
              feedbackText.trim() !== ""
                ? true
                : updatedLogs[logIndex].reviewed,
          };
          return { ...student, logs: updatedLogs };
        }
        return student;
      });

      setStudents(updatedStudents);

      // Update feedback state
      setFeedbackState((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [logIndex]: feedbackText,
        },
      }));

      setLoading(false);
      showNotification(
        feedbackText.trim() !== ""
          ? "Feedback berhasil disimpan"
          : "Feedback dikosongkan",
      );
    },
    [students],
  );

  const showNotification = (message: string) => {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-full text-sm font-medium shadow-lg z-50 animate-fade-in";
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const getCurrentFeedback = (studentId: string, logIndex: number): string => {
    return feedbackState[studentId]?.[logIndex] || "";
  };

  // Sort logs by date (newest first)
  const sortedLogs = currentStudent
    ? [...currentStudent.logs].sort((a, b) => {
        const parseDate = (dateStr: string) => {
          return new Date(
            dateStr.replace(/ Maret/g, " March").replace(/ April/g, " April"),
          );
        };
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      })
    : [];

  const allReviewed =
    currentStudent?.logs.every((log) => log.reviewed) || false;
  const hasUnreviewed =
    currentStudent?.logs.some((log) => !log.reviewed) || false;

  return (
    <div className="p-6">
      <DashboardHeader
        title="Monitoring Logbook"
        subtitle="Review dan berikan feedback untuk logbook mahasiswa"
        actions={
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Export Logbook
          </button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          label="Total Mahasiswa"
          value={totalStudents}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
          color="blue"
        />
        <StatusCard
          label="Total Logbook"
          value={totalLogs}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          color="purple"
        />
        <StatusCard
          label="Sudah Direview"
          value={reviewedLogs}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          color="green"
        />
        <StatusCard
          label="Belum Direview"
          value={pendingLogs}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          color="yellow"
        />
      </div>

      {/* Student Picker Card */}
      <Card
        title="Pilih Mahasiswa"
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        }
        bodyClassName="p-6"
      >
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Pilih mahasiswa untuk melihat riwayat logbook
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-700"
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.nim}
              </option>
            ))}
          </select>
        </div>

        {currentStudent && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-blue-50 rounded-xl">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {currentStudent.name} - {currentStudent.nim}
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="reviewStatus"
                  value="not_reviewed"
                  checked={hasUnreviewed && !allReviewed}
                  disabled={!hasUnreviewed}
                  onChange={() => {}}
                  className="w-4 h-4 text-blue-600"
                />
                <span
                  className={!hasUnreviewed ? "text-gray-400" : "text-gray-700"}
                >
                  ○ Belum Direview
                </span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="reviewStatus"
                  value="reviewed"
                  checked={allReviewed}
                  onChange={() => {}}
                  className="w-4 h-4 text-blue-600"
                />
                <span
                  className={allReviewed ? "text-gray-700" : "text-gray-400"}
                >
                  ✓ Sudah Direview
                </span>
              </label>
            </div>
          </div>
        )}
      </Card>

      {/* Timeline Logbook Card */}
      <Card
        title="Timeline Logbook"
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        className="mt-6"
      >
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Riwayat aktivitas mahasiswa secara kronologis (terbaru ke terlama)
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <svg
              className="w-8 h-8 animate-spin text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : sortedLogs.length > 0 ? (
          <div className="space-y-6">
            {sortedLogs.map((log, idx) => {
              const originalIndex =
                currentStudent?.logs.findIndex(
                  (l) => l.date === log.date && l.activity === log.activity,
                ) || idx;
              return (
                <div
                  key={`${log.date}-${idx}`}
                  className="relative pl-6 pb-6 border-l-2 border-gray-200 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>

                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-bold text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-800">
                      <svg
                        className="inline w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {log.date}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        log.reviewed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.reviewed ? "✓ Sudah Direview" : "○ Belum Direview"}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <svg
                        className="inline w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      {log.activity}
                    </div>
                  </div>

                  <FeedbackForm
                    initialFeedback={getCurrentFeedback(
                      selectedStudentId,
                      originalIndex,
                    )}
                    isReviewed={log.reviewed}
                    onSave={(feedback) =>
                      handleSaveFeedback(
                        selectedStudentId,
                        originalIndex,
                        feedback,
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p>Tidak ada aktivitas logbook</p>
          </div>
        )}
      </Card>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MonitoringLogbook;
