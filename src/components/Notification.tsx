import { Bell, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNotifikasi, useMarkNotifikasiAsRead } from "../hooks/useNotifikasi";
import { formatDistanceToNow } from "date-fns";

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: response, isLoading } = useNotifikasi();
  const { mutate: markAsRead } = useMarkNotifikasiAsRead();

  const rawData = response as any;
  const notifications = Array.isArray(rawData?.data) 
    ? rawData.data 
    : (Array.isArray(rawData?.data?.data) ? rawData.data.data : []);
  const unreadCount = notifications.filter((n: any) => !n.is_read).length;

  const handleMarkAsRead = (id: number) => {
    markAsRead(id);
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={() => setIsOpen((val) => !val)}>
        <Bell size={18} className="text-gray-600 hover:text-blue-600 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {unreadCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-3 pt-2 rounded-xl border border-gray-200 w-80 bg-white z-[60] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
            <p className="text-sm text-blue-800 font-bold">Notifikasi</p>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">
                {unreadCount} Baru
              </span>
            )}
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notif: any) => (
                <div 
                  key={notif.id_notifikasi} 
                  className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer relative ${!notif.is_read ? "bg-blue-50/30" : ""}`}
                  onClick={() => !notif.is_read && handleMarkAsRead(notif.id_notifikasi)}
                >
                  {!notif.is_read && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  )}
                  <p className={`text-xs text-gray-900 leading-tight ${!notif.is_read ? "font-bold" : "font-medium"}`}>
                    {notif.judul}
                  </p>
                  <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                    {notif.pesan}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-xs text-gray-400 italic">Tidak ada notifikasi</p>
              </div>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 text-center border-t border-gray-100">
              <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider">
                Lihat Semua
              </button>
            </div>
          )}
        </div>
      )}
      
      {isOpen && (
        <div
          className="inset-0 w-full h-screen fixed top-0 left-0 z-50 bg-black/0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
