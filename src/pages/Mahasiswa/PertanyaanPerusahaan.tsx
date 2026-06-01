import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CompanyCard } from "../../components/CompanyCard";
import { StepProgress } from "../../components/StepProgress";
import { NavButtons } from "../../components/NavButtons";

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 relative">
      <label className="block text-[#475569] font-semibold text-[16px] mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full h-[50px] bg-[#f3f3f5] border-[1.33px] border-[rgba(0,0,0,0.3)] rounded-[8px] px-4 flex items-center justify-between opacity-50 focus:opacity-100 hover:opacity-70 transition-opacity"
      >
        <span className={`text-sm ${value ? "text-[#0a0a0a]" : "text-transparent"}`}>{value || "placeholder"}</span>
        <ChevronDown size={18} className={`text-black transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-xl z-20 mt-1 overflow-hidden">
          {options.map(o => (
            <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-[#0a0a0a] border-b border-slate-50 last:border-0">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props { onBack: () => void; onNext: () => void; onViewDesc: () => void; }

export function PertanyaanPerusahaanPage({ onBack, onNext, onViewDesc }: Props) {
  const [gaji, setGaji] = useState("");
  const [kualifikasi, setKualifikasi] = useState("");
  const [pengalaman, setPengalaman] = useState("");
  const [tools, setTools] = useState<string[]>(["bootstrap"]);

  const toggle = (id: string) => setTools(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const toolsList = [
    { id: "reactjs", label: "React JS" },
    { id: "bootstrap", label: "Bootstrap" },
    { id: "tailwind", label: "Tailwind CSS" },
  ];

  return (
    <div className="p-6 max-w-full">
      <div className="flex justify-center mb-2">
        <StepProgress currentStep={2} />
      </div>

      <div className="bg-white rounded-[20.75px] border border-[#e2e8f0] shadow-sm p-[41.5px]">
        <CompanyCard onViewDesc={onViewDesc} />
        <div className="border-t border-[#f1f5f9] mt-5 mb-6" />

        <SelectField
          label="Berapa gaji bulanan yang kamu inginkan?"
          value={gaji}
          options={["Rp 1.000.000 – Rp 2.000.000", "Rp 2.000.000 – Rp 3.000.000", "Rp 3.000.000 – Rp 4.000.000", "Rp 4.000.000+"]}
          onChange={setGaji}
        />

        <SelectField
          label="Kualifikasi mana yang kamu miliki?"
          value={kualifikasi}
          options={["D3 Teknik Informatika", "D3 Sistem Informasi", "S1 Teknik Informatika", "S1 Sistem Informasi"]}
          onChange={setKualifikasi}
        />

        <div className="mb-6">
          <label className="block text-[#475569] font-semibold text-[16px] mb-2">
            Jelaskan pengalaman kamu sebagai frontend developer
          </label>
          <textarea
            value={pengalaman}
            onChange={e => setPengalaman(e.target.value)}
            className="w-full h-[116px] bg-[#f3f3f5] border-[1.33px] border-[rgba(0,0,0,0.3)] rounded-[8px] px-4 py-3 text-sm text-[#0a0a0a] resize-none opacity-50 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#3a60a0]/30 transition placeholder-slate-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-[#475569] font-semibold text-[16px] mb-3">
            Tools apa saja yang biasa kamu gunakan?
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex gap-10">
              {toolsList.slice(0, 2).map(t => (
                <Checkbox key={t.id} label={t.label} checked={tools.includes(t.id)} onChange={() => toggle(t.id)} />
              ))}
            </div>
            <div className="flex gap-10">
              {toolsList.slice(2).map(t => (
                <Checkbox key={t.id} label={t.label} checked={tools.includes(t.id)} onChange={() => toggle(t.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Kirim" />
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={onChange}
        className={`size-[22px] rounded flex items-center justify-center border-[1.33px] transition-colors opacity-50 ${
          checked ? "bg-[#3a60a0] border-[#3a60a0] opacity-100" : "bg-[#f3f3f5] border-[rgba(0,0,0,0.3)]"
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
