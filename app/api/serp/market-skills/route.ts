import { NextResponse } from 'next/server';
import { searchJobs } from '@/lib/serpapi';
import { routeAI } from '@/lib/ai/router';

export async function POST(req: Request) {
  try {
    const { role, location } = await req.json();
    if (!role) {
      return NextResponse.json({ success: false, error: 'Role required' }, { status: 400 });
    }

    const data = await searchJobs(role, location || 'Mumbai');
    const results = (data as any).organic_results || [];

    const jobs = results.slice(0, 10).map((r: any) => ({
      title: r.title,
      link: r.link,
      snippet: r.snippet,
      source: r.displayed_link || r.source || 'Google',
    }));

    let extractedSkills: string[] = [];
    if (jobs.length > 0) {
      const snippets = jobs.map((j: any) => j.snippet).join('\n');
      const aiResponse: any = await routeAI("market_skills", snippets);
      try {
        const jsonStr = aiResponse.response.text();
        const parsed = JSON.parse(jsonStr);
        if (parsed && Array.isArray(parsed.skills)) {
          extractedSkills = parsed.skills;
        }
      } catch (e) {
        console.error("Failed to parse skills JSON", e);
      }
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      jobs,
      skills: extractedSkills
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
