import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { Intro } from "./_components/intro";
import { Section } from "./_components/section";
import { Skills } from "./_components/skills";
import { ProjectList } from "./_components/project-list";
import { Experience } from "./_components/experience";

export const metadata: Metadata = {
  title: "소개",
  description:
    "프론트엔드 개발자 신유승(Shin Yuseung)의 소개 · 스킬 · 프로젝트 · 경험.",
};

const main = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "16", md: "20" },
  paddingBottom: { base: "24", md: "32" },
});

export default function AboutPage() {
  return (
    <main className={main}>
      <Intro />
      <Section title="Skills">
        <Skills />
      </Section>
      <Section title="Projects">
        <ProjectList />
      </Section>
      <Section title="Experience">
        <Experience />
      </Section>
    </main>
  );
}
