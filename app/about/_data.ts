export const profile = {
  name: "신유승",
  nameEn: "Shin Yuseung",
  role: "Frontend Developer",
  intro:
    "읽기 좋은 코드와 오래 버티는 구조를 고민하는 프론트엔드 개발자입니다. 매일의 기록과 공식 문서로 기본기를 쌓고, 유지보수 가능한 아키텍처 설계에 집중합니다.",
  education: "순천향대학교 컴퓨터소프트웨어공학과 학사",
  location: "인천광역시 부평구",
  contacts: [
    { label: "Email", value: "yusi4781@naver.com", href: "mailto:yusi4781@naver.com", external: true },
    { label: "GitHub", value: "github.com/SinYusi", href: "https://github.com/SinYusi", external: true },
    { label: "Blog", value: "Blog", href: "/blog", external: false },
  ],
} as const;

export const skillGroups = [
  {
    label: "Language · Framework",
    items: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    label: "Styling · State",
    items: ["Tailwind", "Styled-components", "Zustand", "TanStack Query", "shadcn/ui"],
  },
  {
    label: "Tools · Workflow",
    items: ["Git", "Figma", "Vercel", "Notion", "Jira"],
  },
] as const;

export type Project = {
  name: string;
  period: string;
  title: string;
  overview: string;
  stats?: { value: string; label: string }[];
  highlights?: string[];
  tech: string[];
  href?: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    name: "Raillo",
    period: "2025.12 — 2026.03",
    title: "KTX 예매 서비스 클론 · 프론트엔드 전면 리팩토링",
    overview:
      "백엔드 API 검증용으로 AI가 생성한 프론트엔드 코드베이스를 단독 분석하고, P1~P4 34개 항목으로 체계화해 전면 리팩토링했습니다.",
    stats: [
      { value: "1004→60", label: "단일 파일 줄 수" },
      { value: "16", label: "any→unknown" },
      { value: "7", label: "API 레이어 분리" },
    ],
    highlights: [
      "타입 안정성: catch 블록 16개 any→unknown 전환, 공통 타입 모듈로 통합",
      "API 레이어: React Query는 GET만 캐싱, mutation은 plain async로 분리하고 7개 카테고리로 재설계",
      "인증 이중보호: Next.js middleware + AuthGuard HOC로 미인증 라우트 접근 차단",
      "검색 상태를 localStorage → URL query string으로 전환해 뒤로가기·공유 가능한 구조 확보",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "TanStack Query", "Zustand", "Tailwind", "shadcn/ui"],
    href: "https://github.com/SinYusi/raillo-frontend",
  },
  {
    name: "모여행",
    period: "2025.08 — 2025.09",
    title: "지도 기반 실시간 협업 여행 플래너",
    overview:
      "지도·검색·리스트 섹션이 동일한 일정 데이터를 실시간으로 공유하며 협업하는 플래너를 개발했습니다. (구름톤 딮다이브 최종 프로젝트)",
    highlights: [
      "Zustand selector로 구독 범위를 분리해 props drilling을 해소하고 불필요한 리렌더링 최소화",
      "WebSocket 대신 SSE 단방향 채택, fetch-event-source로 인증된 SSE 스트림 구현",
      "지도 3종 핀 레이어(Base·Favorite·Schedule) + zIndex 계층 제어, SchedulePolyline으로 동선 시각화",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Zustand", "SSE", "Framer Motion", "Axios"],
    href: "https://github.com/SinYusi/moyeohaeng-frontend",
  },
  {
    name: "순마켓",
    period: "2024",
    title: "교내 중고 거래 플랫폼",
    overview:
      "모바일 퍼스트 환경을 타겟으로 한 교내 중고 거래 플랫폼. Swipe-to-Wishlist, FCM 푸시 알림, 학교 도메인 이메일 인증.",
    tech: ["React", "Styled-components", "Firebase(FCM)", "Framer Motion"],
    comingSoon: true,
  },
];

export const experiences = [
  {
    period: "2025.02 — 2025.09",
    title: "구름톤 딮다이브 (9oormthon Deep Dive) 수료",
    description: "7개월 프론트엔드 심화 커리큘럼 이수 · 매달 구성원이 바뀌는 스터디 3회 · PM·PD·BE와 다직군 협업 프로젝트(모여행)",
  },
  {
    period: "2024.03 — 2024.11",
    title: "교내 IT 학술 동아리",
    description: "공식 문서 기반 단계별 기술 학습 · 피어 리뷰를 통한 역량 강화 · 순마켓 프로젝트 참여",
  },
  {
    period: "2023.11",
    title: "로컬크레이에이터 지역창업가 창업캠프 최우수상 (2위)",
    description: "연엽주 창업 아이템 기획 · 시장 조사·분석 기반 비즈니스 가치 논증으로 수상",
  },
  {
    period: "2020.01 — 2022.01",
    title: "D&P Park 생산 관리직",
    description: "사출 공장 생산 공정 관리 · 다양한 연령대와의 협업으로 적응력·소통 능력 배양",
  },
] as const;
