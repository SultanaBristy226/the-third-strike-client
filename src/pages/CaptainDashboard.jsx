import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Siren,
  AlertTriangle,
  Users,
  CheckCircle,
  Clock,
  User,
  Bell,
  Flag,
  Eye,
  Radio,
  MapPin,
  ArrowRight,
  Sparkles,
  Award,
  Target,
  Flame,
  Zap,
  Heart,
  Crown,
  ChevronRight, 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CaptainDashboard() {
  const { user } = useAuth();
  const [activeAlert, setActiveAlert] = useState(null);

  const sosAlerts = [
    {
      id: 1,
      student: "Student #A7F3",
      location: "Library",
      time: "2 minutes ago",
      status: "active",
      message: "Kuddus is demanding bribe near the bookshelf!",
    },
    {
      id: 2,
      student: "Student #B2D4",
      location: "Corridor",
      time: "15 minutes ago",
      status: "responding",
      message: "Kuddus is blocking the corridor exit!",
    },
    {
      id: 3,
      student: "Student #C5E8",
      location: "Canteen",
      time: "1 hour ago",
      status: "resolved",
      message: "Kuddus stole food from a student",
    },
  ];

  const stats = {
    activeAlerts: 1,
    totalAlerts: 12,
    strikes: 2,
    studentsProtected: 45,
  };

  const resources = [
    { icon: Shield, label: "Strike Guidelines", desc: "When to issue a strike" },
    { icon: Users, label: "Student Database", desc: "View all students" },
    { icon: Flag, label: "Incident Reports", desc: "Detailed reports" },
    { icon: Sparkles, label: "Quick Tips", desc: "Best practices" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Captain Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, {user?.displayName || "Captain"}! Protect your classmates from Kuddus.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="text-xs font-bold text-red-500">ACTIVE SOS</span>
              <span className="text-lg font-black text-red-500">{stats.activeAlerts}</span>
            </div>
            <button className="p-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center animate-pulse">1</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active SOS", value: stats.activeAlerts, icon: Siren, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Total Alerts", value: stats.totalAlerts, icon: Bell, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Strikes Issued", value: stats.strikes, icon: AlertTriangle, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Students Protected", value: stats.studentsProtected, icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
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

        {/* SOS Alerts Section */}
        <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Siren className="h-5 w-5 text-red-500" />
                  SOS Alerts
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Real-time emergency alerts from students</p>
              </div>
              <Link to="/captain/sos" className="text-sm font-medium text-purple-500 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-white/10">
            {sosAlerts.map((alert) => (
              <div key={alert.id} className={`p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                alert.status === 'active' ? 'bg-red-50/50 dark:bg-red-500/5' : ''
              }`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{alert.student}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                        alert.status === 'active' ? 'bg-red-500/10 text-red-500 animate-pulse' :
                        alert.status === 'responding' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-green-500/10 text-green-500'
                      }`}>
                        {alert.status === 'active' && <Radio className="h-3 w-3" />}
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {alert.location}
                      </span>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {alert.status === 'active' && (
                      <>
                        <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-500 hover:bg-purple-600 transition-colors flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Respond
                        </button>
                        <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Resolve
                        </button>
                      </>
                    )}
                    {alert.status === 'responding' && (
                      <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition-colors">
                        Mark Resolved
                      </button>
                    )}
                    {alert.status === 'resolved' && (
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

        {/* Quick Actions & Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Siren, label: "SOS Alerts", color: "from-red-400 to-red-600", path: "/captain/sos" },
                { icon: AlertTriangle, label: "Strikes", color: "from-purple-400 to-purple-600", path: "/captain/strikes" },
                { icon: Users, label: "Students", color: "from-blue-400 to-blue-600", path: "/captain/students" },
                { icon: Flag, label: "Reports", color: "from-amber-400 to-amber-600", path: "/captain/reports" },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.path}
                  className="group p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all duration-300 text-center hover:-translate-y-1"
                >
                  <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${action.color} mb-2 transition-all duration-300 group-hover:scale-110`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{action.label}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">⚡ Captain's Resources</h3>
            <div className="space-y-3">
              {resources.map((resource) => (
                <div key={resource.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <resource.icon className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{resource.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{resource.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white text-center">
          <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-80" />
          <p className="text-lg font-bold">"A true captain protects their classmates!"</p>
          <p className="text-sm opacity-80 mt-1">Stay alert. Stay responsive. Stay strong.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}