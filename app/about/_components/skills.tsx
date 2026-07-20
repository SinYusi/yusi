import { css } from "@/styled-system/css";
import { skillGroups } from "../_data";

const wrap = css({ display: "flex", flexDirection: "column", gap: "4" });

const group = css({
  display: "flex",
  flexDirection: { base: "column", sm: "row" },
  gap: { base: "2", sm: "4" },
  alignItems: { base: "flex-start", sm: "baseline" },
});

const groupLabel = css({
  fontSize: "sm",
  color: "text.muted",
  minWidth: "160px",
  flexShrink: "0",
});

const tags = css({ display: "flex", flexWrap: "wrap", gap: "2" });

const tag = css({
  fontSize: "xs",
  color: "text.default",
  backgroundColor: "bg.subtle",
  borderRadius: "l1",
  paddingX: "2.5",
  paddingY: "1",
});

const accentTag = css({
  fontSize: "xs",
  color: "accent.text",
  backgroundColor: "accent.3",
  borderRadius: "l1",
  paddingX: "2.5",
  paddingY: "1",
});

export function Skills() {
  return (
    <ul className={wrap}>
      {skillGroups.map((g, i) => (
        <li key={g.label} className={group}>
          <span className={groupLabel}>{g.label}</span>
          <ul className={tags}>
            {g.items.map((item) => (
              <li key={item} className={i === 0 ? accentTag : tag}>
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
