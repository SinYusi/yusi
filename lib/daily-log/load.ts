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

// 공개 읽기로 전체 (log_date, done)를 가져와 통계(전체 기간)와 잔디 그리드(weeks주)를 만든다.
// /daily-log와 랜딩이 공유한다.
export async function loadActivity(weeks: number): Promise<Activity> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("daily_tasks").select("log_date, done");

  const doneByDate = aggregateDoneByDate((data ?? []) as DailyTaskRow[]);
  const today = kstToday();

  return {
    stats: computeStats(doneByDate, today),
    grid: buildGrid(doneByDate, today, weeks),
    today,
  };
}
