# SkillProof

> **Prove Your Skills. Not Just Claim Them.**

Evidence-based skill verification + live job market intelligence, powered by **SerpApi**.

**Built for SerpApi India Hackathon 2026 — Open Innovation Track**

---

## 🎯 What It Does

SkillProof verifies resume skills against **real GitHub evidence** and **live job market data**. Instead of trusting claims, it shows proof — and tells you exactly what the market is demanding right now.

**Flow:** `Claim → Verify → Match → Act`

---

## ✨ Features (5 Core)

### 1. 🛡️ Skill Assessment
Deep evidence verification. Extracts skills from your resume, inspects your GitHub repositories (commits, tests, CI workflows, documentation), and assigns each skill a verdict:
- **PROVEN** — Strong evidence found
- **PARTIAL** — Some evidence present
- **CLAIMED-ONLY** — No public evidence

Every verdict comes with clickable evidence links so users can inspect the proof.

### 2. 🔍 GitHub Analysis
Full GitHub profile scan — commit frequency, language composition, repository complexity, documentation quality, and test coverage metrics.

### 3. ✅ SkillProof
One-shot verification dashboard. Upload your resume PDF, connect your GitHub username, and get a complete evidence-backed skill profile in seconds.

### 4. 📊 Gap Report
Market-aware skill gap analysis. Compares your verified skills against **live job demand** and shows which missing skills are actively being requested by employers — with green/red badges indicating market demand.

### 5. 💼 Live Job Market
Real-time job listings fetched live from LinkedIn, Naukri, and Indeed — filtered by role and location. Powered by SerpApi's Google Search engine.

---

## 🔌 SerpApi Integration (Why It's Core)

SerpApi powers the **live market intelligence layer** of SkillProof. Without it, the platform would only see past evidence (GitHub). With it, we see the live present (job market demand).

| Feature | SerpApi Engine | Usage |
|---------|---------------|-------|
| **Live Job Market** | `google` | Fetch real-time job listings via `site:linkedin.com OR site:naukri.com OR site:indeed.co.in` |
| **Gap Report** | `google` | Extract market-demanded skills from live job snippets |

**Implementation:** `lib/serpapi.ts`

```typescript
export async function searchJobs(query: string, location: string = 'Mumbai') {
  return serpapiSearch({
    engine: 'google',
    q: `${query} jobs ${location} site:linkedin.com OR site:naukri.com OR site:indeed.co.in`,
    gl: 'in',
    hl: 'en',
    num: 20,
  });
}
```

**Optimizations:**
- ✅ Server-side API calls only (key never exposed to client)
- ✅ Response caching via `revalidate: 3600` (1-hour cache, preserves free-tier quota)
- ✅ Graceful fallback if SerpApi is unavailable
- ✅ Query batching to avoid duplicate requests

---

## 🏗️ Architecture

<img width="1175" height="1339" alt="Workflow - SerpApi" src="https://github.com/user-attachments/assets/74078aa6-00bb-4209-9fe4-5852b1b3fc8f" />

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **Auth** | Clerk |
| **AI** | Groq (`openai/gpt-oss-120b`), Gemini (`gemini-3.8-flash`) |
| **Search** | **SerpApi** (Google Search API) |
| **Evidence** | GitHub REST API |
| **Deployment** | Vercel |

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/aryancodex-19/SerpApi.git
cd SerpApi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# SerpApi (required — get free key from https://serpapi.com)
SERPAPI_API_KEY=your_serpapi_key_here

# Database
DATABASE_URL=file:./dev.db

# AI Providers
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
npm start
```

---

## 🔐 Authentication

SkillProof uses **Clerk** for authentication.

- Sign-in / Sign-up routes: `/sign-in`, `/sign-up`
- Protected routes: everything under `/dashboard`
- After successful auth: users are redirected to `/dashboard`
- Session management is handled by Clerk middleware (`middleware.ts` / `proxy.ts`)

---

## 📸 Demo

**Video:** [Add your 3-minute demo link here]

---

## 🎬 Demo Flow (3 minutes)

1. **Problem** — Resumes claim skills but provide no proof
2. **Skill Assessment** — GitHub-verified skill verdicts (PROVEN/PARTIAL/CLAIMED)
3. **SkillProof** — One-shot verification dashboard
4. **Gap Report** — Market-aware gap analysis with live demand badges
5. **Live Job Market** — Real-time job listings via SerpApi ⭐
6. **Closing** — Claim → Verify → Match → Act

---

## 📁 Project Structure

```
app/
├── dashboard/
│   ├── page.tsx              # Dashboard overview
│   ├── assessment/           # Skill Assessment (deep verification)
│   ├── github/               # GitHub Analysis
│   ├── skillproof/           # SkillProof (upload-based)
│   ├── gap-report/           # Market-aware gap analysis
│   └── job-market/           # Live Job Market (SerpApi)
├── api/
│   ├── assessment/           # Skill verdict endpoints
│   ├── github/               # GitHub evidence fetching
│   ├── skillproof/           # Verification logic
│   ├── gap-report/           # Gap analysis
│   └── serp/                 # SerpApi endpoints
├── sign-in/                  # Clerk auth
└── sign-up/

lib/
└── serpapi.ts                # SerpApi client (cached)

components/
├── assessment/               # Skill Assessment UI
├── skillproof/               # SkillProof UI
├── gap-report/               # Gap Report UI
├── job-market/               # Live Job Market UI
├── github/                   # GitHub Analysis UI
└── dashboard/                # Sidebar, stats, layout

prisma/
└── schema.prisma             # Database schema
```

---

## 🔒 Security

- SerpApi key stored server-side only (`.env.local`, never in client bundle)
- All SerpApi calls made via Next.js API routes
- No sensitive data committed to repository
- `.env.local` is in `.gitignore`
- Clerk handles session tokens and auth state
- Database queries scoped by authenticated `userId`

---

## 🧠 AI Tools Disclosed

- **Groq** — Resume parsing, skill extraction, evidence reasoning
- **Gemini** — Long-context analysis, career recommendations
- **SerpApi** — Live search data (core integration)
- **GitHub API** — Public code evidence

---

## 👥 Team Name : NavNirman

---

## 📄 License

Built for **SerpApi India Hackathon 2026** — Open Innovation Track.

---

## 🙏 Acknowledgments

- **SerpApi** — For the live search infrastructure that makes market intelligence possible
- **Clerk** — Authentication
- **Groq & Google** — AI inference
- **GitHub** — Public evidence API
- **Vercel** — Deployment platform
