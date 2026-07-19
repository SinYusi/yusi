// 배포 도메인. 프로덕션에서는 NEXT_PUBLIC_SITE_URL 환경 변수로 설정한다.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "yusi";
export const SITE_DESCRIPTION =
  "브라우저 너머의 원리가 궁금한 프론트엔드 개발자 yusi의 블로그와 기록.";
