import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/lib/site";

// posts/ 폴더를 직접 읽어 블로그 글을 포함한다(블로그 기능 유무와 무관하게 동작).
function postSlugs(): string[] {
  const dir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = ["", "/about", "/blog", "/daily-log"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
  }));

  const posts = postSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
  }));

  return [...routes, ...posts];
}
