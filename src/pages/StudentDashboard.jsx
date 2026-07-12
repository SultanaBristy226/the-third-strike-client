import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  AlertTriangle,
  FileWarning,
  Siren,
  BookOpen,
  DollarSign,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Settings,
  Bell,
  ChevronRight,
  Sparkles,
  Award,
  Target,
  Flame,
  Zap,
  Eye,
  Users,
  Calendar,
  MessageCircle,
  BarChart3,
  Heart,
  Star,
  Crown,
  Grid,
  Plus,
  Trash2,
  Edit2,
  Key,
  Copy,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import SeatGrid from "../components/SeatGrid";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function StudentDashboard() {
  const { user, token } = useAuth();
  const [copied, setCopied] = useState(false);
  const [strikeStatus, setStrikeStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    complaints: 0,
    strikes: 0,
    warnings: 0,
    sosSent: 0,
  });

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

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      title: "Complaint Submitted",
      description: "Kuddus stole my tiffin during lunch",
      time: "2 hours ago",
      status: "pending",
      icon: FileWarning,
    },
    {
      id: 2,
      title: "SOS Alert Sent",
      description: "Library - Kuddus demanding bribe",
      time: "5 hours ago",
      status: "resolved",
      icon: Siren,
    },
    {
      id: 3,
      title: "Strike Issued",
      description: "Kuddus received 1st warning for syllabus bloat",
      time: "1 day ago",
      status: "completed",
      icon: AlertTriangle,
    },
  ]);

  const quickActions = [
    { icon: FileWarning, label: "Report", color: "from-amber-400 to-amber-600", path: "/student/complaint" },
    { icon: Siren, label: "SOS", color: "from-red-400 to-red-600", path: "/student/sos" },
    { icon: BookOpen, label: "Syllabus AI", color: "from-blue-400 to-blue-600", path: "/student/syllabus" },
    { icon: Search, label: "Fact Checker", color: "from-purple-400 to-purple-600", path: "/fact-checker" },
  ];

  const features = [
    { icon: Eye, label: "Anonymous Reporting", desc: "Report without fear" },
    { icon: Siren, label: "SOS Alert", desc: "Instant emergency help" },
    { icon: BookOpen, label: "Syllabus AI", desc: "Smart study planner" },
    { icon: Search, label: "Fact Checker", desc: "Debunk Kuddus's lies" },
    { icon: DollarSign, label: "Tiffin Ledger", desc: "Track food theft" },
    { icon: Users, label: "Seat Planner", desc: "Anti-hide seating" },
  ];

  const upcomingEvents = [
    { title: "Math Test", date: "Tomorrow, 10:00 AM", type: "test" },
    { title: "PT Period", date: "Today, 2:00 PM", type: "sports" },
    { title: "Science Lab", date: "Friday, 11:00 AM", type: "lab" },
  ];

  const achievements = [
    { icon: Shield, label: "First Strike", color: "text-purple-500" },
    { icon: AlertTriangle, label: "Warning Given", color: "text-yellow-500" },
    { icon: CheckCircle, label: "SOS Responded", color: "text-green-500" },
  ];

  // Copy Secret Code
  const copySecretCode = () => {
    if (user?.secretCode) {
      navigator.clipboard.writeText(user.secretCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Fetch Strike Status
  useEffect(() => {
    const fetchStrikeStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/complaints/strike/status`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setStrikeStatus(data.strike);
          setStats({
            complaints: data.strike?.strikeCount || 0,
            strikes: data.strike?.strikeCount || 0,
            warnings: data.strike?.warnings?.length || 0,
            sosSent: 2,
          });
        }
      } catch (error) {
        console.error('Error fetching strike status:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStrikeStatus();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
        {/* Secret Code Card - Only for Students */}
        {user?.role === "student" && user?.secretCode && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-500/10 dark:to-amber-500/10 border-2 border-yellow-400 dark:border-yellow-500">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-yellow-500/20">
                  <Key className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">🔑 Your Secret Code</p>
                  <p className="text-2xl font-black text-yellow-700 dark:text-yellow-300 tracking-wider">
                    {user.secretCode}
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400/80">
                    Use this code with your Roll Number to login
                  </p>
                </div>
              </div>
              <button
                onClick={copySecretCode}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Welcome back, {user?.displayName || "Student"}! 👋
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The resistance needs you. Stay strong against Kuddus!
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">STRIKES</span>
              <span className="text-lg font-black text-purple-500">{stats.strikes}/3</span>
            </div>
            <button className="p-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Strike Status Card */}
        {strikeStatus && (
          <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Kuddus Strike Status
              </h3>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                strikeStatus.isImpeached 
                  ? 'bg-red-500/10 text-red-500' 
                  : strikeStatus.strikeCount >= 2 
                    ? 'bg-orange-500/10 text-orange-500'
                    : strikeStatus.strikeCount >= 1
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-green-500/10 text-green-500'
              }`}>
                {strikeStatus.currentStatus?.label || 'Safe'}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i < strikeStatus.strikeCount
                        ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-white/10 text-gray-400'
                    }`}
                  >
                    {i < strikeStatus.strikeCount ? '⚡' : '○'}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all duration-700"
                    style={{ width: `${(strikeStatus.strikeCount / 3) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {strikeStatus.strikeCount}/3 strikes • {strikeStatus.currentStatus?.message || 'No strikes yet'}
                </p>
              </div>
            </div>

            {strikeStatus.isImpeached && (
              <div className="mt-3 p-3 rounded-xl bg-red-500/10 border-2 border-red-500/20 text-center animate-pulse">
                <p className="text-lg font-black text-red-500">🎉 KUDDUS HAS BEEN IMPEACHED! 🎉</p>
                <p className="text-xs text-red-400/80">Justice has been served! Three strikes and Kuddus is out!</p>
              </div>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Complaints", value: stats.complaints, icon: FileWarning, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Strikes", value: stats.strikes, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Warnings", value: stats.warnings, icon: Shield, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "SOS Sent", value: stats.sosSent, icon: Siren, color: "text-blue-500", bg: "bg-blue-500/10" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300 hover:shadow-lg">
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

        {/* Progress Bar & Seat Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProgressBar 
            current={stats.strikes} 
            max={3} 
            warnings={stats.warnings} 
            maxWarnings={2} 
          />
          <SeatGrid 
            students={students}
            rows={4}
            cols={3}
            onStudentClick={(student) => console.log("Clicked:", student)}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="group bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.color} mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">{action.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-purple-500 transition-colors">Click to start →</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">📋 Recent Activity</h3>
              <button className="text-xs font-medium text-purple-500 hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className={`p-2 rounded-xl ${
                    activity.status === 'pending' ? 'bg-yellow-500/10' :
                    activity.status === 'resolved' ? 'bg-green-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    <activity.icon className={`h-4 w-4 ${
                      activity.status === 'pending' ? 'text-yellow-500' :
                      activity.status === 'resolved' ? 'text-green-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{activity.time}</p>
                    <span className={`text-xs font-medium ${
                      activity.status === 'pending' ? 'text-yellow-500' :
                      activity.status === 'resolved' ? 'text-green-500' :
                      'text-blue-500'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Sidebar */}
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">🔥 Features</h3>
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="p-1.5 rounded-lg bg-purple-500/10">
                    <feature.icon className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{feature.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">📅 Upcoming</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className={`p-2 rounded-xl ${
                    event.type === 'test' ? 'bg-red-500/10' :
                    event.type === 'sports' ? 'bg-green-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    <Calendar className={`h-4 w-4 ${
                      event.type === 'test' ? 'text-red-500' :
                      event.type === 'sports' ? 'text-green-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">🏆 Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors">
                  <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{achievement.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white text-center">
          <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-80" />
          <p className="text-lg font-bold">"Three strikes and Kuddus is out!"</p>
          <p className="text-sm opacity-80 mt-1">Stay strong. Stay anonymous. Stay safe.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}