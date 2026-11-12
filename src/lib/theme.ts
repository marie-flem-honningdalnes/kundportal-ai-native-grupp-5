export const themes = [
  { id: "propeller", label: "Propeller" },
  { id: "rose", label: "Rosé" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const defaultTheme: ThemeId = themes[0].id;

const themeIds: readonly string[] = themes.map((theme) => theme.id);
const cookiePattern = /(?:^|; )theme=([^;]*)/;

export function readThemeCookie(cookie: string): ThemeId {
  const value = cookie.match(cookiePattern)?.[1];
  return value && themeIds.includes(value) ? (value as ThemeId) : defaultTheme;
}

export function themeCookie(theme: ThemeId) {
  return `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

// Runs in <head> before the first paint, so a saved theme never flashes the default one.
export const themeScript = `(function(){try{var m=document.cookie.match(${cookiePattern});if(m&&${JSON.stringify(themeIds)}.indexOf(m[1])>-1)document.documentElement.setAttribute("data-theme",m[1])}catch(e){}})()`;
