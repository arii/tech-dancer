import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { HeroSection } from '@/components/ui/HeroSection';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick.blog: Training tips, travel guides, and gear reviews for competitive West Coast Swing dancers, plus technical deep dives into building the platform with DevAI."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={16}>
        <HeroSection />

        <Stack gap={16} paddingX={{ base: 4, md: 6, lg: 12 }}>
          <Stack gap={6}>
            <Box width="full" display="flex" justify="between" align="end">
              <Stack gap={1}>
                <Text variant="mono" size="xs" weight="font-bold" color="dim" tracking="widest" uppercase>
                  Latest Updates
                </Text>
                <Text as="h2" size="2xl" weight="font-black" color="white">
                  Recent Posts
                </Text>
              </Stack>
              <Box
                as={NavLink}
                to="/blog"
                display="flex"
                align="center"
                gap={2}
                className="text-xs font-bold uppercase tracking-widest text-text-dim hover:text-accent transition-colors"
              >
                View all posts
                <ArrowRight className="w-4 h-4" />
              </Box>
            </Box>

            <Stack
              direction="col"
              gap={0}
              className="divide-y divide-line"
              as={motion.div}
              variants={motionTokens.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {recentPosts.map((post) => (
                <Box key={post.slug} paddingY={4} as={motion.div} variants={motionTokens.staggerItem}>
                  <Stack
                    as={NavLink}
                    to={`/blog/${post.slug}`}
                    direction={{ base: "col", sm: "row" }}
                    gap={{ base: 3, sm: 4 }}
                    paddingX={{ base: 3, sm: 5 }}
                    paddingY={{ base: 5, sm: 6 }}
                    marginX={{ sm: -2 }}
                    align={{ sm: "start" }}
                    className="group rounded-lg transition-colors hover:bg-surface"
                  >
                    <Box display="flex" shrink={0} wrap align="center" gap={{ base: 2, sm: 3 }} paddingTop={0.5} className="sm:w-44">
                      <Box as="span" border radius="sm" paddingX={2} paddingY={0.5} className="border-line text-xs font-bold text-text-dim/70">
                        {post.category}
                      </Box>
                      <Text variant="mono" tracking="widest" uppercase size="xs" className="whitespace-nowrap text-text-dim/70">
                        {post.date}
                      </Text>
                    </Box>
                    <Box>
                      <Text as="h3" color="main" size="base" weight="font-bold" marginBottom={1} className="transition-colors group-hover:text-accent leading-snug">
                        {post.title}
                      </Text>
                      <Text as="span" size="sm" className="leading-7 text-text-body/72 line-clamp-2">
                        {post.excerpt}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack gap={8}>
            <SectionHeader label="COMPETE" title="Upcoming Events" />
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {upcomingEvents.map((event) => (
                <Box
                  key={event.name}
                  as={motion.div}
                  variants={motionTokens.staggerItem}
                  className="h-full"
                >
                  <EventCard {...event} />
                </Box>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

