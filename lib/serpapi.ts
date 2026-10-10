const SERPAPI_BASE_URL = 'https://serpapi.com/search.json';

export interface SerpApiParams {
  engine: string;
  [key: string]: string | number | undefined;
}

export async function serpapiSearch<T = any>(params: SerpApiParams): Promise<T> {
  const apiKey = process.env.SERPAPI_API_KEY;
  
  if (!apiKey) {
    throw new Error('SERPAPI_API_KEY is not set in environment variables');
  }

  const url = new URL(SERPAPI_BASE_URL);
  url.searchParams.set('api_key', apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`SerpApi request failed (${res.status}): ${errorText}`);
  }

  return res.json() as Promise<T>;
}

// Helper for Google Jobs
export async function searchJobs(query: string, location: string = 'Mumbai') {
  return serpapiSearch({
    engine: 'google',
    q: `${query} jobs ${location} site:linkedin.com OR site:naukri.com OR site:indeed.co.in`,
    gl: 'in',
    hl: 'en',
    num: 20,
  });
}
