"use client";

import React, { useState, useEffect, useRef } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import {
  Search,
  Terminal,
  Code2,
  FolderGit2,
  Mail,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) onClose();
        else {
          // Open
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "about",
      title: "View About & Telemetry Metrics",
      category: "Navigation",
      icon: Code2,
      run: () => {
        window.location.href = "#about";
        onClose();
      },
    },
    {
      id: "stack",
      title: "Explore Tech Arsenal & Modules",
      category: "Navigation",
      icon: Terminal,
      run: () => {
        window.location.href = "#stack";
        onClose();
      },
    },
    {
      id: "projects",
      title: "Browse Deployed Projects & Blueprints",
      category: "Navigation",
      icon: FolderGit2,
      run: () => {
        window.location.href = "#projects";
        onClose();
      },
    },
    {
      id: "terminal",
      title: "Open Interactive CLI Console",
      category: "Directives",
      icon: Terminal,
      run: () => {
        window.location.href = "#terminal";
        onClose();
      },
    },
    {
      id: "contact",
      title: "Establish Uplink / Contact Devara",
      category: "Communication",
      icon: Mail,
      run: () => {
        window.location.href = "#contact";
        onClose();
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile (@devara-g)",
      category: "External Link",
      icon: ExternalLink,
      run: () => {
        window.open(BIODATA.github, "_blank");
        onClose();
      },
    },
    {
      id: "sound",
      title: "Toggle Cyber Sound FX",
      category: "System Settings",
      icon: Volume2,
      run: () => {
        sounds.toggleSound();
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (action) =>
      action.title.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,242,254,0.3)] overflow-hidden"
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-sans">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 font-mono text-xs space-y-1">
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    sounds.playClick();
                    action.run();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-left text-slate-200 hover:text-cyan-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-950 group-hover:border-cyan-500/50">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300">
                        {action.title}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {action.category}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              No matching directives found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>NAVIGATION // QUICK DIRECTIVES</span>
          <span>DEVARA.SYS v2.0</span>
        </div>
      </div>
    </div>
  );
}
