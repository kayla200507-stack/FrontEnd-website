import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("p-5 rounded-xl border bg-white", className)}>{children}</div>
  );
}
