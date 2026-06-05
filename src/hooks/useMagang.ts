import { useQuery } from "@tanstack/react-query";
import { magangService } from "../services/magangService";
import { useAuthStore } from "../stores/authStore";

export const useMagang = (params?: any) => {
  return useQuery({
    queryKey: ["magang", params],
    queryFn: () => magangService.getAll(params),
  });
};

export const useMyMagang = () => {
  return useQuery({
    queryKey: ["magang", "me"],
    queryFn: async () => {
      const res = await magangService.getMe();
      // res.data should be an array of Magang
      return Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;
    }
  });
};

export const useMagangDetail = (id: number) => {
  return useQuery({
    queryKey: ["magang", id],
    queryFn: () => magangService.getById(id),
    enabled: !!id,
  });
};

export const useBimbingan = () => {
  return useQuery({
    queryKey: ["magang", "bimbingan"],
    queryFn: async () => {
      const res = await magangService.getBimbingan();
      return Array.isArray(res.data) ? res.data : [];
    },
  });
};
