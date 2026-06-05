import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginType } from "../../lib/zod/authSchema";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import { useAuthMutation } from "../../hooks/useAuth";
import { Input } from "@/components/common/Input";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { useAuthStore } from "../../stores/authStore";
import { Navigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login, isLoading } = useAuthMutation();
  const { isAuthenticated, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  
  const { control, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isAuthenticated && user) {
    if (user.role === "mahasiswa") return <Navigate to="/mahasiswa" replace />;
    if (user.role === "dosen") return <Navigate to="/dosen" replace />;
    if (user.role === "admin") return <Navigate to="/admin" replace />;
  }

  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const onSubmit = (value: LoginType) => {
    login(value);
  };

  return (
    <div className="max-w-[520px] w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-[28px] font-bold text-gray-900 mb-2">
          Masuk ke Akun Anda
        </h2>
        <p className="text-gray-500 text-sm">
          Silakan masuk untuk mengakses dashboard Anda
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Email/NIM/NIP
              </label>
              <Input
                placeholder="Masukkan email, NIM, atau NIP"
                {...field}
                error={fieldState.error?.message}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Kata Sandi
              </label>
              <Input
                placeholder="********"
                suffixIcon={showPassword ? EyeOff : Eye}
                {...field}
                error={fieldState.error?.message}
                onClickSuffixIcon={handleShowPassword}
                type={showPassword ? "text" : "password"}
              />
            </div>
          )}
        />

        {/* Additional Options */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600 font-medium">
              Ingat Saya
            </span>
          </label>
          <Link
            to="/lupa-kata-sandi"
            className="text-sm text-[#0A46D2] font-semibold hover:underline"
          >
            Lupa Kata Sandi?
          </Link>
        </div>

        {/* Submit Button */}
        <Button size="lg" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="text-gray-400 text-sm">atau</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600 mb-10">
        Belum memiliki akun?{" "}
        <Link to="/auth/register" className="text-[#0A46D2] font-bold hover:underline">
          Daftar di sini
        </Link>
      </p>

      {/* Back to Home Link */}
      <Link
        to="/"
        className="flex items-center justify-center gap-2 text-sm text-[#0A46D2] font-medium hover:underline"
      >
        <ArrowLeft size={16} />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
