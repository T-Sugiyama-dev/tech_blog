'use client';

import Link from 'next/link';
import styles from './search-results.module.css';
import { posts } from '@/content/metadata';
import { useSearchParams } from 'next/navigation';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  let results = [...posts];

  // カテゴリでフィルタリング
  if (category) {
    results = results.filter(post =>
      post.tags.includes(category)
    );
  }

  // キーワード検索（カテゴリフィルタリングの後に実行）
  if (searchQuery) {
    const query = searchQuery.toLowerCase();

    // タイトルで検索
    const titleMatches = results.filter(post =>
      post.title.toLowerCase().includes(query)
    );

    // 説明で検索（タイトルにマッチしないもの）
    const descriptionMatches = results.filter(post =>
      !post.title.toLowerCase().includes(query) &&
      post.description.toLowerCase().includes(query)
    );

    // 結果を結合（タイトルマッチを優先）
    results = [...titleMatches, ...descriptionMatches];
  }

  return (
    <div className={styles.results_section}>
      <div className={styles.results_grid}>
        {results.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <div key={post.id} className={styles.post_card}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div className={styles.no_results}>
          <p>No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}