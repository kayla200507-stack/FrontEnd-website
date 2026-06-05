import { useState } from "react";
import { CheckCircle, Clock, UploadCloud, Calendar, MessageSquare, Loader2 } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useMyMagang } from "../../hooks/useMagang";
import { useLogbook, useCreateLogbook } from "../../hooks/useLogbook";
import { Card } from "@/components/common/Card";
import { Button } from "../../components/ui/button";
import { DashboardHeader } from "../../components/common/DashboardHeader";

function StatusBadge({ status }: { status: string }) {
  if (status === "Reviewed" || status === "Selesai" || status === "Valid") {
    return (
      <span className="flex items-center gap-1.5 bg-[#f0fdf4] text-[#008236] text-[12px] font-medium px-2.5 py-1 rounded-[8px] border border-[#b9f8cf] shrink-0">
        <CheckCircle size={11} strokeWidth={2.5} />
        {status}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 bg-white border border-[rgba(0,0,0,0.2)] text-[#4a5565] text-[12px] font-medium px-2.5 py-1 rounded-[8px] shrink-0">
      <Clock size={11} strokeWidth={2} />
      {status || "Pending"}
    </span>
  );
}

export function LogbookPage() {
  const { user } = useAuthStore();
  const { data: magang, isLoading: isLoadingMagang } = useMyMagang();
  const { data: logbookData, isLoading: isLoadingLogbook } = useLogbook(magang?.id_magang);
  const { mutate: createLogbook, isPending: isCreating } = useCreateLogbook();

  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kendala, setKendala] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const handleSave = () => {
    if (!magang) return;
    if (!tanggal || !deskripsi) return;

    const formData = new FormData();
    formData.append("id_magang", magang.id_magang.toString());
    formData.append("tanggal", tanggal);
    formData.append("kegiatan", deskripsi);
    formData.append("status_validasi", "Pending");
    if (kendala) {
      formData.append("kendala", kendala);
    }
    if (foto) {
      formData.append("foto_kegiatan", foto);
    }

    createLogbook(formData, {
      onSuccess: () => {
        setTanggal("");
        setDeskripsi("");
        setKendala("");
        setFoto(null);
        setFotoPreview(null);
      }
    });
  };

  const handleReset = () => {
    setTanggal("");
    setDeskripsi("");
    setKendala("");
    setFoto(null);
    setFotoPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const url = URL.createObjectURL(file);
      setFotoPreview(url);
    }
  };

  const logbooks = logbookData?.data || [];
  
  // Get actual feedback from logbooks
  const feedbacks = logbooks
    .filter((lb: any) => lb.feedback && lb.feedback.trim() !== "")
    .sort((a: any, b: any) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, 5)
    .map((lb: any) => ({
      id: lb.id_logbook,
      date: new Date(lb.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      dosen: magang?.dosen?.user?.profile?.nama || "Dosen Pembimbing",
      aktivitas: lb.kegiatan,
      komentar: lb.feedback,
  }));

  if (isLoadingMagang) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!magang) {
    return (
      <div className="p-6">
        <Card className="p-12 text-center">
          <p className="text-gray-500">Anda belum terdaftar dalam program magang aktif.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <DashboardHeader 
          title="Logbook Harian" 
          description="Catat dan pantau aktivitas magang harian Anda" 
        />
      </div>
      {/* Top 2-column grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Left: Riwayat Logbook */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm p-4 md:p-6 overflow-hidden">
          <div className="mb-4">
            <p className="text-[#3a60a0] text-lg font-semibold">Riwayat Logbook</p>
            <p className="text-[#3a60a0] text-sm mt-0.5">Aktivitas yang telah dicatat</p>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {isLoadingLogbook ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-blue-600" />
              </div>
            ) : logbooks.length === 0 ? (
              <p className="text-center text-gray-400 py-8 text-sm">Belum ada riwayat logbook.</p>
            ) : (
              logbooks.map((item) => (
                <div
                  key={item.id_logbook}
                  className="border border-[rgba(0,0,0,0.1)] rounded-lg p-3 md:p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-[#4a5565] text-[12px] font-medium">
                      {new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <div className="w-fit">
                      <StatusBadge status={item.status_validasi} />
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    {item.foto_kegiatan_url && (
                      <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={item.foto_kegiatan_url} 
                          alt="Foto" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-[#1e293b] text-[14px] leading-[20px] font-medium">{item.kegiatan}</p>
                      {item.kendala && (
                        <p className="text-red-500 text-[12px] mt-2 italic">Kendala: {item.kendala}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Input Logbook Harian */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm p-4 md:p-6 h-fit">
          <div className="mb-4">
            <p className="text-[#3a60a0] text-lg font-semibold">Input Logbook Harian</p>
            <p className="text-[#3a60a0] text-sm mt-0.5">Catat aktivitas magang anda setiap hari</p>
          </div>

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-[#3a60a0] text-sm font-medium mb-2">Foto Kegiatan (Opsional)</label>
            <div className="relative w-full bg-[#f3f4f6] border border-[rgba(0,0,0,0.08)] rounded-lg overflow-hidden flex flex-col items-center justify-center gap-2 py-5 md:py-7 hover:bg-gray-200 transition-colors cursor-pointer group">
              {fotoPreview ? (
                <div className="relative w-full h-40">
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <UploadCloud size={28} className="text-white mb-2" strokeWidth={1.5} />
                    <span className="text-white text-sm">Ganti Foto</span>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud size={28} className="text-[#9ca3af]" strokeWidth={1.5} />
                  <span className="text-[#9ca3af] text-sm">Upload Foto Kegiatan</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          </div>

          {/* Tanggal Kegiatan */}
          <div className="mb-4">
            <label className="block text-[#3a60a0] text-sm font-medium mb-2">Tanggal Kegiatan</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-white border border-[rgba(0,0,0,0.15)] rounded-lg text-sm text-[#1e293b] outline-none focus:border-[#3a60a0] transition-colors"
              />
            </div>
          </div>

          {/* Deskripsi Kegiatan */}
          <div className="mb-4">
            <label className="block text-[#3a60a0] text-sm font-medium mb-2">Deskripsi Kegiatan</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan detail kegiatan yang Anda lakukan hari ini..."
              rows={3}
              className="w-full px-3 py-2.5 bg-white border border-[rgba(0,0,0,0.15)] rounded-lg text-sm text-[#1e293b] placeholder:text-[#9ca3af] outline-none focus:border-[#3a60a0] resize-none transition-colors"
            />
          </div>

          {/* Kendala */}
          <div className="mb-4">
            <label className="block text-[#3a60a0] text-sm font-medium mb-2">Kendala (Opsional)</label>
            <textarea
              value={kendala}
              onChange={(e) => setKendala(e.target.value)}
              placeholder="Tuliskan kendala jika ada..."
              rows={2}
              className="w-full px-3 py-2.5 bg-white border border-[rgba(0,0,0,0.15)] rounded-lg text-sm text-[#1e293b] placeholder:text-[#9ca3af] outline-none focus:border-[#3a60a0] resize-none transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button 
              className="w-full sm:flex-1" 
              onClick={handleSave}
              disabled={isCreating || !tanggal || !deskripsi}
            >
              {isCreating && <Loader2 size={16} className="animate-spin mr-2" />}
              Simpan Logbook
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom: Feedback Dosen Pembimbing */}
      <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-sm p-4 md:p-6">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-[#3a60a0]" />
              <p className="text-[#3a60a0] text-lg font-semibold">Feedback Dosen Pembimbing</p>
            </div>
            <p className="text-[#3a60a0] text-sm mt-0.5">Komentar dan saran untuk logbook terbaru</p>
          </div>
        </div>

        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">Belum ada feedback dari dosen pembimbing.</p>
          ) : (
            feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-[#eff6ff] border-l-4 border-[#2b7fff] rounded-r-[10px] px-4 md:px-5 py-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-[#1e293b] text-[12px] font-medium">{fb.date}</span>
                  <span className="w-fit bg-white text-[#1e293b] text-[10px] md:text-[12px] font-medium px-3 py-1 rounded-full border border-[rgba(0,0,0,0.08)] shadow-sm truncate max-w-[200px]">
                    {fb.dosen}
                  </span>
                </div>

                <p className="text-[#1e293b] text-[14px] leading-[20px] mb-3">
                  <span className="font-bold">Aktivitas:</span> {fb.aktivitas}
                </p>

                <div className="bg-white rounded-lg px-4 py-3 flex items-start gap-2.5">
                  <MessageSquare size={14} className="text-[#1447e6] shrink-0 mt-0.5" />
                  <p className="text-[#1447e6] text-[14px] font-medium">{fb.komentar}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
