"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

export type IntroPhase = "loading" | "playing" | "holding" | "transitioning" | "complete";

interface IntroContextType {
  introPhase: IntroPhase;
  isComplete: boolean;
  introProgress: number; // 0.0 to 1.0
  sceneTime: number; // current video playback time
  videoDuration: number;
  autoplayBlocked: boolean;
  startManualPlay: () => void;
  onVideoTimeUpdate: (currentTime: number, duration: number) => void;
  onVideoEnded: () => void;
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  introPhase: "loading",
  isComplete: false,
  introProgress: 0,
  sceneTime: 0,
  videoDuration: 4.5,
  autoplayBlocked: false,
  startManualPlay: () => {},
  onVideoTimeUpdate: () => {},
  onVideoEnded: () => {},
  skipIntro: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("loading");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [introProgress, setIntroProgress] = useState<number>(0);
  const [sceneTime, setSceneTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(4.5);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);

  const completedRef = useRef(false);

  // Force manual scroll restoration & reset scroll to 0 immediately on startup
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, []);

  // Lock body & document scroll while video intro is playing
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      const preventKeyScroll = (e: KeyboardEvent) => {
        const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", "Home", "End", " "];
        if (keys.includes(e.key)) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });

      return () => {
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeyScroll);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isComplete]);

  const onVideoTimeUpdate = useCallback((currentTime: number, duration: number) => {
    if (completedRef.current) return;

    if (duration > 0 && isFinite(duration)) {
      setVideoDuration(duration);
    }

    const dur = duration > 0 ? duration : 4.5;
    const progress = Math.min(Math.max(currentTime / dur, 0), 1);

    setSceneTime(currentTime);
    setIntroProgress(progress);

    if (currentTime > 0.1 && introPhase === "loading") {
      setIntroPhase("playing");
      setAutoplayBlocked(false);
    }
  }, [introPhase]);

  const onVideoEnded = useCallback(() => {
    if (completedRef.current) return;

    // Trigger post-video cinematic transition sequence
    setIntroPhase("transitioning");
    setIntroProgress(1);

    setTimeout(() => {
      completedRef.current = true;
      setIntroPhase("complete");
      setIsComplete(true);
    }, 750);
  }, []);

  const skipIntro = useCallback(() => {
    completedRef.current = true;
    setIntroPhase("complete");
    setIntroProgress(1);
    setIsComplete(true);
  }, []);

  const startManualPlay = useCallback(() => {
    setAutoplayBlocked(false);
    setIntroPhase("playing");
  }, []);

  return (
    <IntroContext.Provider
      value={{
        introPhase,
        isComplete,
        introProgress,
        sceneTime,
        videoDuration,
        autoplayBlocked,
        startManualPlay,
        onVideoTimeUpdate,
        onVideoEnded,
        skipIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
