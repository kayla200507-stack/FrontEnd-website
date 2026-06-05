import axiosInstance from "../lib/zod/axios";

export interface User {
  id_user: number;
  email: string;
  role: "admin" | "dosen" | "mahasiswa";
  avatar: string | null;
  no_telp: string | null;
  created_at: string;
  updated_at: string;
  name?: string; // This might come from relationship or join
  mahasiswa?: {
    nim: string;
    prodi: string;
    semester: number;
    ipk: number;
  };
  dosen?: {
    nip: string;
  };
  profile?: {
    nama: string;
  }
}

interface UserApiResponse<T> {
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

export const userService = {
  getAll: async (params?: any) => {
    const res = await axiosInstance.get<UserApiResponse<User[]>>("/auth/users", { params });
    return res.data;
  },

  updateProfile: async (data: any) => {
    if (data instanceof FormData) {
      data.append('_method', 'PATCH');
      const res = await axiosInstance.post<UserApiResponse<User>>("/auth/profile", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    }
    const res = await axiosInstance.patch<UserApiResponse<User>>("/auth/profile", data);
    return res.data;
  },

  changePassword: async (data: any) => {
    const res = await axiosInstance.patch<UserApiResponse<null>>("/auth/change-password", data);
    return res.data;
  },

  deleteAccount: async () => {
    const res = await axiosInstance.delete<UserApiResponse<null>>("/auth/me");
    return res.data;
  },

  delete: async (id: number) => {
    const res = await axiosInstance.delete<UserApiResponse<null>>(`/auth/users/${id}`);
    return res.data;
  }
};
