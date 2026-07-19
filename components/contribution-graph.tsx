"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { css } from "@/styled-system/css";
import type { GridDay } from "@/lib/daily-log/stats";

const wrapper = css({ position: "relative" });

const scroll = css({
  display: "flex",
  gap: "3px",
  overflowX: "auto",
  paddingBottom: "1",
});

const column = css({ display: "flex", flexDirection: "column", gap: "3px" });

const cellBase = css({
  width: "11px",
  height: "11px",
  borderRadius: "2px",
  flexShrink: "0",
});

const cellFuture = css({ backgroundColor: "transparent" });

const cellSelected = css({
  outlineWidth: "2px",
  outlineStyle: "solid",
  outlineColor: "text.default",
  outlineOffset: "1px",
});

// 색이 진할수록(단계 높을수록) 완료 항목이 많음. 라이트/다크 모두 적응.
const cellByLevel = [
  css({ backgroundColor: "border.subtle" }), // 0: 기록 없음
  css({ backgroundColor: "accent.5" }),
  css({ backgroundColor: "accent.7" }),
  css({ backgroundColor: "accent.9" }),
  css({ backgroundColor: "accent.11" }),
];

const legend = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "1.5",
  marginTop: "3",
  fontSize: "xs",
  color: "text.muted",
});

const tooltip = css({
  position: "absolute",
  transform: "translate(-50%, calc(-100% - 6px))",
  paddingX: "2",
  paddingY: "1",
  backgroundColor: "text.default",
  color: "bg.canvas",
  fontSize: "xs",
  borderRadius: "l1",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: "10",
});

const srOnly = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
});

function levelOf(count: number): number {
  if (count <= 0) return 0;
  if (count >= 4) return 4;
  return count;
}

function labelOf(day: GridDay): string {
  const [, m, d] = day.date.split("-").map(Number);
  return day.count > 0
    ? `${m}월 ${d}일 · ${day.count}개 완료`
    : `${m}월 ${d}일 · 기록 없음`;
}

type Hover = { label: string; left: number; top: number };

export function ContributionGraph({
  weeks,
  selectedDate,
}: {
  weeks: GridDay[][];
  selectedDate?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Hover | null>(null);

  const activeDays = weeks
    .flat()
    .filter((day) => !day.isFuture && day.count > 0).length;

  function handleEnter(event: React.MouseEvent<HTMLElement>, day: GridDay) {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const cell = event.currentTarget.getBoundingClientRect();
    const box = wrap.getBoundingClientRect();
    setHover({
      label: labelOf(day),
      left: cell.left - box.left + cell.width / 2,
      top: cell.top - box.top,
    });
  }

  return (
    <div ref={wrapperRef} className={wrapper}>
      <p className={srOnly}>
        활동 기록 그래프. 색이 진할수록 그날 완료한 항목이 많습니다. 기록한 날은 총{" "}
        {activeDays}일입니다. 날짜를 선택하면 그날의 기록을 볼 수 있습니다.
      </p>

      <div className={scroll}>
        {weeks.map((weekDays, w) => (
          <div key={w} className={column}>
            {weekDays.map((day) =>
              day.isFuture ? (
                <div
                  key={day.date}
                  className={`${cellBase} ${cellFuture}`}
                  aria-hidden="true"
                />
              ) : (
                <Link
                  key={day.date}
                  href={`/daily-log?date=${day.date}`}
                  aria-label={labelOf(day)}
                  className={`${cellBase} ${cellByLevel[levelOf(day.count)]} ${
                    selectedDate === day.date ? cellSelected : ""
                  }`}
                  onMouseEnter={(e) => handleEnter(e, day)}
                  onMouseLeave={() => setHover(null)}
                />
              ),
            )}
          </div>
        ))}
      </div>

      <div className={legend} aria-hidden="true">
        <span>적음</span>
        {cellByLevel.map((cls, i) => (
          <span key={i} className={`${cellBase} ${cls}`} />
        ))}
        <span>많음</span>
      </div>

      {hover ? (
        <div className={tooltip} style={{ left: hover.left, top: hover.top }}>
          {hover.label}
        </div>
      ) : null}
    </div>
  );
}
