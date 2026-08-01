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
  // This route makes a paid Anthropic vision call per request. It is disabled by
  // default so a public deployment cannot be used to drain the owner's API credits.
  // Set ADVISOR_ENABLED=true (alongside ANTHROPIC_API_KEY) to turn it on.
  if (process.env.ADVISOR_ENABLED !== "true") {
    return NextResponse.json(
      {
        error:
          "Portfolio analysis is disabled on this deployment. Run locally with ADVISOR_ENABLED=true and ANTHROPIC_API_KEY set to use this feature.",
      },
      { status: 503 }
    );
  }

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
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported image format. Use PNG, JPG, GIF, or WebP." },
        { status: 400 }
      );
    }

    // 4 MB — Vercel caps request bodies around 4.5 MB and the Anthropic API rejects
    // base64 images over 5 MB, so a higher limit would only fail on the paid path.
    const MAX_BYTES = 4 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image too large. Please use a screenshot under 4 MB." },
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

    const first = message.content[0];
    const raw = first?.type === "text" ? first.text.trim() : "";

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

    // Sanitise. The model output is attacker-influencable (a crafted screenshot can
    // contain arbitrary text), so every field is coerced, range-checked, and the
    // array length is capped before anything downstream sees it.
    const finiteOrNull = (v: unknown): number | null => {
      if (v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const sanitised: DetectedHolding[] = holdings
      .slice(0, 200)
      .map((h) => ({
        ticker: String(h.ticker ?? "").toUpperCase().trim(),
        quantity: finiteOrNull(h.quantity) ?? 0,
        price: finiteOrNull(h.price),
        value: finiteOrNull(h.value),
      }))
      .filter((h) => /^[A-Z0-9.\-]{1,12}$/.test(h.ticker) && h.quantity > 0);

    return NextResponse.json({ holdings: sanitised });
  } catch (err) {
    // Log the detail server-side only — upstream SDK errors can disclose API key
    // state, quota, and request IDs, so the client gets a fixed message.
    console.error("[analyze-portfolio] Claude API error:", err);
    return NextResponse.json(
      { error: "Failed to analyze image." },
      { status: 500 }
    );
  }
}
