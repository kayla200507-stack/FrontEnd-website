import type { LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";

interface NavLinkProps {
  label: string;
  icon: LucideIcon;
  href: string;
}
export const NavLink = ({ label, icon, href }: NavLinkProps) => {
  const pathname = window.location.pathname;
  const Icon = icon;
  return (
    <a
      href={href}
      className={cn(
        " flex gap-2  items-center w-full px-3 py-2 rounded-lg  font-medium",
        pathname === href ? "bg-[#BDD8E9] text-[#5A5A55]" : "text-black",
      )}
    >
      <div
        className={cn(
          "aspect-square size-8 shadow-sm rounded-full bg-[#A7A7A5]/30 flex justify-center items-center ",
          pathname === href ? "text-white" : "text-blue-500",
        )}
      >
        <Icon size={18} />
      </div>
      {label}
    </a>
  );
};
