"use client";

import React, { useState, useEffect } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import { LanyardCard } from "@/components/lanyard/LanyardCard";
import { CodeTerminalCard } from "@/components/hero/CodeTerminalCard";
import {
  ChevronRight,
  Send,
  Terminal,
  ArrowDown,
} from "lucide-react";

export function HeroSection() {
  const [typewriterText, setTypewriterText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Looping Typewriter Effect
  useEffect(() => {
    const currentPhrase = BIODATA.typewriterRoles[phraseIdx];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setTypewriterText(currentPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);

          if (charIdx + 1 === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setTypewriterText(currentPhrase.substring(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);

          if (charIdx - 1 === 0) {
            setIsDeleting(false);
            setPhraseIdx((prev) => (prev + 1) % BIODATA.typewriterRoles.length);
          }
        }
      },
      isDeleting ? 45 : 85
    );

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Typography & Info */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20 space-y-6">
            {/* System Status Badge with Subtle Glow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-[0_0_12px_rgba(0,242,254,0.1)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold text-slate-300 tracking-wider">
                SYSTEM ONLINE // AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Main Cyber Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white leading-none">
                <span className="text-slate-400">
                  MUHAMMAD
                </span>{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  DEVARA
                </span>
              </h1>

              {/* Looping Typewriter Role */}
              <div className="flex items-center text-lg sm:text-2xl font-mono text-cyan-400 font-bold pt-2">
                <span className="text-slate-600 mr-2">&lt;</span>
                <span>{typewriterText}</span>
                <span className="w-2.5 h-6 bg-cyan-400 ml-1 inline-block animate-pulse" />
                <span className="text-slate-600 ml-1">/&gt;</span>
              </div>
            </div>

            {/* Description Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans">
              Engineering high-concurrency backend systems, ultra-low latency
              APIs, optimized database architectures, and next-generation full
              stack web platforms.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playConfirm()}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,242,254,0.2)] flex items-center gap-2"
              >
                <span>ACCESS_PROJECTS</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={() => sounds.playClick()}
                className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-mono text-xs font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>CONTACT_ME</span>
              </a>

              <a
                href="#terminal"
                onClick={() => sounds.playClick()}
                className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-300 font-mono text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>CLI</span>
              </a>
            </div>

            {/* Interactive Code / JSON Inspector Terminal */}
            <div className="w-full max-w-xl pt-2">
              <CodeTerminalCard />
            </div>
          </div>

          {/* Right Column: Authentic Physics Lanyard Nametag */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[560px]">
            <LanyardCard />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex justify-center pt-8 pb-2">
          <a
            href="#about"
            onClick={() => sounds.playClick()}
            className="flex flex-col items-center gap-1 text-slate-600 hover:text-cyan-400 transition-colors"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">
              SCROLL_DOWN
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
