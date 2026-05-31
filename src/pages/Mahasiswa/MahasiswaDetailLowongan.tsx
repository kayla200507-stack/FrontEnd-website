import imgImage3 from "../../assets/images/company-1.png";
import imgImage5 from "../../assets/images/company-2.png";
import imgImage8 from "../../assets/images/company-3.png";

const svgPaths = {
  p45c1540: "M10.5 5.667c0 1.013-.821 1.833-1.833 1.833a1.834 1.834 0 0 1-1.834-1.833c0-1.013.821-1.834 1.834-1.834 1.012 0 1.833.821 1.833 1.834Zm-5.5 0c0 1.013-.821 1.833-1.833 1.833A1.834 1.834 0 0 1 1.333 5.667c0-1.013.821-1.834 1.834-1.834C4.179 3.833 5 4.654 5 5.667Zm9.167 0c0 1.013-.821 1.833-1.834 1.833a1.834 1.834 0 0 1-1.833-1.833c0-1.013.821-1.834 1.833-1.834 1.013 0 1.834.821 1.834 1.834ZM8.667 9.333c1.287 0 2.333.596 2.333 1.334V12H6V10.667c0-.738 1.046-1.334 2.333-1.334h.334Zm-5.5 0c1.287 0 2.333.596 2.333 1.334V12H.333v-1.333c0-.738 1.046-1.334 2.334-1.334Zm8.166 0c1.288 0 2.334.596 2.334 1.334V12h-5.167v-1.333c0-.738 1.046-1.334 2.333-1.334Z",
  p18d8d580: "M6.7 12.8c0 .184-.597.37-1.491.37-.895 0-1.492-.186-1.492-.37 0-.185.597-.37 1.492-.37.894 0 1.491.185 1.491.37Z",
  p31d7f480: "M9.683 5.217c0 1.842-1.492 4.8-4.475 4.8-2.982 0-4.475-2.958-4.475-4.8a4.475 4.475 0 0 1 8.95 0Z M6.7 5.217a1.492 1.492 0 1 1-2.983 0 1.492 1.492 0 0 1 2.983 0Z",
  p2f85c800: "M11.308 3.231H9.692V2.154a1.615 1.615 0 0 0-1.615-1.616H5.846a1.615 1.615 0 0 0-1.615 1.616v1.077H2.615A2.078 2.078 0 0 0 .538 5.308v5.923a2.078 2.078 0 0 0 2.077 2.077h8.693a2.078 2.078 0 0 0 2.077-2.077V5.308a2.078 2.078 0 0 0-2.077-2.077ZM5.308 2.154a.538.538 0 0 1 .538-.538h2.23a.538.538 0 0 1 .539.538v1.077H5.308V2.154Zm7.23 9.077a1 1 0 0 1-1 1H2.616a1 1 0 0 1-1-1V5.308a1 1 0 0 1 1-1h8.692a1 1 0 0 1 1 1v5.923Z",
  p15d8a000: "M9.167 0L0 3.75l9.167 3.75 7.5-3.066v5.316h1.666V4.484L9.167 0zm0 8.867l-6.25-2.55v3.7c0 1.383 2.8 2.5 6.25 2.5s6.25-1.117 6.25-2.5v-3.7l-6.25 2.55z",
  p114afb00: "M13.333 1.667h-2.5A1.667 1.667 0 0 0 9.167 0h-3.334a1.667 1.667 0 0 0-1.666 1.667h-2.5A1.667 1.667 0 0 0 0 3.333v11.667A1.667 1.667 0 0 0 1.667 16.667h11.666A1.667 1.667 0 0 0 15 15V3.333a1.667 1.667 0 0 0-1.667-1.666ZM5 1.667a.833.833 0 0 1 .833-.834h3.334a.833.833 0 0 1 .833.834v.833H5v-.833Zm8.333 13.333H1.667V3.333h1.666v1.667h8.334V3.333h1.666V15Z",
  p363cf400: "M6.667 0a6.667 6.667 0 1 0 0 13.333A6.667 6.667 0 0 0 6.667 0Zm3.138 5.138L6.472 8.471a.667.667 0 0 1-.943 0L3.862 6.805a.667.667 0 1 1 .943-.943L6 7.057l2.862-2.862a.667.667 0 1 1 .943.943Z",
  p6200b00: "M15.417 2.917L12.5.417A1.417 1.417 0 0 0 11.5 0h-10A1.417 1.417 0 0 0 .083 1.417v10.416a1.417 1.417 0 0 0 1.417 1.417h14.583a1.417 1.417 0 0 0 1.417-1.417V3.917a1.417 1.417 0 0 0-.417-1L15.417 2.917ZM11.5 1.417l1.417 1.416H11.5V1.417Zm3.333 10.416H1.5V1.417h8.833v2.5a.708.708 0 0 0 .708.708h3.792v7.208Z",
  pc679c40: "M14 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-1 17H3V3h10v14ZM5 5h6v2H5V5Zm0 4h6v2H5V9Zm0 4h4v2H5v-2Z",
  pb257040: "M20 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 16H2V2h18v14ZM4 4h14v2H4V4Zm0 4h14v2H4V8Zm0 4h10v2H4v-2Z",
  p207ea900: "M18 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 18H2V2h16v16ZM7 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm5-6h6v2h-6V6Zm0 4h6v2h-6v-2Z",
  p12918080: "M16 0H2C.9 0 .01.9.01 2L0 14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 4l-7 4.5L2 4V2l7 4.5L16 2v2Z",
  p2a676800: "M11.25 10.313c-.469 0-.891.156-1.266.422L4.828 7.547a2.109 2.109 0 0 0 0-.844l5.156-3.188c.375.266.797.422 1.266.422a2.063 2.063 0 1 0-2.063-2.062c0 .14.016.282.047.422L3.891 5.5A2.063 2.063 0 1 0 2.25 9.375c.469 0 .891-.156 1.266-.422l5.156 3.188a2.109 2.109 0 0 0-.047.422 2.063 2.063 0 1 0 2.625-1.969v-.281Z",
};

interface Props {
  onBack: () => void;
  onApply: () => void;
}

function UsersIcon() {
  return (
    <svg className="h-[10.286px] w-[14.144px] shrink-0" fill="none" viewBox="0 0 14.6667 10.6667">
      <path d={svgPaths.p45c1540} fill="#94A3B8" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="absolute left-[1.33px] top-[3.33px] size-[13.333px] shrink-0" fill="none" viewBox="0 0 13.3333 13.3333">
      <path d={svgPaths.p363cf400} fill="#2F6BFF" />
    </svg>
  );
}

export function DetailLowonganPage({ onBack, onApply }: Props) {
  return (
    <div className="relative bg-[#f3f4f6] min-h-full">
      {/* ── Two-column layout ── */}
      <div className="flex h-full">

        {/* ── Column A: Job Cards List ── */}
        <div className="w-[412px] shrink-0 relative py-6 pl-[35px] pr-2 flex flex-col gap-0">

          {/* Job Card 1 – Active (Frontend Developer) */}
          <div className="bg-white border-[#3a60a0] border-2 rounded-[23px] p-7 mb-[18px] relative shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.02),0px_10px_15px_-3px_rgba(0,0,0,0.03)]">
            {/* Logo + deadline */}
            <div className="flex items-start justify-between mb-5">
              <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-[15px] size-[54px] flex items-center justify-center shrink-0">
                <img alt="PT Teknologi Maju" className="size-[40px] object-cover rounded-[7px]" src={imgImage3} />
              </div>
              <div className="bg-[rgba(254,226,226,0.5)] h-[24px] px-3 rounded-full flex items-center">
                <span className="font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#dc2626] tracking-[-0.27px] whitespace-nowrap">5 HARI LAGI</span>
              </div>
            </div>

            <p className="font-['Poppins:SemiBold',sans-serif] text-[17.4px] text-[#1a1c21] leading-[27px] mb-1">Frontend Developer</p>
            <p className="font-['Poppins:Medium',sans-serif] text-[13.5px] text-[#64748b] leading-[19px] mb-4">Jakarta</p>

            <div className="flex gap-2 mb-4">
              <span className="bg-[#e8fdf5] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#006c49] tracking-[0.53px] uppercase whitespace-nowrap">MAGANG</span>
              <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">5 BULAN</span>
              <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">ONSITE</span>
            </div>

            <div className="flex items-center gap-2">
              <UsersIcon />
              <span className="font-['Poppins:Medium',sans-serif] text-[11.6px] text-[#94a3b8] leading-[15px]">1 Posisi • 98 Pelamar</span>
            </div>
          </div>

          {/* Job Card 2 – UI/UX Designer */}
          <div className="bg-white border border-[#e2e8f0] rounded-[23px] p-7 mb-[18px] relative drop-shadow-[0px_0.964px_0.964px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between mb-5">
              <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-[15px] size-[54px] flex items-center justify-center shrink-0">
                <img alt="UI/UX Designer" className="size-[40px] object-cover rounded-[8px]" src={imgImage5} />
              </div>
              <div className="bg-[#f1f5f9] h-[24px] px-3 rounded-full flex items-center">
                <span className="font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[-0.27px] whitespace-nowrap">12 HARI LAGI</span>
              </div>
            </div>

            <p className="font-['Poppins:SemiBold',sans-serif] text-[17.4px] text-[#1a1c21] leading-[27px] mb-1">UI/UX Designer</p>
            <p className="font-['Poppins:Medium',sans-serif] text-[13.5px] text-[#64748b] leading-[19px] mb-4">Bandung</p>

            <div className="flex gap-2 mb-4">
              <span className="bg-[#e8fdf5] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#006c49] tracking-[0.53px] uppercase whitespace-nowrap">MAGANG</span>
              <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">6 BULAN</span>
              <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-['Poppins:Bold',sans-serif] text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">HYBRID</span>
            </div>

            <div className="flex items-center gap-2">
              <UsersIcon />
              <span className="font-['Poppins:Medium',sans-serif] text-[11.6px] text-[#94a3b8] leading-[15px]">2 Posisi • 245 Pelamar</span>
            </div>
          </div>

          {/* Job Card 3 – Backend Developer */}
          <div className="bg-white border border-[#e2e8f0] rounded-[23px] p-7 relative drop-shadow-[0px_0.964px_0.964px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between mb-5">
              <div className="bg-[#f8f9fc] border border-[rgba(226,232,240,0.3)] rounded-[15px] size-[54px] flex items-center justify-center shrink-0">
                <img alt="Backend Developer" className="size-[40px] object-cover rounded-[8px]" src={imgImage8} />
              </div>
              <div className="bg-[#fee2e2] h-[24px] px-3 rounded-full flex items-center">
                <span className="font-bold text-[10.6px] text-[#dc2626] tracking-[-0.27px] uppercase whitespace-nowrap">TUTUP BESOK</span>
              </div>
            </div>

            <p className="font-['Poppins:SemiBold',sans-serif] text-[17.4px] text-[#1a1c21] leading-[27px] mb-1">Backend Developer</p>
            <p className="font-medium text-[13.5px] text-[#64748b] leading-[19px] mb-4">Malang</p>

            <div className="flex gap-2 mb-4">
              <span className="bg-[#e8fdf5] h-6 px-3 rounded-full flex items-center font-bold text-[10.6px] text-[#006c49] tracking-[0.53px] uppercase whitespace-nowrap">MAGANG</span>
              <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-bold text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">3 BULAN</span>
              <span className="bg-[#f1f5f9] h-6 px-3 rounded-full flex items-center font-bold text-[10.6px] text-[#64748b] tracking-[0.53px] uppercase whitespace-nowrap">REMOTE</span>
            </div>

            <div className="flex items-center gap-2">
              <UsersIcon />
              <span className="font-medium text-[11.6px] text-[#94a3b8] leading-[15px]">1 Posisi • 512 Pelamar</span>
            </div>
          </div>

          {/* Kembali button */}
          <button
            onClick={onBack}
            className="mt-6 flex items-center gap-2 h-10 w-[138px] rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] hover:bg-slate-200 transition-colors px-4"
          >
            <svg className="size-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#3A60A0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19L5 12L12 5" />
              <path d="M19 12H5" />
            </svg>
            <span className="font-['Poppins:SemiBold',sans-serif] text-[16px] leading-[19px]">Kembali</span>
          </button>
        </div>

        {/* ── Column B: Job Detail Panel ── */}
        <div className="flex-1 py-6 pr-[36px] pl-2">
          <div className="bg-white border border-[rgba(226,232,240,0.4)] rounded-[24px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.02),0px_10px_15px_-3px_rgba(0,0,0,0.03),0px_20px_25px_-5px_rgba(0,0,0,0.01)] overflow-hidden h-full flex flex-col">

            {/* Panel header (fixed, not scrolling) */}
            <div className="relative flex items-start px-[37px] pt-[29px] pb-6 shrink-0">
              {/* Company logo */}
              <img alt="PT Teknologi Maju" className="size-[90px] object-cover rounded-lg shrink-0" src={imgImage3} />

              {/* Title block */}
              <div className="ml-[12px] flex-1 pt-2">
                <h1 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1a1c21] leading-[28px]">Frontend Developer</h1>
                <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-black leading-[20px] mt-1">PT Teknologi Maju</p>

                {/* Location + work type */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-[13.4px] h-[13.6px] shrink-0" fill="none" viewBox="0 0 13.3928 13.6087">
                      <path d={svgPaths.p18d8d580} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.74" />
                      <path d={svgPaths.p31d7f480} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.74" />
                    </svg>
                    <span className="font-['Poppins:Regular',sans-serif] text-[9px] text-[#6a7282]">Jakarta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="size-[13px] shrink-0" fill="none" viewBox="0 0 12.9231 12.9231">
                      <g clipPath="url(#clip-work)">
                        <path d={svgPaths.p2f85c800} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08" />
                      </g>
                      <defs><clipPath id="clip-work"><rect width="12.9231" height="12.9231" fill="white" /></clipPath></defs>
                    </svg>
                    <span className="font-['Poppins:Regular',sans-serif] text-[8.9px] text-[#6a7282]">Onsite</span>
                  </div>
                </div>

                {/* Position count */}
                <div className="flex items-center gap-2 mt-1.5">
                  <svg className="w-[14.7px] h-[10.7px] shrink-0" fill="none" viewBox="0 0 14.6667 10.6667">
                    <path d={svgPaths.p45c1540} fill="#94A3B8" />
                  </svg>
                  <span className="font-['Poppins:Medium',sans-serif] text-[12px] text-[#94a3b8] leading-[16px]">1 Posisi • 98 Pelamar</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-[10.6px] ml-8 shrink-0 w-[170px] pt-2">
                <button
                  onClick={onApply}
                  className="bg-[#2f6bff] text-white rounded-[21px] py-[14px] flex items-center justify-center w-full"
                  style={{ boxShadow: "0px 17.6px 22px -4.4px rgba(47,107,255,0.25), 0px 7px 8.8px -5.3px rgba(47,107,255,0.25)" }}
                >
                  <span className="font-['Poppins:Bold',sans-serif] text-[12.3px] leading-[18px]">Daftar Sekarang</span>
                </button>
                <button className="bg-white border border-[#e2e8f0] rounded-[21px] py-[15px] flex items-center justify-center gap-[7px] w-full">
                  <svg className="w-[12px] h-[13.2px]" fill="none" viewBox="0 0 13.5 15">
                    <path d={svgPaths.p2a676800} fill="#1A1C21" />
                  </svg>
                  <span className="font-['Poppins:Bold',sans-serif] text-[12.3px] text-[#1a1c21] leading-[18px]">Bagikan</span>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-[37px] pb-6">

              {/* Tab: DESKRIPSI LOWONGAN */}
              <div className="border-b border-[rgba(226,232,240,0.3)] pb-px mb-6">
                <div className="inline-block pb-3 border-b-2 border-[#3a60a0]">
                  <span className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#3a60a0] leading-[20px]">DESKRIPSI LOWONGAN</span>
                </div>
              </div>

              {/* Two-column layout: main content + right sidebar */}
              <div className="flex gap-6">

                {/* Main content */}
                <div className="flex-1 min-w-0">

                  {/* JENJANG PENDIDIKAN */}
                  <section className="mb-6">
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-[18.3px] h-[15px] shrink-0" fill="none" viewBox="0 0 18.3333 15">
                        <path d={svgPaths.p15d8a000} fill="#2F6BFF" />
                      </svg>
                      <span className="font-bold text-[14px] text-[#1a1c21] tracking-[0.7px] uppercase leading-[20px]">JENJANG PENDIDIKAN</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="bg-[#eff6ff] px-5 py-2 rounded-[16px] font-['Poppins:SemiBold',sans-serif] text-[14px] text-[#2f6bff] leading-[20px]">S1</span>
                      <span className="bg-[#f1f5f9] px-5 py-2 rounded-[16px] font-['Poppins:Medium',sans-serif] text-[14px] text-[#64748b] leading-[20px]">Teknologi Informasi</span>
                      <span className="bg-[#f1f5f9] px-5 py-2 rounded-[16px] font-['Poppins:Medium',sans-serif] text-[14px] text-[#64748b] leading-[20px]">Teknik Informatika</span>
                      <span className="bg-[#f1f5f9] px-5 py-2 rounded-[16px] font-['Poppins:Medium',sans-serif] text-[14px] text-[#64748b] leading-[20px]">Sistem Informasi</span>
                    </div>
                  </section>

                  {/* KUALIFIKASI & DESKRIPSI */}
                  <section className="mb-6">
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-[15px] h-[16.7px] shrink-0" fill="none" viewBox="0 0 15 16.6667">
                        <path d={svgPaths.p114afb00} fill="#2F6BFF" />
                      </svg>
                      <span className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] tracking-[0.7px] uppercase leading-[20px]">KUALIFIKASI &amp; DESKRIPSI</span>
                    </div>

                    {/* Kualifikasi Umum box */}
                    <div className="bg-[#f8fafc] border border-[rgba(226,232,240,0.4)] rounded-[24px] p-[25px]">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#2f6bff] size-[6px] rounded-full shrink-0" />
                        <span className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#1a1c21] leading-[24px]">Kualifikasi Umum</span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {[
                          ["Mahasiswa", "aktif semester", "5 atau 7"],
                          ["IPK Minimal", "3.00 dari", "skala 4.00"],
                          ["Kemampuan", "analisis kuat &", "teliti"],
                          ["Mampu", "bekerja tim &", "individu"],
                        ].map((lines, i) => (
                          <div key={i} className="relative min-h-[68px]">
                            <CheckCircleIcon />
                            <div className="absolute left-6 top-0 flex flex-col justify-center h-full">
                              {lines.map((line, j) => (
                                <p key={j} className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#64748b] leading-[22.75px]">{line}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* PERSYARATAN DOKUMEN */}
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <svg className="w-[17.9px] h-[13.3px] shrink-0" fill="none" viewBox="0 0 17.9167 13.3333">
                        <path d={svgPaths.p6200b00} fill="#2F6BFF" />
                      </svg>
                      <span className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] tracking-[0.7px] uppercase leading-[20px]">PERSYARATAN DOKUMEN</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: svgPaths.pc679c40, viewBox: "0 0 16 20", cls: "w-4 h-5", label: ["Curriculum", "Vitae / CV"] },
                        { icon: svgPaths.pb257040, viewBox: "0 0 22 18", cls: "w-[22px] h-[18px]", label: ["Transkrip", "Nilai"] },
                        { icon: svgPaths.p207ea900, viewBox: "0 0 20 20", cls: "w-5 h-5", label: ["Identitas", "Diri"] },
                        { icon: svgPaths.p12918080, viewBox: "0 0 18 18", cls: "w-[18px] h-[18px]", label: ["Surat", "Pengantar"] },
                      ].map((doc, i) => (
                        <div key={i} className="border border-[#e2e8f0] h-[102px] w-[135px] rounded-[24px] flex items-center px-4 gap-3">
                          <div className="bg-[rgba(47,107,255,0.05)] h-10 w-10 rounded-[16px] flex items-center justify-center shrink-0">
                            <svg className={doc.cls} fill="none" viewBox={doc.viewBox}>
                              <path d={doc.icon} fill="#2F6BFF" />
                            </svg>
                          </div>
                          <div>
                            {doc.label.map((l, j) => (
                              <p key={j} className="font-['Poppins:SemiBold',sans-serif] text-[13px] text-[#1a1c21] leading-[20px]">{l}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right sidebar */}
                <div className="w-[280px] shrink-0 flex flex-col gap-5">

                  {/* Garis Waktu */}
                  <div className="bg-[#f8fafc] border border-[rgba(226,232,240,0.4)] rounded-[24px] p-[20px]">
                    <p className="font-['Poppins:Black',sans-serif] text-[11px] text-[#94a3b8] tracking-[1.1px] uppercase leading-[16.5px] mb-4">GARIS WAKTU</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#059669] size-2 rounded-full mt-[6px] shrink-0" />
                        <div>
                          <p className="font-['Poppins:Bold',sans-serif] text-[10px] text-[#94a3b8] uppercase leading-[15px]">DIBUKA</p>
                          <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] leading-[20px]">1 Maret 2026</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-[#dc2626] size-2 rounded-full mt-[6px] shrink-0" />
                        <div>
                          <p className="font-['Poppins:Bold',sans-serif] text-[10px] text-[#94a3b8] uppercase leading-[15px]">DEADLINE</p>
                          <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#dc2626] leading-[20px]">30 Maret 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tentang Perusahaan */}
                  <div className="bg-[#ffdbcd] border border-[rgba(124,45,0,0.05)] rounded-[24px] p-[20px]">
                    <p className="font-['Poppins:Black',sans-serif] text-[11px] text-[rgba(124,45,0,0.6)] tracking-[1.1px] uppercase leading-[16.5px] mb-2">TENTANG Perusahaan</p>
                    <p className="font-['Poppins:SemiBold',sans-serif] text-[14px] text-[#7c2d00] leading-[19.25px]">PT Teknologi Maju adalah perusahaan strategis negara di bidang teknologi.</p>
                  </div>

                  {/* Tanggung Jawab Utama */}
                  <div>
                    <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1a1c21] leading-[22.75px] mb-2">Tanggung Jawab Utama:</p>
                    <div className="bg-white border-l-4 border-[rgba(47,107,255,0.2)] pl-5 pr-4 pt-1.5 pb-4">
                      <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#64748b] leading-[22px]">
                        Membantu pengembangan dan implementasi antarmuka website/aplikasi, mengubah desain menjadi tampilan responsif, melakukan testing dan debugging, serta berkolaborasi dengan tim developer dan UI/UX designer dalam pengembangan fitur frontend.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
