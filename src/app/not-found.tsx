import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.25)] text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 mx-auto animate-pulse">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            ERROR_404 // SIGNAL_LOST
          </div>
          <h1 className="text-3xl font-mono font-bold text-white">
            PAGE NOT FOUND
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            The requested telemetry endpoint or file coordinate does not exist in the Devara System Matrix.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)]"
        >
          <Home className="w-4 h-4" />
          <span>RETURN_TO_HOME_BASE</span>
        </Link>
      </div>
    </div>
  );
}
