import { createClient } from "@supabase/supabase-js";

// 공개(publishable) 키 클라이언트 — RLS가 적용되며 읽기 전용 용도.
// 브라우저/서버 어디서든 안전하게 사용 가능하다.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
