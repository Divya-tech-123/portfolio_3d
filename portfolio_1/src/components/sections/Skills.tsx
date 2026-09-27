"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Code2, 
  Terminal, 
  Layout, 
  Cpu, 
  Layers, 
  Database, 
  Cloud, 
  Flame, 
  Sparkles, 
  Binary,
  CheckCircle,
  Zap
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const { skills, skillsCategorized } = PORTFOLIO_DATA;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Terminal": return Terminal;
      case "Layout": return Layout;
      case "Cpu": return Cpu;
      default: return Layers;
    }
  };

  const currentCategory = skills[activeCategoryIndex] || skills[0];

  const getCategoryBadgeIcon = (category: string) => {
    switch (category) {
      case "Languages": return Terminal;
      case "Frontend": return Layout;
      case "Backend": return Cpu;
      case "Databases": return Database;
      case "Cloud & DevOps": return Cloud;
      default: return Binary;
    }
  };

  return (
    <section
      id="skills"
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
          <Code2 className="w-3.5 h-3.5 animate-pulse" />
          <span>CAPABILITY MATRIX // HIGH-DENSITY RADAR</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Technical <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Arsenal</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans"
        >
          Categorized mastery across modern software engineering stacks, AI/RAG architectures, relational cloud databases, and core computing foundations.
        </motion.p>
      </div>

      {/* =========================================================================
          CATEGORIZED SKILL PILLS (Languages, Frontend, Backend, Databases, Cloud & DevOps, Core CS)
          ========================================================================= */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {skillsCategorized.map((group, idx) => {
          const Icon = getCategoryBadgeIcon(group.category);
          return (
            <div
              key={idx}
              data-magnetic
              onMouseEnter={() => soundFX.playHover()}
              className="p-5 rounded-2xl bg-[#090909]/85 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-cyber-brightRed/50 hover:shadow-[0_0_25px_rgba(224,0,42,0.15)] group"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyber-brightRed group-hover:scale-110 transition-transform" />
                  <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                  {group.skills.length} TECHS
                </span>
              </div>

              {/* Pills Cloud */}
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-gray-300 hover:border-cyber-brightRed/60 hover:text-white hover:bg-cyber-red/10 transition-all cursor-default"
                  >
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Readiness Diagnostics Selector */}
      <div className="relative z-10 bg-[#090909]/90 border border-cyber-red/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <span className="text-xs font-mono text-cyber-brightRed uppercase tracking-wider block">
              OPERATIONAL BENCHMARK // TELEMETRY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white uppercase mt-0.5">
              Readiness & Implementation Depth
            </h3>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-2">
            {skills.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.iconName);
              const isActive = activeCategoryIndex === idx;

              return (
                <button
                  key={idx}
                  data-magnetic
                  onClick={() => {
                    soundFX.playClick();
                    setActiveCategoryIndex(idx);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyber-brightRed text-white font-bold shadow-[0_0_15px_rgba(224,0,42,0.5)]"
                      : "bg-black/60 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-red/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.category.split("&")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCategory.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              onMouseEnter={() => soundFX.playHover()}
              className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-cyber-brightRed/40 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-sans text-white text-sm">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyber-red/20 text-cyber-brightRed border border-cyber-red/40 font-bold">
                      <Flame className="w-2.5 h-2.5" /> PRIME
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-cyber-cyan">
                  {skill.status}
                </span>
              </div>

              <p className="text-xs text-gray-400 font-sans leading-relaxed mb-3">
                {skill.description}
              </p>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>MASTERY DEPTH</span>
                  <span className="text-gray-300 font-bold">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/80 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-red to-cyber-brightRed shadow-[0_0_8px_#e0002a]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
