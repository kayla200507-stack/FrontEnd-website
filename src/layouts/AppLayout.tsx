import { Outlet } from "react-router-dom";

import { Navbar } from "../components/features/landing/Navbar";
import Footer from "../components/features/landing/Footer";

export default function AppLayout() {
  return (
    <div className="mfont-sans text-gray-800 bg-white">
      <Navbar />
      <main className="min-h-screen mt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
