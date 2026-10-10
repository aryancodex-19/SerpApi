import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import JobMarketClient from "@/components/job-market/JobMarketClient";

export const metadata = {
  title: "Live Job Market | SkillProof",
  description: "Real-time job listings powered by SerpApi",
};

export default async function JobMarketPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return <JobMarketClient targetRole={dbUser?.targetRole} />;
}
