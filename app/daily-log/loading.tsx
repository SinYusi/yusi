import { css } from "@/styled-system/css";

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "16", md: "20" },
  paddingBottom: { base: "24", md: "32" },
});

const pulse = css({
  backgroundColor: "bg.subtle",
  borderRadius: "l2",
  animation: "pulse 1.5s ease-in-out infinite",
});

const headingSkeleton = css({ height: "9", width: "40", marginBottom: "8" });
const statsSkeleton = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "3",
  marginBottom: "7",
});
const cardSkeleton = css({ height: "20" });
const graphSkeleton = css({ height: "32", marginBottom: "9" });
const listSkeleton = css({ display: "flex", flexDirection: "column", gap: "2" });
const rowSkeleton = css({ height: "11" });

export default function Loading() {
  return (
    <div className={section} aria-busy="true" aria-label="불러오는 중">
      <div className={`${pulse} ${headingSkeleton}`} />
      <div className={statsSkeleton}>
        <div className={`${pulse} ${cardSkeleton}`} />
        <div className={`${pulse} ${cardSkeleton}`} />
        <div className={`${pulse} ${cardSkeleton}`} />
      </div>
      <div className={`${pulse} ${graphSkeleton}`} />
      <div className={listSkeleton}>
        <div className={`${pulse} ${rowSkeleton}`} />
        <div className={`${pulse} ${rowSkeleton}`} />
        <div className={`${pulse} ${rowSkeleton}`} />
      </div>
    </div>
  );
}
