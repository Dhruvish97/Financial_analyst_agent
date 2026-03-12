// Shared mock instance — referenced by all modules that import yahoo-finance2
const mockInstance = {
  quote: jest.fn(),
  chart: jest.fn(),
};

const MockYahooFinance = jest.fn().mockImplementation(() => mockInstance);

// Expose the shared instance so tests can configure it
(MockYahooFinance as jest.Mock & { __instance: typeof mockInstance }).__instance =
  mockInstance;

export default MockYahooFinance;
