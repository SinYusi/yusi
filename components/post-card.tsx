import Link from "next/link";
import { css } from "@/styled-system/css";
import type { DocMeta } from "@/lib/content/mdx";

const card = css({
  display: "block",
  paddingY: "5",
  borderBottomWidth: "1px",
  borderColor: "border.subtle",
  transition: "opacity 0.15s",
  _hover: { "& h2": { color: "accent.text" } },
});

const dateText = css({ fontSize: "xs", color: "text.muted", marginBottom: "2" });

const title = css({
  fontSize: "lg",
  fontWeight: "medium",
  color: "text.default",
  letterSpacing: "-0.01em",
  marginBottom: "2",
  transition: "color 0.15s",
});

const description = css({
  fontSize: "sm",
  lineHeight: "1.6",
  color: "text.muted",
  marginBottom: "3",
});

const tags = css({ display: "flex", flexWrap: "wrap", gap: "1.5" });
const tag = css({
  fontSize: "xs",
  color: "text.muted",
  backgroundColor: "bg.subtle",
  borderRadius: "l1",
  paddingX: "2",
  paddingY: "0.5",
});

function formatDate(date: string): string {
  return date ? date.replaceAll("-", ".") : "";
}

export function PostCard({
  post,
  basePath,
}: {
  post: DocMeta;
  basePath: string;
}) {
  return (
    <Link href={`${basePath}/${post.slug}`} className={card}>
      <p className={dateText}>{formatDate(post.date)}</p>
      <h2 className={title}>{post.title}</h2>
      <p className={description}>{post.description}</p>
      {post.tags.length > 0 ? (
        <div className={tags}>
          {post.tags.map((t) => (
            <span key={t} className={tag}>
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
