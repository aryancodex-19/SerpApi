"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Briefcase, ArrowRight, ExternalLink, RefreshCw, AlertTriangle, ChevronLeft } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PageTransition from "@/components/ui/PageTransition";

interface JobMarketClientProps {
  targetRole?: string | null;
}

export default function JobMarketClient({ targetRole }: JobMarketClientProps) {
  const [role, setRole] = useState(targetRole || "");
  const [location, setLocation] = useState("Mumbai");
  const [isFetching, setIsFetching] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!role.trim()) return;
    setIsFetching(true);
    setError(null);
    setHasSearched(false);
    try {
      const res = await fetch("/api/serp/market-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, location }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setJobs(data.jobs || []);
      setHasSearched(true);
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-950/60 via-indigo-950/30 to-violet-950/20 p-7 text-white shadow-2xl backdrop-blur-md">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-500/8 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shrink-0">
              <Briefcase className="w-8 h-8 text-emerald-400" />
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                Powered by SerpApi &bull; Google Search
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Live Job Market
              </h1>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                Real-time job listings aggregated from the open web, tailored to your target role and location.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <GlassCard className="p-6 border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex items-end shrink-0 w-full sm:w-auto">
              <button
                onClick={handleSearch}
                disabled={isFetching || !role.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                {isFetching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search Jobs
                  </>
                )}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-semibold">An error occurred while fetching jobs</p>
              <p className="text-xs text-red-300/80 mt-1">{error}</p>
              <button 
                onClick={handleSearch}
                className="mt-3 text-xs font-bold px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-4">
                <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-4/6 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="pt-3 border-t border-white/5 flex justify-between">
                  <div className="h-5 w-20 bg-white/5 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!isFetching && hasSearched && !error && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-400" />
                Live Job Postings
              </h3>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-500" />
                </div>
                <h4 className="text-base font-bold text-white">No jobs found</h4>
                <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">
                  We couldn't find any recent job postings for "{role}" in "{location}". Try broadening your search.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.map((job, idx) => (
                    <GlassCard key={idx} className="p-5 border-white/5 flex flex-col h-full bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <h4 className="text-base font-bold text-white line-clamp-2 leading-tight">
                        {job.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-3 mt-3 flex-1 leading-relaxed">
                        {job.snippet}
                      </p>
                      <div className="pt-4 mt-4 flex items-center justify-between border-t border-white/10 shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-400/10 border border-emerald-400/20 truncate max-w-[120px]">
                          {job.source}
                        </span>
                        <a 
                          href={job.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          View Job Board <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </GlassCard>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2">
                  <p className="text-sm text-gray-400">
                    Found <span className="font-bold text-white">{jobs.length}</span> live job sources
                  </p>
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
