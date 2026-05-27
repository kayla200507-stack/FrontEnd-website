// src/pages/Admin/Dashboard.tsx
import React, { useState } from 'react';

// FIX 1: AdminLayout tanpa kurung kurawal
import AdminLayout from '../../layouts/AdminLayout'; 

// FIX 2: Kembalikan import FilterSection & RecentSubmissionsTable
import { FilterSection } from '../../components/features/admin/FilterSection';
import { RecentSubmissionsTable } from '../../components/features/admin/RecentSubmissionsTable';

import { Users, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const statsData = [
    {
      title: 'Total Mahasiswa',
      value: '234',
      change: { value: '+12 bulan ini', isPositive: true },
      icon: Users,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50'
    },
    {
      title: 'Menunggu Verifikasi',
      value: '8',
      change: { value: 'Perlu ditindaklanjuti', isPositive: false },
      icon: Clock,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-50'
    },
    {
      title: 'Sedang Magang',
      value: '89',
      subtitle: '38% dari total',
      icon: TrendingUp,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50'
    },
    {
      title: 'Selesai Magang',
      value: '127',
      subtitle: 'Semester ini',
      icon: CheckCircle,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50'
    }
  ];

  const submissions = [
    {
      nim: '11210001',
      name: 'Budi Santoso',
      company: 'PT Teknologi Maju',
      date: '25 Maret 2026',
      status: 'pending' as const
    },
    {
      nim: '11210002',
      name: 'Siti Rahmawati',
      company: 'PT Digital Kreatif',
      date: '25 Maret 2026',
      status: 'revision' as const
    },
    {
      nim: '11210003',
      name: 'Ahmad Fauzi',
      company: 'PT Inovasi Sistem',
      date: '24 Maret 2026',
      status: 'revision' as const
    },
    {
      nim: '11210004',
      name: 'Dewi Lestari',
      company: 'PT Media Online',
      date: '24 Maret 2026',
      status: 'approved' as const
    },
    {
      nim: '11210005',
      name: 'Rudi Hermawan',
      company: 'PT Solusi Digital',
      date: '23 Maret 2026',
      status: 'pending' as const
    }
  ];

  const handleMenuChange = (menuId: string, submenuId?: string) => {
    setActiveMenu(menuId);
    console.log('Menu changed:', menuId, submenuId);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleSearch = (keyword: string) => {
    console.log('Search:', keyword);
  };

  const handleFilterChange = (filter: string) => {
    console.log('Filter:', filter);
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    console.log('Date range:', startDate, endDate);
  };

  const handleExport = () => {
    console.log('Export data');
  };

  const handleViewAll = () => {
    console.log('View all submissions');
  };

  const handleViewDetail = (submission: any) => {
    console.log('View detail:', submission);
  };

  return (
    <AdminLayout
      title="Dashboard"
      breadcrumb={['Dashboard']}
      activeMenu={activeMenu}
      onMenuChange={handleMenuChange}
      onLogout={handleLogout}
    >

      <FilterSection
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onExport={handleExport}
      />

      <div className="mt-6">
        <RecentSubmissionsTable
          submissions={submissions}
          onViewAll={handleViewAll}
          onViewDetail={handleViewDetail}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;