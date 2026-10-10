import { NextResponse } from 'next/server';
import { searchJobs } from '@/lib/serpapi';

export async function GET() {
  try {
    const data = await searchJobs('frontend developer', 'Mumbai');
    const results = (data as any).organic_results || [];
    
    return NextResponse.json({
      success: true,
      total: results.length,
      sample: results.slice(0, 3).map((r: any) => ({
        title: r.title,
        link: r.link,
        snippet: r.snippet,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}