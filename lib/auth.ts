import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "dl_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30일

function adminPassword() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD 환경 변수가 설정되지 않았습니다.");
  return pw;
}

// 쿠키에는 비밀번호 원문이 아니라, 비밀번호에서 파생한 토큰을 저장한다.
function sessionToken() {
  return createHmac("sha256", adminPassword()).update("daily-log-admin").digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** 요청의 관리자 세션 쿠키가 유효한지(= 오너 로그인 상태인지) 확인한다. */
export async function isAdmin() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  try {
    return safeEqual(value, sessionToken());
  } catch {
    return false;
  }
}

/** 비밀번호가 맞으면 관리자 세션 쿠키를 발급하고 true를 반환한다. 틀리면 false. */
export async function signIn(password: string) {
  if (!safeEqual(password, adminPassword())) return false;
  (await cookies()).set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

/** 관리자 세션 쿠키를 제거해 로그아웃한다. */
export async function signOut() {
  (await cookies()).delete(COOKIE_NAME);
}
