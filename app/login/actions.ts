"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

/** 로그인 폼 제출을 처리한다. 비밀번호가 맞으면 /daily-log로, 틀리면 에러 표시로 리다이렉트한다. */
export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  redirect(ok ? "/daily-log" : "/login?error=1");
}

/** 로그아웃 후 /daily-log로 리다이렉트한다. */
export async function logout() {
  await signOut();
  redirect("/daily-log");
}
