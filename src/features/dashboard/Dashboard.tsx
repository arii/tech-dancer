import { motion } from 'motion/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Calendar, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from './EventCard';

export default function Home() {
  const navigate = useNavigate();
  const { recentPosts, upcomingEvents, tools } = useHome();

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
          </Stack>
        </Stack>

        <PathSelector />

        <Box paddingY={2} border="b" className="bg-surface-alt/30">
          <Text variant="sans" size="sm" color="dim" align="center" className="block">
            Welcome to tech-dancer. Enjoy the west coast swing content or dive into the technical details.
          </Text>
        </Box>

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

          <Stack gap={4}>
            {recentPosts.map((post) => (
              <Box
                key={post.slug}
                as={NavLink}
                to={`/blog/${post.slug}`}
                display="flex"
                gap={4}
                align="center"
                padding={3}
                radius="md"
                border
                surface="default"
                className="group hover:border-accent/40 transition-all"
              >
                {/* Small, fixed-size thumbnail instead of a massive banner */}
                <Box
                  width={24}
                  height={16}
                  shrink={0}
                  radius="sm"
                  overflow="hidden"
                  surface="muted"
                  className="hidden sm:block"
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Box width="full" height="full" display="flex" align="center" justify="center" className="bg-accent/5">
                      <Zap className="w-6 h-6 text-accent/20" />
                    </Box>
                  )}
                </Box>

                {/* Compact textual information */}
                <Box flex className="min-w-0">
                  <Stack gap={1}>
                    <Box display="flex" align="center" gap={2}>
                      <Text variant="mono" size="micro" weight="font-bold" color="brand">{post.category.toUpperCase()}</Text>
                      <Text variant="mono" size="micro" color="dim">• {post.date}</Text>
                    </Box>
                    <Text variant="display" size="lg" className="group-hover:text-accent transition-colors truncate">{post.title}</Text>
                    <Text variant="sans" size="sm" color="dim" className="truncate opacity-80">{post.excerpt}</Text>
                  </Stack>
                </Box>
                <ArrowRight className="w-5 h-5 text-text-dim group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
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

          {/* Featured Tools Section - Progressive Disclosure */}
          <Stack gap={8}>
            <SectionHeader label="TECHNICAL PORTFOLIO" title="Featured Tools">
              <Box
                as={NavLink}
                to="/research"
                display="flex"
                align="center"
                gap={3}
                className="text-text-dim hover:text-accent transition-colors"
              >
                <Text variant="mono" size="xs" weight="font-bold">View all components</Text>
                <ArrowRight className="w-4 h-4" />
              </Box>
            </SectionHeader>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {tools.map((tool: any) => (
                <Box
                  key={tool.id}
                  as="button"
                  onClick={() => navigate(`/research/${tool.id}`)}
                  surface="default"
                  border
                  padding={6}
                  radius="md"
                  cursor="pointer"
                  className="group hover:border-accent transition-all text-left"
                >
                  <Stack gap={4} height="full" justify="between">
                    <Stack gap={3}>
                      <Box display="flex" justify="between" align="start">
                        <Box width={8} height={8} surface="muted" border display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent transition-colors">
                          <Search className="w-4 h-4" />
                        </Box>
                        <Text variant="mono" size="micro" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
                      </Box>
                      <Stack gap={1}>
                        <Text variant="display" size="lg" className="group-hover:text-accent transition-colors">{tool.name}</Text>
                        <Text variant="sans" size="xs" color="dim" className="line-clamp-2 opacity-80">{tool.layman}</Text>
                      </Stack>
                    </Stack>
                    <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent transition-colors">
                      <Text variant="mono" size="micro" weight="font-bold">Launch Console</Text>
                      <ArrowRight className="w-3 h-3" />
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

