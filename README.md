# Financial Analyst Agent

A real-time market dashboard for US equities, Indian (NSE) equities, and crypto — with
live prices, RSI, interactive charts, and moat-based portfolio research.

**Live demo:** https://financial-analyst-agent-beta.vercel.app

> **This is a software portfolio project, not a financial product.** The portfolios shown
> are illustrative examples, not real holdings. Nothing here is financial advice — see
> [Disclaimer](#disclaimer).

---

## Features

| Tab | What it does |
|-----|--------------|
| **Dashboard** | CNN Fear & Greed sentiment gauge + live index overview |
| **Stocks** | Four example US portfolios with live prices, RSI, P/E, 52-week range, market cap, earnings-date badges, per-holding risk ratings, and expandable price charts |
| **India** | 10 NSE stocks priced in ₹ + 7 sector cards, with an IST market-open indicator and INR-formatted market caps (Cr / KCr / LCr) |
| **Crypto** | Live prices, 24h change, market cap, and volume for major cryptocurrencies |
| **Advisor** | Upload a brokerage screenshot → Claude extracts your holdings → get sector-gap analysis and rebalancing suggestions *(disabled by default — see [Advisor setup](#optional-enabling-the-advisor-tab))* |

Every holding row carries a **Low / Medium / High** risk badge, and prices auto-refresh
every 60 seconds.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Charts | Recharts 3 |
| Market data | [yahoo-finance2](https://github.com/gadicc/yahoo-finance2) |
| Vision AI | Anthropic Claude (Advisor tab only) |
| Testing | Jest + React Testing Library — 145 tests |
| Deployment | Vercel |

---

## Getting Started

**Prerequisites:** Node.js 22+ and npm.

```bash
git clone https://github.com/Dhruvish97/Financial_analyst_agent.git
cd Financial_analyst_agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API key or `.env` file is needed —
every tab except Advisor works out of the box on public market data.

### Optional: enabling the Advisor tab

The Advisor tab sends an uploaded screenshot to the Anthropic API, which **costs money per
request**. It is therefore disabled unless you explicitly opt in. To run it locally, create
`.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...   # https://console.anthropic.com/
ADVISOR_ENABLED=true
```

Without `ADVISOR_ENABLED=true` the route returns `503` and the rest of the app is unaffected.
Leave it unset on any public deployment — otherwise anyone who finds the endpoint can spend
your API credits.

### Other commands

```bash
npm run build          # production build
npm test               # run the test suite
npm run test:coverage  # coverage report (thresholds: 80% stmts/fns/lines, 70% branches)
npm run lint           # eslint
npm run research       # refresh the market-data snapshot used by research updates
```

---

## API Routes

| Route | Description | Params |
|-------|-------------|--------|
| `GET /api/prices` | Live quotes for US tickers | — |
| `GET /api/india-prices` | Live quotes for NSE tickers | — |
| `GET /api/crypto` | Crypto prices | — |
| `GET /api/chart` | Historical OHLC data | `ticker`, `period` (`1w`/`1m`/`3m`/`1y`) |
| `GET /api/rsi` | RSI(14), max 25 tickers/request | `tickers` (comma-separated) |
| `GET /api/fear-greed` | CNN Fear & Greed score | — |
| `POST /api/analyze-portfolio` | Extract holdings from a screenshot **(opt-in)** | `image` (multipart, ≤4 MB) |

All routes use `force-dynamic`, `maxDuration = 30`, and `Cache-Control: no-store`.
User-supplied tickers are validated against `^[A-Z0-9.\-]{1,12}$` before reaching any
upstream request.

---

## Project Structure

```
app/
├── page.tsx                  # Dashboard (Fear & Greed)
├── stocks/ india/ crypto/    # Market tabs
├── portfolio-compare/        # Advisor tab
└── api/                      # Route handlers (one folder each)

components/
├── ui/        # Tested primitives — RiskBadge, PriceDisplay, StockPriceChart…
├── stocks/    # PortfolioCard, PortfolioDetailModal
├── charts/ crypto/ layout/ widgets/

constants/     # Portfolio definitions, India stocks + sectors, ticker risk map
hooks/         # One data-fetching hook per source
lib/           # yahoo-finance wrapper, RSI math, portfolio analysis, formatters
types/         # Shared interfaces
__tests__/     # Mirrors the source tree
```

---

## Research Methodology

Portfolio rationale is written against a set of 22 analytical frameworks — the top five
being 7 Powers moat analysis, institutional accumulation, behavioral/contrarian signals,
earnings quality & FCF, and sector rotation. Every holding is expected to score ≥3/7 on
[Hamilton Helmer's 7 Powers](https://www.amazon.com/7-Powers-Foundations-Business-Strategy/dp/0998116300).

> ⚠️ **On the framework scores:** [`PROMPT_ACCURACY_REPORT.md`](./PROMPT_ACCURACY_REPORT.md)
> ranks these frameworks with `NN/100` figures. Those are **self-assessed, qualitative
> confidence ratings — not measured backtest results.** No prompt was run against live data
> in advance; the rankings were reasoned out after the fact with outcomes already known, so
> they are subject to hindsight bias. Treat them as a statement of research philosophy, not
> as evidence of predictive accuracy.

The full prompt library is in [`STOCK_ANALYSIS_PROMPTS.md`](./STOCK_ANALYSIS_PROMPTS.md).
Market commentary in `constants/` is refreshed periodically; each file's header comment
carries the date it was last updated, so figures quoted in rationale text reflect that date
rather than today's market.

---

## Testing

```bash
npm test
```

145 tests across API routes, hooks, UI primitives, and the portfolio-analysis library.
Large page-level components are excluded from coverage thresholds and verified manually in
the browser. Route tests use the `@jest-environment node` docblock; `yahoo-finance2` is
mocked via `__mocks__/`.

---

## Deployment

Deploys to Vercel with no configuration:

```bash
npx vercel --prod
```

If you deploy your own instance, leave `ADVISOR_ENABLED` unset unless you intend to pay for
the Advisor tab's API usage.

---

## Disclaimer

This project is for **educational and demonstration purposes only**. The portfolios,
allocations, and commentary are illustrative examples — not real holdings, not a record of
any actual account, and not a recommendation to buy or sell anything. Nothing here
constitutes financial, investment, or tax advice.

Market data is sourced from unofficial public endpoints and may be delayed, incomplete, or
wrong. Past performance does not indicate future results. Always do your own research and
consult a licensed financial advisor before investing.

---

## License

[MIT](./LICENSE)
