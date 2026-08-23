"use client";

import React, { useState, useEffect } from "react";
import { MatrixBackground } from "@/components/ui/MatrixBackground";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { DataLogSection } from "@/components/about/DataLogSection";
import { TechArsenal } from "@/components/tech/TechArsenal";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { InteractiveCLI } from "@/components/terminal/InteractiveCLI";
import { UplinkContact } from "@/components/contact/UplinkContact";
import { MusicPlayer } from "@/components/audio/MusicPlayer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Footer } from "@/components/ui/Footer";
import { PreloaderScreen } from "@/components/ui/PreloaderScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Prevent jumping to hash on refresh; always start cleanly at top
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* System Boot Initializer Preloader Screen */}
      {isLoading && (
        <PreloaderScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Dynamic Cyber Matrix Canvas Background */}
      <MatrixBackground />

      {/* Sticky Cyber HUD Navbar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <DataLogSection />
        <TechArsenal />
        <ProjectsSection />
        <InteractiveCLI />
        <UplinkContact />
        <Footer />
      </div>

      {/* Floating Vinyl Audio Player (Only shows after initial boot) */}
      {!isLoading && <MusicPlayer />}

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </main>
  );
}
