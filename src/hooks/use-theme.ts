import { useState, useEffect } from "react";
import type { Theme } from "@/types/common";
import { STORAGE_KEYS } from "@/lib/constants";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
    return stored === "light" ? "light" : "dark"; // ✅ default dark
  });

  const isDark = theme === "dark";

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.add("dark");
      body.classList.remove("bg-gray-50", "text-gray-900");
      body.classList.add("bg-[#1f1816]", "text-white");
    } else {
      root.classList.remove("dark");
      body.classList.remove("bg-[#1f1816]", "text-white");
      body.classList.add("bg-gray-50", "text-gray-900");
    }
  }, [isDark]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  return {
    theme,
    setTheme,
    isDark,
    toggle: () => setTheme(isDark ? "light" : "dark"),
  };
}
