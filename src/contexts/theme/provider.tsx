import { useState, useEffect } from "react";
import { ThemeContext } from "./context";
import type { Theme, ThemeProviderProps } from "./types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      if (stored && (stored === "light" || stored === "dark")) {
        return stored;
      }
      // Default to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark"; // Default fallback
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setThemeDirectly = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // Apply theme following official Tailwind CSS documentation approach
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTheme = () => {
      // Remove existing theme classes
      document.documentElement.classList.remove("dark");

      const shouldBeDark = theme === "dark";
      document.documentElement.classList.toggle("dark", shouldBeDark);
    };

    // Apply theme immediately
    applyTheme();

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeDirectly }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
