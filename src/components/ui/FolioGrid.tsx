// impeccable-ignore-file
import { ReactNode } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
import { SearchBox } from '@/components/ui/SearchBox';
import { ListRow } from '@/components/ui/ListRow';
import { ContentItem } from '@/lib/content';
import { EmptyState } from './EmptyState';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { motionTokens } from '@/styles/motion';

interface FolioGridProps {
  items: ContentItem[];
  categoryTitle: string;
  basePath: string;
  label?: string;
  description?: string;
  overview?: string;
  children?: ReactNode;
  view?: ViewMode;
  onViewChange?: (v: ViewMode) => void;
  as?: keyof JSX.IntrinsicElements;
  renderItem?: (item: ContentItem) => ReactNode;
  searchPlaceholder?: string;
}

export default function FolioGrid({
  items,
  categoryTitle,
  basePath,
  label,
  description,
  overview,
  children,
  view = 'card',
  onViewChange,
  as,
  renderItem,
  searchPlaceholder: propsSearchPlaceholder
}: FolioGridProps) {
  const [search, setSearch] = useSearchParam('search');

  const searchPlaceholder = propsSearchPlaceholder || (basePath.includes('gear') ? 'Search gear...' : 'Search posts, guides, gear recommendations...');

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
        {overview && (
          <Box marginTop={4} paddingBottom={4} border="b" borderColor="line/30">
            <Text variant="mono" size="xs" color="dim" tracking="widest" uppercase>
              {overview}
            </Text>
          </Box>
        )}

        <Box marginTop={8} width="full" maxWidth="3xl">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </Box>

        {children}

        <Box display="flex" align="center" justify="end" gap={4} marginTop={4}>
          {onViewChange && (
            <ViewToggle view={view} onChange={onViewChange} />
          )}
        </Box>
      </Box>

      <Box marginTop={8} maxWidth="screen-2xl" marginX="auto" width="full">
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={search ? `No matches for "${search}" in ${categoryTitle}.` : `No items found in ${categoryTitle}.`}
          />
        ) : view === 'card' ? (
          <Grid
            cols={{ base: 1 }}
            gap={6}
            // impeccable-ignore
            className="grid-cols-[repeat(auto-fill,minmax(340px,1fr))]"
          >
            {filteredItems.map((item, index) => (
              <Box
                key={item.slug}
                as={motion.div}
                variants={motionTokens.staggerItem}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: index * 0.05 }}
                padding={0}
                height="full"
                className="bg-transparent"
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <ContentCard
                    {...item}
                    basePath={basePath}
                  />
                )}
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
