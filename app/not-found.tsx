import Link from "next/link";
import { css } from "@/styled-system/css";

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "24", md: "32" },
  paddingBottom: { base: "24", md: "32" },
  textAlign: "center",
});

const code = css({
  fontSize: "5xl",
  fontWeight: "medium",
  color: "accent.text",
  letterSpacing: "-0.02em",
  marginBottom: "3",
});

const title = css({
  fontSize: "xl",
  fontWeight: "medium",
  color: "text.default",
  marginBottom: "2",
});

const description = css({ fontSize: "sm", color: "text.muted", marginBottom: "8" });

const homeLink = css({
  display: "inline-block",
  fontSize: "sm",
  fontWeight: "medium",
  color: "accent.fg",
  backgroundColor: "accent.default",
  paddingX: "5",
  paddingY: "2.5",
  borderRadius: "l2",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "accent.emphasized" },
});

export default function NotFound() {
  return (
    <main className={section}>
      <p className={code}>404</p>
      <h1 className={title}>페이지를 찾을 수 없어요</h1>
      <p className={description}>
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
      </p>
      <Link href="/" className={homeLink}>
        홈으로
      </Link>
    </main>
  );
}
