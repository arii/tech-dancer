import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';
import Equalizer from '@/components/Equalizer';

export default function Home() {
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
              className="tracking-[0.28em] uppercase text-text-dim mb-4"
            >
              Welcome to boomtick.blog
            </Text>
            <Text as="h1" variant="display" size="fluid-7" weight="font-black" className="leading-[0.96] mb-4 text-white">
              The West Coast Swing
              <br />
              Lifestyle Blog
            </Text>
            <Text size="lg" className="leading-7 text-white/88 max-w-xl">
              Training tips, travel guides, gear picks, and data — for dancers who want to get better and go further. Written by Ariel Anders.
            </Text>
          </motion.div>
        </Box>

        {/* Dual Path Hero */}
        <Box paddingX={{ base: 4, md: 10 }}>
          <Grid 
            as={motion.div} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.15 }} 
            cols={{ base: 1, lg: 2 }}
            radius="2xl"
            border
            overflow="hidden"
            minHeight={320}
            className="border-line/80 relative"
          >
            {/* Train Smarter */}
            <Box 
              position="relative" 
              minHeight={{ base: 280, sm: 320 }} 
              padding={8} 
              justify="end" 
              className="flex flex-col bg-[#0a0c18] group overflow-hidden"
            >
              <Box
                position="absolute"
                inset
                className="absolute pointer-events-none opacity-25"
                style={{
                  background:
                    'radial-gradient(circle at 50% 100%, rgba(0,207,255,.18), transparent 40%), linear-gradient(135deg, rgba(0,207,255,.08), rgba(139,47,255,.05) 40%, rgba(255,0,200,.06))',
                }}
              />
              <Box position="absolute" inset="bottom" left={0} right={0} height={170} zIndex={1}>
                <Equalizer />
              </Box>
              <Box position="relative" zIndex={10}>
                <Text as="h2" weight="font-black" size="4xl" className="mb-2 uppercase tracking-tighter text-white drop-shadow-sm">
                  Train smarter.
                </Text>
                <Text className="mb-4 max-w-xs text-sm leading-6 text-white/90">
                  Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.
                </Text>
                <Stack gap={1}>
                  <NavLink
                    to="/blog?category=Training"
                    className="text-sm font-bold text-[#7df9ff] hover:text-white transition-colors drop-shadow-sm"
                  >
                    WCS Training →
                  </NavLink>
                  <NavLink
                    to="/blog?category=Mindset"
                    className="text-sm font-bold text-[#7df9ff] hover:text-white transition-colors drop-shadow-sm"
                  >
                    Competition tips →
                  </NavLink>
                  <NavLink to="/gear" className="text-sm font-bold text-[#7df9ff] hover:text-white transition-colors drop-shadow-sm">
                    Gear reviews →
                  </NavLink>
                </Stack>
              </Box>
            </Box>

            {/* Travel Better */}
                          <Box 
                            position="relative" 
                            minHeight={{ base: 280, sm: 320 }} 
                            padding={8} 
                            justify="end" 
                            border={{ base: "t", lg: "l" }}
                            className="flex flex-col bg-[#0a0c18] border-line group overflow-hidden"
                          >              <Box
                inset
                className="absolute pointer-events-none opacity-25"
                style={{
                  background:
                    'radial-gradient(circle at 50% 100%, rgba(0,207,255,.18), transparent 40%), linear-gradient(135deg, rgba(0,207,255,.08), rgba(139,47,255,.05) 40%, rgba(255,0,200,.06))',
                }}
              />
              <Box position="absolute" inset="bottom" left={0} right={0} height={170} zIndex={1}>
                <Equalizer reverse />
              </Box>
              <Box position="relative" zIndex={10}>
                <Text as="h2" weight="font-black" size="4xl" className="mb-2 uppercase tracking-tighter text-white drop-shadow-sm">
                  Travel better.
                </Text>
                <Text className="mb-4 max-w-xs text-sm leading-6 text-white/90">
                  Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
                </Text>
                <Stack gap={1}>
                  <NavLink
                    to="/blog?category=Travel"
                    className="text-sm font-bold text-[#e9d5ff] hover:text-white transition-colors drop-shadow-sm"
                  >
                    Travel guides →
                  </NavLink>
                  <NavLink
                    to="/research"
                    className="text-sm font-bold text-[#e9d5ff] hover:text-white transition-colors drop-shadow-sm"
                  >
                    Event calendar →
                  </NavLink>
                  <NavLink to="/gear" className="text-sm font-bold text-[#e9d5ff] hover:text-white transition-colors drop-shadow-sm">
                    Packing lists →
                  </NavLink>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Blog Posts */}
        <Stack gap={6} paddingX={{ base: 4, md: 10 }}>
          <Box display="flex" align="end" justify="between" width="full">
            <Stack gap={1}>
              <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-text-dim">Latest Updates</Text>
              <Text as="h2" size="2xl" weight="font-black" className="text-white">Recent Posts</Text>
            </Stack>
            <Box as={NavLink} to="/blog" display="flex" align="center" gap={2} className="text-xs font-bold uppercase tracking-widest text-text-dim hover:text-primary transition-colors">
              View all posts <ArrowRight size={13} />
            </Box>
          </Box>

          <Stack
            gap={0}
            as={motion.div}
            variants={motionTokens.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="divide-y divide-line"
          >
            {recentPosts.map((post) => (
              <Box key={post.slug} paddingY={4}>
                <ContentCard
                  {...post}
                  basePath="/blog"
                  variants={motionTokens.staggerItem}
                  compact={true}
                />
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* Events Grid */}
        <Stack gap={6} paddingX={{ base: 4, md: 10 }}>
          <Stack gap={1}>
            <Text as="h2" size="2xl" weight="font-black" className="text-white">Where Dancers Go</Text>
          </Stack>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
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
            flexDirection={{ base: 'column', sm: 'row' }} 
            align={{ sm: 'center' }} 
            gap={4} 
            radius="2xl" 
            border 
            padding={6} 
            className="border-line/80 bg-surface/60"
          >
            <Box flex={1}>
              <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-accent mb-2">Data Lab</Text>
              <Text as="h3" size="lg" weight="font-black" className="mb-1 text-white">WCS Competition Analytics</Text>
              <Text size="sm" className="leading-7 text-text-body/90">
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
