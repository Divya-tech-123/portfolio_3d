"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable completely on touch / mobile devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isMag = !!target.closest("[data-magnetic]");
      const isInteractive =
        isMag ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        !!target.closest("button") ||
        !!target.closest("a") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(isInteractive);
      setIsMagnetic(isMag);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth lerp tracking loop for outer targeting ring (lerp factor 0.18 for buttery responsiveness)
    let rafId: number;
    const animateTrail = () => {
      const currentX = trailRef.current.x === -100 ? posRef.current.x : trailRef.current.x;
      const currentY = trailRef.current.y === -100 ? posRef.current.y : trailRef.current.y;

      const nextX = currentX + (posRef.current.x - currentX) * 0.2;
      const nextY = currentY + (posRef.current.y - currentY) * 0.2;

      trailRef.current = { x: nextX, y: nextY };
      setTrail({ x: nextX, y: nextY });

      rafId = requestAnimationFrame(animateTrail);
    };

    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Cyber Reticle Dot */}
      <div
        className="fixed pointer-events-none z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? "w-2 h-2 bg-cyber-cyan shadow-[0_0_12px_#00f0ff]"
              : isHovering
              ? "w-3 h-3 bg-cyber-brightRed shadow-[0_0_14px_#e0002a]"
              : "w-1.5 h-1.5 bg-white shadow-[0_0_8px_#ffffff]"
          }`}
        />
      </div>

      {/* Trailing Outer Targeting Ring with [data-magnetic] expansion */}
      <div
        className="fixed pointer-events-none z-[9998] will-change-transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 flex items-center justify-center ${
            isMagnetic
              ? "w-12 h-12 border-cyber-brightRed bg-cyber-red/15 scale-125 rotate-45 shadow-[0_0_20px_rgba(224,0,42,0.4)]"
              : isHovering
              ? "w-10 h-10 border-cyber-brightRed/80 bg-cyber-red/10 scale-110 rotate-45 shadow-[0_0_15px_rgba(224,0,42,0.3)]"
              : isClicking
              ? "w-7 h-7 border-cyber-cyan bg-cyber-cyan/20 scale-90"
              : "w-7 h-7 border-white/25 border-dashed"
          }`}
        >
          {(isHovering || isMagnetic) && (
            <div className="w-1 h-1 bg-cyber-brightRed rounded-full" />
          )}
        </div>
      </div>
    </>
  );
}
