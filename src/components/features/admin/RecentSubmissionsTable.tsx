import React from 'react';

interface Submission {
  nim: string;
  name: string;
  company: string;
  date: string;
  status: 'pending' | 'revision' | 'approved';
}

interface RecentSubmissionTableProps {
  submissions: Submission[];
  onViewAll: () => void;
  onViewDetail: (submission: Submission) => void;
}

export const RecentSubmissionTable: React.FC<RecentSubmissionTableProps> = ({
  submissions,
  onViewAll,
  onViewDetail
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'revision':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu';
      case 'revision':
        return 'Revisi';
      case 'approved':
        return 'Disetujui';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      {/* Table Header Action */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base text-blue-600">Pengajuan Masuk Terbaru</h3>
          <p className="text-xs text-gray-400 mt-0.5">Daftar pengajuan yang perlu diverifikasi</p>
        </div>
        <button 
          onClick={onViewAll}
          className="px-4 py-2 text-xs font-bold border border-gray-200 text-gray-800 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Lihat Semua
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-800 font-bold bg-gray-50/50">
              <th className="p-4 pl-6 text-xs uppercase tracking-wider text-gray-500">NIM</th>
              <th className="p-4 text-xs uppercase tracking-wider text-gray-500">Nama</th>
              <th className="p-4 text-xs uppercase tracking-wider text-gray-500">Perusahaan</th>
              <th className="p-4 text-xs uppercase tracking-wider text-gray-500">Tanggal Pengajuan</th>
              <th className="p-4 text-xs uppercase tracking-wider text-gray-500">Status Dokumen</th>
              <th className="p-4 pr-6 text-xs uppercase tracking-wider text-gray-500 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-600">
            {submissions.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/40 transition-colors">
                <td className="p-4 pl-6 text-xs font-medium">{item.nim}</td>
                <td className="p-4 font-bold text-gray-900 text-xs">{item.name}</td>
                <td className="p-4 text-xs">{item.company}</td>
                <td className="p-4 text-xs">{item.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${getStatusBadge(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </td>
                <td className="p-4 pr-6 flex gap-2 justify-center items-center">
                  <button 
                    onClick={() => onViewDetail(item)}
                    className="px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Detail
                  </button>
                  <button 
                    onClick={() => onViewDetail(item)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Verifikasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSubmissionTable;