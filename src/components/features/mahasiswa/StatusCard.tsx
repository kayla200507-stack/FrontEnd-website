import { Building2, Calendar, CheckCircle, File } from "lucide-react";
import { Button } from "../../common/Button";
import { ProgressLamaran } from "./ProgressLamaran";
import { Badge } from "../../ui/badge";
import { Card } from "../../common/Card";

export const StatusCard = () => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="flex  gap-4">
          <div className="aspect-square size-12 bg-blue-300 rounded-md flex items-center justify-center">
            <Building2 className="text-blue-60" />
          </div>
          <div className="text-black">
            <p className="font-medium">Frontend Developer Intern</p>
            <p>PT Teknologi Maju</p>
            <div className="text-sm flex gap-2 mt-2">
              <Calendar size={18} />
              <p>Dilamar: 20 Maret 2025</p>
            </div>
          </div>
        </div>
        <Badge className="bg-green-200 text-green-800">
          <CheckCircle size={18} />
          <p>Diterima</p>
        </Badge>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Progress Lamaran :</p>
        <div className="relative mt-2">
          <div className="w-[2px] h-full bg-[#E5E7EB]  z-1 absolute top-2 left-2"></div>
          <div className="space-y-10 relative z-2">
            <ProgressLamaran status="Pengajuan Berkas" />
            <ProgressLamaran status="Verifikasi Admin" />
            <ProgressLamaran status="Seleksi Perusahaan" />
            <ProgressLamaran status="Diterima" />
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-200 mt-10" />
      <div className="flex gap-4 mt-6">
        <Button variant="outline">
          <File /> Lihat Berkas
        </Button>
        <Button>Mulai Magang</Button>
      </div>
    </Card>
  );
};
