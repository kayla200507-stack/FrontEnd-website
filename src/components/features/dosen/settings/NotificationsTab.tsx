import React from "react";

interface ToggleRowProps {
  title: string;
  desc: string;
  enabled: boolean;
  onToggle: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ title, desc, enabled, onToggle }) => (
  <div className="p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
    <div>
      <h4 className="font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  </div>
);

interface Props {
  pushNotif: boolean; emailReport: boolean; deadlineAlert: boolean;
  onTogglePush: () => void; onToggleEmail: () => void; onToggleDeadline: () => void;
}

export const NotificationsTab: React.FC<Props> = (p) => (
  <div className="p-6 sm:p-8">
    <h3 className="text-xl font-bold text-slate-800 mb-6">Pengaturan Notifikasi Bimbingan</h3>
    <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
      <ToggleRow title="Push Notification" desc="Pemberitahuan instan saat mahasiswa mengisi logbook baru" enabled={p.pushNotif} onToggle={p.onTogglePush} />
      <ToggleRow title="Email Laporan Bimbingan" desc="Rekap mingguan perkembangan magang mahasiswa ke email Anda" enabled={p.emailReport} onToggle={p.onToggleEmail} />
      <ToggleRow title="Pengingat Batas Penilaian" desc="Pengingat H-3 batas akhir penilaian laporan & ujian magang" enabled={p.deadlineAlert} onToggle={p.onToggleDeadline} />
    </div>
  </div>
);
