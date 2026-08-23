"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ExternalLink,
  FolderGit2,
  Star,
  GitFork,
  RefreshCw,
  Search,
  ArrowUpRight,
  Code2,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GithubRepo {
  id: string;
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  githubUrl: string;
  liveUrl: string;
  hasLiveDemo: boolean;
  updatedAt: string;
  tags: string[];
}

const ITEMS_PER_PAGE = 6;

export function ProjectsSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchGithubRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/github");
      const data = await res.json();
      if (data.repos && Array.isArray(data.repos)) {
        setRepos(data.repos);
      }
    } catch {
      // Fallback
      const fallbackRepos: GithubRepo[] = BIODATA.projects.map((p) => ({
        id: p.id,
        name: p.title.toLowerCase().replace(/ /g, "-"),
        title: p.title,
        description: p.description,
        language: p.tags[0] || "TypeScript",
        stars: 1,
        forks: 0,
        githubUrl: p.githubUrl || BIODATA.github,
        liveUrl: p.liveUrl || "#",
        hasLiveDemo: Boolean(p.liveUrl && p.liveUrl !== "#"),
        updatedAt: "2026",
        tags: p.tags,
      }));
      setRepos(fallbackRepos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  // Extract unique languages for filter tabs
  const languages = ["ALL", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  // Filtered repositories list
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesLanguage = selectedLanguage === "ALL" || repo.language === selectedLanguage;
      const matchesSearch =
        repo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLanguage && matchesSearch;
    });
  }, [repos, selectedLanguage, searchQuery]);

  // Reset page to 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLanguage, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRepos = filteredRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    sounds.playClick();
    setCurrentPage(page);
    // Smooth scroll to projects section header
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
              <FolderGit2 className="w-4 h-4" />
              <span>LIVE_GITHUB_SYNC // 03</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              <span>PROJECTS_&_REPOSITORIES</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {repos.length} TOTAL REPOS
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <button
              onClick={() => {
                sounds.playClick();
                fetchGithubRepos();
              }}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Sync latest repos from GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              <span>SYNC_GITHUB</span>
            </button>

            <a
              href={BIODATA.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline"
            >
              <span>[ GITHUB_PROFILE ]</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Language Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  sounds.playClick();
                  setSelectedLanguage(lang);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLanguage === lang
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.25)] scale-105"
                    : "bg-neutral-900/80 hover:bg-neutral-800 text-slate-300 border border-neutral-800"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-400 text-slate-200 text-xs font-mono placeholder:text-neutral-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-56 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 animate-pulse p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-1/3 h-4 bg-neutral-800 rounded" />
                  <div className="w-3/4 h-5 bg-neutral-800 rounded" />
                  <div className="w-full h-12 bg-neutral-900 rounded" />
                </div>
                <div className="w-full h-8 bg-neutral-900 rounded" />
              </div>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 font-mono text-sm border border-neutral-800 rounded-2xl bg-neutral-950/50">
            No repositories found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          /* Projects Bento Grid (6 per page) */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentRepos.map((repo) => (
                <div
                  key={repo.id}
                  onMouseEnter={() => sounds.playHover()}
                  className="group rounded-2xl bg-[#0a0a0c]/90 border border-neutral-800 hover:border-cyan-500/50 hover:shadow-[0_15px_35px_rgba(0,242,254,0.1)] p-5.5 flex flex-col justify-between transition-all backdrop-blur-xl"
                >
                  <div className="space-y-3">
                    {/* Top Bar: Language Badge & GitHub Stats */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-semibold text-cyan-400">
                        <Code2 className="w-3 h-3 text-cyan-400" />
                        <span>{repo.language}</span>
                      </span>

                      <div className="flex items-center gap-2.5 text-neutral-400 text-[11px] font-mono">
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{repo.stars}</span>
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            <span>{repo.forks}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-neutral-500 text-[10px]">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{repo.updatedAt}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-mono font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <span>{repo.title}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {repo.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Bottom */}
                  <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between gap-2.5">
                    {repo.hasLiveDemo ? (
                      <a
                        href={repo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playConfirm()}
                        className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,242,254,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>VISIT_LIVE_APP</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-slate-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>VIEW_REPOSITORY</span>
                      </a>
                    )}

                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      title="View Source on GitHub"
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors flex items-center justify-center"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Modern Pagination Bar */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-neutral-900 font-mono text-xs">
                <span className="text-neutral-500">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredRepos.length)} of {filteredRepos.length} repositories
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:bg-neutral-900 disabled:hover:text-neutral-400 transition-colors flex items-center gap-1"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px]">PREV</span>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.3)] scale-105"
                          : "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:bg-neutral-900 disabled:hover:text-neutral-400 transition-colors flex items-center gap-1"
                    title="Next Page"
                  >
                    <span className="hidden sm:inline text-[11px]">NEXT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
