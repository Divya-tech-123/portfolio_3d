"use client";

import React, { useEffect, useRef, useState } from "react";
import { useIntro } from "@/context/IntroContext";
import { soundFX } from "@/lib/utils";
import { Play } from "lucide-react";

interface CinematicVideoProps {
  videoSrc?: string;
}

// Versioned asset URL for cache control to avoid stale browser caching
const VIDEO_ASSET_VERSION = "v=20260927_latest";

export default function CinematicVideo({
  videoSrc = `/video/portfolio_animated.mp4?${VIDEO_ASSET_VERSION}`,
}: CinematicVideoProps) {
  const {
    introPhase,
    introProgress,
    isComplete,
    onVideoTimeUpdate,
    onVideoEnded,
    skipIntro,
  } = useIntro();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Parallax Coordinates for Post-Intro Interaction
  const targetParallaxRef = useRef<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0.5,
    normY: 0.5,
  });
  const currentParallaxRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Video Initialization and Strict HTML5 Event Management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const handlePlay = () => {
      setHasStartedPlaying(true);
      setAutoplayBlocked(false);
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        onVideoTimeUpdate(video.currentTime, video.duration);
      }
    };

    const handleEnded = () => {
      onVideoEnded();
    };

    video.addEventListener("playing", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // Trigger video playback
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasStartedPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setAutoplayBlocked(true);
        });
    }

    return () => {
      video.removeEventListener("playing", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onVideoTimeUpdate, onVideoEnded]);

  // 2. Mouse Move Tracking for Post-Intro Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const winW = window.innerWidth || 1920;
      const winH = window.innerHeight || 1080;

      const normX = Math.min(Math.max(e.clientX / winW, 0), 1);
      const normY = Math.min(Math.max(e.clientY / winH, 0), 1);
      const dx = (e.clientX - winW / 2) / (winW / 2);
      const dy = (e.clientY - winH / 2) / (winH / 2);

      targetParallaxRef.current = {
        x: dx,
        y: dy,
        normX,
        normY,
      };

      if (glowRef.current && isComplete) {
        const xp = (normX * 100).toFixed(1);
        const yp = (normY * 100).toFixed(1);
        glowRef.current.style.background = `radial-gradient(circle 650px at ${xp}% ${yp}%, rgba(224, 0, 42, 0.22), rgba(0, 240, 255, 0.04) 50%, transparent 80%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isComplete]);

  // 3. Continuous RAF Loop for Smooth Camera Parallax & Scroll Integration
  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      const docHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = isComplete
          ? `${(scrollProgress * 100).toFixed(2)}%`
          : "0%";
      }

      if (containerRef.current) {
        if (!isComplete) {
          // Stable camera framing during video
          containerRef.current.style.transform = `scale(1.05) translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`;
        } else {
          // Smooth scroll & cursor parallax post-intro
          const scrollDamp = Math.min(scrollY / 800, 1);
          const baseScale = 1.05 - scrollDamp * 0.05;
          const scrollTranslateY = scrollDamp * -35;

          const targetX = targetParallaxRef.current.x;
          const targetY = targetParallaxRef.current.y;

          currentParallaxRef.current.x += (targetX - currentParallaxRef.current.x) * 0.10;
          currentParallaxRef.current.y += (targetY - currentParallaxRef.current.y) * 0.10;

          const curX = currentParallaxRef.current.x;
          const curY = currentParallaxRef.current.y;

          containerRef.current.style.transform = `scale(${baseScale.toFixed(3)}) translate3d(${(curX * -14).toFixed(2)}px, ${(scrollTranslateY + curY * -10).toFixed(2)}px, 0) rotateX(${(curY * -1.5).toFixed(2)}deg) rotateY(${(curX * 1.5).toFixed(2)}deg)`;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isComplete]);

  const handleManualPlay = () => {
    soundFX.playClick();
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setHasStartedPlaying(true);
        setAutoplayBlocked(false);
      });
    }
  };

  return (
    <>
      {/* Top Ambient Red Glowing Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ height: "2px" }}
      >
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-cyber-red via-cyber-brightRed to-cyber-cyan transition-all duration-150 ease-out shadow-[0_0_12px_#e0002a]"
          style={{ width: "0%" }}
        />
      </div>

      {/* Fixed Fullscreen Cinematic Canvas (Layer 1: #030303 background) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#030303]">
        {/* Parallax Container */}
        <div
          ref={containerRef}
          className="relative w-full h-full will-change-transform"
          style={{
            transform: "scale(1.05) translate3d(0,0,0) rotateX(0deg) rotateY(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Layer 2: Continuous Volumetric Red Atmospheric Smoke & Rim Glow */}
          <div className="cine-smoke" />
          <div
            className="cine-atmospheric-glow"
            style={{
              opacity: isComplete ? 0.85 : 0.45,
            }}
          />

          {/* Layer 3: HTML5 Cinematic Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted
            autoPlay
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)",
              opacity: hasStartedPlaying ? (isComplete ? 0.75 : 1) : 0,
              filter: isComplete
                ? "contrast(1.2) brightness(0.82) saturate(1.2)"
                : "contrast(1.15) brightness(0.92) saturate(1.25)",
            }}
          />

          {/* Layer 4: Reflective Floor & Vignette */}
          <div className="cine-floor-reflection" />
          <div className="cine-vignette" />

          {/* Layer 5: Dynamic Cursor Spotlight (Active post-intro) */}
          <div id="cine-glow" ref={glowRef} className="cine-glow" />

          {/* Layer 6: Film Grain & Scanlines */}
          <div className="cine-grain" />
          <div className="cine-scan" />

          {/* Layer 7: Post-Intro Darkening Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-[8]"
            style={{
              transition: "opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), background 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
              background: isComplete
                ? "linear-gradient(to bottom, rgba(3, 3, 3, 0.85) 0%, rgba(3, 3, 3, 0.45) 50%, rgba(3, 3, 3, 0.95) 100%)"
                : "linear-gradient(to bottom, rgba(3, 3, 3, 0.5) 0%, transparent 50%, rgba(3, 3, 3, 0.7) 100%)",
              opacity: isComplete ? 1 : 0.5,
            }}
          />
        </div>

        {/* Minimal Autoplay Unlock Prompt if browser strictly blocks autoplay */}
        {autoplayBlocked && !isComplete && (
          <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center bg-black/80 backdrop-blur-md">
            <button
              onClick={handleManualPlay}
              className="px-8 py-4 rounded-xl font-mono text-sm font-bold bg-cyber-brightRed text-white hover:bg-cyber-red shadow-[0_0_30px_rgba(224,0,42,0.6)] transition-all hover:scale-105 flex items-center gap-3 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>INITIALIZE CINEMATIC INTRO</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
