const KST = "Asia/Seoul";

/**
 * KST(Asia/Seoul) 기준 오늘 날짜를 YYYY-MM-DD 문자열로 반환한다.
 * 읽기(오늘 항목 조회)와 쓰기(log_date 저장)가 동일한 "오늘" 기준을 쓰도록 공유한다.
 */
export function kstToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: KST }).format(now);
}
