import { Link } from "react-router-dom";
import {
  Swords,
  ArrowRight,
  Sparkles,
  Eye,
  Bell,
  CheckCircle,
  Award,
  Lock,
  UserCheck,
  Radio,
  CheckCircle2,
  Users,
  Clock,
  Zap,
  Target,
  Shield,
  Crown,
  UserPlus,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: Eye,
    title: "Anonymous Whistleblower",
    desc: "Report Kuddus's atrocities without fear. Your identity stays completely hidden.",
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    desc: "Instant notifications for SOS and strike updates across the class.",
  },
  {
    icon: CheckCircle,
    title: "Verified Strikes",
    desc: "Every strike is teacher-verified before action is taken against Kuddus.",
  },
];

const stats = [
  { value: "100%", label: "Anonymous Reports", icon: Eye },
  { value: "24/7", label: "SOS Monitoring", icon: Bell },
  { value: "3", label: "Strikes to Impeach", icon: Target },
  { value: "0", label: "Identity Leaks", icon: Users },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 overflow-x-hidden bg-white dark:bg-[#090820]">
      <Navbar />

      <main className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden flex items-center justify-center min-h-[85vh] px-6 py-20">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7030ef]/20 via-[#db1fff]/10 to-transparent dark:from-[#7030ef]/40 dark:via-[#db1fff]/20 dark:to-transparent" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3MDMwRUYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          </div>

          {/* Floating Orbs */}
          <div
            className="orb1 absolute top-[10%] left-[5%] w-64 h-64 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(112,48,239,0.3), transparent 70%)',
            }}
          />
          <div
            className="orb2 absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(219,31,255,0.25), transparent 70%)',
            }}
          />

          <div className="relative text-center max-w-4xl z-10">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 tracking-wider uppercase text-xs font-bold glass">
              <Sparkles className="h-3.5 w-3.5" style={{ color: '#7030ef' }} />
              <span style={{ color: '#7030ef' }} className="dark:text-white">
                ANTI-KUDDUS PROTOCOL
              </span>
            </div>

            {/* Icon */}
            <div className="hero-badge w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                 style={{
                   background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                 }}>
              <Swords className="h-12 w-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="hero-title text-5xl md:text-7xl font-black mb-5 tracking-tight leading-[1.05]">
              <span className="shimmer-text">The Third Strike</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-sub text-xl md:text-2xl font-bold mb-3"
               style={{ color: '#090820' }}>
              Three Complaints. Two Warnings. <span style={{ color: '#7030ef' }}>One Final Strike.</span>
            </p>

            {/* Description */}
            <p className="hero-desc text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
               style={{ color: '#4a4a5a' }}>
              Anonymous reporting, real-time SOS alerts, and verified
              accountability to overthrow the tyranny of Kodu Kuddus.
            </p>

            {/* Buttons - Updated with Register */}
            <div className="hero-btns flex gap-4 justify-center flex-wrap">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 20px rgba(112,48,239,0.4)',
                }}
              >
                <UserPlus className="h-4 w-4" />
                Join the Resistance
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm transition-all duration-300"
                style={{
                  border: '2px solid #7030ef',
                  color: '#7030ef',
                  background: 'transparent',
                }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase"
                  style={{
                    background: 'rgba(112,48,239,0.1)',
                    color: '#7030ef',
                    border: '1px solid rgba(112,48,239,0.15)',
                  }}>
              <Award className="h-3.5 w-3.5" />
              The Anti-Kuddus Arsenal
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 text-[#090820] dark:text-white">
              Six Missions to <span style={{ color: '#7030ef' }}>Overthrow</span> the Tyranny
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.title} className="card group">
                <div className="inline-flex p-4 rounded-2xl mb-5 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                     style={{
                       background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                     }}>
                  <f.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-extrabold text-xl mb-2 text-[#090820] dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4a4a5a] dark:text-white/70">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-24 bg-[#f8f5ff] dark:bg-[#0d0a2a]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase"
                    style={{
                      background: 'rgba(112,48,239,0.1)',
                      color: '#7030ef',
                      border: '1px solid rgba(112,48,239,0.15)',
                    }}>
                <Award className="h-3.5 w-3.5" />
                The Strike System
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 text-[#090820] dark:text-white">
                Three Strikes. <span style={{ color: '#7030ef' }}>One Impeachment.</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                { icon: Lock, title: "Report Safely", desc: "Submit anonymous complaints about Kuddus's atrocities." },
                { icon: UserCheck, title: "Teacher Reviews", desc: "Rashid Sir reviews evidence and confirms legitimacy." },
                { icon: Radio, title: "Strike Broadcast", desc: "Verified complaints issue a strike, updated for everyone." },
                { icon: CheckCircle2, title: "Impeachment", desc: "Three strikes trigger automatic impeachment — Kuddus is out!" },
              ].map((s, i) => (
                <div key={s.title} className="relative text-center group">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5"
                         style={{
                           background: 'linear-gradient(to right, #7030ef, #db1fff, transparent)',
                         }} />
                  )}
                  <div className="relative inline-flex items-center justify-center h-20 w-20 rounded-2xl shadow-lg mb-5 transition-all duration-300 group-hover:scale-105"
                       style={{
                         background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                       }}>
                    <s.icon className="h-9 w-9 text-white" />
                    <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full border-2 text-xs font-black flex items-center justify-center bg-white text-[#7030ef] border-[#7030ef] dark:bg-[#090820] dark:text-[#db1fff] dark:border-[#db1fff]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-extrabold mb-1.5 text-[#090820] dark:text-white">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a4a5a] dark:text-white/70">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS SECTION ===== */}
        <section className="border-y py-14 border-[#7030ef]/10 dark:border-[#7030ef]/20 bg-white dark:bg-[#090820]">
          <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-2xl transition-all duration-300 bg-[#7030ef]/10 dark:bg-[#7030ef]/20 group-hover:bg-[#7030ef]/20 dark:group-hover:bg-[#7030ef]/30">
                    <s.icon className="h-6 w-6 text-[#7030ef]" />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-black mb-1"
                   style={{
                     background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                   }}>
                  {s.value}
                </p>
                <p className="text-xs md:text-sm font-semibold text-[#4a4a5a] dark:text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="mx-auto max-w-6xl px-4 py-24">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center shadow-2xl"
               style={{
                 background: 'linear-gradient(120deg, #7030ef 0%, #db1fff 50%, #7030ef 100%)',
                 backgroundSize: '200% auto',
                 animation: 'shimmer 4s linear infinite',
               }}>
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px)',
                   backgroundSize: '40px 40px',
                 }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl bg-white/10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl bg-white/10" />

            <div className="relative">
              <div className="inline-flex p-4 rounded-2xl mb-6 bg-white/20 backdrop-blur-sm">
                <Swords className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Overthrow Kuddus?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8 text-lg">
                Join the resistance. Report anonymously. Track strikes.
                Three strikes and Kodu Kuddus is out forever!
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-extrabold text-sm shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: '#ffffff',
                  color: '#7030ef',
                }}
              >
                Join the Resistance <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}