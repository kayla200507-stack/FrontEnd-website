import React, { useState, useMemo } from "react";
import Card from "../../components/features/dosen/Card.tsx";
import StatusCard from "../../components/features/dosen/StatusCard.tsx";
import DashboardHeader from "../../components/features/dosen/DashboardHeader.tsx";
import { useBimbingan } from "../../hooks/useMagang";
import { useLogbook, useValidateLogbook } from "../../hooks/useLogbook";
import { Loader2, CheckCircle, FileText, User as UserIcon } from "lucide-react";
import FeedbackForm from "../../components/features/dosen/FeedbackForm";

const MonitoringLogbook: React.FC = () => {
  const { data: bimbingan = [], isLoading: loadingBimbingan } = useBimbingan();
  const [selectedMagangId, setSelectedMagangId] = useState<number | "">("");

  // Auto-select first student if available and none selected
  React.useEffect(() => {
    if (bimbingan.length > 0 && selectedMagangId === "") {
      setSelectedMagangId(bimbingan[0].id_magang);
    }
  }, [bimbingan, selectedMagangId]);

  const currentStudent = useMemo(() => {
    return bimbingan.find((m: any) => m.id_magang === Number(selectedMagangId));
  }, [bimbingan, selectedMagangId]);

  const { data: logbooksData, isLoading: loadingLogbooks } = useLogbook(
    Number(selectedMagangId) || 0
  );

  const { mutate: validateLogbook, isPending: validating } = useValidateLogbook();

  const logbooks = logbooksData?.data || [];

  const handleValidate = (id_logbook: number, feedback?: string) => {
    validateLogbook({ id: id_logbook, status: "Diterima", feedback });
  };

  // Statistics
  const totalStudents = bimbingan.length;
  const totalLogs = logbooks.length;
  const reviewedLogs = logbooks.filter((l: any) => l.status_validasi === "Diterima").length;
  const pendingLogs = totalLogs - reviewedLogs;

  const sortedLogs = [...logbooks].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );

  if (loadingBimbingan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-gray-500 font-medium">Memuat data bimbingan...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <DashboardHeader
        title="Monitoring Logbook"
        subtitle="Review dan validasi logbook mahasiswa bimbingan"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="blue"
        />
        <StatusCard
          label="Total Logbook"
          value={totalLogs}
          icon={
            <FileText className="w-5 h-5" />
          }
          color="purple"
        />
        <StatusCard
          label="Sudah Divalidasi"
          value={reviewedLogs}
          icon={
            <CheckCircle className="w-5 h-5" />
          }
          color="green"
        />
        <StatusCard
          label="Belum Divalidasi"
          value={pendingLogs}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="yellow"
        />
      </div>

      {/* Student Picker Card */}
      <Card
        title="Pilih Mahasiswa"
        icon={
          <UserIcon className="w-5 h-5" />
        }
        bodyClassName="p-6"
      >
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Pilih mahasiswa untuk melihat riwayat logbook
          </label>
          <select
            value={selectedMagangId}
            onChange={(e) => setSelectedMagangId(Number(e.target.value))}
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-700"
          >
            {bimbingan.map((m: any) => (
              <option key={m.id_magang} value={m.id_magang}>
                {m.mahasiswa?.user?.profile?.nama || m.nim_mahasiswa} - {m.nim_mahasiswa}
              </option>
            ))}
          </select>
        </div>

        {currentStudent && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-blue-50 rounded-xl">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-600" />
              {currentStudent.mahasiswa?.user?.profile?.nama || currentStudent.nim_mahasiswa} - {currentStudent.nim_mahasiswa}
            </div>
          </div>
        )}
      </Card>

      {/* Timeline Logbook Card */}
      <Card
        title="Timeline Logbook"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        className="mt-6"
      >
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Riwayat aktivitas mahasiswa secara kronologis (terbaru ke terlama)
        </div>

        {loadingLogbooks ? (
          <div className="flex justify-center py-12">
             <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : sortedLogs.length > 0 ? (
          <div className="space-y-6">
            {sortedLogs.map((log) => {
              const isReviewed = log.status_validasi === "Diterima";
              return (
                <div
                  key={log.id_logbook}
                  className="relative pl-6 pb-6 border-l-2 border-gray-200 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>

                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-bold text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-800">
                      {new Date(log.tanggal).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isReviewed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isReviewed ? "✓ Sudah Divalidasi" : "○ Belum Divalidasi"}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                    <div className="text-sm text-gray-700 leading-relaxed font-medium mb-2">
                      Aktivitas:
                    </div>
                    <div className="text-sm text-gray-600 mb-4 whitespace-pre-wrap">
                      {log.kegiatan}
                    </div>
                    
                    {log.kendala && (
                       <>
                        <div className="text-sm text-gray-700 leading-relaxed font-medium mb-1 mt-4 border-t pt-2">
                          Kendala:
                        </div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap text-red-600 bg-red-50 p-2 rounded">
                          {log.kendala}
                        </div>
                       </>
                    )}

                    {log.foto_kegiatan_url && (
                        <div className="mt-4">
                            <img src={log.foto_kegiatan_url} alt="Kegiatan" className="max-w-xs rounded-lg shadow-sm border border-gray-200" />
                        </div>
                    )}
                  </div>

                  {!isReviewed ? (
                     <FeedbackForm
                        initialFeedback={log.feedback || ""}
                        isReviewed={false}
                        onSave={async (feedbackText) => {
                            handleValidate(log.id_logbook, feedbackText);
                        }}
                     />
                  ) : (
                    log.feedback && (
                        <div className="mx-4 mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                        <svg
                            className="inline w-4 h-4 text-yellow-600 mr-2"
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
                        <span className="text-sm text-yellow-800">
                            <strong>Feedback Anda:</strong> {log.feedback}
                        </span>
                        </div>
                    )
                  )}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>Tidak ada aktivitas logbook untuk mahasiswa ini</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MonitoringLogbook;
