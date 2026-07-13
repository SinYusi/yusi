import type { ReactNode } from "react";
import { css } from "@/styled-system/css";

const section = css({ marginTop: { base: "10", md: "12" } });

const label = css({
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.muted",
  letterSpacing: "0.04em",
  marginBottom: "5",
});

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={section}>
      <h2 className={label}>{title}</h2>
      {children}
    </section>
  );
}
