import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from './EventCard';
import { motionTokens } from '@/styles/motion';

export default function Home() {
  const { recentPosts, upcomingEvents, tools } = useHome();

  return (
    <Box as="section">
      <Stack gap={8}>
        <Stack gap={6} paddingTop={12}>
          <Stack gap={4}>
            <Text 
              as={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              variant="headline" 
              size={{ base: '5xl', md: '7xl' }}
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

        <Stack gap={6}>
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
                paddingY={4}
                border="b"
                className="group transition-all"
              >
                {/* Small, fixed-size thumbnail */}
                <Box width={{ base: 20, md: 24 }} height={{ base: 20, md: 24 }} shrink={0} radius="industrial" className="bg-surface-alt border border-line overflow-hidden">
                   {post.image ? (
                     <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                     <Box height="full" width="full" display="flex" align="center" justify="center" opacity={10}>
                       <Text variant="display" size="lg">TD</Text>
                     </Box>
                   )}
                </Box>
                {/* Compact textual information */}
                <Box flex className="min-w-0">
                  <Stack gap={1}>
                    <Box display="flex" align="center" gap={2}>
                      <Text variant="mono" size="micro" color="brand" opacity={60} uppercase weight="font-bold">{post.category}</Text>
                      <Text variant="mono" size="micro" color="dim" opacity={60}>• {post.date}</Text>
                    </Box>
                    <Text size="base" weight="font-bold" className="group-hover:text-accent transition-colors truncate">{post.title}</Text>
                    <Text variant="sans" size="sm" color="dim" className="truncate opacity-60">{post.excerpt}</Text>
                  </Stack>
                </Box>
                <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
              </Box>
            ))}
          </Stack>

          {/* Featured Tools Grid */}
          <Stack gap={6}>
            <SectionHeader label="LABORATORY" title="Featured Tools">
              <Box
                as={NavLink}
                to="/research"
                display="flex"
                align="center"
                gap={3}
                className="text-text-dim hover:text-accent transition-colors"
              >
                <Text variant="mono" size="xs" weight="font-bold">Explore Lab</Text>
                <ArrowRight className="w-4 h-4" />
              </Box>
            </SectionHeader>
            <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4}>
              {tools.slice(0, 6).map((tool: any) => (
                <ContentCard
                  key={tool.id}
                  slug={tool.id}
                  title={tool.name}
                  category={tool.category}
                  excerpt={tool.layman}
                  basePath="/research"
                  aspect="square"
                />
              ))}
            </Grid>
          </Stack>

          {/* Upcoming Events Section - Now more distinct */}
          <Stack gap={6}>
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
