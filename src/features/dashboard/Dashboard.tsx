import { lazy, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentItem } from '@/lib/content';
import { ContentCardSkeleton } from '@/components/ui/ContentCard';

const RecentPosts = lazy(() => import('./components/RecentPosts'));
const UpcomingEvents = lazy(() => import('./components/UpcomingEvents'));

export default function Home() {
  const { recentPosts, upcomingEvents, dancerPaths, hirePaths } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="TechDancer: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The Roboticist's Guide to West Coast Swing."
      />
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
              The Roboticist&apos;s Guide to the West Coast Swing
            </Text>
            <Text variant="sans" size="xl" color="dim" maxWidth="3xl" className="leading-relaxed">
              Tools, travel hacks, and comp data to maximize your WCS weekends. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS (West Coast Swing) lifestyle.
            </Text>
            <Text variant="sans" size="base" color="dim" maxWidth="2xl" marginTop={2} className="leading-relaxed">
              Welcome to tech-dancer. Enjoy the west coast swing content or dive into the technical details.
            </Text>
          </Stack>
        </Stack>

        <PathSelector dancerLinks={dancerPaths} roboticistLinks={hirePaths} />

        <Stack gap={12}>
          <SectionHeader label="LATEST UPDATES" title="Recent Blog Posts">
            <Box 
              as={NavLink} 
              to="/blog"
              display="flex" 
              align="center" 
              gap={3} 
              className="text-text-dim hover:text-accent transition-colors"
            >
              <Text variant="mono" size="xs" weight="font-bold">View full repository</Text>
              <ArrowRight className="w-4 h-4" />
            </Box>
          </SectionHeader>

          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            <Suspense fallback={<RecentPostsSkeleton />}>
              <RecentPosts posts={recentPosts} />
            </Suspense>
            <Suspense fallback={<Box surface="muted" height={32} animate="pulse" />}>
              <UpcomingEvents events={upcomingEvents} />
            </Suspense>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

function RecentPostsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <ContentCardSkeleton key={i} />
      ))}
    </>
  );
}
