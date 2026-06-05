import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { penilaianService } from "../services/penilaianService";

export const usePenilaianBimbingan = () => {
  return useQuery({
    queryKey: ["penilaian-bimbingan"],
    queryFn: () => penilaianService.getBimbingan(),
  });
};

export const useSubmitPenilaian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      idMagang,
      data,
    }: {
      idMagang: number;
      data: {
        logbookScore: number;
        reportScore: number;
        presentationScore: number;
        feedback: string;
      };
    }) => penilaianService.submitPenilaian(idMagang, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["penilaian-bimbingan"] });
    },
  });
};
