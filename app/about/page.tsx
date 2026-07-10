import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "소개",
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="소개"
      description="yusi의 이력과 자기소개를 준비 중입니다. 곧 공개됩니다."
    />
  );
}
