import { GraduationCap,  MoreVertical } from "lucide-react";

const LearningProgressCard = () => {
  const completion = 78; // dynamically update this from props if needed

  return (
    <div className="bg-midnight_text w-64 rounded-2xl p-5 shadow-md relative text-white">
      {/* Top Icon */}
      <div className="absolute top-4 right-4 text-white/60">
        < MoreVertical />
      </div>
      <div className="text-xl text-green-400 mb-2">
        <GraduationCap />
      </div>

      {/* Circular Progress */}
      <div className="relative flex items-center justify-center mb-3">
        <svg width="120" height="120" viewBox="0 0 36 36" className="transform -rotate-90">
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#2f3542"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="#4cd137"
            strokeWidth="2"
            strokeDasharray={`${completion}, 100`}
          />
        </svg>
        <div className="absolute text-2xl font-semibold">{completion}%</div>
      </div>

      {/* Stats */}
      <p className="text-center text-sm text-gray-400 mb-2">Job search progress</p>
      <div className="flex justify-between text-sm text-gray-300">
        <div>
          <p className="text-white font-medium">46%</p>
          <p className="text-xs">Growth</p>
        </div>
        <div>
          <p className="text-white font-medium">42</p>
          <p className="text-xs">Days</p>
        </div>
      </div>
    </div>
  );
};

export default LearningProgressCard;
