import { useState } from "react";
import {
  Bell,
  Building,
  Calendar,
  CheckCircle,
  Clock4,
  MapPin,
  XCircle,
  AlertCircle
} from "lucide-react";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { Card } from "@/components/common/Card";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

// Hooks
import { useAuthStore } from "../../stores/authStore";
import { useMyMagang } from "../../hooks/useMagang";
import { useMyPendaftaran } from "../../hooks/usePendaftaran";
import { useLogbook } from "../../hooks/useLogbook";
import { useNotifikasi, useMarkNotifikasiAsRead } from "../../hooks/useNotifikasi";
import { useLowongan } from "../../hooks/useLowongan";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface DashboardPageProps {
  onNavigate?: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Data fetching
  const { data: magang, isLoading: magangLoading } = useMyMagang();
  const { data: pendaftaranResponse, isLoading: pendaftaranLoading } = useMyPendaftaran();
  
  const idMagang = magang?.id_magang || 0;
  const { data: logbookResponse, isLoading: logbookLoading } = useLogbook(idMagang);
  const { data: notifResponse, isLoading: notifLoading } = useNotifikasi({ limit: 3 });
  const { mutate: markAsRead } = useMarkNotifikasiAsRead();
  const { data: lowonganResponse, isLoading: lowonganLoading } = useLowongan({ limit: 3 });

  // State
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Derived Data
  const pendaftaranList = pendaftaranResponse?.data || [];
  const latestPendaftaran = pendaftaranList.length ? pendaftaranList[0] : null;
  const pendaftaranDiterima = pendaftaranList.find((p: any) => p.status_pendaftaran === 'Diterima');
  const activePendaftaran = pendaftaranDiterima || latestPendaftaran;

  const notificationsData = notifResponse as any;
  let notifikasiArray = [];
  if (Array.isArray(notificationsData?.data)) {
    notifikasiArray = notificationsData.data;
  } else if (Array.isArray(notificationsData?.data?.data)) {
    notifikasiArray = notificationsData.data.data;
  }
  const notifikasi = notifikasiArray.slice(0, 3);
  const lowongans = lowonganResponse?.data?.slice(0, 3) || [];
  const latestLogbook = logbookResponse?.data?.[0];
  
  const isLoading = magangLoading || pendaftaranLoading || notifLoading || lowonganLoading;

  // Progress Calculation
  let progressPercent = 0;
  let sisaHari = 0;
  let totalHari = 180; // Default 6 months in days
  let tanggalSelesai = "";

  if (magang?.tanggal_mulai) {
    const start = new Date(magang.tanggal_mulai);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 6);
    
    tanggalSelesai = end.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    totalHari = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    
    const today = new Date();
    const elapsed = Math.max(0, Math.min(totalHari, Math.round((today.getTime() - start.getTime()) / (1000 * 3600 * 24))));
    sisaHari = totalHari - elapsed;
    progressPercent = Math.round((elapsed / totalHari) * 100);
  }

  // Pengingat Logbook Logic
  let logbookStatusText = "Belum ada logbook";
  let logbookDateText = "-";
  if (latestLogbook) {
    const logbookDate = new Date(latestLogbook.tanggal);
    const today = new Date();
    logbookDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    
    logbookDateText = logbookDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    if (logbookDate.getTime() === today.getTime()) {
      logbookStatusText = "Sudah diisi hari ini";
    } else {
      logbookStatusText = "Terakhir Diisi";
    }
  }

  const renderStatusPendaftaran = () => {
    if (!activePendaftaran) {
      return (
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <AlertCircle className="text-gray-400" />
            <p className="text-lg text-slate-800 font-medium">Status Pendaftaran</p>
          </div>
          <p className="block w-fit rounded-2xl px-2.5 py-1 bg-gray-100 font-medium text-xs text-gray-500">
            Belum Ada Pendaftaran
          </p>
          <div className="text-sm text-[#4A5565] space-y-1">
            <p>Anda belum mendaftar lowongan magang apapun.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => {
              if (onNavigate) onNavigate("lowongan");
              else navigate("/mahasiswa/lowongan");
            }}
          >
            Cari Lowongan
          </Button>
        </div>
      );
    }

    const isAccepted = activePendaftaran.status_pendaftaran === 'Diterima';
    const isRejected = activePendaftaran.status_pendaftaran === 'Ditolak';

    return (
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          {isAccepted ? (
            <CheckCircle className="text-[#00C950]" />
          ) : isRejected ? (
            <XCircle className="text-red-500" />
          ) : (
            <Clock4 className="text-yellow-500" />
          )}
          <p className="text-lg text-slate-800 font-medium">Status Pendaftaran</p>
        </div>
        
        <p className={`block w-fit rounded-2xl px-2.5 py-1 font-medium text-xs ${
          isAccepted ? "bg-[#DCFCE7] text-[#016630]" :
          isRejected ? "bg-red-100 text-red-700" :
          "bg-yellow-100 text-yellow-700"
        }`}>
          {isAccepted ? "Validasi Admin Selesai" : 
           isRejected ? "Pendaftaran Ditolak" : "Menunggu Validasi"}
        </p>

        <div className="text-sm text-[#4A5565] space-y-1">
          {isAccepted && <p>Selamat! Berkas Anda Lolos Verifikasi</p>}
          {isRejected && <p>Mohon maaf, pendaftaran Anda tidak lolos.</p>}
          {!isAccepted && !isRejected && <p>Berkas Anda sedang dalam proses pengecekan.</p>}
          
          <div className="font-semibold mt-1 flex items-center gap-2">
            <Building size={16} />
            {activePendaftaran.lowongan?.perusahaan || "Perusahaan"}
          </div>
        </div>

        {isAccepted && (
          <Button 
            size="sm" 
            className="w-full mt-4"
            onClick={() => setIsDetailOpen(true)}
          >
            Lihat Detail
          </Button>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <DashboardHeader
          title={`Selamat Datang, ${user?.nama || "Mahasiswa"}!`}
          description="Kelola magang anda dengan mudah dan efisien"
        />
        <Card className="p-6 h-32 bg-gray-200" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 h-48 bg-gray-200" />
          <Card className="p-6 h-48 bg-gray-200" />
          <Card className="p-6 h-48 bg-gray-200" />
        </div>
        <Card className="p-8 h-64 bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Selamat Datang, ${user?.nama || "Mahasiswa"}!`}
        description="Kelola magang anda dengan mudah dan efisien"
      />
      
      {/* Progress Magang */}
      <Card className="p-6">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-slate-900">Progress Magang</h4>
          <p className="text-sm text-gray-500">Status perkembangan magang anda</p>
        </div>
        {magang ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-blue-700 font-bold">Sedang Berjalan</p>
              <p className="font-semibold text-blue-600">{progressPercent}%</p>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
              <Calendar size={14} /> {sisaHari} Hari tersisa dari total {totalHari} hari
            </div>
          </div>
        ) : (
           <div className="text-sm text-gray-500 py-4 text-center border border-dashed rounded-lg">
             Anda belum memiliki magang aktif.
           </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Pendaftaran */}
        <Card className="p-6 flex flex-col justify-between">
          {renderStatusPendaftaran()}
        </Card>

        {/* Pengingat Logbook */}
        <Card className="p-6">
          <div className="flex gap-2 items-center mb-4">
            <Clock4 className="text-[#FF6900]" />
            <p className="text-lg text-slate-800 font-medium">Pengingat Logbook</p>
          </div>
          {magang ? (
            <>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-800">{logbookStatusText}</p>
                <p className="text-[#4A5565] text-xs">{logbookDateText}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-6"
                onClick={() => {
                  if (onNavigate) onNavigate("logbook");
                  else navigate("/mahasiswa/logbook");
                }}
              >
                Isi Logbook Hari Ini
              </Button>
            </>
          ) : (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Pendaftaran belum disetujui untuk mengisi logbook.
            </div>
          )}
        </Card>

        {/* Notifikasi Terbaru */}
        <Card className="p-6">
          <div className="flex gap-2 items-center mb-4">
            <Bell className="text-[#2B7FFF]" />
            <p className="text-lg text-slate-800 font-medium">Notifikasi Terbaru</p>
          </div>
          <div className="space-y-3">
            {notifikasi.length > 0 ? (
              notifikasi.map((notif: any) => (
                <div 
                  key={notif.id_notifikasi} 
                  className={`space-y-1 p-3 rounded-xl border transition-colors cursor-pointer relative ${
                    !notif.is_read 
                      ? "bg-blue-50 border-blue-100 hover:bg-blue-100" 
                      : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                  }`}
                  onClick={() => !notif.is_read && markAsRead(notif.id_notifikasi)}
                >
                  {!notif.is_read && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  )}
                  <p className={`text-xs leading-tight line-clamp-1 ${!notif.is_read ? "font-bold text-blue-900" : "font-medium text-gray-700"}`}>
                    {notif.judul}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-4">Tidak ada notifikasi.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Lowongan Terbaru */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h4 className="text-xl font-bold text-slate-900">Lowongan Magang Terbaru</h4>
            <p className="text-sm text-gray-500">Lowongan terbaru yang mungkin menarik untuk anda</p>
          </div>
          <Button variant="outline" onClick={() => {
            if (onNavigate) onNavigate("lowongan");
            else navigate("/mahasiswa/lowongan");
          }}>
            Lihat Semua
          </Button>
        </div>
        <div className="space-y-4">
          {lowongans.length > 0 ? (
            lowongans.map((lowongan: any) => (
              <Link
                to={`/mahasiswa/lowongan/${lowongan.id_lowongan}`}
                className="border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all"
                key={lowongan.id_lowongan}
              >
                <div className="flex gap-4 items-center text-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    {lowongan.poster_url ? (
                       <img src={lowongan.poster_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                       <Building className="text-gray-400" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{lowongan.judul}</p>
                    <p className="text-xs text-gray-500 mb-2">{lowongan.perusahaan}</p>
                    <div className="flex gap-3 text-gray-400">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        <MapPin size={12} className="text-blue-500" />
                        {lowongan.lokasi}
                      </p>
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        <Clock4 size={12} className="text-blue-500" />
                        {new Date(lowongan.deadline).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4 border border-dashed rounded-lg">
              Belum ada lowongan terbaru.
            </p>
          )}
        </div>
      </Card>

      {/* Modal Detail Pendaftaran */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Magang Anda</DialogTitle>
          </DialogHeader>
          {activePendaftaran && magang && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tempat Magang</p>
                <p className="font-medium text-slate-900">{activePendaftaran.lowongan?.perusahaan || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Posisi</p>
                <p className="font-medium text-slate-900">{activePendaftaran.lowongan?.judul || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Dosen Pembimbing</p>
                <p className="font-medium text-slate-900">{magang.dosen?.user?.profile?.nama || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Mulai Magang</p>
                <p className="font-medium text-slate-900">
                  {new Date(magang.tanggal_mulai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Perkiraan Magang Berakhir (6 Bulan)</p>
                <p className="font-medium text-slate-900">{tanggalSelesai}</p>
              </div>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsDetailOpen(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
