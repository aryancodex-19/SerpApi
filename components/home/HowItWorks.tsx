"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link as LinkIcon, Search, AlertCircle, Briefcase } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Connect & Verify",
    description: "Connect your GitHub profile and upload your resume. We extract every claimed skill automatically.",
    icon: LinkIcon,
  },
  {
    step: "02",
    title: "Evidence Discovery",
    description: "GitHub repos, commits, tests, and documentation are inspected to find real evidence for each claim.",
    icon: Search,
  },
  {
    step: "03",
    title: "Verdict & Gap Analysis",
    description: "Each skill gets PROVEN, PARTIAL, or CLAIMED. Gap Report shows what live jobs are actually demanding.",
    icon: AlertCircle,
  },
  {
    step: "04",
    title: "Match with Live Jobs",
    description: "See real job listings that match your verified skills — fetched live from the market via SerpApi.",
    icon: Briefcase,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            From Claim to Proof in{" "}
            <span className="text-zinc-50">
              Four Steps
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            A structured workflow built on real evidence — not assumptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative z-10"
            >
              <div
                className="p-8 flex flex-col justify-between h-72 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-4xl font-black text-zinc-700">
                      {item.step}
                    </span>
                  </div>

                  {/* Step Body */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="h-1 w-12 rounded-full bg-zinc-600 mt-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
