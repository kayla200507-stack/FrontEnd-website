import {
  Mail,
  Phone,
  MapPin,
  Building2,
  BadgeCheck,
  Camera,
} from "lucide-react";

export default function AdminProfileCard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start">

          <div className="relative">

            <div className="w-32 h-32 rounded-full bg-slate-100 overflow-hidden border-4 border-white shadow-md flex items-center justify-center">
              <span className="text-5xl font-bold text-slate-500">
                AK
              </span>
            </div>

            <button className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition">
              <Camera size={16}/>
            </button>

          </div>

          <button className="mt-5 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition">
            Ubah Foto
          </button>

        </div>

        {/* RIGHT */}
        <div className="flex-1">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

            <div>

              <h2 className="text-3xl font-bold text-slate-800">
                Admin Akademik
              </h2>

              <p className="text-slate-500 mt-1">
                NIP: 1987654321
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <span className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
                  Admin Akademik
                </span>

                <span className="bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2 rounded-full">
                  Fakultas Teknologi Informasi
                </span>

              </div>

            </div>

            <BadgeCheck
              size={34}
              className="text-emerald-500"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" size={20}/>
              <span className="text-slate-700">
                admin@universitas.ac.id
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" size={20}/>
              <span className="text-slate-700">
                +62 812 3456 7890
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="text-blue-600" size={20}/>
              <span className="text-slate-700">
                Universitas Indonesia
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" size={20}/>
              <span className="text-slate-700">
                Jakarta, Indonesia
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}