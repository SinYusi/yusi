import { css } from "@/styled-system/css";
import type { Stats } from "@/lib/daily-log/stats";

const grid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "3",
  marginBottom: "7",
});

const card = css({
  backgroundColor: "bg.subtle",
  borderRadius: "l2",
  paddingX: "4",
  paddingY: "3.5",
});

const label = css({ fontSize: "xs", color: "text.muted", marginBottom: "1.5" });

const value = css({
  fontSize: "2xl",
  fontWeight: "medium",
  color: "text.default",
  lineHeight: "1",
});

const unit = css({ fontSize: "sm", fontWeight: "normal", color: "text.muted" });

function Card({ label: l, value: v }: { label: string; value: number }) {
  return (
    <div className={card}>
      <p className={label}>{l}</p>
      <p className={value}>
        {v}
        <span className={unit}>일</span>
      </p>
    </div>
  );
}

export function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className={grid}>
      <Card label="현재 연속" value={stats.currentStreak} />
      <Card label="최장 연속" value={stats.longestStreak} />
      <Card label="총 기록일" value={stats.totalDays} />
    </div>
  );
}
