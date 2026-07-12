"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  redirect(ok ? "/daily-log" : "/login?error=1");
}

export async function logout() {
  await signOut();
  redirect("/daily-log");
}
