'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './search-form.module.css';
import { TAGS } from '@/content/tags';

interface SearchFormProps {
  initialQuery?: string;
  initialCategory?: string;
}

export default function SearchForm({ initialQuery = '', initialCategory = '' }: SearchFormProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

  // TAGSの値を配列に変換
  const categories = Object.values(TAGS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToSearch();
  };

  const navigateToSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set('q', searchQuery);
    if (selectedCategory) queryParams.set('category', selectedCategory);
    router.push(`/search?${queryParams.toString()}`);
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);

    // カテゴリが選択されたら即座に検索ページに遷移
    if (newCategory) {
      const queryParams = new URLSearchParams();
      queryParams.set('category', newCategory);
      if (searchQuery) queryParams.set('q', searchQuery);
      router.push(`/search?${queryParams.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.form}>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.search_input}
      />

      <div className={styles.category_wrapper}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.category_button} ${selectedCategory === category ? styles.selected : ''
              }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </form>
  );
} 
