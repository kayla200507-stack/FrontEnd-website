import type { LucideIcon } from "lucide-react";

export interface JobQualification {
  text: string;
}

export interface JobDocument {
  name: string;
  icon: LucideIcon;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  workType: string;
  positions: number;
  applicants: number;
  deadlineLabel: string;
  deadlineVariant: "red" | "gray";
  logo: string;
  openDate: string;
  closeDate: string;
  companyDesc: string;
  education: string[];
  qualifications: JobQualification[];
  responsibilities: string;
  documents: JobDocument[];
  descriptions: string[];
  kualifikasi: string[];
}

export interface UploadDocument {
  id: string;
  title: string;
  subtitle: string;
  format: string;
  maxSize: string;
  icon: LucideIcon;
  preloaded: string | null;
}