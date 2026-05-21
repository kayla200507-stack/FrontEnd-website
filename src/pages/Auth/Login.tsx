import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginType } from "../../lib/zod/authSchema";
import { ArrowLeft, Divide, Eye, EyeClosed, EyeOff } from "lucide-react";

import { useAuthMutation } from "../../hooks/useAuth";
import { Input } from "@/components/common/Input";
import { useState } from "react";
import { Button } from "@/components/common/Button";

export default function LoginPage() {
  const { login } = useAuthMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const onSubmit = (value: LoginType) => {
    console.log(value);
    login(value);
  };
  return (
    <div className="max-w-[420px] w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-gray-900 mb-2">
          Masuk ke Akun Anda
        </h2>
        <p className="text-gray-500 text-sm">
          Silakan masuk untuk mengakses dashboard Anda
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <label className="block text-[14px] font-semibold text-gray-900">
                Email/NIM/NIP
              </label>
              <Input
                placeholder="Masukkan email, NIM, atau NIP"
                onChange={field.onChange}
                value={field.value}
                error={fieldState.error?.message}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <label className="block text-[14px] font-semibold text-gray-900">
                Kata Sandi
              </label>
              <Input
                placeholder="********"
                suffixIcon={showPassword ? EyeOff : Eye}
                onChange={field.onChange}
                value={field.value}
                error={fieldState.error?.message}
                onClickSuffixIcon={handleShowPassword}
                type={showPassword ? "text" : "password"}
              />
            </div>
          )}
        />

        {/* Password Field */}

        {/* Additional Options */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[13px] text-gray-600 font-medium">
              Ingat Saya
            </span>
          </label>
          <a
            href="#"
            className="text-[13px] text-[#0A46D2] font-semibold hover:underline"
          >
            Lupa Kata Sandi?
          </a>
        </div>

        {/* Submit Button */}
        <Button size="lg" className="w-full">
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
        <a href="#" className="text-[#0A46D2] font-bold hover:underline">
          Daftar di sini
        </a>
      </p>

      {/* Back to Home Link */}
      <a
        href="#"
        className="flex items-center justify-center gap-2 text-sm text-[#0A46D2] font-medium hover:underline"
      >
        <ArrowLeft size={16} />
        Kembali ke Beranda
      </a>
    </div>
  );
}
