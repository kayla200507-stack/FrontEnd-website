import { Card } from "../../../components/Card";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { LaporanCard } from "../../../components/LaporanCard";

const LaporanPage = () => {
  return (
    <>
      <DashboardHeader
        title="Laporan Magang"
        description="Upload dan kelola laporan magang anda"
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
          <p className="text-sm text-gray-500">Nilai Rata-rata</p>
          <p className="text-4xl  font-semibold text-ungu-500">85</p>
        </Card>
      </div>
      <LaporanCard />
      <LaporanCard />
      <LaporanCard />
    </>
  );
};

export default LaporanPage;
