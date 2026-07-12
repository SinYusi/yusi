import "server-only";
import { createClient } from "@supabase/supabase-js";

// service_role(secret) 키 클라이언트 — RLS를 우회한다. 서버에서만 사용해야 하며,
// `server-only`로 클라이언트 번들 유입을 차단한다. 호출 전 반드시 관리자 인증을 검증할 것.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
