import { Card } from "@/components/common/Card";
import { cn } from "@/lib/utils";
import React from "react";

interface StatusCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red" | "purple";
}

const colorClasses = {
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  yellow: "text-yellow-600 bg-yellow-50",
  red: "text-red-600 bg-red-50",
  purple: "text-purple-600 bg-purple-50",
};

const StatusCard: React.FC<StatusCardProps> = ({
  label,
  value,
  icon,
  color,
}) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {icon && (
          <div className={cn("p-3 rounded-xl", colorClasses[color])}>
            {icon}
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          <p
            className={cn(
              "text-2xl font-bold mt-1",
              colorClasses[color].split(" ")[0],
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
