import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffixIcon?: LucideIcon;
  onClickSuffixIcon?: () => void;
  error?: string;
}
export function Input({
  className,
  suffixIcon,
  onClickSuffixIcon,
  error,
  ...props
}: InputProps) {
  const baseStyles =
    "w-full px-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-10";
  const SuffixIcon = suffixIcon;
  return (
    <div>
      <div className="relative">
        <input className={cn(baseStyles, className)} {...props} />
        {SuffixIcon && (
          <SuffixIcon
            size={24}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={onClickSuffixIcon}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
