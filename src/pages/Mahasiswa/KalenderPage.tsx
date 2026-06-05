import { useState } from "react";
import { AlertCircle, Calendar, Video, Check } from "lucide-react";

type EventType = "deadline" | "jadwal" | "meeting";

import { useMyMagang } from "../../hooks/useMagang";
import { DashboardHeader } from "../../components/common/DashboardHeader";

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function getEventTypeBadge(type: EventType) {
  switch (type) {
    case "deadline": return { bg: "bg-[#ffe2e2]", text: "text-[#9f0712]", label: "Deadline" };
    case "jadwal":   return { bg: "bg-[#dbeafe]", text: "text-[#193cb8]", label: "Jadwal" };
    case "meeting":  return { bg: "bg-[#f3e8ff]", text: "text-[#6e11b0]", label: "Meeting" };
  }
}

function getPriorityBadge(priority?: string) {
  if (priority === "penting") return { bg: "bg-[#fef2f2]", text: "text-[#c10007]", border: "border border-[#ffc9c9]", label: "Penting" };
  return { bg: "bg-[#f9fafb]", text: "text-[#364153]", border: "border border-[#e5e7eb]", label: "Normal" };
}

function getDateBg(type: EventType) {
  switch (type) {
    case "deadline": return "bg-[#ffe2e2]";
    case "jadwal":   return "bg-[#dbeafe]";
    case "meeting":  return "bg-[#f3e8ff]";
  }
}

function getCalendarEventStyle(type: EventType) {
  switch (type) {
    case "deadline": return "bg-[#ffe2e2] text-[#c10007]";
    case "jadwal":   return "bg-[#dbeafe] text-[#1447e6]";
    case "meeting":  return "bg-[#f3e8ff] text-[#8200db]";
  }
}

function getCalendarEventLabel(type: EventType) {
  switch (type) {
    case "deadline": return "Deadline...";
    case "jadwal":   return "Jadwal Magang...";
    case "meeting":  return "Meeting...";
  }
}

export function KalenderPage() {
  const { data: magang, isLoading } = useMyMagang();
  
  const today = new Date();
  const toDateStr = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const dateObjToStr = (d: Date) => toDateStr(d.getFullYear(), d.getMonth(), d.getDate());

  const events: any[] = [];

  if (magang && magang.tanggal_mulai) {
    const startDate = new Date(magang.tanggal_mulai);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 6);

    let currentLogbookDate = new Date(startDate);
    currentLogbookDate.setDate(currentLogbookDate.getDate() + 7);
    let logbookCounter = 1;
    while (currentLogbookDate <= endDate) {
      events.push({
        id: `logbook-${logbookCounter}`,
        title: `Pengingat Logbook Minggu ke-${logbookCounter}`,
        desc: "Waktunya mengisi logbook mingguan Anda.",
        date: dateObjToStr(currentLogbookDate),
        type: "deadline",
        priority: "penting",
      });
      currentLogbookDate.setDate(currentLogbookDate.getDate() + 7);
      logbookCounter++;
    }

    let currentMeetDate = new Date(startDate);
    currentMeetDate.setMonth(currentMeetDate.getMonth() + 1);
    let meetCounter = 1;
    while (currentMeetDate <= endDate) {
      events.push({
        id: `meet-${meetCounter}`,
        title: `Meeting Evaluasi Bulan ke-${meetCounter}`,
        desc: "Meeting bulanan dengan dosen pembimbing.",
        date: dateObjToStr(currentMeetDate),
        type: "meeting",
        priority: "normal",
      });
      currentMeetDate.setMonth(currentMeetDate.getMonth() + 1);
      meetCounter++;
    }

    // Generate daily 'Jadwal Magang' for weekdays (Monday to Friday)
    let currentJadwalDate = new Date(startDate);
    let jadwalCounter = 1;
    while (currentJadwalDate <= endDate) {
      const dayOfWeek = currentJadwalDate.getDay();
      // 1 = Monday, 5 = Friday
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        events.push({
          id: `jadwal-${jadwalCounter}`,
          title: "Jadwal Magang Harian",
          desc: "Kegiatan magang reguler di instansi.",
          date: dateObjToStr(currentJadwalDate),
          type: "jadwal",
          priority: "normal",
        });
      }
      currentJadwalDate.setDate(currentJadwalDate.getDate() + 1);
      jadwalCounter++;
    }
  }

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(toDateStr(today.getFullYear(), today.getMonth(), today.getDate()));

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);


  const getEventsForDay = (day: number) =>
    events.filter((e) => e.date === toDateStr(currentYear, currentMonth, day));

  const navigateMonth = (dir: -1 | 1) => {
    const d = new Date(currentYear, currentMonth + dir, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };

  const goToToday = () => {
    const t = new Date();
    setCurrentYear(t.getFullYear());
    setCurrentMonth(t.getMonth());
    setSelectedDate(toDateStr(t.getFullYear(), t.getMonth(), t.getDate()));
  };

  const selectedEvents = selectedDate ? events.filter((e) => e.date === selectedDate) : [];
  const selectedDateObj = selectedDate ? new Date(selectedDate + "T00:00:00") : null;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const totalPages = Math.ceil(upcomingEvents.length / itemsPerPage);
  const paginatedUpcomingEvents = upcomingEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <DashboardHeader 
        title="Kalender Magang" 
        description="Pengingat deadline dan jadwal kegiatan magang" 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Deadline", value: events.filter(e => e.type === "deadline").length, bg: "bg-[#ffe2e2]", icon: <AlertCircle size={20} className="text-[#E7000B] md:w-[24px] md:h-[24px]" /> },
          { label: "Jadwal Magang",       value: events.filter(e => e.type === "jadwal").length, bg: "bg-[#dbeafe]", icon: <Calendar   size={20} className="text-[#155DFC] md:w-[24px] md:h-[24px]" /> },
          { label: "Meeting Terjadwal",   value: events.filter(e => e.type === "meeting").length, bg: "bg-[#f3e8ff]", icon: <Video      size={20} className="text-[#9810FA] md:w-[24px] md:h-[24px]" /> },
          { label: "Total Agenda",        value: events.length, bg: "bg-[#dcfce7]", icon: <Check     size={20} className="text-[#00A63E] md:w-[24px] md:h-[24px]" /> },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] shadow-sm p-3 md:p-5 flex items-center gap-3 md:gap-4">
            <div className={`size-10 md:size-12 ${s.bg} rounded-[10px] flex items-center justify-center shrink-0`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[#4a5565] text-[10px] md:text-sm truncate">{s.label}</p>
              <p className="text-slate-900 text-xl md:text-3xl font-bold leading-none mt-0.5">{isLoading ? "-" : s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar + Agenda row */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Calendar card */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-4 md:p-6 flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-[#1e293b] font-medium text-base">{MONTHS[currentMonth]} {currentYear}</p>
              <p className="text-[#717182] text-sm">Klik tanggal untuk melihat detail</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="size-8 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white hover:bg-slate-50 text-[#1e293b] text-sm font-medium transition-colors"
              >
                {"<"}
              </button>
              <button
                onClick={goToToday}
                className="h-8 px-3 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white hover:bg-slate-50 text-[#1e293b] text-sm font-medium transition-colors"
              >
                Hari Ini
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="size-8 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white hover:bg-slate-50 text-[#1e293b] text-sm font-medium transition-colors"
              >
                {">"}
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="flex items-center justify-center h-8 md:h-9 rounded-lg border border-[rgba(0,0,0,0.15)]">
                <span className="text-[#4a5565] font-semibold text-[10px] md:text-sm">{d}</span>
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} className="h-12 md:h-16" />;
              const dayEvents = getEventsForDay(day);
              const dateStr = toDateStr(currentYear, currentMonth, day);
              const isSelected = selectedDate === dateStr;
              const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-12 md:h-16 rounded-lg border text-left p-1 md:p-2 transition-colors ${
                    isSelected || isToday
                      ? "bg-[#eff6ff] border-[#2b7fff]"
                      : "border-[#e5e7eb] hover:bg-slate-50"
                  }`}
                >
                  <span className="text-[#101828] font-semibold text-[10px] md:text-sm">{day}</span>
                  {dayEvents.slice(0, 1).map((e, i) => (
                    <div
                      key={i}
                      className={`mt-1 text-[6px] md:text-[8px] px-0.5 md:px-1 py-0.5 rounded font-medium truncate ${getCalendarEventStyle(e.type)}`}
                    >
                      {getCalendarEventLabel(e.type)}
                    </div>
                  ))}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agenda panel */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-4 md:p-6 w-full lg:w-[300px] shrink-0">
          <div className="mb-4">
            <p className="text-[#1e293b] font-medium text-base">
              {selectedDateObj
                ? `Agenda ${selectedDateObj.getDate()} ${MONTHS[selectedDateObj.getMonth()]} ${selectedDateObj.getFullYear()}`
                : "Pilih Tanggal"}
            </p>
            <p className="text-[#717182] text-sm">{selectedEvents.length} kegiatan</p>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 md:py-10 text-center">
              <Calendar size={40} className="text-[#99A1AF] mb-3 md:w-[48px] md:h-[48px]" />
              <p className="text-[#4a5565] text-sm">Tidak ada agenda untuk tanggal ini</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((e, i) => {
                const typeBadge = getEventTypeBadge(e.type);
                const prioBadge = getPriorityBadge(e.priority);
                return (
                  <div key={i} className="border border-[rgba(0,0,0,0.08)] rounded-xl p-3">
                    <div className="flex items-start gap-3">
                      <div className={`${getDateBg(e.type)} rounded-[10px] size-10 md:size-12 flex flex-col items-center justify-center shrink-0`}>
                        <span className="text-[#1e293b] font-medium text-[8px] md:text-[10px]">
                          {MONTHS[selectedDateObj!.getMonth()].substring(0, 3)}
                        </span>
                        <span className="text-[#1e293b] font-bold text-base md:text-lg leading-none">
                          {selectedDateObj!.getDate()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#1e293b] font-semibold text-sm leading-tight truncate">{e.title}</p>
                        <p className="text-[#4a5565] text-[10px] md:text-xs mt-0.5 leading-tight line-clamp-2">{e.desc}</p>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          <span className={`${typeBadge.bg} ${typeBadge.text} text-[10px] px-2 py-0.5 rounded-lg font-medium`}>
                            {typeBadge.label}
                          </span>
                          <span className={`${prioBadge.bg} ${prioBadge.text} ${prioBadge.border} text-[10px] px-2 py-0.5 rounded-lg font-medium`}>
                            {prioBadge.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming agenda list */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-4 md:p-6">
        <div className="mb-4">
          <p className="text-[#1e293b] font-medium text-base">Agenda Mendatang</p>
          <p className="text-[#717182] text-sm">Deadline dan jadwal yang akan datang</p>
        </div>
        <div className="space-y-3">
          {paginatedUpcomingEvents.map((e, i) => {
            const d = new Date(e.date + "T00:00:00");
            const typeBadge = getEventTypeBadge(e.type);
            const prioBadge = getPriorityBadge(e.priority);
            return (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border border-[rgba(0,0,0,0.08)] rounded-xl px-4 md:px-5 py-3 gap-3">
                <div className="flex items-center gap-4">
                  <div className={`${getDateBg(e.type)} rounded-[10px] size-10 md:size-12 flex flex-col items-center justify-center shrink-0`}>
                    <span className="text-[#1e293b] font-medium text-[8px] md:text-[10px]">
                      {MONTHS[d.getMonth()].substring(0, 3)}
                    </span>
                    <span className="text-[#1e293b] font-bold text-base md:text-lg leading-none">{d.getDate()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#1e293b] font-semibold text-sm leading-tight truncate">{e.title}</p>
                    <p className="text-[#4a5565] text-[10px] md:text-xs mt-0.5">{e.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className={`${typeBadge.bg} ${typeBadge.text} text-[10px] px-2 py-0.5 rounded-lg font-medium`}>
                    {typeBadge.label}
                  </span>
                  <span className={`${prioBadge.bg} ${prioBadge.text} ${prioBadge.border} text-[10px] px-2 py-0.5 rounded-lg font-medium`}>
                    {prioBadge.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              Sebelumnya
            </button>
            <span className="text-sm text-gray-500">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
