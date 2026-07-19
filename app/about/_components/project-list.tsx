import { css } from "@/styled-system/css";
import { projects, type Project } from "../_data";

const list = css({ display: "flex", flexDirection: "column", gap: "3" });

const card = css({
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l2",
  padding: { base: "4", md: "5" },
});

const cardHead = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "3",
  marginBottom: "1.5",
});

const nameRow = css({ display: "flex", alignItems: "baseline", gap: "2", flexWrap: "wrap" });
const name = css({ fontSize: "lg", fontWeight: "medium", color: "text.default" });
const badge = css({
  fontSize: "xs",
  color: "text.muted",
  backgroundColor: "bg.subtle",
  borderRadius: "l1",
  paddingX: "2",
  paddingY: "0.5",
});
const period = css({ fontSize: "xs", color: "text.muted", flexShrink: "0" });
const title = css({ fontSize: "sm", color: "text.default", marginBottom: "2" });
const overview = css({ fontSize: "sm", lineHeight: "1.6", color: "text.muted", marginBottom: "4" });

const stats = css({ display: "flex", flexWrap: "wrap", gap: "6", marginBottom: "4" });
const statValue = css({ fontSize: "xl", fontWeight: "medium", color: "accent.text", lineHeight: "1.2" });
const statLabel = css({ fontSize: "xs", color: "text.muted" });

const highlights = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5",
  marginBottom: "4",
  paddingLeft: "4",
  listStyleType: "disc",
});
const highlight = css({ fontSize: "sm", lineHeight: "1.6", color: "text.muted" });

const footer = css({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3", flexWrap: "wrap" });
const tags = css({ display: "flex", flexWrap: "wrap", gap: "1.5" });
const tag = css({
  fontSize: "xs",
  color: "text.muted",
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l1",
  paddingX: "2",
  paddingY: "0.5",
});
const link = css({
  fontSize: "xs",
  color: "accent.text",
  flexShrink: "0",
  _hover: { textDecoration: "underline" },
});

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={card}>
      <div className={cardHead}>
        <div className={nameRow}>
          <span className={name}>{project.name}</span>
          {project.comingSoon ? <span className={badge}>준비 중</span> : null}
        </div>
        <span className={period}>{project.period}</span>
      </div>
      <p className={title}>{project.title}</p>
      <p className={overview}>{project.overview}</p>

      {project.stats ? (
        <div className={stats}>
          {project.stats.map((s) => (
            <div key={s.label}>
              <div className={statValue}>{s.value}</div>
              <div className={statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {project.highlights ? (
        <ul className={highlights}>
          {project.highlights.map((h) => (
            <li key={h} className={highlight}>
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      <div className={footer}>
        <div className={tags}>
          {project.tech.map((t) => (
            <span key={t} className={tag}>
              {t}
            </span>
          ))}
        </div>
        {project.href ? (
          <a
            className={link}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectList() {
  return (
    <ul className={list}>
      {projects.map((p) => (
        <li key={p.name}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  );
}
