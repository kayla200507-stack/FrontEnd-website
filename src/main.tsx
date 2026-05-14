import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import LoginPage from "./pages/Auth/Login.tsx";

import DashboardLayout from "./layouts/DashboardLayout.tsx";

import LowonganPage from "./pages/Auth/Mahasiswa/LowonganPage.tsx";
import StatusPage from "./pages/Auth/Mahasiswa/StatusPage.tsx";
import LogbookPage from "./pages/Auth/Mahasiswa/LogbookPage.tsx";
import DashboardPage from "./pages/Auth/Mahasiswa/Dashboard.tsx";
import LaporanPage from "./pages/Auth/Mahasiswa/LaporanPage.tsx";
import SettingsPage from "./pages/Auth/Mahasiswa/SettingsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="mahasiswa" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="lowongan" element={<LowonganPage />} />
          <Route path="laporan" element={<LaporanPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="logbook" element={<LogbookPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<App />} />

        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);