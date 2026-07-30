import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  // CJK 폰트는 subset preload 대상이 아니므로 불필요한 preload를 비활성화한다.
  // 라틴 글리프는 주 폰트인 Geist가 담당한다.
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "yusi",
    template: "%s · yusi",
  },
  description:
    "브라우저 너머의 원리가 궁금한 프론트엔드 개발자 yusi의 블로그와 기록.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${notoSansKr.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* 테마 플래시 방지: 하이드레이션 전에 html에 dark 클래스를 적용한다.
            외부 파일 + next/script(beforeInteractive)로 두어 React 19 인라인 스크립트
            경고와 no-sync-scripts 린트를 모두 피한다. */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
