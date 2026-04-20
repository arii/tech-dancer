import { useState } from 'react';
import { ContentCard, ContentCardSkeleton } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid } from '@/layouts/Primitives';

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
    <Box as="section" height="full">
      <Box as="header" marginBottom={12}>
        <PageHeader
          label={label || "FOLIO"}
          title={categoryTitle}
          description={description}
        />
        {children}
        <Box marginTop={8} position="relative" maxWidth="2xl">
          <input
            type="text"
            placeholder="SEARCH_THE_ENGINE..."
            className="w-full bg-surface border-2 border-line px-6 py-4 font-mono text-sm focus:outline-none focus:border-accent text-text-main"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>

      <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={0} border="t" className="border-l border-line mt-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              border="r"
              borderBottom={true}
              padding={8}
              className={`transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
            >
              <ContentCardSkeleton />
            </Box>
          ))
        ) : (
          filteredItems.map((item, index) => (
            <Box
              key={item.slug}
              border="r"
              borderBottom={true}
              padding={8}
              className={`hover:bg-card-bg transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
            >
              <ContentCard
                {...item}
                basePath={basePath}
                aspect="video"
              />
            </Box>
          ))
        )}
      </Grid>
    </Box>
  );
}
