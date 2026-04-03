# yusi

개인 포트폴리오 & 블로그

## 기술 스택

| 역할 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Panda CSS |
| 컴포넌트 | Park UI |
| 애니메이션 | Framer Motion |
| 블로그 | MDX (next-mdx-remote + gray-matter) |
| 코드 하이라이팅 | Shiki (rehype-pretty-code) |
| 배포 | Vercel |

## 시작하기

```bash
npm install
npm run dev
```

## 프로젝트 구조

```
yusi/
├── app/                  # Next.js App Router
│   ├── page.tsx          # 메인 (소개) 페이지
│   ├── blog/
│   │   ├── page.tsx      # 블로그 목록
│   │   └── [slug]/
│   │       └── page.tsx  # 블로그 포스트
│   └── layout.tsx
├── components/           # 공통 컴포넌트
├── posts/                # MDX 블로그 포스트
│   └── hello-world.mdx
└── styled-system/        # Panda CSS 생성 파일 (자동 생성)
```

## 블로그 글 작성

`posts/` 폴더에 `.mdx` 파일을 추가합니다.

```mdx
---
title: "글 제목"
date: "2025-01-01"
tags: ["react", "frontend"]
description: "글 요약"
---

본문 내용...
```

## 빌드

```bash
npm run build
```

Panda CSS codegen이 자동으로 먼저 실행됩니다.
