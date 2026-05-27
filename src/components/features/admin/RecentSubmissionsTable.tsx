import React from 'react';

export const RecentSubmissionTable = () => {
  // Data dummy tiruan untuk sementara agar dashboard nampil
  const dummySubmissions = [
    { id: 1, nama: "Budi Santoso", posisi: "Frontend Developer", status: "Menunggu" },
    { id: 2, nama: "Siti Rahmawati", posisi: "UI/UX Designer", status: "Menunggu" },
    { id: 3, nama: "Ahmad Fauzi", posisi: "Backend Developer", status: "Menunggu" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengajuan Terbaru</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500">
              <th className="pb-3 font-medium">Nama Mahasiswa</th>
              <th className="pb-3 font-medium">Posisi Pengajuan</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {dummySubmissions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="py-3 font-medium">{item.nama}</td>
                <td className="py-3 text-gray-500">{item.posisi}</td>
                <td className="py-3">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {item.status}
                  </span>
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