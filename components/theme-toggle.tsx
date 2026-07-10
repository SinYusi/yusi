"use client";

import { css } from "@/styled-system/css";

const button = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "9",
  height: "9",
  borderRadius: "full",
  borderWidth: "1px",
  borderColor: "border.subtle",
  color: "text.muted",
  cursor: "pointer",
  transition: "background-color 0.15s, color 0.15s",
  _hover: {
    backgroundColor: "bg.subtle",
    color: "text.default",
  },
});

// 아이콘은 `.dark` 클래스 유무에 따라 CSS로 전환한다 (JS 상태 불필요).
const moon = css({ display: "inline-flex", _dark: { display: "none" } });
const sun = css({ display: "none", _dark: { display: "inline-flex" } });

function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  root.style.colorScheme = next ? "dark" : "light";
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {}
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={button}
      aria-label="라이트/다크 테마 전환"
    >
      <span className={moon} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>
      <span className={sun} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>
    </button>
  );
}
