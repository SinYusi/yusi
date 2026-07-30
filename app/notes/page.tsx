import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { getAllNotes } from "@/lib/notes/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "노트",
  description: "자바스크립트·CS를 공부하며 내 말로 정리한 학습 노트.",
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

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className={section}>
      <h1 className={heading}>노트</h1>
      <p className={subtitle}>공부하며 내 말로 정리한 학습 노트입니다.</p>

      {notes.length === 0 ? (
        <p className={empty}>아직 정리한 노트가 없어요.</p>
      ) : (
        <div>
          {notes.map((note) => (
            <PostCard key={note.slug} post={note} basePath="/notes" />
          ))}
        </div>
      )}
    </main>
  );
}
