import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { laporanService } from "../services/laporanService";
import { toast } from "sonner";

export const useLaporan = (idMagang: number | undefined, params?: any) => {
  return useQuery({
    queryKey: ["laporan", idMagang, params],
    queryFn: () => laporanService.getByMagang(idMagang!, params),
    enabled: !!idMagang,
  });
};

export const useLaporanBimbingan = (params?: any) => {
  return useQuery({
    queryKey: ["laporan-bimbingan", params],
    queryFn: () => laporanService.getLaporanBimbingan(params),
  });
};

export const useUploadLaporan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: laporanService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laporan"] });
      toast.success("Laporan berhasil diunggah");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal mengunggah laporan"
      );
    },
  });
};

export const useReviewLaporan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, feedback, nilai }: { id: number; status: string; feedback?: string; nilai?: number }) =>
      laporanService.review(id, status, feedback, nilai),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laporan"] });
      toast.success("Review laporan berhasil disimpan");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menyimpan review laporan"
      );
    },
  });
};
