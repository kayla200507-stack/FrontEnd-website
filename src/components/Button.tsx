import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "destructive";
  size?: "sm" | "regular" | "lg";
}

export const Button = ({
  variant = "primary",
  size = "regular",
  className,
  children,
}: ButtonProps) => {
  const variants = {
    primary: "bg-black text-white",
    outline: "bg-white border-1 text-black border-black/30",
    destructive: "bg-red-500 text-white",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    regular: "px-4 py-1.5",
    lg: "px-4 py-2.5",
  };

  return (
    <button
      className={cn(
        "inline-flex gap-2 items-center justify-center rounded-sm",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
};
