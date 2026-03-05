import { openrouter } from "@/lib/ai";
import { authMiddleware } from "@/lib/auth";

export async function POST(req: Request) {
  const auth = authMiddleware(req);

  if (auth.error) {
    return new Response(auth.error, { status: 401 });
  }

  try {
    const { message } = await req.json();

    const completion = await openrouter.chat.completions.create({
      model: "arcee-ai/trinity-large-preview:free",
      messages: [
        {
          role: "system",
          content: `
            your name is Mimi, You are an AI marketing assistant for a coffee shop CRM.

            Rules:
            - Respond briefly (1–3 sentences unless user asks for details).
            - If the user greets you (hi, hello, halo), greet back briefly and ask them what help do they need.
            - Only give marketing ideas when the user asks for them.
            - Keep answers simple and friendly.
            `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content ?? "No response";

    return Response.json({ reply });
  } catch (error) {
    {
      error: "Failed to generate reply";
    }
    {
      status: 500;
    }
  }
}
