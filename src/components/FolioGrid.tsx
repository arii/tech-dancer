import { useState } from 'react';
import { ContentCard, ContentCardSkeleton } from '@/components/ContentCard';
import { PageHeader } from '@/components/PageHeader';

export default function FolioGrid({ items, categoryTitle, basePath, label, description, children, loading }: { items: any[], categoryTitle: string, basePath: string, label?: string, description?: string, children?: React.ReactNode, loading?: boolean }) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => {
    const term = search.toLowerCase();
    return (
      item.title?.toLowerCase().includes(term) ||
      item.tags?.some((t: string) => t.toLowerCase().includes(term)) ||
      item.category?.toLowerCase().includes(term) ||
      item.excerpt?.toLowerCase().includes(term)
    );
  });

  return (
    <section className="h-full">
      <header className="mb-12">
        <PageHeader
          label={label || "FOLIO"}
          title={categoryTitle}
          description={description}
        />
        {children}
        <div className="mt-8 relative max-w-2xl">
          <input
            type="text"
            placeholder="SEARCH_THE_ENGINE..."
            className="w-full bg-surface border-2 border-line px-6 py-4 font-mono text-sm focus:outline-none focus:border-accent text-text-main"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border-t border-l border-line mt-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`border-r border-b border-line p-8 transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
            >
              <ContentCardSkeleton />
            </div>
          ))
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.slug}
              className={`border-r border-b border-line p-8 hover:bg-card-bg transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
            >
              <ContentCard
                {...item}
                basePath={basePath}
                aspect="video"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
