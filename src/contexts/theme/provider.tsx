import { useState, useEffect } from "react";
import { ThemeContext } from "./context";
import type { Theme, ThemeProviderProps } from "./types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, default to system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      if (
        stored &&
        (stored === "light" || stored === "dark" || stored === "system")
      ) {
        return stored;
      }
    }
    return "system"; // Default to system preference
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
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

      let shouldBeDark = false;

      if (theme === "dark") {
        shouldBeDark = true;
      } else if (theme === "light") {
        shouldBeDark = false;
      } else if (theme === "system") {
        shouldBeDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }

      document.documentElement.classList.toggle("dark", shouldBeDark);
    };

    // Apply theme immediately
    applyTheme();

    // Save theme preference to localStorage
    if (theme === "light") {
      localStorage.theme = "light";
    } else if (theme === "dark") {
      localStorage.theme = "dark";
    } else if (theme === "system") {
      localStorage.removeItem("theme");
    }

    // Listen for system theme changes when using system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeDirectly }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
