"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function AnimatedHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient backgrounds removed */}

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
        {/* Badge Pill removed */}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white"
        >
          Prove Your Skills. <br />
          <span className="text-zinc-50">
            Not Just Claim Them.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Verify your skills against real GitHub evidence and live job market demand. No more guessing — proof-backed career intelligence.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/sign-up" passHref>
            <AnimatedButton
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-bold px-8 flex items-center gap-2"
            >
              <span className="inline-flex items-center gap-2">
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </AnimatedButton>
          </Link>
          <Link href="/sign-in" passHref>
            <AnimatedButton
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto font-bold px-8 bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-transparent"
            >
              <span>Access Workspace</span>
            </AnimatedButton>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
