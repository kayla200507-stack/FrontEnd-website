import axiosInstance from "../lib/zod/axios";

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const api = {
  post: async <TData, TPayload>(
    url: string,
    payload: TPayload,
    params?: any,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.post<ApiResponse<TData>>(url, payload);
    return res.data;
  },
};
