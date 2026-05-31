import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "./components/ui/sonner";
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

import { LandingRoutes, MahasiswaRoutes } from "./routes/MahasiswaRoutes";
import LoginPage from "./pages/Auth/Login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing & Public */}
          {LandingRoutes}

          {/* Mahasiswa */}
          {MahasiswaRoutes}

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

