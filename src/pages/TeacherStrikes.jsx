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
  FileWarning,
  ArrowLeft,
  Zap,
  Crown,
  Send,
  Plus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TeacherStrikes() {
  const { token } = useAuth();
  const [strikes, setStrikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [strikeData, setStrikeData] = useState({
    type: 'warning',
    reason: '',
    notes: '',
  });
  const [complaints, setComplaints] = useState([]);

  // Fetch strikes and complaints
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch strikes
      const strikeRes = await fetch(`${API_URL}/strikes`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const strikeData = await strikeRes.json();
      if (strikeData.success) {
        setStrikes(strikeData.strikes || []);
      }

      // Fetch verified complaints (for issuing strikes)
      const complaintRes = await fetch(`${API_URL}/complaints?status=verified`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const complaintData = await complaintRes.json();
      if (complaintData.success) {
        setComplaints(complaintData.complaints || []);
      }
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleIssueStrike = async (e) => {
    e.preventDefault();
    if (!strikeData.reason) {
      setError("Please provide a reason for the strike");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/strikes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          complaintId: selectedComplaint?._id,
          type: strikeData.type,
          reason: strikeData.reason,
          notes: strikeData.notes,
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`✅ ${strikeData.type === 'warning' ? 'Warning' : 'Final Warning'} issued successfully!`);
        setShowModal(false);
        setStrikeData({ type: 'warning', reason: '', notes: '' });
        setSelectedComplaint(null);
        fetchData();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to issue strike");
      }
    } catch (err) {
      setError("Failed to issue strike");
    }
  };

  const getTypeColor = (type) => {
    if (type === 'warning') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (type === 'final_warning') return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    if (type === 'impeachment') return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-gray-500/10 text-gray-500';
  };

  const getTypeLabel = (type) => {
    if (type === 'warning') return '⚠️ Warning';
    if (type === 'final_warning') return '🚨 Final Warning';
    if (type === 'impeachment') return '💥 Impeachment';
    return type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
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
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Issue Strikes
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Review evidence and issue official strikes against Kuddus
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
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
              }}
            >
              <Plus className="h-4 w-4" />
              Issue Strike
            </button>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Strikes", value: strikes.length, icon: AlertTriangle, color: "text-red-500" },
            { label: "Warnings", value: strikes.filter(s => s.type === 'warning').length, icon: Shield, color: "text-yellow-500" },
            { label: "Final Warnings", value: strikes.filter(s => s.type === 'final_warning').length, icon: Zap, color: "text-orange-500" },
            { label: "Impeachments", value: strikes.filter(s => s.type === 'impeachment').length, icon: Crown, color: "text-red-500" },
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

        {/* Verified Complaints List (for issuing strikes) */}
        {complaints.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-green-500" />
              Verified Complaints Ready for Strike
            </h3>
            <div className="grid gap-3">
              {complaints.slice(0, 3).map((complaint) => (
                <div key={complaint._id} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{complaint.category}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{complaint.description?.slice(0, 80)}...</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-500 hover:bg-purple-600 transition-colors"
                  >
                    Issue Strike
                  </button>
                </div>
              ))}
              {complaints.length > 3 && (
                <p className="text-xs text-gray-400 text-center">+{complaints.length - 3} more complaints</p>
              )}
            </div>
          </div>
        )}

        {/* Strikes History */}
        <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white">⚡ Strike History</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">All strikes issued against Kuddus</p>
          </div>

          {strikes.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🛡️</div>
              <p className="text-gray-500 dark:text-gray-400">No strikes issued yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-white/10">
              {strikes.map((strike) => (
                <div key={strike._id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getTypeColor(strike.type)}`}>
                          {getTypeLabel(strike.type)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(strike.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{strike.reason}</p>
                      {strike.notes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">📝 {strike.notes}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Issued by: {strike.issuedByName || 'Teacher'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        strike.status === 'active' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                      }`}>
                        {strike.status?.toUpperCase() || 'ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Issue Strike Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">⚡ Issue Strike</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedComplaint(null);
                  setStrikeData({ type: 'warning', reason: '', notes: '' });
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {selectedComplaint && (
              <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-sm">
                <p className="font-bold text-gray-700 dark:text-gray-300">Complaint:</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedComplaint.description?.slice(0, 100)}...</p>
                <p className="text-xs text-gray-400 mt-1">Category: {selectedComplaint.category}</p>
              </div>
            )}

            <form onSubmit={handleIssueStrike} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Strike Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={strikeData.type}
                  onChange={(e) => setStrikeData({ ...strikeData, type: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                >
                  <option value="warning">⚠️ Warning (1st Strike)</option>
                  <option value="final_warning">🚨 Final Warning (2nd Strike)</option>
                  <option value="impeachment">💥 Impeachment (3rd Strike)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Reason <span className="text-red-500">*</span>
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
                className="w-full rounded-xl py-3 font-bold text-white text-sm flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
                }}
              >
                <Send className="h-4 w-4" />
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