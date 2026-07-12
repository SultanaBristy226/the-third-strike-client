import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Siren,
  MapPin,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Radio,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SOS() {
  const { user } = useAuth();
  const { emit } = useSocket();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [alertSent, setAlertSent] = useState(null);

  const locations = [
    "Classroom - 2nd Floor",
    "Library",
    "Canteen",
    "Playground",
    "Corridor - East Wing",
    "Corridor - West Wing",
    "Computer Lab",
    "Science Lab",
    "Auditorium",
    "Assembly Hall",
    "Sports Complex",
    "Parking Area",
  ];

  const handleSendSOS = async (e) => {
    e.preventDefault();
    if (!location) {
      setError("Please select your location");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      // Emit SOS via socket
      emit("sos_alert", {
        studentId: user?.id || "anonymous",
        studentName: user?.displayName || "Anonymous Student",
        location,
        message: message || "Emergency! Kuddus is attacking!",
        timestamp: new Date().toISOString(),
        status: "active",
      });

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAlertSent({
        location,
        message: message || "Emergency! Kuddus is attacking!",
        time: new Date().toLocaleTimeString(),
      });
      
      setSuccess(true);
    } catch (err) {
      setError("Failed to send SOS. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (success && alertSent) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center">
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-xl">
              <div className="inline-flex p-4 rounded-full mb-6 bg-gradient-to-br from-red-400 to-red-600 animate-pulse">
                <Siren className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                🚨 SOS Sent Successfully!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Captains have been alerted to your location. Help is on the way!
              </p>
              
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 text-left mb-6">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">📍 Location: {alertSent.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">📝 {alertSent.message}</p>
                <p className="text-xs text-gray-400 mt-2">⏰ Sent at: {alertSent.time}</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/student/dashboard")}
                  className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setAlertSent(null);
                    setLocation("");
                    setMessage("");
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-purple-500 border-2 border-purple-500 hover:bg-purple-500 hover:text-white transition-all"
                >
                  Send Another SOS
                </button>
              </div>
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-red-600 animate-pulse">
            <Siren className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              SOS Emergency
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.role === "captain" ? "View and respond to SOS alerts" : "Send an instant emergency alert to captains"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <form onSubmit={handleSendSOS} className="space-y-5">
              {/* Warning */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/20">
                <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                <div>
                  <p className="text-sm font-bold text-red-500">⚠️ Only use for real emergencies!</p>
                  <p className="text-xs text-red-400">False alarms will be penalized</p>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Your Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 appearance-none"
                    required
                  >
                    <option value="">Select your location...</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Emergency Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what's happening..."
                  rows="3"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
                />
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
                disabled={isSending}
                className="w-full rounded-xl py-4 font-extrabold text-sm text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  boxShadow: '0 4px 20px rgba(239,68,68,0.4)',
                }}
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending SOS...
                  </>
                ) : (
                  <>
                    <Siren className="h-5 w-5" />
                    🚨 Send SOS Alert
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">🚨 SOS Guide</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "24/7 Available", desc: "Send SOS anytime" },
                  { icon: Users, label: "Captains Alerted", desc: "Biltu & Miltu get notified" },
                  { icon: Radio, label: "Real-time Tracking", desc: "Instant location sharing" },
                  { icon: Shield, label: "Safe & Secure", desc: "Your identity is protected" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="p-1.5 rounded-lg bg-red-500/10 mt-0.5">
                      <item.icon className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 Quick Tips</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">📍 Be Specific</p>
                  <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80">Mention exact location for faster response</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">📝 Describe Clearly</p>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Explain what Kuddus is doing right now</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">📊 SOS Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Active Alerts</span>
                  <span className="font-bold text-red-500">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Responded</span>
                  <span className="font-bold text-green-500">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Avg Response Time</span>
                  <span className="font-bold text-blue-500">2.5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}