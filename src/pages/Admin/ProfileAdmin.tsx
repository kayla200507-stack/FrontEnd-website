import React, { useState } from 'react';
import { AdminLayout } from '../../components/features/admin/AdminLayout';
import { User, Mail, Shield, Building2, Phone, Calendar } from 'lucide-react';

const ProfileAdminPage = () => {
  const [activeMenu, setActiveMenu] = useState('settings');

  const adminInfo = {
    name: 'Kayla Haniyah',
    role: 'Admin Akademik',
    email: 'admin@vokasimangag.com',
    phone: '081234567890',
    department: 'D3 Teknologi Informasi',
    joinDate: '10 Januari 2025'
  };

  const handleMenuChange = (menuId: string, submenuId?: string) => {
    setActiveMenu(menuId);
    console.log('Menu changed:', menuId, submenuId);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <AdminLayout
      title="Profil Admin"
      breadcrumb={['Profil']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={handleLogout}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header/Card Background */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:space-x-5 mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt="Profile Admin"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
              />
              <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{adminInfo.name}</h2>
                <p className="text-blue-600 font-semibold text-sm">{adminInfo.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detail Informasi */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Detail Akun
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">Nama Lengkap</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{adminInfo.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {adminInfo.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Nomor Telepon</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {adminInfo.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Organisasi & Jabatan */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Wewenang & Departemen
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">Departemen / Prodi</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  {adminInfo.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Tanggal Bergabung</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {adminInfo.joinDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Tingkat Hak Akses</p>
                <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mt-1">
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfileAdminPage;
