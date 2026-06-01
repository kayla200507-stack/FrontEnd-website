import { cn } from "@/lib/utils";

export function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableRow({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>;
}

export function TableHeader({ children }: { children?: React.ReactNode }) {
  return <thead className="bg-gray-50"></thead>;
}

export function TableHead({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableBody({ children }: { children?: React.ReactNode }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
}

export function TableCol({
  children,
  className,
  colSpan,
}: {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
        className,
      )}
    >
      {children}
    </td>
  );
}
