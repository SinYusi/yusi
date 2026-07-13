import { css } from "@/styled-system/css";
import { experiences } from "../_data";

const list = css({ display: "flex", flexDirection: "column", gap: "5" });

const item = css({
  display: "flex",
  flexDirection: { base: "column", sm: "row" },
  gap: { base: "1", sm: "5" },
});

const period = css({
  fontSize: "xs",
  color: "text.muted",
  minWidth: "150px",
  flexShrink: "0",
  paddingTop: "0.5",
});

const title = css({ fontSize: "sm", fontWeight: "medium", color: "text.default", marginBottom: "1" });
const description = css({ fontSize: "sm", lineHeight: "1.6", color: "text.muted" });

export function Experience() {
  return (
    <div className={list}>
      {experiences.map((exp) => (
        <div key={exp.title} className={item}>
          <span className={period}>{exp.period}</span>
          <div>
            <p className={title}>{exp.title}</p>
            <p className={description}>{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
