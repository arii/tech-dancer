import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import { ContentItem } from '@/lib/content';
import { motion, AnimatePresence } from 'motion/react';

interface FolioGridProps {
  items: ContentItem[];
  categoryTitle: string;
  basePath: string;
  label?: string;
  description?: string;
  children?: React.ReactNode;
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
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} flexWrap="wrap">
          <Box position="relative" maxWidth="2xl" flex={1}>
            <Box
              as="input"
              type="text"
              placeholder="Search articles, guides, or gear..."
              width="full"
              surface="default"
              border
              paddingX={6}
              paddingY={4}
              variant="mono"
              size="sm"
              className="focus:border-accent-brand outline-none focus:ring-0"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </Box>
          {onViewChange && (
            <ViewToggle view={view} onChange={onViewChange} />
          )}
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        {view === 'card' ? (
          <motion.div
            key="card-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={0} border="t" className="border-l border-line mt-8">
              {filteredItems.map((item, index) => (
                <Box
                  key={item.slug}
                  border="r"
                  borderBottom={true}
                  padding={{ base: 6, lg: 6 }}
                  className={`hover:bg-card-bg transition-colors group ${index === 0 ? "md:col-span-full xl:col-span-2" : ""}`}
                >
                  <ContentCard
                    {...item}
                    basePath={basePath}
                    aspect="video"
                  />
                </Box>
              ))}
            </Grid>
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Stack gap={0} border="t" className="border-line mt-8">
              {filteredItems.map((item) => (
                <ListRow key={item.slug} {...item} basePath={basePath} />
              ))}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
