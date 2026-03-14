import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { DetectedHolding } from "@/lib/portfolio-analysis";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EXTRACT_PROMPT = `You are a financial data extractor. Analyze this portfolio screenshot and extract every stock/ETF holding visible.

Return ONLY a valid JSON array. No explanation, no markdown, no code fences — just the raw JSON array.

Format:
[{"ticker":"AAPL","quantity":3.0365,"price":255.90,"value":777.94}]

Rules:
- ticker: stock symbol in UPPERCASE (e.g. "AAPL", "VOO", "BND")
- quantity: number of shares as a float (never null)
- price: price per share as a float, or null if not shown
- value: total position dollar value as a float, or null if not shown
- Include ALL positions — equities, ETFs, REITs
- Do NOT include cash rows, totals, headers, or index lines
- If you see a partial ticker (e.g. "GOOGL CLASS A"), use just the ticker symbol`;

export async function POST(req: NextRequest) {
  // Require API key
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured on this server." },
      { status: 503 }
    );
  }

  let imageBase64: string;
  let mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp";

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported image format. Use PNG, JPG, GIF, or WebP." },
        { status: 400 }
      );
    }

    const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image too large. Please use a screenshot under 10 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    imageBase64 = Buffer.from(bytes).toString("base64");
    mediaType = file.type as typeof mediaType;
  } catch {
    return NextResponse.json({ error: "Failed to read image." }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: imageBase64 },
            },
            { type: "text", text: EXTRACT_PROMPT },
          ],
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";

    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    let holdings: DetectedHolding[];
    try {
      holdings = JSON.parse(cleaned);
    } catch {
      console.error("[analyze-portfolio] Failed to parse Claude response:", raw);
      return NextResponse.json(
        { error: "Could not parse holdings from the image. Try a clearer screenshot." },
        { status: 422 }
      );
    }

    if (!Array.isArray(holdings) || holdings.length === 0) {
      return NextResponse.json(
        { error: "No holdings detected. Try a screenshot that clearly shows ticker symbols." },
        { status: 422 }
      );
    }

    // Sanitise: ensure correct types
    const sanitised: DetectedHolding[] = holdings.map((h) => ({
      ticker: String(h.ticker ?? "").toUpperCase().trim(),
      quantity: Number(h.quantity ?? 0),
      price: h.price !== null && h.price !== undefined ? Number(h.price) : null,
      value: h.value !== null && h.value !== undefined ? Number(h.value) : null,
    })).filter((h) => h.ticker.length > 0 && h.quantity > 0);

    return NextResponse.json({ holdings: sanitised });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[analyze-portfolio] Claude API error:", message);
    return NextResponse.json(
      { error: `Failed to analyze image: ${message}` },
      { status: 500 }
    );
  }
}
