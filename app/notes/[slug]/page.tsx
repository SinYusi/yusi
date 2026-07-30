import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNoteSlugs, getNoteBySlug } from "@/lib/notes/posts";
import { MdxArticle } from "@/components/mdx-article";

export function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return { title: note.title, description: note.description };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return <MdxArticle doc={note} backHref="/notes" backLabel="노트" />;
}
