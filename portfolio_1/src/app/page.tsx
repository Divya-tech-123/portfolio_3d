"use client";

import React from "react";
import { IntroProvider, useIntro } from "@/context/IntroContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import CinematicVideo from "@/components/CinematicVideo";
import CinematicTransition from "@/components/CinematicTransition";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import TerminalSection from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

function PortfolioInterface() {
  const { isComplete } = useIntro();

  return (
    <>
      {/* 
        1. CINEMATIC VIDEO FIRST ENGINE
        While video is playing, this is the ONLY visual layer on screen.
      */}
      <CinematicVideo />

      {/* 
        1.5. POST-VIDEO CINEMATIC TRANSITION EFFECT
        High-intensity laser scanner, anamorphic lens flare & radial shockwave.
      */}
      <CinematicTransition />

      {/* 
        2. PORTFOLIO INTERFACE STACK
        Strictly hidden and non-interactable until the video completes.
      */}
      <div
        style={{
          visibility: isComplete ? "visible" : "hidden",
          pointerEvents: isComplete ? "auto" : "none",
        }}
      >
        <AnimatePresence>
          {isComplete && (
            <motion.div
              key="portfolio-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              {/* Floating Cybernetic Navigation */}
              <Navbar />

              {/* Main Content Sections */}
              <div className="space-y-12 sm:space-y-20">
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Certifications />
                <TerminalSection />
                <Contact />
              </div>

              {/* Cyberpunk Footer */}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <IntroProvider>
      <main className="relative min-h-screen bg-transparent">
        <PortfolioInterface />
      </main>
    </IntroProvider>
  );
}
