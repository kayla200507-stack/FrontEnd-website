import axiosInstance from "../lib/zod/axios";

export interface Magang {
  id_magang: number;
  nim_mahasiswa: string;
  nip_dosen: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status_magang: string;
  created_at: string;
  updated_at: string;
  mahasiswa?: {
    nim: string;
    prodi: string;
    semester: number;
    ipk: number;
    user: {
      email: string;
      avatar: string | null;
      profile: {
        nama: string;
        no_hp: string | null;
      };
    };
    pendaftarans?: {
      id_pendaftaran: number;
      status_pendaftaran: string;
      lowongan?: {
        judul: string;
        perusahaan: string;
        lokasi: string;
      };
    }[];
  };
  dosen?: {
    nip: string;
    user: {
      email: string;
      profile: {
        nama: string;
      };
    };
  };
}

interface MagangApiResponse<T> {
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

export const magangService = {
  getAll: async (params?: any) => {
    const res = await axiosInstance.get<MagangApiResponse<Magang[]>>("/magang", {
      params,
    });
    return res.data;
  },

  getMe: async () => {
    const res = await axiosInstance.get<MagangApiResponse<Magang[]>>("/magang/me");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await axiosInstance.get<MagangApiResponse<Magang>>(`/magang/${id}`);
    return res.data;
  },

  getBimbingan: async () => {
    const res = await axiosInstance.get<MagangApiResponse<Magang[]>>("/magang/bimbingan");
    return res.data;
  },
};
