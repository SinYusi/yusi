# yusi

프론트엔드 개발자 yusi의 개인 포트폴리오 겸 블로그.

## 주요 기능

- **데일리 로그** — 하루 일과를 체크리스트로 기록하고, 완료 항목이 GitHub 잔디처럼 활동 그래프로 시각화된다. 날짜를 클릭하면 그날의 기록을 조회·소급 편집할 수 있다.
- **블로그** — 프론트엔드·CS 지식을 다루는 글. `posts/` 폴더의 MDX로 작성한다.
- **소개** — 이력·프로젝트·스킬을 정리한 About 페이지.

## 기술 스택

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Panda CSS** — zero-runtime 스타일링 (`styled-system/`은 자동 생성)
- **Park UI** (Panda 프리셋)
- **Framer Motion** — 애니메이션
- **Supabase** — 데일리 로그 데이터 저장 (공개 읽기 / 관리자 쓰기)
- **next-mdx-remote · gray-matter · rehype-pretty-code · shiki** — MDX 블로그

## 시작하기

```bash
pnpm install
cp .env.example .env.local   # 값 채우기 (아래 참고)
pnpm dev
```

### 환경 변수 (`.env.local`)

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 공개(anon) 키 — 읽기용 |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role 키 — **서버 전용**, 쓰기용 |
| `ADMIN_PASSWORD` | 데일리 로그 관리자 비밀번호 (`/login`) |
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인 (sitemap·OG용) |

Supabase 스키마는 [`supabase/migrations/`](supabase/migrations/)의 SQL을 SQL Editor에서 실행한다.

## 명령어

```bash
pnpm dev      # 개발 서버 (panda codegen --watch 병렬)
pnpm build    # 프로덕션 빌드
pnpm lint     # ESLint
```

## 프로젝트 구조

```
app/
  page.tsx            # 메인 (히어로 + 활동 잔디)
  blog/               # 블로그 목록 · 상세([slug])
  daily-log/          # 데일리 로그 (체크리스트 · 잔디 · 통계)
  about/              # 소개
  login/              # 관리자 로그인
  _components/        # 라우트 전용 컴포넌트 (colocation)
components/           # 공유 컴포넌트
lib/                  # 도메인 로직 (blog, daily-log, supabase)
posts/                # MDX 블로그 글
supabase/migrations/  # DB 스키마
styled-system/        # Panda CSS 자동 생성 (수정 금지)
```
