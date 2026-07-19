"use client";

import { css } from "@/styled-system/css";

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "24", md: "32" },
  paddingBottom: { base: "24", md: "32" },
  textAlign: "center",
});

const title = css({
  fontSize: "xl",
  fontWeight: "medium",
  color: "text.default",
  marginBottom: "2",
});

const description = css({ fontSize: "sm", color: "text.muted", marginBottom: "8" });

const retry = css({
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.default",
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l2",
  paddingX: "5",
  paddingY: "2.5",
  cursor: "pointer",
  background: "none",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "bg.subtle" },
});

export default function DailyLogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={section}>
      <h1 className={title}>기록을 불러오지 못했어요</h1>
      <p className={description}>
        일시적인 문제일 수 있습니다. 잠시 후 다시 시도해주세요.
      </p>
      <button type="button" className={retry} onClick={reset}>
        다시 시도
      </button>
    </main>
  );
}
