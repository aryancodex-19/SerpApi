"use client";

import React from "react";
import { FileText, Award, ShieldCheck, Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface RealStatsCardsProps {
  skillVerificationsCount: number;
  liveJobsScanned: number;
}

export default function RealStatsCards({
  skillVerificationsCount,
  liveJobsScanned,
}: RealStatsCardsProps) {
  const stats = [

    {
      label: "Skill Verifications",
      value: skillVerificationsCount.toString(),
      sublabel: skillVerificationsCount > 0 ? "Evidence checked" : "No verifications yet",
      icon: ShieldCheck,
      glow: "indigo" as const,
    },
    {
      label: "Live Jobs Scanned",
      value: liveJobsScanned.toString(),
      sublabel: liveJobsScanned > 0 ? "Market data active" : "Search to start",
      icon: Search,
      glow: "purple" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <GlassCard
          key={stat.label}
          glowColor={stat.glow}
          className="p-5 flex flex-col justify-between h-full bg-white/[0.03] border-white/10"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <stat.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white bg-gradient-to-b from-white to-gray-200 bg-clip-text">
              {stat.value}
            </p>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">
              {stat.sublabel}
            </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
