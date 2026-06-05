import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logbookService } from "../services/logbookService";
import { toast } from "sonner";

export const useLogbook = (idMagang: number, params?: any) => {
  return useQuery({
    queryKey: ["logbook", idMagang, params],
    queryFn: () => logbookService.getByMagang(idMagang, params),
    enabled: !!idMagang,
  });
};

export const useCreateLogbook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logbookService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbook"] });
      toast.success("Logbook berhasil disimpan");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menyimpan logbook"
      );
    },
  });
};

export const useValidateLogbook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, feedback }: { id: number; status: string; feedback?: string }) =>
      logbookService.validate(id, status, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbook"] });
      toast.success("Logbook berhasil divalidasi");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal memvalidasi logbook"
      );
    },
  });
};
