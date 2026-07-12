import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, Bell, LogOut, Menu, X, Sun, Moon, Swords, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const roleLinks = {
  student: [
    { to: "/student/dashboard", label: "Dashboard" },
    { to: "/student/complaint", label: "Report" },
    { to: "/student/sos", label: "SOS" },
    { to: "/student/syllabus", label: "Syllabus AI" },
  ],
  captain: [
    { to: "/captain/dashboard", label: "Dashboard" },
    { to: "/captain/sos", label: "SOS Alerts" },
    { to: "/captain/strikes", label: "Strikes" },
  ],
  teacher: [
    { to: "/teacher/dashboard", label: "Dashboard" },
    { to: "/teacher/complaints", label: "Review" },
    { to: "/teacher/strikes", label: "Strikes" },
    { to: "/teacher/audit", label: "Audit Log" },
  ],
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const links = user ? roleLinks[user.role] || [] : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#090820]/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
      style={{
        borderColor: scrolled ? 'rgba(112,48,239,0.1)' : 'transparent',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ background: 'linear-gradient(135deg, #7030ef, #db1fff)' }} />
            <div className="relative p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                 style={{
                   background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                 }}>
              <Swords className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-lg text-[#090820] dark:text-white">
              The Third <span style={{ color: '#7030ef' }}>Strike</span>
            </span>
            <p className="text-[8px] font-bold uppercase tracking-wider text-[#4a4a5a] dark:text-white/40 -mt-0.5">
              ⚔️ Three Strikes. One Impeachment. ⚔️
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm font-bold transition-colors duration-200"
              style={{
                color: isActive(l.to) ? '#7030ef' : '#4a4a5a',
              }}
            >
              {l.label}
              <span className="absolute left-0 -bottom-1.5 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: 'linear-gradient(135deg, #7030ef, #db1fff)' }} />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 transition-all duration-200 hover:rotate-45"
            style={{
              color: '#7030ef',
              background: 'rgba(112,48,239,0.08)',
            }}
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {user ? (
            <>
              <button className="relative rounded-full p-2.5 transition-colors duration-200"
                      style={{
                        color: '#7030ef',
                        background: 'rgba(112,48,239,0.08)',
                      }}>
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </button>
              <span className="text-sm font-medium text-[#4a4a5a] dark:text-white/70">
                {user.displayName || user.name}
              </span>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-xs">
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </>
          ) : (
            <>
              {/* Register Button - New */}
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  border: '2px solid #7030ef',
                  color: '#7030ef',
                  background: 'transparent',
                }}
              >
                <UserPlus className="h-4 w-4" />
                Join
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 15px rgba(112,48,239,0.35)',
                }}
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme}
                  className="rounded-full p-2"
                  style={{ background: 'rgba(112,48,239,0.08)', color: '#7030ef' }}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={() => setOpen(!open)}
                  className="rounded-full p-2"
                  style={{ background: 'rgba(112,48,239,0.08)', color: '#7030ef' }}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 py-4 space-y-2 border-t"
             style={{
               background: 'rgba(255,255,255,0.95)',
               backdropFilter: 'blur(12px)',
               borderColor: 'rgba(112,48,239,0.1)',
             }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block py-2.5 text-sm font-bold"
                  style={{ color: isActive(l.to) ? '#7030ef' : '#4a4a5a' }}
                  onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-1.5 py-2.5 font-medium text-red-500">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'rgba(112,48,239,0.1)' }}>
              <Link 
                to="/register" 
                className="block w-full text-center rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300"
                style={{
                  border: '2px solid #7030ef',
                  color: '#7030ef',
                  background: 'transparent',
                }}
                onClick={() => setOpen(false)}
              >
                Join the Resistance
              </Link>
              <Link 
                to="/login" 
                className="block w-full text-center rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                }}
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}