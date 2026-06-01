import { LayoutDashboard, Briefcase, ClipboardList, BookOpen, FileBarChart, CalendarDays, Settings } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "lowongan", label: "Lowongan" },
  { id: "status", label: "Status" },
  { id: "logbook", label: "Logbook" },
  { id: "laporan", label: "Laporan" },
  { id: "kalender", label: "Kalender" },
];

const sidebarIcons: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={14} className="text-white" />,
  lowongan: <Briefcase size={14} className="text-white" />,
  status: <ClipboardList size={14} className="text-white" />,
  logbook: <BookOpen size={14} className="text-white" />,
  laporan: <FileBarChart size={14} className="text-white" />,
  kalender: <CalendarDays size={14} className="text-white" />,
};

function SidebarIcon({ id }: { id: string }) {
  const icon = sidebarIcons[id];
  if (!icon) return null;
  return (
    <div className="absolute flex items-center justify-center" style={{ left: 17, top: "50%", transform: "translateY(-50%)", width: 16, height: 16 }}>
      {icon}
    </div>
  );
}

export function Sidebar({ activeSection }: { activeSection: string }) {
  const navigate = useNavigate();

  return (
    <aside className="w-[215px] bg-white h-full border-r border-slate-100 shrink-0 relative overflow-clip flex flex-col">
      {/* Nav items container — absolute positioned exactly like Figma */}
      <div className="absolute left-[29px] top-[29px] w-[151.832px] flex flex-col gap-[14.414px]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const itemH = isActive ? 39.399 : 42.282;
          const ellipseLeft = isActive ? 12.49 : 11.53;
          const ellipseTop = isActive ? 6.73 : 8.65;
          return (
            <div
              key={item.id}
              className="relative shrink-0 w-full cursor-pointer"
              style={{ height: itemH }}
              onClick={() => {
                navigate(`/mahasiswa/${item.id}`);
              }}
            >
              {isActive && (
                <>
                  {/* Exact Figma active bg: left-[-3px] top-[-3px] w-[177px] h-[45px] */}
                  <div className="absolute bg-[#bdd8e9] h-[45px] left-[-3px] rounded-[6.727px] top-[-3px] w-[177px]" />
                  <div className="absolute bg-[#bdd8e9] blur-[2px] h-[45px] left-[-3px] rounded-[7px] top-[-3px] w-[177px]" />
                  {/* Exact Figma indicator: left-[183px] = sidebar right edge */}
                  <div className="absolute flex h-[46px] items-center justify-center left-[183px] top-[-4px] w-[3px]">
                    <div className="-scale-y-100 flex-none rotate-180">
                      <div className="bg-gradient-to-r border-[#bdd8e9] border-l-[3px] border-solid from-[rgba(59,130,246,0.3)] h-[46px] relative rounded-br-[12px] rounded-tr-[12px] to-[rgba(59,130,246,0)] w-[3px]">
                        <div className="absolute bg-gradient-to-r blur-[2px] border-[#bdd8e9] border-l-[3px] border-solid from-[rgba(59,130,246,0.06)] h-[44px] left-[-3px] rounded-br-[12px] rounded-tr-[12px] to-[rgba(59,130,246,0)] top-0 w-[3px]" />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* Ellipse bg — exact Figma position */}
              <div className="absolute w-[26.984px] h-[25.946px]" style={{ left: ellipseLeft, top: ellipseTop }}>
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.9838 25.9459">
                  <ellipse cx="13.4919" cy="12.973" fill="#A7A7A5" fillOpacity="0.3" rx="13.4919" ry="12.973" />
                </svg>
              </div>
              {/* Icon — exact Figma positioning per item */}
              <SidebarIcon id={item.id} />
              {/* Label */}
              <p
                className="-translate-y-1/2 absolute whitespace-nowrap not-italic leading-[19.219px]"
                style={{
                  left: 52.01,
                  top: "50%",
                  color: isActive ? "#5a5a55" : "#3a60a0",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom nav — pinned to bottom, exact Figma structure */}
      <div className="absolute bottom-0 left-[24px] right-[3px] pb-4 pt-[10px]">
        {/* Divider line: extends 11px left of container (left-[-11px] = 13px from sidebar) */}
        <div className="absolute top-0 h-px" style={{ left: -11, width: 188, backgroundColor: "rgba(58,96,160,0.5)" }} />
        <div className="h-[41px] relative cursor-pointer">
          {/* Ellipse */}
          <div className="absolute w-[28.08px] h-[27px]" style={{ left: 16, top: 7 }}>
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.08 27">
              <ellipse cx="14.04" cy="13.5" fill="#A7A7A5" fillOpacity="0.3" rx="14.04" ry="13.5" />
            </svg>
          </div>
          {/* Settings icon */}
          <div className="absolute flex items-center justify-center" style={{ left: 22, top: 13, width: 16, height: 16 }}>
            <Settings size={14} className="text-white" />
          </div>
          {/* Label */}
          <p
            className="-translate-y-1/2 absolute whitespace-nowrap not-italic leading-[20px]"
            style={{
              left: 59,
              top: "calc(50% + 2.01px)",
              color: "#3a60a0",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Settings
          </p>
        </div>
      </div>
    </aside>
  );
}
