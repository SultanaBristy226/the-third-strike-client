import { AlertTriangle, Shield, CheckCircle, XCircle, Zap } from "lucide-react";

export default function ProgressBar({ current, max = 3, warnings = 0, maxWarnings = 2 }) {
  const percentage = Math.min((current / max) * 100, 100);
  const isImpeached = current >= max;
  const warningPercentage = Math.min((warnings / maxWarnings) * 100, 100);

  const getStatusColor = () => {
    if (isImpeached) return "from-red-600 to-red-500";
    if (current >= 2) return "from-orange-500 to-orange-400";
    if (current >= 1) return "from-yellow-500 to-yellow-400";
    return "from-green-500 to-green-400";
  };

  const getStatusText = () => {
    if (isImpeached) return "🎉 IMPEACHED! Kuddus is OUT!";
    if (current >= 2) return "⚠️ Final Warning! One more strike!";
    if (current >= 1) return "⚡ First Strike! Watch out Kuddus!";
    return "🛡️ All clear! No strikes yet.";
  };

  const getStatusEmoji = () => {
    if (isImpeached) return "🎉";
    if (current >= 2) return "⚠️";
    if (current >= 1) return "⚡";
    return "🛡️";
  };

  return (
    <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Impeachment Progress</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isImpeached ? "Kuddus has been impeached! 🎉" : `${current} of ${max} strikes needed`}
            </p>
          </div>
        </div>
        <div className={`text-sm font-black px-4 py-2 rounded-full ${
          isImpeached ? "bg-red-500/10 text-red-500" :
          current >= 2 ? "bg-orange-500/10 text-orange-500" :
          current >= 1 ? "bg-yellow-500/10 text-yellow-500" :
          "bg-green-500/10 text-green-500"
        }`}>
          {getStatusEmoji()} {current}/{max}
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="relative">
        <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getStatusColor()} transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Strike Markers */}
        <div className="flex justify-between mt-1 px-1">
          {[...Array(max)].map((_, i) => (
            <div
              key={i}
              className={`text-[10px] font-bold ${
                i < current ? "text-purple-500" : "text-gray-300 dark:text-gray-600"
              }`}
            >
              ⚡{i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Status Message */}
      <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${
        isImpeached ? "bg-red-500/10 text-red-500 border border-red-500/20" :
        current >= 2 ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
        current >= 1 ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
        "bg-green-500/10 text-green-500 border border-green-500/20"
      }`}>
        {getStatusText()}
      </div>

      {/* Warnings */}
      <div className="mt-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Warnings</span>
            <span className={`font-bold ${
              warnings >= maxWarnings ? "text-red-500" : "text-yellow-500"
            }`}>
              {warnings}/{maxWarnings}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-white/10 mt-1 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                warnings >= maxWarnings ? "bg-red-500" : "bg-yellow-500"
              }`}
              style={{ width: `${warningPercentage}%` }}
            />
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(maxWarnings)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                i < warnings
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 dark:bg-white/10 text-gray-400"
              }`}
            >
              {i < warnings ? "⚠️" : "○"}
            </div>
          ))}
        </div>
      </div>

      {/* Strike Cards */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[...Array(max)].map((_, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl text-center transition-all duration-300 ${
              i < current
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600"
            }`}
          >
            <div className="text-lg font-black">
              {i < current ? "⚡" : "○"}
            </div>
            <div className="text-[10px] font-bold">
              Strike {i + 1}
            </div>
            {i < current && (
              <div className="text-[8px] opacity-80">
                {i === 0 ? "Warning 1" : i === 1 ? "Warning 2" : "🚨 IMPEACHED!"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}