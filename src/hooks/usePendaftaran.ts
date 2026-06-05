import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pendaftaranService } from "../services/pendaftaranService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { usePendaftaranStore } from "../stores/pendaftaranStore";

export const usePendaftaranMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const resetStore = usePendaftaranStore((state) => state.reset);

  return useMutation({
    mutationFn: pendaftaranService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendaftaran"] });
      toast.success("Pendaftaran magang berhasil terkirim!");
      resetStore();
      navigate("/mahasiswa/status");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Gagal melakukan pendaftaran.";
      toast.error(message);
    },
  });
};

export const useUpdatePendaftaranStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: any }) => pendaftaranService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendaftaran"] });
      toast.success("Status pendaftaran berhasil diperbarui.");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Gagal memperbarui status.";
      toast.error(message);
    },
  });
};

export const useAllPendaftaran = (params?: any) => {
  return useQuery({
    queryKey: ["pendaftaran", "all", params],
    queryFn: () => pendaftaranService.getAll(params),
  });
};

export const useMyPendaftaran = () => {
  return useQuery({
    queryKey: ["pendaftaran", "me"],
    queryFn: pendaftaranService.getMyPendaftaran,
  });
};
