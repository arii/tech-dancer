import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="TechDancer: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The Roboticist's Guide to West Coast Swing."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={0}>
        {/* Editorial Hero Section */}
        <Box
          as="header"
          paddingX={{ base: 4, md: 16, lg: 20 }}
          paddingTop={{ base: 12, md: 24 }}
          paddingBottom={{ base: 12, md: 20 }}
          className="bg-surface overflow-hidden"
        >
          <Stack gap={12}>
            <Box>
              <Text
                variant="mono"
                size="xs"
                color="brand"
                weight="font-bold"
                tracking="wide-editorial"
                uppercase
              >
                — Welcome
              </Text>
            </Box>

            <Box position="relative">
              <Text
                as="h1"
                variant="headline"
                size="fluid-9"
                weight="font-black"
                className="text-accent-navy leading-[0.8] tracking-tighter" // impeccable-ignore
              >
                The Roboticist's Guide <br className="hidden md:block" />
                <Box as="span" display="inline-block" marginLeft={{ md: "[15%]" }}>to West Coast Swing</Box>
              </Text>

              {/* Floating metadata/accent */}
              <Box
                position="absolute"
                right={0}
                top={0}
                display={{ base: "none", xl: "block" }}
                className="rotate-90 origin-bottom-right translate-x-full"
              >
                <Text variant="mono" size="micro" color="dim" tracking="utility">
                  EST. 2024 // VERSION 2.0
                </Text>
              </Box>
            </Box>

            <Box
              maxWidth="[500px]"
              marginLeft={{ md: "40%" }}
              border="l"
              paddingLeft={8}
              className="border-accent"
            >
              <Text
                variant="body"
                size={{ base: "lg", lg: "2xl" }}
                color="dim"
                className="leading-snug text-pretty italic" // impeccable-ignore
              >
                Technical systems and travel hacks for the modern competitive dancer.
              </Text>
            </Box>
          </Stack>
        </Box>

        <Box width="full" className="border-y border-line">
          <PathSelector />
        </Box>

        <Stack gap={8} paddingX={{ base: 4, md: 6, lg: 12 }} marginTop={12}>
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

          <Grid
            cols={{ base: 1, md: 2 }}
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
                compact={true}
              />
            ))}
          </Grid>

          {/* Upcoming Events Mini-Grid */}
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
    </Box>
  );
}
