import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { css } from "@/styled-system/css";
import { getAllSlugs, getPostBySlug } from "@/lib/blog/posts";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const section = css({
  maxWidth: "680px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "12", md: "16" },
  paddingBottom: { base: "24", md: "32" },
});

const back = css({
  display: "inline-block",
  fontSize: "sm",
  color: "text.muted",
  marginBottom: "8",
  _hover: { color: "text.default" },
});

const dateText = css({ fontSize: "xs", color: "text.muted", marginBottom: "2" });

const title = css({
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
  lineHeight: "1.3",
  marginBottom: "3",
});

const tags = css({ display: "flex", flexWrap: "wrap", gap: "1.5", marginBottom: "8" });
const tag = css({
  fontSize: "xs",
  color: "text.muted",
  backgroundColor: "bg.subtle",
  borderRadius: "l1",
  paddingX: "2",
  paddingY: "0.5",
});

const divider = css({ height: "1px", backgroundColor: "border.subtle", marginBottom: "8" });

const prose = css({
  "& h2": {
    fontSize: "xl",
    fontWeight: "medium",
    color: "text.default",
    letterSpacing: "-0.01em",
    marginTop: "10",
    marginBottom: "3",
  },
  "& h3": {
    fontSize: "lg",
    fontWeight: "medium",
    color: "text.default",
    marginTop: "7",
    marginBottom: "2",
  },
  "& p": { fontSize: "md", lineHeight: "1.85", color: "text.default", marginY: "4" },
  "& a": { color: "accent.text", textDecoration: "underline" },
  "& strong": { fontWeight: "medium", color: "text.default" },
  "& ul": { paddingLeft: "5", marginY: "4", listStyleType: "disc" },
  "& ol": { paddingLeft: "5", marginY: "4", listStyleType: "decimal" },
  "& li": { fontSize: "md", lineHeight: "1.8", color: "text.default", marginY: "1.5" },
  "& blockquote": {
    borderLeftWidth: "3px",
    borderColor: "accent.default",
    paddingLeft: "4",
    marginY: "5",
    color: "text.muted",
  },
  "& code": {
    fontFamily: MONO,
    fontSize: "0.9em",
    backgroundColor: "bg.subtle",
    color: "accent.text",
    paddingX: "1.5",
    paddingY: "0.5",
    borderRadius: "l1",
  },
  "& pre": {
    fontFamily: MONO,
    fontSize: "sm",
    lineHeight: "1.6",
    padding: "4",
    borderRadius: "l2",
    overflowX: "auto",
    marginY: "5",
    borderWidth: "1px",
    borderColor: "border.subtle",
  },
  "& pre code": {
    backgroundColor: "transparent",
    color: "inherit",
    padding: "0",
    fontSize: "inherit",
  },
});

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className={section}>
      <Link href="/blog" className={back}>
        ← 블로그
      </Link>
      <p className={dateText}>{post.date.replaceAll("-", ".")}</p>
      <h1 className={title}>{post.title}</h1>
      {post.tags.length > 0 ? (
        <div className={tags}>
          {post.tags.map((t) => (
            <span key={t} className={tag}>
              #{t}
            </span>
          ))}
        </div>
      ) : null}
      <div className={divider} />
      <div className={prose}>
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: true }],
              ],
            },
          }}
        />
      </div>
    </main>
  );
}
