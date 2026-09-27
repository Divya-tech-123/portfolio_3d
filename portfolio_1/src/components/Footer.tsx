"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { ArrowUp, Terminal, Shield, Heart, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030303]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & System Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-cyber-red/10 border border-cyber-red/40 flex items-center justify-center">
            <span className="font-display font-black text-cyber-brightRed text-sm">DS</span>
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-white font-display font-bold text-base tracking-wider">
                {personal.name.toUpperCase()}
              </span>
              <span className="text-[10px] text-cyber-brightRed border border-cyber-red/30 px-1.5 py-0.2 rounded bg-cyber-red/10 font-mono">
                CYBER-SYS v2.8
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5 font-sans">
              {personal.role}
            </p>
          </div>
        </div>

        {/* Social Relays */}
        <div className="flex items-center gap-4">
          <a
            data-magnetic
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-brightRed/50 hover:bg-cyber-red/10 transition-all cursor-pointer"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            data-magnetic
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-cyan/50 hover:bg-cyber-cyan/10 transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            data-magnetic
            href={`mailto:${personal.email}`}
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-pointer"
            aria-label="Email Transmission"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright & Return to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 text-center sm:text-right font-sans">
            © {new Date().getFullYear()} DIVYA SREE. ALL SYSTEMS OPERATIONAL.
          </span>
          <button
            data-magnetic
            onClick={scrollToTop}
            onMouseEnter={() => soundFX.playHover()}
            className="p-2.5 rounded-lg bg-cyber-red/10 border border-cyber-red/40 text-cyber-brightRed hover:bg-cyber-brightRed hover:text-white transition-all shadow-[0_0_15px_rgba(224,0,42,0.3)] cursor-pointer"
            title="Return to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
