import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "accent-red": "var(--accent-red)",
        "bright-red": "var(--bright-red)",
        text: "var(--text)",
        cyber: {
          bg: "#030303",
          surface: "#090909",
          card: "rgba(9, 9, 9, 0.85)",
          border: "rgba(196, 0, 36, 0.25)",
          borderCyan: "rgba(0, 240, 255, 0.25)",
          red: "#c40024",
          brightRed: "#e0002a",
          neonRed: "#ff3b5c",
          redGlow: "rgba(196, 0, 36, 0.45)",
          cyan: "#00f0ff",
          cyanDark: "#0891b2",
          cyanGlow: "rgba(0, 240, 255, 0.4)",
          purple: "#9333ea",
          neonGreen: "#00ff88",
          amber: "#f59e0b",
          text: "#f5f5f5",
          muted: "#94a3b8",
          dim: "#475569",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "var(--font-oswald)", "Bebas Neue", "Oswald", "sans-serif"],
        bebas: ["var(--font-bebas)", "Bebas Neue", "Impact", "sans-serif"],
        oswald: ["var(--font-oswald)", "Oswald", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Fira Code",
          "Courier New",
          "monospace",
        ],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite alternate",
        "scan-line": "scanline 8s linear infinite",
        "laser-sweep": "laserSweep 3s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glitch": "glitch 1s linear infinite",
        "pulse-ring": "pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
      },
      keyframes: {
        glowPulse: {
          "0%": { opacity: "0.4", filter: "drop-shadow(0 0 8px rgba(196, 0, 36, 0.4))" },
          "100%": { opacity: "0.9", filter: "drop-shadow(0 0 20px rgba(224, 0, 42, 0.8))" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "50%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        laserSweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
      },
      boxShadow: {
        "cyber-red": "0 0 25px -5px rgba(196, 0, 36, 0.45)",
        "cyber-bright": "0 0 30px -2px rgba(224, 0, 42, 0.6)",
        "cyber-cyan": "0 0 25px -5px rgba(0, 240, 255, 0.35)",
        "cyber-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.7)",
        "neon-box": "0 0 15px rgba(196, 0, 36, 0.5), inset 0 0 15px rgba(196, 0, 36, 0.2)",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "cyber-grid-dense": "linear-gradient(to right, rgba(196, 0, 36, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(196, 0, 36, 0.08) 1px, transparent 1px)",
        "laser-gradient": "linear-gradient(180deg, rgba(196, 0, 36, 0.8) 0%, rgba(224, 0, 42, 1) 50%, rgba(196, 0, 36, 0.8) 100%)",
        "hero-gradient": "linear-gradient(135deg, #ffffff 0%, #ff3b5c 50%, #c40024 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
