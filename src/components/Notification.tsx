import { Bell } from "lucide-react";
import { useState } from "react";

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <Bell
        size={18}
        className="cursor-pointer"
        onClick={() => setIsOpen((val) => !val)}
      />
      {isOpen && (
        <div className="absolute right-0    pt-2 rounded-lg border border-black/30 w-xs bg-white">
          <div className="border-b border-black/30 px-4 pb-2">
            <p className="text-sm text-blue-800 font-semibold">Notifikasi</p>
          </div>
          <div className="border-b border-black/30 px-4 py-2">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
          <div className="border-b border-black/30 px-4 py-2">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
          <div className="border-b border-black/30 px-4 py-2">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
          <div className="border-b border-black/30 px-4 py-2">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
          <div className="border-b border-black/30 px-4 py-2">
            <p className="font-medium text-xs text-black">
              Komentar baru dari dosen
            </p>
            <p className="text-xs text-[#4A5565]">2 jam yang lalu</p>
          </div>
        </div>
      )}
    </div>
  );
};
