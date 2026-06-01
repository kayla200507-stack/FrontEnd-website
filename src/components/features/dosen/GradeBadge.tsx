import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  grade: string;
}

const GradeBadge: React.FC<Props> = ({ grade }) => {
  return (
    <Badge variant="outline" className="font-semibold">
      {grade}
    </Badge>
  );
};

export default GradeBadge;
