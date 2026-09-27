"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Terminal, 
  Sparkles, 
  Activity, 
  Cpu, 
  X, 
  CheckCircle2, 
  ArrowUpRight,
  Code,
  Zap
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

// 3D Perspective Tilt Project Card with Cursor Spotlight & Sequential Tag Animation
function ProjectTiltCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
      ref={cardRef}
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundFX.playHover()}
      onClick={() => {
        soundFX.playClick();
        onSelect(project);
      }}
      style={{
        transform,
        transition: "transform 0.15s ease-out, box-shadow 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl bg-[#090909]/90 border border-white/10 backdrop-blur-md overflow-hidden cursor-pointer hover:border-cyber-brightRed/60 hover:shadow-[0_0_35px_rgba(224,0,42,0.25)] flex flex-col justify-between select-none"
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(circle 280px at ${spotlight.x}px ${spotlight.y}px, rgba(224, 0, 42, 0.18), transparent 70%)`,
        }}
      />

      {/* Top Laser Accent */}
      <div
        className="h-1 w-full relative z-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          boxShadow: `0 0 12px ${project.accentColor}`,
        }}
      />

      {/* Corner Ticks */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      <div className="p-6 space-y-4 relative z-20">
        {/* Header: Codename & Category */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
            {project.codename}
          </span>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
            style={{
              backgroundColor: `${project.accentColor}20`,
              color: project.accentColor,
              border: `1px solid ${project.accentColor}50`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title (Reveals slightly after card enters: opacity 0 -> 1, translateY 20px -> 0, delay 150ms) */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: CINEMATIC_EASE }}
            className="text-xl font-bold font-display text-white group-hover:text-cyber-brightRed transition-colors flex items-center justify-between tracking-wide"
          >
            <span>{project.title.split("—")[0]}</span>
            <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyber-brightRed group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.h3>
          <p className="text-xs text-gray-400 font-sans mt-2 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-center">
          {project.metrics.map((m, mIdx) => (
            <div key={mIdx}>
              <span className="text-[9px] text-gray-400 block truncate">{m.label}</span>
              <span className="text-xs font-bold text-cyber-brightRed">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Sequential Technology Tags Reveal */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech, tIdx) => (
            <motion.span
              key={tIdx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + tIdx * 0.08, ease: CINEMATIC_EASE }}
              className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 group-hover:border-cyber-red/40 group-hover:text-white transition-colors"
            >
              #{tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-6 py-3 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-20">
        <span className="text-gray-400 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyber-brightRed" />
          <span>INSPECT_LOGS</span>
        </span>
        <span className="text-cyber-brightRed group-hover:underline">VIEW ARCHITECTURE →</span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects = PORTFOLIO_DATA.projects;
  const categories = ["ALL", "AI & ML", "Full-Stack", "Cloud & System"] as const;
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "ALL"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center select-none"
    >
      {/* Section Header with Scroll Reveal */}
      <div className="text-center relative z-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-red/40 bg-cyber-red/10 text-cyber-brightRed text-xs font-mono mb-4 shadow-[0_0_15px_rgba(196,0,36,0.3)]"
        >
          <Layers className="w-3.5 h-3.5 animate-pulse" />
          <span>PRODUCTION ARCHITECTURE // DEPLOYMENTS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Featured <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Systems</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans"
        >
          Engineered for low latency, high throughput, and seamless user interaction. Click any architecture card for 3D inspection and runtime traces.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            data-magnetic
            onClick={() => {
              soundFX.playClick();
              setActiveCategory(cat);
            }}
            onMouseEnter={() => soundFX.playHover()}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-gradient-to-r from-cyber-red to-cyber-brightRed text-white font-bold shadow-[0_0_20px_rgba(224,0,42,0.5)] scale-105"
                : "bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:border-cyber-red/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Perspective Tilt Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectTiltCard
            key={project.id}
            project={project}
            onSelect={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* =========================================================================
          DETAILED PROJECT TELEMETRY MODAL
          ========================================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090909] border border-cyber-brightRed/50 shadow-[0_0_50px_rgba(224,0,42,0.3)] text-left"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {/* Top Laser Accent */}
            <div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(90deg, #c40024, ${selectedProject.accentColor}, #00f0ff)`,
                boxShadow: `0 0 15px ${selectedProject.accentColor}`,
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedProject(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-cyber-red/20 text-gray-400 hover:text-white border border-white/10 transition-colors z-10 cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                    {selectedProject.codename}
                  </span>
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${selectedProject.accentColor}20`,
                      color: selectedProject.accentColor,
                    }}
                  >
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-wide">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-center">
                {selectedProject.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <span className="text-xs text-gray-400 block">{m.label}</span>
                    <span className="text-lg sm:text-xl font-black text-cyber-brightRed">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  SYSTEM OVERVIEW & DESIGN ARCHITECTURE
                </h4>
                <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  ARCHITECTURAL CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2.5 text-xs text-gray-300 font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Logs Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyber-brightRed" />
                    LIVE RUNTIME TERMINAL TRACE
                  </span>
                  <span className="text-emerald-400">TELEMETRY: NOMINAL</span>
                </div>
                <div className="p-4 rounded-xl bg-black/95 border border-cyber-red/30 font-mono text-xs text-gray-300 space-y-1.5 overflow-x-auto">
                  {selectedProject.terminalLog.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2">
                      <span className="text-cyber-brightRed shrink-0">&gt;</span>
                      <span className="text-gray-300">{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  DEPLOYMENT TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-cyber-brightRed/30 text-white"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <a
                    data-magnetic
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>SOURCE REPOSITORY</span>
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      data-magnetic
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFX.playClick()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold bg-cyber-brightRed hover:bg-cyber-red text-white shadow-[0_0_15px_rgba(224,0,42,0.4)] transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE SYSTEM DEMO</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedProject(null);
                  }}
                  className="px-4 py-2 rounded-lg font-mono text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  CLOSE INSPECTOR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
