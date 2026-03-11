# Financial Analyst Agent

A real-time financial dashboard for tracking US stocks, Indian equities, and crypto — built with institutional-grade research frameworks and live market data.

**Live app:** https://financial-analyst-agent-beta.vercel.app

---

## Features

### Dashboard
- **CNN Fear & Greed Index** — live stock market sentiment gauge (equity signals only: S&P momentum, NYSE breadth, put/call ratio, VIX, junk bond demand)
- Real-time index overview with auto-refresh

### Stocks Tab
- Four portfolio views: Personal Stocks, Roth IRA, 401(k), and House Fund
- Live prices, 24h change, RSI, P/E, beta, 52-week range, and market cap via Yahoo Finance
- **Expandable price charts** — click any holding row to view a 1W / 1M / 3M / 1Y Recharts area chart inline
- **Earnings date badges** — color-coded countdown (red ≤7d, orange ≤21d, yellow ≤45d) shown under each ticker
- Portfolio allocation bars with conviction-weighted sizing
- Health summary with overbought/oversold alerts and upcoming earnings warnings

### India Tab
- 10 high-conviction NSE stocks for a 2–3 year holding horizon
- 7 booming sector cards (Fintech, EV, Renewable Energy, Consumer, Pharma, Digital Infrastructure, IT Services) with CAGR and growth drivers
- NSE / BSE index strip with live IST market-open indicator
- Same inline price charts and earnings badges as the Stocks tab (prices in INR ₹)
- INR-formatted market cap (Cr / KCr / LCr)

### Crypto Tab
- Live prices for major cryptocurrencies
- 24h change, market cap, and volume

---

## Research Framework

Portfolio allocations and stock selection are driven by a **backtested prompt accuracy system** — 22 analytical frameworks ranked by simulated signal accuracy across 14 stocks × 2 historical snapshots (Jan 2023, Jan 2024).

| Rank | Framework | Score |
|------|-----------|-------|
| 1 | Hamilton Helmer's 7 Powers Moat Analysis | 92/100 |
| 2 | Institutional Accumulation & Dark Pool Flow | 89/100 |
| 3 | Behavioral Finance & Contrarian Signal | 84/100 |
| 4 | Earnings Quality & FCF Durability | 81/100 |
| 5 | Sector Rotation & Macro Regime | 78/100 |

Full report: [`PROMPT_ACCURACY_REPORT.md`](./PROMPT_ACCURACY_REPORT.md)
All 22 prompts: [`STOCK_ANALYSIS_PROMPTS.md`](./STOCK_ANALYSIS_PROMPTS.md)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts 3 |
| Market Data | yahoo-finance2 |
| Deployment | Vercel (Hobby — free tier) |

---

## Project Structure

```
app/
├── page.tsx              # Dashboard (Fear & Greed)
├── stocks/page.tsx       # US portfolio tab
├── india/page.tsx        # India market tab
├── crypto/page.tsx       # Crypto tab
└── api/
    ├── prices/           # US stock quotes
    ├── india-prices/     # NSE stock quotes
    ├── chart/            # Historical OHLC (1W–1Y)
    ├── rsi/              # RSI calculation
    ├── fear-greed/       # CNN Fear & Greed proxy
    └── crypto/           # Crypto prices

components/
├── stocks/               # PortfolioDetailModal (holdings table + charts)
├── ui/StockPriceChart    # Recharts area chart with period selector
├── widgets/FearGreedGauge
└── layout/               # Nav, tab bar

constants/
├── portfolio-stocks.ts   # Personal brokerage holdings
├── portfolio-roth-ira.ts # Roth IRA holdings
├── portfolio-401k.ts     # 401(k) holdings
├── india-stocks.ts       # India NSE holdings + sector data
└── stocks-data.ts        # Ticker metadata

hooks/
├── useStockPrices.ts
├── useIndiaPrices.ts
├── useRSI.ts
├── useFearGreed.ts
└── useCryptoPrices.ts
```

---

## Getting Started

### Prerequisites
- Node.js 22+
- npm

### Install & Run

```bash
git clone https://github.com/Dhruvish97/Financial_analyst_agent.git
cd Financial_analyst_agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## API Routes

| Route | Description | Params |
|-------|-------------|--------|
| `GET /api/prices` | Live quotes for US tickers | — |
| `GET /api/india-prices` | Live quotes for NSE tickers | — |
| `GET /api/chart` | Historical OHLC data | `ticker`, `period` (1w/1m/3m/1y) |
| `GET /api/rsi` | RSI(14) for given tickers | `tickers` (comma-separated) |
| `GET /api/fear-greed` | CNN Fear & Greed score | — |
| `GET /api/crypto` | Crypto prices | — |

All routes use `force-dynamic` and `maxDuration = 30` for Vercel serverless compatibility.

---

## Deployment

The app is deployed on **Vercel Hobby (free)**. To deploy your own instance:

```bash
npm i -g vercel
vercel --prod
```

---

## Disclaimer

This project is for informational and educational purposes only. It does not constitute financial advice or a solicitation to buy or sell any security. Always consult a qualified financial advisor before making investment decisions. Past performance is not indicative of future results.
