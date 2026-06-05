import axiosInstance from "../lib/zod/axios";
import { api } from "./apiService";

export interface Lowongan {
  id_lowongan: number;
  id_kategori: number;
  judul: string;
  nama_perusahaan: string;
  bidang_perusahaan: string;
  logo_perusahaan?: string | null;
  tentang_perusahaan?: string | null;
  jumlah_karyawan?: string | null;
  lokasi: string;
  alamat_lengkap?: string | null;
  tipe_pekerjaan: "Full Time" | "Part Time" | "Freelance";
  penempatan: "WFO" | "WFH" | "Hybrid";
  durasi: string;
  kuota: number;
  deskripsi_singkat?: string | null;
  deskripsi_pekerjaan?: string | null;
  kualifikasi?: string | null;
  benefit?: string | null;
  skills?: string[] | null;
  batas_lamaran: string;
  mulai_magang?: string | null;
  status_lowongan: "draft" | "active" | "closed";
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedResponse<T> {
  status: string;
  message?: string;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const lowonganService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await axiosInstance.get<PaginatedResponse<Lowongan>>("/lowongan", { params });
    return res.data;
  },

  getById: async (id: number | string) => {
    const res = await axiosInstance.get<{ data: Lowongan }>(`/lowongan/${id}`);
    return res.data;
  },

  create: async (payload: Omit<Lowongan, "id_lowongan" | "created_at" | "updated_at">) => {
    return api.post<Lowongan, typeof payload>("/lowongan", payload);
  },

  update: async (id: number | string, payload: Partial<Lowongan>) => {
    const res = await axiosInstance.put<{ data: Lowongan }>(`/lowongan/${id}`, payload);
    return res.data;
  },

  delete: async (id: number | string) => {
    const res = await axiosInstance.delete(`/lowongan/${id}`);
    return res.data;
  }
};
