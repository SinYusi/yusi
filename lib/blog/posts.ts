import { createCollection, type Doc, type DocMeta } from "@/lib/content/mdx";

export type PostMeta = DocMeta;
export type Post = Doc;

const blog = createCollection("posts");

export const getAllSlugs = blog.getAllSlugs;
export const getAllPosts = blog.getAll;
export const getPostBySlug = blog.getBySlug;
