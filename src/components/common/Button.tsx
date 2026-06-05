import { cn } from "../../lib/utils";

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
    primary: "bg-primary text-white hover:bg-primary/90 transition-colors",
    outline: "bg-white border-1 text-primary border-primary/30 hover:bg-primary/5 transition-colors",
    destructive: "bg-red-500 text-white hover:bg-red-600 transition-colors",
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
