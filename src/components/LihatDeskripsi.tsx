import { X } from "lucide-react";

export function LihatDeskripsi({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="flex-1 bg-black/20" onClick={onClose} />
      <div className="w-[420px] bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="p-8 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-[#0f172a] text-2xl font-bold">Frontend Developer</h2>
              <p className="text-[#475569] text-base mt-0.5">PT. Teknologi Maju</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 mt-0.5 transition-colors">
              <X size={22} />
            </button>
          </div>

          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-[#0f172a] mb-2">Deskripsi Pekerjaan :</h3>
              <ul className="space-y-2 list-disc list-outside ml-4">
                {[
                  "Mengembangkan dan mengimplementasikan tampilan antarmuka website/aplikasi yang responsif dan user-friendly.",
                  "Mengubah desain UI/UX dari Figma menjadi halaman web interaktif menggunakan HTML, CSS, JavaScript, dan framework frontend.",
                  "Memastikan kompatibilitas tampilan website di berbagai perangkat dan browser.",
                  "Berkolaborasi dengan tim UI/UX Designer dan Backend Developer dalam pengembangan fitur aplikasi.",
                  "Melakukan testing, debugging, dan perbaikan bug pada sisi frontend.",
                  "Mengoptimalkan performa website untuk meningkatkan pengalaman pengguna.",
                  "Menjaga konsistensi desain dan standar coding dalam pengembangan frontend.",
                  "Membantu maintenance serta pengembangan fitur baru pada website/aplikasi perusahaan.",
                  "Mengikuti perkembangan teknologi frontend terbaru untuk mendukung pengembangan sistem yang lebih modern.",
                ].map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#0f172a] mb-2">Kualifikasi :</h3>
              <ul className="space-y-2 list-disc list-outside ml-4">
                {[
                  "Minimal mahasiswa aktif atau lulusan D3/S1 Teknik Informatika, Sistem Informasi, atau bidang terkait.",
                  "Memahami dasar HTML, CSS, dan JavaScript.",
                  "Memiliki pengalaman menggunakan framework frontend seperti React.js, Vue.js, atau sejenisnya menjadi nilai tambah.",
                  "Memahami konsep responsive design dan REST API integration.",
                  "Terbiasa menggunakan Git/GitHub untuk version control.",
                  "Memiliki kemampuan problem solving dan komunikasi yang baik.",
                  "Mampu bekerja secara individu maupun dalam tim.",
                  "Memiliki ketertarikan pada pengembangan UI/UX dan teknologi web modern.",
                ].map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
