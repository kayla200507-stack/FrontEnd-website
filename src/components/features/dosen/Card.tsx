// pages/Dosen/components/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  icon,
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      {title && (
        <div
          className={`px-6 py-4 border-b border-gray-100 bg-gray-50 ${headerClassName}`}
        >
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            {icon && <span className="text-blue-500">{icon}</span>}
            {title}
          </h2>
        </div>
      )}
      <div className={bodyClassName || "p-6"}>{children}</div>
    </div>
  );
};

export default Card;
