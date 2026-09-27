"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, Maximize2, Minimize2 } from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error" | "matrix";
  text: string;
}

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Line-by-line boot sequence
  useEffect(() => {
    const bootLines: { type: "system" | "output"; text: string; delay: number }[] = [
      { type: "system", text: "DIVYA-TECH CYBERNETIC OS [Version 2.8.0-LTS]", delay: 100 },
      { type: "output", text: "> initializing portfolio...", delay: 400 },
      { type: "output", text: "> loading projects...", delay: 750 },
      { type: "output", text: "> loading AI systems...", delay: 1100 },
      { type: "output", text: "> loading engineering stack...", delay: 1450 },
      { type: "system", text: "> system ready. Type 'help' to inspect commands.", delay: 1800 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    bootLines.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: `boot-${index}-${Date.now()}`,
            type: item.type,
            text: item.text,
          },
        ]);
        if (index === bootLines.length - 1) {
          setIsBooted(true);
        }
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    soundFX.playClick();
    const cmd = rawCmd.toLowerCase();

    // Add to command history for arrow keys
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...history,
      { id: `in-${Date.now()}`, type: "input", text: rawCmd },
    ];

    switch (cmd) {
      case "help":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `AVAILABLE COMMANDS:
  help           - List all terminal commands
  bio            - Output full professional profile & background
  experience     - Display career timeline & current engineering role
  skills         - List specialized technical capabilities & tech stacks
  projects       - View all production project deployments
  certifications - Display verified cryptographic certificates
  education      - View university and academic honors
  contact        - Get direct email, phone, and network coordinates
  matrix         - Initialize holographic green code rain
  sudo           - Request root privileges
  clear          - Clear terminal trace buffer`,
        });
        break;

      case "bio":
      case "whoami":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.bio,
        });
        break;

      case "experience":
      case "exp":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.experience,
        });
        break;

      case "skills":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.skills,
        });
        break;

      case "projects":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.projects,
        });
        break;

      case "certifications":
      case "certs":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.certifications,
        });
        break;

      case "education":
      case "edu":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.education,
        });
        break;

      case "contact":
      case "email":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: PORTFOLIO_DATA.terminalCommands.contact,
        });
        break;

      case "matrix":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "matrix",
          text: `01000100 01001001 01010110 01011001 01000001
[MATRIX DECRYPTED: WELCOME TO THE CYBERNETIC REALM]
SYSTEM INTEGRITY: 100% // ALL SUBSYSTEMS NOMINAL`,
        });
        soundFX.playBeep(1200, 0.2);
        break;

      case "sudo":
      case "sudo su":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "system",
          text: "PERMISSION GRANTED: Root level override enabled. Welcome Commander Divya.",
        });
        soundFX.playBeep(700, 0.15);
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInput("");
        return;

      default:
        newLines.push({
          id: `out-${Date.now()}`,
          type: "error",
          text: `Command not recognized: '${rawCmd}'. Type 'help' to inspect valid instructions.`,
        });
        break;
    }

    setHistory(newLines);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const quickBadges = ["help", "bio", "experience", "skills", "projects", "certifications", "matrix", "contact"];

  return (
    <section
      id="terminal"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none"
    >
      {/* Section Header with Scroll Reveal */}
      <div className="text-center relative z-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-red/40 bg-cyber-red/10 text-cyber-brightRed text-xs font-mono mb-4 shadow-[0_0_15px_rgba(196,0,36,0.3)]"
        >
          <TerminalIcon className="w-3.5 h-3.5 animate-pulse" />
          <span>INTERACTIVE COMMAND CONSOLE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Live <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Terminal</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-2 text-sm text-gray-400 max-w-xl mx-auto font-sans"
        >
          Direct interactive terminal uplink. Query portfolio data via command-line interface.
        </motion.p>
      </div>

      {/* Terminal Window */}
      <div className="relative rounded-2xl bg-[#070a10]/95 border border-cyber-brightRed/40 shadow-[0_0_40px_rgba(196,0,36,0.25)] overflow-hidden font-mono">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-black/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyber-brightRed" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-gray-400 ml-2 font-bold font-mono">root@divya-sys:~#</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
            <button
              onClick={() => {
                soundFX.playClick();
                setHistory([]);
              }}
              className="p-1.5 rounded hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Output Stream */}
        <div
          ref={terminalContainerRef}
          onClick={() => inputRef.current?.focus()}
          className="p-5 h-[340px] sm:h-[380px] overflow-y-auto space-y-3 text-xs leading-relaxed cursor-text font-mono"
        >
          {history.map((line) => (
            <div key={line.id}>
              {line.type === "input" && (
                <div className="flex items-center gap-2 text-cyber-cyan">
                  <span className="text-cyber-brightRed">&gt;</span>
                  <span>{line.text}</span>
                </div>
              )}
              {line.type === "output" && (
                <div className="text-gray-300 whitespace-pre-wrap pl-3 border-l border-white/10">
                  {line.text}
                </div>
              )}
              {line.type === "system" && (
                <div className="text-cyber-cyan/90 pl-3 border-l border-cyber-cyan/30">
                  [SYS] {line.text}
                </div>
              )}
              {line.type === "error" && (
                <div className="text-rose-400 pl-3 border-l border-rose-500/40">
                  [ERR] {line.text}
                </div>
              )}
              {line.type === "matrix" && (
                <div className="text-emerald-400 pl-3 border-l border-emerald-500/40 font-bold animate-pulse">
                  {line.text}
                </div>
              )}
            </div>
          ))}
          {/* Subtle line stream terminal indicator */}
          <div className="flex items-center gap-1 text-gray-500 text-[11px] pt-1">
            <span className="text-cyber-brightRed">&gt;</span>
            <span className="terminal-cursor-blink" />
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-black/90 border-t border-white/10 flex items-center gap-2">
          <span className="text-cyber-brightRed font-black text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'bio', 'experience', 'projects', 'contact')..."
            className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-gray-600"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            onClick={() => executeCommand(input)}
            className="px-3.5 py-1.5 rounded bg-cyber-brightRed text-white hover:bg-cyber-red transition-all text-[11px] font-bold font-mono flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Suggestion Badges */}
        <div className="px-4 py-2.5 bg-black/60 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="text-gray-500 mr-1">QUICK:</span>
          {quickBadges.map((badge) => (
            <button
              key={badge}
              data-magnetic
              onClick={() => executeCommand(badge)}
              onMouseEnter={() => soundFX.playHover()}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyber-red/20 hover:text-white text-gray-400 border border-white/10 transition-colors cursor-pointer"
            >
              {badge}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
