export default function KalenderPage() {
  const stats = [
    {
      title: "Deadline Minggu Ini",
      value: 3,
      bg: "bg-red-100",
      text: "text-red-500",
    },
    {
      title: "Jadwal Magang",
      value: 5,
      bg: "bg-blue-100",
      text: "text-blue-500",
    },
    {
      title: "Meeting Terjadwal",
      value: 1,
      bg: "bg-purple-100",
      text: "text-purple-500",
    },
    {
      title: "Hari Tersisa",
      value: 21,
      bg: "bg-green-100",
      text: "text-green-500",
    },
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const dates = [
    "",
    "",
    "",
    "",
    "",
    "",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-6 text-[#1F2937]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#4769B1] leading-tight">
              Kalender Magang
            </h1>
            <p className="text-[#6B7280] text-[16px] mt-1">
              Pengingat deadline dan jadwal kegiatan magang
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}
              >
                <div className={`w-5 h-5 rounded-full border-2 ${item.text}`} />
              </div>

              <div>
                <p className="text-[14px] text-[#6B7280]">{item.title}</p>
                <h2 className="text-[28px] font-bold leading-none mt-1">
                  {item.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Main Calendar */}
        <div className="grid grid-cols-[1fr_350px] gap-5">
          {/* Calendar */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-[18px] font-semibold">Maret 2026</h2>
                <p className="text-[#6B7280] text-[14px] mt-1">
                  Klik tanggal untuk melihat detail
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg border border-[#D1D5DB] bg-white text-[16px]">
                  &lt;
                </button>

                <button className="h-9 px-4 rounded-lg border border-[#D1D5DB] bg-white text-[14px] font-medium">
                  Hari Ini
                </button>

                <button className="w-9 h-9 rounded-lg border border-[#D1D5DB] bg-white text-[16px]">
                  &gt;
                </button>
              </div>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-3 mb-3">
              {days.map((day) => (
                <div
                  key={day}
                  className="h-[42px] rounded-xl border border-[#D1D5DB] flex items-center justify-center text-[14px] font-semibold text-[#4B5563]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-3">
              {dates.map((date, index) => {
                const isActive = date === 25;

                return (
                  <div
                    key={index}
                    className={`h-[72px] rounded-2xl border p-2 relative overflow-hidden ${
                      date
                        ? isActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-[#E5E7EB] bg-white"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    {date && (
                      <>
                        <p className="text-[14px] font-semibold">{date}</p>

                        {date === 26 && (
                          <div className="absolute bottom-2 left-2 right-2 bg-red-100 text-red-500 text-[9px] px-2 py-1 rounded-md truncate">
                            Deadline Logboo...
                          </div>
                        )}

                        {date === 27 && (
                          <div className="absolute bottom-2 left-2 right-2 bg-blue-100 text-blue-500 text-[9px] px-2 py-1 rounded-md truncate">
                            Jadwal Magang...
                          </div>
                        )}

                        {date === 28 && (
                          <div className="absolute bottom-2 left-2 right-2 bg-red-100 text-red-500 text-[9px] px-2 py-1 rounded-md truncate">
                            Deadline Lapora...
                          </div>
                        )}

                        {date === 29 && (
                          <div className="absolute bottom-2 left-2 right-2 bg-purple-100 text-purple-500 text-[9px] px-2 py-1 rounded-md truncate">
                            Meeting dengan ...
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Agenda */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 flex flex-col">
            <div>
              <h2 className="text-[18px] font-semibold mb-1">
                Agenda 25 Maret 2026
              </h2>
              <p className="text-[#6B7280] text-[14px]">0 kegiatan</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl border-2 border-[#9CA3AF] flex items-center justify-center mb-4">
                <div className="w-7 h-7 rounded-md border-2 border-[#9CA3AF]" />
              </div>

              <p className="text-[#6B7280] text-[15px] max-w-[220px] leading-relaxed">
                Tidak ada agenda untuk tanggal ini
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}