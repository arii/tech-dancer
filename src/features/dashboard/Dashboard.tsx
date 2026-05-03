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
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { motionTokens } from '@/styles/motion';
import { cn } from '@/lib/utils';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  const features = [
    { id: 'traingrow' as const, label: 'TRAIN &', sub: 'GROW', colors: ['#00F2FE', '#764BA2'] },
    { id: 'travel' as const, label: 'TRAVEL', sub: 'BETTER', colors: ['#A18CD1', '#FBC2EB'] },
    { id: 'shop' as const, label: 'SHOP', sub: 'SMART', colors: ['#F093FB', '#F5576C'] },
    { id: 'data' as const, label: 'DATA', sub: 'DRIVEN', colors: ['#5EE7DF', '#B490CA'] },
  ];

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="BoomTick.blog: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The West Coast Swing Lifestyle Blog by Tech Dancer."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack gap={6}>
        {/* Dark Hero Section */}
        <Box
          position="relative"
          paddingTop={20}
          paddingBottom={32}
          paddingX={{ base: 4, md: 6, lg: 12 }}
          className="bg-[#020205] text-white overflow-hidden rounded-3xl" // impeccable-ignore
        >
          {/* Background Visualizer Effect */}
          <Box
            position="absolute"
            inset={true}
            zIndex={0}
            display="flex"
            align="end"
            justify="center"
            gap={{ base: 1, md: 2 }}
            className="opacity-50 select-none pointer-events-none"
          >
            {[...Array(60)].map((_, i) => {
              const h = Math.random() * 60 + 20;
              const d = Math.random() * 2 + 1;
              const color = i < 30 ? 'bg-blue-500' : 'bg-purple-500';
              return (
                <div
                  key={i}
                  className={cn("visualizer-bar w-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]", color)} // impeccable-ignore
                  style={{ // impeccable-ignore
                    '--h': `${h}%`,
                    '--d': `${d}s`,
                    animationDelay: `${Math.random() * 2}s`
                  } as React.CSSProperties} // impeccable-ignore
                />
              );
            })}
          </Box>

          <Box position="relative" zIndex={10} maxWidth="3xl">
            <Text
              as="h1"
              variant="display"
              weight="font-black"
              className="text-7xl md:text-9xl mb-4 leading-[0.85] text-white" // impeccable-ignore
            >
              Built for<br />
              <span className="text-gradient-cyan-blue" // impeccable-ignore
              >
                dancers.
              </span>
            </Text>
            <Text
              variant="body"
              size={{ base: "xl", md: "2xl" }}
              weight="font-medium"
              marginBottom={12}
              maxWidth="xl"
              className="text-white/60" // impeccable-ignore
            >
              Training, travel, and data for competitive WCS dancers.
            </Text>

            {/* Feature Grid */}
            <Grid
              cols={{ base: 2, lg: 4 }}
              gap={8}
              marginTop={16}
              paddingTop={12}
              className="border-t border-white/10"
            >
              {features.map((f) => (
                <Stack key={f.id} direction="col" align={{ base: "center", lg: "start" }} className="text-center lg:text-left">
                  <FeatureIcon type={f.id} colors={f.colors} />
                  <Stack direction="col">
                    <Text
                      as="span"
                      variant="mono"
                      weight="font-black"
                      tracking="widest"
                      className="text-[10px] text-white opacity-50" // impeccable-ignore
                    >
                      {f.label}
                    </Text>
                    <Text
                      as="span"
                      variant="mono"
                      size="sm"
                      weight="font-black"
                      tracking="widest"
                      className="text-white"
                    >
                      {f.sub}
                    </Text>
                  </Stack>
                </Stack>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box width="full" marginTop={6} className="border-y border-line">
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
