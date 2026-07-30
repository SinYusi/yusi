import Link from "next/link";
import { css } from "@/styled-system/css";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/blog", label: "블로그" },
  { href: "/notes", label: "노트" },
  { href: "/daily-log", label: "데일리 로그" },
  { href: "/about", label: "소개" },
];

const header = css({
  borderBottomWidth: "1px",
  borderColor: "border.subtle",
});

const inner = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  height: "16",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const logo = css({
  fontSize: "lg",
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
});

const nav = css({
  display: "flex",
  alignItems: "center",
  gap: { base: "4", md: "5" },
});

const navLink = css({
  fontSize: "sm",
  color: "text.muted",
  transition: "color 0.15s",
  _hover: { color: "text.default" },
});

export function SiteHeader() {
  return (
    <header className={header}>
      <div className={inner}>
        <Link href="/" className={logo}>
          yusi
        </Link>
        <nav className={nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLink}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
