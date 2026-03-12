import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customConfig: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  coverageProvider: "v8",
  collectCoverageFrom: [
    "lib/**/*.ts",
    "components/ui/**/*.{ts,tsx}",   // fully tested UI primitives
    "hooks/**/*.ts",
    "app/api/**/*.ts",
    // Exclude large page-level components tested via E2E / Playwright
    "!components/stocks/**",
    "!components/charts/**",
    "!components/crypto/**",
    "!components/layout/**",
    "!components/widgets/**",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 70,
      functions: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

export default createJestConfig(customConfig);
