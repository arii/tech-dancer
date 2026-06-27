import { Clock, FileText } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cardVariants } from '@/lib/variants';
import { Study } from '@/lib/content';

export interface ResearchArticlesProps {
  studies: Study[];
  navigate: (path: string) => void;
}

const ResearchArticles = ({ studies, navigate }: ResearchArticlesProps) => {
  if (studies.length === 0) return null;

  return (
    <Stack gap={12} id="articles" width="full">
      <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
        <Text as="h2" variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{studies.length} POSTS</Text>
      </Box>

      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
        {studies.map((study) => (
          <Stack
            key={study.slug}
            onClick={() => {
              if (study.status === 'published') {
                navigate(`/research/${study.slug}`);
              }
            }}
            height="full"
            surface={study.status === 'published' ? 'surface' : 'muted'}
            className={cardVariants({
              interactive: study.status === 'published'
            })}
            paddingTop={3.5}
            paddingX={4}
            paddingBottom={4}
            opacity={study.status === 'published' ? 1 : "high"}
            cursor={study.status === 'published' ? 'pointer' : 'default'}
            gap={0}
          >
            <Box display="flex" justify="between" align="center" marginBottom={3} width="full">
              <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">{study.category}</Text>
              {study.status && <StatusBadge label={study.status} />}
            </Box>

            <Text as="h3" variant="display" size="2xl" weight="font-black" marginBottom={2}>
              {study.title}
            </Text>
            <Box display="flex" align="center" gap={4} marginBottom={3}>
              <Text variant="mono" size="micro" color="dim" opacityVariant="muted">{study.date}</Text>
              {study.readTime && (
                <Box display="flex" align="center" gap={1} opacityVariant="muted">
                  <Icon icon={Clock} size="xs" color="dim" />
                  <Text variant="mono" size="micro" color="dim">{study.readTime} MIN</Text>
                </Box>
              )}
            </Box>

            <Text variant="body" size="sm" color="dim" clamp={3} leading="relaxed" marginBottom={3}>
              {study.excerpt}
            </Text>

            {study.tags && study.tags.length > 0 && (
              <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
                {study.tags.map(tag => (
                  <Text key={tag} className="flagship-tag">
                    {tag}
                  </Text>
                ))}
              </Box>
            )}

            <Box display="flex" align="center" gap={2} marginTop="auto">
              <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="accent">
                {study.status === 'planned'
                  ? 'Coming Soon'
                  : study.status === 'draft'
                    ? 'Draft in Progress'
                    : 'Read Article'}
              </Text>
              <Icon icon={FileText} size="sm" color="accent" />
            </Box>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
};

export default ResearchArticles;
