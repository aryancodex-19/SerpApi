import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getOrCreateCurrentUser } from "@/lib/auth/syncUser";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import RealStatsCards from "@/components/dashboard/RealStatsCards";
import PageTransition from "@/components/ui/PageTransition";
import GlassCard from "@/components/ui/GlassCard";
import { Clock, Sparkles } from "lucide-react";

const ModuleCard = dynamic(() => import("@/components/dashboard/ModuleCard"), {
  loading: () => <LoadingSkeleton variant="card" />,
});

const MODULES = [
  {
    title: "Evidence-Based Skill Assessment",
    description: "Evaluate resume claims backed by verifiable public GitHub code artifacts against target job roles.",
    status: "active" as const,
    iconName: "ShieldCheck",
    href: "/dashboard/assessment",
  },



  {
    title: "GitHub Deep Analysis",
    description: "Analyze your GitHub profile for coding activity, language diversity, project quality, and documentation.",
    status: "active" as const,
    iconName: "GitGraph",
    href: "/dashboard/github",
  },
  {
    title: "SkillProof",
    description: "Verify resume claims against public GitHub evidence and compare them to real job requirements.",
    status: "active" as const,
    iconName: "ShieldCheck",
    href: "/dashboard/skillproof",
  },
  {
    title: "Gap Report",
    description: "Identify skill gaps and analyze missing competencies required for your target role.",
    status: "active" as const,
    iconName: "TrendingUp",
    href: "/dashboard/gap-report",
  },
  {
    title: "Live Job Market",
    description: "Search and analyze real-time job listings tailored to your verified skills.",
    status: "active" as const,
    iconName: "Briefcase",
    href: "/dashboard/job-market",
  },
];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const dbUser = await getOrCreateCurrentUser();

  const db = prisma as any;

  const displayName = dbUser?.name || "Student";
  const targetRole = dbUser?.targetRole;

  // Real data calculations (fetched concurrently in a single round-trip batch)
  const gitHubAnalysisRecord = dbUser
      ? await db.gitHubAnalysis.findUnique({ where: { userId: dbUser.id } })
      : null;

  const skillVerificationsCount = gitHubAnalysisRecord ? 1 : 0;
  const liveJobsScanned = 0;

  const githubScore = gitHubAnalysisRecord?.overallScore;

  // Get module badge based on real data
  const getModuleBadge = (title: string) => {
    if (title === "Evidence-Based Skill Assessment") {
      const assessmentData = gitHubAnalysisRecord?.analysisData as any;
      const coverage = assessmentData?.latestAssessment?.metrics?.evidenceCoveragePercentage;
      return coverage !== undefined && coverage !== null ? `${coverage}% Evidenced` : "Run Audit";
    }


    if (title === "GitHub Deep Analysis") return githubScore !== null && githubScore !== undefined ? `Score: ${githubScore}/100` : "Audit Profile";
    if (title === "SkillProof") return dbUser?.githubUrl ? "Evidence Ready" : "Verify Skills";
    return undefined;
  };

  // Compile real activity feed
  const activities: Array<{
    type: string;
    title: string;
    description: string;
    timestamp: Date;
    glow: "purple" | "violet" | "indigo";
  }> = [];

  if (dbUser) {
    const latestGitHub = await db.gitHubAnalysis.findMany({
        where: { userId: dbUser.id },
        orderBy: { updatedAt: "desc" },
        take: 1,
    });






    latestGitHub.forEach((g: any) => {
      activities.push({
        type: "GitHub Analysis",
        title: `GitHub profile audit`,
        description: `Overall score: ${g.overallScore}/100`,
        timestamp: g.updatedAt,
        glow: "indigo",
      });
    });

    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  return (
    <PageTransition staggerChildren={true}>
      <div className="space-y-10 max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <WelcomeBanner displayName={displayName} targetRole={targetRole} />

        {/* Real Stats cards */}
        <RealStatsCards
          skillVerificationsCount={skillVerificationsCount}
          liveJobsScanned={liveJobsScanned}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Cards Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Workspace Hub</span>
                <Sparkles className="h-4 w-4 text-purple-400" />
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Access SkillProof AI instruments optimized to support your career progression.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MODULES.map((module, index) => (
                <ModuleCard
                  key={module.title}
                  title={module.title}
                  description={module.description}
                  status={module.status}
                  iconName={module.iconName}
                  href={module.href}
                  badge={getModuleBadge(module.title)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Recent Activity</span>
                <Clock className="h-4 w-4 text-purple-400" />
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Audit history log of actions completed in SkillProof.
              </p>
            </div>

            <GlassCard hoverEffect={false} className="p-6 space-y-6 bg-white/[0.02] border-white/10 h-[560px] overflow-y-auto">
              {activities.length > 0 ? (
                <div className="relative border-l border-white/10 pl-4 ml-2 space-y-6">
                  {activities.slice(0, 7).map((activity, idx) => {
                    const glowColors = {
                      purple: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
                      violet: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]",
                      indigo: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
                    };
                    return (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ${glowColors[activity.glow]} group-hover:scale-125 transition-transform`} />
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(activity.timestamp).toLocaleDateString()}</span>
                            <span>&bull;</span>
                            <span className="font-bold text-purple-400">{activity.type}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white">
                            {activity.title}
                          </h4>
                          <p className="text-[11px] text-gray-400">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-20">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">No activity yet</h4>
                  <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
                    Start optimizing resumes or practicing interviews to see your logs appear here.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}