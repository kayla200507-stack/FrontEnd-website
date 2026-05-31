import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/Auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "./components/ui/sonner";
import DashboardPage from "./pages/Mahasiswa/Dashboard";
import DashboardDosen from "./pages/Dosen/Dashboard";
import DosenLayout from "./layouts/DosenLayout";
import MahasiswaBimbingan from "./pages/Dosen/MahasiswaBimbingan";
import MonitoringLogbook from "./pages/Dosen/MonitoringLogbook";
import LaporanMagangPage from "./pages/Dosen/LaporanMagang";
import PenilaianMagangPage from "./pages/Dosen/PenilaianMagangPage";
import SettingsPage from "./pages/Dosen/SettingPage";
import MahasiswaLayout from "./layouts/MahasiswaLayout";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import DataMahasiswaPage from "./pages/Admin/DataMahasiwa";
import AdminLogin from "./pages/Admin/Login";
import ProfileAdminPage from "./pages/Admin/ProfileAdmin";
import AdminSettingsPage from "./pages/Admin/SettingsPage";
import Pengumuman from "./pages/Admin/Pengumuman";
import VerifPendaftaran from "./pages/Admin/VerifPendaftaran";
import AdminLowonganPage from "./pages/Admin/LowonganPage";

import LaporanPage from "./pages/Mahasiswa/LaporanPage.tsx";
import StatusPage from "./pages/Mahasiswa/StatusPage.tsx";
import LogbookPage from "./pages/Mahasiswa/LogbookPage.tsx";
import ProfilePage from "./pages/Mahasiswa/ProfilePage.tsx";
import KalenderPage from "./pages/Mahasiswa/KalenderPage.tsx";
import LowonganPage from "./pages/Mahasiswa/LowonganPage.tsx";
import { DaftarPage } from "./pages/Mahasiswa/DaftarPage.tsx";
import { DetailPage } from "./pages/Mahasiswa/DetailPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing & Public */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="lowongan" element={<LowonganPage />} />
          </Route>

          {/* Mahasiswa */}
          <Route path="mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="lowongan">
              <Route index element={<LowonganPage />} />
              <Route path="detail/:id" element={<DetailPage />} />
              <Route path="daftar/:id" element={<DaftarPage />} />
            </Route>
            <Route path="laporan" element={<LaporanPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="logbook" element={<LogbookPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="kalender" element={<KalenderPage />} />
          </Route>

          {/* Dosen */}

          {/* Dosen */}
          <Route path="dosen" element={<DosenLayout />}>
            <Route index element={<DashboardDosen />} />
            <Route path="mahasiswa-bimbingan" element={<MahasiswaBimbingan />} />
            <Route path="monitoring-logbook" element={<MonitoringLogbook />} />
            <Route path="laporan" element={<LaporanMagangPage />} />
            <Route path="penilaian-magang" element={<PenilaianMagangPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin */}
          <Route path="admin" element={<Outlet />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="data-mahasiswa" element={<DataMahasiswaPage />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="profile" element={<ProfileAdminPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="pengumuman" element={<Pengumuman />} />
            <Route path="verifikasi-pendaftaran" element={<VerifPendaftaran />} />
            <Route path="lowongan-magang" element={<AdminLowonganPage />} />
          </Route>

          {/* Auth */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryProvider>
  </StrictMode>,
);

