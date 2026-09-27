"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, TimelineMilestone } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Terminal,
  Award
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const milestones = PORTFOLIO_DATA.timeline;
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");

  const filterOptions = [
    { label: "All Milestones", value: "all" as const },
    { label: "Work Experience", value: "work" as const },
    { label: "Education", value: "education" as const },
  ];

  const filteredMilestones = milestones.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <section
      id="experience"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center select-none"
    >
      <div id="timeline" className="sr-only" aria-hidden="true" />
      {/* Section Header with Scroll Reveal */}
      <div className="text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-red/40 bg-cyber-red/10 text-cyber-brightRed text-xs font-mono mb-4 shadow-[0_0_15px_rgba(196,0,36,0.3)]"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>JOURNEY TELEMETRY // CAREER & EDUCATION MATRIX</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Unified <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Timeline</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans"
        >
          Alternating bilateral chronological roadmap charting professional engineering engagements, academic honors, and system development milestones.
        </motion.p>

        {/* Interactive Filter Pills with Spring Physics */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          {filterOptions.map((opt) => {
            const isActive = filter === opt.value;
            return (
              <button
                key={opt.value}
                data-magnetic
                onClick={() => {
                  soundFX.playClick();
                  setFilter(opt.value);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono transition-colors duration-200 z-10 cursor-pointer ${
                  isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="timeline-filter-active-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-red to-cyber-brightRed shadow-[0_0_20px_rgba(224,0,42,0.6)] -z-10"
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BILATERAL ALTERNATING TIMELINE CONTAINER
          ========================================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4">
        {/* Central Glowing Neon Laser Spine (50% desktop, left 24px on mobile) */}
        <div 
          aria-hidden="true"
          className="timeline-laser-spine left-6 md:left-1/2 -translate-x-1/2" 
        />

        {/* Milestones Stack */}
        <motion.div layout className="space-y-12 md:space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredMilestones.map((item, index) => {
              // Alternating on desktop: even on Left, odd on Right
              const isEven = index % 2 === 0;
              const isWork = item.type === "work";
              const isCurrent = item.status === "CURRENT" || item.status === "ACTIVE";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Waypoint Center Node (Mobile: left-6, Desktop: left-1/2) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    {/* Status Pulse Ring */}
                    <div
                      className={`absolute w-8 h-8 rounded-full pointer-events-none ${
                        isWork ? "bg-cyber-brightRed/30 pulse-ring-red" : "bg-emerald-400/30 pulse-ring-green"
                      }`}
                    />

                    {/* Central Glowing Waypoint Core */}
                    <div
                      className={`relative w-6 h-6 rounded-full flex items-center justify-center border-2 transition-transform duration-300 hover:scale-125 ${
                        isWork
                          ? "bg-[#090909] border-cyber-brightRed timeline-node-glow text-cyber-brightRed"
                          : "bg-[#090909] border-emerald-400 timeline-node-green text-emerald-400"
                      }`}
                    >
                      {isWork ? (
                        <Briefcase className="w-3 h-3" />
                      ) : (
                        <GraduationCap className="w-3 h-3" />
                      )}
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternating Grid (Takes up 50% width) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card (Takes up 50% width on Desktop, full width with left offset on Mobile) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div
                      onMouseEnter={() => soundFX.playHover()}
                      className={`group relative p-6 sm:p-7 rounded-2xl bg-[#090909]/90 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 text-left ${
                        isWork
                          ? "border-cyber-red/30 hover:border-cyber-brightRed/70 hover:shadow-[0_0_30px_rgba(224,0,42,0.25)]"
                          : "border-cyber-cyan/30 hover:border-cyber-cyan/70 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                      }`}
                    >
                      {/* Corner Accents */}
                      {isWork ? (
                        <>
                          <div className="corner-tl" />
                          <div className="corner-tr" />
                          <div className="corner-bl" />
                          <div className="corner-br" />
                        </>
                      ) : (
                        <>
                          <div className="corner-cyan-tl" />
                          <div className="corner-cyan-tr" />
                          <div className="corner-cyan-bl" />
                          <div className="corner-cyan-br" />
                        </>
                      )}

                      {/* Header: Type Badge, Period & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              isWork
                                ? "bg-cyber-red/20 text-cyber-brightRed border border-cyber-red/40"
                                : "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40"
                            }`}
                          >
                            {isWork ? "WORK EXPERIENCE" : "ACADEMIC MILESTONE"}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Period & Status beacon */}
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            {item.period}
                          </span>
                          {isCurrent && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              CURRENT
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Role & Organization */}
                      <div className="space-y-1 mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyber-brightRed transition-colors tracking-wide">
                          {item.roleOrDegree}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-300">
                          <span className="font-semibold text-white">{item.organization}</span>
                          <span className="text-gray-600">•</span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <MapPin className="w-3 h-3 text-cyber-red" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Achievements / Key Highlights */}
                      <div className="space-y-2 mb-4 bg-black/50 p-3.5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                          KEY ACHIEVEMENTS & CONTRIBUTIONS:
                        </span>
                        {item.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isWork ? "text-cyber-brightRed" : "text-cyber-cyan"
                              }`}
                            />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills / Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 hover:border-cyber-red/50 hover:text-white transition-colors"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
