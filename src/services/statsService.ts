import axiosInstance from "../lib/zod/axios";

export interface PublicStats {
  lowongan_aktif: number;
  perusahaan_mitra: number;
  mahasiswa_terdaftar: number;
}

export const statsService = {
  getPublicStats: async () => {
    const res = await axiosInstance.get<{ data: PublicStats }>("/stats");
    return res.data;
  },
};
