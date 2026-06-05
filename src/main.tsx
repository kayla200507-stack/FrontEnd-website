import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "./components/ui/sonner";
import DashboardDosen from "./pages/Dosen/Dashboard";
import MahasiswaBimbingan from "./pages/Dosen/MahasiswaBimbingan";
import MonitoringLogbook from "./pages/Dosen/MonitoringLogbook";
import LaporanMagangPage from "./pages/Dosen/LaporanMagang";
import PenilaianMagangPage from "./pages/Dosen/PenilaianMagangPage";
import SettingsPage from "./pages/Dosen/SettingPage";
import ProfileDosenPage from "./pages/Dosen/ProfileDosen";
import ProtectedLayout from "./layouts/ProtectedLayout";
import DashboardLayout from "./components/common/Dashboard/DashboardLayout";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import DataMahasiswaPage from "./pages/Admin/DataMahasiwa";
import AdminSettingsPage from "./pages/Admin/SettingsPage";
import Pengumuman from "./pages/Admin/Pengumuman";
import VerifPendaftaran from "./pages/Admin/VerifPendaftaran";
import AdminLowonganPage from "./pages/Admin/LowonganPage";
import UserListPage from "./pages/Admin/UserList";

import { LandingRoutes, MahasiswaRoutes } from "./routes/MahasiswaRoutes";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing & Public */}
          {LandingRoutes}

          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            {/* Mahasiswa Routes */}
            <Route element={<ProtectedLayout allowedRoles={["mahasiswa"]} />}>
              {MahasiswaRoutes}
            </Route>

            {/* Dosen Routes */}
            <Route element={<ProtectedLayout allowedRoles={["dosen"]} />}>
              <Route path="dosen">
                <Route index element={<DashboardDosen />} />
                <Route
                  path="mahasiswa-bimbingan"
                  element={<MahasiswaBimbingan />}
                />
                <Route
                  path="monitoring-logbook"
                  element={<MonitoringLogbook />}
                />
                <Route path="laporan" element={<LaporanMagangPage />} />
                <Route path="penilaian" element={<PenilaianMagangPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfileDosenPage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="data-mahasiswa" element={<DataMahasiswaPage />} />
                <Route path="users" element={<UserListPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="pengumuman" element={<Pengumuman />} />
                <Route
                  path="verifikasi-pendaftaran"
                  element={<VerifPendaftaran />}
                />
                <Route path="lowongan-magang" element={<AdminLowonganPage />} />
              </Route>
            </Route>
          </Route>

          {/* Auth */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryProvider>
  </StrictMode>,
);
