'use client';

import { Suspense } from 'react';
import styles from './page.module.css';
import SearchForm from '@/components/feature/search/form/search-form';
import SearchResults from '@/components/feature/search/results/search-results';
import SearchFallback from '@/components/feature/search/fallback/search-fallback';

export default function SearchPage() {
  return (
    <div className={styles.container}>
      <div className={styles.search_section}>
        <div className={styles.search_section_inner}>
          <h1 className={styles.title}>Search Posts</h1>
          <SearchForm initialQuery="" initialCategory="" />
        </div>
      </div>

      <Suspense fallback={<SearchFallback />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}