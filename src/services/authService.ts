import axios from "axios";
import { api } from "./apiService";
import type { LoginType, RegisterMahasiswaType, RegisterDosenType } from "../lib/zod/authSchema";
interface User {
  id_user: number;
  nama: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: "mahasiswa" | "dosen" | "admin";
  avatar: string | null;
  no_telp: string | null;
}

interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const loginService = async (payload: LoginType) => {
  return api.post<LoginResponse, LoginType>("auth/login", payload);
};

export const registerMahasiswaService = async (payload: RegisterMahasiswaType) => {
  return api.post<any, RegisterMahasiswaType>("auth/register/student", payload);
};

export const registerDosenService = async (payload: RegisterDosenType) => {
  return api.post<any, RegisterDosenType>("auth/register/dosen", payload);
};
