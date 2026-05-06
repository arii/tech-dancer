import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

export default function Home() {
  const { recentPosts, upcomingEvents, handleNavigate } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick.blog: Exploring West Coast Swing through travel, lifestyle, and a touch of data science."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={12}>
        <Box paddingLeft={{ base: 4, md: 16, lg: 20 }} paddingTop={12}>
          <Text
            size="xs"
            weight="font-bold"
            tracking="widest" uppercase color="dim" marginBottom={4}
            as="div"
          >
            Welcome to boomtick.blog
          </Text>
          <Text as="h1" variant="headline" size="fluid-7" weight="font-black" leading="snug" marginBottom={4}>
            The Lifestyle Guide <br className="hidden md:block" />
            to West Coast Swing
          </Text>
          <Text size="lg" color="dim" maxWidth="prose">
            Technical systems and travel hacks for the modern competitive dancer.
          </Text>
        </Box>

        {/* Path Selectors Refactored */}
        <Grid cols={{ base: 1, lg: 2 }} gap={0} border="y" className="border-line">
           <Stack
              position="relative"
              minHeight={{ base: 280, sm: 320 }}
              padding={8}
              justify="end"
              direction="col" surface="surface" className="group overflow-hidden"
              cursor="pointer"
              onClick={() => handleNavigate('/blog?category=Training')}
            >
              <Box position="absolute" inset="top" height="full" width="full" opacity={0.1} className="industrial-gradient group-hover:scale-105 transition-transform duration-700" />
              <Stack gap={2} position="relative" zIndex="base">
                <Text as="h2" variant="headline" weight="font-black" size="4xl" marginBottom={2} uppercase tracking="tighter" color="white">
                  Train smarter.
                </Text>
                <Text variant="body" marginBottom={4} maxWidth="xs" size="sm" color="white" className="leading-6">
                  Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.
                </Text>
                <Box display="flex" align="center" gap={2} color="accent" className="font-bold text-sm group-hover:translate-x-2 transition-transform">
                   <span>WCS Training</span>
                   <ArrowRight className="w-4 h-4" />
                </Box>
              </Stack>
           </Stack>

           <Stack
              position="relative"
              minHeight={{ base: 280, sm: 320 }}
              padding={8}
              justify="end"
              border={{ base: "t", lg: "l" }}
              direction="col" surface="surface" className="group overflow-hidden border-line"
              cursor="pointer"
              onClick={() => handleNavigate('/blog?category=Travel')}
            >
              <Box position="absolute" inset="top" height="full" width="full" opacity={0.1} className="industrial-gradient group-hover:scale-105 transition-transform duration-700" />
              <Stack gap={2} position="relative" zIndex="base">
                <Text as="h2" variant="headline" weight="font-black" size="4xl" marginBottom={2} uppercase tracking="tighter" color="white">
                  Travel better.
                </Text>
                <Text variant="body" marginBottom={4} maxWidth="xs" size="sm" color="white" className="leading-6">
                  Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
                </Text>
                <Box display="flex" align="center" gap={2} color="accent" className="font-bold text-sm group-hover:translate-x-2 transition-transform">
                   <span>Travel guides</span>
                   <ArrowRight className="w-4 h-4" />
                </Box>
              </Stack>
           </Stack>
        </Grid>

        <Stack gap={6} paddingX={{ base: 4, md: 6, lg: 12 }}>
           {/* Data Lab CTA */}
           <Stack
            direction={{ base: 'col', sm: 'row' }}
            align={{ sm: 'center' }}
            gap={6}
            radius="2xl"
            border
            padding={6}
            className="border-line/80 bg-surface/60"
            cursor="pointer"
            onClick={() => handleNavigate('/research')}
          >
            <Box width={16} height={16} radius="xl" surface="muted" display="flex" align="center" justify="center" color="accent" shrink={0}>
               <ArrowRight className="w-8 h-8" />
            </Box>
            <Stack gap={1} flex={1}>
               <Text size="xs" weight="font-bold" tracking="widest" uppercase color="accent" marginBottom={2}>Data Lab</Text>
               <Text as="h3" variant="headline" size="lg" weight="font-black" marginBottom={1}>WCS Competition Analytics</Text>
               <Text size="sm" color="dim">Exploring kinematics, judge variance, and biomechanics through data.</Text>
            </Stack>
            <ArrowRight className="w-6 h-6 text-line hidden sm:block" />
          </Stack>

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

          <Box paddingY={8} border="y" className="border-line/50">
             <SectionHeader label="WHERE DANCERS GO" title="Upcoming Events" />
             <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4} marginTop={8}>
              {upcomingEvents.map((event) => (
                <EventCard 
                  key={event.name} 
                  {...event} 
                  variants={motionTokens.staggerItem}
                />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
