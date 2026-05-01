import { cn } from "../utils/cn";

export const Card = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl  w-full p-5 text-blue-800 space-y-2",
        className,
      )}
    >
      {children}
    </div>
  );
};
