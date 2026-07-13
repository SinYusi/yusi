"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { kstToday } from "@/lib/daily-log/date";

// Server Action은 직접 POST로도 호출 가능하므로, 매 액션마다 관리자 인증을 검증한다.
async function assertAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
}

/** 오늘(KST) 날짜로 새 체크리스트 항목을 추가한다. 관리자만 가능. */
export async function addTask(formData: FormData) {
  await assertAdmin();
  const title = String(formData.get("title") ?? "")
    .trim()
    .slice(0, 200);
  if (!title) return;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("daily_tasks")
    .insert({ title, log_date: kstToday() });
  if (error) throw error;

  revalidatePath("/daily-log");
}

/** 항목의 완료 상태를 토글한다. 관리자만 가능. */
export async function toggleTask(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const done = String(formData.get("done") ?? "") === "true";
  if (!id) return;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("daily_tasks")
    .update({ done: !done, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/daily-log");
}

/** 항목을 삭제한다. 관리자만 가능. */
export async function deleteTask(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("daily_tasks").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/daily-log");
}
