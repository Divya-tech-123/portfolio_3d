"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { soundFX } from "@/lib/utils";
import { Crosshair, Zap, Shield, Sparkles, Activity } from "lucide-react";

export default function CinematicTransition() {
  const { introPhase } = useIntro();
  const isTransitioning = introPhase === "transitioning" || introPhase === "holding";
  const [glitchText, setGlitchText] = useState("SYSTEM_INITIALIZING");

  useEffect(() => {
    if (isTransitioning) {
      // Play high-tech cinematic transition sound
      soundFX.playBeep(920, 0.22, "sine");

      const sequence = [
        "SYNCHRONIZING_CORE...",
        "DECRYPTING_NEURAL_MATRIX...",
        "UPLINK_ESTABLISHED // READY",
      ];
      let step = 0;
      const interval = setInterval(() => {
        if (step < sequence.length) {
          setGlitchText(sequence[step]);
          step++;
        } else {
          clearInterval(interval);
        }
      }, 180);

      return () => clearInterval(interval);
    }
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="cinematic-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden select-none"
        >
          {/* 1. Cinematic Radial Red Shockwave Bloom */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.4, 2.2], opacity: [0, 0.85, 0] }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(224, 0, 42, 0.55) 0%, rgba(196, 0, 36, 0.25) 45%, transparent 75%)",
              filter: "blur(20px)",
            }}
          />

          {/* 2. Anamorphic Horizontal Optical Flare Blade */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.3, 2.5], opacity: [0, 1, 0] }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 h-[2px] top-1/2 -translate-y-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(224, 0, 42, 0.3) 20%, #ffffff 50%, rgba(224, 0, 42, 0.3) 80%, transparent 100%)",
              boxShadow:
                "0 0 30px #e0002a, 0 0 60px #e0002a, 0 0 100px rgba(255, 59, 92, 0.8)",
            }}
          />

          {/* 3. High-Velocity Cyber Laser Scanline (Top to Bottom Sweep) */}
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-x-0 h-[3px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(224, 0, 42, 0.8) 20%, #ffffff 50%, rgba(0, 240, 255, 0.8) 80%, transparent)",
              boxShadow:
                "0 0 25px #e0002a, 0 0 50px rgba(224, 0, 42, 0.6), 0 0 10px #00f0ff",
            }}
          >
            {/* Trailing scanline bloom glow */}
            <div
              className="absolute inset-x-0 top-0 h-[40px] -translate-y-full opacity-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(224, 0, 42, 0.4), transparent)",
              }}
            />
          </motion.div>

          {/* 4. Central Holographic HUD Telemetry Flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1.05], y: [10, 0, -5] }}
            transition={{ duration: 0.75, times: [0, 0.25, 0.75, 1], ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex flex-col items-center gap-2 p-5 rounded-2xl bg-black/90 border border-cyber-brightRed/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(224,0,42,0.4)] font-mono text-center"
          >
            {/* Corner cyber ticks */}
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />

            <div className="flex items-center gap-2 text-cyber-brightRed text-xs font-bold tracking-widest uppercase">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>TRANSITION SEQUENCE // ONLINE</span>
            </div>

            <div className="text-sm sm:text-base font-bold text-white tracking-widest uppercase">
              {glitchText}
            </div>

            <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                PORTFOLIO READY
              </span>
              <span>|</span>
              <span className="text-cyber-cyan">LATENCY: 0.8ms</span>
            </div>
          </motion.div>

          {/* 5. Sub-surface Digital Aperture Grid Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(224, 0, 42, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(224, 0, 42, 0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
