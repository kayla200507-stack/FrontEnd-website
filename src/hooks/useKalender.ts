import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/zod/axios";

export interface CalendarEvent {
  date: string;
  title: string;
  desc: string;
  type: "deadline" | "jadwal" | "meeting";
  priority?: "penting" | "normal";
}

export const useKalender = () => {
  return useQuery({
    queryKey: ["kalender"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: CalendarEvent[] }>("/kalender");
      return response.data.data;
    },
  });
};
