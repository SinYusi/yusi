import { createPublicClient } from "@/lib/supabase/public";
import { kstToday } from "./date";
import {
  aggregateDoneByDate,
  buildGrid,
  computeStats,
  type DailyTaskRow,
  type GridDay,
  type Stats,
} from "./stats";

export type Activity = {
  stats: Stats;
  grid: GridDay[][];
  today: string;
};

const PAGE_SIZE = 1000;

/**
 * 완료된 daily_tasks 행을 페이지네이션으로 전부 조회한다.
 * Supabase 기본 1000행 응답 제한을 넘겨도 과거 기록이 누락되지 않도록 1000행씩 나눠 가져오며,
 * 조회 오류는 즉시 throw 해 조용한 빈 데이터로 처리되지 않게 한다.
 */
async function fetchAllDoneRows(
  supabase: ReturnType<typeof createPublicClient>,
): Promise<DailyTaskRow[]> {
  const rows: DailyTaskRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("daily_tasks")
      .select("log_date, done")
      .eq("done", true)
      .order("log_date", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    rows.push(...(data as DailyTaskRow[]));
    if (data.length < PAGE_SIZE) break;
  }
  return rows;
}

/**
 * 공개 읽기로 전체 활동 기록을 집계해 통계(전체 기간)와 잔디 그리드(최근 weeks주)를 만든다.
 * /daily-log와 랜딩이 공유한다.
 */
export async function loadActivity(weeks: number): Promise<Activity> {
  const supabase = createPublicClient();
  const rows = await fetchAllDoneRows(supabase);

  const doneByDate = aggregateDoneByDate(rows);
  const today = kstToday();

  return {
    stats: computeStats(doneByDate, today),
    grid: buildGrid(doneByDate, today, weeks),
    today,
  };
}
