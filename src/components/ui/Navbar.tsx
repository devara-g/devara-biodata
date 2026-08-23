"use client";

import React, { useState, useEffect } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import {
  Cpu,
  Volume2,
  VolumeX,
  Search,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setSoundEnabled(sounds.isEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "STACK", href: "#stack" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CLI_TERMINAL", href: "#terminal" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Cyber Logo */}
          <a
            href="#"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-wider text-white">
                DEVARA<span className="text-cyan-400">.SYS</span>
              </span>
              <span className="text-[8px] font-mono text-zinc-500 tracking-widest leading-none">
                BACKEND ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sounds.playClick()}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 py-1"
              >
                <span className="text-zinc-600 text-[10px]">//</span>
                <span className="tracking-wider">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenCommandPalette();
              }}
              title="Open Command Palette (Ctrl+K)"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Search</span>
              <kbd className="px-1.5 py-0.2 rounded bg-zinc-800 border border-zinc-700 text-[9px] text-zinc-400 font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? "Mute Sound FX" : "Enable Sound FX"}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* Uplink Intercept CTA Button */}
            <a
              href="#contact"
              onClick={() => sounds.playConfirm()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono text-xs font-bold tracking-wider transition-all"
            >
              <span>INTERCEPT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-zinc-950/95 backdrop-blur-md md:hidden pt-24 px-6 flex flex-col justify-between pb-10 border-b border-zinc-800">
          <div className="space-y-3 font-mono text-base">
            <div className="text-[10px] text-zinc-500 tracking-widest uppercase mb-2">
              SYSTEM DIRECTORY NAVIGATION
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 border-b border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>

          <div className="space-y-2 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <span>COMMAND PALETTE (CTRL+K)</span>
            </button>
            <a
              href="#contact"
              onClick={() => {
                sounds.playConfirm();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-cyan-500 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>ESTABLISH UPLINK</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
