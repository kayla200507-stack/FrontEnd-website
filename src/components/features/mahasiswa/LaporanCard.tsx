import { CheckCircle, Download, Eye, FileText } from "lucide-react";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const LaporanCard = () => {
  return (
    <Card className="space-y-5">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="aspect-square size-12 bg-blue-300 rounded-md flex items-center justify-center">
            <FileText className="text-blue-60" />
          </div>
          <div>
            <p className="text-black font-medium">
              Laporan Akhir Magang - PT Teknologi Maju
            </p>
            <p className="text-sm text-[#717182]">Disubmit: 22 Maret 2026</p>
          </div>
        </div>
        <Badge className="bg-[#DCFCE7] text-[#016630]">
          <CheckCircle />
          Dinilai - 85
        </Badge>
      </div>
      <div className="w-full p-4 bg-[#F9FAFB]  rounded-md flex justify-between items-center">
        <p className="text-black font-medium flex gap-3">
          <FileText />
          laporan_akhir_fauzi_ahmad_zaki.pdf
        </p>
        <div className="flex gap-5 text-black">
          <Button variant={"outline"}>
            <Download />
            Unduh
          </Button>
          <Button variant={"outline"}>
            <Eye />
            Preview
          </Button>
        </div>
      </div>
      <div className="border-l-4 border-[#2B7FFF] bg-[#EFF6FF] p-4 rounded-xl space-y-2">
        <p className="flex gap-2 font-medium items-center">
          <CheckCircle />
          Feedback Dosen Pembimbing
        </p>
        <p className="text-sm">
          Laporan sudah baik. Analisis mendalam dan struktur rapi. Pertahankan!
        </p>
      </div>
      <div className=" bg-[#DCFCE7] text-[#016630] p-4 rounded-xl flex justify-between items-center">
        <div className="space-y-2">
          <p className="flex gap-2 font-medium items-center">Nilai Akhir</p>
          <p className="text-xs">Dievaluasi oleh pembimbing</p>
        </div>
        <p className="text-3xl font-semibold">85</p>
      </div>
    </Card>
  );
};
