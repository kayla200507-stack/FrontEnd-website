import axiosInstance from "../lib/zod/axios";
import type { Lowongan } from "./lowonganService";

export type PendaftaranStatus =
  | "Pending"
  | "Diterima"
  | "Ditolak";

export interface PendaftaranMahasiswa {
  id_pendaftaran: number;
  nim_mahasiswa: string;
  id_lowongan: number;
  tanggal_daftar: string;
  status_pendaftaran: PendaftaranStatus;
  surat_pengantar: string | null;
  cv_file: string | null;
  ktm_file: string | null;
  transkrip_nilai: string | null;
  foto_terbaru: string | null;
  sertifikat_file: string | null;
  ekspektasi_gaji: string | null;
  kualifikasi_pendidikan: string | null;
  pengalaman_kerja: string | null;
  tools_digunakan: string[] | null;
  catatan: string | null;
  created_at: string;
  updated_at: string;
  lowongan: Lowongan;
}

interface PendaftaranApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export const pendaftaranService = {
  create: async (formData: FormData) => {
    const res = await axiosInstance.post<PendaftaranApiResponse<PendaftaranMahasiswa>>("/pendaftaran", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  getAll: async (params?: any) => {
    const res = await axiosInstance.get<PendaftaranApiResponse<{ data: PendaftaranMahasiswa[] }>>("/pendaftaran", { params });
    return res.data;
  },

  updateStatus: async (id: number, status: PendaftaranStatus) => {
    const res = await axiosInstance.patch<PendaftaranApiResponse<null>>(`/pendaftaran/${id}/status`, { status_pendaftaran: status });
    return res.data;
  },

  getMyPendaftaran: async () => {
    const res = await axiosInstance.get<PendaftaranApiResponse<PendaftaranMahasiswa[]>>("/pendaftaran/me");
    return res.data;
  }
};
