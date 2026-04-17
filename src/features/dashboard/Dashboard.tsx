/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Zap, Database, ArrowRight, Home as HomeIcon, Shield, Calendar } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { layout, typography, borders } from '../../styles/design-tokens';
import { Box, Stack, Text, Grid } from '../../components/layout/Primitives';

export default function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const latestUpdates = [
    {
      type: 'Blog',
      title: 'The Physics of the Pivot',
      desc: 'Why your choice of suede matters for spin stability.',
      date: 'April 15',
      link: 'blog'
    },
    {
      type: 'Gear',
      title: 'Suede Your Own Shoes',
      desc: 'The $15 DIY hack for perfect traction.',
      date: 'April 12',
      link: 'lab'
    },
    {
      type: 'Data',
      title: 'Scoring Variance Analysis',
      desc: 'Understanding judge bias in Intermediate finals.',
      date: 'April 08',
      link: 'engine'
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
      <Box className="min-h-full flex flex-col justify-center py-20">
        <Text variant="mono" color="accent" weight="font-bold" className="mb-4 block">
          // WELCOME
        </Text>
        
        <Stack gap={6} className="mb-24 px-4 md:px-0">
          <Text 
            as={motion.h1}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            variant="headline"
            size="text-5xl md:text-9xl"
          >
            The Roboticist's Guide to WCS.
          </Text>
          <Box className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
            <Text 
              as={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              variant="body"
              size="text-xl md:text-2xl"
              className="max-w-[75ch]"
            >
              Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis to maximize your West Coast Swing trajectory.
            </Text>
            <Box 
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="stats-widget !p-4 !m-0 border border-accent-brand bg-accent-brand/5 shrink-0 rounded-none shadow-none relative"
            >
              <div className="absolute top-1 right-1 text-[8px] font-mono opacity-30 select-none">REF_ID: STATUS_001</div>
              <Text variant="mono" color="accent" className="mb-1">Status: Optimized</Text>
              <div className="text-sm font-display font-medium">BOUGIE ON A BUDGET</div>
            </Box>
          </Box>
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
          className="space-y-0 border-y border-line"
        >
          <Grid cols={12} gap={0}>
            {/* Main Feature */}
            <Box 
              as={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => setActiveTab('lab')}
              className="col-span-12 lg:col-span-8 border-r border-line p-8 md:p-16 hover:bg-card-bg transition-colors cursor-pointer group"
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
                <Text as="h3" size="text-4xl md:text-6xl" weight="font-bold" className="uppercase leading-none">Hardware & Shell</Text>
                <Text variant="body" size="text-lg md:text-xl" className="max-w-xl">
                  Stress-tested apparel and footwear for the 3:00 AM social floor. From friction-reduction DIYs to sustainable packing manifests.
                </Text>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[2px] text-accent"
                >
                  Explore The Lab <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Stack>
            </Box>
            
            {/* Side Stack */}
            <Box className="col-span-12 lg:col-span-4 flex flex-col">
              <Box 
                as={motion.div}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => setActiveTab('feed')}
                className="flex-1 p-8 md:p-12 border-b border-line bg-accent text-white hover:bg-accent-orange transition-colors cursor-pointer group"
              >
                <Text variant="mono" weight="font-bold" size="text-[10px]" className="tracking-widest mb-8 opacity-60">COLLECTION: 01</Text>
                <Text as="h3" size="text-3xl" weight="font-bold" className="uppercase mb-4 text-white">Logistics Logic</Text>
                <Text variant="body" size="text-sm" className="mb-8 leading-relaxed text-white/80">
                  High-efficiency travel protocols. Hotel block arbitrage, flight matrix optimization, and status stacking.
                </Text>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px]"
                >
                  Access Systems <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Box>
              <Box 
                as={motion.div}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => setActiveTab('engine')}
                className="flex-1 p-8 md:p-12 bg-surface hover:bg-card-bg transition-colors cursor-pointer group"
              >
                <Text variant="mono" weight="font-bold" size="text-[10px]" color="accent" className="tracking-widest mb-8">ANALYSIS: 02</Text>
                <Text as="h3" size="text-3xl" weight="font-bold" className="uppercase mb-4 text-text-main">Predictive Engine</Text>
                <Text variant="body" size="text-sm" className="mb-8 leading-relaxed">
                  The physics of momentum and connection. Quantifying judge variance and heat density.
                </Text>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent"
                >
                  View Data <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Latest Updates Section */}
        <Box className={layout.section}>
          <Stack as={motion.div} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            direction="row" align="center" justify="between" className="border-b border-line pb-4 mb-8"
          >
            <Text variant="mono" size="text-sm" weight="font-bold" className="uppercase tracking-[3px] text-text-main">Latest Updates</Text>
            <Text variant="mono" className="text-text-dim">System Time: 2026.04.15</Text>
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
                  onClick={() => setActiveTab(update.link)}
                  border surface
                  className={cn(
                    layout.interactive,
                    "p-8",
                    isFirst ? 'md:col-span-7' : 'md:col-span-5'
                  )}
                >
                  <Box className="flex justify-between items-start mb-6">
                    <Box className="border border-accent-brand/20 px-3 py-1">
                      <Text variant="mono" color="accent" weight="font-bold">
                        {update.type}
                      </Text>
                    </Box>
                    <Text variant="mono" className="text-text-dim">{update.date}</Text>
                  </Box>
                  <Text variant="headline" size="text-3xl" className="group-hover:text-accent-brand transition-colors mb-4">
                    {update.title}
                  </Text>
                  <Text variant="body" size="text-base" className="line-clamp-2 opacity-80">
                    {update.desc}
                  </Text>
                  <Box className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[2px] text-accent-brand group-hover:translate-x-1 transition-transform">
                    Inspect Report <ArrowRight className="w-3 h-3" />
                  </Box>
                </Box>
              );
            })}
          </Grid>
        </Box>

        {/* WSDC Registry Ledger Section */}
        <Box className={layout.section}>
          <Box as={motion.div} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-baseline border-b border-line pb-4 mb-8"
          >
            <Text variant="mono" size="text-sm" weight="font-bold" className="uppercase tracking-[3px] text-text-main">WSDC Registry Ledger</Text>
            <Text variant="mono" color="accent" className="animate-pulse font-bold">● Live Itinerary</Text>
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
              <Box 
                as={motion.div}
                key={event.name} 
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
                  <Text variant="mono" color="accent" weight="font-bold">{event.status}</Text>
                  <Text variant="headline" size="text-lg" className="leading-tight">{event.name}</Text>
                  <Box className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-text-dim" />
                    <Text variant="mono" className="text-text-dim">{event.date}</Text>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Box>

        <Box border surface className="mt-24 w-fit pb-12 p-8 relative">
          <div className="absolute top-2 right-2 text-[8px] font-mono opacity-30 select-none">DATA_REF: 099</div>
          <Text variant="headline" size="text-3xl" color="accent">Registry Calibration</Text>
          <Text variant="mono" className="text-text-dim mt-2">
            Currently Obsessed: Hypervolt Mini & Motown Monday
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
