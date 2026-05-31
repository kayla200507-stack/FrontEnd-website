import { Link, useLocation } from "react-router-dom";

type NavlinkProps = {
  href: string;
  icon: any;
  label: string;
};

export const Navlink = ({ href, icon: Icon, label }: NavlinkProps) => {
  const location = useLocation();

  const active = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
      ${
        active
          ? "bg-[#DDEEFF] text-[#3D5DA8]"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      <Icon size={18} />

      {label}
    </Link>
  );
};
