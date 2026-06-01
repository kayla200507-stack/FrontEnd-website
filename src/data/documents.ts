import { FileText, Image, User, Award, Camera } from "lucide-react";
import type { UploadDocument } from "../utils/types";

export const uploadDocuments: UploadDocument[] = [
  {
    id: "surat",
    title: "Surat Pengantar Magang",
    subtitle: "Surat pengantar resmi dari akademik.",
    format: "PDF",
    maxSize: "5MB",
    icon: FileText,
    preloaded: null,
  },
  {
    id: "cv",
    title: "Curiculum Vitae (CV)",
    subtitle: "CV terbaru.",
    format: "PDF",
    maxSize: "5MB",
    icon: User,
    preloaded: "CV_Zaidan Fahry.pdf",
  },
  {
    id: "kartu",
    title: "Kartu Mahasiswa",
    subtitle: "Bukti mahasiswa aktif.",
    format: "JPG, PNG, PDF",
    maxSize: "5MB",
    icon: Image,
    preloaded: null,
  },
  {
    id: "transkrip",
    title: "Transkrip Nilai",
    subtitle: "Memenuhi pernyaratan akademik.",
    format: "PDF",
    maxSize: "5MB",
    icon: FileText,
    preloaded: null,
  },
  {
    id: "foto",
    title: "Foto Terbaru",
    subtitle: "Pastikan memakai baju formal dan rapi.",
    format: "JPG, PNG, PDF",
    maxSize: "5MB",
    icon: Camera,
    preloaded: null,
  },
  {
    id: "sertifikat",
    title: "Sertifikat/Dokumen Pendukung",
    subtitle: "Upload sertifikat atau dokumen pendukung lain.",
    format: "PDF",
    maxSize: "5MB",
    icon: Award,
    preloaded: null,
  },
];