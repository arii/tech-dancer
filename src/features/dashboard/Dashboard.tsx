/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Home as HomeIcon, Shield, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Box, Stack, Text, Grid } from '../../components/layout/Primitives';

export default function Home() {
  const navigate = useNavigate();
  const latestUpdates = [
    {
      type: 'Blog',
      title: 'The Physics of the Pivot',
      desc: 'Why your choice of suede matters for spin stability.',
      date: 'April 15',
      link: '/blog'
    },
    {
      type: 'Gear',
      title: 'Suede Your Own Shoes',
      desc: 'The $15 DIY hack for perfect traction.',
      date: 'April 12',
      link: '/lab'
    },
    {
      type: 'Data',
      title: 'Scoring Variance Analysis',
      desc: 'Understanding judge bias in Intermediate finals.',
      date: 'April 08',
      link: '/engine'
    }
  ];

  const upcomingEvents = [
    { name: 'Mission City Swing', date: 'Every Wednesday', status: 'Local Regular', icon: HomeIcon },
    { name: 'So Swing', date: 'May 2026', status: 'Featured Event', icon: Zap },
    { name: 'Jack & Jill Orama', date: 'June 2026', status: 'Region Captain (NorCal/Best Cal)', icon: Shield },
    { name: 'Phoenix 4th of July', date: 'July 2026', status: 'Featured Event', icon: Zap },
    { name: 'Swingtacular', date: 'August 2026', status: 'Featured Event', icon: Zap },
    { name: 'Boogie by the Bay', date: 'October 2026', status: 'Featured Event', icon: Zap },
  ];

  return (
    <Box as="section" padding="panel">
      <Stack justify="center" padding="hero" minHeight="full">
        <Text variant="mono" color="brand" weight="font-bold" marginBottom={4} display="block">
          // WELCOME_TO_THE_REGISTRY
        </Text>
        
        <Stack gap={6} marginBottom={24} paddingX={{ base: 4, md: 0 }}>
          <Text 
            as={motion.h1}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            variant="headline"
            size="9xl"
          >
            The Roboticist's Guide to the West Coast Swing.
          </Text>
          <Stack direction={{ base: "col", md: "row" }} gap={8} align={{ base: "start", md: "end" }} justify="between" marginTop={12}>
            <Stack gap={4} maxWidth="4xl">
              <Text 
                as={motion.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                variant="body"
                size="3xl"
              >
                Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS lifestyle.
              </Text>
              <Text 
                as={motion.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                variant="body"
                size="lg"
                color="dim"
              >
                Welcome to tech-dancer. You’re looking at a living portfolio as a platform. Enjoy the WCS content or dive into the technical details.
              </Text>
            </Stack>
            <Box 
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              surface="default"
              border
              padding="compact"
              shadow="industrial"
              margin={0}
              shrink={0}
              position="relative"
              className="stats-widget hidden lg:block"
            >
              <Text variant="micro" size="micro" position="absolute" className="top-1 right-1 select-none">REF_ID: STATUS_001</Text>
              <Text variant="mono" size="micro" color="brand" marginBottom={1}>Status: Optimized</Text>
              <Text variant="display" size="base">BOUGIE ON A BUDGET</Text>
            </Box>
          </Stack>
        </Stack>
        
        <Box
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          border="y"
        >
          <Grid cols={1} lg={12} gap={0}>
            {/* Path 1: Are you a dancer? */}
            <Box 
              as={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              lg={{ span: 7 }}
              border="b"
              lgBorder={{ b: 0, r: true }}
              padding={{ base: 8, md: 16 }}
              className="bg-surface/30 relative overflow-hidden group scanline-hover"
            >
              <Stack gap={12} className="relative z-10">
                <Stack gap={4}>
                  <Text variant="mono" color="brand" size="sm" weight="font-bold">// PATH_01: LIFESTYLE_OPT</Text>
                  <Text as="h2" size="8xl" weight="font-bold" uppercase className="leading-none">Are you a dancer?</Text>
                </Stack>
                
                <Grid cols={1} md={2} gap={8}>
                  <Box 
                    onClick={() => navigate('/blog')}
                    cursor="pointer"
                    className="group-hover/item"
                  >
                    <Box aspect="square" overflow="hidden" surface="dim" marginBottom={4} border>
                      <img src="https://picsum.photos/seed/dance-life/600/600" alt="Lifestyle" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                    </Box>
                    <Text variant="label" size="sm" color="accent" display="flex" align="center" gap={2}>
                      Lifestyle blog posts <ArrowRight className="w-3 h-3" />
                    </Text>
                  </Box>
                  <Box 
                    onClick={() => navigate('/lab')}
                    cursor="pointer"
                  >
                    <Box aspect="square" overflow="hidden" surface="dim" marginBottom={4} border>
                      <img src="https://picsum.photos/seed/gear-review/600/600" alt="Gear" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                    </Box>
                    <Text variant="label" size="sm" color="accent" display="flex" align="center" gap={2}>
                      Gear reviews <ArrowRight className="w-3 h-3" />
                    </Text>
                  </Box>
                </Grid>
              </Stack>
            </Box>
            
            {/* Path 2: Are you looking to hire? */}
            <Box 
              as={motion.div}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              lg={{ span: 5 }}
              display="flex"
              direction="col"
              className="bg-bg relative"
            >
              <Box 
                flex={1}
                padding={{ base: 8, md: 12 }}
                border="b"
                className="group scanline-hover"
              >
                <Stack gap={8}>
                  <Stack gap={4}>
                    <Text variant="mono" color="brand" size="sm" weight="font-bold">// PATH_02: TECHNICAL_ARCH</Text>
                    <Text as="h3" variant="display" size="4xl">Looking to hire a roboticist or AI expert?</Text>
                  </Stack>
                  
                  <Stack gap={4}>
                    <Box onClick={() => navigate('/blog')} cursor="pointer" className="flex items-center justify-between border-b border-line pb-4 hover:border-accent-brand transition-colors group/link">
                      <Text variant="body" size="lg">→ Tech blog posts</Text>
                      <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover/link:translate-x-1" />
                    </Box>
                    <Box onClick={() => navigate('/systems')} cursor="pointer" className="flex items-center justify-between border-b border-line pb-4 hover:border-accent-brand transition-colors group/link">
                      <Text variant="body" size="lg">→ Data & Development Lab</Text>
                      <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover/link:translate-x-1" />
                    </Box>
                    <Box onClick={() => navigate('/about')} cursor="pointer" className="flex items-center justify-between hover:text-accent-brand transition-colors group/link">
                      <Text variant="body" size="lg">→ About / Contact Page</Text>
                      <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover/link:translate-x-1" />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              
              <Box 
                padding={{ base: 8, md: 10 }}
                surface="dim"
                className="border-t border-line"
              >
                <Text variant="mono" size="micro" color="dim" marginBottom={4}>CURRENT_PROJECT</Text>
                <Text variant="display" size="xl" marginBottom={2}>Predictive Scoring Engine</Text>
                <Text variant="body" size="sm" color="dim">Quantifying judge variance through computer vision and trajectory analysis.</Text>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Latest Updates Section */}
        <Stack gap={8} marginTop={24}>
          <Stack as={motion.div} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            direction="row" align="center" justify="between" border="b" paddingBottom={4} marginBottom={8}
          >
            <Text variant="label" size="sm">Latest Updates</Text>
            <Text variant="micro" size="micro">System Time: 2026.04.15</Text>
          </Stack>
          
          <Grid as={motion.div} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            cols={1} md={12} gap={8}
          >
            {latestUpdates.map((update, idx) => {
              const isFirst = idx === 0;
              return (
                <Box
                  as={motion.div}
                  key={update.title}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  md={{ span: isFirst ? 7 : 5 }}
                  whileHover={{ y: -5, borderColor: 'var(--color-accent-brand)' }}
                  onClick={() => navigate(update.link)}
                  border surface="default"
                  padding={8}
                  cursor="pointer"
                  className="group"
                >
                  <Stack direction="row" justify="between" align="start" marginBottom={6}>
                    <Box border paddingX={3} paddingY={1} emphasis="dim">
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">
                        {update.type}
                      </Text>
                    </Box>
                    <Text variant="mono" size="micro" color="dim">{update.date}</Text>
                  </Stack>
                  <Text variant="headline" size="4xl" marginBottom={4} className="group-hover:text-accent-brand transition-colors">
                    {update.title}
                  </Text>
                  <Text variant="body" size="lg" opacity="80" className="line-clamp-2">
                    {update.desc}
                  </Text>
                  <Stack direction="row" align="center" gap={3} marginTop={8} className="group-hover:translate-x-1 transition-transform">
                    <Text variant="label" size="sm" color="brand">Inspect Report</Text> <ArrowRight className="w-3 h-3 text-accent-brand" />
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        </Stack>

        {/* WSDC Registry Ledger Section */}
        <Stack gap={8} marginTop={24}>
          <Box as={motion.div} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            display="flex" justify="between" align="baseline" border="b" paddingBottom={4} marginBottom={8}
          >
            <Text variant="label" size="sm">WSDC Registry Ledger</Text>
            <Text variant="label" size="sm" color="brand" className="animate-pulse">● Live Itinerary</Text>
          </Box>
          
          <Grid as={motion.div} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            cols={1} md={2} lg={3}
            surface="dim"
            border
          >
            {upcomingEvents.map((event) => (
              <Box 
                as={motion.div}
                key={event.name} 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                surface
                padding={6}
                display="flex"
                align="start"
                gap={4}
                cursor="default"
                className="hover:bg-accent/5 transition-colors group"
              >
                <Box width={10} height={10} border surface="dim" display="flex" className="items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors">
                  <event.icon className="w-5 h-5 stroke-1" />
                </Box>
                <Stack gap={1}>
                  <Text variant="mono" size="micro" color="brand" weight="font-bold">{event.status}</Text>
                  <Text variant="display" size="xl" className="leading-tight">{event.name}</Text>
                  <Stack direction="row" align="center" gap={2}>
                    <Calendar className="w-3 h-3 text-text-dim" />
                    <Text variant="micro" size="micro" opacity="100" uppercase color="dim">{event.date}</Text>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>

        <Box border surface="default" padding="card" marginTop={24} width="fit" position="relative">
          <Text variant="micro" size="micro" position="absolute" className="top-2 right-2 select-none">DATA_REF: 099</Text>
          <Text variant="headline" size="4xl" color="brand">Registry Calibration</Text>
          <Text variant="mono" size="sm" color="dim" marginTop={2} className="text-wrap">
            Currently Obsessed: Hypervolt Mini & Motown Monday
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
