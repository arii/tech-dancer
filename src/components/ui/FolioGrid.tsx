import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import type { ContentItem } from '@/lib/content';

interface FolioGridProps {
  items: ContentItem[];
  categoryTitle: string;
  basePath: string;
  label?: string;
  description?: string;
  children?: ReactNode;
  view?: ViewMode;
  onViewChange?: (v: ViewMode) => void;
  as?: keyof JSX.IntrinsicElements;
}

export default function FolioGrid({
  items,
  categoryTitle,
  basePath,
  label,
  description,
  children,
  view = 'card',
  onViewChange,
  as
}: FolioGridProps) {
  const [search, setSearch] = useSearchParam('search');

  const filteredItems = items.filter(item => {
    const tags = 'tags' in item ? item.tags : [];
    return (
      safeSearch(item.title, search) ||
      tags?.some((t: string) => safeSearch(t, search)) ||
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
          as={as}
        />
        {children}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} wrap>
          <Box position="relative" maxWidth="2xl" flex={1}>
            <Box
              as="input"
              type="text"
              placeholder="Search articles, guides, or gear..."
              width="full"
              surface="default"
              border
              paddingLeft={14}
              paddingRight={6}
              paddingY={4}
              variant="mono"
              size="sm"
              className="focus:border-accent outline-none focus:ring-0"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-dim"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Box>
          {onViewChange && (
            <ViewToggle view={view} onChange={onViewChange} />
          )}
        </Box>
      </Box>

      <Box marginTop={8}>
        {view === 'card' ? (
          <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={0} border="t" className="border-l border-line">
            {filteredItems.map((item) => (
              <Box
                key={item.slug}
                border="b"
                padding={{ base: 6, lg: 6 }}
                className="hover:bg-card-bg transition-colors group border-r border-line"
              >
                <ContentCard
                  {...item}
                  basePath={basePath}
                  aspect="video"
                />
              </Box>
            ))}
          </Grid>
        ) : (
          <Stack gap={0} border="t" className="border-line">
            {filteredItems.map((item) => (
              <ListRow key={item.slug} {...item} basePath={basePath} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
