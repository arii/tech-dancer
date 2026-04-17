/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { Badge } from '@/components/ui/badge';
import { typography } from '@/styles/design-tokens';
import { Repeat } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const chips = [
    'MIT_PHD_ROBOTICS', 
    'MIT_CSAIL_RESEARCHER', 
    'CIV_ROBOTICS_ENGINEER', 
    'INTERMEDIATE_WCS_FOLLOW', 
    'MCS_REGULAR', 
    'SF_LOCAL', 
    'MARRIOTT_TITANIUM', 
    'AMEX_PLATINUM'
  ];

  return (
    <Box as="section" panel>
      <Stack direction="row" gap={12} className="items-start mb-20 md:flex-row flex-col">
        <Box className="w-full md:w-1/3 border border-line aspect-square overflow-hidden bg-line">
          <img 
            src="https://picsum.photos/seed/ariel-anders/600/600" 
            alt="Ariel Anders"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack flex={1} gap={6} className="relative">
          <Text variant="micro" className="absolute top-0 right-0 select-none">FILE_REF: AA_001</Text>
          <Text variant="mono" color="brand">// PERSONNEL_FILE: AA_001</Text>
          <Text variant="headline" size="text-5xl md:text-8xl">Ariel Anders, PhD.</Text>
          <Text variant="body" size="text-xl md:text-2xl">MIT Roboticist. WCS Competitor. Data Architect.</Text>
          <Text variant="body" size="text-lg" className="opacity-80">
            I use my background in robotics to find the best gear, travel systems, and analysis platforms for the WSDC Registry. 
            Maximizing the WCS lifestyle through system-level optimization.
          </Text>
        </Stack>
      </Stack>

      <Grid cols={1} md={12} gap={0} border className="bg-line mb-20 overflow-hidden">
        <Box surface="default" className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line md:col-span-7">
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl">The Entry Point</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8]">
              My initiation into partner dance started in 2019 with Lindy Hop and Fusion. Seeking progression in San Francisco, I signed up for a series at Mission City Swing—not realizing it wasn't a Lindy venue. They were playing music like "In Da Club" by 50 Cent and it was so much fun that I never left. WCS is now my primary focus, driven by the WSDC Registry Ledger and the specialized mechanics of the community.
            </Text>
          </Stack>
        </Box>
        <Box surface="default" className="p-8 md:p-12 md:col-span-5">
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl">Scientific Merit</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8]">
              I care a lot about making things work. Since 2010, I’ve been dedicated to building robotic systems that remain reliable in complex and uncertain domains. From my PhD at MIT CSAIL to my work in industry, I build real-world systems that perform. I consider myself a pragmatic roboticist: I leverage machine learning alongside classical AI techniques to build robust modules.
            </Text>
          </Stack>
        </Box>
      </Grid>

      <Grid cols={1} md={12} gap={0} border className="bg-line mb-20 border-t-0 overflow-hidden">
        <Box surface="default" className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line md:col-span-5 relative">
          <Text variant="micro" className="absolute top-2 right-2 select-none">PROTOCOL: 004</Text>
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl">Registry Ledger Protocol</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8]">
              I’m a competitive Intermediate-level follow (and an occasional lead!) who loves the conversation and connection unique to WCS. Mission City Swing is my home base.
            </Text>
          </Stack>
        </Box>
        <Box surface="contrast" className="p-8 md:p-12 md:col-span-7 relative">
          <Text variant="micro" className="absolute top-2 right-2 select-none text-bg/40">SYSTEM: B.O.B</Text>
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl" className="text-bg">Bougie on a Budget</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8] text-bg/90">
              I maximize credit card perks and hotel benefits to make the WSDC competition cycle lifestyle both high-end and highly feasible. I'm known for "efficiency-first" travel philosophy.
            </Text>
          </Stack>
        </Box>
      </Grid>

      <Stack gap={8} className="px-4 md:px-0">
        <Text variant="mono" color="dim">// SYSTEM_MANIFEST: BACKGROUND_DATA</Text>
        <Box className="flex flex-wrap gap-2">
          {chips.map(chip => (
            <Badge key={chip} emphasis="outline" className="px-3 py-1 bg-surface text-text-main font-bold">
              {chip}
            </Badge>
          ))}
        </Box>
        <Box className="pt-8">
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://arii.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent-brand border border-accent-brand/20 px-6 py-3 hover:bg-accent-brand/10 transition-colors"
          >
            Request Full Log [External_Link] <Repeat className="w-3 h-3" />
          </motion.a>
        </Box>
      </Stack>
    </Box>
  );
}
