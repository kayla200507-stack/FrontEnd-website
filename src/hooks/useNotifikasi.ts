import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifikasiService } from "../services/notifikasiService";

export const useNotifikasi = (params?: any) => {
  return useQuery({
    queryKey: ["notifikasi", params],
    queryFn: () => notifikasiService.getAll(params),
  });
};

export const useMarkNotifikasiAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notifikasiService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifikasi"] });
    },
  });
};
