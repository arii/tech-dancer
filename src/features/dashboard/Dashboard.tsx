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
        description="BoomTick.blog: Training notes, travel prep, and field-tested gear for West Coast Swing dancers heading into long event weekends."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={16}>
        <HeroSection />

        <Stack gap={16} paddingX={{ base: 4, md: 6, lg: 12 }}>
          <Stack gap={6}>
            <SectionHeader label="FIELD TESTED" title="What I’m Packing Lately" />
            <Grid cols={{ base: 1, md: 2 }} gap={4}>
              {[
                {
                  title: 'Loud Ballroom Kit',
                  body: 'Earplugs that lower the volume without losing the beat, plus the tiny cases that stop them from disappearing.',
                  href: '/gear',
                },
                {
                  title: 'Dance Floor Fixes',
                  body: 'Suede sheets, shoe socks, and quick pivots for sticky floors or sneakers that need to move.',
                  href: '/gear',
                },
                {
                  title: 'Hotel Room Setup',
                  body: 'Packing cubes, travel bottles, and compact tools that keep event outfits ready between late nights.',
                  href: '/gear',
                },
                {
                  title: 'Theme Night Staples',
                  body: 'Low-effort pieces that pack flat, show up under lights, and still let you dance comfortably.',
                  href: '/gear',
                },
              ].map((item) => (
                <Stack
                  key={item.title}
                  as={NavLink}
                  to={item.href}
                  gap={2}
                  padding={5}
                  radius="lg"
                  className="border border-line bg-surface/60 hover:bg-surface transition-colors"
                >
                  <Text as="h3" size="lg" weight="font-bold" color="white">
                    {item.title}
                  </Text>
                  <Text size="sm" className="text-text-body/80 leading-7">
                    {item.body}
                  </Text>
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
                    Why I pack it
                  </Text>
                </Stack>
              ))}
            </Grid>
          </Stack>

          <Stack gap={6}>
            <Stack gap={1}>
              <Text variant="mono" size="xs" weight="font-bold" color="dim" tracking="widest" uppercase>
                Latest Updates
              </Text>
              <Box width="full" display="flex" justify="between" align="end" direction={{ base: "col", sm: "row" }} gap={{ base: 3, sm: 0 }}>
                <Text as="h2" size="2xl" weight="font-black" color="white">
                  Recent Posts
                </Text>
                <Box
                  as={NavLink}
                  to="/blog"
                  display="flex"
                  align="center"
                  gap={2}
                  paddingY={{ base: 3, sm: 0 }}
                  paddingX={{ base: 4, sm: 0 }}
                  radius={{ base: "sm", sm: "none" }}
                  className="text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors sm:hover:bg-transparent"
                >
                  View all posts
                  <ArrowRight className="w-4 h-4" />
                </Box>
              </Box>
            </Stack>

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
                      <Box 
                        as="span" 
                        radius="sm" 
                        paddingX={2} 
                        paddingY={0.5} 
                        className="text-xs font-bold text-accent border-2 border-accent"
                      >
                        {post.category}
                      </Box>
                      <Text variant="mono" tracking="widest" uppercase size="xs" className="whitespace-nowrap text-text-dim">
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
