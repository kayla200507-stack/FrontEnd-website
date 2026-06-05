import { create } from "zustand";
import type { Lowongan } from "../services/lowonganService";

export type PendaftaranDocumentKey =
  | "surat_pengantar"
  | "cv_file"
  | "ktm_file"
  | "transkrip_nilai"
  | "foto_terbaru"
  | "sertifikat_file";

export interface SelectedPendaftaranDocument {
  key: PendaftaranDocumentKey;
  label: string;
  type: "Dokumen" | "Gambar";
  fileName: string;
  uploadedAt: string;
  path: string;
}

export interface SelectedPendaftaran {
  id: number;
  title: string;
  company: string;
  appliedDate: string;
  status: string;
  lowonganId: number;
  companyLogo?: string | null;
  documents: SelectedPendaftaranDocument[];
}

interface PendaftaranState {
  id_lowongan: number | null;
  selectedLowongan: Lowongan | null;
  selectedPendaftaran: SelectedPendaftaran | null;
  selectedDocument: SelectedPendaftaranDocument | null;
  files: {
    surat_pengantar: File | null;
    cv_file: File | null;
    ktm_file: File | null;
    transkrip_nilai: File | null;
    foto_terbaru: File | null;
    sertifikat_file: File | null;
  };
  answers: {
    ekspektasi_gaji: string;
    kualifikasi_pendidikan: string;
    pengalaman_kerja: string;
    tools_digunakan: string[];
  };
  
  // Actions
  setLowongan: (id: number, lowongan?: Lowongan | null) => void;
  setSelectedLowongan: (lowongan: Lowongan | null) => void;
  setSelectedPendaftaran: (pendaftaran: SelectedPendaftaran | null) => void;
  setSelectedDocument: (document: SelectedPendaftaranDocument | null) => void;
  setFile: (key: keyof PendaftaranState["files"], file: File | null) => void;
  setAnswers: (answers: Partial<PendaftaranState["answers"]>) => void;
  reset: () => void;
}

export const usePendaftaranStore = create<PendaftaranState>((set) => ({
  id_lowongan: null,
  selectedLowongan: null,
  selectedPendaftaran: null,
  selectedDocument: null,
  files: {
    surat_pengantar: null,
    cv_file: null,
    ktm_file: null,
    transkrip_nilai: null,
    foto_terbaru: null,
    sertifikat_file: null,
  },
  answers: {
    ekspektasi_gaji: "",
    kualifikasi_pendidikan: "",
    pengalaman_kerja: "",
    tools_digunakan: [],
  },

  setLowongan: (id, lowongan = null) =>
    set({
      id_lowongan: id,
      selectedLowongan: lowongan,
    }),

  setSelectedLowongan: (selectedLowongan) => set({ selectedLowongan }),

  setSelectedPendaftaran: (selectedPendaftaran) => set({ selectedPendaftaran }),

  setSelectedDocument: (selectedDocument) => set({ selectedDocument }),
  
  setFile: (key, file) => 
    set((state) => ({
      files: { ...state.files, [key]: file }
    })),
    
  setAnswers: (newAnswers) => 
    set((state) => ({
      answers: { ...state.answers, ...newAnswers }
    })),
    
  reset: () => set({
    id_lowongan: null,
    selectedLowongan: null,
    selectedPendaftaran: null,
    selectedDocument: null,
    files: {
      surat_pengantar: null,
      cv_file: null,
      ktm_file: null,
      transkrip_nilai: null,
      foto_terbaru: null,
      sertifikat_file: null,
    },
    answers: {
      ekspektasi_gaji: "",
      kualifikasi_pendidikan: "",
      pengalaman_kerja: "",
      tools_digunakan: [],
    }
  }),
}));
