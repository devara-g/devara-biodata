"use client";

import React, { useState, useEffect } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  Send,
  Mail,
  Copy,
  Check,
  Radio,
  Clock,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function UplinkContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project Collaboration",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  // Live WIB clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WIB"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const subjectOptions = [
    "Project Collaboration",
    "Full-Time Role / Hiring",
    "Backend Architecture Consulting",
    "General Inquiry",
  ];

  const copyToClipboard = (text: string, field: string) => {
    sounds.playConfirm();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      sounds.playConfirm();
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "Project Collaboration", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>ESTABLISH_UPLINK // 05</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              <span>TRANSMIT_SIGNAL</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                DIRECT CHANNELS
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2 md:mt-0 max-w-md">
            Signal strength 100%. Open for backend architectures, high-load systems, & full stack engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Direct Communication Hub (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0a0a0c]/90 border border-neutral-800 hover:border-cyan-500/40 hover:shadow-[0_15px_35px_rgba(0,242,254,0.08)] transition-all backdrop-blur-xl space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold text-white tracking-wider">
                    DIRECT_COMMUNICATION_CHANNELS
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                  ACTIVE
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Kirim pesan langsung melalui kanal komunikasi resmi atau gunakan formulir transmisi terenkripsi di samping.
              </p>

              {/* Communication Cards */}
              <div className="space-y-3 pt-1">
                {/* Email Card */}
                <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-cyan-500/40 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400 shadow-inner group-hover:border-cyan-500/40 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9.5px] font-mono text-neutral-500 block">
                        PRIMARY_EMAIL
                      </span>
                      <a
                        href={`mailto:${BIODATA.email}`}
                        className="text-xs font-mono font-bold text-white hover:text-cyan-300 transition-colors"
                      >
                        {BIODATA.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(BIODATA.email, "email")}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                    title="Copy Email Address"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* GitHub Card */}
                <a
                  href={BIODATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-neutral-700 hover:bg-[#0c0c10] transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-300 shadow-inner group-hover:text-white transition-colors">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9.5px] font-mono text-neutral-500 block">
                        CODE_REPOSITORY
                      </span>
                      <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                        github.com/devara-g
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* LinkedIn Card */}
                <a
                  href={BIODATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-850 hover:border-neutral-700 hover:bg-[#0c0c10] transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shadow-inner group-hover:text-blue-300 transition-colors">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9.5px] font-mono text-neutral-500 block">
                        PROFESSIONAL_NETWORK
                      </span>
                      <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                        linkedin.com/in/devara
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>

              {/* Real-time Timezone / Availability Box */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-850 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LOCAL TIME:</span>
                </div>
                <span className="text-white font-bold">{currentTimeStr || "WIB (UTC+7)"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Transmission Console (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0a0a0c]/90 border border-neutral-800 hover:border-cyan-500/40 hover:shadow-[0_15px_35px_rgba(0,242,254,0.08)] transition-all backdrop-blur-xl">
              {/* Form Top Title Bar */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3.5 mb-5">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    ENCRYPTED_MESSAGE_UPLINK
                  </span>
                </div>
                <span className="text-[9px] font-mono text-neutral-500">
                  SECURE PROTOCOL: TLS 1.3
                </span>
              </div>

              {isSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-3.5 animate-fade-in">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>TRANSMISSION_DELIVERED [200 OK]</span>
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 max-w-md leading-relaxed">
                    Transmisi Anda telah diterima dengan aman. Devara akan meninjau dan merespon kembali secepatnya.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 mt-3 transition-colors"
                  >
                    [ TRANSMIT_ANOTHER_MESSAGE ]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Topic / Subject Chips */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-neutral-400 font-semibold block">
                      TRANSMISSION_PURPOSE / SUBJECT
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subjectOptions.map((subj) => (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            setFormData({ ...formData, subject: subj });
                          }}
                          className={`px-3 py-1 rounded-lg text-[10.5px] font-mono transition-all ${
                            formData.subject === subj
                              ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                              : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                          }`}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email 2-col Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 font-semibold block">
                        IDENTIFIER / YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nama atau Organisasi"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-400 text-slate-100 text-xs font-mono placeholder:text-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 font-semibold block">
                        RETURN_ENDPOINT / EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@perusahaan.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-400 text-slate-100 text-xs font-mono placeholder:text-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-mono text-neutral-400 font-semibold">
                        TRANSMISSION_PAYLOAD / MESSAGE
                      </label>
                      <span className="text-[9.5px] font-mono text-neutral-600">
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Jelaskan kebutuhan arsitektur backend, proyek kolaborasi, atau peluang kerja sama..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-400 text-slate-100 text-xs font-mono placeholder:text-neutral-600 focus:outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.25)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">TRANSMITTING ENCRYPTED PAYLOAD...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT_SIGNAL // KIRIM PESAN</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
