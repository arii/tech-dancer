

import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RelatedPost {
  title: string;
  href: string;
  category?: string;
  image?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedPost[];
}

export function RelatedContent({ title = "Keep Reading", items }: RelatedContentProps) {
  return (
    <Stack gap={8}>
      <Text variant="mono" size="xs" weight="font-extrabold" color="dim" uppercase tracking="utility" className="opacity-60">
        {title}
      </Text>
      <Grid cols={{ base: 1, md: 2 }} gap={4}>
        {items.map((post, i) => (
          <Box
            key={i}
            as={Link}
            to={post.href}
            padding={6}
            radius="2xl"
            border
            surface="surface-alt"
            className="group hover:border-accent/40 hover:bg-surface/40 transition-all"
          >
            <Stack direction="row" justify="between" align="center" gap={4}>
              <Stack gap={1.5}>
                {post.category && (
                  <Text variant="mono" size="micro" color="accent" weight="font-extrabold" uppercase tracking="utility">
                    {post.category}
                  </Text>
                )}
                <Text size="md" weight="font-bold" color="main" leading="snug" tracking="tight" className="group-hover:text-accent transition-colors">
                  {post.title}
                </Text>
              </Stack>
              <ArrowRight className="w-5 h-5 text-text-dim/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}
