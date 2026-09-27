"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Download, 
  Cpu, 
  Code2, 
  Layers, 
  ShieldCheck, 
  Send,
  Activity,
  User
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { isComplete } = useIntro();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navLinks = [
    { label: "SYS_CORE", href: "#hero", id: "hero", icon: Cpu },
    { label: "ABOUT", href: "#about", id: "about", icon: User },
    { label: "TIMELINE", href: "#experience", id: "experience", icon: Activity },
    { label: "SKILLS", href: "#skills", id: "skills", icon: Code2 },
    { label: "PROJECTS", href: "#projects", id: "projects", icon: Layers },
    { label: "CREDENTIALS", href: "#credentials", id: "credentials", icon: ShieldCheck },
    { label: "TERMINAL", href: "#terminal", id: "terminal", icon: Terminal },
    { label: "UPLINK", href: "#contact", id: "contact", icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleToggleSound = () => {
    const newState = soundFX.toggleSound();
    setSoundEnabled(newState);
  };

  const handleNavClick = (href: string, id: string) => {
    soundFX.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
      animate={
        isComplete
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: -12, filter: "blur(6px)" }
      }
      transition={{ duration: 1.0, delay: 0.25, ease: CINEMATIC_EASE }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#030303]/85 backdrop-blur-xl border-b border-cyber-red/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: "DIVYA." with red neon period */}
        <a
          data-magnetic
          href="#hero"
          onClick={() => soundFX.playClick()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-lg bg-cyber-red/10 border border-cyber-red/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-cyber-brightRed group-hover:shadow-[0_0_15px_#e0002a]">
            <span className="font-oswald font-black text-cyber-brightRed text-sm tracking-tighter">DS</span>
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-red/20 to-transparent pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-oswald font-black tracking-widest text-white text-base group-hover:text-cyber-brightRed transition-colors">
                DIVYA<span className="text-cyber-brightRed text-shadow-[0_0_10px_#e0002a]">.</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyber-red/20 border border-cyber-red/40 text-cyber-brightRed">
                v2.8
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400 hidden md:inline">{currentTime} UTC+5.5</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links with Sliding Pill Indicator & Underline Animations */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#090909]/85 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md relative">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                data-magnetic
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.id);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`nav-link-item group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "text-white font-bold" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-red/80 via-cyber-brightRed/90 to-cyber-red/80 border border-cyber-brightRed/60 shadow-[0_0_15px_rgba(224,0,42,0.45)] -z-10"
                  />
                )}

                {/* Subtle pulsing indicator dot for active nav state */}
                {isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_#ffffff]" />
                ) : (
                  <Icon
                    className="nav-link-icon w-3.5 h-3.5 text-cyber-brightRed transition-transform duration-200"
                  />
                )}

                <span className="nav-link-text relative z-10 transition-all duration-200">
                  {link.label}
                </span>

                {/* Expanding Underline for non-active links on hover */}
                {!isActive && <span className="nav-link-underline" />}
              </a>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synth FX Toggle */}
          <button
            data-magnetic
            onClick={handleToggleSound}
            onMouseEnter={() => soundFX.playHover()}
            className={`p-2 rounded-lg border font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? "bg-cyber-red/20 border-cyber-brightRed text-cyber-brightRed shadow-[0_0_12px_rgba(224,0,42,0.4)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
            title={soundEnabled ? "Mute Cybernetic Audio" : "Enable Cybernetic Synth Audio"}
            aria-label="Toggle Audio Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse text-cyber-brightRed" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline text-[10px]">
              {soundEnabled ? "SFX: ON" : "SFX: OFF"}
            </span>
          </button>

          {/* Download Resume Button */}
          <a
            data-magnetic
            href="/resume.pdf"
            download="Divya_Sree_Mukollu_Resume.pdf"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyber-brightRed text-white hover:bg-cyber-red shadow-[0_0_15px_rgba(224,0,42,0.4)] transition-all hover:scale-105 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RÉSUMÉ</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] p-4 bg-[#030303]/95 border-b border-cyber-red/30 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href, link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-mono text-left transition-all ${
                    isActive
                      ? "bg-cyber-red/20 border-cyber-brightRed text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-cyber-red"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-cyber-brightRed" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <a
              href="/resume.pdf"
              download="Divya_Sree_Mukollu_Resume.pdf"
              className="flex-1 text-center py-2.5 rounded-lg text-xs font-mono font-bold bg-cyber-brightRed text-white"
            >
              DOWNLOAD RÉSUMÉ (.PDF)
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
