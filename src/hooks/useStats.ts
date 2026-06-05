import { useQuery } from "@tanstack/react-query";
import { statsService } from "../services/statsService";

export const usePublicStats = () => {
  return useQuery({
    queryKey: ["publicStats"],
    queryFn: statsService.getPublicStats,
  });
};
