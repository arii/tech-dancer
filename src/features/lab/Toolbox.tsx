/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';

import { cn } from '@/lib/utils';
import { typography } from '@/styles/design-tokens';

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
    <Box as="section" panel>
      <motion.button 
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 text-accent-brand font-bold uppercase tracking-widest text-[10px] font-mono mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Toolbox
      </motion.button>

      <Stack gap={12} className="max-w-4xl mx-auto">
        <Stack direction="row" align="center" gap={4} className="relative">
          <Text variant="micro" className="absolute -top-4 right-0 select-none uppercase tracking-widest">ITEM_REF: {gear.slug?.toUpperCase()}</Text>
          <Text variant="mono" color="brand" className="border border-accent-brand/20 px-3 py-1 font-bold">
            {gear.category}
          </Text>
          <Stack direction="row" align="center" gap={2}>
            <Calendar className="w-3 h-3 text-text-dim" />
            <Text variant="mono" color="dim">{gear.date}</Text>
          </Stack>
        </Stack>

        <Text as="h1" variant="headline" size="text-4xl md:text-7xl">
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
    <Box as="section" panel>
      <Box surface="default" border className="mb-12 p-6 max-w-2xl relative">
        <Text variant="micro" className="absolute top-2 right-2">REF_ID: ADV_001</Text>
        <Text variant="mono" size="text-[11px]" className="text-text-dim leading-relaxed">
          <Text variant="mono" color="brand" weight="font-bold" className="mr-2">Advisory:</Text>
          This project ledger contains affiliate integrations. If you utilize these links for procurement, I may earn a commission. I exclusively advocate for hardware that has survived 12+ hour stress-tests in competition cycles.
        </Text>
      </Box>

      <Stack gap={8} className="mb-16 px-4 md:px-0">
        <Text variant="headline" size="text-5xl md:text-8xl">The Toolbox.</Text>
        <Text variant="body" size="text-lg md:text-xl">
          Solutions for the modern dancer. Tested for 8-hour social dance durability and hotel-room office efficiency.
        </Text>
      </Stack>

      <Box border className="mb-20 overflow-hidden bg-surface">
        <Box className="aspect-[21/7] bg-line overflow-hidden">
          <img 
            src="https://picsum.photos/seed/dance-gear/1200/500" 
            alt="Dance Gear" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack padding="nav" gap={6} className="p-12">
          <Text as="h3" variant="display" size="text-4xl">Lead with the Technical.</Text>
          <Text variant="body" size="text-lg" className="max-w-3xl">
            I don't just review products; I benchmark them in high-variance environments. From the 2:00 AM social floor to the 8:00 AM airport dash, 
            this is the hardware that survives the WSDC Registry cycles.
          </Text>
        </Stack>
      </Box>

      <Grid 
        cols={1} 
        md={12} 
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
        className="bg-line border-t border-l border-line"
      >
        {gear.map((item, index) => {
          const isWide = index % 3 === 0;
          return (
            <motion.div
              key={item.slug}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.002, x: 2 }}
              onClick={() => onSelect(item)}
              className={cn(
                "bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-colors flex flex-col h-full border-r border-b border-line relative overflow-hidden",
                isWide ? 'md:col-span-8' : 'md:col-span-4'
              )}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-brand scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
              <Stack direction="row" justify="between" align="start" className="mb-8">
                <ShoppingBag className="w-8 h-8 stroke-1 text-accent-brand group-hover:scale-110 transition-transform" />
                <Text variant="micro">ID_{index.toString().padStart(3, '0')}</Text>
              </Stack>
              <Stack gap={4} className="flex-1">
                <Stack direction="row" align="center" gap={4}>
                  <Text variant="mono" color="brand" weight="font-bold">{item.category}</Text>
                  <Box border className="border-accent-brand/30 px-2 py-0.5">
                    <Text variant="mono" color="brand" weight="font-bold" size="text-[9px]">HARDWARE</Text>
                  </Box>
                </Stack>
                <Text as="h4" variant="headline" size="text-2xl" className="group-hover:text-accent-brand transition-colors">
                  {item.title}
                </Text>
                <Text variant="body" size="text-sm" className="line-clamp-3 opacity-80">
                  {item.excerpt}
                </Text>
              </Stack>
              <Box className="mt-10 flex items-center gap-3 transition-transform group-hover:translate-x-1">
                <Text variant="label" color="brand">Inspect Tool</Text> <ArrowRight className="w-3 h-3 text-accent-brand" />
              </Box>
            </motion.div>
          );
        })}
      </Grid>
    </Box>
  );
}
