import { Users, User, Building2, BriefcaseBusiness} from "lucide-react";
import { usePublicStats } from "../hooks/useStats";
import logoVokasi from "../assets/images/vokasi.png";

const statIcons = [
  <BriefcaseBusiness size={30} className="text-white" />,
  <Building2 size={30} className="text-white" />,
  <Users size={30} className="text-white" />,
];

interface AuthLeftPanelProps {
  description: string;
}

export function AuthLeftPanel({ description }: AuthLeftPanelProps) {
  const { data: statsResponse } = usePublicStats();
  const statsData = statsResponse?.data;
  
  const authStats = [
    { value: `${statsData?.lowongan_aktif || 0}+`, label: "Lowongan Aktif" },
    { value: `${statsData?.perusahaan_mitra || 0}+`, label: "Perusahaan Mitra" },
    { value: `${statsData?.mahasiswa_terdaftar || 0}+`, label: "Mahasiswa Terdaftar" },
  ];

  return (
    <div
      className="w-[690px] shrink-0 h-screen sticky top-0 flex flex-col justify-between p-[60px] relative overflow-hidden"
      style={{ background: "radial-gradient(circle at top left, #1e69ff 0%, #0f57e8 25%, #0045d1 50%, #0037ab 75%, #002984 100%)" }}
    >
      <div className="absolute bg-[rgba(30,105,255,0.4)] blur-[40px] left-[-100px] rounded-[200px] size-[400px] top-[-100px] pointer-events-none" />
      <div className="absolute bg-[rgba(59,130,246,0.3)] blur-[40px] bottom-[20%] right-[-50px] rounded-[150px] h-[300px] w-[300px] pointer-events-none" />

      <div className="flex flex-col gap-[64px] relative z-10">
                <div className="flex items-center gap-1">
          <img src={logoVokasi} alt="Logo Vokasi" className="w-10 h-13 object-contain" />
          <span className="font-['Poppins',sans-serif] font-bold text-[24px] text-white tracking-[-0.5px] leading-[28px]">Vokasi Magang</span>
        </div>
        <div className="flex flex-col gap-[26px] max-w-[512px]">
          <h1 className="font-['Poppins',sans-serif] font-bold text-[52px] text-white leading-[68px]">Selangkah Lebih Dekat Dengan Suksesmu</h1>
          <p className="font-['Poppins',sans-serif] text-[20px] text-[#dbeafe] leading-[29px] opacity-90 max-w-[534px]">{description}</p>
        </div>
      </div>

      <div className="absolute left-[75px] top-[580px] w-[px] h-[250px] z-10 flex items-center justify-center">
        <div className="bg-white rounded-[16px] w-[500px] h-[220px] relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="absolute left-[27px] top-[29px] w-[444px] h-[37px]">
            <div className="bg-[#0f5bff] h-full w-[38px] rounded-full flex items-center justify-center">
              <User size={22} className="text-white" />
            </div>
            <div className="absolute left-[46px] top-[11px] bg-[#f1f5f9] h-[15px] w-[120px] rounded-[4px]" />
          </div>
          <div className="absolute left-[25px] top-[88px] w-[448px] space-y-[13px]">
            <div className="bg-[#f1f5f9] h-[11px] rounded-[4px] w-full" />
            <div className="flex gap-4">
              <div className="bg-[#f1f5f9] h-[11px] rounded-[4px] w-[134px]" />
              <div className="bg-[#f1f5f9] h-[12px] rounded-[4px] w-[301px]" />
            </div>
            <div className="bg-[#f1f5f9] h-[11.5px] rounded-[4px] w-[329px]" />
            <div className="bg-[#f1f5f9] h-[11.6px] rounded-[4px] w-full" />
          </div>
        </div>
      </div>

      <div className="absolute right-[100px] top-[800px] bg-[#0f5bff] p-[16px] rounded-[12px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] z-20">
        <Building2 size={26} className="text-white" />
      </div>

<div className="relative z-10 border-t border-white/10 pt-6 sm:pt-[33px] grid grid-cols-3 gap-4 sm:gap-6">
  {authStats.map((s, i) => (
    <div key={s.value} className="flex items-center gap-3 sm:gap-4 min-h-[56px] sm:min-h-[64px]">
      
      <div className="backdrop-blur-[5px] bg-white/10 border border-white/20 p-2.5 sm:p-[13px] rounded-[10px] sm:rounded-[12px] shrink-0">{statIcons[i]}</div>
      
      <div className="flex flex-col">
        <span className="font-['Poppins',sans-serif] font-bold text-lg sm:text-xl md:text-2xl text-white leading-tight">{s.value}</span>
        <span className="font-['Poppins',sans-serif] text-[10px] sm:text-[12px] text-[#bfdbfe] tracking-[0.5px] sm:tracking-[0.6px] uppercase leading-tight sm:leading-[16px] whitespace-pre-line">{s.label}</span>
      </div>
      </div>
    ))}
</div>
    </div>
  );
}
