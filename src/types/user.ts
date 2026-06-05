export interface User {
  id_user: number;
  nama: string;
  email: string;
  role: Role;
  avatar: string | null;
  no_telp: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export type Role = "mahasiswa" | "admin" | "dosen";
