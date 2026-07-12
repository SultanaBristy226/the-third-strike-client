import { Link } from "react-router-dom";
import { Swords, Heart, ArrowRight, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#7030ef]/10 dark:border-[#7030ef]/20 bg-white dark:bg-[#090820] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity"
                     style={{ background: 'linear-gradient(135deg, #7030ef, #db1fff)' }} />
                <div className="relative p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
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
            
            <p className="text-sm text-[#4a4a5a] dark:text-white/60 leading-relaxed max-w-sm">
              The revolutionary platform to overthrow the tyranny of Kodu Kuddus.
              Anonymous reporting, real-time SOS, and verified strikes for justice.
            </p>
            
            <div className="flex gap-3 mt-6">
              {[
                { icon: "github", href: "#" },
                { icon: "twitter", href: "#" },
                { icon: "linkedin", href: "#" },
                { icon: "youtube", href: "#" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="p-2.5 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(112,48,239,0.06)',
                    color: '#7030ef',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #7030ef, #db1fff)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(112,48,239,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(112,48,239,0.06)';
                    e.currentTarget.style.color = '#7030ef';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === "github" && <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />}
                    {social.icon === "twitter" && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                    {social.icon === "linkedin" && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                    {social.icon === "youtube" && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-sm text-[#090820] dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Dashboard", href: "/" },
                { label: "Report", href: "/report" },
                { label: "SOS", href: "/sos" },
                { label: "Strikes", href: "/strikes" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-[#4a4a5a] dark:text-white/60 hover:text-[#7030ef] dark:hover:text-[#db1fff] transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-extrabold text-sm text-[#090820] dark:text-white mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Help Center", href: "/help" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-[#4a4a5a] dark:text-white/60 hover:text-[#7030ef] dark:hover:text-[#db1fff] transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-extrabold text-sm text-[#090820] dark:text-white mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-[#4a4a5a] dark:text-white/60 mb-4">
              Get strike alerts and resistance updates.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
                style={{
                  background: 'rgba(112,48,239,0.06)',
                  border: '1px solid rgba(112,48,239,0.15)',
                  color: '#090820',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#7030ef';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(112,48,239,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(112,48,239,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2.5 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7030ef, #db1fff)',
                  color: '#ffffff',
                }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#7030ef]/10 dark:border-[#7030ef]/20 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#4a4a5a] dark:text-white/60">
            <Swords className="h-4 w-4" style={{ color: '#7030ef' }} />
            <span>© 2026 The Third Strike. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-[#4a4a5a] dark:text-white/60">
            Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> for justice
          </div>

          <div className="flex items-center gap-4 text-xs text-[#4a4a5a] dark:text-white/40">
            <span className="font-bold" style={{ color: '#7030ef' }}>
              ⚔️ Three Strikes. One Impeachment. ⚔️
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}