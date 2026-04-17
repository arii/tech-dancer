/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Stack, Text, Grid, Motion, Icon, Inline } from '@/components/layout/Primitives';
import { Badge } from '@/components/ui/badge';
import { Repeat } from 'lucide-react';

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
    <Box as="section" panel height="full" overflow="y-auto">
      <Stack direction={{ base: "col", md: "row" }} gap="2xl" marginBottom="3xl" align="start">
        <Box width={{ base: "full", md: "33%" }} border aspect="square" overflow="hidden" surface="muted">
          <Box 
            as="img" 
            src="https://picsum.photos/seed/ariel-anders/600/600" 
            alt="Ariel Anders"
            width="full"
            height="full"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack flex={1} gap="lg" position="relative">
          <Text variant="micro" position="absolute" insetTop={0} insetRight={0} opacity="50">FILE_REF: AA_001</Text>
          <Text variant="mono" color="brand" weight="font-bold">// PERSONNEL_FILE: AA_001</Text>
          <Text variant="headline" size="8xl">Ariel Anders, PhD.</Text>
          <Text variant="body" size="2xl" weight="font-medium">MIT Roboticist. WCS Competitor. Data Architect.</Text>
          <Text variant="body" size="lg" opacity="80">
            I use my background in robotics to find the best gear, travel systems, and analysis platforms for the WSDC Registry. 
            Maximizing the WCS lifestyle through system-level optimization.
          </Text>
        </Stack>
      </Stack>

      <Grid cols={{ base: 1, md: 12 }} gap={0} border marginBottom="3xl" overflow="hidden" surface="muted">
        <Box surface="default" padding={{ base: "xl", md: "3xl" }} border={{ base: "b", md: "r" }} span={{ base: 12, md: 7 }}>
          <Stack gap="xl">
            <Text as="h3" variant="display" size="2xl">The Entry Point</Text>
            <Text variant="body" size="base" className="leading-[1.8]">
              My initiation into partner dance started in 2019 with Lindy Hop and Fusion. Seeking progression in San Francisco, I signed up for a series at Mission City Swing—not realizing it wasn't a Lindy venue. They were playing music like "In Da Club" by 50 Cent and it was so much fun that I never left. WCS is now my primary focus, driven by the WSDC Registry Ledger and the specialized mechanics of the community.
            </Text>
          </Stack>
        </Box>
        <Box surface="default" padding={{ base: "xl", md: "3xl" }} span={{ base: 12, md: 5 }}>
          <Stack gap="xl">
            <Text as="h3" variant="display" size="2xl">Scientific Merit</Text>
            <Text variant="body" size="base" className="leading-[1.8]">
              I care a lot about making things work. Since 2010, I’ve been dedicated to building robotic systems that remain reliable in complex and uncertain domains. From my PhD at MIT CSAIL to my work in industry, I build real-world systems that perform. I consider myself a pragmatic roboticist: I leverage machine learning alongside classical AI techniques to build robust modules.
            </Text>
          </Stack>
        </Box>
      </Grid>

      <Grid cols={{ base: 1, md: 12 }} gap={0} border marginBottom="3xl" overflow="hidden" surface="muted">
        <Box surface="default" padding={{ base: "xl", md: "3xl" }} border={{ base: "b", md: "r" }} span={{ base: 12, md: 5 }} position="relative">
          <Text variant="micro" position="absolute" insetTop="sm" insetRight="sm" opacity="40">PROTOCOL: 004</Text>
          <Stack gap="xl">
            <Text as="h3" variant="display" size="2xl">Registry Ledger Protocol</Text>
            <Text variant="body" size="base" className="leading-[1.8]">
              I’m a competitive Intermediate-level follow (and an occasional lead!) who loves the conversation and connection unique to WCS. Mission City Swing is my home base.
            </Text>
          </Stack>
        </Box>
        <Box surface="contrast" padding={{ base: "xl", md: "3xl" }} span={{ base: 12, md: 7 }} position="relative">
          <Text variant="micro" position="absolute" insetTop="sm" insetRight="sm" opacity="40" className="text-bg">SYSTEM: B.O.B</Text>
          <Stack gap="xl">
            <Text as="h3" variant="display" size="2xl" className="text-bg">Bougie on a Budget</Text>
            <Text variant="body" size="base" className="leading-[1.8] text-bg/90">
              I maximize credit card perks and hotel benefits to make the WSDC competition cycle lifestyle both high-end and highly feasible. I'm known for "efficiency-first" travel philosophy.
            </Text>
          </Stack>
        </Box>
      </Grid>

      <Stack gap="lg" paddingX={{ base: "md", md: 0 }} paddingBottom="3xl">
        <Text variant="mono" color="dim" weight="font-bold">// SYSTEM_MANIFEST: BACKGROUND_DATA</Text>
        <Inline gap="sm" wrap>
          {chips.map(chip => (
            <Badge key={chip} emphasis="outline" surface="subsoil" paddingX="sm" paddingY="xs">
              {chip}
            </Badge>
          ))}
        </Inline>
        <Box paddingTop="xl">
          <Motion 
            as="a" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://arii.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            display="inline-flex"
            alignItems="center"
            gap="md"
            variant="mono"
            weight="font-bold"
            uppercase
            tracking="wider"
            size="sys"
            color="brand"
            border="brand"
            paddingX="xl"
            paddingY="lg"
            className="transition-colors hover:bg-accent-brand/10"
          >
            Request Full Log [External_Link] <Icon icon={Repeat} size="xs" color="brand" />
          </Motion>
        </Box>
      </Stack>
    </Box>
  );
}
