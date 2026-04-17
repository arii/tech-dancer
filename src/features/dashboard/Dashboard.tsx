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
    <Box as="section" panel>
      <Stack justify="center" padding="hero" className="min-h-full">
        <Text variant="mono" color="brand" weight="font-bold" className="mb-4 block">
          // WELCOME_TO_THE_REGISTRY
        </Text>
        
        <Stack gap={6} className="mb-24 px-4 md:px-0">
          <Text 
            as={motion.h1}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            variant="headline"
            size="9xl"
          >
            The Roboticist's Guide to WCS.
          </Text>
          <Stack direction={{ base: "col", md: "row" }} gap={8} align={{ base: "start", md: "end" }} justify="between" className="mt-12">
            <Text 
              as={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              variant="body"
              size="3xl"
              className="max-w-[75ch]"
            >
              Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis to maximize your West Coast Swing trajectory.
            </Text>
            <Box 
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              surface="default"
              border
              padding="compact"
              shadow="industrial"
              className="stats-widget !m-0 shrink-0 relative"
            >
              <Text variant="micro" size="micro" className="absolute top-1 right-1 select-none">REF_ID: STATUS_001</Text>
              <Text variant="mono" size="micro" color="brand" className="mb-1">Status: Optimized</Text>
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
          className="border-y border-line"
        >
          <Grid cols={1} lg={12} gap={0}>
            {/* Main Feature */}
            <Box 
              as={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => navigate('/lab')}
              className="col-span-1 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-line p-8 md:p-16 hover:bg-card-bg transition-colors cursor-pointer group"
            >
              <Box className="aspect-[16/9] overflow-hidden bg-line">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  src="https://picsum.photos/seed/gear-stack/1200/675" 
                  alt="Hardware & Shell" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </Box>
              <Stack gap={6} className="mt-12">
                <Text as="h3" size="8xl" weight="font-bold" className="uppercase leading-none">Hardware & Shell</Text>
                <Text variant="body" size="2xl" className="max-w-xl">
                  Stress-tested apparel and footwear for the 3:00 AM social floor. From friction-reduction DIYs to sustainable packing manifests.
                </Text>
                <Box 
                  as={motion.div}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <Text variant="label" size="sm" color="accent">Explore The Lab</Text> <ArrowRight className="w-4 h-4 text-accent" />
                </Box>
              </Stack>
            </Box>
            
            {/* Side Stack */}
            <Box className="col-span-1 lg:col-span-4 flex flex-col">
              <Box 
                as={motion.div}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => navigate('/feed')}
                className="flex-1 p-8 md:p-12 border-b border-line bg-accent text-white hover:bg-accent-orange transition-colors cursor-pointer group"
              >
                <Text variant="micro" size="micro" className="mb-8 opacity-60 text-white">COLLECTION: 01</Text>
                <Text as="h3" variant="display" size="4xl" className="mb-4 text-white">Logistics Logic</Text>
                <Text variant="body" size="sm" className="mb-8 leading-relaxed text-white/80">
                  High-efficiency travel protocols. Hotel block arbitrage, flight matrix optimization, and status stacking.
                </Text>
                <Box 
                  as={motion.div} 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2"
                >
                  <Text variant="label" size="sm" className="text-white">Access Systems</Text> <ArrowRight className="w-4 h-4 text-white" />
                </Box>
              </Box>
              <Box 
                as={motion.div}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => navigate('/engine')}
                className="flex-1 p-8 md:p-12 bg-surface hover:bg-card-bg transition-colors cursor-pointer group"
              >
                <Text variant="micro" size="micro" color="brand" className="mb-8">ANALYSIS: 02</Text>
                <Text as="h3" variant="display" size="4xl" className="mb-4 text-text-main">Predictive Engine</Text>
                <Text variant="body" size="sm" className="mb-8 leading-relaxed">
                  The physics of momentum and connection. Quantifying judge variance and heat density.
                </Text>
                <Box 
                  as={motion.div} 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2"
                >
                  <Text variant="label" size="sm" color="brand">View Data</Text> <ArrowRight className="w-4 h-4 text-accent-brand" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Latest Updates Section */}
        <Box className="mt-24 space-y-8">
          <Stack as={motion.div} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            direction="row" align="center" justify="between" className="border-b border-line pb-4 mb-8"
          >
            <Text variant="label" size="sm" className="text-text-main">Latest Updates</Text>
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
                  whileHover={{ y: -5, borderColor: 'var(--color-accent-brand)' }}
                  onClick={() => navigate(update.link)}
                  border surface="default"
                  className={cn(
                    "p-8 cursor-pointer group",
                    isFirst ? 'md:col-span-7' : 'md:col-span-5'
                  )}
                >
                  <Stack direction="row" justify="between" align="start" className="mb-6">
                    <Box className="border border-accent-brand/20 px-3 py-1">
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">
                        {update.type}
                      </Text>
                    </Box>
                    <Text variant="mono" size="micro" color="dim">{update.date}</Text>
                  </Stack>
                  <Text variant="headline" size="4xl" className="group-hover:text-accent-brand transition-colors mb-4">
                    {update.title}
                  </Text>
                  <Text variant="body" size="lg" className="line-clamp-2 opacity-80">
                    {update.desc}
                  </Text>
                  <Box className="mt-8 flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                    <Text variant="label" size="sm" color="brand">Inspect Report</Text> <ArrowRight className="w-3 h-3 text-accent-brand" />
                  </Box>
                </Box>
              );
            })}
          </Grid>
        </Box>

        {/* WSDC Registry Ledger Section */}
        <Box className="mt-24 space-y-8">
          <Box as={motion.div} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-baseline border-b border-line pb-4 mb-8"
          >
            <Text variant="label" size="sm" className="text-text-main">WSDC Registry Ledger</Text>
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
            className="bg-line border border-line"
          >
            {upcomingEvents.map((event) => (
              <Stack 
                as={motion.div}
                key={event.name} 
                direction="row"
                gap={4}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="bg-bg p-6 flex items-start gap-4 hover:bg-accent/5 transition-colors group cursor-default"
              >
                <Box className="w-10 h-10 border border-line bg-line flex items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors">
                  <event.icon className="w-5 h-5 stroke-1" />
                </Box>
                <Stack gap={1}>
                  <Text variant="mono" size="micro" color="brand" weight="font-bold">{event.status}</Text>
                  <Text variant="display" size="xl" className="leading-tight">{event.name}</Text>
                  <Box className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-text-dim" />
                    <Text variant="micro" size="micro" className="text-text-dim opacity-100 uppercase">{event.date}</Text>
                  </Box>
                </Stack>
              </Stack>
            ))}
          </Grid>
        </Box>

        <Box border surface="default" padding="card" className="mt-24 w-fit relative">
          <Text variant="micro" size="micro" className="absolute top-2 right-2 select-none">DATA_REF: 099</Text>
          <Text variant="headline" size="4xl" color="brand">Registry Calibration</Text>
          <Text variant="mono" size="sm" color="dim" className="mt-2 text-wrap">
            Currently Obsessed: Hypervolt Mini & Motown Monday
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
