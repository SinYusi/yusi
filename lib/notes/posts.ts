import { createCollection, type Doc, type DocMeta } from "@/lib/content/mdx";

export type NoteMeta = DocMeta;
export type Note = Doc;

const notes = createCollection("notes");

export const getAllNoteSlugs = notes.getAllSlugs;
export const getAllNotes = notes.getAll;
export const getNoteBySlug = notes.getBySlug;
