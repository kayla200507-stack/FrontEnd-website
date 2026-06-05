import axiosInstance from "../lib/zod/axios";

export interface Notifikasi {
  id_notifikasi: number;
  id_user: number;
  judul: string;
  pesan: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

interface NotifikasiApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }
}

export const notifikasiService = {
  getAll: async (params?: any) => {
    const res = await axiosInstance.get<NotifikasiApiResponse<{ data: Notifikasi[] }>>("/notifikasi", { params });
    return res.data;
  },

  markAsRead: async (id: number) => {
    const res = await axiosInstance.patch<NotifikasiApiResponse<null>>(`/notifikasi/${id}/read`);
    return res.data;
  }
};
