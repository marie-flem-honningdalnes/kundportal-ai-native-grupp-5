"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { defaultTheme, readThemeCookie, themeCookie, themes, type ThemeId } from "@/lib/theme";

const changeEvent = "themechange";

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  return () => window.removeEventListener(changeEvent, onChange);
}

// The server always renders the default; the saved theme comes from the cookie after hydration.
const getSnapshot = () => readThemeCookie(document.cookie);
const getServerSnapshot = () => defaultTheme;

function saveTheme(theme: ThemeId) {
  document.cookie = themeCookie(theme);
  window.dispatchEvent(new Event(changeEvent));
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Also re-applies the attribute after React's dev remount clears what the inline script set.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Theme</legend>
      <div className="flex rounded-full border-2 border-ink/15 bg-canvas p-0.5">
        {themes.map((option) => (
          <label key={option.id} className="cursor-pointer">
            <input
              type="radio"
              name="theme"
              value={option.id}
              checked={theme === option.id}
              onChange={() => saveTheme(option.id)}
              className="peer sr-only"
            />
            <span className="block rounded-full px-3 py-1 text-xs font-semibold text-ink/70 peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
