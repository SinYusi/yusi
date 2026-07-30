import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { getAllPosts } from "@/lib/blog/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "블로그",
  description: "프론트엔드와 CS 지식을 정리하는 공간.",
};

const section = css({
  maxWidth: "720px",
  marginX: "auto",
  paddingX: { base: "5", md: "6" },
  paddingTop: { base: "16", md: "20" },
  paddingBottom: { base: "24", md: "32" },
});

const heading = css({
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: "medium",
  letterSpacing: "-0.02em",
  color: "text.default",
  marginBottom: "1",
});

const subtitle = css({ fontSize: "sm", color: "text.muted", marginBottom: "6" });

const empty = css({
  fontSize: "sm",
  color: "text.muted",
  paddingY: "10",
  textAlign: "center",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className={section}>
      <h1 className={heading}>블로그</h1>
      <p className={subtitle}>프론트엔드와 CS 지식을 정리합니다.</p>

      {posts.length === 0 ? (
        <p className={empty}>아직 작성된 글이 없어요.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} basePath="/blog" />
          ))}
        </div>
      )}
    </main>
  );
}
