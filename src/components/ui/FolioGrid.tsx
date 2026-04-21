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
      <details className="group" open>
        <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer">
          <Box as="div" display="flex" items="start" justify="between">
            <PageHeader
              label={label || "FOLIO"}
              title={categoryTitle}
              description={description}
            />
            <Box padding={4} className="group-open:rotate-180 transition-transform duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Box>
          </Box>
        </summary>

        <div className="pt-8">
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
        </div>
      </details>
    </Box>
  );
}
