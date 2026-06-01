import React from "react";

interface AssessmentCriteriaProps {
  title: string;
  description: string;
  weight: number;
  value: number | "";
  onChange: (value: number | "") => void;
}

const AssessmentCriteria: React.FC<AssessmentCriteriaProps> = ({
  title,
  description,
  weight,
  value,
  onChange,
}) => {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-slate-800">{title}</h4>
          <p className="text-sm text-slate-500">{description}</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
          {weight}%
        </span>
      </div>

      <input
        type="number"
        min={0}
        max={100}
        value={value}
        placeholder="0 - 100"
        onChange={(e) => {
          const val = e.target.value;

          if (val === "") {
            onChange("");
          } else {
            onChange(Number(val));
          }
        }}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AssessmentCriteria;
