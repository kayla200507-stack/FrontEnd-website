import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";

export const useUsers = (params?: any) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getAll(params),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((state: any) => state.updateUser);

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (response: any) => {
      const updatedUser = response.data;
      updateUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Profil berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal memperbarui profil");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: userService.changePassword,
    onSuccess: () => {
      toast.success("Kata sandi berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal mengubah kata sandi");
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: userService.deleteAccount,
    onSuccess: () => {
      clearAuth();
      window.location.href = "/auth/login";
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menghapus akun");
    },
  });
};
