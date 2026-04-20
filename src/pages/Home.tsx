import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/Primitives';
import { useHome } from '@/hooks/useHome';
import { SectionHeader } from '@/components/PageHeader';
import PathSelector from '@/components/PathSelector';
import { ContentCard } from '@/components/ContentCard';
import { getHome } from '@/lib/content';

export default function Home() {
  const { recentPosts } = useHome();
  const content = getHome();

  return (
    <Box as="section">
      <Stack gap={24}>
        <Stack gap={12} paddingTop={12}>
          <Stack gap={4}>
            <Text 
              as={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              variant="headline" 
              size="fluid-7"
              className="text-accent-navy leading-tight tracking-tight max-w-4xl"
            >
              {content.hero.title}
            </Text>
            <Text variant="sans" size="xl" color="dim" maxWidth="3xl" className="leading-relaxed">
              {content.hero.subtitle}
            </Text>
            <Text variant="sans" size="base" color="dim" maxWidth="2xl" marginTop={2} className="leading-relaxed">
              {content.hero.welcome}
            </Text>
          </Stack>
        </Stack>

        <PathSelector />

        <Stack gap={12}>
          <SectionHeader label={content.sections.blog.label} title={content.sections.blog.title}>
            <Box 
              as={NavLink} 
              to="/blog"
              display="flex" 
              align="center" 
              gap={3} 
              className="text-text-dim hover:text-accent transition-colors"
            >
              <Text variant="mono" size="xs" weight="font-bold">{content.sections.blog.cta}</Text>
              <ArrowRight className="w-4 h-4" />
            </Box>
          </SectionHeader>

          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {recentPosts.map((post) => (
              <ContentCard 
                key={post.slug}
                {...post}
                basePath="/blog"
                aspect="video"
              />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
