import {
  Route,
  useNavigate,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Navigator } from "../components/common/Navigator";
import { usePendaftaranStore } from "../stores/pendaftaranStore";

// Landing pages
import { Beranda } from "../pages/Landing/Beranda";
import { Lowongan } from "../pages/Landing/Lowongan";
import { DetailLowongan } from "../pages/Landing/DetailLowongan";
import { Tentang } from "../pages/Landing/Tentang";
import { LupaKataSandi } from "../pages/Landing/LupaKataSandi";

// Mahasiswa pages
import { DashboardPage } from "../pages/Mahasiswa/DashboardPage";
import { LowonganPage } from "../pages/Mahasiswa/LowonganPage";
import { DetailLowonganPage } from "../pages/Mahasiswa/MahasiswaDetailLowongan";
import {
  StatusList,
  StatusLihatBerkas,
  StatusDetailBerkas,
  StatusKonfirmasiKesediaan,
  StatusPembekalan,
  StatusPenandatanganan,
  StatusMulaiMagang,
} from "../pages/Mahasiswa/StatusPages";
import { LogbookPage } from "../pages/Mahasiswa/LogbookPage";
import { LaporanPage } from "../pages/Mahasiswa/LaporanPage";
import { KalenderPage } from "../pages/Mahasiswa/KalenderPage";
import MahasiswaSettingsPage from "../pages/Mahasiswa/SettingsPage";
import { UnggahDokumenPage } from "../pages/Mahasiswa/UnggahDokumen";

// ── Dashboard ──
const DashboardWrapper = () => {
  const navigate = useNavigate();
  return (
    <DashboardPage onNavigate={(p: string) => navigate(`/mahasiswa/${p}`)} />
  );
};

// ── Lowongan ──
const LowonganWrapper = () => {
  const navigate = useNavigate();
  return (
    <LowonganPage
      onApply={() => navigate("/mahasiswa/upload")}
      onViewDetail={(id: string | number) =>
        navigate(`/mahasiswa/lowongan/${id}`)
      }
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
  const selectedLowongan = usePendaftaranStore(
    (state) => state.selectedLowongan,
  );
  return (
    <UnggahDokumenPage
      onBack={() => navigate("/mahasiswa/lowongan")}
      onViewDesc={() => {
        if (selectedLowongan) {
          navigate(`/mahasiswa/lowongan/${selectedLowongan.id_lowongan}`);
        }
      }}
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
  const setSelectedDocument = usePendaftaranStore(
    (state) => state.setSelectedDocument,
  );
  return (
    <StatusLihatBerkas
      onBack={() => navigate("/mahasiswa/status")}
      onViewDetail={(document) => {
        setSelectedDocument(document);
        navigate("/mahasiswa/status-detail");
      }}
    />
  );
};

const StatusDetailBerkasWrapper = () => {
  const navigate = useNavigate();
  return (
    <StatusDetailBerkas onBack={() => navigate("/mahasiswa/status-berkas")} />
  );
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
  return <MahasiswaSettingsPage />;
};

const noNavFooter = ["/auth/login", "/auth/register", "/lupa-kata-sandi"];

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
  </Route>
);

export const MahasiswaRoutes = (
  <Route path="/mahasiswa">
    <Route index element={<DashboardWrapper />} />
    <Route path="lowongan" element={<LowonganWrapper />} />
    <Route path="lowongan/:id" element={<MahasiswaDetailWrapper />} />
    <Route path="dashboard" element={<DashboardWrapper />} />
    <Route path="status" element={<StatusListWrapper />} />
    <Route path="status-berkas" element={<StatusLihatBerkasWrapper />} />
    <Route path="status-detail" element={<StatusDetailBerkasWrapper />} />
    <Route path="status-konfirmasi" element={<StatusKonfirmasiWrapper />} />
    <Route path="status-pembekalan" element={<StatusPembekalanWrapper />} />
    <Route
      path="status-penandatanganan"
      element={<StatusPenandatangananWrapper />}
    />
    <Route path="status-mulai-magang" element={<StatusMulaiMagangWrapper />} />
    <Route path="logbook" element={<LogbookPage />} />
    <Route path="laporan" element={<LaporanPage />} />
    <Route path="kalender" element={<KalenderPage />} />
    <Route path="settings" element={<EditProfileWrapper />} />
    <Route path="upload" element={<UnggahDokumenWrapper />} />
  </Route>
);
