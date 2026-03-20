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
7. PUSH   → push to GitHub (ask user before deploying to Vercel)
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
components/stocks/→ Portfolio-specific components (page-level, E2E tested)
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
- Ask before pushing to Vercel production

---

## Portfolio & Research Context

- **Prompt accuracy system**: 22 frameworks backtested; top 5 used for all recommendations
  - #1 Hamilton Helmer's 7 Powers (92/100)
  - #2 Institutional Accumulation (89/100)
  - #3 Behavioral Finance / Contrarian (84/100)
  - #4 Earnings Quality & FCF (81/100)
  - #5 Sector Rotation & Macro (78/100)
- Full reports: `PROMPT_ACCURACY_REPORT.md`, `STOCK_ANALYSIS_PROMPTS.md`
- **Fear & Greed Index**: equity signals only (S&P momentum, NYSE breadth, VIX, put/call, junk bonds)
- **India tab**: 10 NSE stocks, 7 sector cards, prices in INR, IST market hours indicator
- All portfolio allocations must sum to exactly 100%

---

## Known Constraints

- Node.js 20 locally (yahoo-finance2 warns about needing Node 22 — safe to ignore, Vercel uses 22)
- `next/jest` via SWC handles TypeScript transpilation — no `babel-jest` needed
- `jest.config.ts` requires `ts-node` to parse (already installed)
- Large page-level components (PortfolioDetailModal, StocksTable etc.) excluded from unit coverage — tested via Playwright E2E
- Vercel Hobby timeout: 10s hard limit on serverless functions in practice; `maxDuration = 30` is a hint

---

## Quick Commands

```bash
npm run dev          # local dev server → http://localhost:3000
npm test             # run all unit tests
npm run test:watch   # watch mode
npm run test:coverage# tests + coverage report (must stay ≥80%)
npm run build        # production build validation
npx vercel --prod --yes  # deploy to Vercel (ask user first)
git push             # push to GitHub
```

---

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

---

## Weekly Research Trigger

When the user says any of the following (or anything similar):
- "trigger the weekly research"
- "run the weekly research"
- "run research update"
- "do the weekly research"
- "update the research"

**Execute this exact sequence without asking for confirmation:**

### Step 1 — Collect live market data
Run `npm run research` — this fetches live quotes for all tickers and saves
`.research-snapshot.json`. Read that file after it completes.

### Step 2 — Web-search for recent news (run these in parallel)
Search for the following to get current intelligence beyond the snapshot prices:
- Recent earnings results for: NVDA, META, GOOGL, MSFT, AMZN, AVGO, PLTR, TSLA, CRM, NET
- India macro: RBI policy, NIFTY outlook, IT sector, HDFCBANK, BAJFINANCE, HCLTECH news
- US macro: Fed policy, AI capex cycle, hyperscaler earnings, S&P 500 trend
- India sectors: Banking NIM trends, IT deal wins, Defence PLI, Renewable energy bids

### Step 3 — Read current constants (all three — all tabs depend on these)
- `constants/portfolio-stocks.ts` → **Stocks tab**: US portfolio rationale + catalysts
- `constants/india-stocks.ts` → **India tab**: NSE stocks + all 7 sector cards
- `constants/portfolio-targets.ts` → **Advisor tab**: sector target descriptions + allocation context

### Step 4 — Update all three files using research frameworks
Apply the backtested framework sequence (see STOCK_ANALYSIS_PROMPTS.md):
- **#17 Moat Destroyer (7 Powers)** — confirm each holding still scores ≥3/7
- **#8 Bain Competitive Analysis** — sector winner still leading?
- **#18 Behavioral Finance Bias Auditor** — any contrarian opportunities from sentiment?
- **#10 McKinsey Macro** — megatrend alignment still intact?

**Stocks tab** (`constants/portfolio-stocks.ts`):
- `rationale` — every US stock (rewrite with current earnings, P/E, product data)
- `catalysts` — every US stock (3–5 specific catalysts with timeframes)
- Header comment date stamp

**India tab** (`constants/india-stocks.ts`):
- `rationale` — every India stock (reference RBI stance, INR, domestic demand)
- `catalysts` — every India stock (3–4 catalysts)
- `outlook` — all 7 sector cards (Banking, IT, Consumer, Pharma, Real Estate, Energy, Defence)
- `drivers` — all 7 sector cards (3–5 specific drivers with policy/numbers)
- Header comment date stamp

**Advisor tab** (`constants/portfolio-targets.ts`):
- `description` — for all 4 portfolio styles (conservative, aggressive, india-conservative, india-aggressive)
- Update the macro context sentences to reflect current market regime (Fed stance, RBI stance, sector rotation)

**Rules for all updates:**
- Never change: tickers, names, colors, allocation numbers (flag if conviction has materially shifted)
- Be specific: reference actual P/E ratios, earnings beats, policy meeting dates, product launches
- Do not copy-paste old content — rewrite with current intelligence
- Stamp the month/year in each file's header comment

### Step 5 — Validate, test, build
```bash
npm test          # must pass 138+ tests
npm run build     # must compile with zero errors
```
Fix any failures before proceeding.

### Step 6 — Commit, push, deploy
```bash
git add constants/portfolio-stocks.ts constants/india-stocks.ts constants/portfolio-targets.ts
git commit -m "research: weekly market refresh YYYY-MM-DD"
git push
npx vercel --prod --yes
```

### What to report back
After completing, summarize:
- Key market changes found (price moves, earnings surprises, macro shifts)
- Which stocks/sectors had rationale meaningfully updated and why
- Any conviction changes flagged (allocation recommendations if warranted)
- Deployment URL confirmation
