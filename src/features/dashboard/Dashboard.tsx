import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader, PageHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';
import { cn } from '@/lib/utils';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick.blog: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The West Coast Swing Lifestyle Blog by Tech Dancer."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={10}>
        <Box>
          <PageHeader
            label="WELCOME TO BOOMTICK.BLOG"
            title="The West Coast Swing Lifestyle Blog"
            description="Training tips, travel guides, gear picks, and data — for dancers who want to get better and go further. Written by Tech Dancer."
            border="none"
            paddingBottom={0}
            titleSize="fluid-7"
            descriptionMaxWidth="prose"
          />
        </Box>

        <Box width="full">
          <PathSelector />
        </Box>

        <Stack gap={10}>
          <Box>
            <SectionHeader label="LATEST UPDATES" title="Recent Posts">
              <Box
                as={NavLink}
                to="/blog"
                display="flex"
                align="center"
                gap={3}
                className="text-text-dim hover:text-accent transition-colors uppercase tracking-wider text-xs font-bold"
              >
                View all posts
                <ArrowRight className="w-4 h-4" />
              </Box>
            </SectionHeader>

            <Stack
              gap={6}
              as={motion.div}
              variants={motionTokens.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              className="divide-y divide-line"
            >
              {recentPosts.map((post) => (
                <Box
                  key={post.slug}
                  as={motion.div}
                  variants={motionTokens.staggerItem}
                  className="pt-6 first:pt-0 group"
                >
                  <NavLink to={`/blog/${post.slug}`} className="block">
                    <Grid cols={{ base: 1, md: 12 }} gap={{ base: 2, md: 6 }}>
                      <Stack direction="col" gap={2} className="md:col-span-3 lg:col-span-2 pt-1">
                        <Box display="inline-flex">
                          <Text
                            variant="mono"
                            size="micro"
                            weight="font-bold"
                            className={cn(
                              "uppercase tracking-widest px-3 py-1 rounded-full border border-line transition-colors",
                              post.category === 'Travel' ? "text-purple-400 group-hover:border-purple-400" : "text-cyan-400 group-hover:border-cyan-400"
                            )}
                          >
                            {post.category}
                          </Text>
                        </Box>
                        {post.date && (
                          <Text variant="mono" size="xs" color="dim" className="pl-1">
                            {post.date}
                          </Text>
                        )}
                      </Stack>

                      <Stack direction="col" gap={2} className="md:col-span-9 lg:col-span-10">
                        <Text
                          as="h3"
                          variant="headline"
                          className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors text-text-main"
                        >
                          {post.title}
                        </Text>
                        <Text
                          variant="body"
                          color="dim"
                          className="text-base leading-relaxed max-w-3xl"
                        >
                          {post.excerpt}
                        </Text>
                      </Stack>
                    </Grid>
                  </NavLink>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Upcoming Events Mini-Grid */}
          {upcomingEvents && upcomingEvents.length > 0 && (
            <Box>
              <SectionHeader label="ON THE ROAD" title="Upcoming Events" />
              <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
                {upcomingEvents.map((event) => (
                  <Box
                    key={event.name}
                    as={motion.div}
                    variants={motionTokens.staggerItem}
                    border
                    className="border-line h-full"
                  >
                    <EventCard {...event} />
                  </Box>
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
