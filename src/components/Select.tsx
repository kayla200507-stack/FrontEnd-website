import type { SelectHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export const Select = ({
  className,
  children,
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="border border-black/30 flex justify-between w-full">
      <select className={cn("", className)}>{children}</select>
    </div>
  );
};
