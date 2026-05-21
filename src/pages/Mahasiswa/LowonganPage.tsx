import { Search } from "lucide-react";
import { Card } from "@/components/common/Card";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { Input } from "@/components/common/Input";
import { Select, SelectTrigger, SelectValue } from "../../components/ui/select";
import { LowonganCard } from "../../components/LowonganCard";
import { Button } from "../../components/ui/button";

const LowonganPage = () => {
  return (
    <>
      <DashboardHeader
        title="Pencarian Lowongan Magang"
        description="Temukan lowongan magang yang sesuai dengan minat Anda"
      />
      <Card className="">
        <div className="flex gap-7.5">
          <Input placeholder="Cari Posisi atau Perusahaan..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Semua Lokasi"></SelectValue>
            </SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Semua Tipe"></SelectValue>
            </SelectTrigger>
          </Select>
        </div>
        <div className="flex justify-between mt-6 items-center">
          <p className="text-gray-500 text-sm">Menampilkan 6 dari 6 lowongan</p>
          <Button variant="outline" className={"text-black"} size="sm">
            Reset Filter
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-7.5">
        {Array.from({ length: 15 }).map((_, i) => (
          <LowonganCard key={i} />
        ))}
      </div>
    </>
  );
};
export default LowonganPage;
