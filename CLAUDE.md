# CLAUDE.md — Financial Analyst Agent

Read this file at the start of every conversation. Follow every rule here without being asked.

---

## Project Overview

- **Framework**: Next.js 14 App Router, TypeScript strict mode, Tailwind CSS v4, Recharts 3
- **Data**: yahoo-finance2 (live quotes, RSI, OHLC charts), CNN Fear & Greed API
- **Deployment**: Vercel Hobby (free tier) — `maxDuration = 30` on all API routes, `force-dynamic`
- **Live URL**: https://financial-analyst-agent-beta.vercel.app
- **GitHub**: https://github.com/Dhruvish97/Financial_analyst_agent

---

## Mandatory Development Loop

Every feature change — no matter how small — must follow this exact sequence:

```
1. READ   → understand the existing code before touching it
2. PLAN   → state what will change and why
3. EDIT   → make the minimal change needed
4. TEST   → run `npm test` — all tests must pass
5. BUILD  → run `npm run build` — must compile with zero errors
6. COMMIT → commit with a clear message (see Git Rules)
7. PUSH   → push to GitHub
```

**Never skip steps 4 or 5.** If tests fail, fix them before proceeding. If the build fails, fix it before committing.

---

## Testing Rules

- Run tests after **every** meaningful code change: `npm test`
- Run coverage after adding new files: `npm run test:coverage`
- Coverage thresholds (enforced): **80% statements, 80% functions, 70% branches, 80% lines**
- When adding a new API route → add a corresponding test in `__tests__/api/`
- When adding a new hook → add a corresponding test in `__tests__/hooks/`
- When adding a new UI component → add a corresponding test in `__tests__/components/`
- API route tests use `/** @jest-environment node */` docblock
- Mock `yahoo-finance2` via `__mocks__/yahoo-finance2.ts` (shared mock instance pattern)
- Mock `recharts` inline in component tests (ResponsiveContainer breaks in jsdom)
- Mock `global.fetch` for hook tests; use `jest.useFakeTimers()` for hooks with `setInterval`

---

## Code Standards

### General
- TypeScript strict mode — no `any` unless absolutely unavoidable, always comment why
- No unused variables, no console.log in production code (console.error in API error handlers is fine)
- Prefer editing existing files over creating new ones
- Keep components focused — if a component exceeds ~200 lines, consider splitting
- No over-engineering: don't add abstractions for one-off operations

### API Routes
- Always export `export const dynamic = "force-dynamic"` and `export const maxDuration = 30`
- Always set `Cache-Control: no-store` header on responses
- Always use try/catch and return a structured error JSON on failure
- Use `Promise.allSettled` (not `Promise.all`) for multi-ticker fetches

### React Components
- Client components: `"use client"` directive at top
- Use `useState` + `useEffect` for async data — never fetch in render
- Cancelled fetch pattern: `let cancelled = false; return () => { cancelled = true; }` in useEffect
- Tailwind only — no inline styles except dynamic values (colors, widths from data)

### Data & Types
- All live price data flows through `LivePrice` type (`types/portfolio.ts`)
- `earningsDate` is always `string | null` in ISO `YYYY-MM-DD` format
- INR formatting: use `toLocaleString("en-IN")` and `₹` prefix
- USD formatting: use `Intl.NumberFormat` or `$${value.toFixed(2)}`

---

## File Structure Reference

```
app/api/          → API routes (one folder per route, route.ts inside)
components/ui/    → Reusable primitives (tested, high coverage required)
components/stocks/→ Portfolio-specific components (page-level)
components/widgets/→ Dashboard widgets (FearGreedGauge etc.)
constants/        → Static data: portfolios, India stocks, crypto list
hooks/            → Data-fetching hooks (one per data source)
lib/              → Pure utility functions (fully unit tested)
types/            → Shared TypeScript interfaces
__tests__/        → Mirror of src structure (api/, components/, hooks/, lib/)
__mocks__/        → Manual mocks for external modules
```

---

## Git Rules

- Commit after every completed feature or fix — never batch unrelated changes
- Use conventional commits:
  - `feat:` new feature
  - `fix:` bug fix
  - `test:` adding/updating tests
  - `docs:` documentation only
  - `refactor:` code change with no behaviour change
- Always co-author: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- Never force-push to `main`
- Never commit: `.env`, `coverage/`, `.next/`, `node_modules/`

---

## Portfolio & Research Context

- **Framework ranking**: 22 analytical frameworks, self-assessed and ranked; top 5 inform all
  research write-ups. The scores are qualitative confidence ratings, **not** measured backtest
  results — see the caveat at the top of `PROMPT_ACCURACY_REPORT.md`.
  1. Hamilton Helmer's 7 Powers
  2. Institutional Accumulation
  3. Behavioral Finance / Contrarian
  4. Earnings Quality & FCF
  5. Sector Rotation & Macro
- Full reports: `PROMPT_ACCURACY_REPORT.md`, `STOCK_ANALYSIS_PROMPTS.md`
- **Fear & Greed Index**: equity signals only (S&P momentum, NYSE breadth, VIX, put/call, junk bonds)
- **India tab**: 10 NSE stocks, 7 sector cards, prices in INR, IST market hours indicator
- All portfolio allocations must sum to exactly 100%

---

## Known Constraints

- Node.js 20 locally (yahoo-finance2 warns about needing Node 22 — safe to ignore, Vercel uses 22)
- `next/jest` via SWC handles TypeScript transpilation — no `babel-jest` needed
- `jest.config.ts` requires `ts-node` to parse (already installed)
- Large page-level components (PortfolioDetailModal etc.) are excluded from unit coverage and verified manually in the browser
- Vercel Hobby timeout: 10s hard limit on serverless functions in practice; `maxDuration = 30` is a hint

---

## Quick Commands

```bash
npm run dev          # local dev server → http://localhost:3000
npm test             # run all unit tests
npm run test:watch   # watch mode
npm run test:coverage# tests + coverage report (must stay ≥80%)
npm run build        # production build validation
npm run lint         # eslint (next/core-web-vitals)
npx vercel --prod --yes  # deploy to Vercel
git push             # push to GitHub
```

---

## Weekly Research Refresh

The market commentary in `constants/portfolio-stocks.ts`, `constants/india-stocks.ts`,
and `constants/portfolio-targets.ts` is refreshed periodically rather than hand-maintained.

```bash
npm run research     # fetches live quotes → .research-snapshot.json (gitignored)
```

The refresh then:

1. Reads the snapshot for current prices, P/E, and 52-week ranges.
2. Web-searches recent earnings, macro (Fed / RBI), and sector news.
3. **Screens for new candidates** not already held — each scored against the
   7 Powers moat framework (≥3/7 to qualify) and recorded in the header comment
   of the relevant constants file with a WATCH / STRONG WATCH / ON RADAR label.
4. Rewrites `rationale`, `catalysts`, and sector `outlook` / `drivers` with the
   current numbers, and stamps the month in each file's header comment.
5. Runs `npm test` and `npm run build` before committing.

**Never changed by a refresh:** tickers, company names, colors, or allocation
percentages. If conviction has materially shifted, that is flagged in the header
comment for a human decision rather than applied automatically.
