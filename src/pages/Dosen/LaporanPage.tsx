// Di dalam LaporanPage.tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Tambahkan button
<button
  onClick={() => navigate("/review-laporan")}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Review Laporan Mahasiswa
</button>;
