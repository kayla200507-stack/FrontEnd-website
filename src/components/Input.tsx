import type { LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  suffixIcon?: LucideIcon;
  prefixIcon?: LucideIcon;
  onClickSuffixIcon?: () => void;
  onClickPrefixIcon?: () => void;
}

export const Input = ({
  error,
  suffixIcon,
  prefixIcon,
  prefix,
  placeholder,
  className,
  type,
  onClickPrefixIcon,
  onClickSuffixIcon,
  ...props
}: InputProps) => {
  const PrefixIcon = prefixIcon;
  return (
    <div className="relative w-full">
      {PrefixIcon && (
        <PrefixIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "block w-full px-4 py-1.5 outline-none border border-black/30 rounded-lg bg-[#F3F3F5] text-black placeholder:text-gray-500 placeholder:font-semibold",
          PrefixIcon && "px-10"
        )}
      />
    </div>
  );
};
