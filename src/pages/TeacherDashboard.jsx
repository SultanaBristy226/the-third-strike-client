import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  FileWarning,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Users,
  AlertTriangle,
  Eye,
  Bell,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  Award,
  Target,
  BarChart3,
  MessageCircle,
  Settings,
  Star,
  Crown,
  Flag,
  Send,
  Trash2,
  Edit2,
  Plus,
  Calendar,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showStrikeModal, setShowStrikeModal] = useState(false);
  const [strikeData, setStrikeData] = useState({
    reason: "",
    severity: "warning",
    notes: "",
  });
  const [notification, setNotification] = useState(null);

  // Real complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      student: "Anonymous #A7F3",
      roll: "07",
      type: "Tiffin Theft",
      category: "🍱 Food",
      description: "Kuddus stole my fried rice during lunch. I saw him taking it from my bag while I was in the washroom.",
      time: "2 hours ago",
      date: "2024-01-15",
      status: "pending",
      severity: "high",
      evidence: true,
      location: "Classroom - 3rd Floor",
    },
    {
      id: 2,
      student: "Anonymous #B2D4",
      roll: "12",
      type: "Washroom Toll",
      category: "💰 Bribe",
      description: "Kuddus demanded 2 Taka for washroom access during free period. He said it's the 'Class Welfare Fund'.",
      time: "5 hours ago",
      date: "2024-01-15",
      status: "pending",
      severity: "medium",
      evidence: false,
      location: "Corridor - East Wing",
    },
    {
      id: 3,
      student: "Anonymous #C5E8",
      roll: "23",
      type: "Syllabus Bloat",
      category: "📚 Academic",
      description: "Kuddus assigned 7 chapters for a 10-mark test. Including the writer's biography and index!",
      time: "1 day ago",
      date: "2024-01-14",
      status: "reviewed",
      severity: "high",
      evidence: true,
      location: "Classroom",
      verdict: "Strike Issued - Warning 1",
    },
    {
      id: 4,
      student: "Anonymous #D9F1",
      roll: "34",
      type: "Seat Abuse",
      category: "🪑 Seating",
      description: "Kuddus forced tall students to sit in front row so he could sleep in the back.",
      time: "2 days ago",
      date: "2024-01-13",
      status: "resolved",
      severity: "medium",
      evidence: true,
      location: "Classroom",
      verdict: "Resolved - Seat plan adjusted",
    },
    {
      id: 5,
      student: "Anonymous #E3A7",
      roll: "45",
      type: "Verbal Abuse",
      category: "🗣️ Harassment",
      description: "Kuddus verbally abused a student for not paying the 'Quality Control Tax' on tiffin.",
      time: "3 days ago",
      date: "2024-01-12",
      status: "reviewed",
      severity: "high",
      evidence: false,
      location: "Canteen",
      verdict: "Strike Issued - Final Warning",
    },
  ]);

  // Strike history
  const [strikes, setStrikes] = useState([
    {
      id: 1,
      type: "Warning 1",
      reason: "Syllabus Bloat - Assigned excessive chapters",
      date: "2024-01-14",
      issuedBy: "Rashid Sir",
      status: "active",
      complaintId: 3,
    },
    {
      id: 2,
      type: "Warning 2",
      reason: "Verbal Abuse - Harassed a student",
      date: "2024-01-12",
      issuedBy: "Rashid Sir",
      status: "active",
      complaintId: 5,
    },
  ]);

  const stats = {
    pending: complaints.filter(c => c.status === "pending").length,
    reviewed: complaints.filter(c => c.status === "reviewed").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    strikes: strikes.length,
    total: complaints.length,
  };

  const getFilteredComplaints = () => {
    if (activeTab === "all") return complaints;
    return complaints.filter(c => c.status === activeTab);
  };

  const handleApprove = (id) => {
    setComplaints(complaints.map(c =>
      c.id === id ? { ...c, status: "reviewed" } : c
    ));
    setSelectedComplaint(null);
    showNotification("✅ Complaint approved! You can now issue a strike.", "success");
  };

  const handleReject = (id) => {
    setComplaints(complaints.map(c =>
      c.id === id ? { ...c, status: "resolved", verdict: "Rejected - Insufficient evidence" } : c
    ));
    setSelectedComplaint(null);
    showNotification("❌ Complaint rejected. Student will be notified.", "error");
  };

  const handleIssueStrike = (e) => {
    e.preventDefault();
    if (!strikeData.reason) {
      showNotification("⚠️ Please provide a reason for the strike.", "error");
      return;
    }

    const newStrike = {
      id: strikes.length + 1,
      type: strikeData.severity === "warning" ? "Warning" : "Final Warning",
      reason: strikeData.reason,
      date: new Date().toLocaleDateString(),
      issuedBy: user?.displayName || "Teacher",
      status: "active",
      complaintId: selectedComplaint?.id,
      notes: strikeData.notes,
    };

    setStrikes([...strikes, newStrike]);
    
    // Update complaint status
    if (selectedComplaint) {
      setComplaints(complaints.map(c =>
        c.id === selectedComplaint.id 
          ? { ...c, status: "reviewed", verdict: `Strike Issued - ${newStrike.type}` }
          : c
      ));
    }

    setShowStrikeModal(false);
    setStrikeData({ reason: "", severity: "warning", notes: "" });
    setSelectedComplaint(null);
    showNotification(`⚡ ${newStrike.type} issued successfully!`, "success");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const getSeverityColor = (severity) => {
    if (severity === "high") return "text-red-500 bg-red-500/10";
    if (severity === "medium") return "text-yellow-500 bg-yellow-500/10";
    return "text-blue-500 bg-blue-500/10";
  };

  const getStatusColor = (status) => {
    if (status === "pending") return "text-yellow-500 bg-yellow-500/10";
    if (status === "reviewed") return "text-purple-500 bg-purple-500/10";
    return "text-green-500 bg-green-500/10";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-24 right-4 z-50 p-4 rounded-2xl shadow-xl max-w-sm animate-fade-up ${
            notification.type === "success" 
              ? "bg-green-50 dark:bg-green-500/10 border border-green-500/20" 
              : "bg-red-50 dark:bg-red-500/10 border border-red-500/20"
          }`}>
            <p className={`text-sm font-bold ${
              notification.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              {notification.message}
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Teacher Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, {user?.displayName || "Teacher"}! Review complaints and issue strikes.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">STRIKES ISSUED</span>
              <span className="text-lg font-black text-purple-500">{stats.strikes}</span>
            </div>
            <button className="p-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center animate-pulse">{stats.pending}</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "Reviewed", value: stats.reviewed, icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Strikes Issued", value: stats.strikes, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Resolved", value: stats.resolved, icon: Shield, color: "text-green-500", bg: "bg-green-500/10" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complaint Review Section */}
        <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">📋 Complaint Review</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Review anonymous complaints and take action</p>
              </div>
              <div className="flex gap-2">
                {["all", "pending", "reviewed", "resolved"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-purple-500 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-white/10">
            {getFilteredComplaints().length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500 dark:text-gray-400">No complaints found in this category</p>
              </div>
            ) : (
              getFilteredComplaints().map((complaint) => (
                <div key={complaint.id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{complaint.student}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityColor(complaint.severity)}`}>
                          {complaint.severity.toUpperCase()}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                          {complaint.status.toUpperCase()}
                        </span>
                        {complaint.evidence && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
                            📎 Evidence
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-purple-500">{complaint.type}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500 dark:text-gray-400">{complaint.category}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{complaint.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {complaint.time}
                        </span>
                        <span className="text-xs text-gray-400">{complaint.location}</span>
                        {complaint.verdict && (
                          <span className="text-xs font-medium text-purple-500">{complaint.verdict}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {complaint.status === "pending" && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedComplaint(complaint);
                              setShowStrikeModal(true);
                            }}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-500 hover:bg-purple-600 transition-colors flex items-center gap-1"
                          >
                            <AlertTriangle className="h-3 w-3" /> Issue Strike
                          </button>
                          <button
                            onClick={() => handleApprove(complaint.id)}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="h-3 w-3" /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(complaint.id)}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-1"
                          >
                            <XCircle className="h-3 w-3" /> Reject
                          </button>
                        </>
                      )}
                      {complaint.status === "reviewed" && (
                        <button className="px-4 py-2 rounded-xl text-xs font-bold text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors">
                          View Details
                        </button>
                      )}
                      {complaint.status === "resolved" && (
                        <button className="px-4 py-2 rounded-xl text-xs font-bold text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition-colors">
                          View Resolution
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Strike History */}
        <div className="mt-8 bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Strike History
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">All strikes issued against Kuddus</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Total:</span>
                <span className="font-bold text-red-500">{strikes.length}</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-white/10">
            {strikes.map((strike) => (
              <div key={strike.id} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${
                        strike.type.includes("Final") ? "text-red-500" : "text-yellow-500"
                      }`}>
                        ⚡ {strike.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{strike.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{strike.reason}</p>
                    <p className="text-xs text-gray-400 mt-1">Issued by: {strike.issuedBy}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      strike.status === "active" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
                    }`}>
                      {strike.status.toUpperCase()}
                    </span>
                    <button className="text-xs font-medium text-purple-500 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: Shield, label: "Issue Strike", color: "from-red-400 to-red-600", path: "#" },
            { icon: FileWarning, label: "All Complaints", color: "from-amber-400 to-amber-600", path: "#" },
            { icon: Eye, label: "Audit Log", color: "from-blue-400 to-blue-600", path: "#" },
            { icon: BarChart3, label: "Statistics", color: "from-purple-400 to-purple-600", path: "#" },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="group bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.color} mb-3 transition-all duration-300 group-hover:scale-110`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{action.label}</p>
            </Link>
          ))}
        </div>
      </main>

      {/* Strike Modal */}
      {showStrikeModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">⚡ Issue Strike</h3>
              <button onClick={() => {
                setShowStrikeModal(false);
                setStrikeData({ reason: "", severity: "warning", notes: "" });
              }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-sm">
              <p className="font-bold text-gray-700 dark:text-gray-300">Complaint:</p>
              <p className="text-gray-600 dark:text-gray-400">{selectedComplaint.description.slice(0, 100)}...</p>
              <p className="text-xs text-gray-400 mt-1">From: {selectedComplaint.student}</p>
            </div>

            <form onSubmit={handleIssueStrike} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Severity
                </label>
                <select
                  value={strikeData.severity}
                  onChange={(e) => setStrikeData({ ...strikeData, severity: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                >
                  <option value="warning">⚠️ Warning (1st Strike)</option>
                  <option value="final">🚨 Final Warning (2nd Strike)</option>
                  <option value="impeach">💥 Impeachment (3rd Strike)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Reason for Strike
                </label>
                <input
                  type="text"
                  value={strikeData.reason}
                  onChange={(e) => setStrikeData({ ...strikeData, reason: e.target.value })}
                  placeholder="Why is this strike being issued?"
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={strikeData.notes}
                  onChange={(e) => setStrikeData({ ...strikeData, notes: e.target.value })}
                  placeholder="Any additional information..."
                  rows="2"
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-3 font-bold text-white text-sm"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
                }}
              >
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                Issue Strike
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}