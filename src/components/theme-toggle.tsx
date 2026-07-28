"use client";

const STORAGE_KEY = "theme";

/**
 * Runs before paint so a stored theme is applied without a flash.
 * Deliberately a raw script tag — a React effect is too late.
 */
export function ThemeScript() {
  const js = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

/**
 * No React state: which label shows is decided in CSS from the active theme,
 * so the server and client render identical markup and there is nothing to
 * hydrate or flash.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the theme just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="font-mono text-sm text-fg-muted hover:text-fg transition-colors"
    >
      <span className="when-light">dark</span>
      <span className="when-dark">light</span>
    </button>
  );
}
