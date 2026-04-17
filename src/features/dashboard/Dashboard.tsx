/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Home as HomeIcon, Shield, Calendar } from 'lucide-react';
import { Box, Stack, Text, Grid, Motion, Icon } from '../../components/layout/Primitives';

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
    <Box as="section" panel height="full" overflow="y-auto">
      <Stack justify="center" paddingTop="xl" paddingBottom="3xl" paddingX="lg">
        <Text variant="mono" color="brand" weight="font-bold" marginBottom="md" display="block">
          // WELCOME_TO_THE_REGISTRY
        </Text>
        
        <Stack gap="xl" marginBottom="3xl">
          <Text 
            as={Motion}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            variant="headline"
            size="9xl"
          >
            The Roboticist's Guide to WCS.
          </Text>
          <Stack direction={{ base: "col", md: "row" }} gap="lg" align={{ base: "start", md: "end" }} justify="between" marginTop="xl">
            <Text 
              as={Motion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              variant="body"
              size="3xl"
              maxWidth="prose"
            >
              Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis to maximize your West Coast Swing trajectory.
            </Text>
            <Motion 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              surface="default"
              border
              padding="md"
              shadow="sm"
              position="relative"
              shrink={0}
            >
              <Text variant="micro" size="micro" position="absolute" insetTop={1} insetRight={1} cursor="default">REF_ID: STATUS_001</Text>
              <Text variant="mono" size="micro" color="brand" marginBottom="xs">Status: Optimized</Text>
              <Text variant="display" size="base">BOUGIE ON A BUDGET</Text>
            </Motion>
          </Stack>
        </Stack>
        
        <Motion
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
          <Grid cols={{ base: 1, lg: 12 }} gap={0}>
            {/* Main Feature */}
            <Motion 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => navigate('/lab')}
              span={{ base: 1, lg: 8 }}
              border={{ base: "b", lg: "r" }}
              padding={{ base: "lg", md: "xl" }}
              cursor="pointer"
              surface="default"
              className="hover:bg-card-bg transition-colors group"
            >
              <Box aspect="video" overflow="hidden" surface="muted">
                <Motion 
                  as="img"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  src="https://picsum.photos/seed/gear-stack/1200/675" 
                  alt="Hardware & Shell" 
                  width="full"
                  height="full"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </Box>
              <Stack gap="lg" marginTop="xl">
                <Text as="h3" size="8xl" weight="font-bold" uppercase>Hardware & Shell</Text>
                <Text variant="body" size="2xl" maxWidth="lg">
                  Stress-tested apparel and footwear for the 3:00 AM social floor. From friction-reduction DIYs to sustainable packing manifests.
                </Text>
                <Motion 
                  whileHover={{ x: 5 }}
                  display="flex"
                  alignItems="center"
                  gap="sm"
                >
                  <Text variant="label" size="sm" color="accent">Explore The Lab</Text> 
                  <Icon icon={ArrowRight} size="xs" color="accent" />
                </Motion>
              </Stack>
            </Motion>
            
            {/* Side Stack */}
            <Box span={{ base: 1, lg: 4 }} display="flex" flexDirection="column">
              <Motion 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => navigate('/feed')}
                flex
                padding={{ base: "lg", md: "xl" }}
                border="b"
                surface="contrast"
                cursor="pointer"
                className="hover:opacity-90 transition-opacity group"
              >
                <Text variant="micro" size="micro" marginBottom="lg" opacity="60" color="contrast">COLLECTION: 01</Text>
                <Text as="h3" variant="display" size="4xl" marginBottom="md" color="contrast">Logistics Logic</Text>
                <Text variant="body" size="sm" marginBottom="lg" color="contrast" opacity="80">
                  High-efficiency travel protocols. Hotel block arbitrage, flight matrix optimization, and status stacking.
                </Text>
                <Motion 
                  whileHover={{ x: 5 }}
                  display="inline-flex"
                  alignItems="center"
                  gap="sm"
                >
                  <Text variant="label" size="sm" color="contrast">Access Systems</Text> <Icon icon={ArrowRight} size="xs" color="contrast" />
                </Motion>
              </Motion>
              <Motion 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => navigate('/engine')}
                flex
                padding={{ base: "lg", md: "xl" }}
                surface="default"
                cursor="pointer"
                className="hover:bg-card-bg transition-colors group"
              >
                <Text variant="micro" size="micro" color="brand" marginBottom="lg">ANALYSIS: 02</Text>
                <Text as="h3" variant="display" size="4xl" marginBottom="md">Predictive Engine</Text>
                <Text variant="body" size="sm" marginBottom="lg" opacity="80">
                  The physics of momentum and connection. Quantifying judge variance and heat density.
                </Text>
                <Motion 
                  whileHover={{ x: 5 }}
                  display="inline-flex"
                  alignItems="center"
                  gap="sm"
                >
                  <Text variant="label" size="sm" color="brand">View Data</Text> <Icon icon={ArrowRight} size="xs" color="brand" />
                </Motion>
              </Motion>
            </Box>
          </Grid>
        </Motion>

        {/* Latest Updates Section */}
        <Box marginTop="3xl">
          <Stack as={Motion} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            direction="row" align="center" justify="between" border="b" paddingBottom="md" marginBottom="xl"
          >
            <Text variant="label" size="sm">Latest Updates</Text>
            <Text variant="micro" size="micro">System Time: 2026.04.15</Text>
          </Stack>
          
          <Grid as={Motion} 
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
            cols={{ base: 1, md: 12 }} gap="lg"
          >
            {latestUpdates.map((update, idx) => {
              const isFirst = idx === 0;
              return (
                <Motion
                  key={update.title}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(update.link)}
                  span={{ base: 12, md: isFirst ? 7 : 5 }}
                  border surface="default"
                  padding="lg"
                  cursor="pointer"
                  className="group hover:border-accent-brand transition-colors"
                >
                  <Stack direction="row" justify="between" align="start" marginBottom="lg">
                    <Box border="accent" paddingX="sm" paddingY="xs">
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">
                        {update.type}
                      </Text>
                    </Box>
                    <Text variant="mono" size="micro" color="dim">{update.date}</Text>
                  </Stack>
                  <Text variant="headline" size="4xl" marginBottom="md" className="group-hover:text-accent-brand transition-colors">
                    {update.title}
                  </Text>
                  <Text variant="body" size="lg" opacity="80" className="line-clamp-2">
                    {update.desc}
                  </Text>
                  <Stack direction="row" align="center" gap="sm" marginTop="xl" className="group-hover:translate-x-1 transition-transform">
                    <Text variant="label" size="sm" color="brand">Inspect Report</Text> <Icon icon={ArrowRight} size="xs" color="brand" />
                  </Stack>
                </Motion>
              );
            })}
          </Grid>
        </Box>

        {/* WSDC Registry Ledger Section */}
        <Box marginTop="3xl">
          <Motion 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            display="flex" justify="between" alignItems="baseline" border="b" paddingBottom="md" marginBottom="xl"
          >
            <Text variant="label" size="sm">WSDC Registry Ledger</Text>
            <Text variant="label" size="sm" color="brand" className="animate-pulse">● Live Itinerary</Text>
          </Motion>
          
          <Grid as={Motion} 
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
            cols={{ base: 1, md: 2, lg: 3 }}
            surface="muted"
            border
          >
            {upcomingEvents.map((event) => (
              <Motion 
                key={event.name} 
                direction="row"
                gap="md"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                surface="default"
                padding="lg"
                display="flex"
                alignItems="start"
                cursor="default"
                className="hover:bg-accent/5 transition-colors group"
              >
                <Box width={10} height={10} border surface="muted" display="flex" alignItems="center" justifyContent="center" shrink={0} className="group-hover:border-accent transition-colors">
                  <Icon icon={event.icon} size="sm" color="accent" className="stroke-1" />
                </Box>
                <Stack gap="xs">
                  <Text variant="mono" size="micro" color="brand" weight="font-bold">{event.status}</Text>
                  <Text variant="display" size="xl" weight="font-bold">{event.name}</Text>
                  <Stack direction="row" align="center" gap="sm">
                    <Icon icon={Calendar} size="xs" color="dim" />
                    <Text variant="micro" size="micro" color="dim" uppercase>{event.date}</Text>
                  </Stack>
                </Stack>
              </Motion>
            ))}
          </Grid>
        </Box>

        <Box border surface="default" padding="lg" marginTop="3xl" width="fit" position="relative">
          <Text variant="micro" size="micro" position="absolute" insetTop={2} insetRight={2} cursor="default">DATA_REF: 099</Text>
          <Text variant="headline" size="4xl" color="brand">Registry Calibration</Text>
          <Text variant="mono" size="sm" color="dim" marginTop="sm">
            Currently Obsessed: Hypervolt Mini & Motown Monday
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
