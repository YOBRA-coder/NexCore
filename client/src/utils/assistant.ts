import { JOBS, ARTICLES, SERVICES, PROJECTS } from "./data";
import { getTheme, toggleTheme } from "./theme";

export interface Chip {
  label: string;
  path: string;
}

export type ChatAction =
  | { type: "navigate"; path: string; label: string }
  | { type: "chips"; chips: Chip[] };

export interface IntentResult {
  text: string;
  action?: ChatAction;
}

function jobChips(): Chip[] {
  return JOBS.map((j) => ({ label: j.title, path: `/careers/${j.id}` }));
}
function articleChips(): Chip[] {
  return ARTICLES.slice(0, 6).map((a) => ({ label: a.title, path: `/articles/${a.id}` }));
}
function serviceChips(): Chip[] {
  return SERVICES.map((s) => ({ label: s.title, path: "/services" }));
}
function productChips(): Chip[] {
  return PROJECTS.slice(0, 6).map((p) => ({ label: p.name, path: "/products" }));
}

// ─── INTENT MATCHER ─────────────────────────────────────────────
// Returns a deterministic reply+action for things the assistant can
// just DO (navigate, toggle theme, list real data) — instant, no AI
// round-trip needed. Returns null when nothing matches, so the
// caller can fall back to the real AI for open-ended questions.
export function matchIntent(raw: string): IntentResult | null {
  const q = raw.toLowerCase().trim();

  // ── Theme control ──
  if (/\b(dark mode|dark theme|night mode)\b/.test(q)) {
    if (getTheme() !== "dark") toggleTheme();
    return { text: "Done — switched to dark mode. 🌙" };
  }
  if (/\b(light mode|light theme|day mode)\b/.test(q)) {
    if (getTheme() !== "light") toggleTheme();
    return { text: "Done — switched to light mode. ☀️" };
  }
  if (/\b(switch|toggle|change).*(theme|mode)\b/.test(q)) {
    const next = toggleTheme();
    return { text: `Switched to ${next === "dark" ? "dark 🌙" : "light ☀️"} mode.` };
  }

  // ── List real data ──
  if (/\b(job|career|hiring|vacanc|open (role|position)|apply)\b/.test(q)) {
    if (JOBS.length === 0) {
      return {
        text: "No open roles listed right now, but we're always glad to hear from strong engineers, designers, and traders.",
        action: { type: "navigate", path: "/careers", label: "Open Careers →" },
      };
    }
    return {
      text: `We're hiring for ${JOBS.length} role${JOBS.length === 1 ? "" : "s"} right now:`,
      action: { type: "chips", chips: jobChips() },
    };
  }
  if (/\b(article|blog|write.?up|engineering post|read)\b/.test(q)) {
    return {
      text: "Here are a few recent write-ups from our engineering team:",
      action: { type: "chips", chips: articleChips() },
    };
  }

  // ── Navigation ──
  if (/\b(product|portfolio|what have you (built|shipped))\b/.test(q)) {
    return {
      text: `We've shipped ${PROJECTS.length} live/beta products — trading platforms, fintech apps, AI tools, and more.`,
      action: { type: "chips", chips: productChips() },
    };
  }
  if (/\b(service|what do you (build|offer|do))\b/.test(q)) {
    return {
      text: "Here's everything we build, from web apps to trading systems:",
      action: { type: "chips", chips: serviceChips() },
    };
  }
  if (/\b(quote|estimate|proposal|how much)\b/.test(q)) {
    return {
      text: "I can take you straight to our quote form — tell us the scope and budget and we'll reply within 24 hours.",
      action: { type: "navigate", path: "/request-quote", label: "Request a Quote →" },
    };
  }
  if (/\b(contact|reach you|email|talk to (a )?human|talk to (a )?person|call)\b/.test(q)) {
    return {
      text: "Opening the contact form for you — or email hello@yobbytech.com / call +254 726 553 481 directly.",
      action: { type: "navigate", path: "/contact", label: "Open Contact →" },
    };
  }
  if (/\b(about|who are you|your company|nakuru)\b/.test(q)) {
    return {
      text: "We're Yobby Technologies — a full-service digital studio based in Nakuru, Kenya.",
      action: { type: "navigate", path: "/about", label: "Open About →" },
    };
  }
  if (/\b(dashboard)\b/.test(q)) {
    return { text: "Opening the dashboard.", action: { type: "navigate", path: "/dashboard", label: "Open Dashboard →" } };
  }
  if (/\b(home ?page|take me home|go home)\b/.test(q)) {
    return { text: "Heading back home.", action: { type: "navigate", path: "/", label: "Open Home →" } };
  }

  return null;
}
