import axiosInstance from "../lib/zod/axios";

export interface Laporan {
  id_laporan: number;
  id_magang: number;
  judul_laporan: string;
  file_laporan: string;
  file_url: string;
  tanggal_upload: string;
  status_review: string;
  feedback: string | null;
  nilai: number | null;
  created_at: string;
  updated_at: string;
  magang?: {
    id_magang: number;
    id_mahasiswa: number;
    mahasiswa?: {
      nama_lengkap: string;
      nim: string;
      pendaftarans?: {
        status: string;
        lowongan?: {
          judul: string;
          nama_perusahaan: string;
        };
      }[];
    };
  };
}

interface LaporanApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export const laporanService = {
  getByMagang: async (idMagang: number, params?: any) => {
    const res = await axiosInstance.get<LaporanApiResponse<Laporan[]>>(
      `/magang/${idMagang}/laporan`,
      { params }
    );
    return res.data;
  },

  getLaporanBimbingan: async (params?: any) => {
    const res = await axiosInstance.get<LaporanApiResponse<Laporan[]>>(
      `/laporan/bimbingan`,
      { params }
    );
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await axiosInstance.post<LaporanApiResponse<Laporan>>(
      "/laporan",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },

  review: async (id: number, status: string, feedback?: string, nilai?: number) => {
    const res = await axiosInstance.patch<LaporanApiResponse<null>>(
      `/laporan/${id}/review`,
      { status_review: status, feedback: feedback || null, nilai: nilai || null }
    );
    return res.data;
  },
};
