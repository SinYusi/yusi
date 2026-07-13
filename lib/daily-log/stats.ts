// 데일리 로그 활동 집계 — 순수 함수. 날짜는 모두 KST 캘린더 날짜(YYYY-MM-DD) 문자열로 다룬다.

export type DailyTaskRow = { log_date: string; done: boolean };

export type GridDay = {
  date: string; // YYYY-MM-DD
  count: number; // 그날 완료한 항목 수
  isFuture: boolean;
};

export type Stats = {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
};

// 캘린더 날짜를 UTC 자정 기준 "일수"로 변환해 타임존 영향 없이 산술한다.
function toDayNumber(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

function fromDayNumber(n: number): string {
  const dt = new Date(n * 86_400_000);
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dt.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function weekdayOf(dayNumber: number): number {
  // 0 = 일요일 ... 6 = 토요일
  return new Date(dayNumber * 86_400_000).getUTCDay();
}

/** (log_date, done) 행들을 날짜별 "완료 항목 수" 맵으로 집계한다. done=false 행은 무시한다. */
export function aggregateDoneByDate(rows: DailyTaskRow[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of rows) {
    if (!row.done) continue;
    map.set(row.log_date, (map.get(row.log_date) ?? 0) + 1);
  }
  return map;
}

/**
 * 날짜별 완료 수 맵으로부터 현재 연속·최장 연속·총 기록일을 계산한다.
 * 연속은 "완료 항목 ≥1인 날"의 연속이며, 현재 연속은 오늘이 아직 0이어도 어제까지로 이어서 센다.
 */
export function computeStats(
  doneByDate: Map<string, number>,
  today: string,
): Stats {
  const activeDays = new Set<number>();
  for (const [date, count] of doneByDate) {
    if (count > 0) activeDays.add(toDayNumber(date));
  }

  const totalDays = activeDays.size;

  // 최장 연속: 활성 일자를 정렬해 연속 구간의 최댓값.
  const sorted = [...activeDays].sort((a, b) => a - b);
  let longestStreak = 0;
  let run = 0;
  let prev: number | null = null;
  for (const day of sorted) {
    run = prev !== null && day === prev + 1 ? run + 1 : 1;
    if (run > longestStreak) longestStreak = run;
    prev = day;
  }

  // 현재 연속: 오늘부터 뒤로. 오늘이 아직 0이면 어제부터 세서 끊기지 않게 한다.
  const todayNum = toDayNumber(today);
  let cursor = activeDays.has(todayNum) ? todayNum : todayNum - 1;
  let currentStreak = 0;
  while (activeDays.has(cursor)) {
    currentStreak += 1;
    cursor -= 1;
  }

  return { currentStreak, longestStreak, totalDays };
}

/** 최근 `weeks`주(일~토 열)의 잔디 그리드를 만든다. 마지막 열은 오늘이 속한 주이며, 미래 날짜는 isFuture로 표시한다. */
export function buildGrid(
  doneByDate: Map<string, number>,
  today: string,
  weeks = 26,
): GridDay[][] {
  const todayNum = toDayNumber(today);
  const lastSaturday = todayNum + (6 - weekdayOf(todayNum));
  const startSunday = lastSaturday - (weeks * 7 - 1);

  const grid: GridDay[][] = [];
  for (let w = 0; w < weeks; w++) {
    const column: GridDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dayNum = startSunday + w * 7 + d;
      const date = fromDayNumber(dayNum);
      column.push({
        date,
        count: doneByDate.get(date) ?? 0,
        isFuture: dayNum > todayNum,
      });
    }
    grid.push(column);
  }
  return grid;
}
