import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type Post = PostMeta & { content: string };

// 슬러그로 허용하는 문자. `.`과 경로 구분자를 막아 경로 순회(`../`)를 원천 차단한다.
const SLUG_PATTERN = /^[A-Za-z0-9_-]+$/;

function readPost(slug: string): Post | null {
  if (!SLUG_PATTERN.test(slug)) return null;

  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  // 정규화 후에도 posts/ 내부인지 재확인(이중 방어).
  if (!fullPath.startsWith(POSTS_DIR + path.sep)) return null;
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    description: typeof data.description === "string" ? data.description : "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    content,
  };
}

/** posts/ 폴더의 모든 슬러그(파일명에서 .mdx 제거)를 반환한다. */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** 모든 글의 메타데이터를 최신순(date 내림차순)으로 반환한다. */
export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(readPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ slug, title, date, description, tags }) => ({
      slug,
      title,
      date,
      description,
      tags,
    }));
}

/**
 * 슬러그로 글 본문+메타를 반환한다. 없거나 슬러그 형식이 올바르지 않으면 null.
 * 외부 입력(동적 라우트 파라미터)이 들어올 수 있으므로 경로 순회를 차단한다.
 */
export function getPostBySlug(slug: string): Post | null {
  return readPost(slug);
}
