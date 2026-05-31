import { Bell } from "lucide-react";

export const Notification = () => {
  return (
    <div className="relative">
      <Bell className="text-[#3D5DA8]" size={20} />

      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </div>
  );
};
