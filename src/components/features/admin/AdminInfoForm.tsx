export default function AdminInfoForm() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <h3 className="text-2xl font-bold text-slate-800 mb-8">
        Informasi Pribadi
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Nama */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nama Lengkap
          </label>

          <input
            type="text"
            defaultValue="Admin Akademik"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* NIP */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            NIP
          </label>

          <input
            type="text"
            defaultValue="1987654321"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            defaultValue="admin@universitas.ac.id"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Telepon */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nomor Telepon
          </label>

          <input
            type="tel"
            defaultValue="+62 812 3456 7890"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Jabatan */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Jabatan
          </label>

          <input
            type="text"
            defaultValue="Admin Akademik"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Departemen */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Departemen
          </label>

          <input
            type="text"
            defaultValue="Teknologi Informasi"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Universitas */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Universitas
          </label>

          <input
            type="text"
            defaultValue="Universitas Indonesia"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 bg-slate-50"
          />
        </div>

        {/* Kota */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kota
          </label>

          <input
            type="text"
            defaultValue="Jakarta"
            className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

      </div>

      {/* Alamat */}

      <div className="mt-6">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Alamat
        </label>

        <textarea
          rows={4}
          defaultValue="Jl. Pendidikan No.10, Jakarta Selatan"
          className="w-full border border-slate-200 rounded-2xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />

      </div>

    </div>
  );
}