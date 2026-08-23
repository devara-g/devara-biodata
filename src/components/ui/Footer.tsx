"use client";

import React from "react";
import { BIODATA } from "@/data/biodata";
import { Cpu, ArrowUp, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { sounds } from "@/lib/soundEffects";

export function Footer() {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-zinc-800/80 bg-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Status */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-mono font-bold text-white text-xs tracking-wider">
                {BIODATA.systemTag}
              </span>
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SYSTEM OPERATIONAL</span>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={BIODATA.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${BIODATA.email}`}
              onClick={() => sounds.playClick()}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-5 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2 text-center">
          <div>
            © {new Date().getFullYear()} MUHAMMAD DEVARA. ALL RIGHTS RESERVED.
          </div>
          <div className="text-zinc-600">
            Next.js App Router
          </div>
        </div>
      </div>
    </footer>
  );
}
