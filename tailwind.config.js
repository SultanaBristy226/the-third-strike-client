import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7030ef",
          secondary: "#db1fff",
          light: "#ffffff",
          dark: "#090820",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7030ef 0%, #db1fff 100%)",
        "hero-gradient-dark": "linear-gradient(160deg, #090820 0%, #1a0a3e 50%, #7030ef 100%)",
        "hero-gradient-light": "linear-gradient(160deg, #f5f0ff 0%, #e8d5ff 50%, #d4b5ff 100%)",
        "cta-gradient": "linear-gradient(120deg, #7030ef 0%, #db1fff 50%, #7030ef 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(112,48,239,0.5)",
        "glow-pink": "0 0 60px -15px rgba(219,31,255,0.4)",
        "card-hover": "0 20px 40px -15px rgba(112,48,239,0.25)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatOrb: {
          "0%,100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-14px) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%,100%": { opacity: 0.3 },
          "50%": { opacity: 0.7 },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "float-orb": "floatOrb 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};