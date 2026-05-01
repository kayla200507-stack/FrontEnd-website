import { Building2, Calendar, CheckCircle, File, MapPin } from "lucide-react";
import { Card } from "../../../components/Card";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { Badge } from "../../../components/ui/badge";
import { ProgressLamaran } from "../../../components/ProgressLamaran";
import { Button } from "../../../components/Button";
import { StatusCard } from "../../../components/StatusCard";

const StatusPage = () => {
  return (
    <>
      <DashboardHeader
        title="Status Lowongan"
        description="Lacak progress lamaran magang Anda"
      />
      <div className="grid grid-cols-4 gap-15">
        <Card className="rounded-sm flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500">Total Lamaran</p>
          <p className="text-4xl text-black font-semibold">3</p>
        </Card>
        <Card className="rounded-sm flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500">Diterima</p>
          <p className="text-4xl  font-semibold text-green-500">1</p>
        </Card>
        <Card className="rounded-sm flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500">Proses Review</p>
          <p className="text-4xl font-semibold text-blue-600">2</p>
        </Card>
        <Card className="rounded-sm flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500">Ditolak</p>
          <p className="text-4xl  font-semibold text-red-500">3</p>
        </Card>
      </div>
      {Array.from({ length: 15 }).map((_, i) => (
        <StatusCard key={i} />
      ))}
    </>
  );
};

export default StatusPage;
