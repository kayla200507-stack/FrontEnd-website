import { Check } from "lucide-react";

export function StepProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Unggah dokumen" },
    { num: 2, label: "Pertanyaan Perusahaan" },
  ];
  return (
    <div className="flex items-start justify-center gap-6 mb-6">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-start">
          {idx > 0 && (
            <div className={`h-[1.9px] w-[135px] mt-[12px] ${currentStep > idx ? "bg-[#1d70c1]" : "bg-slate-200"}`} />
          )}
          <div className="flex flex-col items-center">
            <div
              className={`size-[26px] rounded-full flex items-center justify-center border-2 ${
                currentStep > step.num
                  ? "bg-[#1d70c1] border-[#1d70c1]"
                  : currentStep === step.num
                  ? "bg-white border-[#1d70c1] shadow-[inset_0_0_0_6px_#1d70c1]"
                  : "bg-white border-slate-300"
              }`}
            >
              {currentStep > step.num && (
                <Check size={13} className="text-white" strokeWidth={3} />
              )}
              {currentStep === step.num && (
                <span className="size-[8px] rounded-full bg-[#1d70c1] block" />
              )}
            </div>
            <span className={`text-[9.8px] mt-1 whitespace-nowrap ${currentStep === step.num ? "text-[#0f172a] font-bold" : "text-[#64748b]"}`}>
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
