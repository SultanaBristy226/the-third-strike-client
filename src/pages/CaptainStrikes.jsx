import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Calendar,
  Search,
  RefreshCw,
  ArrowLeft,
  Zap,
  Crown,
  FileWarning,
  Filter,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CaptainStrikes() {
  const { token } = useAuth();
  const [strikes, setStrikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    warnings: 0,
    finalWarnings: 0,
    impeachments: 0,
    active: 0,
  });

  useEffect(() => {
    fetchStrikes();
  }, []);

  const fetchStrikes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/strikes`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.success) {
        setStrikes(data.strikes || []);
        calculateStats(data.strikes || []);
      } else {
        setError(data.message || "Failed to load strikes");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (strikesData) => {
    const total = strikesData.length;
    const warnings = strikesData.filter(s => s.type === 'warning').length;
    const finalWarnings = strikesData.filter(s => s.type === 'final_warning').length;
    const impeachments = strikesData.filter(s => s.type === 'impeachment').length;
    const active = strikesData.filter(s => s.status === 'active').length;

    setStats({ total, warnings, finalWarnings, impeachments, active });
  };

  const filteredStrikes = strikes.filter(strike => {
    // Filter by type
    if (filter === 'warning' && strike.type !== 'warning') return false;
    if (filter === 'final_warning' && strike.type !== 'final_warning') return false;
    if (filter === 'impeachment' && strike.type !== 'impeachment') return false;
    if (filter === 'active' && strike.status !== 'active') return false;
    if (filter === 'resolved' && strike.status !== 'resolved') return false;

    // Search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return strike.reason?.toLowerCase().includes(search) ||
             strike.issuedByName?.toLowerCase().includes(search);
    }
    return true;
  });

  const getTypeLabel = (type) => {
    if (type === 'warning') return '⚠️ Warning';
    if (type === 'final_warning') return '🚨 Final Warning';
    if (type === 'impeachment') return '💥 Impeachment';
    return type;
  };

  const getTypeColor = (type) => {
    if (type === 'warning') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (type === 'final_warning') return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    if (type === 'impeachment') return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-gray-500/10 text-gray-500';
  };

  const getStatusColor = (status) => {
    if (status === 'active') return 'bg-red-500/10 text-red-500';
    return 'bg-green-500/10 text-green-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading strikes...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Strikes Management
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View and manage all strikes issued against Kuddus
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link
              to="/captain/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <button
              onClick={fetchStrikes}
              className="p-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors"
            >
              <RefreshCw className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Strikes", value: stats.total, icon: AlertTriangle, color: "text-red-500" },
            { label: "Warnings", value: stats.warnings, icon: Shield, color: "text-yellow-500" },
            { label: "Final Warnings", value: stats.finalWarnings, icon: Zap, color: "text-orange-500" },
            { label: "Impeachments", value: stats.impeachments, icon: Crown, color: "text-purple-500" },
            { label: "Active", value: stats.active, icon: Clock, color: "text-blue-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-${stat.color.split('-')[1]}-500/10`}>
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

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search strikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'warning', 'final_warning', 'impeachment', 'active', 'resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  filter === tab
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white dark:bg-[#0d0a2a] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-purple-500'
                }`}
              >
                {tab === 'all' ? 'All' : 
                 tab === 'warning' ? '⚠️ Warning' :
                 tab === 'final_warning' ? '🚨 Final' :
                 tab === 'impeachment' ? '💥 Impeach' :
                 tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Strikes List */}
        {filteredStrikes.length === 0 ? (
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-12 border border-gray-200 dark:border-white/10 text-center">
            <div className="text-6xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No strikes found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {searchTerm ? 'No strikes match your search.' : 'No strikes have been issued yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStrikes.map((strike) => (
              <div
                key={strike._id}
                className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTypeColor(strike.type)}`}>
                        {getTypeLabel(strike.type)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(strike.status)}`}>
                        {strike.status?.toUpperCase() || 'ACTIVE'}
                      </span>
                      {strike.type === 'impeachment' && (
                        <span className="text-xs font-bold text-red-500 animate-pulse">🎉 IMPEACHED!</span>
                      )}
                    </div>

                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{strike.reason}</p>
                    {strike.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">📝 {strike.notes}</p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> Issued by: {strike.issuedByName || 'Teacher'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(strike.createdAt).toLocaleString()}
                      </span>
                      {strike.complaintId && (
                        <span className="flex items-center gap-1 text-purple-500">
                          <FileWarning className="h-3 w-3" /> Complaint linked
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {strike.status === 'active' && (
                      <button
                        onClick={async () => {
                          try {
                            await fetch(`${API_URL}/strikes/${strike._id}/status`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                              },
                              body: JSON.stringify({ status: 'resolved' }),
                            });
                            fetchStrikes();
                          } catch (err) {
                            console.error('Error resolving strike:', err);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition-colors"
                      >
                        <CheckCircle className="h-3 w-3 inline mr-1" /> Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Kuddus Status */}
        {stats.impeachments > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-500/10 dark:to-pink-500/10 border-2 border-red-500/20 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-black text-red-600 dark:text-red-400">KUDDUS HAS BEEN IMPEACHED!</h3>
            <p className="text-sm text-red-500 dark:text-red-400/80">
              Three strikes and Kuddus is out! Justice has been served.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}