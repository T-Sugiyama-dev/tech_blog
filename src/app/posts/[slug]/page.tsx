import { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import styles from './page.module.css';
import remarkGfm from "remark-gfm";
import remarkParse from 'remark-parse';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { convertDateFormat } from '@/lib/date';
import { TableOfContents } from '@/components/ui/article/table-of-contents/table-of-contents';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type BlogProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: BlogProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkParse],
        rehypePlugins: [
          rehypeSlug,
          rehypeRaw,
          rehypeStringify,
          [rehypePrettyCode, {
            theme: 'github-dark',
            onVisitLine(node: { children: Array<{ type: string, value: string }> }) {
              // 行番号のスタイリング
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
              }
            },
            onVisitHighlightedLine(node: { properties: { className: string[] } }) {
              // ハイライトされた行のスタイリング
              node.properties.className.push('highlighted');
            },
            onVisitHighlightedWord(node: { properties: { className: string | string[] } }) {
              // ハイライトされた単語のスタイリング
              node.properties.className = ['word'];
            },

          }]
        ],
      }
    }
  });

  return (
    <article className={styles.container}>

      <div className={styles.top_container}>
        <div className={styles.top_wrapper}>

          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.tag_container}>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className={styles.tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.date_container}>
              <p className={styles.date}>Published at: {convertDateFormat(post.publishedAt)}</p>
              {post.updatedAt && (
                <p className={styles.date}>Updated at: {convertDateFormat(post.updatedAt)}</p>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className={styles.content_container}>

        <div className="target-toc">
          <div className={styles.content_wrapper}>
            {content}
          </div>
        </div>

        <div className={styles.toc_container}>
          <TableOfContents />
        </div>
      </div>
    </article >
  );
}