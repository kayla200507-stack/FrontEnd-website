interface NavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

export function NavButtons({ onBack, onNext, nextLabel = "Lanjut" }: NavButtonsProps) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-5 h-10 rounded-[13px] border border-[#64748b] bg-[#f3f4f6] text-[#3a60a0] font-semibold text-base hover:bg-slate-200 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19L5 12L12 5" /><path d="M19 12H5" />
        </svg>
        Kembali
      </button>
      <button
        onClick={onNext}
        className="px-8 h-[41px] rounded-[13.6px] bg-[#3a60a0] text-white font-bold text-[14px] hover:bg-[#2d4d82] transition-colors shadow-md"
      >
        {nextLabel}
      </button>
    </div>
  );
}
