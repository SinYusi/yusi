import type { Metadata } from "next";
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

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
