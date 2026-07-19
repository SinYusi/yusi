const KST = "Asia/Seoul";

/**
 * KST(Asia/Seoul) 기준 오늘 날짜를 YYYY-MM-DD 문자열로 반환한다.
 * 읽기(오늘 항목 조회)와 쓰기(log_date 저장)가 동일한 "오늘" 기준을 쓰도록 공유한다.
 */
export function kstToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: KST }).format(now);
}

/** YYYY-MM-DD 형식 문자열인지 검사한다. */
export function isValidDateStr(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/**
 * 입력 날짜를 "기록 가능한 날짜"로 정규화한다.
 * 형식이 유효하고 오늘 이하이면 그대로, 아니면 오늘(KST)을 반환한다. (미래 날짜 기록 방지)
 */
export function resolveLogDate(input: string | undefined, today = kstToday()): string {
  if (input && isValidDateStr(input) && input <= today) return input;
  return today;
}
