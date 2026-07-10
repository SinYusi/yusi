import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { isAdmin } from "@/lib/auth";
import { login, logout } from "./actions";

export const metadata: Metadata = {
  title: "로그인",
  robots: { index: false, follow: false },
};

const section = css({
  maxWidth: "420px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "24", md: "32" },
});

const title = css({
  fontSize: "2xl",
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
  marginBottom: "2",
});

const desc = css({
  fontSize: "sm",
  color: "text.muted",
  marginBottom: "6",
});

const form = css({ display: "flex", flexDirection: "column", gap: "3" });

const input = css({
  height: "10",
  paddingX: "3",
  fontSize: "sm",
  color: "text.default",
  backgroundColor: "bg.canvas",
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l2",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent.default",
    outlineOffset: "1px",
  },
});

const submit = css({
  height: "10",
  backgroundColor: "accent.default",
  color: "accent.fg",
  fontSize: "sm",
  fontWeight: "medium",
  borderRadius: "l2",
  cursor: "pointer",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "accent.emphasized" },
});

const errorText = css({ fontSize: "sm", color: "red.9" });

const signedIn = css({ fontSize: "sm", color: "text.muted", marginBottom: "4" });

const logoutBtn = css({
  fontSize: "sm",
  color: "text.default",
  textDecoration: "underline",
  cursor: "pointer",
  background: "none",
  borderWidth: "0",
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const owner = await isAdmin();

  if (owner) {
    return (
      <main className={section}>
        <h1 className={title}>로그인됨</h1>
        <p className={signedIn}>관리자로 로그인된 상태입니다.</p>
        <form action={logout}>
          <button type="submit" className={logoutBtn}>
            로그아웃
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className={section}>
      <h1 className={title}>관리자 로그인</h1>
      <p className={desc}>데일리 로그를 기록하려면 비밀번호를 입력하세요.</p>
      <form className={form} action={login}>
        <input
          className={input}
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="current-password"
          aria-label="관리자 비밀번호"
          required
        />
        {error ? <p className={errorText}>비밀번호가 올바르지 않습니다.</p> : null}
        <button type="submit" className={submit}>
          로그인
        </button>
      </form>
    </main>
  );
}
