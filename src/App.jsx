import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SocketProvider } from "./context/SocketContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import CaptainDashboard from "./pages/CaptainDashboard";
import ComplaintForm from "./pages/ComplaintForm";
import SOS from "./pages/SOS";
import SeatPlanner from "./pages/SeatPlanner";
import Ledger from "./pages/Ledger";
import FactChecker from "./pages/FactChecker";
import SyllabusAI from "./pages/SyllabusAI";
import TeacherComplaints from "./pages/TeacherComplaints";
import TeacherStrikes from "./pages/TeacherStrikes";
import TeacherAudit from "./pages/TeacherAudit";
import CaptainStrikes from "./pages/CaptainStrikes";
import { useAuth } from "./context/AuthContext";

// ============================================
// PROTECTED ROUTE
// ============================================
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ============================================
// ROLE BASED ROUTE
// ============================================
const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// ============================================
// PLACEHOLDER PAGE
// ============================================
const PlaceholderPage = ({ title, icon, description, backLink }) => (
  <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#f0f4f8] dark:bg-[#090820]">
    <div className="max-w-md w-full text-center">
      <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-8 border border-gray-200 dark:border-white/10">
        <div className="text-6xl mb-4">{icon || "🚧"}</div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
          {title || "Coming Soon"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {description || "This page is under construction. The resistance is working on it!"}
        </p>
        <Link 
          to={backLink || "/"} 
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
            boxShadow: '0 4px 20px rgba(112,48,239,0.35)',
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  </div>
);

// ============================================
// MAIN ROUTES
// ============================================
function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== STUDENT ROUTES ===== */}
      <Route path="/student/dashboard" element={
        <RoleRoute allowedRoles={["student"]}>
          <StudentDashboard />
        </RoleRoute>
      } />
      <Route path="/student/complaint" element={
        <RoleRoute allowedRoles={["student"]}>
          <ComplaintForm />
        </RoleRoute>
      } />
      <Route path="/student/sos" element={
        <RoleRoute allowedRoles={["student"]}>
          <SOS />
        </RoleRoute>
      } />
      <Route path="/student/syllabus" element={
        <RoleRoute allowedRoles={["student"]}>
          <SyllabusAI />
        </RoleRoute>
      } />

      {/* ===== TEACHER ROUTES ===== */}
      <Route path="/teacher/dashboard" element={
        <RoleRoute allowedRoles={["teacher"]}>
          <TeacherDashboard />
        </RoleRoute>
      } />
      <Route path="/teacher/complaints" element={
        <RoleRoute allowedRoles={["teacher"]}>
          <TeacherComplaints />
        </RoleRoute>
      } />
      <Route path="/teacher/strikes" element={
        <RoleRoute allowedRoles={["teacher"]}>
          <TeacherStrikes />
        </RoleRoute>
      } />
      <Route path="/teacher/audit" element={
        <RoleRoute allowedRoles={["teacher"]}>
          <TeacherAudit />
        </RoleRoute>
      } />

      {/* ===== CAPTAIN ROUTES ===== */}
      <Route path="/captain/dashboard" element={
        <RoleRoute allowedRoles={["captain"]}>
          <CaptainDashboard />
        </RoleRoute>
      } />
      <Route path="/captain/sos" element={
        <RoleRoute allowedRoles={["captain"]}>
          <SOS />
        </RoleRoute>
      } />
      <Route path="/captain/strikes" element={
        <RoleRoute allowedRoles={["captain"]}>
          <CaptainStrikes />
        </RoleRoute>
      } />

      {/* ===== FEATURE ROUTES (Protected) ===== */}
      <Route path="/seat-planner" element={
        <ProtectedRoute>
          <SeatPlanner />
        </ProtectedRoute>
      } />
      <Route path="/ledger" element={
        <ProtectedRoute>
          <Ledger />
        </ProtectedRoute>
      } />
      <Route path="/fact-checker" element={
        <ProtectedRoute>
          <FactChecker />
        </ProtectedRoute>
      } />

      {/* ===== 404 NOT FOUND ===== */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#090820]">
          <div className="text-center max-w-md">
            <div className="text-8xl font-black text-purple-500">404</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              Page Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] mt-6"
              style={{
                background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                boxShadow: '0 4px 20px rgba(112,48,239,0.35)',
              }}
            >
              Go Home
            </Link>
          </div>
        </div>
      } />
    </Routes>
  );
}

// ============================================
// APP
// ============================================
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <AppRoutes />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;