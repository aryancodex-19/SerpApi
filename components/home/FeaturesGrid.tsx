"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  BadgeCheck,
  TrendingUp,
  Briefcase
} from "lucide-react";

const MODULES = [
  {
    icon: ShieldCheck,
    title: "Skill Assessment",
    description: "Cross-verify every resume skill against real GitHub evidence. Get PROVEN, PARTIAL, or CLAIMED verdicts with clickable evidence links.",
  },
  {
    icon: Code2,
    title: "GitHub Analysis",
    description: "Deep profile scan — commit frequency, language composition, test coverage, and documentation quality metrics.",
  },
  {
    icon: BadgeCheck,
    title: "SkillProof",
    description: "One-shot verification: upload resume, connect GitHub, get a complete evidence-backed skill profile in seconds.",
  },
  {
    icon: TrendingUp,
    title: "Gap Report",
    description: "Market-aware gap analysis. See exactly which missing skills live jobs are demanding — powered by SerpApi.",
  },
  {
    icon: Briefcase,
    title: "Live Job Market",
    description: "Real-time job listings from LinkedIn, Naukri, and Indeed — filtered by role and location via SerpApi Google Search.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything You Need for{" "}
            <span className="text-zinc-50">
              Proof-Backed Hiring
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Five core tools. One unified workflow: Claim &rarr; Verify &rarr; Match &rarr; Act.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((module, i) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div
                className="p-8 flex flex-col justify-between h-64 group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center p-3 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:scale-110 transition-all duration-300">
                    <module.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {module.description}
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
