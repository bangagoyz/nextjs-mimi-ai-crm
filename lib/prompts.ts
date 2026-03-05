export function buildPromoPrompt(
  topInterests: { interest: string; count: number }[],
) {
  return `
You are a marketing strategist for a modern coffee shop.

Customer interest insights:
${topInterests.map((i) => `- ${i.interest}: ${i.count} customers`).join("\n")}

Your task:
Generate 3 weekly promotional campaign ideas.

Each idea must include:
- theme
- segment
- why_now
- message
- best_time_window

Important rules:
- Respond ONLY with valid JSON
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include code blocks
- Output must be a JSON array
- the language mainly used in the message should be Indonesian, but you can include some English words if it makes the message more natural and engaging.
- for theme, just use english words, no need to translate to Indonesian

Schema:

[
 {
  "theme": "string",
  "segment": "string",
  "why_now": "string",
  "message": "string",
  "best_time_window": "string"
 }
]

Example:

[
 {
  "theme": "Caramel Week",
  "segment": "Customers interested in caramel drinks (70 customers)",
  "why_now": "Caramel drinks are trending this month among sweet drink lovers",
  "message": "Hi! Our new Caramel Cold Brew is here this week—get 10% off till Sunday. Mau coba besok pagi?",
  "best_time_window": "Morning rush"
 }
]

Now generate the ideas.
`;
}
