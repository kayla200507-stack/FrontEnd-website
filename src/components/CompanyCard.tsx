import { ChevronRight } from "lucide-react";
import imgCompany from "../assets/images/company-1.png";

interface CompanyCardProps {
  onViewDesc?: () => void;
}

export function CompanyCard({ onViewDesc }: CompanyCardProps) {
  return (
    <div className="flex items-start gap-5">
      <img src={imgCompany} alt="PT Teknologi Maju" className="size-[90px] rounded-lg object-cover shrink-0" />
      <div>
        <h2 className="text-[#0f172a] text-[24px] font-bold leading-tight">Frontend Developer</h2>
        <p className="text-[#475569] text-[18px] mt-0.5">PT. Teknologi Maju</p>
        {onViewDesc && (
          <button
            onClick={onViewDesc}
            className="flex items-center gap-1.5 text-[#1d70c1] text-base mt-2 hover:underline"
          >
            Lihat deskripsi pekerjaan
            <ChevronRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
