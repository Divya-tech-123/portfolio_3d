"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Terminal, 
  Cpu, 
  Binary, 
  Video, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Database,
  Flame,
  Zap,
  Activity
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const { personal } = PORTFOLIO_DATA;
  const [activeMatrixTab, setActiveMatrixTab] = useState<number>(0);

  const pillars = [
    {
      icon: Binary,
      title: "Algorithmic Rigor & Core CS",
      detail: "Data structures, graph traversals, Big-O space/time optimization, and ACID relational transactions.",
      accent: "#c40024",
    },
    {
      icon: Cpu,
      title: "AI & RAG Vector Pipelines",
      detail: "Context-aware LLMs, vector similarity embeddings, chunk citation indexing, and neural speech synthesis.",
      accent: "#00f0ff",
    },
    {
      icon: Layers,
      title: "Full-Stack System Architecture",
      detail: "Next.js 14 App Router, Supabase real-time listeners, PostgreSQL RLS, and high-concurrency Node.js REST APIs.",
      accent: "#e0002a",
    },
    {
      icon: Video,
      title: "Visual Narrative & Motion",
      detail: "Hardware-accelerated transforms, 3D WebGL inertia math, short-form tech pacing, and cyber HUD UI design.",
      accent: "#ec4899",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center select-none"
    >
      {/* Section Header with Scroll Reveal */}
      <div className="text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-red/40 bg-cyber-red/10 text-cyber-brightRed text-xs font-mono mb-4 shadow-[0_0_15px_rgba(196,0,36,0.3)]"
        >
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          <span>IDENTITY TELEMETRY // CYBER-INSPECTION MATRIX</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Engineering <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Philosophy</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans"
        >
          Merging computational rigor with next-generation AI architectures and high-impact visual design.
        </motion.p>
      </div>

      {/* Main Terminal Inspection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column (7 cols): Terminal Bio & Core Strengths */}
        <div className="lg:col-span-7 space-y-6">
          <div className="cyber-card p-6 sm:p-8 rounded-2xl relative">
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />

            {/* Terminal Top Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyber-brightRed" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-gray-400 ml-2">DIVYA_CORE_PROFILE.SYS</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyber-red/20 text-cyber-brightRed border border-cyber-red/40 font-bold">
                ENCRYPTED // VERIFIED
              </span>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-gray-300 text-sm sm:text-base font-sans leading-relaxed">
              {personal.bio.map((paragraph, idx) => (
                <p key={idx} className="relative pl-4 border-l-2 border-cyber-brightRed/50">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Pillars 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/10">
              {pillars.map((pillar, pIdx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pIdx}
                    data-magnetic
                    onMouseEnter={() => soundFX.playHover()}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-cyber-brightRed/50 transition-all hover:bg-cyber-red/10 group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 text-cyber-brightRed group-hover:scale-110 transition-transform" />
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Interactive Strengths & Telemetry Matrix */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-card p-6 sm:p-8 rounded-2xl relative space-y-6">
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-cyber-brightRed animate-pulse" />
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  SYSTEM CORE ATTRIBUTES
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                100% OPERATIONAL
              </span>
            </div>

            {/* Core Strengths List */}
            <div className="space-y-3">
              {personal.strengths.map((item, idx) => (
                <div
                  key={idx}
                  data-magnetic
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-cyber-red/40 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                    <span className="flex items-center gap-1.5 text-cyber-brightRed">
                      <Zap className="w-3.5 h-3.5" />
                      {item.title}
                    </span>
                    <span className="text-[10px] text-gray-400">0{idx + 1}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Diagnostic Telemetry */}
            <div className="p-4 rounded-xl bg-black/80 border border-cyber-red/30 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-gray-400">
                <span>SYSTEM ARCHITECTURE:</span>
                <span className="text-white font-bold">NEXT.JS 14 / FULL-STACK</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>DATABASE PROTOCOLS:</span>
                <span className="text-cyber-cyan font-bold">POSTGRESQL / SUPABASE</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>INTELLIGENCE LAYER:</span>
                <span className="text-cyber-brightRed font-bold">RAG / VECTOR EMBEDDINGS</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>AVAILABILITY STATUS:</span>
                <span className="text-emerald-400 font-bold">HIRING / COLLABORATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
