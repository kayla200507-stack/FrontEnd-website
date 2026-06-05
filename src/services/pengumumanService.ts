import axiosInstance from "../lib/zod/axios";
import { api } from "./apiService";

export interface Pengumuman {
  id_pengumuman: number;
  id_user: number;
  judul: string;
  kategori: "Deadline" | "Kebijakan" | "Informasi" | "Lainnya";
  isi_pengumuman: string;
  target_audience: "Semua" | "Mahasiswa" | "Dosen";
  status: "Dipublikasi" | "Draft";
  tanggal_publish: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const pengumumanService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await axiosInstance.get<{ data: PaginatedResponse<Pengumuman> }>("/pengumuman", { params });
    return res.data;
  },

  getById: async (id: number | string) => {
    const res = await axiosInstance.get<{ data: Pengumuman }>(`/pengumuman/${id}`);
    return res.data;
  },

  create: async (payload: Omit<Pengumuman, "id_pengumuman" | "id_user" | "created_at" | "updated_at">) => {
    return api.post<Pengumuman, typeof payload>("/pengumuman", payload);
  },

  update: async (id: number | string, payload: Partial<Pengumuman>) => {
    const res = await axiosInstance.put<{ data: Pengumuman }>(`/pengumuman/${id}`, payload);
    return res.data;
  },

  delete: async (id: number | string) => {
    const res = await axiosInstance.delete(`/pengumuman/${id}`);
    return res.data;
  }
};
