import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "outline"
  | "success"
  | "danger"
  | "destructive"
  | "blue"
  | "purple";

interface BadgeProps {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  const variants = {
    default: "bg-black text-white",
    outline: "bg-transparent text-black border",
    success: "text-green-600 bg-green-50",
    danger: "text-yellow-600 bg-yellow-50",
    destructive: "text-red-500 bg-red-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
  };
  return (
    <div
      className={cn(
        "px-2  py-1 rounded-md inline-flex text-xs",
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
