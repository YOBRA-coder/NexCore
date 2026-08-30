import { useState, useRef, useEffect } from "react";

// ─── TYPES ────────────────────────────────────────────────────
export type Page = "home" | "dashboard" | "services" | "products" | "articles" | "about" | "contact";

export interface Project {
  id: string; name: string; category: string; status: "live" | "beta" | "dev";
  tagline: string; description: string; stats: { label: string; value: string }[];
  tags: string[]; accent: string; icon: string; gradient: string; image: string; url?: string;
}
export interface Service {
  icon: string; title: string; subtitle: string; description: string;
  features: string[]; accent: string; price: string;
}
export interface Article {
  id: string; title: string; excerpt: string; category: string;
  date: string; readTime: string; featured: boolean; accent: string; image: string; content: string;
  author?: string; authorRole?: string;
}
export interface Job {
  id: string; title: string; department: string; type: string; location: string;
  level: string; accent: string; icon: string; description: string;
  responsibilities: string[]; requirements: string[]; posted: string;
}
// ─── UTILS ────────────────────────────────────────────────────
export const statusMeta = (s: string) => ({ live: { l: "Live", c: "#00e5b4" }, beta: { l: "Beta", c: "#f5a623" }, dev: { l: "In Dev", c: "#6366f1" } }[s] || { l: s, c: "#888" });

export function useCounter(target: number) {
  const [val, setVal] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let v = 0; const step = target / (1800 / 16);
    const t = setInterval(() => { v = Math.min(v + step, target); setVal(Math.floor(v)); if (v >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [go, target]);
  return { val, ref };
}

// ─── ENGAGEMENT (like / rate) ────────────────────────────────
export function useProjectEngagement(id: string, baseLikes = 0) {
  const likeKey = `yb_like_${id}`;
  const rateKey = `yb_rate_${id}`;
  const [liked, setLiked] = useState<boolean>(() => {
    try { return localStorage.getItem(likeKey) === "1"; } catch { return false; }
  });
  const [likes, setLikes] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(likeKey + "_n");
      if (stored) return parseInt(stored, 10);
    } catch { /* noop */ }
    return baseLikes;
  });
  const [rating, setRating] = useState<number>(() => {
    try { return parseInt(localStorage.getItem(rateKey) || "0", 10); } catch { return 0; }
  });

  const toggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      const nextCount = Math.max(0, likes + (next ? 1 : -1));
      setLikes(nextCount);
      try {
        localStorage.setItem(likeKey, next ? "1" : "0");
        localStorage.setItem(likeKey + "_n", String(nextCount));
      } catch { /* noop */ }
      return next;
    });
  };

  const rate = (stars: number) => {
    setRating(stars);
    try { localStorage.setItem(rateKey, String(stars)); } catch { /* noop */ }
  };

  return { liked, likes, rating, toggleLike, rate };
}

/**headers: [
  {
    source: "/(.*)",
    headers: [
      {
        key: "X-Frame-Options",
        value: "ALLOWALL",
      },
    ],
  },
] */