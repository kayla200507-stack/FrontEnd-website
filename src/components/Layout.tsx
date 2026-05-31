import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const lowonganPages = ["lowongan", "upload", "pertanyaan"];
const statusPages = ["status", "status-berkas", "status-detail", "status-konfirmasi", "status-pembekalan", "status-penandatanganan", "status-mulai-magang"];

export function Layout() {
  const location = useLocation();
  // Get all path segments after /mahasiswa/
  const segments = location.pathname.replace("/mahasiswa", "").split("/").filter(Boolean);
  const firstSegment = segments[0] || "dashboard";
  
  const activeSection = lowonganPages.includes(firstSegment)
    ? "lowongan"
    : statusPages.includes(firstSegment)
    ? "status"
    : firstSegment;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} />
        <main className="flex-1 bg-[#f3f4f6] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
