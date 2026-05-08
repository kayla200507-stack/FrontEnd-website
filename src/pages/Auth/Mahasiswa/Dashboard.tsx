import {
  Bell,
  Building,
  Calendar,
  CheckCircle,
  Clock4,
  MapPin,
} from "lucide-react";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/ui/button";

const dashboardData = {
  lowongans: [
    {
      title: "Frontend Developer Intern",
      company: "PT Teknologi Maju",
      location: "Jakarta",
      deadline: "30 Maret 2026",
      img: "/lowongans/img1.png",
    },
    {
      title: "UI/UX Designer Intern",
      company: "PT Digital Kreatif",
      location: "Bandung",
      deadline: "30 Maret 2026",
      img: "lowongans/img2.png",
    },
    {
      title: "Backend Developer Intern",
      company: "PT Inovasi Sistem",
      location: "Malang",
      deadline: "15 April 2026",
      img: "/lowongans/img3.png",
    },
  ],
};

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader
        title="Selamat Datang Keisya Lanika"
        description="Kelola magang anda dengan mudah dan efisien"
      />
      <Card>
        <div>
          <h4 className="text-xl">Progress Magang</h4>
          <p className="text-sm">Status perkembangan magang anda</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs">Sedang Berjalan</p>
            <p className="font-semibold">50%</p>
          </div>
          <div className="w-full h-3 bg-gray-400 rounded-full overflow-hidden">
            <div className="w-1/2 bg-blue-200 h-full"></div>
          </div>
          <div className="flex items-center gap-2 text-xs mt-4">
            <Calendar size={14} /> 15 Hari tersisa dari total 30 hari
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <div className="flex gap-2 items-center">
            <CheckCircle className="text-[#00C950]" />
            <p className="text-lg text-black font-medium">Status Pendaftaran</p>
          </div>
          <p className="block w-fit rounded-2xl px-2.5 py-1 bg-[#DCFCE7] font-medium text-xs text-[#016630]">
            Validasi Admin Selesai
          </p>
          <div className="text-sm text-[#4A5565]">
            <p>Selamat!</p>
            <p>Berkas Anda Lolos Verifikasi</p>
            <div className="font-semibold mt-1 flex items-center">
              <Building />
              PT. Telekomunikasi Indonesia
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex gap-2 items-center">
            <Clock4 className="text-[#FF6900]" />
            <p className="text-lg text-black font-medium">Pengingat Logbook</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-black">Terakhir Disi</p>
            <p className="text-[#4A5565] text-xs">24 Maret 2026</p>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-6">
            Isi Logbook Hari Ini
          </Button>
        </Card>
        <Card>
          <div className="flex gap-2 items-center">
            <Bell className="text-[#2B7FFF]" />
            <p className="text-lg text-black font-medium">Notifikasi Terbaru</p>
          </div>
          <div className="space-y-1 p-2 bg-[#EFF6FF] rounded-md">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
          <div className="space-y-1 p-2 bg-[#F1F2F4] rounded-md">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
        </Card>
      </div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-xl">Lowongan Magang Terbaru</h4>
            <p>3 Lowongan terbaru yang mungkin menarik untuk anda</p>
          </div>
          <Button variant={"outline"}>Lihat Semua</Button>
        </div>
        {dashboardData.lowongans.map((lowongan) => (
          <div
            className="border border-gray-500 rounded-md p-2 px-4 flex justify-between items-center"
            key={lowongan.title}
          >
            <div className="flex gap-2 items-center text-black">
              <img src={lowongan.img} alt="" />
              <div className="">
                <p className="font-semibold text-sm">{lowongan.title}</p>
                <p className="text-xs text-[#4A5565]">{lowongan.company}</p>
                <div className="flex gap-2 text-[#6A7282]">
                  <p className="flex items-center text-xs gap-1">
                    <MapPin size={12} />
                    {lowongan.location}
                  </p>
                  <p className="flex items-center text-xs gap-1">
                    <Clock4 size={12} />
                    {lowongan.deadline}
                  </p>
                </div>
              </div>
            </div>
            <Button>Detail</Button>
          </div>
        ))}
      </Card>
    </>
  );
};

export default DashboardPage;
