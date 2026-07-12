import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileWarning,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  ChevronRight,
  AlertTriangle,
  Shield,
  User,
  Calendar,
  Image,
  Key,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TeacherComplaints() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch complaints
  useEffect(() => {
    fetchComplaints();
  }, [filter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const url = filter === "all" 
        ? `${API_URL}/complaints` 
        : `${API_URL}/complaints?status=${filter}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.success) {
        setComplaints(data.complaints || []);
      } else {
        setError(data.message || "Failed to fetch complaints");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify/Reject
  const handleAction = async (complaintId, action) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/complaints/${complaintId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(`✅ Complaint ${action === 'verify' ? 'verified' : 'rejected'} successfully!`);
        fetchComplaints();
        setSelectedComplaint(null);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(data.message || "Action failed");
      }
    } catch (err) {
      setError("Failed to process action");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (status === 'verified') return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (status === 'rejected') return 'bg-red-500/10 text-red-500 border-red-500/20';
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading complaints...</p>
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
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
                <FileWarning className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Complaint Review
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Review and manage anonymous complaints against Kuddus
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
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: complaints.length, icon: FileWarning, color: "text-blue-500" },
            { label: "Pending", value: complaints.filter(c => c.status === 'pending').length, icon: Clock, color: "text-yellow-500" },
            { label: "Verified", value: complaints.filter(c => c.status === 'verified').length, icon: CheckCircle, color: "text-green-500" },
            { label: "Rejected", value: complaints.filter(c => c.status === 'rejected').length, icon: XCircle, color: "text-red-500" },
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

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'pending', 'verified', 'rejected'].map((tab) => (
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

        {/* Complaints List */}
        {complaints.length === 0 ? (
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-12 border border-gray-200 dark:border-white/10 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No complaints found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {filter === 'all' 
                ? 'No complaints have been submitted yet.' 
                : `No ${filter} complaints found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Key className="h-4 w-4 text-purple-500" />
                        {complaint.anonymousId || 'Anonymous'}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                        {complaint.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{complaint.complaintCode || 'TTS-000'}</span>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="font-bold text-purple-500">{getCategoryLabel(complaint.category)}</span>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {complaint.description}
                    </p>

                    {/* Evidence */}
                    {complaint.evidenceURL && (
                      <div className="flex items-center gap-2 text-xs text-purple-500">
                        <Image className="h-4 w-4" />
                        <span>Evidence attached</span>
                      </div>
                    )}

                    {/* Verified Info */}
                    {complaint.status === 'verified' && complaint.verifiedAt && (
                      <div className="mt-2 text-xs text-gray-400">
                        Verified by Teacher on {new Date(complaint.verifiedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    {complaint.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(complaint._id, 'verify')}
                          disabled={actionLoading}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <CheckCircle className="h-3 w-3" /> Verify
                        </button>
                        <button
                          onClick={() => handleAction(complaint._id, 'reject')}
                          disabled={actionLoading}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </>
                    )}
                    {complaint.status !== 'pending' && (
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
                      >
                        <Eye className="h-3 w-3 inline mr-1" /> Details
                      </button>
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