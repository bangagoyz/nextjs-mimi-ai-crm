import { db } from "@/lib/db";
import { buildInterestInsights } from "@/lib/insights";
import { buildPromoPrompt } from "@/lib/prompts";
import { openrouter } from "@/lib/ai";

export async function GET() {
  try {
    const customers = await db.customer.findMany();

    const insights = buildInterestInsights(customers);

    const prompt = buildPromoPrompt(insights);

    const completion = await openrouter.chat.completions.create({
      model: "arcee-ai/trinity-large-preview:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content;

    let themes;

    try {
      themes = JSON.parse(raw || "{}");
    } catch {
      return Response.json({
        error: "AI returned invalid response",
      });
    }

    return Response.json({ themes });
  } catch (err) {
    console.error("Promo Error:", err);

    return Response.json({ error: "Failed generating promo" }, { status: 500 });
  }
}
