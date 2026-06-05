import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email/NIM/NIP harus diisi"), // Backend handles email/nim/nip
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerMahasiswaSchema = z.object({
  nama: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  nim: z.string().min(5, "NIM minimal 5 karakter"),
  no_telp: z.string().min(10, "Nomor telepon tidak valid"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  prodi: z.string().min(1, "Program studi harus diisi"),
  semester: z.string().min(1, "Semester harus diisi"),
  ipk: z.string().min(1, "IPK harus diisi"),
  tanggal_lahir: z.string().min(1, "Tanggal lahir harus diisi"),
  asal_institusi: z.string().min(1, "Asal institusi harus diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  password_confirmation: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Password tidak cocok",
  path: ["password_confirmation"],
});

export type RegisterMahasiswaType = z.infer<typeof registerMahasiswaSchema>;

export const registerDosenSchema = z.object({
  nama: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  nip: z.string().min(5, "NIP minimal 5 karakter"),
  no_telp: z.string().min(10, "Nomor telepon tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  password_confirmation: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Password tidak cocok",
  path: ["password_confirmation"],
});

export type RegisterDosenType = z.infer<typeof registerDosenSchema>;
