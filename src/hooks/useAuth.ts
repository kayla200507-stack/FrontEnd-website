import { useMutation } from "@tanstack/react-query";
import { loginService, registerMahasiswaService, registerDosenService } from "../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginService,
    onSuccess: (res) => {
      const { access_token, user } = res.data;
      
      if (!user) {
        toast.error("Data user tidak ditemukan");
        return;
      }
      
      // Save to Zustand store (which also persists to localStorage)
      setAuth(user, access_token);
      
      toast.success("Login sukses");

      let redirectPath = "/mahasiswa";
      if (user.role === "dosen") {
        redirectPath = "/dosen";
      } else if (user.role === "admin") {
        redirectPath = "/admin";
      }

      navigate(redirectPath);
    },
    onError: (err: any) => {
      const message = err.response?.data?.message || "Login gagal";
      toast.error(message);
      console.log(err);
    },
  });
};

export const useRegisterMahasiswaMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerMahasiswaService,
    onSuccess: () => {
      toast.success("Registrasi berhasil, silakan login");
      navigate("/auth/login");
    },
    onError: (err: any) => {
      const message = err.response?.data?.message || "Registrasi gagal";
      toast.error(message);
    },
  });
};

export const useRegisterDosenMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerDosenService,
    onSuccess: () => {
      toast.success("Registrasi berhasil, silakan login");
      navigate("/auth/login");
    },
    onError: (err: any) => {
      const message = err.response?.data?.message || "Registrasi gagal";
      toast.error(message);
    },
  });
};

export const useAuthMutation = () => {
  const { mutate: login, isPending: isLoading } = useLoginMutation();
  const { mutate: registerMahasiswa, isPending: isRegisteringMahasiswa } = useRegisterMahasiswaMutation();
  const { mutate: registerDosen, isPending: isRegisteringDosen } = useRegisterDosenMutation();

  return { login, isLoading, registerMahasiswa, isRegisteringMahasiswa, registerDosen, isRegisteringDosen };
};
