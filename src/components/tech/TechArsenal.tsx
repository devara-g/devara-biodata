"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import {
  Cpu,
  Search,
  Zap,
} from "lucide-react";

// Official Tech Icon Resolver
function TechBrandIcon({ name, icon }: { name: string; icon?: string }) {
  const n = name.toLowerCase();

  let iconFile = "node.svg";
  if (n.includes("laravel") || n.includes("php")) iconFile = "laravel.svg";
  else if (n.includes("postgres")) iconFile = "postgresql.svg";
  else if (n.includes("mysql") || n.includes("sql")) iconFile = "mysql.svg";
  else if (n.includes("docker")) iconFile = "docker.svg";
  else if (n.includes("typescript")) iconFile = "typescript.svg";
  else if (n.includes("javascript")) iconFile = "javascript.svg";
  else if (n.includes("next")) iconFile = "nextjs.svg";
  else if (n.includes("react")) iconFile = "react.svg";
  else if (n.includes("redis")) iconFile = "redis.svg";
  else if (n.includes("tailwind")) iconFile = "tailwind.svg";
  else if (n.includes("git")) iconFile = "git.svg";
  else if (n.includes("graphql") || n.includes("api")) iconFile = "graphql.svg";
  else if (icon) iconFile = `${icon}.svg`;

  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <Image
        src={`/assets/icons/${iconFile}`}
        alt={name}
        width={28}
        height={28}
        className="w-7 h-7 object-contain filter drop-shadow"
      />
    </div>
  );
}

export function TechArsenal() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const categories = [
    "ALL",
    "Backend",
    "Database",
    "Frontend",
    "DevOps & Tools",
  ];

  const filteredSkills = BIODATA.skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === "ALL" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const marqueeItems = [
    { name: "NODE.JS", icon: "node.svg" },
    { name: "PHP LARAVEL", icon: "laravel.svg" },
    { name: "MYSQL", icon: "mysql.svg" },
    { name: "POSTGRESQL", icon: "postgresql.svg" },
    { name: "DOCKER", icon: "docker.svg" },
    { name: "REDIS", icon: "redis.svg" },
    { name: "NEXT.JS 15", icon: "nextjs.svg" },
    { name: "TYPESCRIPT", icon: "typescript.svg" },
    { name: "GRAPHQL & REST", icon: "graphql.svg" },
    { name: "TAILWIND CSS", icon: "tailwind.svg" },
    { name: "GIT & CI/CD", icon: "git.svg" },
  ];

  return (
    <section id="stack" className="py-24 relative z-10 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
              <Cpu className="w-4 h-4" />
              <span>TECH_ARSENAL // 02</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              <span>LOADED_MODULES</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                10 OFFICIAL ENGINES
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2 md:mt-0 max-w-md">
            Production-grade technology stack, database engines, and runtime infrastructure.
          </p>
        </div>

        {/* High-Tech Marquee Ticker with Official Logos */}
        <div className="relative w-full overflow-hidden py-3 mb-8 bg-[#09090b]/80 border-y border-neutral-900 backdrop-blur-md">
          <div className="flex w-max gap-8 animate-marquee font-mono text-xs text-neutral-300 font-semibold tracking-wider items-center">
            {marqueeItems.concat(marqueeItems).map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <Image
                  src={`/assets/icons/${tech.icon}`}
                  alt={tech.name}
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain shrink-0"
                />
                <span className="text-white font-bold">{tech.name}</span>
                <span className="text-neutral-700 ml-2">//</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.25)] scale-105"
                    : "bg-neutral-900/80 hover:bg-neutral-800 text-slate-300 border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-400 text-slate-200 text-xs font-mono placeholder:text-neutral-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Masterclass Tech Grid with Official High-Definition Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((tech) => {
            const isHovered = activeSkill === tech.name;

            return (
              <div
                key={tech.name}
                onMouseEnter={() => {
                  sounds.playHover();
                  setActiveSkill(tech.name);
                }}
                onMouseLeave={() => setActiveSkill(null)}
                className={`p-5 rounded-2xl bg-[#0a0a0c]/90 border transition-all duration-200 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group ${
                  isHovered
                    ? "border-cyan-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_15px_rgba(0,242,254,0.12)] scale-[1.01]"
                    : "border-neutral-800 hover:border-neutral-700 shadow-lg"
                }`}
              >
                {/* Subtle Ambient Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  {/* Top Bar: Official Tech Vector Logo, Name, and Level Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center shadow-inner group-hover:border-cyan-500/40 transition-colors p-2.5">
                        <TechBrandIcon name={tech.name} icon={tech.icon} />
                      </div>
                      <div>
                        <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {tech.name}
                        </h3>
                        <span className="text-[10.5px] font-mono text-cyan-400 font-semibold flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{tech.category}</span>
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {tech.level}
                    </span>
                  </div>

                  {/* Architecture Description */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Spec Matrix */}
                <div className="pt-4 mt-4 border-t border-neutral-900/90 space-y-2">
                  <div className="flex items-center justify-between text-[10.5px] font-mono">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>PROFICIENCY</span>
                    </span>
                    <span className="text-cyan-400 font-bold">
                      {tech.proficiency}%
                    </span>
                  </div>

                  {/* Segmented High-Tech Progress Meter */}
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 flex gap-0.5 p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,242,254,0.3)]"
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[8.5px] font-mono text-neutral-500 pt-0.5">
                    <span>STATUS</span>
                    <span className="text-emerald-400 font-semibold">PRODUCTION_READY</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
