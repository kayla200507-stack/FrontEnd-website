import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lowonganService } from "../services/lowonganService";
import type { Lowongan } from "../services/lowonganService";
import { toast } from "sonner";

export const useLowongan = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["lowongan", params],
    queryFn: () => lowonganService.getAll(params),
  });
};

export const useLowonganDetail = (id: number | string) => {
  return useQuery({
    queryKey: ["lowongan", id],
    queryFn: () => lowonganService.getById(id),
    enabled: !!id,
  });
};

export const useLowonganMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: lowonganService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lowongan"] });
      toast.success("Lowongan berhasil ditambahkan");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menambahkan lowongan");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number | string; payload: Partial<Lowongan> }) =>
      lowonganService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lowongan"] });
      toast.success("Lowongan berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal memperbarui lowongan");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: lowonganService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lowongan"] });
      toast.success("Lowongan berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menghapus lowongan");
    },
  });

  return {
    createLowongan: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateLowongan: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteLowongan: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
