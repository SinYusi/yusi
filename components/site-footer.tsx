import Link from "next/link";
import { css } from "@/styled-system/css";

const links = [
  { label: "GitHub", href: "https://github.com/SinYusi", external: true },
  { label: "Email", href: "mailto:yusi4781@naver.com", external: true },
  { label: "Blog", href: "/blog", external: false },
];

const footer = css({
  borderTopWidth: "1px",
  borderColor: "border.subtle",
  marginTop: "auto",
});

const inner = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingY: "8",
  display: "flex",
  flexDirection: { base: "column", sm: "row" },
  alignItems: { base: "flex-start", sm: "center" },
  justifyContent: "space-between",
  gap: "4",
});

const nav = css({ display: "flex", gap: "4" });

const link = css({
  fontSize: "sm",
  color: "text.muted",
  transition: "color 0.15s",
  _hover: { color: "text.default" },
});

const copyright = css({ fontSize: "xs", color: "text.muted" });

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={footer}>
      <div className={inner}>
        <nav className={nav}>
          {links.map((l) =>
            l.external ? (
              <a
                key={l.label}
                className={link}
                href={l.href}
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} className={link} href={l.href}>
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <p className={copyright}>© {year} yusi</p>
      </div>
    </footer>
  );
}
