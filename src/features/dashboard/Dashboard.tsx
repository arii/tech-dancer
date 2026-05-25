import { motion } from 'motion/react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { HeroSection } from '@/components/ui/HeroSection';
import { EventCard } from '@/components/ui/EventCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { HeroSpotlight } from './HeroSpotlight';
import { GearCarousel } from './GearCarousel';
import { DevLabTerminal } from './DevLabTerminal';
import { motionTokens } from '@/styles/motion';

export default function Dashboard() {
  const { 
    featuredPost, 
    recentPosts, 
    gearItems, 
    devPosts,
    upcomingEvents 
  } = useHome();


  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick: Training tips, travel guides, and gear reviews for West Coast Swing dancers, plus technical deep dives into building the platform with DevAI."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={20} paddingY={{ base: 8, md: 12 }}>
        <HeroSection />

        {/* Dance Focus: Hero Spotlight */}
        {featuredPost ? (
          <HeroSpotlight 
            featuredPost={featuredPost} 
            recentPosts={recentPosts} 
          />
        ) : (
          <Box paddingX={{ base: 4, md: 6, lg: 12 }}>
            <Text color="dim">No blog posts available yet.</Text>
          </Box>
        )}

        {/* Gear Reviews: Carousel */}
        {gearItems.length > 0 && (
          <GearCarousel gearItems={gearItems} />
        )}

        {/* Tech/Dev: Terminal Lab */}
        {devPosts.length > 0 && (
          <DevLabTerminal devPosts={devPosts} />
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Stack gap={8} paddingX={{ base: 4, md: 6, lg: 12 }} as={motion.div} variants={motionTokens.staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
            <SectionHeader label="COMPETE" title="Upcoming Event Resource Guides" />
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {upcomingEvents.map((event) => (
                <Box
                  key={event.slug}
                  as={motion.div}
                  variants={motionTokens.staggerItem}
                  className="h-full"
                >
                  <EventCard event={event} />
                </Box>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
