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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");

  const complaints = [
    {
      id: 1,
      student: "Anonymous #A7F3",
      type: "Tiffin Theft",
      description: "Kuddus stole my fried rice during lunch",
      time: "2 hours ago",
      status: "pending",
      severity: "high",
    },
    {
      id: 2,
      student: "Anonymous #B2D4",
      type: "Bribe",
      description: "Kuddus demanded 2 Taka for washroom access",
      time: "5 hours ago",
      status: "pending",
      severity: "medium",
    },
    {
      id: 3,
      student: "Anonymous #C5E8",
      type: "Syllabus Bloat",
      description: "Assigned 7 chapters for a 10-mark test",
      time: "1 day ago",
      status: "reviewed",
      severity: "high",
      verdict: "Strike Issued",
    },
  ];

  const stats = {
    pending: 2,
    reviewed: 1,
    strikes: 2,
    resolved: 5,
  };

  const filteredComplaints = complaints.filter(c => 
    activeTab === "all" || c.status === activeTab
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
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
            <button className="p-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-colors">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "Reviewed", value: stats.reviewed, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Strikes Issued", value: stats.strikes, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Resolved", value: stats.resolved, icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
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
                <h3 className="font-bold text-gray-900 dark:text-white">Complaint Review</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Review anonymous complaints and take action</p>
              </div>
              <div className="flex gap-2">
                {["all", "pending", "reviewed"].map((tab) => (
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
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{complaint.student}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        complaint.severity === 'high' ? 'bg-red-500/10 text-red-500' :
                        complaint.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {complaint.severity.toUpperCase()}
                      </span>
                      {complaint.status === 'pending' && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">PENDING</span>
                      )}
                      {complaint.verdict && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500">{complaint.verdict}</span>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{complaint.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{complaint.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{complaint.time}</p>
                  </div>
                  <div className="flex gap-2">
                    {complaint.status === 'pending' ? (
                      <>
                        <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Approve
                        </button>
                        <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </>
                    ) : (
                      <button className="px-4 py-2 rounded-xl text-xs font-bold text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: Shield, label: "Issue Strike", color: "from-red-400 to-red-600", path: "/teacher/strikes" },
            { icon: FileWarning, label: "All Complaints", color: "from-amber-400 to-amber-600", path: "/teacher/complaints" },
            { icon: Eye, label: "Audit Log", color: "from-blue-400 to-blue-600", path: "/teacher/audit" },
            { icon: BarChart3, label: "Statistics", color: "from-purple-400 to-purple-600", path: "/teacher/stats" },
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

      <Footer />
    </div>
  );
}