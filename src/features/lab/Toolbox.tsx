/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid, Motion, Icon, Inline } from '@/components/layout/Primitives';

export default function Lab() {
  const [gear, setGear] = useState<ContentItem[]>([]);
  const [selectedGear, setSelectedGear] = useState<ContentItem | null>(null);

  useEffect(() => {
    const loadedResources = getAllContent('resources');
    setGear(loadedResources.filter(r => r.category === 'Gear' || r.tags?.includes('gear')));
  }, []);

  return selectedGear ? (
    <GearDetails gear={selectedGear} onBack={() => setSelectedGear(null)} />
  ) : (
    <GearList gear={gear} onSelect={setSelectedGear} />
  );
}

function GearDetails({ gear, onBack }: { gear: ContentItem; onBack: () => void }) {
  return (
    <Box as="section" panel height="full" overflow="y-auto">
      <Motion 
        as="button"
        whileHover={{ x: -4 }}
        onClick={onBack}
        display="flex"
        alignItems="center"
        gap="sm"
        color="brand"
        weight="font-bold"
        uppercase
        tracking="widest"
        size="sys"
        variant="mono"
        marginBottom="lg"
        cursor="pointer"
      >
        <Icon icon={ArrowLeft} size="sm" />
        Back to Toolbox
      </Motion>

      <Stack gap="xl" maxWidth="4xl" marginX="auto" paddingBottom="3xl">
        <Box position="relative" display="flex" alignItems="center" gap="md">
          <Text variant="micro" position="absolute" insetTop={-4} insetRight={0} cursor="default" uppercase tracking="widest">
            ITEM_REF: {gear.slug?.toUpperCase()}
          </Text>
          <Box border="accent" paddingX="sm" paddingY="xs">
            <Text variant="mono" color="brand" weight="font-bold">
              {gear.category}
            </Text>
          </Box>
          <Inline gap="xs">
            <Icon icon={Calendar} size="xs" color="dim" />
            <Text variant="mono" color="dim">{gear.date}</Text>
          </Inline>
        </Box>

        <Text as="h1" variant="headline" size="7xl">
          {gear.title}
        </Text>

        <Box className="markdown-body prose prose-invert max-w-none text-text-body leading-relaxed space-y-6">
          <Markdown>{gear.content}</Markdown>
        </Box>
      </Stack>
    </Box>
  );
}

function GearList({ gear, onSelect }: { gear: ContentItem[]; onSelect: (gear: ContentItem) => void }) {
  return (
    <Box as="section" panel height="full" overflow="y-auto">
      <Box surface="default" border marginBottom="xl" padding="lg" maxWidth="2xl" position="relative">
        <Text variant="micro" position="absolute" insetTop={2} insetRight={2}>REF_ID: ADV_001</Text>
        <Text variant="mono" size="xs" color="dim">
          <Text variant="mono" color="brand" weight="font-bold" marginRight="sm">Advisory:</Text>
          This project ledger contains affiliate integrations. If you utilize these links for procurement, I may earn a commission. I exclusively advocate for hardware that has survived 12+ hour stress-tests in competition cycles.
        </Text>
      </Box>

      <Stack gap="lg" marginBottom="2xl" paddingX={{ base: "md", md: 0 }}>
        <Text variant="headline" size="8xl">The Toolbox.</Text>
        <Text variant="body" size="xl">
          Solutions for the modern dancer. Tested for 8-hour social dance durability and hotel-room office efficiency.
        </Text>
      </Stack>

      <Box border marginBottom="3xl" overflow="hidden" surface="default">
        <Box aspect="video" surface="muted" overflow="hidden">
          <Motion
            as="img"
            src="https://picsum.photos/seed/dance-gear/1200/500" 
            alt="Dance Gear" 
            width="full"
            height="full"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack padding="xl" gap="lg">
          <Text as="h3" variant="display" size="4xl">Lead with the Technical.</Text>
          <Text variant="body" size="lg" maxWidth="3xl">
            I don't just review products; I benchmark them in high-variance environments. From the 2:00 AM social floor to the 8:00 AM airport dash, 
            this is the hardware that survives the WSDC Registry cycles.
          </Text>
        </Stack>
      </Box>

      <Grid 
        cols={{ base: 1, md: 12 }}
        as={Motion}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
        surface="muted"
        border="t"
        className="border-l border-line"
      >
        {gear.map((item, index) => {
          const isWide = index % 3 === 0;
          return (
            <Motion
              key={item.slug}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.002, x: 2 }}
              onClick={() => onSelect(item)}
              span={{ base: 12, md: isWide ? 8 : 4 }}
              surface="default"
              padding={{ base: "lg", md: "xl" }}
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="full"
              border={{ base: "b", md: "r" }}
              position="relative"
              overflow="hidden"
              className="group hover:bg-card-bg transition-colors"
            >
              <Box position="absolute" insetTop={0} insetLeft={0} width={1} height="full" surface="accent" className="scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
              <Inline justify="between" align="start" marginBottom="xl">
                <Icon icon={ShoppingBag} size="lg" color="brand" className="stroke-1 group-hover:scale-110 transition-transform" />
                <Text variant="micro">ID_{index.toString().padStart(3, '0')}</Text>
              </Inline>
              <Stack gap="md" flex>
                <Inline gap="md">
                  <Text variant="mono" color="brand" weight="font-bold">{item.category}</Text>
                  <Box border="brand" paddingX="sm" paddingY="0.5">
                    <Text variant="mono" color="brand" weight="font-bold" size="micro">HARDWARE</Text>
                  </Box>
                </Inline>
                <Text as="h4" variant="headline" size="2xl" className="group-hover:text-accent-brand transition-colors">
                  {item.title}
                </Text>
                <Text variant="body" size="sm" opacity="80" className="line-clamp-3">
                  {item.excerpt}
                </Text>
              </Stack>
              <Inline gap="sm" marginTop="2xl" className="transition-transform group-hover:translate-x-1">
                <Text variant="label" color="brand">Inspect Tool</Text> <Icon icon={ArrowRight} size="xs" color="brand" />
              </Inline>
            </Motion>
          );
        })}
      </Grid>
    </Box>
  );
}
