// pages/Dosen/components/StatusCard.tsx
import { Card } from "@/components/common/Card";
import { cn } from "@/lib/utils";
import React from "react";

interface StatusCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red" | "purple";
}

const StatusCard: React.FC<StatusCardProps> = ({
  label,
  value,
  icon,
  color,
}) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
    purple: "text-purple-600",
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p
            className={cn(
              "text-2xl font-bold text-gray-800",
              colorClasses[color],
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
