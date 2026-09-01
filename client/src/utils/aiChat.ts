export interface AIChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ─── askAI ──────────────────────────────────────────────────────
// Calls the /api/chat Vercel serverless function, which holds the
// real Anthropic API key server-side (see /api/chat.ts). Falls
// back to a friendly message if the endpoint isn't configured yet
// or the request fails — this happens automatically until
// ANTHROPIC_API_KEY is set in the Vercel project's environment
// variables.
export async function askAI(history: AIChatMessage[]): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-10) }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({} as { error?: string }));
      return (
        err.error ||
        "I couldn't reach the AI service right now — try rephrasing, or email hello@yobbytech.com."
      );
    }

    const data = (await res.json()) as { reply?: string };
    return data.reply?.trim() || "Hmm, I didn't get a reply — try rephrasing?";
  } catch {
    return "I'm having trouble connecting right now — try again in a moment, or email hello@yobbytech.com.";
  }
}
