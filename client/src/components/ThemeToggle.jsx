import React from "react";
import { Moon, Sun } from "lucide-react";

// This button owns the theme switch for the whole frontend.
// It stores the selected theme in localStorage, then adds/removes the "dark"
// class on the <html> element so every Tailwind dark: class can react to it.
const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((currentTheme) => !currentTheme)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed right-4 top-4 z-[120] flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-slate-800 shadow-lg shadow-slate-300/40 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 dark:border-white/10 dark:bg-slate-900/85 dark:text-amber-200 dark:shadow-black/40"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
};

export default ThemeToggle;
