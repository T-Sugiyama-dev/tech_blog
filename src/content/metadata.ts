import { TAGS } from "./tags";

export type Blog = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  fileName: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
};

export const posts: Omit<Blog, 'content'>[] = [
]