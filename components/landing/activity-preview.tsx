import Link from "next/link";
import { css } from "@/styled-system/css";
import { ContributionGraph } from "@/components/daily-log/contribution-graph";
import type { GridDay, Stats } from "@/lib/daily-log/stats";

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: "8",
  paddingBottom: { base: "16", md: "20" },
  borderTopWidth: "1px",
  borderColor: "border.subtle",
});

const header = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "3",
  marginBottom: "4",
});

const titleGroup = css({
  display: "flex",
  alignItems: "baseline",
  gap: "2.5",
  flexWrap: "wrap",
});

const title = css({ fontSize: "md", fontWeight: "medium", color: "text.default" });

const streak = css({ fontSize: "sm", color: "text.muted" });
const streakValue = css({ color: "accent.text", fontWeight: "medium" });

const link = css({
  flexShrink: "0",
  fontSize: "sm",
  color: "accent.text",
  transition: "opacity 0.15s",
  _hover: { textDecoration: "underline" },
});

export function ActivityPreview({
  stats,
  grid,
}: {
  stats: Stats;
  grid: GridDay[][];
}) {
  return (
    <section className={section}>
      <div className={header}>
        <div className={titleGroup}>
          <span className={title}>활동 기록</span>
          {stats.currentStreak > 0 ? (
            <span className={streak}>
              현재 <b className={streakValue}>{stats.currentStreak}일</b> 연속 기록 중
            </span>
          ) : null}
        </div>
        <Link href="/daily-log" className={link}>
          데일리 로그 →
        </Link>
      </div>
      <ContributionGraph weeks={grid} />
    </section>
  );
}
