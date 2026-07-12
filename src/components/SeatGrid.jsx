import { useState } from "react";
import {
  Users,
  User,
  Crown,
  Eye,
  EyeOff,
  MoveHorizontal,
  MoveVertical,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";

export default function SeatGrid({
  students = [],
  rows = 4,
  cols = 3,
  onStudentClick,
  onKuddusToggle,
  readOnly = false,
}) {
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Arrange students in grid (front to back = short to tall)
  const arrangeSeats = () => {
    const sorted = [...students].sort((a, b) => {
      // Kuddus should be visible - put him where teachers can see
      if (a.isKuddus && !b.isKuddus) return -1;
      if (!a.isKuddus && b.isKuddus) return 1;
      // Short students in front
      return a.height - b.height;
    });

    const grid = [];
    let index = 0;
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        if (index < sorted.length) {
          row.push(sorted[index]);
          index++;
        } else {
          row.push(null);
        }
      }
      grid.push(row);
    }
    return grid;
  };

  const seatGrid = arrangeSeats();

  const getSeatStatus = (student) => {
    if (!student) return "empty";
    if (student.isKuddus) return "kuddus";
    if (student.needsFront) return "front";
    return "normal";
  };

  const getHeightCategory = (height) => {
    if (height < 160) return { label: "Short", color: "text-green-500", bg: "bg-green-500/10" };
    if (height < 170) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    if (height < 180) return { label: "Tall", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Very Tall", color: "text-red-500", bg: "bg-red-500/10" };
  };

  return (
    <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 overflow-x-auto">
      {/* Classroom Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
          <Shield className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">
            🏫 Teacher's Podium (Front)
          </span>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full mt-2" />
      </div>

      {/* Seat Grid */}
      <div 
        className="grid gap-2 mx-auto"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          maxWidth: `${cols * 120}px`,
        }}
      >
        {seatGrid.map((row, rowIndex) => (
          row.map((student, colIndex) => {
            const status = getSeatStatus(student);
            const isHovered = hoveredSeat === `${rowIndex}-${colIndex}`;
            const heightInfo = student ? getHeightCategory(student.height) : null;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  aspect-square rounded-xl p-2 transition-all duration-300 relative
                  ${status === "empty" ? "bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/10" : ""}
                  ${status === "normal" ? "bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:scale-105 cursor-pointer" : ""}
                  ${status === "front" ? "bg-green-50 dark:bg-green-500/10 border-2 border-green-400 dark:border-green-500 shadow-lg hover:scale-105 cursor-pointer" : ""}
                  ${status === "kuddus" ? "bg-red-50 dark:bg-red-500/10 border-2 border-red-500 shadow-lg animate-pulse cursor-pointer" : ""}
                `}
                onMouseEnter={() => setHoveredSeat(`${rowIndex}-${colIndex}`)}
                onMouseLeave={() => setHoveredSeat(null)}
                onClick={() => {
                  if (student && onStudentClick) {
                    onStudentClick(student);
                  }
                }}
              >
                {student ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    {/* Avatar */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg
                      ${student.isKuddus ? "bg-gradient-to-br from-red-500 to-red-600 text-white animate-pulse" : ""}
                      ${!student.isKuddus && student.needsFront ? "bg-gradient-to-br from-green-500 to-green-600 text-white" : ""}
                      ${!student.isKuddus && !student.needsFront ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : ""}
                    `}>
                      {student.isKuddus ? "👑" : student.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <p className="text-[10px] font-bold truncate w-full mt-1 text-gray-800 dark:text-white">
                      {student.isKuddus ? "⚠️ " : ""}{student.name}
                    </p>

                    {/* Height & Roll */}
                    <div className="flex items-center gap-1">
                      <p className={`text-[8px] font-medium ${heightInfo?.color || "text-gray-500"}`}>
                        {student.height}cm
                      </p>
                      <p className="text-[8px] text-gray-400">|</p>
                      <p className="text-[8px] text-gray-400">#{student.roll}</p>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-1 mt-0.5">
                      {student.isKuddus && (
                        <span className="text-[8px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                          🚨
                        </span>
                      )}
                      {student.needsFront && !student.isKuddus && (
                        <span className="text-[8px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                          👀
                        </span>
                      )}
                      {!student.isKuddus && !student.needsFront && heightInfo && (
                        <span className={`text-[8px] font-medium ${heightInfo.color} bg-opacity-10 px-1.5 py-0.5 rounded-full`}>
                          {heightInfo.label}
                        </span>
                      )}
                    </div>

                    {/* Hover Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-2 -right-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                        {student.isKuddus ? "👑 KUDDUS!" : "Click to view"}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-3xl text-gray-300 dark:text-white/20">🪑</span>
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>

      {/* Classroom Footer */}
      <div className="text-center mt-4">
        <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 inline-block">
          📍 Back of Classroom
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <span className="text-gray-500 dark:text-gray-400">Normal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-600" />
          <span className="text-gray-500 dark:text-gray-400">Front Needed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 animate-pulse" />
          <span className="text-red-500 font-bold">👑 KUDDUS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/10" />
          <span className="text-gray-400">Empty Seat</span>
        </div>
      </div>

      {/* Student Count */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Users className="h-4 w-4" />
          <span>{students.filter(s => !s.isKuddus).length} Students</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-red-500">
          <Crown className="h-4 w-4" />
          <span>{students.filter(s => s.isKuddus).length} Kuddus Detected</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>🪑 {rows * cols - students.length} Empty</span>
        </div>
      </div>

      {/* Kuddus Alert */}
      {students.some(s => s.isKuddus) && (
        <div className="mt-3 p-2 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
          <span className="text-xs font-bold text-red-500">
            ⚠️ Kuddus is in the classroom! Teacher can see him!
          </span>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
      )}
    </div>
  );
}