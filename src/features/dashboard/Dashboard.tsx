import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from './EventCard';

export default function Home() {
  const { recentPosts, upcomingEvents, dancerPaths, hirePaths } = useHome();

  return (
    <Box as="section">
      <Stack gap={24}>
        <Grid cols={{ base: 1, lg: 12 }} gap={12} paddingTop={20} items="end">
          <Box className="lg:col-span-8">
            <Stack gap={8}>
              <Box>
                <Text variant="mono" size="micro" color="accent" weight="font-bold" className="tracking-[0.3em] mb-4 block">
                  SYSTEMS // ANALYSIS // MOVEMENT
                </Text>
                <Text
                  as={motion.h1}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  variant="display"
                  size="8xl"
                  className="text-accent-navy leading-[0.85] tracking-tighter"
                >
                  Tech<br />Dancer
                </Text>
              </Box>
              <Text variant="sans" size="2xl" color="dim" maxWidth="2xl" className="leading-tight font-medium">
                The Roboticist&apos;s Guide to the West Coast Swing.
              </Text>
            </Stack>
          </Box>
          <Box className="lg:col-span-4 lg:border-l lg:border-line lg:pl-12 pb-2">
            <Stack gap={6}>
              <Text variant="body" size="base" color="dim" className="leading-relaxed italic">
                "Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS lifestyle."
              </Text>
              <Box className="h-[1px] w-12 bg-accent" />
              <Text variant="sans" size="sm" color="dim" className="leading-relaxed">
                Welcome to the intersection of robotics and dance. Explore technical deep dives or optimization tools.
              </Text>
            </Stack>
          </Box>
        </Grid>

        <PathSelector />

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

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gapX={12} gapY={16}>
            {recentPosts.map((post, index) => (
              <Box key={post.slug} className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
                <ContentCard
                  {...post}
                  basePath="/blog"
                  aspect={index === 0 ? "video" : "video"}
                />
              </Box>
            ))}

            {/* Upcoming Events Mini-Cards */}
            {upcomingEvents.map((event) => (
              <EventCard key={event.name} {...event} />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

