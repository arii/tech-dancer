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
        <Box className="w-full md:w-1/3 border border-line aspect-square overflow-hidden bg-line shadow-industrial">
          <img 
            src="https://picsum.photos/seed/ariel-anders/600/600" 
            alt="Ariel Anders, PhD"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack flex={1} gap={6} className="relative">
          <Text variant="micro" className="absolute top-0 right-0 select-none">FILE_REF: AA_001</Text>
          <Text variant="mono" color="brand">// personnel_file: ariel_anders_phd</Text>
          <Text variant="headline" size="text-5xl md:text-8xl">Ariel Anders, PhD</Text>
          <Text variant="body" size="text-xl md:text-2xl" weight="font-bold" color="main">MIT Roboticist // WCS Tech-Dancer</Text>
          <Text variant="body" size="text-lg" className="opacity-80">
            I am a competitive Intermediate-level follow (and an occasional lead!) who loves the unique conversation and connection WCS offers. 
            I use my background in robotics to engineer real-world systems that deliver results, both in the lab and on the dance floor.
          </Text>
        </Stack>
      </Stack>

      <Grid cols={1} md={12} gap={0} border className="bg-line mb-20 overflow-hidden">
        <Box surface="default" className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line md:col-span-7">
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl">My Dance Journey</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8]">
              I started my journey into partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF.
            </Text>
          </Stack>
        </Box>
        <Box surface="default" className="p-8 md:p-12 md:col-span-5">
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl">Why My PhD Matters</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8]">
              I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand.
            </Text>
          </Stack>
        </Box>
      </Grid>

      <Grid cols={1} md={12} gap={0} border className="bg-line mb-20 border-t-0 overflow-hidden">
        <Box surface="default" className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line md:col-span-5 relative">
          <Text variant="micro" className="absolute top-2 right-2 select-none">DATA_PROTOCOL: 004</Text>
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl">Why I Built This Site</Text>
            <Text variant="body" size="text-[15px]" className="leading-[1.8]">
              People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems.
            </Text>
          </Stack>
        </Box>
        <Box surface="contrast" className="p-8 md:p-12 md:col-span-7 relative">
          <Text variant="micro" className="absolute top-2 right-2 select-none text-bg/40">SYSTEM: BOUGIE_ON_BUDGET</Text>
          <Stack gap={8}>
            <Text as="h3" variant="display" size="text-2xl" className="text-bg">Financial Strategies for WCS</Text>
            <Stack gap={4}>
              <Text variant="body" size="text-[15px]" className="leading-[1.8] text-bg/90">
                I love maximizing credit card perks and hotel benefits, which helps me make the convention circuit lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my 'bougie on a budget' travel philosophy.
              </Text>
              <Box border surface="dim" padding={4} className="bg-white/10 border-white/20">
                <Text variant="mono" size="xs" color="white" className="text-white">Note: Ensure you use credit cards as debit cards. Recommend signing up for a Roth IRA and avoiding FOMO-driven spending.</Text>
              </Box>
            </Stack>
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
