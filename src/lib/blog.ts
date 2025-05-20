import fs from 'fs';
import path from 'path';
import { Blog, posts } from '@/content/metadata';

export async function getAllPosts(): Promise<Blog[]> {
  const postsWithContent = await Promise.all(
    posts.map(async (post: Omit<Blog, 'content'>) => {
      const filePath = path.join(process.cwd(), 'src/content/posts', post.fileName);
      const content = fs.readFileSync(filePath, 'utf-8');

      return {
        ...post,
        content
      };
    })
  );

  return postsWithContent.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Blog | null> {
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  const filePath = path.join(process.cwd(), 'src/content/posts', post.fileName);
  const content = fs.readFileSync(filePath, 'utf-8');

  return {
    ...post,
    content
  };
}