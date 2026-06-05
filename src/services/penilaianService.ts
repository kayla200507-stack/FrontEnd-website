import axiosInstance from "../lib/zod/axios";

export interface PenilaianMagang {
  id_magang: number;
  nim: string;
  studentName: string;
  company: string;
  position: string;
  periodStart: string;
  periodEnd: string;
  logbookScore: number;
  reportScore: number;
  presentationScore: number;
  finalScore: number;
  status: string;
  feedback: string | null;
  grade: string | null;
}

interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export const penilaianService = {
  getBimbingan: async () => {
    const res = await axiosInstance.get<ApiResponse<PenilaianMagang[]>>(`/penilaian/bimbingan`);
    return res.data;
  },

  submitPenilaian: async (idMagang: number, data: {
    logbookScore: number;
    reportScore: number;
    presentationScore: number;
    feedback: string;
  }) => {
    const res = await axiosInstance.post<ApiResponse<any>>(`/penilaian/${idMagang}`, data);
    return res.data;
  },
};
