import type { Mahasiswa } from "./mahasiswa";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  created_at: string;
}

export type Role = "mahasiswa" | "admin" | "dosen";
