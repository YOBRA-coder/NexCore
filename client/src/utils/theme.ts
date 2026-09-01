export type Theme = "light" | "dark";

const THEME_KEY = "yb_theme";
const THEME_EVENT = "yb-theme-change";

export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* noop */
  }
  return "light";
}

// Back-compat alias used by ThemeToggle.tsx
export const getInitialTheme = getTheme;

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

/** Subscribe to theme changes triggered from anywhere (e.g. the chat assistant). */
export function onThemeChange(cb: (theme: Theme) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Theme>).detail);
  window.addEventListener(THEME_EVENT, handler);
  return () => window.removeEventListener(THEME_EVENT, handler);
}
