import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { ContentCard, ContentCardSkeleton } from '@/components/ui/ContentCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Box, Grid } from '@/layouts/Primitives';
import { safeSearch } from '@/lib/utils';
import { motionTokens } from '@/styles/motion';
import { ContentItem } from '@/lib/content';

interface FolioGridProps {
  items: ContentItem[];
  categoryTitle: string;
  basePath: string;
  label?: string;
  description?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

export default function FolioGrid({
  items,
  categoryTitle,
  basePath,
  label,
  description,
  children,
  loading
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
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </Box>
      </Box>

      <Grid
        as={motion.div}
        variants={motionTokens.staggerContainer}
        initial="initial"
        animate="animate"
        cols={{ base: 1, md: 2, xl: 3 }}
        gap={0}
        border="t"
        className="border-l border-line mt-8"
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Box
              as={motion.div}
              variants={motionTokens.fadeInUp}
              key={index}
              border="r"
              borderBottom={true}
              padding={8}
              className={`transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
            >
              <ContentCardSkeleton />
            </Box>
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Box
              as={motion.div}
              variants={motionTokens.fadeInUp}
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
        ) : (
          <Box span="full" paddingY={32} display="flex" align="center" justify="center" className="bg-surface/50">
            <Stack align="center" gap={6} className="text-center opacity-40">
              <Sparkles className="w-12 h-12 text-accent-brand animate-pulse" />
              <Stack gap={2}>
                <Text variant="display" size="2xl">STATION_OFFLINE</Text>
                <Text variant="body" size="base">The repository is currently empty for this sector.</Text>
              </Stack>
            </Stack>
          </Box>
        )}
      </Grid>
    </Box>
  );
}
