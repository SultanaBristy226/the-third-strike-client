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
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    rollNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Register page specific images
  const lightBgImage = "https://images.unsplash.com/photo-1623287072802-ca4ecbec4861?w=1600&auto=format&fit=crop&q=80";
  const darkBgImage = "https://images.unsplash.com/photo-1623287072802-ca4ecbec4861?w=1600&auto=format&fit=crop&q=80&sat=-100&bright=-30";

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#090820] transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
            style={{
              backgroundImage: `url('${theme === 'dark' ? darkBgImage : lightBgImage}')`,
              filter: theme === 'dark' ? 'brightness(0.4) saturate(0.6)' : 'brightness(0.7) saturate(1.1)',
            }}
          />
          <div 
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(9,8,32,0.85) 0%, rgba(9,8,32,0.6) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
            }}
          />
          
          <div className="w-full max-w-md relative z-10">
            <div 
              className="rounded-2xl p-12 shadow-2xl transition-all duration-500 backdrop-blur-xl border text-center"
              style={{
                background: theme === 'dark' 
                  ? 'rgba(9,8,32,0.85)'
                  : 'rgba(255,255,255,0.85)',
                borderColor: theme === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.3)',
              }}
            >
              <div className="inline-flex p-4 rounded-full mb-6"
                   style={{
                     background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                   }}>
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 mb-6">
                Welcome to the resistance! Redirecting to login...
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                }}
              >
                Go to Login <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Image - Register page specific */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('${theme === 'dark' ? darkBgImage : lightBgImage}')`,
            filter: theme === 'dark' ? 'brightness(0.4) saturate(0.6)' : 'brightness(0.7) saturate(1.1)',
          }}
        />
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, rgba(9,8,32,0.85) 0%, rgba(9,8,32,0.6) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
          }}
        />

        <div className="w-full max-w-md relative z-10">
          {/* Register Card - Glassmorphism */}
          <div 
            className="rounded-2xl p-8 shadow-2xl transition-all duration-500 backdrop-blur-xl border"
            style={{
              background: theme === 'dark' 
                ? 'rgba(9,8,32,0.85)'
                : 'rgba(255,255,255,0.85)',
              borderColor: theme === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(255,255,255,0.3)',
            }}
          >
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
                Join the Resistance
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-1">
                Create your account to fight against Kuddus
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl text-sm font-medium flex items-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20">
                <AlertCircle className="h-4 w-4" />
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
                    onClick={() => setFormData({ ...formData, role: r.value })}
                    className={`p-3 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center gap-1 ${
                      formData.role === r.value
                        ? "text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10"
                    }`}
                    style={{
                      background: formData.role === r.value 
                        ? 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)'
                        : 'rgba(255,255,255,0.1)',
                      border: formData.role === r.value 
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <r.icon className="h-4 w-4" />
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 backdrop-blur-sm"
                  style={{
                    background: theme === 'dark' 
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(255,255,255,0.8)',
                    border: theme === 'dark'
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(255,255,255,0.3)',
                    color: theme === 'dark' ? '#ffffff' : '#090820',
                  }}
                  required
                />
              </div>

              {/* Roll Number */}
              {formData.role === "student" && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter your roll number"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 backdrop-blur-sm"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.8)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.3)',
                      color: theme === 'dark' ? '#ffffff' : '#090820',
                    }}
                    required={formData.role === "student"}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 backdrop-blur-sm"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.8)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.3)',
                      color: theme === 'dark' ? '#ffffff' : '#090820',
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password (min 6 chars)"
                    className="w-full rounded-xl pl-10 pr-12 py-3 text-sm outline-none transition-all duration-200 backdrop-blur-sm"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.8)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.3)',
                      color: theme === 'dark' ? '#ffffff' : '#090820',
                    }}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl pl-10 pr-12 py-3 text-sm outline-none transition-all duration-200 backdrop-blur-sm"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.8)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.3)',
                      color: theme === 'dark' ? '#ffffff' : '#090820',
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

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
                {isLoading ? "Creating Account..." : "Join the Resistance"}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-purple-600 dark:text-purple-400 hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}