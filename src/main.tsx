import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/Login.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import LowonganPage from "./pages/Auth/Mahasiswa/LowonganPage.tsx";
import StatusPage from "./pages/Auth/Mahasiswa/StatusPage.tsx";
import LogbookPage from "./pages/Auth/Mahasiswa/LogbookPage.tsx";
import DashboardPage from "./pages/Auth/Mahasiswa/Dashboard.tsx";
import LaporanPage from "./pages/Auth/Mahasiswa/LaporanPage.tsx";

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
        </Route>
        <Route index element={<App />}></Route>
        <Route path="auth">
          <Route path="login" element={<LoginPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
