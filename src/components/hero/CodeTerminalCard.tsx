"use client";

import React, { useState } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import { Copy, Check, Play, Terminal } from "lucide-react";

export function CodeTerminalCard() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"json" | "api">("json");
  const [apiOutput, setApiOutput] = useState<string | null>(null);

  const jsonSnippet = {
    name: BIODATA.name,
    role: BIODATA.role,
    specialties: [
      "High-Concurrency Node.js / PHP Laravel",
      "Optimized Database Architecture (SQL & NoSQL)",
      "RESTful & GraphQL API Design",
      "Docker Microservices & CI/CD",
    ],
    status: "OPEN_FOR_COLLABORATION",
    activeNodes: 12,
    latency: "14ms",
  };

  const handleCopy = () => {
    sounds.playConfirm();
    navigator.clipboard.writeText(JSON.stringify(jsonSnippet, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runApiTest = () => {
    sounds.playClick();
    setApiOutput("Executing GET /api/v1/healthcheck...");
    setTimeout(() => {
      sounds.playConfirm();
      setApiOutput(
        JSON.stringify(
          {
            status: 200,
            uptime: "99.99%",
            server: "Devara-Edge-Node-01",
            responseTime: "12.4ms",
            message: "System operational. All microservices healthy.",
          },
          null,
          2
        )
      );
    }, 400);
  };

  return (
    <div className="w-full rounded-xl bg-[#0a0e17] border border-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* macOS Window Title Bar with Traffic Lights */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-slate-800/90 select-none">
        <div className="flex items-center gap-2">
          {/* macOS Traffic Lights: Close, Minimize, Zoom */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 hover:opacity-80 transition-opacity cursor-pointer shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 hover:opacity-80 transition-opacity cursor-pointer shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 hover:opacity-80 transition-opacity cursor-pointer shadow-sm" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 ml-3 font-semibold">
            dev_profile.json
          </span>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab("json");
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold transition-all ${
              activeTab === "json"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab("api");
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold transition-all flex items-center gap-1 ${
              activeTab === "api"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Play className="w-2.5 h-2.5" />
            <span>API TEST</span>
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors ml-1"
            title="Copy JSON"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed bg-[#0a0e17]">
        {activeTab === "json" && (
          <div className="space-y-1">
            <div className="text-slate-500">
              {"// Devara System Specification"}
            </div>
            <div>
              <span className="text-slate-400">{"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">&quot;developer&quot;</span>:{" "}
              <span className="text-emerald-400">&quot;{BIODATA.name}&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">&quot;role&quot;</span>:{" "}
              <span className="text-emerald-400">&quot;{BIODATA.role}&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">&quot;core_stack&quot;</span>: [
              <div className="pl-4 text-amber-300">
                &quot;Node.js&quot;, &quot;PHP Laravel&quot;, &quot;MySQL&quot;, &quot;Docker&quot;, &quot;Next.js&quot;
              </div>
              ],
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">&quot;telemetry&quot;</span>: {"{"}
              <span className="text-slate-300">
                &quot;latency&quot;: <span className="text-yellow-400">&quot;14ms&quot;</span>, &quot;uptime&quot;: <span className="text-emerald-400">&quot;99.99%&quot;</span>
              </span>
              {"}"},
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">&quot;status&quot;</span>:{" "}
              <span className="text-emerald-400">&quot;READY_FOR_DEPLOY&quot;</span>
            </div>
            <div>
              <span className="text-slate-400">{"}"}</span>
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  GET
                </span>
                <span className="text-slate-400">https://api.devara.sys/v1/health</span>
              </div>
              <button
                onClick={runApiTest}
                className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                EXECUTE
              </button>
            </div>

            {apiOutput ? (
              <pre className="p-2.5 rounded bg-slate-900 text-emerald-400 text-[11px] border border-slate-800 whitespace-pre-wrap">
                {apiOutput}
              </pre>
            ) : (
              <div className="text-slate-500 italic text-[11px] py-4 text-center">
                Click &quot;EXECUTE&quot; to test live telemetry response
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
