import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { type Theme, getTheme, toggleTheme as toggleThemeShared, onThemeChange, getInitialTheme } from "../utils/theme";

// Re-exported for main.tsx's initial `data-theme` set on the <html> element.
export { getInitialTheme };

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  useEffect(() => {
    // Keep this button's icon in sync even when the theme is changed
    // elsewhere (e.g. the Yobby Assistant chat widget).
    return onThemeChange(setThemeState);
  }, []);

  const toggle = () => setThemeState(toggleThemeShared());

  return (
    <button
      onClick={toggle}
      className={`theme-toggle${compact ? " theme-toggle-compact" : ""}`}
      aria-label="Toggle light/dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-track">
        <motion.span
          className="theme-toggle-thumb"
          animate={{ x: theme === "dark" ? 0 : compact ? 18 : 22 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <Moon size={compact ? 11 : 12} fill="currentColor" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <Sun size={compact ? 11 : 12} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>
    </button>
  );
}

export default ThemeToggle;
