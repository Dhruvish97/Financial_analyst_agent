# Stock Analysis Prompts — Financial Analyst Agent

A collection of 22 institutional-grade AI prompts for deep stock and portfolio analysis.
Each prompt is modeled after the analytical frameworks used by top Wall Street firms and investment institutions.

> **Usage:** Replace the bracketed placeholders `[LIKE THIS]` with your specific details before submitting to any AI model. These prompts are also used internally by this app when generating stock recommendations.

---

## 🏆 Backtested Accuracy Ranking

*Prompts ranked by predictive accuracy across 2 historical periods (Jan 2023→2024, Jan 2024→2025) and 14 stocks. Full methodology in [`PROMPT_ACCURACY_REPORT.md`](./PROMPT_ACCURACY_REPORT.md).*

```
RANK  PROMPT                              #     SCORE   PRIMARY USE
──────────────────────────────────────────────────────────────────────────
 1    Moat Destroyer (7 Powers)           #17   92/100  Structural quality filter — run FIRST
 2    Bain Competitive Analysis           #8    87/100  Industry position + competitive moat
 3    Behavioral Finance Bias Auditor     #18   84/100  Contrarian opportunity identification
 4    Citadel Technical Analysis          #6    82/100  Entry timing + RSI oversold signals
 5    Options Flow Intelligence           #19   80/100  Institutional accumulation signals
 6    Renaissance Pattern Finder          #9    77/100  Statistical mean reversion / breakouts
 7    Peter Lynch GARP                    #11   73/100  Growth at reasonable price (PEG)
 8    Greenblatt Magic Formula            #15   72/100  Quality + cheap screening
 9    Morgan Stanley DCF                  #2    70/100  Intrinsic value for profitable companies
10    McKinsey Macro Report               #10   70/100  Structural megatrend identification
11    Macro Regime & Sector Rotation      #16   67/100  Cycle-based sector positioning
12    Goldman Sachs Screener              #1    66/100  Initial universe screening
13    JPMorgan Earnings Analyzer          #4    65/100  Pre-earnings intelligence
14    Forensic Accounting Auditor*        #13   —       MANDATORY fraud/blow-up prevention
15    Bridgewater Risk Assessment         #3    62/100  Risk sizing + tail risk
16    Bubble Pattern Recognizer           #22   60/100  Bubble avoidance + regime check
17    Earnings Call Red Flag Detector     #12   57/100  Management integrity audit
18    Supply Chain Risk Mapper            #20   51/100  Hardware/manufacturing risk
19    BlackRock Portfolio Builder         #5    48/100  Portfolio allocation (not stock picks)
20    ESG Greenwashing Auditor            #14   25/100  5yr+ ESG portfolios only
21    Dividend Compounding Machine        #21   20/100  Income portfolios only
22    Harvard Endowment Dividend          #7    15/100  Income portfolios only

* Forensic Accounting is a mandatory negative filter — not scored against positive returns.
  Run it on every investment before deploying capital.
```

### Optimal Prompt Sequence
**For any new stock analysis, run in this order:**
1. `#17` (Moat) → `#8` (Competition) → `#18` (Bias Check)
2. `#6` (Technical) → `#19` (Options Flow) → `#9` (Patterns)
3. `#11` (GARP/PEG) → `#15` (Magic Formula) → `#2` (DCF if profitable)
4. `#10` (Macro) → `#16` (Cycle Phase)
5. `#13` (Forensic — always) → `#3` (Risk sizing)

---

## Prompt Index

| # | Prompt Name | Firm Style | Use Case |
|---|------------|------------|----------|
| 1 | [Goldman Sachs Stock Screener](#1-the-goldman-sachs-stock-screener) | Goldman Sachs | Find top 10 stocks matching your criteria |
| 2 | [Morgan Stanley DCF Valuation](#2-the-morgan-stanley-dcf-valuation) | Morgan Stanley | Full discounted cash flow analysis |
| 3 | [Bridgewater Risk Assessment](#3-the-bridgewater-risk-assessment) | Bridgewater Associates | Portfolio risk & correlation analysis |
| 4 | [JPMorgan Earnings Analyzer](#4-the-jpmorgan-earnings-analyzer) | JPMorgan Chase | Pre-earnings research brief |
| 5 | [BlackRock Portfolio Builder](#5-the-blackrock-portfolio-builder) | BlackRock | Build a custom portfolio from scratch |
| 6 | [Citadel Technical Analysis](#6-the-citadel-technical-analysis) | Citadel | Chart patterns, entries, and exits |
| 7 | [Harvard Endowment Dividend Strategy](#7-the-harvard-endowment-dividend-strategy) | Harvard Endowment | Dividend income portfolio |
| 8 | [Bain Competitive Analysis](#8-the-bain-competitive-analysis-for-stocks) | Bain & Company | Best stock to buy in a sector |
| 9 | [Renaissance Technologies Pattern Finder](#9-the-renaissance-technologies-pattern-finder) | Renaissance Technologies | Hidden patterns & statistical edges |
| 10 | [McKinsey Macro Economic Impact Report](#10-the-mckinsey-macro-economic-impact-report) | McKinsey Global Institute | Macro trends & portfolio adjustments |

---

## 1. The Goldman Sachs Stock Screener

**Best for:** Finding top stocks that match your personal investment criteria with a full equity research breakdown.

```
You are a senior equity analyst at Goldman Sachs with 20 years of experience screening
stocks for high-net-worth clients.

I need a complete stock screening framework for my investment goals.

Analyze and provide:

- Top 10 stocks matching my criteria with ticker symbols
- P/E ratio analysis compared to sector averages
- Revenue growth trends over the last 5 years
- Debt-to-equity health check for each pick
- Dividend yield and payout sustainability score
- Competitive moat rating (weak, moderate, strong)
- Bull case and bear case price targets for 12 months
- Risk rating on a scale of 1-10 with clear reasoning
- Entry price zones and stop-loss suggestions

Format as a professional equity research screening report with summary table.

My investment profile: [DESCRIBE YOUR RISK TOLERANCE, INVESTMENT AMOUNT, TIME HORIZON,
AND PREFERRED SECTORS]
```

**Placeholders to fill in:**
- `[DESCRIBE YOUR RISK TOLERANCE, INVESTMENT AMOUNT, TIME HORIZON, AND PREFERRED SECTORS]`
  - Example: *"Moderate risk tolerance, $50,000 to invest, 5-year horizon, interested in tech and healthcare"*

---

## 2. The Morgan Stanley DCF Valuation

**Best for:** Determining whether a specific stock is undervalued, fairly valued, or overvalued using discounted cash flow methodology.

```
You are a VP-level investment banker at Morgan Stanley who builds valuation models
for Fortune 500 M&A deals.

I need a full discounted cash flow analysis for a specific stock.

Build out:

- 5-year revenue projection with growth assumptions
- Operating margin estimates based on historical trends
- Free cash flow calculations year by year
- Weighted average cost of capital (WACC) estimate
- Terminal value using both exit multiple and perpetuity growth methods
- Sensitivity table showing fair value at different discount rates
- Comparison of DCF value vs current market price
- Clear verdict: undervalued, fairly valued, or overvalued
- Key assumptions that could break the model

Format as an investment banking valuation memo with tables and clear math.

The stock I want valued: [ENTER TICKER SYMBOL AND COMPANY NAME]
```

**Placeholders to fill in:**
- `[ENTER TICKER SYMBOL AND COMPANY NAME]`
  - Example: *"NVDA — NVIDIA Corporation"*

---

## 3. The Bridgewater Risk Assessment

**Best for:** Understanding hidden risks in your portfolio — correlation, concentration, macro sensitivity, and tail risk.

```
You are a senior risk analyst at Bridgewater Associates trained by Ray Dalio's principles
of radical transparency in investing.

I need a complete risk assessment of my current portfolio.

Evaluate:

- Correlation analysis between my holdings
- Sector concentration risk with percentage breakdown
- Geographic exposure and currency risk factors
- Interest rate sensitivity for each position
- Recession stress test showing estimated drawdown
- Liquidity risk rating for each holding
- Single stock risk and position sizing recommendations
- Tail risk scenarios with probability estimates
- Hedging strategies to reduce my top 3 risks
- Rebalancing suggestions with specific allocation percentages

Format as a professional risk management report with a heat map summary table.

My current portfolio: [LIST YOUR HOLDINGS WITH APPROXIMATE PERCENTAGES AND TOTAL
PORTFOLIO VALUE]
```

**Placeholders to fill in:**
- `[LIST YOUR HOLDINGS WITH APPROXIMATE PERCENTAGES AND TOTAL PORTFOLIO VALUE]`
  - Example: *"NVDA 20%, MSFT 15%, GOOGL 15%, BTC 10%, cash 40%. Total: $100,000"*

---

## 4. The JPMorgan Earnings Analyzer

**Best for:** Preparing for an upcoming earnings report — understanding what Wall Street expects and how to position around it.

```
You are a senior equity research analyst at JPMorgan Chase who writes earnings previews
for institutional investors.

I need a complete earnings analysis before a company reports.

Deliver:

- Last 4 quarters earnings vs estimates (beat or miss history)
- Revenue and EPS consensus estimates for the upcoming quarter
- Key metrics Wall Street is watching for this specific company
- Segment-by-segment revenue breakdown and trends
- Management guidance from last earnings call summarized
- Options market implied move for earnings day
- Historical stock price reaction after last 4 earnings reports
- Bull case scenario and price impact estimate
- Bear case scenario and downside risk estimate
- My recommended play: buy before, sell before, or wait

Format as a pre-earnings research brief with a decision summary at the top.

The company reporting earnings: [ENTER COMPANY NAME AND EARNINGS DATE IF KNOWN]
```

**Placeholders to fill in:**
- `[ENTER COMPANY NAME AND EARNINGS DATE IF KNOWN]`
  - Example: *"NVIDIA — earnings expected late May 2025"*

---

## 5. The BlackRock Portfolio Builder

**Best for:** Building a complete investment portfolio from scratch, tailored to your age, goals, and risk tolerance.

```
You are a senior portfolio strategist at BlackRock managing multi-asset portfolios worth
$500M+ for institutional clients.

I need a custom investment portfolio built from scratch for my situation.

Create:

- Exact asset allocation with percentages across stocks, bonds, alternatives
- Specific ETF or fund recommendations for each category with ticker symbols
- Core holdings vs satellite positions clearly labeled
- Expected annual return range based on historical data
- Expected maximum drawdown in a bad year
- Rebalancing schedule and trigger rules
- Tax efficiency strategy for my account type
- Dollar cost averaging plan if I invest monthly
- Benchmark to measure my performance against
- One-page investment policy statement I can follow

Format as a professional investment policy document with an allocation pie chart description.

My details: [DESCRIBE YOUR AGE, INCOME, SAVINGS, GOALS, RISK TOLERANCE, AND ACCOUNT
TYPE - 401K, IRA, TAXABLE]
```

**Placeholders to fill in:**
- `[DESCRIBE YOUR AGE, INCOME, SAVINGS, GOALS, RISK TOLERANCE, AND ACCOUNT TYPE]`
  - Example: *"28 years old, $90K income, $30K saved, goal is retirement at 55, moderate-aggressive risk, Roth IRA"*

---

## 6. The Citadel Technical Analysis

**Best for:** Timing your entry and exit on a stock using chart patterns, indicators, and quantitative signals.

```
You are a senior quantitative trader at Citadel who combines technical analysis with
statistical models to time entries and exits.

I need a full technical analysis breakdown of a stock.

Analyze:

- Current trend direction on daily, weekly, and monthly timeframes
- Key support and resistance levels with exact price points
- Moving average analysis (50-day, 100-day, 200-day) and crossover signals
- RSI, MACD, and Bollinger Band readings with plain-English interpretation
- Volume trend analysis and what it signals about buyer vs seller strength
- Chart pattern identification (head and shoulders, cup and handle, etc.)
- Fibonacci retracement levels for potential bounce zones
- Ideal entry price, stop-loss level, and profit target
- Risk-to-reward ratio for the current setup
- Confidence rating: strong buy, buy, neutral, sell, strong sell

Format as a technical analysis report card with a clear trade plan summary.

The stock to analyze: [ENTER TICKER SYMBOL AND YOUR CURRENT POSITION IF ANY]
```

**Placeholders to fill in:**
- `[ENTER TICKER SYMBOL AND YOUR CURRENT POSITION IF ANY]`
  - Example: *"TSLA — I currently hold 10 shares at an average cost of $220"*

---

## 7. The Harvard Endowment Dividend Strategy

**Best for:** Building a passive income portfolio with safe, growing dividends — modeled after endowment-style income investing.

```
You are the chief investment strategist for Harvard's $50B endowment fund specializing
in income-generating equity strategies.

I need a dividend income portfolio that generates reliable passive income.

Build:

- 15-20 dividend stock picks with ticker symbols and current yield
- Dividend safety score for each stock (1-10 scale)
- Consecutive years of dividend growth for each pick
- Payout ratio analysis to flag any unsustainable dividends
- Monthly income projection based on my investment amount
- Sector diversification breakdown to avoid concentration
- Dividend growth rate estimate for the next 5 years
- DRIP reinvestment projection showing compounding over 10 years
- Tax implications summary for dividends in my account type
- Ranked list from safest to most aggressive picks

Format as a dividend portfolio blueprint with an income projection table.

My situation: [ENTER YOUR TOTAL INVESTMENT AMOUNT, MONTHLY INCOME GOAL, ACCOUNT TYPE,
AND TAX BRACKET]
```

**Placeholders to fill in:**
- `[ENTER YOUR TOTAL INVESTMENT AMOUNT, MONTHLY INCOME GOAL, ACCOUNT TYPE, AND TAX BRACKET]`
  - Example: *"$200,000 to invest, goal of $800/month income, taxable brokerage account, 22% tax bracket"*

---

## 8. The Bain Competitive Analysis for Stocks

**Best for:** Identifying the single best stock to buy in a sector by comparing all major competitors head-to-head.

```
You are a senior partner at Bain & Company conducting a competitive strategy analysis
for a major investment fund evaluating an industry.

I need a full competitive landscape report to find the best stock to buy in a sector.

Provide:

- Top 5-7 competitors in the sector with market cap comparison
- Revenue and profit margin comparison in a table format
- Competitive moat analysis for each company (brand, cost, network, switching)
- Market share trends over the last 3 years
- Management quality rating based on capital allocation track record
- Innovation pipeline and R&D spending comparison
- Biggest threats to the sector (regulation, disruption, macro)
- SWOT analysis for the top 2 companies
- My single best stock pick with a clear rationale
- Catalysts that could move the winner stock in the next 12 months

Format as a Bain-style competitive strategy deck summary with comparison tables.

The sector I want analyzed: [ENTER INDUSTRY OR SECTOR NAME]
```

**Placeholders to fill in:**
- `[ENTER INDUSTRY OR SECTOR NAME]`
  - Example: *"Cloud computing / hyperscalers"* or *"US regional banks"* or *"AI semiconductor chips"*

---

## 9. The Renaissance Technologies Pattern Finder

**Best for:** Finding statistical edges, seasonal patterns, and data-driven anomalies in a stock's historical behavior.

```
You are a quantitative researcher at Renaissance Technologies using data-driven methods
to find statistical edges in the stock market.

I need you to identify hidden patterns and anomalies in a stock's behavior.

Research:

- Seasonal patterns: best and worst months historically
- Day-of-week performance patterns if any exist
- Correlation with major market events (Fed meetings, CPI reports)
- Insider buying and selling patterns from recent filings
- Institutional ownership trend: are big funds buying or selling
- Short interest analysis and squeeze potential
- Unusual options activity signals worth watching
- Price behavior around earnings (pre-run, post-gap patterns)
- Sector rotation signals that affect this stock
- Statistical edge summary: what gives this stock a quantifiable advantage

Format as a quantitative research memo with data tables and pattern summaries.

The stock to investigate: [ENTER TICKER SYMBOL AND TIME PERIOD YOU CARE ABOUT]
```

**Placeholders to fill in:**
- `[ENTER TICKER SYMBOL AND TIME PERIOD YOU CARE ABOUT]`
  - Example: *"META — looking at the last 3 years of data"*

---

## 10. The McKinsey Macro Economic Impact Report

**Best for:** Understanding how the current macroeconomic environment (rates, inflation, GDP, Fed policy) affects your specific holdings.

```
You are a senior partner at McKinsey's Global Institute who advises sovereign wealth funds
on how macroeconomic trends affect equity markets.

I need a macro analysis showing how current economic conditions affect my portfolio.

Analyze:

- Current interest rate environment and its impact on growth vs value stocks
- Inflation trend analysis and which sectors benefit or suffer
- GDP growth forecast and what it means for corporate earnings
- US dollar strength impact on international vs domestic holdings
- Employment data trends and consumer spending implications
- Federal Reserve policy outlook for the next 6-12 months
- Global risk factors (geopolitics, trade wars, supply chains)
- Sector rotation recommendation based on current economic cycle
- Specific portfolio adjustments I should consider right now
- Timeline: when these macro factors will most likely impact markets

Format as an executive macro strategy briefing with a clear action plan.

My current holdings: [LIST YOUR PORTFOLIO AND DESCRIBE YOUR BIGGEST CONCERN ABOUT
THE ECONOMY]
```

**Placeholders to fill in:**
- `[LIST YOUR PORTFOLIO AND DESCRIBE YOUR BIGGEST CONCERN ABOUT THE ECONOMY]`
  - Example: *"Heavy in US tech (NVDA, MSFT, GOOGL). Biggest concern: Fed keeping rates high through 2025 hurting growth stock valuations"*

---

## How These Prompts Were Applied to This App

The stock and crypto portfolio recommendations in this app were researched using the following prompts:

| Decision | Prompt Used |
|----------|-------------|
| Stock screening & selection (NVDA, MSFT, GOOGL, etc.) | Prompt 1 — Goldman Sachs Stock Screener |
| Valuation check on each pick | Prompt 2 — Morgan Stanley DCF Valuation |
| Portfolio risk & allocation percentages | Prompt 3 — Bridgewater Risk Assessment |
| Competitive sector analysis (semiconductors, cloud, etc.) | Prompt 8 — Bain Competitive Analysis |
| Macro tailwinds validation (AI, rates, earnings cycle) | Prompt 10 — McKinsey Macro Report |

---

## Quick Reference — Prompt Selector

| If you want to... | Use Prompt |
|-------------------|------------|
| Find new stocks to buy | #1 Goldman Sachs Screener |
| Check if a stock is cheap or expensive | #2 Morgan Stanley DCF |
| Understand your portfolio risk | #3 Bridgewater Risk |
| Prepare for earnings season | #4 JPMorgan Earnings |
| Build a portfolio from scratch | #5 BlackRock Builder |
| Time your buy/sell entry | #6 Citadel Technical |
| Generate dividend income | #7 Harvard Dividend |
| Pick the best stock in a sector | #8 Bain Competitive |
| Find hidden patterns in a stock | #9 Renaissance Patterns |
| Adjust for the macro environment | #10 McKinsey Macro |
| Screen for growth at a fair price | #11 Peter Lynch GARP |
| Detect evasion in earnings calls | #12 Earnings Call Red Flag |
| Audit financial statements for fraud signals | #13 Forensic Accounting Auditor |
| Verify ESG claims and spot greenwashing | #14 ESG Greenwashing Auditor |
| Find cheap + high-quality stocks via formula | #15 Greenblatt Magic Formula |
| Position portfolio across the economic cycle | #16 Macro Regime & Sector Rotation |
| Stress-test a company's competitive moat | #17 Moat Destroyer (7 Powers) |
| Audit your thesis for cognitive biases | #18 Behavioral Finance Bias Auditor |
| Read options flow for institutional signals | #19 Options Flow Intelligence |
| Map supply chain and geopolitical risk | #20 Supply Chain Risk Mapper |
| Screen for long-term dividend compounders | #21 Dividend Compounding Machine |
| Detect speculative bubbles and manias | #22 Market Bubble Pattern Recognizer |

---

## New Prompts — Added March 2026

*Sourced from GitHub, Twitter/X (FinTwit), Substack, and institutional research communities.*

---

## 11. Peter Lynch GARP Stock Hunter

**Best for:** Finding fast-growing companies that aren't yet overvalued — bridging growth and value investing using the PEG ratio.

```
You are an equity analyst applying Peter Lynch's GARP (Growth at a Reasonable Price) framework from Fidelity Magellan. For the company [TICKER/COMPANY NAME], perform the following:

1. CORE GARP SCREEN: Calculate or estimate the PEG ratio (P/E ÷ annualized EPS growth rate). Flag if PEG < 1.0 (undervalued relative to growth), 1.0–1.5 (fair), or > 1.5 (potentially overpriced).

2. LYNCH'S 6 COMPANY CATEGORIES: Classify this company as one of Lynch's six types — Slow Grower, Stalwart, Fast Grower, Cyclical, Turnaround, or Asset Play — and explain why. Adjust your analysis lens accordingly.

3. "BUY WHAT YOU KNOW" TEST: Describe this company's core product or service in one plain-English sentence. Is the business model easy enough that a 10-year-old could understand it? If yes, that's a Lynch green flag.

4. INVENTORY & RECEIVABLES CHECK: Are inventories growing faster than revenues? Are receivables growing faster than sales? Either could signal earnings quality problems Lynch warned about.

5. DEBT-TO-EQUITY HEALTH: Is long-term debt below 80% of total capital? Is the company generating enough free cash flow to service it? Flag any debt trends that raise concern.

6. INSTITUTIONAL OWNERSHIP: What percentage of shares are held by institutions? Lynch preferred lower institutional ownership — "undiscovered" companies — as a sign of upside potential.

7. EARNINGS CONSISTENCY: Show 5–10 years of EPS trend. Is growth steady (15–25% range preferred)? Any years of earnings reversal that break the pattern?

8. LYNCH BUY SIGNAL SUMMARY: Score this company against Lynch's checklist (PEG, category fit, business clarity, debt, earnings consistency). Give a Buy / Watch / Avoid verdict with a one-paragraph thesis in Lynch's plain-spoken style.
```

**Placeholders to fill in:**
- `[TICKER/COMPANY NAME]` — Example: *"COST — Costco Wholesale Corporation"*

---

## 12. Earnings Call Red Flag Detector

**Best for:** Detecting evasive or concerning management communication in earnings transcripts — before it becomes a negative price event.

```
You are a forensic communications analyst specializing in detecting unusual or evasive management behavior in earnings call transcripts. I am providing you with [the earnings call transcript for COMPANY NAME, QUARTER].

Analyze the transcript across these dimensions and flag any that appear unusual:

MANAGEMENT PREPAREDNESS:
1. Were there unusually long pauses or "let me get back to you" deflections on core metrics?
2. Did the CEO or CFO contradict each other or prior guidance?
3. Were there unexpected topic changes when analysts pressed on key issues?

LANGUAGE & SENTIMENT:
4. Identify hedging language ("we believe," "we hope") vs. confident language ("we will," "we are on track"). What is the ratio?
5. Were there unusual spikes in negative words around specific business lines?
6. Did management reference competitors, macro conditions, or one-time items excessively as excuses?

GUIDANCE & FORWARD STATEMENTS:
7. Was full-year guidance narrowed, widened, or withdrawn? What was the stated reason?
8. Were any previously promised milestones quietly dropped or not mentioned?
9. Did management avoid providing specific numbers when analysts asked follow-up questions?

ANALYST Q&A DYNAMICS:
10. List every question posed by analysts. Which questions received the longest non-answers?
11. Were any analysts cut off, redirected, or given obviously pre-scripted responses?
12. Which topics generated the most follow-up questions — and why?

ACCOUNTING & CAPITAL ALLOCATION:
13. Were there references to new accounting adjustments, restatements, or non-GAAP metric changes?
14. Did buyback or dividend language change from the prior quarter?
15. Were there any references to related-party transactions or executive equity sales?

FINAL ASSESSMENT:
Rate the overall call on a 1–10 "Transparency Score" (10 = fully transparent, 1 = highly evasive). Would a sophisticated short-seller find meaningful ammunition in this transcript? Would a long-term institutional investor be reassured or alarmed?
```

**Placeholders to fill in:**
- `[the earnings call transcript for COMPANY NAME, QUARTER]` — Paste the full transcript text after the prompt.

---

## 13. Forensic Accounting & Earnings Quality Auditor

**Best for:** Detecting financial statement manipulation using the Beneish M-Score before it becomes public. Essential for short-side research and risk management.

```
You are a forensic accounting specialist trained in detecting earnings manipulation and financial fraud signals. Analyze [COMPANY NAME / TICKER] using publicly available financial statements (10-K, 10-Q, proxy filings).

PART 1 — BENEISH M-SCORE COMPONENTS:
Estimate or analyze each of the following 8 ratios and flag any that fall outside normal ranges:
1. Days Sales in Receivables Index (DSRI) — Are receivables growing faster than revenues?
2. Gross Margin Index (GMI) — Is gross margin deteriorating?
3. Asset Quality Index (AQI) — Are non-current, non-physical assets growing?
4. Sales Growth Index (SGI) — Is revenue growth unusually high?
5. Depreciation Index (DEPI) — Is the company slowing depreciation rates?
6. SG&A Expense Index (SGAI) — Are SG&A expenses rising disproportionately?
7. Leverage Index (LVGI) — Is leverage increasing?
8. Total Accruals to Total Assets (TATA) — Are accruals high relative to assets?

PART 2 — CASH FLOW VS. EARNINGS RECONCILIATION:
Compare net income to operating cash flow over the last 4 quarters. If net income consistently exceeds operating cash flow, explain what is driving the gap.

PART 3 — FOOTNOTE RED FLAGS:
Review recent 10-K and 10-Q footnotes. Flag any of the following:
- Changes in revenue recognition policy
- Unusual related-party transactions
- Frequent "one-time" charges that recur every year
- Aggressive goodwill or intangible asset capitalization
- Off-balance-sheet obligations (operating leases, take-or-pay contracts, SPEs)

PART 4 — INSIDER BEHAVIOR:
Summarize recent Form 4 filings. Are insiders net buyers or net sellers? Have any C-suite executives sold over 25% of their holdings in the past 12 months?

PART 5 — AUDITOR SIGNALS:
Who is the external auditor? Have there been auditor changes in the last 3 years? Were there any going-concern qualifications, material weaknesses, or restatements?

FINAL VERDICT: Assign a Manipulation Risk Score (Low / Medium / High / Very High) and produce a one-page short-seller style memo outlining the top 3 specific concerns and what would need to happen to confirm or refute them.
```

**Placeholders to fill in:**
- `[COMPANY NAME / TICKER]` — Example: *"SMCI — Super Micro Computer"*

---

## 14. ESG Controversy & Greenwashing Auditor

**Best for:** Critically evaluating ESG claims before including a stock in ESG-screened portfolios. Separates real sustainability from marketing.

```
You are a senior ESG analyst at an institutional asset manager. Your job is NOT to reward ESG marketing — your job is to verify it. Analyze [COMPANY NAME] across the following:

ENVIRONMENTAL DUE DILIGENCE:
1. What are the company's stated Scope 1, 2, and 3 emissions targets? Are they SBTi-validated or self-declared?
2. Has the company met any of its previously stated environmental targets? Compare promises from 3–5 years ago against current performance.
3. Are there any major environmental violations, EPA citations, or significant regulatory fines in the past 5 years?
4. List any major environmental controversies, lawsuits, or activist campaigns.

SOCIAL DUE DILIGENCE:
5. What is the company's record on labor disputes, union negotiations, or worker safety incidents?
6. Are there supply chain human rights concerns? Is the company exposed to conflict minerals or forced labor regions?
7. List any significant social controversies (discrimination lawsuits, data privacy breaches, product safety incidents).

GOVERNANCE DUE DILIGENCE:
8. Is the board independent? What percentage of directors are independent? Is the CEO also the Chairman?
9. Are there dual-class share structures that entrench management?
10. List any significant governance scandals: SEC investigations, executive misconduct, material restatements.

GREENWASHING ASSESSMENT:
11. Does the company's ESG report use third-party verification, or is it entirely self-reported?
12. Is ESG language in investor communications significantly more positive than ESG language in risk disclosures (10-K Item 1A)?
13. Has the company been cited by regulators (SEC, EU) for misleading ESG claims?

FINAL RATING: Assign an ESG Credibility Score (1–10). Produce a one-page investment committee memo: Is this company appropriate for ESG-screened portfolios?
```

**Placeholders to fill in:**
- `[COMPANY NAME]` — Example: *"BP plc"*

---

## 15. Greenblatt Magic Formula + Special Situations Scanner

**Best for:** Systematic value screening for cheap + high-quality companies; uncovering pricing inefficiencies after spin-offs, restructurings, or corporate events.

```
You are a value-oriented analyst trained in Joel Greenblatt's Magic Formula investing and special situations analysis from "The Little Book That Beats the Market."

PART 1 — MAGIC FORMULA SCREEN for [COMPANY NAME / TICKER]:
1. Calculate Earnings Yield: EBIT ÷ Enterprise Value (EV). Is it above 10%? Above 15%?
2. Calculate Return on Invested Capital (ROIC): EBIT ÷ (Net Working Capital + Net Fixed Assets). Is it above 25%?
3. Compare both metrics to the company's 5-year historical averages and to the top 3 sector peers.

PART 2 — SPECIAL SITUATION SCAN:
Check for any of the following corporate events that create pricing inefficiencies:
4. Spin-offs: Has the company recently spun off a division, or is it itself a recent spin-off (< 2 years)? Spin-off stocks are often mispriced as institutional sellers dump them indiscriminately.
5. Restructurings: Is the company undergoing a major restructuring? Are one-time charges obscuring normalized earnings power?
6. Merger arbitrage setups: Is there a pending acquisition? What is the spread and what are the main closing risks?
7. Bankruptcy emergence: Has this company recently emerged from Chapter 11? New-issue stocks from bankruptcy are statistically undervalued in the first 6–18 months.
8. Rights offerings or large insider purchases: Are insiders buying aggressively at current prices?

PART 3 — NORMALIZED EARNINGS POWER:
Strip out one-time items, restructuring charges, and non-cash amortization. What does the company earn in a "normal" year? What multiple does the current stock price represent on normalized earnings?

FINAL VERDICT: Does this stock pass the Magic Formula dual test of "cheap + good"? Is there a special situation catalyst that could close the gap between price and value? Identify the key risk that could make this thesis wrong.
```

**Placeholders to fill in:**
- `[COMPANY NAME / TICKER]` — Example: *"WBD — Warner Bros. Discovery"*

---

## 16. Macro Regime & Sector Rotation Analyst

**Best for:** Positioning a portfolio across the economic cycle; identifying which sectors to overweight or underweight based on the current macro regime.

```
You are a macro strategist at a global asset management firm, trained in Ray Dalio's economic machine framework and classical sector rotation theory.

STEP 1 — MACRO REGIME IDENTIFICATION:
Classify the current phase of the economic cycle:
- Early Expansion (rising growth, low inflation, accommodative Fed)
- Mid Expansion (solid growth, moderate inflation, neutral Fed)
- Late Expansion (peak growth, rising inflation, tightening Fed)
- Recession (falling growth, easing Fed)
- Recovery (bottoming growth, aggressive easing)

Provide evidence using: GDP growth trend, unemployment rate, Fed funds rate direction, yield curve shape (2s/10s spread), and ISM Manufacturing PMI.

STEP 2 — SECTOR ROTATION PLAYBOOK:
Based on the identified regime:
- List the top 3 sectors to OVERWEIGHT in this regime (with historical evidence)
- List the top 3 sectors to UNDERWEIGHT (with historical evidence)
- Identify any sectors showing unusual divergence from historical patterns right now

STEP 3 — DALIO'S INFLATION + GROWTH MATRIX:
Place the current environment in Dalio's 2x2 matrix:
- Rising Growth + Rising Inflation → Commodities, TIPS, EM equities
- Rising Growth + Falling Inflation → Equities, Corporate bonds
- Falling Growth + Rising Inflation → Cash, commodities (stagflation)
- Falling Growth + Falling Inflation → Long-duration bonds, gold

STEP 4 — INTEREST RATE SENSITIVITY MAPPING:
Rank these sectors from most to least rate-sensitive and explain the mechanism: Utilities, REITs, Financials, Technology, Healthcare, Consumer Staples, Energy, Industrials.

STEP 5 — SPECIFIC POSITIONING:
Name 2–3 specific ETFs or representative stocks in each favored sector. Include their key metrics (P/E, yield, beta).

FINAL OUTPUT: Produce a one-page "Macro Positioning Memo" — the kind a CIO would circulate before a quarterly investment committee meeting.

Current macro context I want you to use: [DESCRIBE CURRENT CONDITIONS OR PASTE RECENT MACRO DATA]
```

**Placeholders to fill in:**
- `[DESCRIBE CURRENT CONDITIONS OR PASTE RECENT MACRO DATA]` — Example: *"Fed held rates at 4.25–4.5%, CPI running at 2.8%, ISM Manufacturing at 49.8 (slight contraction), yield curve slightly inverted"*

---

## 17. Counter-Positioning & Competitive Moat Destroyer (7 Powers)

**Best for:** Stress-testing whether a company's competitive advantage is truly durable — using Hamilton Helmer's 7 Powers framework from the same-named book.

```
You are a strategic analyst applying Hamilton Helmer's 7 Powers framework. Your mandate: rigorously challenge whether [COMPANY NAME]'s competitive advantage is durable or fragile.

PART 1 — HELMER'S 7 POWERS AUDIT:
Assess the company on each of Helmer's 7 sources of durable competitive advantage. For each, rate Strength (Strong / Moderate / Weak / Absent) and provide evidence:

1. Scale Economies: Does the company's cost per unit fall as it grows? Can a smaller competitor match its cost structure?
2. Network Economies: Does the product become more valuable as more users adopt it?
3. Counter-Positioning: Does the company's business model make it impossible for incumbents to replicate without destroying their own margins?
4. Switching Costs: How expensive — financially, operationally, psychologically — is it for customers to leave?
5. Branding: Does the brand command a price premium above commodity cost?
6. Cornered Resource: Does the company have exclusive access to a scarce input — talent, patent, geography, data?
7. Process Power: Are operational processes so embedded that competitors cannot replicate them even with unlimited capital?

PART 2 — MOAT DESTRUCTION SCENARIOS:
For the company's 2 strongest powers, construct a realistic "moat destruction" scenario: what specific technological shift, regulatory change, or competitor action could neutralize each advantage within 5 years? Assign probability (Low/Medium/High) to each scenario.

PART 3 — NICK SLEEP SCALE ECONOMIES SHARED TEST:
Does the company reinvest scale benefits into lower prices for customers (like Costco or Amazon)? Or does it extract those benefits as margins? If the former, describe the flywheel. If the latter, flag it as a moat vulnerability.

PART 4 — COUNTER-POSITIONING THREAT:
Is there a startup or non-traditional competitor currently executing a counter-positioning strategy — offering inferior features at dramatically lower cost — that incumbents cannot respond to without self-cannibalization?

FINAL OUTPUT: Assign a Moat Durability Rating (1–10) and produce a 300-word "Bear Case on the Moat" as if written by a short seller.
```

**Placeholders to fill in:**
- `[COMPANY NAME]` — Example: *"UBER — Uber Technologies"*

---

## 18. Behavioral Finance Bias Auditor

**Best for:** Stress-testing your own investment thesis for cognitive biases before committing capital — modeled on Charlie Munger's mental models and Kahneman's behavioral finance research.

```
You are a behavioral finance specialist trained in Charlie Munger's mental models and Daniel Kahneman's System 1/System 2 thinking. I am sharing my investment thesis for [COMPANY NAME]. Your job is NOT to validate it — your job is to tear it apart by identifying every cognitive bias that may be distorting my judgment.

[PASTE YOUR INVESTMENT THESIS HERE]

BIAS AUDIT — check my thesis for each of the following and flag any that appear present:

1. CONFIRMATION BIAS: Am I only citing evidence that supports my thesis? What is the strongest counter-evidence I am ignoring?
2. AVAILABILITY BIAS: Am I overweighting recent events relative to the long-term base rate?
3. NARRATIVE FALLACY: Is my thesis built on a compelling story rather than quantitative evidence?
4. OVERCONFIDENCE: Am I projecting false precision on inherently uncertain outcomes?
5. ANCHORING: Did I anchor to a prior price target or 52-week high/low when forming my valuation view?
6. ENDOWMENT EFFECT: If I didn't already own this stock, would I buy it at the current price with the same conviction?
7. AUTHORITY BIAS: Am I deferring to a famous investor's position without conducting independent analysis?
8. LOSS AVERSION / SUNK COST: If this is a position I'm holding at a loss, is my desire to "get back to breakeven" distorting my objectivity?
9. BASE RATE NEGLECT: What percentage of companies in this sector/stage/valuation range have actually delivered the outcome I'm forecasting?
10. SOCIAL PROOF / FOMO: Is part of my conviction driven by the fact that the stock is popular on social media or in my peer group?

FINAL CHALLENGE: Play Devil's Advocate. Write a 200-word bear case for this investment as if you were a short seller publishing a public report. Does my thesis adequately address this bear case, or does it have a fatal flaw?
```

**Placeholders to fill in:**
- `[PASTE YOUR INVESTMENT THESIS HERE]` — Write out your full bull case for the stock before submitting.

---

## 19. Options Flow & Derivatives Intelligence Analyst

**Best for:** Identifying potential large institutional positioning or hedging activity ahead of major events; reading the "smart money" via options market signals.

```
You are a derivatives intelligence analyst specializing in reading options market microstructure for signals about institutional positioning. Analyze the current options activity for [TICKER].

PART 1 — IMPLIED VOLATILITY (IV) ANALYSIS:
1. What is the current 30-day implied volatility (IV30) vs. 30-day historical realized volatility (HV30)? Is the options market pricing a significant premium or discount?
2. How does current IV compare to the 52-week IV range? Is it elevated (>75th percentile) or compressed (<25th percentile)?

PART 2 — SKEW & TERM STRUCTURE:
3. Describe the put/call skew: Are puts pricing richer than calls on a volatility basis? This signals institutional hedging or short positioning.
4. Compare near-term (30-day) vs. long-term (90-day) implied volatility. Is the market pricing a specific near-term event?

PART 3 — UNUSUAL ACTIVITY FLAGS:
5. Identify any options contracts with volume/OI ratio exceeding 3x normal.
6. Are there large block trades in out-of-the-money calls or puts? Describe the strikes, expiration, size, and directional bias.
7. Search for covered call selling pressure (large OTM call volume) or put buying (large OTM put volume).

PART 4 — EVENT-DRIVEN POSITIONING:
8. Is there an upcoming earnings date, product launch, trial readout, or regulatory decision within 60 days? What "implied move" is priced in?
9. How does the implied earnings move compare to the stock's historical post-earnings moves?

PART 5 — STRATEGY IMPLICATIONS:
Based on this options intelligence, what is the most rational strategy for:
- A long-term fundamental investor who wants to reduce event risk?
- A trader looking to express a directional view at lower capital outlay?
- A short seller assessing cost and timing of establishing a short position?

Note: This analysis is for educational and research purposes only. Options trading involves substantial risk of loss.
```

**Placeholders to fill in:**
- `[TICKER]` — Example: *"NVDA"*

---

## 20. Supply Chain & Geopolitical Risk Mapper

**Best for:** Evaluating companies with significant international exposure or complex supply chains — critical in an era of deglobalization and tariff escalation.

```
You are a geopolitical risk analyst at a global investment bank, specializing in supply chain vulnerability assessment and cross-border trade risk. Analyze [COMPANY NAME].

PART 1 — SUPPLY CHAIN GEOGRAPHY MAPPING:
1. Where are the company's primary manufacturing facilities, key Tier 1 and Tier 2 suppliers, and major distribution centers located?
2. Identify any single-country or single-supplier dependencies. What percentage of COGS is sourced from high geopolitical risk countries (China, Taiwan, Russia, Middle East)?
3. Does the company have meaningful exposure to Taiwan Strait risk?

PART 2 — TARIFF & TRADE POLICY SENSITIVITY:
4. What is the estimated revenue and margin impact of a 25% tariff on the company's primary imported inputs?
5. Has the company disclosed any tariff mitigation strategies (nearshoring, supplier diversification, tariff engineering)?
6. What percentage of revenue comes from China? From the EU? From emerging markets?

PART 3 — GEOPOLITICAL SCENARIO ANALYSIS:
Run these three scenarios and estimate the P&L impact:
- Scenario A (Baseline): Current tariff levels persist with no escalation.
- Scenario B (Escalation): Full US-China trade war with 60% tariffs. Taiwan production disruption lasting 6 months.
- Scenario C (Détente): Tariff rollbacks and improved trade relations.

PART 4 — SUPPLY CHAIN RESILIENCE SCORE:
Assess on these dimensions (score 1–5 each):
- Geographic diversification of suppliers
- Inventory buffer and safety stock levels
- Speed of supplier substitution
- Digital supply chain visibility
- Financial strength of key suppliers

FINAL VERDICT: Is this company a supply chain WINNER (benefits from reshoring, domestic production) or LOSER (concentrated China/Taiwan exposure)? What "geopolitical risk premium" should be applied to this stock's multiple? Name 2–3 better-positioned alternatives.
```

**Placeholders to fill in:**
- `[COMPANY NAME]` — Example: *"AAPL — Apple Inc."*

---

## 21. Dividend Compounding Machine Screener

**Best for:** Building a portfolio of high-quality dividend growth compounders for long-term wealth accumulation. Identifies the companies that will pay you more every single year.

```
You are a dividend growth investing specialist with 20 years of experience building compounding income portfolios. Analyze [COMPANY NAME / TICKER] for inclusion in a long-term dividend growth portfolio.

PART 1 — DIVIDEND SAFETY ANALYSIS:
1. Current dividend yield vs. 5-year average yield: Is the stock trading at a historically attractive yield?
2. Payout ratio (dividends / earnings): Is it below 60% for cyclical companies, below 75% for stable businesses?
3. Free Cash Flow Payout Ratio (dividends / FCF): Flag if FCF payout exceeds 80%.
4. Dividend Coverage Ratio: How many times does FCF cover the dividend? More than 2x is ideal.

PART 2 — DIVIDEND GROWTH TRACK RECORD:
5. Consecutive years of dividend increases? Classify: Dividend King (50+), Aristocrat (25+), Achiever (10+), Contender (5+).
6. 1-year, 3-year, 5-year, and 10-year Dividend CAGR. Is growth accelerating or decelerating?
7. Has the company ever cut or suspended its dividend? Under what circumstances?

PART 3 — BUSINESS QUALITY SCREEN:
8. Does the company operate in a recession-resistant industry?
9. Return on Equity (ROE) over 10 years: Consistently above 15%?
10. Net debt / EBITDA: Is leverage below 2.5x (3x for utilities/REITs)?

PART 4 — GORDON GROWTH MODEL FAIR VALUE:
Using: Fair Value = Next Year's Dividend ÷ (Discount Rate − Dividend Growth Rate)
- Use a discount rate of [USER INPUT, e.g., 9%]
- Use the sustainable long-term dividend growth rate
- Is the current stock price above or below the Gordon Growth Model fair value?

PART 5 — COMPOUNDING SCENARIO:
If an investor buys $10,000 today with dividends reinvested (DRIP) at the historical dividend growth rate:
- Projected portfolio value in 10 / 20 / 30 years?
- Projected annual dividend income at each milestone?

FINAL RATING: Score this company on the "Dividend Compounding Machine" scale (A+ to F). Give a buy/hold/trim recommendation with the key risk to the dividend.
```

**Placeholders to fill in:**
- `[COMPANY NAME / TICKER]` — Example: *"JNJ — Johnson & Johnson"*
- `[USER INPUT, e.g., 9%]` — Your personal required rate of return

---

## 22. Market Bubble & Mania Historical Pattern Recognizer

**Best for:** Identifying whether a stock, sector, or asset class is in a speculative bubble — before the Minsky Moment arrives.

```
You are a Stock Market Historian with deep knowledge of every major speculative mania from Tulip Mania (1637) through the Dot-com Bubble, the 2008 Financial Crisis, the 2021 SPAC/Meme Stock boom, and the 2024–2026 AI valuation concerns.

I am evaluating [COMPANY / SECTOR / ASSET CLASS] for signs of speculative excess.

PART 1 — MINSKY MOMENT DIAGNOSTIC:
Map the current situation against Hyman Minsky's 5-stage bubble model:
1. Displacement (a new innovation or paradigm captures investor imagination)
2. Boom (prices rise, media attention grows, new investors enter)
3. Euphoria (valuations detach from fundamentals, "this time is different" narrative)
4. Profit Taking (smart money sells, prices wobble but recover)
5. Panic (forced selling, collapse, reversion to or below fair value)

Which stage does the current situation most resemble? Provide evidence.

PART 2 — HISTORICAL ANALOGUE MATCHING:
Identify the closest historical parallel and explain similarities AND differences:
- Dutch Tulip Mania (1637): Scarce assets + FOMO + zero intrinsic value
- South Sea Bubble (1720): Narrative/story stocks with political backing
- 1929 Crash: Excessive leverage + margin debt + speculative frenzy
- Dot-com Bubble (1995–2000): New technology paradigm + profitless growth stocks
- Housing Bubble (2004–2008): Leverage + financial engineering + mispriced risk
- Crypto Bubble (2017, 2021): Digital scarcity narrative + retail FOMO

PART 3 — QUANTITATIVE BUBBLE CHECKLIST:
Score the asset on each dimension (0 = no sign, 1 = mild, 2 = significant):
- Price/Sales or P/E ratio vs. historical average (>3x historical = 2 points)
- Price appreciation >100% in 12 months (2 points)
- IPO or new issuance surge in the sector (1–2 points)
- Retail investor participation surge (Google Trends, Reddit mentions) (1–2 points)
- Leverage surge (margin debt at highs, debt-fueled acquisitions) (1–2 points)
- "This time is different" narrative dominating media (1–2 points)
- Short sellers being squeezed or crowded out (1–2 points)

Total bubble risk score: __/14

PART 4 — INVESTOR SURVIVAL CHECKLIST:
Based on the most analogous historical bubble, generate a 10-item checklist:
- What early warning signs should trigger a partial or full exit?
- What valuation metrics would indicate a return to fair value?
- What behaviors (in myself or the market) would confirm the panic/capitulation phase?

FINAL VERDICT: Is this a bubble, a sector rotation, a growth stock re-rating, or a legitimate new paradigm? Give a probability estimate for each (must sum to 100%) and your recommended portfolio positioning.
```

**Placeholders to fill in:**
- `[COMPANY / SECTOR / ASSET CLASS]` — Example: *"AI infrastructure stocks — NVDA, SMCI, ARM"*

---

## How All 22 Prompts Were Applied

| Decision | Prompt Used |
|----------|-------------|
| Stock screening & selection | Prompt 1 — Goldman Sachs Stock Screener |
| Valuation check on each pick | Prompt 2 — Morgan Stanley DCF Valuation |
| Portfolio risk & allocation | Prompt 3 — Bridgewater Risk Assessment |
| Competitive sector analysis | Prompt 8 — Bain Competitive Analysis |
| Macro tailwinds validation | Prompt 10 — McKinsey Macro Report |
| India stock growth screening | Prompt 11 — Peter Lynch GARP |
| India sector competitive moats | Prompt 17 — Moat Destroyer (7 Powers) |
| India macro tailwinds | Prompt 16 — Macro Regime & Sector Rotation |

---

## Quick Reference — Full Prompt Selector (All 22)

| If you want to... | Use Prompt |
|-------------------|------------|
| Find new stocks to buy | #1 Goldman Sachs Screener |
| Check if a stock is cheap or expensive | #2 Morgan Stanley DCF |
| Understand your portfolio risk | #3 Bridgewater Risk |
| Prepare for earnings season | #4 JPMorgan Earnings |
| Build a portfolio from scratch | #5 BlackRock Builder |
| Time your buy/sell entry | #6 Citadel Technical |
| Generate dividend income | #7 Harvard Dividend |
| Pick the best stock in a sector | #8 Bain Competitive |
| Find hidden patterns in a stock | #9 Renaissance Patterns |
| Adjust for the macro environment | #10 McKinsey Macro |
| Screen for growth at a fair price | #11 Peter Lynch GARP |
| Detect evasion in earnings calls | #12 Earnings Call Red Flag |
| Audit financials for fraud signals | #13 Forensic Accounting Auditor |
| Verify ESG claims / spot greenwashing | #14 ESG Greenwashing Auditor |
| Find cheap + high-quality stocks | #15 Greenblatt Magic Formula |
| Position across the economic cycle | #16 Macro Regime & Sector Rotation |
| Stress-test a company's moat | #17 Moat Destroyer (7 Powers) |
| Audit your thesis for cognitive biases | #18 Behavioral Finance Bias Auditor |
| Read options flow for institutional signals | #19 Options Flow Intelligence |
| Map supply chain and geopolitical risk | #20 Supply Chain Risk Mapper |
| Screen for long-term dividend compounders | #21 Dividend Compounding Machine |
| Detect speculative bubbles and manias | #22 Market Bubble Pattern Recognizer |

---

*Disclaimer: These prompts are for educational and research purposes only. Output from AI models does not constitute financial advice. Always conduct your own due diligence before making investment decisions.*
