import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ai } from "@/lib/ai";
import { buildPromoPrompt } from "@/lib/prompts";
import { buildInterstInsights } from "@/lib/analytics";

export async function GET() {
  try {
    const customers = await db.customer.findMany({
      select: {
        interests: true,
      },
    });

    if (customers.length === 0) {
      return NextResponse.json(
        { error: "No Customers found to analyze" },
        { status: 400 },
      );
    }

    const topInterests = buildInterstInsights(customers);
    const prompt = buildPromoPrompt(topInterests);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;
    if (!raw) {
      return NextResponse.json(
        { error: "AI returned empty response" },
        { status: 500 },
      );
    }
    let themes;

    try {
      themes = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid response" },
        { status: 500 },
      );
    }
    return NextResponse.json({ themes });
  } catch (error) {
    console.error("Promo Error:", error);
    return NextResponse.json(
      { error: "Failed to generate promo ideas" },
      { status: 500 },
    );
  }
}
