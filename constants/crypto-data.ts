import { CryptoHolding } from "@/types/portfolio";

export const CRYPTO_PORTFOLIO: CryptoHolding[] = [
  {
    ticker: "BTC-USD",
    displayTicker: "BTC",
    name: "Bitcoin",
    allocation: 40,
    rationale: "Digital gold with institutional adoption via spot ETF approval, halving supply dynamics, and increasing regulatory clarity. The macro cycle anchor of any crypto portfolio.",
    color: "#f7931a",
  },
  {
    ticker: "ETH-USD",
    displayTicker: "ETH",
    name: "Ethereum",
    allocation: 25,
    rationale: "Dominant smart contract platform. EIP-4844 dramatically reduces L2 fees; staking yield provides an income component with ~4% APY on top of price appreciation.",
    color: "#627eea",
  },
  {
    ticker: "SOL-USD",
    displayTicker: "SOL",
    name: "Solana",
    allocation: 15,
    rationale: "High-throughput L1 with explosive DeFi and consumer app growth. The Firedancer validator client upgrade significantly improves reliability and positions SOL as Ethereum's main rival.",
    color: "#9945ff",
  },
  {
    ticker: "AVAX-USD",
    displayTicker: "AVAX",
    name: "Avalanche",
    allocation: 8,
    rationale: "Subnet architecture enables enterprise and gaming blockchain deployments. Evergreen subnets are attracting institutional DeFi and real-world asset tokenization projects.",
    color: "#e84142",
  },
  {
    ticker: "LINK-USD",
    displayTicker: "LINK",
    name: "Chainlink",
    allocation: 7,
    rationale: "Critical oracle infrastructure powering the entire DeFi ecosystem. CCIP cross-chain protocol and a SWIFT partnership position it at the center of institutional blockchain adoption.",
    color: "#375bd2",
  },
  {
    ticker: "INJ-USD",
    displayTicker: "INJ",
    name: "Injective",
    allocation: 5,
    rationale: "High-performance DeFi-native L1 with on-chain derivatives and prediction markets. Aggressive token burn mechanics and ecosystem growth make it a high-upside small-cap bet.",
    color: "#00c2ff",
  },
];

export const CRYPTO_TICKERS = CRYPTO_PORTFOLIO.map((c) => c.ticker);
