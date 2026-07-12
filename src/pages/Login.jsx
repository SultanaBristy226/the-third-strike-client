import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  GraduationCap,
  Shield,
  ArrowRight,
  Key,
  Hash
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");
  const [loginMethod, setLoginMethod] = useState("roll"); // roll | email
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let loginData;
      
      if (role === "student") {
        // Student Login: Roll Number + Secret Code
        if (!rollNumber || !secretCode) {
          setError("Please enter your Roll Number and Secret Code");
          setIsLoading(false);
          return;
        }
        loginData = { rollNumber, secretCode, role };
      } else {
        // Teacher/Captain Login: Email + Password
        if (!email || !password) {
          setError("Please enter your Email and Password");
          setIsLoading(false);
          return;
        }
        loginData = { email, password, role };
      }

      await login(loginData);
      
      if (role === "student") {
        navigate("/student/dashboard");
      } else if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (role === "captain") {
        navigate("/captain/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="rounded-2xl p-8 shadow-xl transition-all duration-300 bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10">
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Sign in to continue the fight against Kuddus
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "student", label: "Student", icon: User },
                  { value: "teacher", label: "Teacher", icon: GraduationCap },
                  { value: "captain", label: "Captain", icon: Shield },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => {
                      setRole(r.value);
                      setError("");
                    }}
                    className={`p-3 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center gap-1 ${
                      role === r.value
                        ? "text-white shadow-lg"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                    style={{
                      background: role === r.value 
                        ? 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)'
                        : 'transparent',
                      border: role === r.value 
                        ? 'none'
                        : '1px solid #e5e7eb dark:border-white/10',
                    }}
                  >
                    <r.icon className="h-4 w-4" />
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Student Login: Roll Number + Secret Code */}
              {role === "student" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Roll Number
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Enter your roll number (e.g. 101)"
                        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Secret Code
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        placeholder="Enter your secret code"
                        className="w-full rounded-xl pl-10 pr-12 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Teacher/Captain Login: Email + Password */}
              {(role === "teacher" || role === "captain") && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl pl-10 pr-12 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Forgot Password (Only for Teacher/Captain) */}
              {(role === "teacher" || role === "captain") && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline transition-colors">
                    Forgot Password?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl py-3.5 font-extrabold text-sm text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 20px rgba(112,48,239,0.35)',
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                🧪 Demo Credentials
              </p>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                <p><span className="font-bold">Student:</span> Roll: 101 | Secret: ABC123</p>
                <p><span className="font-bold">Teacher:</span> teacher@school.com | password: teacher123</p>
                <p><span className="font-bold">Captain:</span> captain@demo.com | password: captain123</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}