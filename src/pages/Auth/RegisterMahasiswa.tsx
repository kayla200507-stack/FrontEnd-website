import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerMahasiswaSchema, type RegisterMahasiswaType } from "../../lib/zod/authSchema";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuthMutation } from "../../hooks/useAuth";

export function RegisterMahasiswa() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { registerMahasiswa, isRegisteringMahasiswa } = useAuthMutation();

  const { control, handleSubmit } = useForm<RegisterMahasiswaType>({
    resolver: zodResolver(registerMahasiswaSchema),
    defaultValues: {
      nama: "",
      email: "",
      nim: "",
      no_telp: "",
      alamat: "",
      prodi: "",
      semester: "",
      ipk: "",
      tanggal_lahir: "",
      asal_institusi: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: RegisterMahasiswaType) => {
    registerMahasiswa(data);
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
              <Input {...field} placeholder="nama@student.ub.ac.id" error={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="nim"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">NIM</label>
              <Input {...field} placeholder="Masukkan NIM" error={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Controller
          control={control}
          name="tanggal_lahir"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Tanggal Lahir</label>
              <Input {...field} type="date" error={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      <Controller
        control={control}
        name="alamat"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Alamat</label>
            <Input {...field} placeholder="Masukkan Alamat Lengkap" error={fieldState.error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="asal_institusi"
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Asal Institusi</label>
            <Input {...field} placeholder="Universitas Brawijaya" error={fieldState.error?.message} />
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="prodi"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Program Studi</label>
              <Input {...field} placeholder="Teknik Informatika" error={fieldState.error?.message} />
            </div>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="semester"
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Smstr</label>
                <Input {...field} type="number" placeholder="6" error={fieldState.error?.message} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="ipk"
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">IPK</label>
                <Input {...field} type="number" step="0.01" placeholder="3.75" error={fieldState.error?.message} />
              </div>
            )}
          />
        </div>
      </div>

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

      <Button type="submit" className="w-full" size="lg" disabled={isRegisteringMahasiswa}>
        {isRegisteringMahasiswa && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Daftar Sebagai Mahasiswa
      </Button>
    </form>
  );
}
