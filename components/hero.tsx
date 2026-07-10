"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { css } from "@/styled-system/css";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "20", md: "28" },
  paddingBottom: { base: "24", md: "32" },
});

const label = css({
  fontSize: "sm",
  color: "accent.text",
  letterSpacing: "0.02em",
  marginBottom: "4",
});

const headline = css({
  fontSize: { base: "4xl", md: "5xl" },
  fontWeight: "medium",
  lineHeight: "1.3",
  letterSpacing: "-0.02em",
  color: "text.default",
  marginBottom: "5",
});

const accent = css({ color: "accent.text" });

const description = css({
  fontSize: { base: "md", md: "lg" },
  lineHeight: "1.7",
  color: "text.muted",
  maxWidth: "30rem",
  marginBottom: "8",
});

const actions = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "3",
});

const primaryCta = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "1.5",
  backgroundColor: "accent.default",
  color: "accent.fg",
  fontSize: "sm",
  fontWeight: "medium",
  paddingX: "5",
  paddingY: "2.5",
  borderRadius: "l2",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "accent.emphasized" },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent.default",
    outlineOffset: "2px",
  },
});

const secondaryCta = css({
  display: "inline-flex",
  alignItems: "center",
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.default",
  paddingX: "5",
  paddingY: "2.5",
  borderRadius: "l2",
  borderWidth: "1px",
  borderColor: "border.subtle",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "bg.subtle" },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent.default",
    outlineOffset: "2px",
  },
});

function ArrowRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <motion.section
      className={section}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.p className={label} variants={item}>
        yusi · 프론트엔드
      </motion.p>
      <motion.h1 className={headline} variants={item}>
        꾸준함이 <span className={accent}>실력</span>이<br />
        되는 걸 믿습니다.
      </motion.h1>
      <motion.p className={description} variants={item}>
        브라우저 너머의 원리가 궁금한 프론트엔드 개발자. 배운 걸 글로 남기고,
        하루를 기록으로 증명합니다.
      </motion.p>
      <motion.div className={actions} variants={item}>
        <Link href="/blog" className={primaryCta}>
          블로그 <ArrowRight />
        </Link>
        <Link href="/about" className={secondaryCta}>
          이력 보기
        </Link>
      </motion.div>
    </motion.section>
  );
}
