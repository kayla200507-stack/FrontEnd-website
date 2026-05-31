import { useState } from "react";
import { AlertCircle, Calendar, Video, Check } from "lucide-react";

type EventType = "deadline" | "jadwal" | "meeting";

interface CalendarEvent {
  date: string;
  title: string;
  desc: string;
  type: EventType;
  priority?: "penting" | "normal";
}

const events: CalendarEvent[] = [
  { date: "2026-03-26", title: "Deadline Logbook Minggu ke-4", desc: "Pastikan logbook minggu ke-4 sudah diisi", type: "deadline", priority: "penting" },
  { date: "2026-03-27", title: "Jadwal Magang", desc: "Hari kerja reguler di PT Teknologi Maju", type: "jadwal", priority: "normal" },
  { date: "2026-03-28", title: "Deadline Laporan Mingguan", desc: "Submit laporan mingguan ke-4", type: "deadline", priority: "penting" },
  { date: "2026-03-29", title: "Meeting dengan Dosen Pembimbing", desc: "Diskusi progress magang dan review logbook", type: "meeting", priority: "normal" },
  { date: "2026-04-05", title: "Deadline Lowongan PT Digital Kreatif", desc: "Batas akhir pendaftaran UI/UX Designer Intern", type: "deadline", priority: "normal" },
  { date: "2026-05-12", title: "Jadwal Magang", desc: "Hari kerja reguler di PT Teknologi Maju", type: "jadwal", priority: "normal" },
  { date: "2026-05-20", title: "Meeting dengan Dosen Pembimbing", desc: "Review progress magang bulan kedua", type: "meeting", priority: "normal" },
  { date: "2026-05-30", title: "Deadline Logbook Minggu ke-8", desc: "Pastikan logbook minggu ke-8 sudah diisi", type: "deadline", priority: "penting" },
];

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
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-03-25");

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const toDateStr = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const getEventsForDay = (day: number) =>
    events.filter((e) => e.date === toDateStr(currentYear, currentMonth, day));

  const navigateMonth = (dir: -1 | 1) => {
    const d = new Date(currentYear, currentMonth + dir, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };

  const goToToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(4);
    setSelectedDate("2026-05-30");
  };

  const selectedEvents = selectedDate ? events.filter((e) => e.date === selectedDate) : [];
  const selectedDateObj = selectedDate ? new Date(selectedDate + "T00:00:00") : null;
  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#3a60a0] text-2xl font-bold">Kalender Magang</h1>
        <p className="text-[#4a5565] text-sm mt-1">Pengingat deadline dan jadwal kegiatan magang</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Deadline Minggu Ini", value: 3, bg: "bg-[#ffe2e2]", icon: <AlertCircle size={24} className="text-[#E7000B]" /> },
          { label: "Jadwal Magang",       value: 5, bg: "bg-[#dbeafe]", icon: <Calendar   size={24} className="text-[#155DFC]" /> },
          { label: "Meeting Terjadwal",   value: 1, bg: "bg-[#f3e8ff]", icon: <Video      size={24} className="text-[#9810FA]" /> },
          { label: "Hari Tersisa",        value: 21, bg: "bg-[#dcfce7]", icon: <Check     size={24} className="text-[#00A63E]" /> },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] shadow-sm py-5 px-5 flex items-center gap-4">
            <div className={`size-12 ${s.bg} rounded-[10px] flex items-center justify-center shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[#4a5565] text-sm">{s.label}</p>
              <p className="text-black text-3xl font-bold leading-none mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar + Agenda row */}
      <div className="flex gap-4 mb-4">
        {/* Calendar card */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6 flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#0a0a0a] font-medium text-base">{MONTHS[currentMonth]} {currentYear}</p>
              <p className="text-[#717182] text-sm">Klik tanggal untuk melihat detail</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="size-8 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white hover:bg-slate-50 text-[#0a0a0a] text-sm font-medium transition-colors"
              >
                {"<"}
              </button>
              <button
                onClick={goToToday}
                className="h-8 px-3 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white hover:bg-slate-50 text-[#0a0a0a] text-sm font-medium transition-colors"
              >
                Hari Ini
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="size-8 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white hover:bg-slate-50 text-[#0a0a0a] text-sm font-medium transition-colors"
              >
                {">"}
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="flex items-center justify-center h-9 rounded-lg border border-[rgba(0,0,0,0.15)]">
                <span className="text-[#4a5565] font-semibold text-sm">{d}</span>
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} className="h-16" />;
              const dayEvents = getEventsForDay(day);
              const dateStr = toDateStr(currentYear, currentMonth, day);
              const isSelected = selectedDate === dateStr;
              const isToday = currentYear === 2026 && currentMonth === 4 && day === 30;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-16 rounded-lg border text-left p-2 transition-colors ${
                    isSelected || isToday
                      ? "bg-[#eff6ff] border-[#2b7fff]"
                      : "border-[#e5e7eb] hover:bg-slate-50"
                  }`}
                >
                  <span className="text-[#101828] font-semibold text-sm">{day}</span>
                  {dayEvents.slice(0, 1).map((e, i) => (
                    <div
                      key={i}
                      className={`mt-1 text-[8px] px-1 py-0.5 rounded font-medium truncate ${getCalendarEventStyle(e.type)}`}
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
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6 w-[300px] shrink-0">
          <div className="mb-4">
            <p className="text-[#0a0a0a] font-medium text-base">
              {selectedDateObj
                ? `Agenda ${selectedDateObj.getDate()} ${MONTHS[selectedDateObj.getMonth()]} ${selectedDateObj.getFullYear()}`
                : "Pilih Tanggal"}
            </p>
            <p className="text-[#717182] text-sm">{selectedEvents.length} kegiatan</p>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Calendar size={48} className="text-[#99A1AF] mb-3" />
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
                      <div className={`${getDateBg(e.type)} rounded-[10px] size-12 flex flex-col items-center justify-center shrink-0`}>
                        <span className="text-[#0a0a0a] font-medium text-[10px]">
                          {MONTHS[selectedDateObj!.getMonth()].substring(0, 3)}
                        </span>
                        <span className="text-[#0a0a0a] font-bold text-lg leading-none">
                          {selectedDateObj!.getDate()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#0a0a0a] font-semibold text-sm leading-tight">{e.title}</p>
                        <p className="text-[#4a5565] text-xs mt-0.5 leading-tight">{e.desc}</p>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          <span className={`${typeBadge.bg} ${typeBadge.text} text-xs px-2 py-0.5 rounded-lg font-medium`}>
                            {typeBadge.label}
                          </span>
                          <span className={`${prioBadge.bg} ${prioBadge.text} ${prioBadge.border} text-xs px-2 py-0.5 rounded-lg font-medium`}>
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
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6">
        <div className="mb-4">
          <p className="text-[#0a0a0a] font-medium text-base">Agenda Mendatang</p>
          <p className="text-[#717182] text-sm">Deadline dan jadwal yang akan datang</p>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((e, i) => {
            const d = new Date(e.date + "T00:00:00");
            const typeBadge = getEventTypeBadge(e.type);
            const prioBadge = getPriorityBadge(e.priority);
            return (
              <div key={i} className="flex items-center justify-between border border-[rgba(0,0,0,0.08)] rounded-xl px-5 py-3">
                <div className="flex items-center gap-4">
                  <div className={`${getDateBg(e.type)} rounded-[10px] size-12 flex flex-col items-center justify-center shrink-0`}>
                    <span className="text-[#0a0a0a] font-medium text-[10px]">
                      {MONTHS[d.getMonth()].substring(0, 3)}
                    </span>
                    <span className="text-[#0a0a0a] font-bold text-lg leading-none">{d.getDate()}</span>
                  </div>
                  <div>
                    <p className="text-[#0a0a0a] font-semibold text-sm leading-tight">{e.title}</p>
                    <p className="text-[#4a5565] text-xs mt-0.5">{e.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className={`${typeBadge.bg} ${typeBadge.text} text-xs px-2 py-0.5 rounded-lg font-medium`}>
                    {typeBadge.label}
                  </span>
                  <span className={`${prioBadge.bg} ${prioBadge.text} ${prioBadge.border} text-xs px-2 py-0.5 rounded-lg font-medium`}>
                    {prioBadge.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
