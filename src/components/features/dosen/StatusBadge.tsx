import React from "react";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, Clock } from "lucide-react";

interface Props {
  status: "pending" | "assessed" | "completed";
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  const config = {
    pending: {
      icon: Clock,
      text: "Perlu Dinilai",
      className: "bg-yellow-100 text-yellow-700",
    },
    assessed: {
      icon: CheckCircle,
      text: "Sudah Dinilai",
      className: "bg-green-100 text-green-700",
    },
    completed: {
      icon: Award,
      text: "Selesai",
      className: "bg-blue-100 text-blue-700",
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <Badge className={item.className}>
      <Icon className="w-3 h-3 mr-1" />
      {item.text}
    </Badge>
  );
};

export default StatusBadge;
