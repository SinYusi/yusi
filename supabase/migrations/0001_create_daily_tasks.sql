-- 데일리 로그: 하루 체크리스트 항목 저장 테이블.
-- Supabase SQL Editor에서 적용한 스키마를 저장소에서도 버전 관리하기 위해 보관한다.

create table if not exists public.daily_tasks (
  id uuid primary key default gen_random_uuid(),
  log_date date not null default (timezone('Asia/Seoul', now()))::date,
  title text not null check (char_length(title) between 1 and 200),
  done boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists daily_tasks_log_date_idx on public.daily_tasks (log_date);

alter table public.daily_tasks enable row level security;

-- 방문자(anon)는 읽기만 가능.
drop policy if exists "Public read" on public.daily_tasks;
create policy "Public read" on public.daily_tasks
  for select using (true);

-- 쓰기 정책은 두지 않는다 → anon/authenticated 쓰기 전면 차단.
-- 쓰기는 서버의 service_role 키만 수행(RLS 우회)하며, 관리자 비밀번호 게이트로 보호한다.
