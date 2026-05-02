import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader, PageHeader } from '@/components/ui/PageHeader';
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
        description="BoomTick.blog: Exploring West Coast Swing through travel, lifestyle, and a touch of data science. The West Coast Swing Lifestyle Blog by Ariel Anders, PhD."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={6}>
        <Box paddingLeft={{ base: 4, md: 16, lg: 20 }}>
          <PageHeader
            label="WELCOME"
            title={<>The Lifestyle Guide <br className="hidden md:block" /> to West Coast Swing.</>}
            description="Exploring West Coast Swing through travel, lifestyle, and a touch of data science."
            border="none"
            paddingBottom={0}
            titleSize="fluid-7"
            descriptionMaxWidth="prose"
          />
        </Box>

        <Box width="full" className="border-y border-line">
          <PathSelector />
        </Box>

        <Stack gap={6} paddingX={{ base: 4, md: 6, lg: 12 }}>
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
            gap={6}
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
