// POST /api/chat — Vercel serverless function (auto-deployed from client/api/).
//
// Keeps the Gemini API key server-side. Requires an environment
// variable set in your Vercel project:
//   Project → Settings → Environment Variables → GEMINI_API_KEY
//
// Without that variable set, this returns a clear 500 error instead
// of failing silently — the chat widget shows that message to the
// visitor and keeps working for everything else (navigation, theme,
// job/article listings all run without this endpoint).

const SYSTEM_PROMPT = `You are the Yobby Assistant, the on-site AI for Yobby Technologies (yobbytech.com), a full-service digital studio based in Nakuru, Kenya.

What you help visitors with:
- Explaining services: Web Development, Android Development, AI & Machine Learning, Trading Bot Systems, UI/UX & Graphic Design, Risk & Signal Systems, Cloud & DevOps, Data & Analytics.
- Rough starting prices: Web from $400, Android from $600, AI/ML from $800, Trading bots from $800, Design from $200, Cloud/DevOps from $300, Data/Analytics from $350, Risk systems from $500. Always frame these as starting points, not fixed quotes.
- Scoping out a visitor's project idea: ask 1-2 clarifying questions if the idea is vague, then suggest a short feature list, which service category fits, and a realistic timeline (most projects run 2-6 weeks).
- Pointing people to: /careers for open roles, /articles for engineering write-ups, /request-quote for a formal quote, /contact to reach the team directly.
- Direct contact: hello@yobbytech.com, +254 726 553 481.

Tone: concise, warm, confident — never robotic or salesy. Keep replies under ~80 words unless someone is asking for a detailed project scope, in which case short bullet points are fine. Never invent client names, case studies, or guarantees. If asked something unrelated to Yobby Technologies, answer briefly and helpfully like any knowledgeable assistant would, without forcing it back to a sales pitch.`;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Switched from Anthropic to Gemini API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "The AI assistant isn't fully set up yet — a GEMINI_API_KEY needs to be added in the Vercel project settings.",
    });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages: IncomingMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      res.status(400).json({ error: "No message provided." });
      return;
    }
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

const geminiRes = await fetch(geminiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": apiKey // Key moves here
  },
  body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          maxOutputTokens: 400,
        }
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      res.status(502).json({ error: "The AI service didn't respond — please try again." });
      return;
    }

    const data = await geminiRes.json();

    // Extract text safely from Gemini response structure
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    res.status(200).json({ reply: text || "Sorry, I couldn't generate a reply — try rephrasing?" });
  } catch (err) {
    console.error("chat handler error:", err);
    res.status(500).json({ error: "Something went wrong on our end." });
  }
}
