import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileWarning,
  Send,
  AlertTriangle,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Camera,
  Image,
  Paperclip,
  X,
  Sparkles,
  Shield,
  Eye,
  ChevronRight,
  Key,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ComplaintForm() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    evidence: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [complaintCode, setComplaintCode] = useState("");

  const categories = [
    { value: "tiffin_theft", label: "🍱 Tiffin Theft", icon: "🍱" },
    { value: "bribe", label: "💰 Bribe / Toll", icon: "💰" },
    { value: "syllabus_bloat", label: "📚 Syllabus Bloat", icon: "📚" },
    { value: "misuse_of_power", label: "👑 Misuse of Power", icon: "👑" },
    { value: "other", label: "📌 Other", icon: "📌" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, evidence: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.category) {
      setError("Please select a category");
      setIsSubmitting(false);
      return;
    }
    if (!formData.description || formData.description.length < 10) {
      setError("Please provide a detailed description (min 10 characters)");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      if (formData.evidence) {
        formDataToSend.append('evidence', formData.evidence);
      }

      const response = await fetch(`${API_URL}/complaints`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      
      if (data.success) {
        setComplaintCode(data.complaint.complaintCode || 'TTS-A82K9');
        setSuccess(true);
        setTimeout(() => {
          navigate("/student/dashboard");
        }, 3000);
      } else {
        setError(data.message || "Failed to submit complaint");
      }
    } catch (err) {
      setError("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center">
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-8 border border-gray-200 dark:border-white/10">
              <div className="inline-flex p-4 rounded-full mb-6 bg-gradient-to-br from-green-400 to-green-600">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                Complaint Submitted! 🎉
              </h2>
              
              {/* Anonymous Complaint Code */}
              <div className="mb-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-500/10 border-2 border-purple-400 dark:border-purple-500">
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">🔑 Your Anonymous Complaint Code</p>
                <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 tracking-wider">
                  {complaintCode}
                </p>
                <p className="text-xs text-purple-500 dark:text-purple-400/80 mt-1">
                  ⚠️ Use this code to track your complaint status
                </p>
              </div>

              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Your anonymous complaint has been sent to the teacher for review.
                Your identity is completely hidden.
              </p>
              <button
                onClick={() => navigate("/student/dashboard")}
                className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-4xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600">
            <FileWarning className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              Report Kuddus
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Submit an anonymous complaint against Kuddus's atrocities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anonymous Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Key className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">
                  🔒 This report is completely anonymous
                </span>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 text-left ${
                        formData.category === cat.value
                          ? "text-white shadow-lg"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                      style={{
                        background: formData.category === cat.value 
                          ? 'linear-gradient(135deg, #7030ef, #db1fff)'
                          : 'rgba(112,48,239,0.05)',
                        border: formData.category === cat.value 
                          ? 'none'
                          : '1px solid rgba(112,48,239,0.1)',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what Kuddus did in detail..."
                  rows="5"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Evidence Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Evidence (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 hover:border-purple-500 transition-colors">
                      <Camera className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {formData.evidence ? formData.evidence.name : "Upload photo evidence"}
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.evidence && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, evidence: null })}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl py-3.5 font-extrabold text-sm text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 20px rgba(112,48,239,0.35)',
                }}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Anonymous Complaint
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar - Info */}
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 h-fit">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">📋 Complaint Guide</h3>
            <div className="space-y-3">
              {[
                { icon: Shield, label: "100% Anonymous", desc: "Your identity is never revealed" },
                { icon: Key, label: "Complaint Code", desc: "Track your complaint anonymously" },
                { icon: Eye, label: "Teacher Review", desc: "Every complaint is reviewed" },
                { icon: AlertTriangle, label: "3 Strikes Rule", desc: "3 verified complaints = impeachment" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 mt-0.5">
                    <item.icon className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}