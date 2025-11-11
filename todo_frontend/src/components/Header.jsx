import React from "react";

// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme }) {
  /** App header with title and theme toggle button. */
  return (
    <header className="app-header" role="banner" aria-label="Application Header">
      <h1 className="title">Tasks</h1>
      <button
        type="button"
        className="theme-toggle-btn"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}
