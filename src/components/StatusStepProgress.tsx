import { Check } from "lucide-react";

export function StatusStepProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Konfirmasi Kesediaan", sub: "Konfirmasi kesediaan magang" },
    { num: 2, label: "Pembekalan", sub: "Ikuti pembekalan dari perusahaan" },
    { num: 3, label: "Penandatanganan", sub: "Tandatangani dokumen kerja sama" },
    { num: 4, label: "Mulai Magang", sub: "Program magang dimulai" },
  ];
  return (
    <div className="flex items-start">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-start flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {idx > 0 && (
                <div className={`flex-1 h-0.5 mt-5 ${currentStep > idx ? "bg-[#1d70c1]" : "bg-slate-200"}`} />
              )}
              <div
                className={`size-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  currentStep > step.num
                    ? "bg-green-500 text-white"
                    : currentStep === step.num
                    ? "bg-[#3a60a0] text-white shadow-[0_10px_15px_-3px_#bfdbfe,0_4px_6px_-4px_#bfdbfe]"
                    : "bg-[#f1f5f9] text-[#94a3b8]"
                }`}
              >
                {currentStep > step.num ? <Check size={18} strokeWidth={3} /> : step.num}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mt-0 ${currentStep > step.num ? "bg-[#1d70c1]" : "bg-slate-200"}`} />
              )}
            </div>
            <div className="text-center mt-2 px-1">
              <p className={`text-xs font-medium leading-tight ${currentStep === step.num ? "text-[#3a60a0] font-bold" : currentStep > step.num ? "text-slate-600" : "text-[#94a3b8]"}`}>
                {step.label}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{step.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
