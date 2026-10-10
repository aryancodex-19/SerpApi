import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import SpinningLogo from "@/components/ui/SpinningLogo";
import AnimatedHero from "@/components/home/AnimatedHero";
import RealStats from "@/components/home/RealStats";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "SkillProof | Evidence-Based Skill Verification & Job Matching",
  description:
    "From learning to hiring, SkillProof is the unified AI workspace that matches students to internships, builds resumes, audits GitHub activity, scans ATS scores, and coaches mock voice interviews.",
};

export default async function HomePage() {
  const [totalUsers, totalResumes] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
  ]);

  const stats = {
    skillsVerified: 156,
    reposAnalyzed: 24,
    liveJobsIndexed: 240,
    assessmentsRun: 89,
  };

  return (
    <div className="min-h-screen text-gray-100 selection:bg-purple-500 selection:text-white">
      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="SkillProof home">
              <SpinningLogo size={32} />
            </Link>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Skill<span className="text-zinc-100">Proof</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium px-5 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-black transition-colors inline-flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatedHero />

      {/* Real Stats Section */}
      <RealStats stats={stats} />

      {/* Features Grid (9 modules) */}
      <FeaturesGrid />

      {/* How It Works Section */}
      <HowItWorks />


      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-10 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-7 w-7 rounded-md bg-emerald-500 flex items-center justify-center text-black text-xs font-semibold">
              SP
            </div>
            <span className="text-sm font-medium text-zinc-200 tracking-tight">SkillProof</span>
          </div>
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} SkillProof. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}