'use client';

import { posts } from '@/content/metadata';
import SearchForm from '@/components/feature/search-form/search-form';
import styles from './page.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 検索結果を表示するコンポーネントを分離
function SearchResults() {
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

function Fallback() {
  return <div className={styles.fallback}>Loading...</div>;
}

// メインのページコンポーネント
export default function SearchPage() {
  return (
    <div className={styles.container}>
      <div className={styles.search_section}>
        <div className={styles.search_section_inner}>
          <h1 className={styles.title}>Search Posts</h1>
          <SearchForm initialQuery="" initialCategory="" />
        </div>
      </div>

      <Suspense fallback={<Fallback />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}