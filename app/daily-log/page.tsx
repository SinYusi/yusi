import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { createPublicClient } from "@/lib/supabase/public";
import { isAdmin } from "@/lib/auth";
import { logout } from "@/app/login/actions";
import { Checklist } from "@/app/daily-log/_components/checklist";
import { StatsCards } from "@/app/daily-log/_components/stats-cards";
import { ContributionGraph } from "@/components/contribution-graph";
import { kstToday } from "@/lib/daily-log/date";
import { loadActivity } from "@/lib/daily-log/load";
import type { DailyTask } from "@/lib/daily-log/types";

export const metadata: Metadata = {
  title: "데일리 로그",
};

const KST = "Asia/Seoul";

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "16", md: "20" },
  paddingBottom: { base: "24", md: "32" },
});

const heading = css({
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
  marginBottom: "1",
});

const subtitle = css({ fontSize: "sm", color: "text.muted", marginBottom: "8" });

const blockHeader = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  marginBottom: "3",
});

const blockTitle = css({ fontSize: "md", fontWeight: "medium", color: "text.default" });
const blockMeta = css({ fontSize: "sm", color: "text.muted" });

const activityBlock = css({ marginBottom: "9" });

const logoutRow = css({ marginTop: "8" });
const logoutBtn = css({
  fontSize: "xs",
  color: "text.muted",
  cursor: "pointer",
  background: "none",
  borderWidth: "0",
  _hover: { color: "text.default" },
});

export default async function DailyLogPage() {
  const now = new Date();
  const today = kstToday(now);
  const dateLabel = new Intl.DateTimeFormat("ko-KR", {
    timeZone: KST,
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);

  const supabase = createPublicClient();
  const [todayRes, activity] = await Promise.all([
    supabase
      .from("daily_tasks")
      .select("id, title, done, log_date, created_at")
      .eq("log_date", today)
      .order("created_at", { ascending: true }),
    loadActivity(26),
  ]);

  const tasks = (todayRes.data ?? []) as DailyTask[];
  const { stats, grid } = activity;

  const owner = await isAdmin();
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <main className={section}>
      <h1 className={heading}>데일리 로그</h1>
      <p className={subtitle}>하루 일과를 체크하고, 꾸준함을 기록으로 남깁니다.</p>

      <StatsCards stats={stats} />

      <div className={activityBlock}>
        <div className={blockHeader}>
          <span className={blockTitle}>활동 기록</span>
          <span className={blockMeta}>최근 6개월</span>
        </div>
        <ContributionGraph weeks={grid} />
      </div>

      <div className={blockHeader}>
        <span className={blockTitle}>오늘의 체크리스트</span>
        <span className={blockMeta}>
          {dateLabel}
          {tasks.length > 0 ? ` · ${doneCount}/${tasks.length}` : ""}
        </span>
      </div>

      <Checklist tasks={tasks} owner={owner} />

      {owner ? (
        <div className={logoutRow}>
          <form action={logout}>
            <button type="submit" className={logoutBtn}>
              로그아웃
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
