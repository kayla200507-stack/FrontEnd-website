import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (res) => {
      const { access_token, user } = res.data;
      localStorage.setItem("token", access_token);
      toast.success("Login sukses");

      let redirectPath = "/mahasiswa";
      if (user.role === "dosen") {
        redirectPath = "/dosen";
      } else if (user.role === "admin") {
        redirectPath = "/admin";
      }

      navigate(redirectPath);
    },
    onError: (err) => {
      toast.error("Login gagal");
      console.log(err);
    },
  });
};

export const useAuthMutation = () => {
  const login = useLoginMutation().mutate;

  return { login };
};
