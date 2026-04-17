/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';

import { cn } from '@/lib/utils';
import { typography } from '@/styles/design-tokens';

export default function Feed() {
  const [resources, setResources] = useState<ContentItem[]>([]);
  const [selectedResource, setSelectedResource] = useState<ContentItem | null>(null);

  useEffect(() => {
    const loadedResources = getAllContent('resources');
    setResources(loadedResources);
  }, []);

  return selectedResource ? (
    <ResourceDetails resource={selectedResource} onBack={() => setSelectedResource(null)} />
  ) : (
    <ResourceList resources={resources} onSelect={setSelectedResource} />
  );
}

function ResourceDetails({ resource, onBack }: { resource: ContentItem; onBack: () => void }) {
  return (
    <Box as="section" panel>
      <motion.button 
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 text-accent-brand font-bold uppercase tracking-widest text-[10px] font-mono mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </motion.button>

      <Stack gap={12} className="max-w-4xl mx-auto">
        <Stack direction="row" align="center" gap={4} className="relative">
          <Text variant="micro" className="absolute -top-4 right-0 select-none uppercase tracking-widest">ASSET_REF: {resource.slug?.toUpperCase()}</Text>
          <Text variant="mono" color="brand" className="border border-accent-brand/20 px-3 py-1 font-bold">
            {resource.category}
          </Text>
          <Stack direction="row" align="center" gap={2}>
            <Calendar className="w-3 h-3 text-text-dim" />
            <Text variant="mono" color="dim">{resource.date}</Text>
          </Stack>
        </Stack>

        <Text as="h1" variant="headline" size="text-4xl md:text-7xl">
          {resource.title}
        </Text>

        <Box className="markdown-body prose prose-invert max-w-none text-text-body leading-relaxed space-y-6">
          <Markdown>{resource.content}</Markdown>
        </Box>
      </Stack>
    </Box>
  );
}

function ResourceList({ resources, onSelect }: { resources: ContentItem[]; onSelect: (resource: ContentItem) => void }) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Travel': return Plane;
      case 'Systems': return Database;
      case 'Gear': return Scissors;
      case 'Recovery': return Activity;
      case 'Focus': return Shield;
      default: return BookOpen;
    }
  };

  return (
    <Box as="section" panel>
      <Stack gap={8} className="mb-16 px-4 md:px-0">
        <Text variant="headline" size="text-5xl md:text-8xl">Resources.</Text>
        <Text variant="body" size="text-lg md:text-xl">
          The Toolbox: Resources for the Road. Curated systems for travel, gear, and lifestyle optimization.
        </Text>
      </Stack>

      <Box border className="mb-16 overflow-hidden bg-surface">
        <Box className="aspect-[21/7] bg-line overflow-hidden">
          <img 
            src="https://picsum.photos/seed/dance-resources/1200/500" 
            alt="Dance Resources" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack padding="nav" gap={6} className="p-12">
          <Text as="h3" variant="display" size="text-4xl">Optimized Assets.</Text>
          <Text variant="body" size="text-lg" className="max-w-3xl">
            These are the protocols and hardware I use to maintain a high-performance WSDC Registry lifestyle. 
            From friction-coefficient mods to Titanium-status stacking, these systems are verified by 20+ weekends on the competition cycle annually.
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
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.category);
          const isWide = index % 2 === 0;
          return (
            <motion.div
              key={resource.slug}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.002, x: 2 }}
              onClick={() => onSelect(resource)}
              className={cn(
                "bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-colors flex flex-col h-full border-r border-b border-line relative overflow-hidden",
                isWide ? 'md:col-span-7' : 'md:col-span-5'
              )}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-brand scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
              <Stack direction="row" justify="between" align="start" className="mb-8">
                <Icon className="w-8 h-8 stroke-1 text-accent-brand group-hover:scale-110 transition-transform" />
                <Text variant="micro">REF_{index.toString().padStart(3, '0')}</Text>
              </Stack>
              <Stack gap={4} className="flex-1">
                <Stack direction="row" align="center" gap={4}>
                  <Text variant="mono" color="brand" weight="font-bold">{resource.category}</Text>
                  <Box border className="border-accent-brand/30 px-2 py-0.5">
                    <Text variant="mono" color="brand" weight="font-bold" size="text-[9px]">PROTOCOL</Text>
                  </Box>
                </Stack>
                <Text as="h4" variant="headline" size="text-2xl" className="group-hover:text-accent-brand transition-colors">
                  {resource.title}
                </Text>
                <Text variant="body" size="text-sm" className="line-clamp-3 opacity-80">
                  {resource.excerpt}
                </Text>
              </Stack>
              <Box className="mt-10 flex items-center gap-3 transition-transform group-hover:translate-x-1">
                <Text variant="label" color="brand">Access System</Text> <ArrowRight className="w-3 h-3 text-accent-brand" />
              </Box>
            </motion.div>
          );
        })}
      </Grid>
    </Box>
  );
 }
