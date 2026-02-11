import { CheckCircle, TrendingUp } from "lucide-react";

const weeklyProgress = [0.5, 0.4, 0.6, 0.45, 0.65, 0.55, 0.7]; // percentages

const LearningStatsCard = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 w-72 text-white shadow-lg">
      <div className="text-sm text-gray-300 mb-2">Monthly application stats</div>
      
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">84 hrs</div>
        <div className="flex items-center text-green-400 text-sm gap-1">
          <TrendingUp size={14} />
          +3.8%
        </div>
      </div>

      <div className="flex items-center text-green-400 mt-1 text-sm gap-1 mb-5">
        <CheckCircle size={14} />
        On track to hit interview goals
      </div>

      <div className="flex items-end gap-2 justify-between">
        {weeklyProgress.map((value, index) => (
          <div
            key={index}
            className="w-3 h-24 bg-white/10 rounded-full flex items-end overflow-hidden"
          >
            <div
              className="w-full bg-green-400 transition-all duration-500"
              style={{ height: `${value * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningStatsCard;
