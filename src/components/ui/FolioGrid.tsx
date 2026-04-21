import { useState } from 'react';
import { ContentCard, ContentCardSkeleton } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';

export default function FolioGrid({ items, categoryTitle, basePath, label, description, children, loading }: { items: any[], categoryTitle: string, basePath: string, label?: string, description?: string, children?: React.ReactNode, loading?: boolean }) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => {
    return (
      safeSearch(item.title, search) ||
      item.tags?.some((t: string) => safeSearch(t, search)) ||
      safeSearch(item.category, search) ||
      safeSearch(item.excerpt, search)
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
          <Box
            as="input"
            type="text"
            placeholder="SEARCH_THE_ENGINE..."
            width="full"
            surface="default"
            border
            paddingX={6}
            paddingY={4}
            variant="mono"
            size="sm"
            className="focus:border-accent-brand outline-none focus:ring-0"
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </Box>
      </Box>

      <Grid cols={{ base: 1, md: 2, xl: 3 }} gapX={12} gapY={20} className="mt-20">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              className={`transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
            >
              <ContentCardSkeleton />
            </Box>
          ))
        ) : (
          filteredItems.map((item, index) => (
            <Box
              key={item.slug}
              className={`transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
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
