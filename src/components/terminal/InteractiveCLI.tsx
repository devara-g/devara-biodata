"use client";

import React, { useState, useRef, useEffect } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import { Terminal as TerminalIcon, CornerDownLeft, Bot, Sparkles, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface CommandLog {
  id: string;
  command: string;
  isAiMode?: boolean;
  isLoading?: boolean;
  output: React.ReactNode;
}

export function InteractiveCLI() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isAiSession, setIsAiSession] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState<ChatMessage[]>([]);

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init-1",
      command: "devara --version",
      output: (
        <div className="text-slate-200">
          <span className="text-emerald-400 font-bold">DEVARA_CLI</span> v2.0.4-PROD [Architecture: Backend-x86_64]
          <br />
          Type <span className="text-cyan-400 font-bold">&quot;help&quot;</span> or launch Groq AI with <span className="text-purple-400 font-bold">&quot;sudo ai&quot;</span>.
        </div>
      ),
    },
  ]);

  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [logs]);

  // Call Live Groq API
  const sendGroqAiMessage = async (userPrompt: string) => {
    setIsAiLoading(true);
    sounds.playHover();

    const newHistory: ChatMessage[] = [
      ...aiChatHistory,
      { role: "user", content: userPrompt },
    ];
    setAiChatHistory(newHistory);

    const tempLogId = Math.random().toString();
    setLogs((prev) => [
      ...prev,
      {
        id: tempLogId,
        command: userPrompt,
        isAiMode: true,
        isLoading: true,
        output: (
          <div className="flex items-center gap-2 text-purple-300 text-xs font-mono py-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>[DEVARA_AI // Querying Groq Cloud Llama-3.3-70B...]</span>
          </div>
        ),
      },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, userMessage: userPrompt }),
      });

      const data = await res.json();
      const aiReply = data.reply || data.error || "No response received.";

      setAiChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: aiReply },
      ]);

      sounds.playConfirm();

      setLogs((prev) =>
        prev.map((log) => {
          if (log.id === tempLogId) {
            return {
              ...log,
              isLoading: false,
              output: (
                <div className="space-y-1.5 text-xs text-slate-200 leading-relaxed font-mono">
                  <div className="text-purple-400 font-bold flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>DEVARA_AI [Groq {data.model || "Llama-3.1"}]:</span>
                  </div>
                  <div className="whitespace-pre-wrap pl-2 border-l border-purple-500/40 text-slate-200">
                    {aiReply}
                  </div>
                </div>
              ),
            };
          }
          return log;
        })
      );
    } catch (err: any) {
      setLogs((prev) =>
        prev.map((log) => {
          if (log.id === tempLogId) {
            return {
              ...log,
              isLoading: false,
              output: (
                <div className="text-rose-400 text-xs font-mono">
                  [GROQ_CONNECTION_ERROR]: {err.message || "Failed to reach AI server."}
                </div>
              ),
            };
          }
          return log;
        })
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed || isAiLoading) return;

    sounds.playClick();
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    // If currently in AI Mode
    if (isAiSession) {
      if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "quit") {
        setIsAiSession(false);
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: trimmed,
            isAiMode: true,
            output: <div className="text-rose-400 font-mono text-xs">[GROQ_AI SESSION TERMINATED // RETURNED TO BASH SHELL]</div>,
          },
        ]);
        setInput("");
        return;
      }

      if (trimmed.toLowerCase() === "clear") {
        setLogs([]);
        setInput("");
        return;
      }

      // Send to Groq API
      setInput("");
      sendGroqAiMessage(trimmed);
      return;
    }

    const parts = trimmed.split(" ");
    const main = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    // Check for "sudo ai" or "ai"
    if (main === "sudo" && parts[1]?.toLowerCase() === "ai") {
      setIsAiSession(true);
      const aiQuery = parts.slice(2).join(" ");
      if (aiQuery) {
        setInput("");
        sendGroqAiMessage(aiQuery);
        return;
      } else {
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: trimmed,
            isAiMode: true,
            output: (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>[GROQ CLOUD AI NEURAL AGENT ONLINE]</span>
                </div>
                <p className="text-xs text-slate-200">
                  Sesi AI interaktif aktif ditenagai oleh <strong>Groq Cloud API (Llama-3.3-70B)</strong>. Tanyakan apa saja mengenai backend Devara, arsitektur sistem, atau kolaborasi!
                </p>
                <div className="text-[11px] font-mono text-purple-300">
                  💡 Ketik pertanyaan Anda atau ketik <span className="text-rose-400 font-bold">&quot;exit&quot;</span> untuk kembali ke bash.
                </div>
              </div>
            ),
          },
        ]);
        setInput("");
        return;
      }
    } else if (main === "ai") {
      setIsAiSession(true);
      if (args) {
        setInput("");
        sendGroqAiMessage(args);
        return;
      } else {
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: trimmed,
            isAiMode: true,
            output: (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 space-y-1 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>[GROQ AI ONLINE]</span>
                </div>
                <p className="text-slate-200">
                  Silakan tanyakan pertanyaan Anda ke Groq AI Assistant Devara.
                </p>
              </div>
            ),
          },
        ]);
        setInput("");
        return;
      }
    }

    let outputNode: React.ReactNode = null;

    switch (main) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">AVAILABLE SYSTEM COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11.5px]">
              <div><span className="text-purple-400 font-bold">sudo ai</span> — Groq AI Assistant (Llama-3.3)</div>
              <div><span className="text-emerald-400 font-bold">bio</span> — Developer executive overview</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — Tech stack & proficiencies</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — Deployed systems list</div>
              <div><span className="text-emerald-400 font-bold">telemetry</span> — System performance metrics</div>
              <div><span className="text-emerald-400 font-bold">contact</span> — Uplink transmission channels</div>
              <div><span className="text-emerald-400 font-bold">sudo hire</span> — Recruiter uplink</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Wipe terminal logs</div>
            </div>
          </div>
        );
        break;

      case "bio":
        outputNode = (
          <div className="text-slate-200 leading-relaxed text-xs">
            <span className="text-cyan-400 font-bold">{BIODATA.name}</span> — {BIODATA.role}
            <br />
            {BIODATA.bio}
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">LOADED MODULES:</div>
            {BIODATA.skills.map((s) => (
              <div key={s.name} className="flex justify-between text-slate-300">
                <span>{s.name} ({s.category})</span>
                <span className="text-emerald-400 font-bold">{s.proficiency}% [{s.level}]</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">PRODUCTION CODEBASES:</div>
            {BIODATA.projects.map((p) => (
              <div key={p.id} className="text-slate-300">
                <span className="text-white font-bold">{p.title}</span> — {p.description}
              </div>
            ))}
          </div>
        );
        break;

      case "telemetry":
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <div>API Latency: <span className="text-cyan-400 font-bold">{BIODATA.telemetry.apiLatency}</span></div>
            <div>System Uptime: <span className="text-emerald-400 font-bold">{BIODATA.telemetry.uptime}</span></div>
            <div>Cache Hit Rate: <span className="text-purple-400 font-bold">{BIODATA.telemetry.cacheHitRate}</span></div>
            <div>Codebase Volume: <span className="text-amber-400 font-bold">{BIODATA.telemetry.linesOfCode}</span></div>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="text-xs space-y-1 text-slate-300">
            <div>EMAIL: <span className="text-cyan-400 font-bold">{BIODATA.email}</span></div>
            <div>GITHUB: <span className="text-cyan-400 font-bold">{BIODATA.github}</span></div>
            <div>LOCATION: <span className="text-slate-200">Indonesia</span></div>
          </div>
        );
        break;

      case "sudo":
        if (args.toLowerCase() === "hire") {
          sounds.playConfirm();
          outputNode = (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-1 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                [200 OK] AUTHORIZATION GRANTED:
              </div>
              <p className="text-slate-200">
                Muhammad Devara siap bergabung untuk membangun backend infrastructure dan scalable full stack systems.
              </p>
              <div className="pt-1 text-xs">
                Direct Email: <a href={`mailto:${BIODATA.email}`} className="underline font-bold text-cyan-400">{BIODATA.email}</a>
              </div>
            </div>
          );
        } else {
          outputNode = <div className="text-rose-400">sudo: permission denied for command: {args}</div>;
        }
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "whoami":
        outputNode = <div className="text-cyan-300">guest@devara.sys [clearance: public_visitor]</div>;
        break;

      case "date":
        outputNode = <div className="text-slate-400">{new Date().toUTCString()}</div>;
        break;

      default:
        outputNode = (
          <div className="text-rose-400 font-mono text-xs">
            command not found: &quot;{trimmed}&quot;. Type <span className="text-cyan-400 font-bold">&quot;help&quot;</span> or <span className="text-purple-400 font-bold">&quot;sudo ai&quot;</span> for Groq AI Chat.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        isAiMode: false,
        output: outputNode,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInput(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-24 relative z-10 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
              <TerminalIcon className="w-4 h-4" />
              <span>COMMAND_TERMINAL // 04</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
              INTERACTIVE_CLI & GROQ AI
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2 md:mt-0 max-w-md">
            Execute direct terminal directives or query the live Groq Cloud AI with &quot;sudo ai&quot;.
          </p>
        </div>

        {/* macOS Terminal Window Frame */}
        <div className="rounded-xl bg-[#0a0e17] border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* macOS Title Bar with Authentic Traffic Light Buttons */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-neutral-800/90 select-none">
            <div className="flex items-center gap-2">
              {/* macOS Traffic Lights: Close, Minimize, Zoom */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 hover:opacity-80 transition-opacity cursor-pointer shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 hover:opacity-80 transition-opacity cursor-pointer shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 hover:opacity-80 transition-opacity cursor-pointer shadow-sm" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-3 font-semibold flex items-center gap-1.5">
                {isAiSession ? (
                  <>
                    <Bot className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    <span className="text-purple-300">devara-ai@groq-cloud:~# llama-3.3-70b</span>
                  </>
                ) : (
                  <span>root@devara-sys:~# bash</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span>TRY:</span>
              <button
                onClick={() => handleCommand("sudo ai")}
                className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white font-bold transition-all hover:scale-105"
              >
                &quot;sudo ai&quot;
              </button>
              <span>or</span>
              <button
                onClick={() => handleCommand("help")}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white font-bold transition-all"
              >
                &quot;help&quot;
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            ref={terminalOutputRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs sm:text-sm h-[340px] overflow-y-auto space-y-3 bg-[#0a0e17] text-slate-100"
          >
            {logs.map((log) => (
              <div key={log.id} className="space-y-1 leading-relaxed">
                <div className="flex items-center gap-2">
                  {log.isAiMode ? (
                    <span className="text-purple-400 font-bold flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      <span>user@groq-ai:~$</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400 font-bold">devara@sys:~$</span>
                  )}
                  <span className="text-white font-bold">{log.command}</span>
                </div>
                <div className="pl-4 text-slate-300">{log.output}</div>
              </div>
            ))}

            {/* Active Command Input Line */}
            <div className="flex items-center gap-2 pt-1">
              {isAiSession ? (
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  <span>user@groq-ai:~$</span>
                </span>
              ) : (
                <span className="text-cyan-400 font-bold">devara@sys:~$</span>
              )}
              <input
                ref={inputRef}
                type="text"
                disabled={isAiLoading}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isAiLoading
                    ? "Groq AI sedang berpikir..."
                    : isAiSession
                    ? "tanyakan ke Groq AI (atau ketik 'exit')..."
                    : "type command (or 'sudo ai')..."
                }
                className="flex-1 bg-transparent text-white font-mono focus:outline-none placeholder:text-slate-600 text-xs sm:text-sm disabled:opacity-50"
              />
              <button
                onClick={() => handleCommand(input)}
                disabled={isAiLoading}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors disabled:opacity-40"
                title="Execute"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
