/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid, Motion, Icon, Inline } from '@/components/layout/Primitives';

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
        Back to Resources
      </Motion>

      <Stack gap="xl" maxWidth="4xl" marginX="auto" paddingBottom="3xl">
        <Box position="relative" display="flex" alignItems="center" gap="md">
          <Text variant="micro" position="absolute" insetTop={-4} insetRight={0} tracking="widest">
            ASSET_REF: {resource.slug?.toUpperCase()}
          </Text>
          <Box border="accent" paddingX="sm" paddingY="xs">
            <Text variant="mono" color="brand" weight="font-bold">
              {resource.category}
            </Text>
          </Box>
          <Inline gap="xs">
            <Icon icon={Calendar} size="xs" color="dim" />
            <Text variant="mono" color="dim">{resource.date}</Text>
          </Inline>
        </Box>

        <Text as="h1" variant="headline" size="7xl">
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
    <Box as="section" panel height="full" overflow="y-auto">
      <Stack gap="lg" marginBottom="2xl" paddingX={{ base: "md", md: 0 }}>
        <Text variant="headline" size="8xl">Resources.</Text>
        <Text variant="body" size="xl">
          The Toolbox: Resources for the Road. Curated systems for travel, gear, and lifestyle optimization.
        </Text>
      </Stack>

      <Box border marginBottom="2xl" overflow="hidden" surface="default">
        <Box aspect="video" surface="muted" overflow="hidden">
          <Box 
            as="img"
            src="https://picsum.photos/seed/dance-resources/1200/500" 
            alt="Dance Resources" 
            width="full"
            height="full"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </Box>
        <Stack padding="2xl" gap="lg" maxWidth="4xl">
          <Text as="h3" variant="display" size="4xl">Optimized Assets.</Text>
          <Text variant="body" size="lg">
            These are the protocols and hardware I use to maintain a high-performance WSDC Registry lifestyle. 
            From friction-coefficient mods to Titanium-status stacking, these systems are verified by 20+ weekends on the competition cycle annually.
          </Text>
        </Stack>
      </Box>

      <Motion 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
        display="grid"
        cols={{ base: 1, md: 12 }}
        surface="muted"
        border="t"
        borderLeft
      >
        {resources.map((resource, index) => {
          const LucideIcon = getIcon(resource.category);
          const isWide = index % 2 === 0;
          return (
            <Motion
              key={resource.slug}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ x: 2 }}
              onClick={() => onSelect(resource)}
              surface="default"
              padding={{ base: "xl", md: "2xl" }}
              display="flex"
              flexDirection="column"
              height="full"
              borderRight
              borderBottom
              position="relative"
              overflow="hidden"
              cursor="pointer"
              span={{ base: 12, md: isWide ? 7 : 5 }}
              className="group hover:bg-card-bg transition-colors"
            >
              <Box 
                position="absolute" 
                insetTop={0} 
                insetLeft={0} 
                width={1} 
                height="full" 
                surface="accent" 
                className="bg-accent-brand scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" 
              />
              <Inline justify="between" align="start" marginBottom="xl">
                <Icon icon={LucideIcon} size="lg" color="brand" className="group-hover:scale-110 transition-transform" />
                <Text variant="micro">REF_{index.toString().padStart(3, '0')}</Text>
              </Inline>
              <Stack gap="lg" flex="full">
                <Inline gap="md">
                  <Text variant="mono" color="brand" weight="font-bold">{resource.category}</Text>
                  <Box border paddingX="xs" paddingY="0.5" className="border-accent-brand/30">
                    <Text variant="mono" color="brand" weight="font-bold" size="micro">PROTOCOL</Text>
                  </Box>
                </Inline>
                <Text as="h4" variant="headline" size="2xl" className="group-hover:text-accent-brand transition-colors">
                  {resource.title}
                </Text>
                <Text variant="body" size="sm" opacity="80" className="line-clamp-3">
                  {resource.excerpt}
                </Text>
              </Stack>
              <Inline marginTop="2xl" gap="md" className="group-hover:translate-x-1 transition-transform">
                <Text variant="label" color="brand" size="micro">Access System</Text> <Icon icon={ArrowRight} size="xs" color="brand" />
              </Inline>
            </Motion>
          );
        })}
      </Motion>
    </Box>
  );
}
