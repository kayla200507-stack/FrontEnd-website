import { Route, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";

// Landing pages
import { Beranda } from "../pages/Landing/Beranda";
import { Lowongan } from "../pages/Landing/Lowongan";
import { DetailLowongan } from "../pages/Landing/DetailLowongan";
import { Tentang } from "../pages/Landing/Tentang";
import { Login } from "../pages/Landing/Login";
import { Daftar } from "../pages/Landing/Daftar";
import { LupaKataSandi } from "../pages/Landing/LupaKataSandi";

// Mahasiswa pages
import { DashboardPage } from "../pages/Mahasiswa/DashboardPage";
import { LowonganPage } from "../pages/Mahasiswa/LowonganPage";
import { DetailLowonganPage } from "../pages/Mahasiswa/MahasiswaDetailLowongan";
import { StatusList, StatusLihatBerkas, StatusDetailBerkas, StatusKonfirmasiKesediaan, StatusPembekalan, StatusPenandatanganan, StatusMulaiMagang } from "../pages/Mahasiswa/StatusPages";
import { LogbookPage } from "../pages/Mahasiswa/LogbookPage";
import { LaporanPage } from "../pages/Mahasiswa/LaporanPage";
import { KalenderPage } from "../pages/Mahasiswa/KalenderPage";
import { EditProfilePage } from "../pages/Mahasiswa/EditProfilePage";
import { UnggahDokumenPage } from "../pages/Mahasiswa/UnggahDokumen";
import { PertanyaanPerusahaanPage } from "../pages/Mahasiswa/PertanyaanPerusahaan";

// ── Dashboard ──
const DashboardWrapper = () => {
  const navigate = useNavigate();
  return <DashboardPage onNavigate={(p: string) => navigate(`/mahasiswa/${p}`)} />;
};

// ── Lowongan ──
const LowonganWrapper = () => {
  const navigate = useNavigate();
  return (
    <LowonganPage
      onApply={() => navigate("/mahasiswa/upload")}
      onViewDetail={(id: string | number) => navigate(`/mahasiswa/lowongan/${id}`)}
    />
  );
};

const MahasiswaDetailWrapper = () => {
  const navigate = useNavigate();
  return (
    <DetailLowonganPage
      onBack={() => navigate("/mahasiswa/lowongan")}
      onApply={() => navigate("/mahasiswa/upload")}
    />
  );
};

// ── Upload & Pertanyaan (pendaftaran flow) ──
const UnggahDokumenWrapper = () => {
  const navigate = useNavigate();
  return (
    <UnggahDokumenPage
      onBack={() => navigate("/mahasiswa/lowongan")}
      onNext={() => navigate("/mahasiswa/pertanyaan")}
      onViewDesc={() => navigate("/mahasiswa/lowongan/1")}
    />
  );
};

const PertanyaanWrapper = () => {
  const navigate = useNavigate();
  return (
    <PertanyaanPerusahaanPage
      onBack={() => navigate("/mahasiswa/upload")}
      onNext={() => navigate("/mahasiswa/status")}
      onViewDesc={() => navigate("/mahasiswa/lowongan/1")}
    />
  );
};

// ── Status flow ──
const StatusListWrapper = () => {
  const navigate = useNavigate();
  return (
    <StatusList
      onViewBerkas={() => navigate("/mahasiswa/status-berkas")}
      onViewProgress={() => navigate("/mahasiswa/status-konfirmasi")}
    />
  );
};

const StatusLihatBerkasWrapper = () => {
  const navigate = useNavigate();
  return (
    <StatusLihatBerkas
      onBack={() => navigate("/mahasiswa/status")}
      onViewDetail={() => navigate("/mahasiswa/status-detail")}
    />
  );
};

const StatusDetailBerkasWrapper = () => {
  const navigate = useNavigate();
  return <StatusDetailBerkas onBack={() => navigate("/mahasiswa/status-berkas")} />;
};

const StatusKonfirmasiWrapper = () => {
  const navigate = useNavigate();
  return (
    <StatusKonfirmasiKesediaan
      onBack={() => navigate("/mahasiswa/status")}
      onNext={() => navigate("/mahasiswa/status-pembekalan")}
    />
  );
};

const StatusPembekalanWrapper = () => {
  const navigate = useNavigate();
  return (
    <StatusPembekalan
      onBack={() => navigate("/mahasiswa/status-konfirmasi")}
      onNext={() => navigate("/mahasiswa/status-penandatanganan")}
    />
  );
};

const StatusPenandatangananWrapper = () => {
  const navigate = useNavigate();
  return (
    <StatusPenandatanganan
      onBack={() => navigate("/mahasiswa/status-pembekalan")}
      onNext={() => navigate("/mahasiswa/status-mulai-magang")}
    />
  );
};

const StatusMulaiMagangWrapper = () => {
  const navigate = useNavigate();
  return <StatusMulaiMagang onBack={() => navigate("/mahasiswa/status")} />;
};

// ── Profile ──
const EditProfileWrapper = () => {
  const navigate = useNavigate();
  return <EditProfilePage onBack={() => navigate(-1)} />;
};

const noNavFooter = ["/login", "/daftar", "/lupa-kata-sandi"];

export function Root() {
  const location = useLocation();
  const hideNavFooter = noNavFooter.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

export const LandingRoutes = (
  <Route path="/" element={<Root />}>
    <Route index element={<Beranda />} />
    <Route path="lowongan" element={<Lowongan />} />
    <Route path="lowongan/:id" element={<DetailLowongan />} />
    <Route path="tentang" element={<Tentang />} />
    <Route path="login" element={<Login />} />
    <Route path="daftar" element={<Daftar />} />
    <Route path="lupa-kata-sandi" element={<LupaKataSandi />} />
  </Route>
);

export const MahasiswaRoutes = (
  <Route path="/mahasiswa" element={<Layout />}>
    <Route index element={<DashboardWrapper />} />
    <Route path="lowongan" element={<LowonganWrapper />} />
    <Route path="lowongan/:id" element={<MahasiswaDetailWrapper />} />
    <Route path="dashboard" element={<DashboardWrapper />} />
    <Route path="status" element={<StatusListWrapper />} />
    <Route path="status-berkas" element={<StatusLihatBerkasWrapper />} />
    <Route path="status-detail" element={<StatusDetailBerkasWrapper />} />
    <Route path="status-konfirmasi" element={<StatusKonfirmasiWrapper />} />
    <Route path="status-pembekalan" element={<StatusPembekalanWrapper />} />
    <Route path="status-penandatanganan" element={<StatusPenandatangananWrapper />} />
    <Route path="status-mulai-magang" element={<StatusMulaiMagangWrapper />} />
    <Route path="logbook" element={<LogbookPage />} />
    <Route path="laporan" element={<LaporanPage />} />
    <Route path="kalender" element={<KalenderPage />} />
    <Route path="profil" element={<EditProfileWrapper />} />
    <Route path="upload" element={<UnggahDokumenWrapper />} />
    <Route path="pertanyaan" element={<PertanyaanWrapper />} />
  </Route>
);
