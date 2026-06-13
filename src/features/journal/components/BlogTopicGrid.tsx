import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { useMemo } from 'react';
import { Post } from '@/lib/content';
import { TOPIC_CONFIG } from '@/data/blogTopics';

interface BlogTopicGridProps {
  posts: Post[];
}

export function BlogTopicGrid({ posts }: BlogTopicGridProps) {
  const stats = useMemo(() => {
    return TOPIC_CONFIG.map(topic => ({
      ...topic,
      count: posts.filter(p => {
        if (topic.id === 'Event') return p.category === 'Guide';
        return p.category === topic.id;
      }).length
    }));
  }, [posts]);

  return (
    <Box id="categories" as="section" marginTop={{ base: 12, lg: 20 }}>
      <Grid cols={{ base: 2, md: 4 }} gap={4}>
        {stats.map((topic) => (
          <Box
            key={topic.id}
            as={NavLink}
            to={`/blog?category=${topic.id === 'Event' ? 'Guide' : topic.id}`}
            border
            radius="lg"
            padding={6}
            surface="default"
            className="group transition-all hover:border-accent/40 hover:bg-surface/50"
          >
            <Stack gap={1}>
              <Text
                variant="mono"
                size="sm"
                weight="font-black"
                className={`${topic.color} transition-colors`}
              >
                {topic.label}
              </Text>
              <Text variant="body" size="xs" color="dim">
                {topic.count} Articles
              </Text>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
