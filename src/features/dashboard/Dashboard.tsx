import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader } from '@/components/ui/PageHeader';
import { HeroSection } from '@/components/ui/HeroSection';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick.blog: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The West Coast Swing Lifestyle Blog by Tech Dancer."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={24}>
        {/* Full-bleed hero — no padding wrapper needed */}
        <HeroSection />

        <Stack gap={16} paddingX={{ base: 4, md: 6, lg: 12 }}>
          <Stack gap={8}>
            <SectionHeader label="ANALYZE" title="Recent Insights">
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

            <Grid
              cols={{ base: 1, md: 3 }}
              gap={8}
              as={motion.div}
              variants={motionTokens.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {recentPosts.map((post) => (
                <ContentCard
                  key={post.slug}
                  {...post}
                  basePath="/blog"
                  aspect="video"
                  variants={motionTokens.staggerItem}
                  variant="minimal"
                  whileHover={{ y: -2 }}
                />
              ))}
            </Grid>
          </Stack>

          {/* Upcoming Events Mini-Grid */}
          <Stack gap={8}>
            <SectionHeader label="COMPETE" title="Upcoming Events" />
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
