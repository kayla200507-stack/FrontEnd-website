import type { User } from "./user";

export interface Mahasiswa extends User {
  informasi_mahasiswa: {
    nim?: string;
    program_studi?: string;
    semester?: number;
    alamat?: string;
  };
}

