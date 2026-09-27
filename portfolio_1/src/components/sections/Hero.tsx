"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Terminal, 
  ArrowRight, 
  Download, 
  Zap, 
  Activity, 
  MousePointer,
  Crosshair,
  Shield,
  Cpu
} from "lucide-react";

// Standard cinematic cubic-bezier curve
const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { personal, stats, telemetryBeacon } = PORTFOLIO_DATA;
  const { isComplete, introProgress } = useIntro();

  // Glitch text animation on candidate identifier
  const [glitchHandle, setGlitchHandle] = useState(personal.name);
  const [scrollYOffset, setScrollYOffset] = useState(0);

  useEffect(() => {
    const chars = "ABCDEF0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const original = personal.name;

    const interval = setInterval(() => {
      let iteration = 0;
      const glitchInt = setInterval(() => {
        setGlitchHandle(
          original
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return original[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= original.length) {
          clearInterval(glitchInt);
        }
        iteration += 1 / 2;
      }, 30);
    }, 8000);

    return () => clearInterval(interval);
  }, [personal.name]);

  // Subtle Parallax Effect on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      if (scrollY < 800) {
        setScrollYOffset(scrollY * -0.05); // 0 -> -30px range
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundFX.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 pb-16 select-none overflow-hidden"
    >
      {/* =========================================================================
          HIGH-INTENSITY CANDIDATE FIRST NAME WATERMARK
          ========================================================================= */}
      <motion.div 
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isComplete ? 0.28 : 0.05,
          scale: isComplete ? 1 : 0.95,
        }}
        transition={{ duration: 1.4, ease: CINEMATIC_EASE }}
        className="absolute right-[-2%] top-[12%] sm:top-[8%] text-[24vw] font-display font-black uppercase tracking-tighter pointer-events-none leading-none select-none z-0 overflow-hidden will-change-transform hero-watermark"
        style={{
          fontFamily: "var(--font-bebas), var(--font-oswald), 'Bebas Neue', 'Oswald', sans-serif",
        }}
      >
        {personal.firstName}
      </motion.div>

      {/* =========================================================================
          MINIMAL HUD OVERLAY DURING CINEMATIC VIDEO PLAYBACK
          ========================================================================= */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            key="video-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: CINEMATIC_EASE } }}
            className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12"
          >
            {/* Top Left System Boot Telemetry */}
            <div className="space-y-1 font-mono text-[11px] text-gray-400">
              <div className="flex items-center gap-2 text-cyber-brightRed">
                <Crosshair className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
                <span className="font-bold tracking-widest">CINEMATIC INTRO // PLAYBACK ACTIVE</span>
              </div>
              <p className="text-gray-500">SUBJECT: {personal.name.toUpperCase()}</p>
              <p className="text-gray-500">SYSTEM_CORE: CYBER-SYS v2.8</p>
            </div>

            {/* Center Dynamic HUD Crosshairs */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-cyber-red/20 border-dashed animate-spin flex items-center justify-center" style={{ animationDuration: "25s" }}>
                <div className="w-2 h-2 rounded-full bg-cyber-brightRed/50" />
              </div>
            </div>

            {/* Bottom Left Loading Telemetry */}
            <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-cyber-brightRed animate-ping" />
              <span>INITIALIZING PORTFOLIO TELEMETRY: {Math.round(introProgress * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MAIN HERO MATTER / TEXT REVEAL: Staggered cinematic activation
          ========================================================================= */}
      <div 
        className="relative z-10 w-full max-w-6xl mx-auto text-left space-y-7 transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(0, ${scrollYOffset}px, 0)` }}
      >
        {/* 1. Small Eyebrow Text: 01 / FULL-STACK & AI ENGINEER */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            isComplete
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(6px)" }
          }
          transition={{ duration: 0.8, delay: 0.15, ease: CINEMATIC_EASE }}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="eyebrow-container inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#090909]/90 border border-cyber-red/40 backdrop-blur-md shadow-[0_0_20px_rgba(196,0,36,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyber-brightRed animate-ping" />
            <span className="font-mono text-xs font-bold text-cyber-brightRed tracking-wider uppercase">
              01 / FULL-STACK & AI ENGINEER
            </span>
            {isComplete && <div className="eyebrow-scan-line" />}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{telemetryBeacon.message}</span>
            <span className="text-emerald-600 hidden sm:inline">|</span>
            <span className="text-emerald-500/70 hidden sm:inline">PING: {telemetryBeacon.ping}</span>
          </div>
        </motion.div>

        {/* 2. Subtitle: ARCHITECTING DIGITAL REALITIES */}
        <motion.div
          initial={{ opacity: 0, y: 15, letterSpacing: "0.35em", filter: "blur(4px)" }}
          animate={
            isComplete
              ? { opacity: 1, y: 0, letterSpacing: "0.08em", filter: "blur(0px)" }
              : { opacity: 0, y: 15, letterSpacing: "0.35em", filter: "blur(4px)" }
          }
          transition={{ duration: 1.0, delay: 0.35, ease: CINEMATIC_EASE }}
          className="text-xs sm:text-sm font-mono text-gray-400 flex items-center gap-2.5 uppercase"
        >
          <span className="text-gray-300 tracking-wider">ARCHITECTING DIGITAL REALITIES</span>
          <span className="h-[1px] w-8 bg-gradient-to-r from-cyber-brightRed to-transparent" />
          <span className="text-cyber-brightRed font-mono font-semibold">{glitchHandle}</span>
        </motion.div>

        {/* 3. Main Headline: BUILDING / IDEAS / INTO / EXPERIENCES. (4 distinct lines) */}
        <div
          className="font-display font-black uppercase text-left tracking-tight leading-[0.88] select-none"
          style={{
            fontSize: "clamp(3.2rem, 9.5vw, 8.5rem)",
            fontFamily: "var(--font-bebas), var(--font-oswald), 'Bebas Neue', 'Oswald', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {/* Line 1: BUILDING */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={
                isComplete
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, filter: "blur(12px)" }
              }
              transition={{ duration: 0.9, delay: 0.55, ease: CINEMATIC_EASE }}
              className="block text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
            >
              BUILDING
            </motion.span>
          </div>

          {/* Line 2: IDEAS */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={
                isComplete
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, filter: "blur(12px)" }
              }
              transition={{ duration: 0.9, delay: 0.67, ease: CINEMATIC_EASE }}
              className="block text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
            >
              IDEAS
            </motion.span>
          </div>

          {/* Line 3: INTO */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={
                isComplete
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, filter: "blur(12px)" }
              }
              transition={{ duration: 0.9, delay: 0.79, ease: CINEMATIC_EASE }}
              className="block text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
            >
              INTO
            </motion.span>
          </div>

          {/* Line 4: EXPERIENCES. */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={
                isComplete
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, filter: "blur(12px)" }
              }
              transition={{ duration: 0.9, delay: 0.91, ease: CINEMATIC_EASE }}
              className="block"
            >
              <span className="experiences-highlight-gradient">
                EXPERIENCES
              </span>
              <span className="hero-neon-period-glow inline-block">
                .
              </span>
            </motion.span>
          </div>
        </div>

        {/* Glowing Laser Divider Accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isComplete
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1.0, delay: 1.15, ease: CINEMATIC_EASE }}
          className="h-[2px] w-48 origin-left"
          style={{
            background: "linear-gradient(90deg, #e0002a, #ff3b5c, transparent)",
            boxShadow: "0 0 15px #e0002a",
          }}
        />

        {/* 4. Supporting Text / Description (Inter Body Font) */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={
            isComplete
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(5px)" }
          }
          transition={{ duration: 0.7, delay: 1.35, ease: CINEMATIC_EASE }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 font-sans leading-relaxed"
        >
          Bridging computational rigor with next-generation AI architectures and responsive 3D interactive experiences. Transforming computational logic and low-latency RAG pipelines into fluid, high-octane web products.
        </motion.p>

        {/* 5. CTAs & Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            isComplete
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(6px)" }
          }
          transition={{ duration: 0.8, delay: 1.55, ease: CINEMATIC_EASE }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <button
            data-magnetic
            onClick={() => scrollToSection("experience")}
            onMouseEnter={() => soundFX.playHover()}
            className="cyber-btn-primary group px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-3 cursor-pointer"
          >
            <span>EXPLORE WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>

          <a
            data-magnetic
            href="/resume.pdf"
            download="Divya_Sree_Mukollu_Resume.pdf"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="cyber-btn-secondary group px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyber-brightRed transition-transform group-hover:-translate-y-0.5" />
            <span>DOWNLOAD RÉSUMÉ</span>
          </a>

          <button
            data-magnetic
            onClick={() => scrollToSection("terminal")}
            onMouseEnter={() => soundFX.playHover()}
            className="px-5 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold bg-black/60 text-gray-300 border border-white/10 hover:border-cyber-cyan hover:text-white hover:bg-cyber-cyan/10 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span className="hidden sm:inline">TERMINAL</span>
          </button>
        </motion.div>

        {/* Metric Telemetry Counters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            isComplete
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(6px)" }
          }
          transition={{ duration: 0.85, delay: 1.70, ease: CINEMATIC_EASE }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 w-full max-w-4xl"
        >
          {stats.map((item, idx) => (
            <div
              key={idx}
              data-magnetic
              onMouseEnter={() => soundFX.playHover()}
              className="p-4 rounded-xl bg-[#090909]/85 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-cyber-red/60 hover:shadow-[0_0_25px_rgba(196,0,36,0.2)] group cursor-default"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                <span>{item.label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-brightRed opacity-60 group-hover:opacity-100 group-hover:animate-ping" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-cyber-brightRed transition-colors tracking-tight">
                {item.value}
                <span className="text-xs text-cyber-cyan font-mono font-normal ml-0.5">{item.suffix}</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans mt-0.5 truncate">
                {item.detail}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.90, ease: CINEMATIC_EASE }}
          className="pt-2 flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <MousePointer className="w-3.5 h-3.5 text-cyber-brightRed animate-bounce" />
          <span>SCROLL DOWN TO INITIALIZE EXPERIENCE TIMELINE</span>
        </motion.div>
      </div>
    </section>
  );
}
