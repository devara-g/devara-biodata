"use client";

import React, { useState, useEffect } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import {
  Network,
  Database,
  Server,
  Activity,
  Cpu,
  Gauge,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
} from "lucide-react";

export function DataLogSection() {
  const [activeNode, setActiveNode] = useState<string>("api");
  const [copiedBio, setCopiedBio] = useState(false);
  const [livePing, setLivePing] = useState(14);

  // Simulate subtle real-time server ping telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePing(Math.floor(Math.random() * 5) + 12);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyBio = () => {
    sounds.playConfirm();
    navigator.clipboard.writeText(BIODATA.bio);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const pillars = [
    {
      id: "api",
      title: "API & MICROSERVICES",
      subtitle: "RESTful & GraphQL Gateways",
      icon: Network,
      tag: "HIGH-THROUGHPUT",
      desc: "Perancangan endpoint asinkronus berlatensi sub-20ms dengan enkripsi JWT, rate-limiting, and auto-generated OpenAPI contracts.",
      metrics: "Sub-20ms Latency // 99.99% Uptime",
    },
    {
      id: "data",
      title: "DATABASE ENGINE CORE",
      subtitle: "ACID Relational & In-Memory Cache",
      icon: Database,
      tag: "DATA INTEGRITY",
      desc: "Optimasi indexing query kompleks, transaction isolation, clustering PostgreSQL/MySQL, serta in-memory Redis session management.",
      metrics: "94.2% Cache Hit Ratio // Zero Deadlocks",
    },
    {
      id: "devops",
      title: "DEVOPS & CLOUD INFRA",
      subtitle: "Docker & Automated CI/CD",
      icon: Server,
      tag: "ZERO DOWNTIME",
      desc: "Multi-stage container builds, automated GitHub Actions pipelines, Linux edge environment isolation, dan zero-downtime deployment.",
      metrics: "Automated Deploy // Isolated Sandbox",
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
              <Activity className="w-4 h-4" />
              <span>SYSTEM_DATA_LOG // 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              <span>CORE_SPECIFICATION</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                SYSTEM TELEMETRY
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2 md:mt-0 max-w-md">
            Architectural telemetry, operational background log, and infrastructure capacity.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Executive Mission Console (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Executive Summary Card */}
            <div className="p-6 rounded-2xl bg-[#0a0a0c]/90 border border-neutral-800 hover:border-cyan-500/40 hover:shadow-[0_15px_35px_rgba(0,242,254,0.08)] transition-all backdrop-blur-xl space-y-5">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white tracking-wider">
                      EXECUTIVE_SUMMARY // ARCHITECT_LOG
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500">
                      SYS_ID: DVR-BACKEND-CORE
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyBio}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                  title="Copy executive bio"
                >
                  {copiedBio ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY_BIO</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bio Narrative */}
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {BIODATA.bio}
              </p>

              {/* Core Stat Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-1">
                    <span>LOCATION</span>
                    <Globe className="w-3 h-3 text-neutral-400" />
                  </div>
                  <span className="text-xs font-mono font-bold text-white block">
                    Indonesia (WIB / UTC+7)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-1">
                    <span>CORE SPECIALTY</span>
                    <Zap className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 block">
                    Backend & Microservices
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-1">
                    <span>WORK STATUS</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 block">
                    Open / Immediate
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                const isSelected = activeNode === pillar.id;

                return (
                  <div
                    key={pillar.id}
                    onClick={() => {
                      sounds.playClick();
                      setActiveNode(pillar.id);
                    }}
                    className={`p-4.5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0c0c10] border-cyan-500/60 shadow-[0_0_15px_rgba(0,242,254,0.15)] scale-[1.02]"
                        : "bg-[#09090b]/80 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#0c0c10]/60 text-neutral-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,254,0.4)]"
                              : "bg-neutral-900 text-cyan-400 border border-neutral-800"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold">
                          {pillar.tag}
                        </span>
                      </div>

                      <h4 className="text-xs font-mono font-bold text-white tracking-wide">
                        {pillar.title}
                      </h4>
                      <p className="text-[10px] font-mono text-cyan-400 mt-0.5 font-semibold">
                        {pillar.subtitle}
                      </p>

                      <p className="text-xs text-slate-300 mt-2 font-sans line-clamp-3 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-900 text-[9px] font-mono text-neutral-400">
                      {pillar.metrics}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Telemetry HUD & System Health (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0a0a0c]/90 border border-neutral-800 hover:border-cyan-500/40 hover:shadow-[0_15px_35px_rgba(0,242,254,0.08)] transition-all backdrop-blur-xl space-y-5">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold text-white tracking-wider">
                    SYSTEM_TELEMETRY_STATS
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9.5px] font-mono text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE (PING: {livePing}ms)</span>
                </div>
              </div>

              {/* Metric 2x2 Gauges Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    API LATENCY
                  </span>
                  <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">
                    {livePing}ms
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 mt-0.5 block">
                    High Throughput
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    SYSTEM UPTIME
                  </span>
                  <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                    {BIODATA.telemetry.uptime}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 mt-0.5 block">
                    SLA Guaranteed
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    CACHE HIT RATE
                  </span>
                  <span className="text-2xl font-bold font-mono text-purple-400 mt-1 block">
                    {BIODATA.telemetry.cacheHitRate}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 mt-0.5 block">
                    Redis Cluster
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-neutral-700 transition-colors">
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    CODE VOLUME
                  </span>
                  <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
                    {BIODATA.telemetry.linesOfCode}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 mt-0.5 block">
                    Tested Production
                  </span>
                </div>
              </div>

              {/* Progress Gauges */}
              <div className="space-y-3.5 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-200">
                      Backend Systems (Node.js / Express / Laravel)
                    </span>
                    <span className="text-cyan-400 font-bold">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.3)]"
                      style={{ width: "92%" }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-200">
                      Database Optimization (SQL & Indexing)
                    </span>
                    <span className="text-emerald-400 font-bold">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: "88%" }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-200">
                      Docker Containers & Linux Edge
                    </span>
                    <span className="text-purple-400 font-bold">82%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                      style={{ width: "82%" }}
                    />
                  </div>
                </div>
              </div>

              {/* System Security & Integrity Checks */}
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-850 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SECURE_SANDBOX: ACTIVE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CI/CD INTEGRATED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
