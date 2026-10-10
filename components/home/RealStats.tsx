"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Code2, Briefcase, Activity } from "lucide-react";

interface RealStatsProps {
  stats: {
    skillsVerified: number;
    reposAnalyzed: number;
    liveJobsIndexed: number;
    assessmentsRun: number;
  };
}

export default function RealStats({ stats }: RealStatsProps) {
  const cards = [
    {
      label: "SKILLS VERIFIED",
      value: stats.skillsVerified.toLocaleString(),
      description: "Proven against GitHub evidence",
      icon: ShieldCheck,
      glow: "purple" as const,
    },
    {
      label: "GITHUB REPOS ANALYZED",
      value: stats.reposAnalyzed.toLocaleString(),
      description: "Codebases inspected securely",
      icon: Code2,
      glow: "violet" as const,
    },
    {
      label: "LIVE JOBS INDEXED",
      value: stats.liveJobsIndexed.toLocaleString(),
      description: "Real-time from SerpApi",
      icon: Briefcase,
      glow: "indigo" as const,
    },
    {
      label: "ASSESSMENTS RUN",
      value: stats.assessmentsRun.toLocaleString(),
      description: "Deep verification scans",
      icon: Activity,
      glow: "purple" as const,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Built on Real Evidence,{" "}
            <span className="text-zinc-50">
              Powered by Live Data
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Aggregate activity across SkillProof. Every number is backed by real verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="p-6 flex flex-col justify-between h-52 group bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {card.label}
                  </span>
                  <div className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:scale-110 transition-transform">
                    <card.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl font-extrabold text-white tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
