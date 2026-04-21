import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from './EventCard';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <Stack gap={16}>
        <Stack gap={8} paddingTop={12}>
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
          </Stack>
        </Stack>

        <PathSelector />

        <Box paddingY={2} border="b" className="bg-surface-alt/30">
          <Text variant="sans" size="sm" color="dim" align="center" className="block">
            Welcome to tech-dancer. Enjoy the west coast swing content or dive into the technical details.
          </Text>
        </Box>

        <Stack gap={8}>
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

          <Stack gap={0}>
            {recentPosts.map((post) => (
              <Box
                key={post.slug}
                as={NavLink}
                to={`/blog/${post.slug}`}
                display="flex"
                gap={4}
                align="center"
                paddingY={5}
                border="b"
                className="group transition-all"
              >
                {/* Compact textual information */}
                <Box flex className="min-w-0">
                  <Stack gap={1.5}>
                    <Box display="flex" align="center" gap={2}>
                      <Text variant="mono" size="micro" color="brand" opacity={60}>{post.category}</Text>
                      <Text variant="mono" size="micro" color="dim" opacity={60}>• {post.date}</Text>
                    </Box>
                    <Text size="xl" weight="font-bold" className="group-hover:text-accent transition-colors truncate">{post.title}</Text>
                    <Text variant="sans" size="sm" color="dim" className="truncate opacity-40">{post.excerpt}</Text>
                  </Stack>
                </Box>
                <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
              </Box>
            ))}
          </Stack>

          {/* Upcoming Events Section - Now more distinct */}
          <Stack gap={8}>
            <SectionHeader label="ON THE CALENDAR" title="Upcoming Events" />
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {upcomingEvents.map((event) => (
                <EventCard key={event.name} {...event} />
              ))}
            </Grid>
          </Stack>

        </Stack>
      </Stack>
    </Box>
  );
}

