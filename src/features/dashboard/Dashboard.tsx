import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Play, Zap } from 'lucide-react';
import Equalizer from '@/components/Equalizer';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Stack direction="col" gap={0} width="full" className="overflow-hidden">
      <SEO
        title="Home"
        description="BoomTick.blog: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The West Coast Swing Lifestyle Blog by Tech Dancer."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* impeccable-ignore */}
      <Box as="section" position="relative" className="min-h-90vh" paddingTop={12} paddingBottom={20} display="flex" align="center" width="full">
        <Grid cols={{ base: 1, lg: 2 }} gap={16} align="center" width="full">
          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Stack direction="col" gap={6}>
              <Stack align="center" gap={3}>
                {/* impeccable-ignore */}
                <Box className="w-8 h-2px bg-accent-brand"></Box>
                <Text variant="sans" size="sm" weight="font-bold" className="text-accent-brand tracking-widest uppercase">West Coast Swing</Text>
              </Stack>

              {/* impeccable-ignore */}
              <Text variant="display" as="h1" className="text-5xl md:text-7xl font-black leading-1-1 tracking-tight">
                Built for dancers.<br/>
                {/* impeccable-ignore */}
                <span className="hero-title-gradient">Train smarter.</span><br/>
                Dance better.
              </Text>

              <Text variant="sans" size="xl" className="text-text-dim leading-relaxed max-w-lg">
                Data-driven insights, gear reviews, and travel strategies for the competitive West Coast Swing circuit.
              </Text>

              <Stack direction={{ base: "col", md: "row"}} gap={4} marginTop={4} wrap="wrap">
                <Box as={NavLink} to="/research" paddingX={8} paddingY={4} radius="md" display="flex" align="center" gap={2} className="bg-accent-brand text-bg font-bold hover:opacity-90 transition-opacity">
                  Enter The Lab <ArrowRight size={20} />
                </Box>
                <Box as={NavLink} to="/blog" paddingX={8} paddingY={4} radius="md" display="flex" align="center" gap={2} className="bg-accent-navy/10 text-accent-navy font-bold hover:bg-accent-navy/20 transition-colors">
                  <Play size={20} /> Watch Latest
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Box
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            position="relative"
            className="aspect-square"
          >
            {/* impeccable-ignore */}
            <Box position="absolute" className="inset-0 brand-gradient-bg opacity-50 blur-2xl"></Box>
            <Equalizer />
          </Box>
        </Grid>
      </Box>

      <Box as="section" paddingY={24} marginTop={8} className="border-y border-line rounded-3xl bg-surface" paddingX={{ base: 6, lg: 12 }} width="full">
        <Box width="full">
          <Stack direction={{ base: 'col', md: 'row' }} gap={12} justify="between" align="end" marginBottom={16}>
            <Box className="max-w-2xl">
              <Text variant="display" as="h2" size="4xl" weight="font-bold" marginBottom={4} className="text-text-main md:text-5xl">The Data Lab</Text>
              <Text variant="sans" size="lg" className="text-text-dim">We analyze thousands of competition results to uncover the real patterns behind tier progression and competitive success.</Text>
            </Box>
            <Box as={NavLink} to="/research" display="flex" align="center" gap={2} className="text-accent-brand hover:opacity-80 transition-colors font-bold tracking-widest uppercase text-sm">
              View Methods <ArrowRight size={16} />
            </Box>
          </Stack>

          <Grid cols={{ base: 1, md: 3 }} gap={6}>
            {[
              { stat: "12,450", label: "Competition results analyzed", trend: "+14% this month" },
              { stat: "98%", label: "Accuracy in tier progression models", trend: "Updated weekly" },
              { stat: "2.4M", label: "Data points collected", trend: "Since 2018" }
            ].map((item, i) => (
              <Box key={i} padding={8} className="bg-surface border border-line rounded-xl relative overflow-hidden group">
                {/* impeccable-ignore */}
                <Box position="absolute" className="top-0 left-0 w-full h-1 brand-gradient-bg opacity-0 group-hover:opacity-100 transition-opacity"></Box>
                <Text variant="mono" size="4xl" weight="font-bold" marginBottom={2} className="tracking-tighter text-text-main">{item.stat}</Text>
                <Text variant="sans" weight="font-medium" marginBottom={4} className="text-text-body">{item.label}</Text>
                <Stack align="center" gap={2} className="text-sm text-accent-navy">
                  <Zap size={14} /> {item.trend}
                </Stack>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box as="section" paddingY={24} width="full">
        <Stack justify="between" align="end" marginBottom={12}>
          <Text variant="display" as="h2" size="4xl" weight="font-bold" className="text-text-main md:text-5xl">Latest Intel</Text>
          <Stack as={NavLink} to="/blog" align="center" gap={2} display={{ base: "none", md: "flex"}} className="text-text-dim hover:text-text-main transition-colors uppercase text-sm font-bold tracking-widest as-button">
            View All <ArrowRight size={16} />
          </Stack>
        </Stack>
        <Grid
            cols={{ base: 1, md: 2 }}
            gap={6}
            as={motion.div}
            variants={motionTokens.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {recentPosts.slice(0, 3).map((post) => (
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
      </Box>

      <Box as="section" paddingY={24} paddingX={{ base: 6, lg: 12 }} marginTop={8} marginBottom={8} className="border-y border-line w-full rounded-3xl bg-surface">
        <Box width="full">
          <Stack direction={{ base: 'col', md: 'row' }} align="center" gap={12}>
            <Box className="md:w-1/3">
              <Text variant="display" as="h2" size="4xl" weight="font-bold" marginBottom={4} className="text-text-main md:text-5xl">Gear Picks</Text>
              <Text variant="sans" size="lg" marginBottom={8} className="text-text-dim">Stop slipping. Stop sticking. Find the exact shoes, soles, and training equipment the pros use.</Text>
              <Box as={NavLink} to="/gear" paddingX={6} paddingY={3} radius="md" className="border-2 border-text-main font-bold uppercase tracking-widest text-sm hover:bg-text-main hover:text-bg transition-colors text-text-main">
                Shop The Guide
              </Box>
            </Box>
            <Grid cols={{ base: 1, sm: 2 }} gap={4} className="md:w-2/3">
               {[
                 { name: "SwayD Urban", type: "Dance Sneaker", price: "$110" },
                 { name: "Taygra Split", type: "Competition Boot", price: "$145" },
                 { name: "G-Franco", type: "Street Sole", price: "$95" },
                 { name: "Suede Brush", type: "Maintenance", price: "$12" }
               ].map((item, i) => (
                 <Box key={i} padding={6} className="bg-surface border border-line rounded-xl hover:border-accent-brand/50 transition-colors cursor-pointer group">
                   <Stack align="center" justify="center" marginBottom={4} className="aspect-square bg-bg rounded-md overflow-hidden text-text-dim group-hover:text-accent-brand transition-colors">
                     <ShoppingBag size={32} />
                   </Stack>
                   <Text variant="sans" size="lg" weight="font-bold" className="text-text-main">{item.name}</Text>
                   <Stack justify="between" align="center" marginTop={2}>
                     <span className="text-sm text-text-dim">{item.type}</span>
                     <span className="text-accent-brand font-mono">{item.price}</span>
                   </Stack>
                 </Box>
               ))}
            </Grid>
          </Stack>
        </Box>
      </Box>

      <Box as="section" paddingY={24} width="full">
        <Box width="full">
          <Text variant="display" as="h2" size="4xl" weight="font-bold" marginBottom={4} className="text-center text-text-main md:text-5xl">Events</Text>
          <Box marginX="auto" className="max-w-2xl">
            <Text variant="sans" size="lg" marginBottom={12} className="text-text-dim text-center">Where to go, where to stay, and what to eat when you're not in the ballroom.</Text>
          </Box>
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {upcomingEvents.slice(0, 4).map((event) => (
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
        </Box>
      </Box>

      <Box as="section" paddingY={32} position="relative" marginTop={8} marginBottom={8} className="overflow-hidden w-full rounded-3xl bg-surface">
        {/* impeccable-ignore */}
        <Box position="absolute" className="inset-0 brand-gradient-bg opacity-50"></Box>
        <Box position="relative" paddingX={6} marginX="auto" className="max-w-3xl text-center z-10">
          <Text variant="display" as="h2" size="4xl" weight="font-black" marginBottom={6} className="text-text-main md:text-6xl">Never miss a beat.</Text>
          <Text variant="sans" size="xl" marginBottom={10} className="text-text-dim">Join 5,000+ competitive dancers receiving our weekly breakdown of training tactics, gear drops, and data insights.</Text>
          <Box marginX="auto" className="max-w-md">
            <Stack direction={{ base: 'col', sm: 'row' }} gap={4}>
              <Box flex={1} as="input" paddingX={6} paddingY={4} className="bg-surface border border-line rounded-lg focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand text-text-main font-mono placeholder:text-text-dim backdrop-blur-sm" type="email" placeholder="YOUR EMAIL ADDRESS" />
              <Box as={NavLink} to="/contact" paddingX={8} paddingY={4} className="bg-accent-brand text-bg font-bold rounded-lg hover:opacity-90 transition-colors uppercase tracking-wide ">
                Contact Us
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
