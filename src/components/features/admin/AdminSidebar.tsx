// src/components/AdminSidebar.tsx
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  Megaphone, 
  Settings, 
  LogOut,
  ChevronDown,
  Building2,
  X
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: { id: string; label: string }[];
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onMenuChange: (menuId: string, submenuId?: string) => void;
  onLogout: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'data-mahasiswa',
    label: 'Data Mahasiswa',
    icon: Users,
    submenu: [
      { id: 'verifikasi-pendaftaran', label: 'Verifikasi Pendaftaran' },
      { id: 'pengumuman', label: 'Pengumuman' }
    ]
  },
  {
    id: 'verifikasi-magang',
    label: 'Verifikasi Magang',
    icon: FileCheck
  },
  {
    id: 'pengumuman',
    label: 'Pengumuman',
    icon: Megaphone
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onClose,
  activeMenu,
  onMenuChange,
  onLogout
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(['data-mahasiswa']);

  const toggleSubmenu = (menuId: string) => {
    setOpenSubmenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">Vokasi Magang</span>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 m-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              AD
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Admin Utama</h3>
              <p className="text-xs text-gray-500">admin@vokasimangag.com</p>
              <span className="text-xs text-blue-600">Super Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isOpenSubmenu = openSubmenus.includes(item.id);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isActive = activeMenu === item.id || 
              (hasSubmenu && item.submenu?.some(sub => sub.id === activeMenu));

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      onMenuChange(item.id);
                      onClose();
                    }
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {hasSubmenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpenSubmenu ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {hasSubmenu && isOpenSubmenu && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.submenu?.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onMenuChange(item.id, sub.id);
                          onClose();
                        }}
                        className={`
                          w-full text-left px-4 py-2 text-sm rounded-lg transition-colors
                          ${activeMenu === sub.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-500 hover:bg-gray-100'
                          }
                        `}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};