import { Hero } from "@/app/_components/hero";
import { ActivityPreview } from "@/app/_components/activity-preview";
import { loadActivity } from "@/lib/daily-log/load";

// 활동 기록은 자주 바뀌지 않으므로 ISR로 1시간마다 갱신한다.
export const revalidate = 3600;

export default async function Home() {
  const { stats, grid } = await loadActivity(17);

  return (
    <main>
      <Hero />
      <ActivityPreview stats={stats} grid={grid} />
    </main>
  );
}
