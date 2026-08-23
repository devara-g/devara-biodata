"use client";

import React, { useState, useEffect } from "react";
import { sounds } from "@/lib/soundEffects";

interface PreloaderScreenProps {
  onComplete: () => void;
}

export function PreloaderScreen({ onComplete }: PreloaderScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const bootLogs = [
    "INITIALIZING_CORE_SYSTEMS...",
    "LOADING_BACKEND_MODULES [NODE // LARAVEL]...",
    "CONNECTING_DATABASE_CLUSTERS [SQL // REDIS]...",
    "ESTABLISHING_HIGH_SPEED_UPLINK...",
    "DEVARA_SYSTEM_READY [200 OK]",
  ];

  useEffect(() => {
    // Play initial subtle startup sound
    sounds.playHover();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Organic progressive loading increments
        const increment = Math.floor(Math.random() * 8) + 4;
        const nextVal = Math.min(100, prev + increment);

        // Update boot step log
        if (nextVal > 80) setCurrentStep(4);
        else if (nextVal > 60) setCurrentStep(3);
        else if (nextVal > 35) setCurrentStep(2);
        else if (nextVal > 15) setCurrentStep(1);

        return nextVal;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      sounds.playConfirm();
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500); // 500ms fade transition
      }, 350);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center select-none transition-all duration-500 ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle Matrix / Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Center Content Box */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 space-y-6">
        {/* System Header Tag */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>SYSTEM_BOOT // INITIALIZATION</span>
        </div>

        {/* Center Typography: DEVARA . B-END */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-[0.25em] text-white">
            DEVARA<span className="text-cyan-400 font-normal">.</span>B-END
          </h1>
          <p className="text-[11px] font-mono text-slate-400 tracking-wider">
            BACKEND ARCHITECT // SYSTEMS ENGINEER
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2 pt-2">
          {/* Bar track */}
          <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(0,242,254,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Telemetry info row */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 truncate max-w-[260px]">
              {bootLogs[currentStep]}
            </span>
            <span className="text-cyan-400 font-bold ml-2">
              {progress.toString().padStart(3, "0")}%
            </span>
          </div>
        </div>

        {/* Skip button for quick access */}
        <button
          onClick={() => {
            sounds.playClick();
            setIsFadingOut(true);
            setTimeout(onComplete, 300);
          }}
          className="text-[10px] font-mono text-slate-600 hover:text-slate-400 transition-colors pt-4 tracking-widest uppercase"
        >
          [ SKIP_INITIALIZATION ]
        </button>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between items-center text-[9px] font-mono text-slate-600">
        <span>SECURITY_CLEARANCE: LEVEL_5</span>
        <span>LATENCY: 12ms // STABLE</span>
      </div>
    </div>
  );
}
