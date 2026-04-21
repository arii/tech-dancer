import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';

export default function Home() {
  const { recentPosts, upcomingEvents, dancerPaths, hirePaths } = useHome();

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

          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {recentPosts.map((post) => (
              <ContentCard 
                key={post.slug}
                {...post}
                basePath="/blog"
                aspect="video"
              />
            ))}

            {/* Upcoming Events Mini-Cards */}
            {upcomingEvents.map((event) => (
              <Box
                key={event.name}
                className="flex flex-col h-full bg-surface/50 border border-line p-6 lg:p-8"
              >
                <Stack gap={4}>
                  <Box className="flex items-center gap-3">
                    <event.icon className="w-5 h-5 text-accent" />
                    <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em]">
                      {event.status}
                    </Text>
                  </Box>
                  <Text variant="display" size="xl" weight="font-black" className="text-accent-navy leading-snug">
                    {event.name}
                  </Text>
                  <Text variant="body" size="base" color="dim">
                    {event.date}
                  </Text>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

