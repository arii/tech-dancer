import { useState } from 'react';
import { ContentCard } from '@/components/ui/ContentCard';

export default function FolioGrid({ items, categoryTitle, basePath }: { items: any[], categoryTitle: string, basePath: string }) {
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
    <section className="panel h-full">
      <header className="mb-16 border-b-4 border-line pb-8">
        <h1 className="text-7xl md:text-9xl tracking-tighter text-text-main">{categoryTitle}</h1>
        <div className="mt-8 relative max-w-2xl">
          <input
            type="text"
            placeholder="SEARCH_THE_ENGINE..."
            className="w-full bg-surface border-2 border-line px-6 py-4 font-mono text-sm focus:outline-none focus:border-accent text-text-main"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border-t border-l border-line">
        {filteredItems.map(item => (
          <div key={item.slug} className="border-r border-b border-line p-8 hover:bg-card-bg transition-colors group">
            <ContentCard
              {...item}
              basePath={basePath}
              aspect="video"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
