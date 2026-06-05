import { useMemo, useRef, useState } from "react";
import { Upload, CheckCircle2, FileText, User, CreditCard, Award, Image, Check, CheckCircle, Loader2 } from "lucide-react";
import { CompanyCard } from "../../components/CompanyCard";
import { StepProgress } from "../../components/StepProgress";
import { usePendaftaranStore } from "../../stores/pendaftaranStore";
import { useAuthStore } from "../../stores/authStore";
import { usePendaftaranMutation } from "../../hooks/usePendaftaran";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/common/Input";
import { useUsers } from "../../hooks/useUsers";

interface FileCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  format: string;
  uploaded?: string | null;
  onUpload: (f: File) => void;
  onReset: () => void;
}

function FileCard({ icon, title, desc, format, uploaded, onUpload, onReset }: FileCardProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-[15.7px] border-[2.7px] border-slate-200 p-0 overflow-hidden flex flex-col" style={{ minHeight: 191 }}>
      {/* Card header */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-2">
        <div className="size-[50px] rounded-[14px] bg-[rgba(189,216,233,0.4)] border border-[rgba(189,216,233,0.3)] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[#1e293b] text-[15px] font-medium leading-snug">{title}</p>
          <p className="text-[#4a5565] text-[10px] mt-0.5 leading-snug">{desc}</p>
        </div>
      </div>

      {/* Format + Reset row */}
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[#4a5565] text-[12px]">{format}</span>
        {uploaded && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 rounded border border-slate-200 text-[7.6px] text-[#1e293b] hover:bg-slate-50 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Upload zone */}
      <div
        onClick={() => !uploaded && ref.current?.click()}
        className={`mx-3 mb-3 flex-1 rounded-[5.2px] bg-[#f3f3f5] border border-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center gap-1 transition-colors ${!uploaded ? "cursor-pointer hover:bg-slate-100" : ""}`}
        style={{ minHeight: 78 }}
      >
        {uploaded ? (
          <div className="flex items-center gap-2 px-3">
            <CheckCircle2 size={15} className="text-green-500 shrink-0" />
            <span className="text-[9px] font-medium text-[#1e293b] truncate max-w-[160px]">{uploaded}</span>
          </div>
        ) : (
          <>
            <Upload size={20} className="text-slate-400" />
            <span className="text-[9px] font-medium text-[rgba(10,10,10,0.5)]">Upload File</span>
          </>
        )}
      </div>
      <input ref={ref} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }} />
    </div>
  );
}

interface Props { onBack: () => void; onViewDesc: () => void; }

export function UnggahDokumenPage({ onBack, onViewDesc }: Props) {
  const { id_lowongan, files, setFile } = usePendaftaranStore();
  const user = useAuthStore((state) => state.user);
  const { mutate: submit, isPending } = usePendaftaranMutation();
  const [isAgreed, setIsAgreed] = useState(false);
  
  const { data: usersResponse, isLoading: isLoadingDosen } = useUsers({ role: 'dosen' });
  const dosenList = usersResponse?.data || [];

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      nip_dosen: "",
      nama: user?.nama || "",
      nim: (user as any)?.mahasiswa?.nim || "",
      email: user?.email || "",
      no_telp: user?.no_telp || "",
      alamat: (user as any)?.profile?.alamat || "",
      tanggal_lahir: (user as any)?.mahasiswa?.tanggal_lahir || "",
      asal_institusi: (user as any)?.mahasiswa?.asal_institusi || "",
      prodi: (user as any)?.mahasiswa?.prodi || "",
      semester: (user as any)?.mahasiswa?.semester || "",
      ipk: (user as any)?.mahasiswa?.ipk || "",
    }
  });

  const handleUpload = (key: string) => (f: File) => {
    setFile(key as any, f);
  };

  const handleReset = (key: string) => () => {
    setFile(key as any, null);
  };

  const cards = [
    { key: "surat_pengantar", icon: <FileText   size={20} className="text-[#898F94]" />, title: "Surat Pengantar Magang",       desc: "Surat pengantar resmi dari akademik.",               format: "Format: PDF | Maks. 5MB" },
    { key: "cv_file",        icon: <User       size={20} className="text-[#898F94]" />, title: "Curiculum Vitae (CV)",          desc: "CV terbaru.",                                        format: "Format: PDF | Maks. 5MB" },
    { key: "ktm_file",       icon: <CreditCard size={20} className="text-[#898F94]" />, title: "Kartu Mahasiswa",               desc: "Bukti mahasiswa aktif.",                             format: "Format: JPG, PNG, PDF | Maks. 5MB" },
    { key: "transkrip_nilai", icon: <FileText   size={20} className="text-[#898F94]" />, title: "Transkrip Nilai",               desc: "Memenuhi pernyaratan akademik.",                     format: "Format: PDF | Maks. 5MB" },
    { key: "foto_terbaru",   icon: <Image      size={20} className="text-[#898F94]" />, title: "Foto Terbaru",                  desc: "Pastikan memakai baju formal dan rapi.",             format: "Format: JPG, PNG, PDF | Maks. 5MB" },
    { key: "sertifikat_file",icon: <Award      size={20} className="text-[#898F94]" />, title: "Sertifikat/Dokumen Pendukung", desc: "Upload sertifikat atau dokumen pendukung lain.",      format: "Format: PDF | Maks. 5MB" },
  ];

  const filledFileCount = useMemo(
    () => Object.values(files).filter(Boolean).length,
    [files],
  );

  const onSubmit = (formValues: any) => {
    if (!id_lowongan) {
      toast.error("Lowongan belum dipilih. Silakan daftar dari halaman lowongan.");
      return;
    }

    if (!isAgreed) {
      toast.error("Anda harus menyetujui pernyataan sebelum mengirim lamaran.");
      return;
    }

    const formData = new FormData();
    formData.append("id_lowongan", id_lowongan.toString());
    
    // Append form data
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    submit(formData);
  };

  return (
    <div className="p-4 md:p-6 max-w-full">
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl">
          <StepProgress currentStep={1} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-[20.75px] border border-[#e2e8f0] shadow-sm p-5 md:p-[41.5px]">
          {/* Job header */}
          <div className="mb-6">
            <CompanyCard onViewDesc={onViewDesc} />
          </div>
          <div className="border-t border-[#f1f5f9] mb-8" />

          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h3 className="text-[#0f172a] text-lg font-bold">Data diri</h3>
              <span className="w-fit text-xs font-semibold text-[#3a60a0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                Lengkapi data Anda
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Dosen Pembimbing</label>
                <Controller
                  control={control}
                  name="nip_dosen"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3a60a0] focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Pilih Dosen Pembimbing</option>
                      {isLoadingDosen ? (
                        <option value="" disabled>Memuat data dosen...</option>
                      ) : (
                        dosenList.map((d: any) => (
                          <option key={d.dosen?.nip} value={d.dosen?.nip}>
                            {d.profile?.nama || d.name || d.email}
                          </option>
                        ))
                      )}
                    </select>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Nama Lengkap</label>
                <Controller
                  control={control}
                  name="nama"
                  render={({ field }) => <Input {...field} placeholder="Masukkan Nama Lengkap" />}
                />
              </div>

              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">NIM</label>
                <Controller
                  control={control}
                  name="nim"
                  render={({ field }) => <Input {...field} placeholder="Masukkan NIM" />}
                />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => <Input {...field} placeholder="nama@student.ub.ac.id" />}
                />
              </div>

              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Nomor Telepon</label>
                <Controller
                  control={control}
                  name="no_telp"
                  render={({ field }) => <Input {...field} placeholder="081234567890" />}
                />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Tanggal Lahir</label>
                <Controller
                  control={control}
                  name="tanggal_lahir"
                  render={({ field }) => <Input {...field} type="date" />}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Alamat Lengkap</label>
                <Controller
                  control={control}
                  name="alamat"
                  render={({ field }) => <Input {...field} placeholder="Jl. Veteran No. 8, Malang" />}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Asal Institusi</label>
                <Controller
                  control={control}
                  name="asal_institusi"
                  render={({ field }) => <Input {...field} placeholder="Universitas Brawijaya" />}
                />
              </div>

              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Program Studi</label>
                <Controller
                  control={control}
                  name="prodi"
                  render={({ field }) => <Input {...field} placeholder="Teknik Informatika" />}
                />
              </div>
              <div className="col-span-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Semester</label>
                  <Controller
                    control={control}
                    name="semester"
                    render={({ field }) => <Input {...field} type="number" placeholder="6" />}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">IPK</label>
                  <Controller
                    control={control}
                    name="ipk"
                    render={({ field }) => <Input {...field} type="number" step="0.01" placeholder="3.75" />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(189,216,233,0.4)] rounded-[10px] p-4 md:p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="size-5 text-[#2F6BFF]" />
              <span className="text-[#2f6bff] font-bold text-base">Ketentuan Akademik</span>
            </div>
            <ul className="text-sm text-[rgba(0,0,0,0.7)] space-y-1 ml-6 list-disc font-medium">
              <li>Minimal menempuh 98 SKS</li>
              <li>IPK minimal ≥ 3.00</li>
              <li>Tidak memiliki nilai E</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-[#0f172a] text-lg font-bold">Upload berkas</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Unggah berkas yang diperlukan untuk melamar magang.</p>
            </div>
            <div className="w-fit rounded-xl border border-slate-200 px-4 py-2 text-right bg-slate-50">
              <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Progres</p>
              <p className="text-sm font-bold text-[#0f172a]">{filledFileCount} / {cards.length} berkas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {cards.map(c => (
              <FileCard 
                key={c.key} 
                icon={c.icon} 
                title={c.title} 
                desc={c.desc} 
                format={c.format} 
                uploaded={(files as any)[c.key]?.name} 
                onUpload={handleUpload(c.key)} 
                onReset={handleReset(c.key)} 
              />
            ))}
          </div>

          {/* Agreement Checkbox */}
          <div className="border-t border-slate-100 pt-8">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div 
                onClick={() => setIsAgreed(!isAgreed)}
                className={`size-6 rounded-md flex items-center justify-center border-2 transition-all shrink-0 mt-0.5 ${
                  isAgreed ? "bg-[#3a60a0] border-[#3a60a0]" : "bg-white border-slate-300 group-hover:border-[#3a60a0]"
                }`}
              >
                {isAgreed && <Check size={16} className="text-white" strokeWidth={4} />}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium select-none">
                Saya menyatakan bahwa seluruh data yang saya isikan dan dokumen yang saya unggah adalah <span className="text-gray-900 font-bold underline">benar</span> dan <span className="text-gray-900 font-bold underline">asli</span>. Saya bersedia menerima sanksi akademik jika di kemudian hari ditemukan kecurangan dalam pendaftaran ini.
              </p>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-6 h-11 rounded-xl border border-slate-300 bg-white text-slate-600 font-bold text-base hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto order-2 sm:order-1"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19L5 12L12 5" /><path d="M19 12H5" />
            </svg>
            Kembali
          </button>
          <button
            type="submit"
            disabled={isPending || !isAgreed}
            className={`px-10 h-11 rounded-xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto order-1 sm:order-2 ${
              isPending || !isAgreed 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                : "bg-[#3a60a0] text-white hover:bg-[#2d4d82] hover:shadow-lg active:scale-[0.98]"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin size-5" />
                Mengirim...
              </>
            ) : (
              "Kirim Lamaran"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

