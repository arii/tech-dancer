import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';
import Equalizer from '@/components/Equalizer';

export default function Home() {
  const NUM_BARS = 48;
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick.blog: Training tips, travel guides, gear picks, and data for West Coast Swing dancers who want to get better and go further."
        schema={STATIC_SCHEMAS.HOME}
      />
      
      <Stack gap={12}>
        {/* Hero Section */}
        <Box paddingLeft={{ base: 4, md: 10 }} paddingTop={{ base: 6, md: 14 }} maxWidth="4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Text 
              size="xs" 
              weight="font-bold" 
              className="tracking-[0.28em] uppercase text-text-dim/70 mb-4"
            >
              Welcome to boomtick.blog
            </Text>
            <Text as="h1" variant="display" size="fluid-7" weight="font-black" className="leading-tight mb-4">
              The West Coast Swing Lifestyle Blog
            </Text>
            <Text size="lg" className="leading-7 text-text-body/78 max-w-xl">
              Training tips, travel guides, gear picks, and data for dancers who want to get better and go further.
            </Text>
          </motion.div>
        </Box>

        {/* Dual Path Hero */}
        <Box paddingX={{ base: 4, md: 10 }}>
          <Box 
            as={motion.div} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.15 }} 
            display="grid"
            cols={{ base: 1, lg: 2 }}
            radius="2xl"
            border
            overflow="hidden"
            minHeight={280}
            className="border-line/80 relative"
          >
            {/* Train Smarter */}
            <Box 
              position="relative" 
              minHeight={{ base: 220, sm: 260 }} 
              padding={8} 
              display="flex" 
              direction="col" 
              justify="end" 
              className="bg-[#0a0718] group"
            >
              <Box inset className="absolute bg-gradient-to-br from-primary/40 via-secondary/25 to-transparent" />
              <Box inset className="absolute bg-[#05040d]/60" />
              <Box position="absolute" inset="bottom" height={{ base: 20, sm: 28 }} overflow="hidden" opacity={0.08} zIndex={-1} className="pointer-events-none">
                <Equalizer compact count={NUM_BARS} />
              </Box>
              <Box position="relative" zIndex={10}>
                <Text as="h2" weight="font-black" size="3xl" className="mb-3 uppercase tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  Train smarter.
                </Text>
                <Text className="mb-5 max-w-xs text-sm leading-6 text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  Drills, breakdowns, and mindset for West Coast Swing dancers at every level.
                </Text>
                <Stack gap={2}>
                  <NavLink to="/blog?category=Training" className="text-sm font-semibold text-cyan-200 hover:text-cyan-100 transition-colors">WCS Training →</NavLink>
                  <NavLink to="/blog?category=Mindset" className="text-sm font-semibold text-cyan-200 hover:text-cyan-100 transition-colors">Competition tips →</NavLink>
                  <NavLink to="/gear" className="text-sm font-semibold text-cyan-200 hover:text-cyan-100 transition-colors">Gear reviews →</NavLink>
                </Stack>
              </Box>
            </Box>

            {/* Travel Better */}
            <Box 
              position="relative" 
              minHeight={{ base: 220, sm: 260 }} 
              padding={8} 
              display="flex" 
              border={{ base: "t", lg: "l" }}
              className="bg-[#0c0a1e] border-line group"
            >
              <Box inset className="absolute bg-gradient-to-bl from-secondary/40 via-accent/25 to-transparent" />
              <Box inset className="absolute bg-[#070616]/60" />
              <Box position="absolute" inset="bottom" height={{ base: 20, sm: 28 }} overflow="hidden" opacity={0.08} zIndex={-1} className="pointer-events-none">
                <Equalizer compact reverse count={NUM_BARS} />
              </Box>
              <Box position="relative" zIndex={10}>
                <Text as="h2" weight="font-black" size="3xl" className="mb-3 uppercase tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  Travel better.
                </Text>
                <Text className="mb-5 max-w-xs text-sm leading-6 text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
                </Text>
                <Stack gap={2}>
                  <NavLink to="/blog?category=Travel" className="text-sm font-semibold text-fuchsia-200 hover:text-fuchsia-100 transition-colors">Travel guides →</NavLink>
                  <NavLink to="/research" className="text-sm font-semibold text-fuchsia-200 hover:text-fuchsia-100 transition-colors">Event calendar →</NavLink>
                  <NavLink to="/gear" className="text-sm font-semibold text-fuchsia-200 hover:text-fuchsia-100 transition-colors">Packing lists →</NavLink>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Blog Posts */}
        <Stack gap={6} paddingX={{ base: 4, md: 10 }}>
          <Box display="flex" align="end" justify="between" width="full">
            <Stack gap={1}>
              <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-text-dim/65">Latest Updates</Text>
              <Text as="h2" size="2xl" weight="font-black">Recent Blog Posts</Text>
            </Stack>
            <Box as={NavLink} to="/blog" display="flex" align="center" gap={2} className="text-xs font-bold uppercase tracking-widest text-text-dim/75 hover:text-text-main transition-colors">
              View all posts <ArrowRight size={13} />
            </Box>
          </Box>

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
                variants={motionTokens.staggerItem}
                compact={true}
              />
            ))}
          </Grid>
        </Stack>

        {/* Events Grid */}
        <Stack gap={6} paddingX={{ base: 4, md: 10 }}>
          <Stack gap={1}>
            <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-text-dim/65">On the Circuit</Text>
            <Text as="h2" size="2xl" weight="font-black">Where Dancers Go</Text>
          </Stack>
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {upcomingEvents.map((event) => (
              <Box
                key={event.name}
                as={motion.div}
                variants={motionTokens.staggerItem}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                padding={5}
                radius="xl"
                border
                className="border-line/80 bg-surface shadow-sm transition-colors hover:border-primary/40"
              >
                <EventCard {...event} />
              </Box>
            ))}
          </Grid>
        </Stack>

        {/* Data Lab CTA */}
        <Box paddingX={{ base: 4, md: 10 }} paddingBottom={16}>
          <Box 
            display="flex" 
            direction={{ base: 'col', sm: 'row' }} 
            align={{ sm: 'center' }} 
            gap={4} 
            radius="2xl" 
            border 
            padding={6} 
            className="border-line/80 bg-surface/60"
          >
            <Box flex={1}>
              <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-accent mb-2">Data Lab</Text>
              <Text as="h3" size="lg" weight="font-black" className="mb-1">WCS Competition Analytics</Text>
              <Text size="sm" className="leading-7 text-text-body/72">
                Objective data on competition trends, scoring patterns, and point progression — because the numbers tell a story too.
              </Text>
            </Box>
            <Box 
              as={NavLink} 
              to="/research" 
              display="flex"
              align="center"
              justify="center"
              gap={2}
              radius="lg"
              border
              paddingX={5}
              paddingY={2.5}
              className="shrink-0 text-sm font-bold text-accent border-accent/40 hover:bg-accent/10 transition-colors"
            >
              Explore Data <ArrowRight size={14} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
