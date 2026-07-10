import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "블로그",
};

export default function BlogPage() {
  return (
    <ComingSoon
      title="블로그"
      description="프론트엔드 CS 지식을 다루는 글을 준비 중입니다. 곧 공개됩니다."
    />
  );
}
