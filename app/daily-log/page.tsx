import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "데일리 로그",
};

export default function DailyLogPage() {
  return (
    <ComingSoon
      title="데일리 로그"
      description="하루 일과를 기록하고 활동 이력을 남기는 공간을 준비 중입니다. 곧 공개됩니다."
    />
  );
}
