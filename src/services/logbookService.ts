import axiosInstance from "../lib/zod/axios";

export interface Logbook {
  id_logbook: number;
  id_magang: number;
  tanggal: string;
  kegiatan: string;
  foto_kegiatan?: string | null;
  foto_kegiatan_url?: string | null;
  kendala: string | null;
  status_validasi: string;
  feedback: string | null;
  created_at: string;
  updated_at: string;
}

interface LogbookApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const logbookService = {
  getByMagang: async (idMagang: number, params?: any) => {
    const res = await axiosInstance.get<LogbookApiResponse<Logbook[]>>(
      `/magang/${idMagang}/logbook`,
      { params }
    );
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await axiosInstance.post<LogbookApiResponse<Logbook>>(
      "/logbook",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },

  validate: async (id: number, status: string, feedback?: string) => {
    const res = await axiosInstance.patch<LogbookApiResponse<null>>(
      `/logbook/${id}/validate`,
      { status_validasi: status, feedback: feedback || null }
    );
    return res.data;
  },
};
