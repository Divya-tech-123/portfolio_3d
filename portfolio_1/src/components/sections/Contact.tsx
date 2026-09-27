"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  Send, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  Lock,
  MessageSquare,
  ArrowUpRight
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { personal } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    soundFX.playBeep(900, 0.1);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderEmail || !formData.message) return;

    soundFX.playClick();
    setIsSending(true);

    // Simulate cybernetic transmission dispatch
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      soundFX.playBeep(1100, 0.2, "sine");
      setFormData({ senderName: "", senderEmail: "", subject: "", message: "" });
      setTimeout(() => setIsSent(false), 6000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center select-none"
    >
      <div id="uplink" className="sr-only" aria-hidden="true" />
      {/* Section Header with Scroll Reveal */}
      <div className="text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-red/40 bg-cyber-red/10 text-cyber-brightRed text-xs font-mono mb-4 shadow-[0_0_15px_rgba(196,0,36,0.3)]"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>ENCRYPTED QUANTUM UPLINK // COMM CHANNELS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Establish <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Contact</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans"
        >
          Open to full-time engineering roles, high-throughput systems development, and collaborative AI research initiatives.
        </motion.p>
      </div>

      {/* Main Grid: Left Direct Channels + Right Transmission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Direct Communication Channels & Magnetic Socials */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Channel with Copy Action */}
          <div
            data-magnetic
            onMouseEnter={() => soundFX.playHover()}
            className="p-5 rounded-2xl bg-[#090909]/85 border border-white/10 backdrop-blur-md transition-all hover:border-cyber-brightRed/60 hover:shadow-[0_0_25px_rgba(224,0,42,0.2)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyber-red/10 border border-cyber-red/40 text-cyber-brightRed">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">DIRECT EMAIL RELAY</span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm font-mono font-bold text-white hover:text-cyber-brightRed transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(personal.email, "email")}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-cyber-red/20 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Phone Channel with Copy Action */}
          <div
            data-magnetic
            onMouseEnter={() => soundFX.playHover()}
            className="p-5 rounded-2xl bg-[#090909]/85 border border-white/10 backdrop-blur-md transition-all hover:border-cyber-cyan/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">TELEPHONE TELEMETRY</span>
                  <a
                    href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                    className="text-sm font-mono font-bold text-white hover:text-cyber-cyan transition-colors"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(personal.phone, "phone")}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-cyber-cyan/20 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Magnetic Social Links Matrix */}
          <div className="p-5 rounded-2xl bg-[#090909]/85 border border-white/10 backdrop-blur-md space-y-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
              NETWORK PROTOCOL PROFILES
            </span>
            <div className="grid grid-cols-2 gap-3">
              <a
                data-magnetic
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-cyber-brightRed/60 hover:bg-cyber-red/10 flex items-center justify-between text-xs font-mono text-gray-300 hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-cyber-brightRed group-hover:scale-110 transition-transform" />
                  <span>GITHUB</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyber-brightRed group-hover:translate-x-0.5" />
              </a>

              <a
                data-magnetic
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 flex items-center justify-between text-xs font-mono text-gray-300 hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-cyber-cyan group-hover:scale-110 transition-transform" />
                  <span>LINKEDIN</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyber-cyan group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Location & Encryption Card */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-xs font-mono text-gray-400 flex items-center justify-between">
            <div>
              <span className="text-gray-500 block text-[10px]">ORIGIN COORDINATES:</span>
              <span className="text-white">{personal.location}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block text-[10px]">ENCRYPTION PROTOCOL:</span>
              <span className="text-emerald-400">TLS 1.3 // RSA-4096</span>
            </div>
          </div>
        </div>

        {/* Right Column: Cybernetic Uplink Transmission Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="cyber-card p-6 sm:p-8 rounded-2xl relative space-y-4 text-left"
          >
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyber-brightRed" />
                <span className="text-xs font-mono text-white font-bold">DISPATCH_TRANSMISSION.PKT</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                READY_FOR_SEND
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-gray-400 block mb-1.5">
                  COMMUNICATOR NAME // CALLSIGN
                </label>
                <input
                  type="text"
                  required
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  placeholder="e.g. Alex Chen (Engineering Lead)"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 focus:border-cyber-brightRed focus:ring-1 focus:ring-cyber-brightRed outline-none text-white text-xs font-mono placeholder:text-gray-600 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-gray-400 block mb-1.5">
                  RETURN FREQUENCY // EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.senderEmail}
                  onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                  placeholder="alex@techcorp.io"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 focus:border-cyber-brightRed focus:ring-1 focus:ring-cyber-brightRed outline-none text-white text-xs font-mono placeholder:text-gray-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-gray-400 block mb-1.5">
                TRANSMISSION SUBJECT
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Full-Stack / AI Role Opportunity"
                className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 focus:border-cyber-brightRed focus:ring-1 focus:ring-cyber-brightRed outline-none text-white text-xs font-mono placeholder:text-gray-600 transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-gray-400 block mb-1.5">
                PAYLOAD DATA // MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Details of the opportunity, project scope, or technical briefing..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 focus:border-cyber-brightRed focus:ring-1 focus:ring-cyber-brightRed outline-none text-white text-xs font-mono placeholder:text-gray-600 transition-all resize-none"
              />
            </div>

            {/* Submission Status & Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>DIRECT RELAY DISPATCH</span>
              </div>

              <button
                type="submit"
                data-magnetic
                disabled={isSending}
                onMouseEnter={() => soundFX.playHover()}
                className="cyber-btn-primary w-full sm:w-auto px-7 py-3.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>ENCRYPTING & TRANSMITTING...</span>
                  </>
                ) : isSent ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>TRANSMISSION CONFIRMED!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>DISPATCH UPLINK</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
