import Link from "next/link";
import { css } from "@/styled-system/css";
import { profile } from "../_data";

const role = css({
  fontSize: "sm",
  color: "accent.text",
  letterSpacing: "0.02em",
  marginBottom: "3",
});

const name = css({
  fontSize: { base: "3xl", md: "4xl" },
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
  marginBottom: "4",
});

const nameEn = css({ fontSize: "md", fontWeight: "normal", color: "text.muted", marginLeft: "2" });

const intro = css({
  fontSize: { base: "md", md: "lg" },
  lineHeight: "1.7",
  color: "text.muted",
  marginBottom: "4",
});

const meta = css({ fontSize: "sm", color: "text.muted", marginBottom: "6" });

const chips = css({ display: "flex", flexWrap: "wrap", gap: "2" });

const chip = css({
  fontSize: "xs",
  color: "accent.text",
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l1",
  paddingX: "2.5",
  paddingY: "1.5",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "bg.subtle" },
});

export function Intro() {
  return (
    <header>
      <p className={role}>{profile.role}</p>
      <h1 className={name}>
        {profile.name}
        <span className={nameEn}>{profile.nameEn}</span>
      </h1>
      <p className={intro}>{profile.intro}</p>
      <p className={meta}>
        {profile.education} · {profile.location}
      </p>
      <div className={chips}>
        {profile.contacts.map((c) =>
          c.external ? (
            <a
              key={c.label}
              className={chip}
              href={c.href}
              {...(c.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {c.value}
            </a>
          ) : (
            <Link key={c.label} className={chip} href={c.href}>
              {c.value}
            </Link>
          ),
        )}
      </div>
    </header>
  );
}
