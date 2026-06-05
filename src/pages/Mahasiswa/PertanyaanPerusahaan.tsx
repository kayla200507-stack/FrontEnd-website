import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { CompanyCard } from "../../components/CompanyCard";
import { StepProgress } from "../../components/StepProgress";
import { NavButtons } from "../../components/NavButtons";
import { usePendaftaranStore } from "../../stores/pendaftaranStore";
import { usePendaftaranMutation } from "../../hooks/usePendaftaran";
import { toast } from "sonner";

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 relative">
      <label className="block text-[#475569] font-semibold text-[16px] mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full h-[50px] bg-[#f3f3f5] border-[1.33px] border-[rgba(0,0,0,0.3)] rounded-[8px] px-4 flex items-center justify-between hover:bg-gray-100 transition-all"
      >
        <span className={`text-sm ${value ? "text-[#1e293b]" : "text-gray-400"}`}>{value || "Pilih jawaban..."}</span>
        <ChevronDown size={18} className={`text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-xl z-20 mt-1 overflow-hidden">
          {options.map(o => (
            <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-[#1e293b] border-b border-slate-50 last:border-0">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props { onBack: () => void; onViewDesc: () => void; }

export function PertanyaanPerusahaanPage({ onBack, onViewDesc }: Props) {
  const { id_lowongan, files, answers, setAnswers } = usePendaftaranStore();
  const { mutate: submit, isPending } = usePendaftaranMutation();

  const toggle = (id: string) => {
    const tools = answers.tools_digunakan.includes(id) 
      ? answers.tools_digunakan.filter(x => x !== id) 
      : [...answers.tools_digunakan, id];
    setAnswers({ tools_digunakan: tools });
  };

  const toolsList = [
    { id: "reactjs", label: "React JS" },
    { id: "bootstrap", label: "Bootstrap" },
    { id: "tailwind", label: "Tailwind CSS" },
  ];

  const handleSubmit = () => {
    if (!id_lowongan) {
      toast.error("Lowongan tidak terdeteksi. Silakan kembali ke daftar lowongan.");
      return;
    }

    const formData = new FormData();
    formData.append("id_lowongan", id_lowongan.toString());
    
    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    // Append answers
    formData.append("ekspektasi_gaji", answers.ekspektasi_gaji);
    formData.append("kualifikasi_pendidikan", answers.kualifikasi_pendidikan);
    formData.append("pengalaman_kerja", answers.pengalaman_kerja);
    
    // JSON tools
    formData.append("tools_digunakan", JSON.stringify(answers.tools_digunakan));

    submit(formData);
  };

  return (
    <div className="p-4 md:p-6 max-w-full">
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl">
          <StepProgress currentStep={2} />
        </div>
      </div>

      <div className="bg-white rounded-[20.75px] border border-[#e2e8f0] shadow-sm p-5 md:p-[41.5px]">
        <div className="mb-6">
          <CompanyCard onViewDesc={onViewDesc} />
        </div>
        <div className="border-t border-[#f1f5f9] mb-8" />

        <SelectField
          label="Berapa gaji bulanan yang kamu inginkan?"
          value={answers.ekspektasi_gaji}
          options={["Rp 1.000.000 – Rp 2.000.000", "Rp 2.000.000 – Rp 3.000.000", "Rp 3.000.000 – Rp 4.000.000", "Rp 4.000.000+"]}
          onChange={(v) => setAnswers({ ekspektasi_gaji: v })}
        />

        <SelectField
          label="Kualifikasi mana yang kamu miliki?"
          value={answers.kualifikasi_pendidikan}
          options={["D3 Teknik Informatika", "D3 Sistem Informasi", "S1 Teknik Informatika", "S1 Sistem Informasi"]}
          onChange={(v) => setAnswers({ kualifikasi_pendidikan: v })}
        />

        <div className="mb-8">
          <label className="block text-[#475569] font-semibold text-base mb-2">
            Jelaskan pengalaman kamu sebagai developer
          </label>
          <textarea
            value={answers.pengalaman_kerja}
            onChange={e => setAnswers({ pengalaman_kerja: e.target.value })}
            className="w-full h-[140px] bg-[#f3f3f5] border-[1.33px] border-[rgba(0,0,0,0.3)] rounded-[8px] px-4 py-3 text-sm text-[#1e293b] resize-none focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 transition placeholder-slate-400 font-medium"
            placeholder="Ceritakan proyek atau pekerjaan sebelumnya..."
          />
        </div>

        <div>
          <label className="block text-[#475569] font-semibold text-base mb-4">
            Tools apa saja yang biasa kamu gunakan?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {toolsList.map(t => (
              <Checkbox key={t.id} label={t.label} checked={answers.tools_digunakan.includes(t.id)} onChange={() => toggle(t.id)} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-full sm:w-auto px-10 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition-all order-2 sm:order-1"
        >
          Kembali
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center justify-center w-full sm:w-auto px-12 py-3 rounded-xl bg-[#3a60a0] text-white font-bold hover:bg-[#2d4f8a] transition-all gap-2 shadow-lg shadow-blue-100 disabled:opacity-70 order-1 sm:order-2"
        >
          {isPending && <Loader2 className="animate-spin w-4 h-4" />}
          Kirim Lamaran
        </button>
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={onChange}
        className={`size-[22px] rounded flex items-center justify-center border-[1.33px] transition-colors ${
          checked ? "bg-[#3a60a0] border-[#3a60a0]" : "bg-[#f3f3f5] border-[rgba(0,0,0,0.3)] group-hover:border-blue-300"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17L4 12" />
          </svg>
        )}
      </div>
      <span className="text-[#475569] font-semibold text-[16px]">{label}</span>
    </label>
  );
}
