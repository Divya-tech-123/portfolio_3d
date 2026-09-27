"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, Certification } from "@/data/portfolioData";
import { soundFX } from "@/lib/utils";
import { 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCw, 
  Play, 
  Pause, 
  Sparkles, 
  Key, 
  Cpu, 
  Lock,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export default function Certifications() {
  const certs = PORTFOLIO_DATA.certifications;
  const N = certs.length;
  const step = 360 / N;

  // Responsive radius R
  const [radius, setRadius] = useState<number>(480);
  const [rotation, setRotation] = useState<number>(0);
  const [autoSpin, setAutoSpin] = useState<boolean>(true);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  // Drag & Inertia state refs
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const pointerHistoryRef = useRef<{ x: number; time: number }[]>([]);
  const animationFrameRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const autoSpinRef = useRef<boolean>(true);
  const isInteractingRef = useRef<boolean>(false);
  const hasMovedSignificantlyRef = useRef<boolean>(false);

  // Keep refs in sync with state
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    autoSpinRef.current = autoSpin;
  }, [autoSpin]);

  // Window resize listener for responsive radius R: 480px (desktop), 380px (tablet), 275px (mobile)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(275);
      } else if (width < 1024) {
        setRadius(380);
      } else {
        setRadius(480);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Normalize angle to 0..360 range
  const normalizeAngle = (ang: number) => {
    return ((ang % 360) + 360) % 360;
  };

  // Find currently active center index
  const activeIndex = normalizeAngle(-rotation) / step;
  const nearestIndex = Math.round(activeIndex) % N;

  // =========================================================================
  // Physics & Animation Loop (Throw Inertia + Friction Damping + Auto-Spin)
  // =========================================================================
  useEffect(() => {
    const FRICTION = 0.945;
    const AUTO_SPIN_SPEED = 0.06; // degrees per frame

    const loop = () => {
      if (!isDraggingRef.current) {
        // Inertia throw physics
        if (Math.abs(velocityRef.current) > 0.005) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= FRICTION;
          setRotation(rotationRef.current);
        } else {
          velocityRef.current = 0;
          // Auto-spin resumes when idle
          if (autoSpinRef.current && !isInteractingRef.current) {
            rotationRef.current -= AUTO_SPIN_SPEED;
            setRotation(rotationRef.current);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // =========================================================================
  // Pointer Event Handlers (Drag Physics & Multi-sample Velocity Tracking)
  // =========================================================================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDraggingRef.current = true;
    isInteractingRef.current = true;
    hasMovedSignificantlyRef.current = false;
    startXRef.current = e.clientX;
    startRotationRef.current = rotationRef.current;
    velocityRef.current = 0;
    pointerHistoryRef.current = [{ x: e.clientX, time: performance.now() }];

    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedSignificantlyRef.current = true;
    }

    // Drag sensitivity
    const dragMultiplier = radius > 350 ? 0.28 : 0.42;
    const newRot = startRotationRef.current + deltaX * dragMultiplier;
    rotationRef.current = newRot;
    setRotation(newRot);

    // Multi-sample velocity tracking across recent pointer movements
    const now = performance.now();
    const history = pointerHistoryRef.current;
    history.push({ x: e.clientX, time: now });

    while (history.length > 0 && now - history[0].time > 120) {
      history.shift();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Calculate throw velocity from recent pointer samples
    const history = pointerHistoryRef.current;
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = (last.time - first.time) || 16;
      const dx = last.x - first.x;
      const dragMultiplier = radius > 350 ? 0.28 : 0.42;
      velocityRef.current = (dx / dt) * 16 * dragMultiplier;
      velocityRef.current = Math.max(Math.min(velocityRef.current, 8.0), -8.0);
    }

    const target = e.currentTarget;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {}

    setTimeout(() => {
      isInteractingRef.current = false;
    }, 2500);
  };

  // Spin directly to card with shortest rotational delta
  const spinToCard = useCallback(
    (index: number) => {
      soundFX.playClick();
      isInteractingRef.current = true;
      velocityRef.current = 0;

      const targetAngle = -index * step;
      const current = rotationRef.current;

      const diff = ((targetAngle - current) % 360 + 540) % 360 - 180;
      const newTarget = current + diff;

      const start = current;
      const change = newTarget - start;
      const duration = 600;
      const startTime = performance.now();

      const animateSpin = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const nextRot = start + change * ease;
        rotationRef.current = nextRot;
        setRotation(nextRot);

        if (progress < 1) {
          requestAnimationFrame(animateSpin);
        } else {
          setTimeout(() => {
            isInteractingRef.current = false;
          }, 2000);
        }
      };

      requestAnimationFrame(animateSpin);
    },
    [step]
  );

  const handleCardClick = (index: number, cert: Certification) => {
    if (hasMovedSignificantlyRef.current) return;

    const isCurrentFront = Math.round(normalizeAngle(-rotation) / step) % N === index;

    if (isCurrentFront) {
      soundFX.playClick();
      setSelectedCert(cert);
    } else {
      spinToCard(index);
    }
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    soundFX.playBeep(950, 0.1);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section
      id="credentials"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center select-none"
    >
      <div id="certifications" className="sr-only" aria-hidden="true" />
      {/* Background Decorative Tech Lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-[600px] h-[600px] rounded-full border border-dashed border-cyber-red/40 animate-spin" style={{ animationDuration: "60s" }} />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-cyber-brightRed/30" />
      </div>

      {/* Section Header with Scroll Reveal */}
      <div className="text-center relative z-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-red/40 bg-cyber-red/10 text-cyber-brightRed text-xs font-mono mb-4 shadow-[0_0_15px_rgba(196,0,36,0.3)]"
        >
          <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
          <span>CRYPTOGRAPHIC CREDENTIAL MATRIX</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: CINEMATIC_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight uppercase"
        >
          Verified <span className="text-cyber-brightRed drop-shadow-[0_0_20px_rgba(224,0,42,0.6)]">Certifications</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: CINEMATIC_EASE }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans"
        >
          Interactive 3D cylindrical gallery. Drag with velocity throw inertia, spin around the ring, and click the front card to inspect cryptographic hash telemetry.
        </motion.p>
      </div>

      {/* 3D Gallery Viewport (Using touch-action: pan-y for smooth mobile vertical scroll) */}
      <div className="relative w-full h-[520px] sm:h-[560px] md:h-[600px] flex items-center justify-center overflow-visible">
        {/* Gallery Container with 3D Perspective */}
        <div
          data-draggable-3d
          className="draggable-3d-element relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ 
            perspective: "1200px",
            touchAction: "pan-y",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Cylinder at: transform: translateZ(-R) rotateY(rotation deg) */}
          <div
            className="absolute preserve-3d will-change-transform transition-transform"
            style={{
              width: "0px",
              height: "0px",
              transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {certs.map((cert, i) => {
              const cardAngle = i * step;
              const totalAngleRad = ((cardAngle + rotation) * Math.PI) / 180;
              const cosPhi = Math.cos(totalAngleRad);
              const isFrontFacing = cosPhi > 0.05;
              const isCenterFront = nearestIndex === i;

              return (
                <div
                  key={cert.id}
                  data-magnetic
                  onClick={() => handleCardClick(i, cert)}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`absolute top-0 left-0 w-[270px] sm:w-[320px] md:w-[350px] rounded-xl border backdrop-blur-xl transition-all duration-300 ${
                    isFrontFacing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  } ${
                    isCenterFront
                      ? "ring-2 ring-cyber-brightRed shadow-[0_0_35px_rgba(224,0,42,0.35)]"
                      : "opacity-60 hover:opacity-85"
                  }`}
                  style={{
                    height: "400px",
                    transform: `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background: "rgba(9, 9, 9, 0.9)",
                    borderColor: isCenterFront ? cert.accentColor : "rgba(196, 0, 36, 0.25)",
                    touchAction: "pan-y",
                  }}
                >
                  {/* Brand-Colored Laser Top Beam */}
                  <div
                    className="h-1.5 w-full rounded-t-xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cert.accentColor}, transparent)`,
                      boxShadow: `0 0 12px ${cert.accentColor}`,
                    }}
                  />

                  {/* Corner cyber ticks */}
                  <div className="corner-tl" />
                  <div className="corner-tr" />
                  <div className="corner-bl" />
                  <div className="corner-br" />

                  {/* Card Content */}
                  <div className="p-5 flex flex-col justify-between h-[calc(100%-6px)] text-left">
                    <div>
                      {/* Top Header & Monospace Credential ID */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                          {cert.credentialId.slice(0, 16)}...
                        </span>
                        <span
                          className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                          style={{
                            backgroundColor: `${cert.accentColor}20`,
                            color: cert.accentColor,
                            border: `1px solid ${cert.accentColor}50`,
                          }}
                        >
                          {cert.badge}
                        </span>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="text-lg font-bold font-display text-white tracking-wide leading-snug mb-1.5 group-hover:text-cyber-brightRed">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5 mb-3">
                        <Award className="w-3.5 h-3.5 text-cyber-cyan" />
                        <span>{cert.issuer}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400">{cert.date}</span>
                      </p>

                      {/* Description */}
                      <p className="text-xs text-gray-300/90 font-sans line-clamp-3 leading-relaxed mb-3">
                        {cert.description}
                      </p>
                    </div>

                    {/* Competency Skills & Verification CTA */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-cyber-cyan/30 text-cyber-cyan"
                          >
                            #{s}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 text-gray-400">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Bottom Cryptographic Status Action */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>VERIFIED_SHA256</span>
                        </div>

                        <button
                          type="button"
                          data-magnetic
                          className="px-2.5 py-1 rounded text-[11px] font-mono bg-cyber-red/20 text-white border border-cyber-red/50 hover:bg-cyber-brightRed hover:text-white transition-colors cursor-pointer"
                        >
                          {isCenterFront ? "INSPECT HASH" : "FOCUS"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls HUD */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 rounded-xl bg-[#090909]/80 border border-white/10 backdrop-blur-md">
        {/* Left: Quick Controls */}
        <div className="flex items-center gap-3">
          <button
            data-magnetic
            onClick={() => spinToCard((nearestIndex - 1 + N) % N)}
            className="p-2 rounded border border-white/15 bg-white/5 hover:bg-cyber-red/20 hover:border-cyber-brightRed/50 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            data-magnetic
            onClick={() => spinToCard((nearestIndex + 1) % N)}
            className="p-2 rounded border border-white/15 bg-white/5 hover:bg-cyber-red/20 hover:border-cyber-brightRed/50 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-gray-400">
            [<span className="text-cyber-brightRed font-bold">{nearestIndex + 1}</span> / {N}]
          </span>
        </div>

        {/* Center: Pagination Dots */}
        <div className="flex items-center gap-2">
          {certs.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => spinToCard(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                nearestIndex === dotIdx
                  ? "w-8 bg-cyber-brightRed shadow-[0_0_10px_#e0002a]"
                  : "w-2 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Jump to cert ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Right: Auto-Spin Toggle */}
        <div>
          <button
            data-magnetic
            onClick={() => {
              soundFX.playClick();
              setAutoSpin(!autoSpin);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-all cursor-pointer ${
              autoSpin
                ? "bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
            }`}
          >
            {autoSpin ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Pause className="w-3.5 h-3.5" />}
            <span>AUTO-SPIN: {autoSpin ? "ON" : "PAUSED"}</span>
          </button>
        </div>
      </div>

      {/* Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#090909] border border-cyber-brightRed/50 shadow-[0_0_50px_rgba(224,0,42,0.35)] overflow-hidden text-left"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {/* Modal Laser Beam */}
            <div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(90deg, #c40024, ${selectedCert.accentColor}, #00f0ff)`,
                boxShadow: `0 0 15px #e0002a`,
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedCert(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-cyber-red/20 text-gray-400 hover:text-white border border-white/10 transition-colors z-10 cursor-pointer"
              aria-label="Close Verification Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header Badge */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyber-red/10 border border-cyber-red/40 text-cyber-brightRed">
                  <ShieldCheck className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold">
                      {selectedCert.verifiedStatus}
                    </span>
                    <span className="text-xs font-mono text-gray-400">ISSUED: {selectedCert.date}</span>
                  </div>
                  <h3 className="text-2xl font-black font-display text-white uppercase tracking-wide mt-1">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>

              {/* Issuer & Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-gray-500 uppercase">Issuing Authority:</span>
                  <p className="text-white font-semibold mt-0.5">{selectedCert.issuer}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase">Credential Identifier:</span>
                  <p className="text-cyber-cyan font-semibold mt-0.5">{selectedCert.credentialId}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase">Accreditation Tier:</span>
                  <p className="text-cyber-brightRed font-semibold mt-0.5">{selectedCert.badge}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase">Verification Engine:</span>
                  <p className="text-emerald-400 font-semibold mt-0.5">ECDSA-SHA256 DIGITAL SEAL</p>
                </div>
              </div>

              {/* Cryptographic Hash Inspector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-cyber-brightRed" />
                    CRYPTOGRAPHIC SECURITY HASH:
                  </span>
                  <button
                    onClick={() => copyHash(selectedCert.hash)}
                    className="flex items-center gap-1.5 text-cyber-cyan hover:underline cursor-pointer"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHash ? "HASH COPIED!" : "COPY SHA-256"}</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-black/70 border border-cyber-red/30 font-mono text-[11px] text-gray-300 break-all select-all">
                  {selectedCert.hash}
                </div>
              </div>

              {/* Competencies */}
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                  Verified Engineering Competencies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-cyber-cyan/30 text-cyber-cyan"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>IMMUTABLE SYSTEM RECORD // SIGNED & VALIDATED</span>
                </div>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedCert(null);
                  }}
                  className="w-full sm:w-auto px-6 py-2 rounded-lg font-mono text-xs font-bold bg-cyber-brightRed hover:bg-cyber-red text-white shadow-[0_0_15px_rgba(224,0,42,0.4)] transition-all cursor-pointer"
                >
                  DISMISS INSPECTOR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
