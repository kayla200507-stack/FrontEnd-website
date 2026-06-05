import React from "react";

interface ScaleItem {
  grade: string;
  scoreRange: string;
  predicate: string;
}

const scaleData: ScaleItem[] = [
  { grade: "A", scoreRange: "85-100", predicate: "Sangat Baik" },
  { grade: "AB", scoreRange: "80-84", predicate: "Baik Sekali" },
  { grade: "B", scoreRange: "75-79", predicate: "Baik" },
  { grade: "BC", scoreRange: "70-74", predicate: "Cukup Baik" },
  { grade: "C", scoreRange: "65-69", predicate: "Cukup" },
  { grade: "D", scoreRange: "60-64", predicate: "Kurang" },
  { grade: "E", scoreRange: "0-59", predicate: "Tidak Lulus" },
];

export const AssessmentScale: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Skala Penilaian</h3>
        <p className="text-sm text-slate-400 mt-1">
          Referensi konversi skor ke nilai huruf
        </p>
      </div>

      {/* Content - One Row Layout */}
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-nowrap items-stretch justify-between min-w-[850px] gap-4">
          {scaleData.map((item) => (
            <div
              key={item.grade}
              className="flex-1 flex flex-col items-center text-center p-5 rounded-2xl border border-slate-200 bg-white"
            >
              {/* Nilai Huruf */}
              <div className="text-3xl font-bold text-blue-600 mb-2 tracking-wide">
                {item.grade}
              </div>

              {/* Rentang Skor */}
              <div className="text-sm text-slate-600 font-medium mb-1">
                {item.scoreRange}
              </div>

              {/* Predikat */}
              <div className="text-xs text-slate-400 font-normal">
                {item.predicate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get grade from score
export const getGradeFromScore = (score: number): string => {
  if (score >= 85) return "A";
  if (score >= 80) return "AB";
  if (score >= 75) return "B";
  if (score >= 70) return "BC";
  if (score >= 65) return "C";
  if (score >= 60) return "D";
  return "E";
};

// Helper function to get predicate from score
export const getPredicateFromScore = (score: number): string => {
  if (score >= 85) return "Sangat Baik";
  if (score >= 80) return "Baik Sekali";
  if (score >= 75) return "Baik";
  if (score >= 70) return "Cukup Baik";
  if (score >= 65) return "Cukup";
  if (score >= 60) return "Kurang";
  return "Tidak Lulus";
};
