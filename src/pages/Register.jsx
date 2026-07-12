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
  ArrowRight,
  Key,
  Hash
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Default: student
    rollNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [generatedSecret, setGeneratedSecret] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!formData.name) {
      setError("Please enter your name");
      setIsLoading(false);
      return;
    }

    if (formData.role === "student" && !formData.rollNumber) {
      setError("Please enter your roll number");
      setIsLoading(false);
      return;
    }

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
      const result = await register(formData);
      
      // If student, save the generated secret code
      if (result.role === "student" && result.secretCode) {
        setGeneratedSecret(result.secretCode);
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#090820] transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="rounded-2xl p-8 shadow-xl transition-all duration-300 bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 text-center">
              <div className="inline-flex p-4 rounded-full mb-6"
                   style={{
                     background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                   }}>
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                {formData.role === "student" ? "🎓 Student Registered!" : "Account Created!"}
              </h2>
              
              {formData.role === "student" && generatedSecret && (
                <div className="mb-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border-2 border-yellow-400 dark:border-yellow-500">
                  <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">🔑 Your Secret Code</p>
                  <p className="text-2xl font-black text-yellow-600 dark:text-yellow-400 mt-1">
                    {generatedSecret}
                  </p>
                  <p className="text-xs text-yellow-500 dark:text-yellow-400/80 mt-1">
                    ⚠️ Save this code! You'll need it to login.
                  </p>
                </div>
              )}

              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {formData.role === "student" 
                  ? `Student account created! Roll: ${formData.rollNumber}`
                  : `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} account created!`}
                <br />
                Redirecting to login...
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

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-8 shadow-xl transition-all duration-300 bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10">
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {formData.role === "student" ? "🎓 Student Registration" : "Create Account"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.role === "student" 
                  ? "Register as a student to fight against Kuddus" 
                  : "Register as Teacher or Captain"}
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
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Role <span className="text-red-500">*</span>
                </label>
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
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                      style={{
                        background: formData.role === r.value 
                          ? 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)'
                          : 'transparent',
                        border: formData.role === r.value 
                          ? 'none'
                          : '1px solid #e5e7eb dark:border-white/10',
                      }}
                    >
                      <r.icon className="h-4 w-4" />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                  required
                />
              </div>

              {/* Roll Number - Only for Student */}
              {formData.role === "student" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="Enter your roll number (e.g. 101)"
                      className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">🔑 Your secret code will be auto-generated!</p>
                </div>
              )}

              {/* Email - Only for Teacher/Captain */}
              {(formData.role === "teacher" || formData.role === "captain") && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                      required={formData.role !== "student"}
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password (min 6 chars)"
                    className="w-full rounded-xl pl-10 pr-12 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                    required
                    minLength={6}
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl pl-10 pr-12 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
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
                {isLoading ? "Creating Account..." : "Register"}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
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