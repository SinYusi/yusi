import { css } from "@/styled-system/css";

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "24", md: "32" },
  paddingBottom: { base: "24", md: "32" },
});

const title = css({
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
  marginBottom: "3",
});

const description = css({
  fontSize: "md",
  lineHeight: "1.7",
  color: "text.muted",
});

export function ComingSoon({
  title: heading,
  description: desc,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className={section}>
      <h1 className={title}>{heading}</h1>
      <p className={description}>{desc}</p>
    </main>
  );
}
