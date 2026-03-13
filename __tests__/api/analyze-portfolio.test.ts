/**
 * @jest-environment node
 */
import { POST } from "@/app/api/analyze-portfolio/route";
import { NextRequest } from "next/server";

// Mock Anthropic SDK — __esModule:true so `import Anthropic from` resolves to `default`
jest.mock("@anthropic-ai/sdk", () => {
  const mockCreate = jest.fn();
  const MockAnthropic = jest.fn().mockImplementation(() => ({
    messages: { create: mockCreate },
  }));
  // Attach mockCreate to the constructor so tests can reference it
  (MockAnthropic as jest.Mock & { _create: jest.Mock })._create = mockCreate;
  return { __esModule: true, default: MockAnthropic };
});

import Anthropic from "@anthropic-ai/sdk";
// Access the shared mockCreate from the mock constructor
const getMockCreate = () =>
  ((Anthropic as unknown as { _create: jest.Mock })._create);

const ORIGINAL_API_KEY = process.env.ANTHROPIC_API_KEY;

beforeEach(() => {
  getMockCreate().mockReset();
  process.env.ANTHROPIC_API_KEY = "test-key";
});

afterAll(() => {
  process.env.ANTHROPIC_API_KEY = ORIGINAL_API_KEY;
});

function makeImageReq(
  content = '[{"ticker":"AAPL","quantity":3,"price":255.9,"value":767.7}]',
  fileType = "image/png"
) {
  getMockCreate().mockResolvedValue({
    content: [{ type: "text", text: content }],
  });
  const blob = new Blob(["fake-image"], { type: fileType });
  const file = new File([blob], "portfolio.png", { type: fileType });
  const fd = new FormData();
  fd.append("image", file);
  return new NextRequest("http://localhost/api/analyze-portfolio", {
    method: "POST",
    body: fd,
  });
}

describe("POST /api/analyze-portfolio", () => {
  it("returns 503 when ANTHROPIC_API_KEY is missing", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const res = await POST(makeImageReq());
    expect(res.status).toBe(503);
    expect((await res.json()).error).toMatch(/ANTHROPIC_API_KEY/);
  });

  it("returns 400 when no image is provided", async () => {
    const req = new NextRequest("http://localhost/api/analyze-portfolio", {
      method: "POST",
      body: new FormData(),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/No image/);
  });

  it("returns 400 for unsupported file type", async () => {
    const blob = new Blob(["data"], { type: "application/pdf" });
    const fd = new FormData();
    fd.append("image", new File([blob], "p.pdf", { type: "application/pdf" }));
    const req = new NextRequest("http://localhost/api/analyze-portfolio", {
      method: "POST", body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/Unsupported/);
  });

  it("returns parsed holdings on success", async () => {
    const res = await POST(makeImageReq(
      '[{"ticker":"AAPL","quantity":3.04,"price":255.9,"value":777.94},{"ticker":"VOO","quantity":1.01,"price":612.92,"value":619.05}]'
    ));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.holdings).toHaveLength(2);
    expect(json.holdings[0].ticker).toBe("AAPL");
    expect(json.holdings[1].ticker).toBe("VOO");
  });

  it("strips markdown fences from Claude response", async () => {
    const res = await POST(makeImageReq(
      "```json\n[{\"ticker\":\"MSFT\",\"quantity\":2,\"price\":400,\"value\":800}]\n```"
    ));
    expect(res.status).toBe(200);
    expect((await res.json()).holdings[0].ticker).toBe("MSFT");
  });

  it("uppercases tickers", async () => {
    const res = await POST(makeImageReq(
      '[{"ticker":"aapl","quantity":5,"price":256,"value":1280}]'
    ));
    expect(res.status).toBe(200);
    expect((await res.json()).holdings[0].ticker).toBe("AAPL");
  });

  it("filters out zero-quantity holdings", async () => {
    const res = await POST(makeImageReq(
      '[{"ticker":"AAPL","quantity":3,"price":256,"value":768},{"ticker":"BAD","quantity":0,"price":100,"value":0}]'
    ));
    const json = await res.json();
    expect(json.holdings).toHaveLength(1);
    expect(json.holdings[0].ticker).toBe("AAPL");
  });

  it("returns 422 when Claude returns invalid JSON", async () => {
    const res = await POST(makeImageReq("Sorry, I cannot read this image."));
    expect(res.status).toBe(422);
    expect((await res.json()).error).toMatch(/parse/i);
  });

  it("returns 422 when Claude returns an empty array", async () => {
    const res = await POST(makeImageReq("[]"));
    expect(res.status).toBe(422);
    expect((await res.json()).error).toMatch(/No holdings/i);
  });

  it("returns 500 when Claude API throws", async () => {
    getMockCreate().mockRejectedValue(new Error("Anthropic API error"));
    const blob = new Blob(["data"], { type: "image/png" });
    const fd = new FormData();
    fd.append("image", new File([blob], "p.png", { type: "image/png" }));
    const req = new NextRequest("http://localhost/api/analyze-portfolio", {
      method: "POST", body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/Failed to analyze/);
  });
});
