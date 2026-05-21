import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import LoginPage from "./pages/Auth/Login.tsx";

// IMPORT KELOMPOK ADMIN
import AdminLoginPage from "./pages/Auth/Admin/Login.tsx";
import AdminDashboardPage from "./pages/Auth/Admin/AdminDashboard.tsx"; // Nama diubah agar tidak bentrok dengan milik mahasiswa

import DashboardLayout from "./layouts/DashboardLayout.tsx";

// IMPORT KELOMPOK MAHASISWA
import LowonganPage from "./pages/Auth/Mahasiswa/LowonganPage.tsx";
import StatusPage from "./pages/Auth/Mahasiswa/StatusPage.tsx";
import LogbookPage from "./pages/Auth/Mahasiswa/LogbookPage.tsx";
import DashboardPage from "./pages/Auth/Mahasiswa/Dashboard.tsx"; // Ini untuk dashboard mahasiswa
import LaporanPage from "./pages/Auth/Mahasiswa/LaporanPage.tsx";
import SettingsPage from "./pages/Auth/Mahasiswa/SettingsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 1. RUTE LANDING PAGE */}
        <Route path="/" element={<App />} />

        {/* 2. RUTE LAYOUT & HALAMAN MAHASISWA */}
        <Route path="mahasiswa" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="lowongan" element={<LowonganPage />} />
          <Route path="laporan" element={<LaporanPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="logbook" element={<LogbookPage />} />
          <Route path="settings" element={<SettingsPage />} /> 
        </Route>

        {/* 3. RUTE AUTH MAHASISWA */}
        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* 4. RUTE KHUSUS ADMIN */}
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);