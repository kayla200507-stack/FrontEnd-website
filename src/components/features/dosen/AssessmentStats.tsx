import React from "react";
import { Award, CheckCircle, Clock, Users } from "lucide-react";

interface Props {
  total: number;
  pending: number;
  assessed: number;
  avgGrade: string;
  avgScore: string;
}

const AssessmentStats: React.FC<Props> = ({
  total,
  pending,
  assessed,
  avgGrade,
  avgScore,
}) => {
  const cards = [
    {
      title: "Seleksi Magang",
      value: total,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Menunggu Penilaian",
      value: pending,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Sudah Dinilai",
      value: assessed,
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Rata - Rata Nilai",
      value: avgGrade,
      subValue: avgScore,
      icon: Award,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white
              rounded-xl
              border
              border-slate-200
              p-5
              shadow-sm
              hover:shadow-md
              transition-all
              duration-200
              flex
              flex-col
              justify-between
              h-full
            "
          >
            <div className="flex items-start gap-4">
              {/* ICON */}
              <div
                className={`
                  w-12 h-12
                  rounded-xl
                  flex items-center justify-center
                  shrink-0
                  ${card.iconBg}
                `}
              >
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>

              {/* TEXT */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-500 leading-none">
                  {card.title}
                </p>

                {card.title === "Rata - Rata Nilai" ? (
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-2xl font-bold text-slate-800 leading-none">
                      {card.value}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({card.subValue})
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-slate-800 mt-2 leading-none">
                    {card.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssessmentStats;
