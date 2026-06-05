import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDosenSchema, type RegisterDosenType } from "../../lib/zod/authSchema";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuthMutation } from "../../hooks/useAuth";

export function RegisterDosen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { registerDosen, isRegisteringDosen } = useAuthMutation();

  const { control, handleSubmit } = useForm<RegisterDosenType>({
    resolver: zodResolver(registerDosenSchema),
    defaultValues: {
      nama: "",
      email: "",
      nip: "",
      no_telp: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: RegisterDosenType) => {
    registerDosen(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={control}
        name="nama"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
            <Input {...field} placeholder="Masukkan Nama Lengkap" error={fieldState.error?.message} />
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <Input {...field} placeholder="nama@dosen.ub.ac.id" error={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="nip"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">NIP</label>
              <Input {...field} placeholder="Masukkan NIP" error={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      <Controller
        control={control}
        name="no_telp"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Nomor Telepon</label>
            <Input {...field} placeholder="081234567890" error={fieldState.error?.message} />
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Kata Sandi</label>
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                suffixIcon={showPassword ? EyeOff : Eye}
                onClickSuffixIcon={() => setShowPassword(!showPassword)}
                error={fieldState.error?.message}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password_confirmation"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Konfirmasi Kata Sandi</label>
              <Input
                {...field}
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                suffixIcon={showConfirm ? EyeOff : Eye}
                onClickSuffixIcon={() => setShowConfirm(!showConfirm)}
                error={fieldState.error?.message}
              />
            </div>
          )}
        />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isRegisteringDosen}>
        {isRegisteringDosen && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Daftar Sebagai Dosen
      </Button>
    </form>
  );
}
