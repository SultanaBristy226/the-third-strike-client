import { useState } from "react";
import {
  Users,
  Grid,
  ArrowUpDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Shield,
  User,
  UserRound,
  Crown,
  School,
  MoveHorizontal,
  MoveVertical,
  RefreshCw,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SeatPlanner() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahim", roll: "01", height: 175, isKuddus: false, needsFront: false },
    { id: 2, name: "Karim", roll: "02", height: 182, isKuddus: false, needsFront: false },
    { id: 3, name: "Kodu Kuddus", roll: "03", height: 165, isKuddus: true, needsFront: false },
    { id: 4, name: "Biltu", roll: "04", height: 160, isKuddus: false, needsFront: true },
    { id: 5, name: "Miltu", roll: "05", height: 158, isKuddus: false, needsFront: false },
    { id: 6, name: "Sadia", roll: "06", height: 170, isKuddus: false, needsFront: false },
    { id: 7, name: "Rafiq", roll: "07", height: 190, isKuddus: false, needsFront: false },
    { id: 8, name: "Jabbar", roll: "08", height: 185, isKuddus: false, needsFront: false },
    { id: 9, name: "Shanta", roll: "09", height: 155, isKuddus: false, needsFront: false },
    { id: 10, name: "Tomal", roll: "10", height: 175, isKuddus: false, needsFront: false },
    { id: 11, name: "Nadia", roll: "11", height: 162, isKuddus: false, needsFront: false },
    { id: 12, name: "Fahim", roll: "12", height: 180, isKuddus: false, needsFront: false },
  ]);

  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(3);
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", roll: "", height: "", isKuddus: false, needsFront: false });
  const [sortBy, setSortBy] = useState("height"); // height, name, roll
  const [showKuddusOnly, setShowKuddusOnly] = useState(false);

  // Sort students based on height (ascending = shorter in front)
  const sortedStudents = [...students]
    .sort((a, b) => {
      if (sortBy === "height") return a.height - b.height;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.roll - b.roll;
    })
    .filter(s => showKuddusOnly ? s.isKuddus : true);

  // Arrange students in grid (front to back = short to tall)
  const arrangeSeats = () => {
    const sorted = [...students].sort((a, b) => {
      // Kuddus should be visible - put him in front
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

  const addStudent = () => {
    if (!newStudent.name || !newStudent.roll || !newStudent.height) {
      alert("Please fill all fields");
      return;
    }
    setStudents([
      ...students,
      {
        id: Date.now(),
        name: newStudent.name,
        roll: newStudent.roll,
        height: parseInt(newStudent.height),
        isKuddus: newStudent.isKuddus,
        needsFront: newStudent.needsFront,
      },
    ]);
    setNewStudent({ name: "", roll: "", height: "", isKuddus: false, needsFront: false });
    setShowAddForm(false);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const toggleKuddus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, isKuddus: !s.isKuddus } : s
    ));
  };

  const getHeightColor = (height) => {
    if (height < 160) return "text-green-500";
    if (height < 170) return "text-yellow-500";
    if (height < 180) return "text-orange-500";
    return "text-red-500";
  };

  const getSeatStatus = (student) => {
    if (!student) return "empty";
    if (student.isKuddus) return "kuddus";
    if (student.needsFront) return "front";
    return "normal";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-green-600">
              <Grid className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Anti-Camouflage Seat Planner
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🪑 Stop Kuddus from hiding behind tall students!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors"
            >
              {viewMode === "grid" ? "📋 List View" : "📊 Grid View"}
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
              }}
            >
              <Plus className="h-4 w-4 inline mr-1" /> Add Student
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Rows:</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Math.max(2, parseInt(e.target.value) || 2))}
              className="w-16 rounded-xl px-3 py-1.5 text-sm bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
              min="2"
              max="8"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Columns:</label>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Math.max(2, parseInt(e.target.value) || 2))}
              className="w-16 rounded-xl px-3 py-1.5 text-sm bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
              min="2"
              max="6"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl px-3 py-1.5 text-sm bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
            >
              <option value="height">Height (Short → Tall)</option>
              <option value="name">Name</option>
              <option value="roll">Roll Number</option>
            </select>
          </div>
          <button
            onClick={() => setShowKuddusOnly(!showKuddusOnly)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              showKuddusOnly 
                ? "bg-red-500 text-white" 
                : "bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10"
            }`}
          >
            {showKuddusOnly ? "👀 Kuddus Only" : "👤 All Students"}
          </button>
          <button
            onClick={() => setStudents([...students])}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors"
          >
            <RefreshCw className="h-3 w-3 inline mr-1" /> Reset
          </button>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 overflow-x-auto">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                🏫 Teacher's Podium (Front)
              </span>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2" />
            </div>

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
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        aspect-square rounded-xl p-2 transition-all duration-300
                        ${status === "empty" ? "bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/10" : ""}
                        ${status === "normal" ? "bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:scale-105 cursor-pointer" : ""}
                        ${status === "front" ? "bg-green-50 dark:bg-green-500/10 border-2 border-green-400 dark:border-green-500 shadow-lg" : ""}
                        ${status === "kuddus" ? "bg-red-50 dark:bg-red-500/10 border-2 border-red-500 shadow-lg animate-pulse" : ""}
                      `}
                      onClick={() => student && setSelectedStudent(student)}
                    >
                      {student ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                            ${student.isKuddus ? "bg-red-500 text-white" : "bg-purple-500 text-white"}
                          `}>
                            {student.isKuddus ? "👑" : student.name.charAt(0)}
                          </div>
                          <p className="text-[10px] font-bold truncate w-full mt-1 text-gray-800 dark:text-white">
                            {student.name}
                          </p>
                          <p className="text-[8px] text-gray-500 dark:text-gray-400">
                            {student.height}cm
                          </p>
                          {student.isKuddus && (
                            <span className="text-[8px] font-bold text-red-500">⚠️</span>
                          )}
                          {student.needsFront && !student.isKuddus && (
                            <span className="text-[8px] font-bold text-green-500">👀</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 dark:text-white/20">
                          <span className="text-2xl">🪑</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ))}
            </div>

            <div className="text-center mt-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                📍 Back of Classroom
              </span>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-500 dark:text-gray-400">Normal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-500 dark:text-gray-400">Front Needed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-500 font-bold">👑 KUDDUS</span>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10">
                    <th className="text-left py-3 font-bold text-gray-500 dark:text-gray-400">#</th>
                    <th className="text-left py-3 font-bold text-gray-500 dark:text-gray-400">Name</th>
                    <th className="text-left py-3 font-bold text-gray-500 dark:text-gray-400">Roll</th>
                    <th className="text-left py-3 font-bold text-gray-500 dark:text-gray-400">Height</th>
                    <th className="text-left py-3 font-bold text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 font-bold text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student, index) => (
                    <tr key={student.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 font-bold text-gray-500 dark:text-gray-400">{index + 1}</td>
                      <td className="py-3 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {student.isKuddus && <Crown className="h-4 w-4 text-red-500" />}
                        {student.name}
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{student.roll}</td>
                      <td className={`py-3 font-bold ${getHeightColor(student.height)}`}>
                        {student.height} cm
                      </td>
                      <td className="py-3">
                        {student.isKuddus ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500/10 text-red-500">👑 KUDDUS</span>
                        ) : student.needsFront ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-500">Front Needed</span>
                        ) : (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">Normal</span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleKuddus(student.id)}
                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            title={student.isKuddus ? "Remove Kuddus status" : "Mark as Kuddus"}
                          >
                            {student.isKuddus ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Crown className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteStudent(student.id)}
                            className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Student Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Add Student</h3>
                <button onClick={() => setShowAddForm(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={newStudent.roll}
                  onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                />
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={newStudent.height}
                  onChange={(e) => setNewStudent({ ...newStudent, height: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={newStudent.isKuddus}
                      onChange={(e) => setNewStudent({ ...newStudent, isKuddus: e.target.checked })}
                      className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    Mark as Kuddus
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={newStudent.needsFront}
                      onChange={(e) => setNewStudent({ ...newStudent, needsFront: e.target.checked })}
                      className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    Needs Front Seat
                  </label>
                </div>
                <button
                  onClick={addStudent}
                  className="w-full rounded-xl py-3 font-bold text-white text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                    boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
                  }}
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}