"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, GitBranch, GitCommit, Code2, AlertTriangle, Info, ShieldAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PageTransition from "@/components/ui/PageTransition";

interface SkillProofSnapshotProps {
  assessment: any | null;
}

export default function SkillProofSnapshot({ assessment }: SkillProofSnapshotProps) {
  // Safe extraction of metrics
  const totalSkills = assessment?.metrics?.totalClaimedSkills || 0;
  const coverage = assessment?.metrics?.evidenceCoveragePercentage || 0;
  
  const skills = assessment?.skills || [];
  const provenSkills = skills.filter((s: any) => s.classification === "PROVEN").slice(0, 3);
  const gaps = skills.filter((s: any) => s.classification === "PARTIAL" || s.classification === "CLAIMED-ONLY").slice(0, 3);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-indigo-950/60 via-violet-950/30 to-slate-950/40 p-6 text-white shadow-xl backdrop-blur-md">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shrink-0">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-200">
                <ShieldCheck className="w-3 h-3" /> Powered by Evidence Verification
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
                SkillProof Snapshot
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Your verified skill profile at a glance
              </p>
            </div>
          </div>
        </div>

        {!assessment ? (
          <GlassCard className="p-10 flex flex-col items-center justify-center text-center border-white/10 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20">
              <ShieldAlert className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">No skill snapshot yet</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-md">
              Run your first assessment to analyze your resume claims against your public GitHub evidence and see your verified skill profile.
            </p>
            <Link 
              href="/dashboard/assessment"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20"
            >
              Start Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <GlassCard className="p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-950/20 to-white/[0.01] flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-2">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Verified Evidence Score</h2>
                <div className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {coverage}%
                </div>
                <p className="text-sm text-slate-300">
                  Based on <span className="font-bold text-white">{totalSkills}</span> skills analyzed against GitHub evidence.
                </p>
              </div>
              <div className="flex-1 w-full relative pt-2">
                <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: `${coverage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Needs Evidence</span>
                  <span>Fully Verified</span>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Proven Skills */}
              <GlassCard className="p-6 border-emerald-500/20 bg-emerald-950/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Top Proven Skills
                </h3>
                
                {provenSkills.length > 0 ? (
                  <div className="space-y-3">
                    {provenSkills.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <Code2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-bold text-white">{s.skill}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                          <GitCommit className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] font-bold text-emerald-300">{s.evidenceCount || 1} sources</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400 p-4 text-center rounded-lg border border-dashed border-white/10">
                    Run an assessment to see your proven skills
                  </div>
                )}
              </GlassCard>

              {/* Skills Needing Evidence */}
              <GlassCard className="p-6 border-amber-500/20 bg-amber-950/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-amber-400" />
                  Skills Needing Evidence
                </h3>
                
                {gaps.length > 0 ? (
                  <div className="space-y-3">
                    {gaps.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-sm font-bold text-white">{s.skill}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                          s.classification === "PARTIAL" 
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/20" 
                            : "bg-slate-500/10 text-slate-300 border-slate-500/20"
                        }`}>
                          {s.classification}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400 p-4 text-center rounded-lg border border-dashed border-white/10 flex flex-col items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500/50" />
                    No gaps found
                  </div>
                )}
              </GlassCard>
            </div>

            <div className="flex justify-center pt-4">
              <Link 
                href="/dashboard/assessment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10"
              >
                Run Full Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
