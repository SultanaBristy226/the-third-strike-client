import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileWarning,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  ArrowLeft,
  Shield,
  Zap,
  Crown,
  Key,
  Image,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TeacherAudit() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
    totalStrikes: 0,
    warnings: 0,
    finalWarnings: 0,
    impeachments: 0,
  });

  useEffect(() => {
    fetchAuditLogs();
  }, [filter]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      
      // Fetch complaints
      const complaintRes = await fetch(`${API_URL}/complaints`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const complaintData = await complaintRes.json();
      
      // Fetch strikes
      const strikeRes = await fetch(`${API_URL}/strikes`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const strikeData = await strikeRes.json();

      if (complaintData.success) {
        const complaints = complaintData.complaints || [];
        const strikes = strikeData.success ? strikeData.strikes || [] : [];

        // Combine and format logs
        const complaintLogs = complaints.map(c => ({
          id: c._id,
          type: 'complaint',
          category: c.category,
          description: c.description,
          status: c.status,
          anonymousId: c.anonymousId,
          evidenceURL: c.evidenceURL,
          createdAt: c.createdAt,
          verifiedBy: c.verifiedBy,
          verifiedAt: c.verifiedAt,
        }));

        const strikeLogs = strikes.map(s => ({
          id: s._id,
          type: 'strike',
          strikeType: s.type,
          reason: s.reason,
          notes: s.notes,
          status: s.status,
          issuedBy: s.issuedByName,
          createdAt: s.createdAt,
        }));

        // Combine and sort by date
        const allLogs = [...complaintLogs, ...strikeLogs]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setLogs(allLogs);

        // Calculate stats
        setStats({
          totalComplaints: complaints.length,
          pending: complaints.filter(c => c.status === 'pending').length,
          verified: complaints.filter(c => c.status === 'verified').length,
          rejected: complaints.filter(c => c.status === 'rejected').length,
          totalStrikes: strikes.length,
          warnings: strikes.filter(s => s.type === 'warning').length,
          finalWarnings: strikes.filter(s => s.type === 'final_warning').length,
          impeachments: strikes.filter(s => s.type === 'impeachment').length,
        });
      }
    } catch (err) {
      setError("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    // Filter by type
    if (filter === 'complaints' && log.type !== 'complaint') return false;
    if (filter === 'strikes' && log.type !== 'strike') return false;
    
    // Search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      if (log.type === 'complaint') {
        return log.category?.toLowerCase().includes(search) ||
               log.description?.toLowerCase().includes(search) ||
               log.anonymousId?.toLowerCase().includes(search);
      } else {
        return log.reason?.toLowerCase().includes(search) ||
               log.notes?.toLowerCase().includes(search);
      }
    }
    return true;
  });

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-500/10 text-yellow-500';
    if (status === 'verified') return 'bg-green-500/10 text-green-500';
    if (status === 'rejected') return 'bg-red-500/10 text-red-500';
    return 'bg-gray-500/10 text-gray-500';
  };

  const getTypeColor = (type) => {
    if (type === 'complaint') return 'bg-blue-500/10 text-blue-500';
    if (type === 'strike') return 'bg-red-500/10 text-red-500';
    return 'bg-gray-500/10 text-gray-500';
  };

  const getCategoryLabel = (category) => {
    const map = {
      tiffin_theft: '🍱 Tiffin Theft',
      bribe: '💰 Bribe',
      syllabus_bloat: '📚 Syllabus Bloat',
      misuse_of_power: '👑 Misuse of Power',
      other: '📌 Other',
    };
    return map[category] || category;
  };

  const getStrikeTypeLabel = (type) => {
    if (type === 'warning') return '⚠️ Warning';
    if (type === 'final_warning') return '🚨 Final Warning';
    if (type === 'impeachment') return '💥 Impeachment';
    return type;
  };

  const exportCSV = () => {
    const headers = ['Type', 'Category/Type', 'Description/Reason', 'Status', 'Date', 'ID'];
    const rows = filteredLogs.map(log => {
      if (log.type === 'complaint') {
        return [
          'Complaint',
          getCategoryLabel(log.category),
          log.description?.slice(0, 50) + '...',
          log.status,
          new Date(log.createdAt).toLocaleDateString(),
          log.anonymousId,
        ];
      } else {
        return [
          'Strike',
          getStrikeTypeLabel(log.strikeType),
          log.reason,
          log.status,
          new Date(log.createdAt).toLocaleDateString(),
          log.id?.slice(0, 8),
        ];
      }
    });

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading audit logs...</p>
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
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Audit Log
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View complete history of all complaints, strikes, and actions taken
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link
              to="/teacher/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
              }}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={fetchAuditLogs}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Complaints", value: stats.totalComplaints, icon: FileWarning, color: "text-blue-500" },
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-yellow-500" },
            { label: "Verified", value: stats.verified, icon: CheckCircle, color: "text-green-500" },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10">
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

        {/* Strike Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Strikes", value: stats.totalStrikes, icon: AlertTriangle, color: "text-red-500" },
            { label: "Warnings", value: stats.warnings, icon: Shield, color: "text-yellow-500" },
            { label: "Final Warnings", value: stats.finalWarnings, icon: Zap, color: "text-orange-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10">
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'complaints', 'strikes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  filter === tab
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white dark:bg-[#0d0a2a] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-purple-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Logs List */}
        {filteredLogs.length === 0 ? (
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-12 border border-gray-200 dark:border-white/10 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No logs found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {searchTerm ? 'No logs match your search criteria.' : 'No activity has been recorded yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTypeColor(log.type)}`}>
                        {log.type.toUpperCase()}
                      </span>
                      {log.type === 'complaint' ? (
                        <>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {getCategoryLabel(log.category)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                          {log.evidenceURL && (
                            <span className="text-xs text-purple-500 flex items-center gap-1">
                              <Image className="h-3 w-3" /> Evidence
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {getStrikeTypeLabel(log.strikeType)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </>
                      )}
                    </div>

                    {log.type === 'complaint' ? (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{log.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Key className="h-3 w-3" /> {log.anonymousId || 'Anonymous'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {new Date(log.createdAt).toLocaleString()}
                          </span>
                          {log.verifiedAt && (
                            <span className="flex items-center gap-1 text-green-500">
                              <CheckCircle className="h-3 w-3" /> Verified: {new Date(log.verifiedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{log.reason}</p>
                        {log.notes && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">📝 {log.notes}</p>
                        )}
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> Issued by: {log.issuedBy || 'Teacher'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {new Date(log.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}