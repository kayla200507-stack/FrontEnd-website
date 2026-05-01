import { CheckCircle } from "lucide-react";

export const ProgressLamaran = ({ status }: { status: string }) => {
  return (
    <div className="flex justify-between text-black font-medium items-center">
      <div className="flex gap-3 items-center">
        <div className="bg-white rounded-full">
          <CheckCircle size={18} className="text-green-500" />
        </div>
        <p>{status}</p>
      </div>
      <p className="text-sm text-gray-500 ">20 Maret 2026</p>
    </div>
  );
};
