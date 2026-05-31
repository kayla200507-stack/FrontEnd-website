import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email anda tidak valid!").min(1, "Email harus diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type LoginType = z.infer<typeof loginSchema>;
