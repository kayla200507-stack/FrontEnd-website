import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import LoginPage from "./pages/Auth/Login.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import QueryProvider from "./providers/QueryProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import DashboardPage from "./pages/Mahasiswa/Dashboard.tsx";
import DashboardDosen from "./pages/Dosen/Dashboard.tsx";
import DosenLayout from "./layouts/DosenLayout.tsx";
import MahasiswaBimbingan from "./pages/Dosen/MahasiswaBimbingan.tsx";
import MonitoringLogbook from "./pages/Dosen/MonitoringLogbook.tsx";
import LaporanMagangPage from "./pages/Dosen/LaporanMagang.tsx";
import PenilaianMagangPage from "./pages/Dosen/PenilaianMagangPage.tsx";
import SettingsPage from "./pages/Dosen/SettingPage.tsx";
import MahasiswaLayout from "./layouts/MahasiswaLayout.tsx";

import LaporanPage from "./pages/Mahasiswa/LaporanPage.tsx";
import StatusPage from "./pages/Mahasiswa/StatusPage.tsx";
import LogbookPage from "./pages/Mahasiswa/LogbookPage.tsx";
import ProfilePage from "./pages/Mahasiswa/ProfilePage.tsx";
import KalenderPage from "./pages/Mahasiswa/KalenderPage.tsx";
import LowonganPage from "./pages/Mahasiswa/LowonganPage.tsx";

import profileAdmin from "./pages/Admin/ProfileAdmin.Page.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="lowongan" element={<LowonganPage />} />
          </Route>

          <Route path="mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="lowongan" element={<LowonganPage />} />
            <Route path="laporan" element={<LaporanPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="logbook" element={<LogbookPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="kalender" element={<KalenderPage />} />
          </Route>
          {/* Dosenn */}
          <Route path="dosen" element={<DosenLayout />}>
            <Route index element={<DashboardDosen />} />
            <Route
              path="mahasiswa-bimbingan"
              element={<MahasiswaBimbingan />}
            />
            <Route path="monitoring-logbook" element={<MonitoringLogbook />} />
            <Route path="laporan" element={<LaporanMagangPage />} />
            <Route path="penilaian-magang" element={<PenilaianMagangPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin */}
          <Route path="admin" element={<profileAdmin />} /> 

          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryProvider>
  </StrictMode>,
);
