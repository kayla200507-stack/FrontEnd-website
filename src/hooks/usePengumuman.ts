import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pengumumanService } from "../services/pengumumanService";
import type { Pengumuman } from "../services/pengumumanService";
import { toast } from "sonner";

export const usePengumuman = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["pengumuman", params],
    queryFn: () => pengumumanService.getAll(params),
  });
};

export const usePengumumanDetail = (id: number | string) => {
  return useQuery({
    queryKey: ["pengumuman", id],
    queryFn: () => pengumumanService.getById(id),
    enabled: !!id,
  });
};

export const usePengumumanMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: pengumumanService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pengumuman"] });
      toast.success("Pengumuman berhasil ditambahkan dan notifikasi terkirim");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menambahkan pengumuman");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number | string; payload: Partial<Pengumuman> }) =>
      pengumumanService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pengumuman"] });
      toast.success("Pengumuman berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal memperbarui pengumuman");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: pengumumanService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pengumuman"] });
      toast.success("Pengumuman berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menghapus pengumuman");
    },
  });

  return {
    createPengumuman: createMutation.mutate,
    isCreating: createMutation.isPending,
    updatePengumuman: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deletePengumuman: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
