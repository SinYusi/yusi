import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type DocMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type Doc = DocMeta & { content: string };

// 슬러그로 허용하는 문자. `.`과 경로 구분자를 막아 경로 순회(`../`)를 원천 차단한다.
const SLUG_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * 콘텐츠 디렉터리(예: "posts", "notes")를 받아 MDX 컬렉션 조회 함수를 만든다.
 * 블로그·노트 등 여러 카테고리가 동일한 파싱/보안 로직을 공유한다.
 */
export function createCollection(dirName: string) {
  const DIR = path.join(process.cwd(), dirName);

  function read(slug: string): Doc | null {
    if (!SLUG_PATTERN.test(slug)) return null;

    const fullPath = path.join(DIR, `${slug}.mdx`);
    // 정규화 후에도 디렉터리 내부인지 재확인(이중 방어).
    if (!fullPath.startsWith(DIR + path.sep)) return null;
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

  /** 디렉터리의 모든 슬러그(파일명에서 .mdx 제거). */
  function getAllSlugs(): string[] {
    if (!fs.existsSync(DIR)) return [];
    return fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  }

  /** 모든 문서의 메타데이터를 최신순(date 내림차순)으로 반환. */
  function getAll(): DocMeta[] {
    return getAllSlugs()
      .map(read)
      .filter((d): d is Doc => d !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map(({ slug, title, date, description, tags }) => ({
        slug,
        title,
        date,
        description,
        tags,
      }));
  }

  /** 슬러그로 문서 본문+메타 반환. 없거나 슬러그 형식이 잘못되면 null(경로 순회 차단). */
  function getBySlug(slug: string): Doc | null {
    return read(slug);
  }

  return { getAllSlugs, getAll, getBySlug };
}
