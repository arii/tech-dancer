import { useBlog } from './useBlog';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';

export default function BlogFeed() {
  const { posts, categories, activeCategory, setActiveCategory, isLoading } = useBlog();

  return (
    <section>
      <FolioGrid
        items={posts}
        loading={isLoading}
        categoryTitle="Blog Posts"
        label="INSIGHTS"
        description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
        basePath="/blog"
      >
        <div className="mt-8">
          <FilterBar
            activeCategory={activeCategory}
            categories={categories}
            onSelect={setActiveCategory}
          />
        </div>
      </FolioGrid>
    </section>
  );
}
