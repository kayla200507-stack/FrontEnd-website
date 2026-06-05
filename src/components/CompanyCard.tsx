import { ChevronRight } from "lucide-react";
import imgCompany from "../assets/images/company-1.png";
import { usePendaftaranStore } from "../stores/pendaftaranStore";

interface CompanyCardProps {
  onViewDesc?: () => void;
}

export function CompanyCard({ onViewDesc }: CompanyCardProps) {
  const selectedLowongan = usePendaftaranStore((state) => state.selectedLowongan);

  return (
    <div className="flex items-start gap-5">
      <img
        src={selectedLowongan?.logo_perusahaan || imgCompany}
        alt={selectedLowongan?.nama_perusahaan || "Perusahaan"}
        className="size-[90px] rounded-lg object-cover shrink-0"
      />
      <div>
        <h2 className="text-[#0f172a] text-[24px] font-bold leading-tight">
          {selectedLowongan?.judul || "Lowongan Magang"}
        </h2>
        <p className="text-[#475569] text-[18px] mt-0.5">
          {selectedLowongan?.nama_perusahaan || "Perusahaan"}
        </p>
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
