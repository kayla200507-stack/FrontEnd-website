import React from 'react';

interface FilterSectionProps {
  onSearch?: (keyword: string) => void;
  onFilterChange?: (filter: string) => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  onExport?: () => void;
}

export const FilterSection = ({
  onSearch,
  onFilterChange,
  onDateRangeChange,
  onExport
}: FilterSectionProps) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm mt-6">
      <p className="text-gray-500 text-[14px]">Bagian Filter Section belum dibuat desainnya.</p>
    </div>
  );
};