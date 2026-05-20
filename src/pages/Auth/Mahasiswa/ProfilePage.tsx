import { Card } from "../../../components/Card";
import { DashboardHeader } from "../../../components/DashboardHeader";

import { Mail, GraduationCap, Phone, MapPin } from "lucide-react";

const ProfilePage = () => {
  const profileInfo = [
    {
      label: "zaidanfahry098@email.com",
      icon: Mail,
    },
    {
      label: "Universitas Brawijaya",
      icon: GraduationCap,
    },
  ];

  const contactInfo = [
    {
      label: "085770980489",
      icon: Phone,
    },
    {
      label: "Sumbersari, Malang",
      icon: MapPin,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <DashboardHeader title="Edit Profil" />

        <div className="flex gap-4">
          <button className="px-8 h-11 rounded-full border border-[#D1D5DB] bg-white text-[15px] font-medium">
            Batal
          </button>

          <button className="px-8 h-11 rounded-full bg-[#4769B1] text-white text-[15px] font-medium">
            Simpan
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="p-6 rounded-[24px] border border-[#E5E7EB] bg-white">
        <div className="flex items-start gap-6">
          {/* Profile Image */}
          <img
            src={"/Profiles/UserPersonal.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div className="w-full  ">
            {/* Left */}
            <div>
              <h1 className="text-[20px] font-bold text-[#4769B1]">
                Zaidan Fahry
              </h1>

              <p className="text-[14px] text-[#6B7280] mt-1">
                NIM: 253140700111055
              </p>

              {/* Dynamic Info */}
              <div className="flex items-center justify-between w-full">
                <div className="space-y-3 flex-1">
                  {profileInfo.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-[14px]  text-[#374151]"
                      >
                        <Icon size={18} className="text-[#6B7280]" />

                        <p>{item.label}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-5 text-[14px] text-[#374151] flex-1 ">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div key={index} className="flex items-center gap-3">
                        <Icon size={18} className="text-[#6B7280]" />

                        <p>{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Badge */}
              <div className="flex gap-3 mt-5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[12px] font-medium">
                  Teknologi Informasi
                </span>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[12px] font-medium">
                  Semester 5
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-[12px] font-medium">
                  IPK: 3.75
                </span>
              </div>
            </div>

            {/* Right Contact */}
          </div>
        </div>
      </Card>

      {/* Data Pribadi */}
      <Card className="p-6 rounded-[24px] border border-[#E5E7EB] bg-white">
        <div className="mb-6">
          <h2 className="text-[20px] font-semibold text-[#4769B1]">
            Data Pribadi
          </h2>

          <p className="text-[14px] text-[#6B7280] mt-1">
            Informasi detail tentang mahasiswa
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-[14px] font-medium mb-2 text-[#4769B1]">
              Nama Lengkap
            </label>

            <input
              type="text"
              defaultValue="Zaidan Fahry"
              className="w-full h-12 rounded-xl border border-[#D1D5DB] px-4 outline-none text-[14px]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-2 text-[#4769B1]">
              NIM
            </label>

            <input
              type="text"
              defaultValue="253140700111055"
              className="w-full h-12 rounded-xl border border-[#D1D5DB] px-4 outline-none text-[14px]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-2 text-[#4769B1]">
              Email
            </label>

            <input
              type="email"
              defaultValue="zaidanfahry098@email.com"
              className="w-full h-12 rounded-xl border border-[#D1D5DB] px-4 outline-none text-[14px]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-2 text-[#4769B1]">
              Nomor Telepon
            </label>

            <input
              type="text"
              defaultValue="085770980489"
              className="w-full h-12 rounded-xl border border-[#D1D5DB] px-4 outline-none text-[14px]"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-[14px] font-medium mb-2 text-[#4769B1]">
            Alamat
          </label>

          <input
            type="text"
            defaultValue="Sumbersari, Malang"
            className="w-full h-12 rounded-xl border border-[#D1D5DB] px-4 outline-none text-[14px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;