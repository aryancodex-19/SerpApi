"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function CTA() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow effects removed */}

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="p-10 sm:p-16 text-center space-y-6 border border-zinc-800 rounded-lg bg-zinc-900 relative overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider mx-auto">
              <span>Instant Access</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Ready to Accelerate Your <br />
              <span className="text-zinc-50">
                Career Journey?
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Join students and recent graduates already using SkillProof to build, verify, and optimize their path to getting hired.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up" passHref>
                <button className="w-full sm:w-auto font-medium px-6 py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-black border-none transition-colors flex items-center justify-center">
                  <span>Get Started for Free</span>
                </button>
              </Link>
              <Link href="/sign-in" passHref>
                <button className="w-full sm:w-auto font-medium px-6 py-3 rounded-md bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white transition-colors flex items-center justify-center">
                  <span>Sign In</span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
