/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from 'react-router-dom';
import { Shield, Plane, Hotel, Activity, Code, Server, Music, ArrowRight, User, Calendar, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { Box, Stack, Text, Grid, Motion, Icon, Inline } from '@/components/layout/Primitives';

export default function Engine() {
  const [studies, setStudies] = useState<ContentItem[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<ContentItem | null>(null);

  useEffect(() => {
    const loadedStudies = getAllContent('studies');
    setStudies(loadedStudies);
  }, []);

  const experiencePacks = [
    {
      category: 'Footwear',
      focus: 'Biomechanics & Friction',
      benefit: 'Spin longer without knee pain.',
      icon: Activity
    },
    {
      category: 'Travel Rig',
      focus: 'Modular Efficiency',
      benefit: 'Work from the hotel, social dance all night.',
      icon: Plane
    },
    {
      category: 'Acoustics',
      focus: 'Frequency Response',
      benefit: 'Hear the leader’s breath and the bass line.',
      icon: Music
    }
  ];

  if (selectedStudy) {
    return (
      <Box as="section" panel height="full" overflow="y-auto">
        <Stack gap="xl" maxWidth="4xl" marginX="auto" paddingBottom="3xl">
          <Motion 
            as="button"
            whileHover={{ x: -4 }}
            onClick={() => setSelectedStudy(null)}
            display="flex"
            alignItems="center"
            gap="sm"
            color="accent"
            weight="font-bold"
            uppercase
            tracking="widest"
            size="sys"
            variant="mono"
            marginBottom="lg"
            cursor="pointer"
          >
            <Icon icon={ArrowLeft} size="sm" />
            Back to Journal
          </Motion>

          <Inline gap="md" marginBottom="lg">
            <Box surface="accent" border="accent" paddingX="sm" paddingY="xs">
              <Text variant="mono" size="micro" color="brand" weight="font-bold" uppercase>{selectedStudy.category}</Text>
            </Box>
            <Inline gap="xs">
              <Icon icon={Calendar} size="xs" color="dim" />
              <Text variant="mono" size="micro" color="dim">{selectedStudy.date}</Text>
            </Inline>
          </Inline>

          <Text as="h1" variant="headline" size="7xl" marginBottom="xl">
            {selectedStudy.title}
          </Text>

          <Box className="markdown-body prose prose-invert max-w-none text-text-body leading-relaxed space-y-6">
            <Markdown>{selectedStudy.content}</Markdown>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" panel height="full" overflow="y-auto">
      <Stack gap="lg" marginBottom="2xl" paddingX={{ base: "md", md: 0 }}>
        <Text variant="headline" size="8xl">The Engine.</Text>
        <Text variant="body" size="xl">
          Deep-dive analysis on the mechanics of West Coast Swing. From judge variance to the physics of momentum.
        </Text>
      </Stack>

      <Motion 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        display="grid"
        cols={{ base: 1, md: 12 }}
        gap="xl"
        marginBottom="2xl"
      >
        <Box span={{ base: 1, md: 7 }} surface="default" border overflow="hidden">
          <Box aspect="video" surface="muted" overflow="hidden">
            <Motion 
              as="img"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://picsum.photos/seed/dance-data/800/450" 
              alt="Dance Data" 
              width="full"
              height="full"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </Box>
          <Stack padding="xl" gap="md">
            <Text variant="headline" size="3xl">Data with a Heartbeat.</Text>
            <Text variant="body" size="sm" opacity="80">
              I use my robotics background to crack the code of West Coast Swing. 
              From judge consistency to the physics of connection, this is data you can actually use on the floor.
            </Text>
          </Stack>
        </Box>
        <Stack span={{ base: 1, md: 5 }} gap="xl">
          <Text variant="label" size="sm" border="b" paddingBottom="md" display="block">Quick Insights</Text>
          <Motion 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            display="grid"
            gap="md"
          >
            {experiencePacks.map((pack) => (
              <Motion 
                key={pack.category} 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5 }}
                surface="subsoil"
                border
                padding="lg"
                display="flex"
                alignItems="center"
                gap="xl"
                cursor="default"
                className="group hover:border-accent-brand transition-colors"
                position="relative"
              >
                <Box width={12} height={12} surface="muted" border display="flex" alignItems="center" justifyContent="center" shrink={0}>
                  <Icon icon={pack.icon} size="lg" color="accent" />
                </Box>
                <Stack gap="xs">
                  <Text variant="mono" color="brand" weight="font-bold" size="micro">{pack.category}</Text>
                  <Text variant="headline" size="xl">{pack.focus}</Text>
                  <Text variant="body" size="micro" italic color="dim">"{pack.benefit}"</Text>
                </Stack>
              </Motion>
            ))}
          </Motion>
        </Stack>
      </Motion>

      <Motion 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        display="grid"
        cols={{ base: 1, lg: 2 }}
        gap="xl"
      >
        {studies.map((paper, index) => (
          <Motion
            key={paper.slug}
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              visible: { opacity: 1, scale: 1 }
            }}
            position="relative"
            border
            padding="2xl"
            surface="default"
            cursor="pointer"
            className="group hover:bg-card-bg transition-colors"
            onClick={() => setSelectedStudy(paper)}
          >
            <Text variant="mono" weight="font-bold" color="accent" position="absolute" insetTop={6} insetRight={8} opacity="40" className="group-hover:opacity-100 transition-opacity">
              REF_ID: 00{index + 1}
            </Text>

            <Inline gap="sm" marginBottom="xl">
              {paper.tags?.map(tag => (
                <Box key={tag} border paddingX="xs" paddingY="0.5">
                  <Text variant="mono" size="micro" color="dim">
                    {tag}
                  </Text>
                </Box>
              ))}
            </Inline>

            <Text variant="headline" size="3xl" marginBottom="xl">
              {paper.title}
            </Text>

            <Stack gap="lg">
              <Stack gap="xs">
                <Text variant="mono" weight="font-bold" color="accent" tracking="wide">Abstract</Text>
                <Text variant="body" size="sm" className="line-clamp-2">
                  {paper.excerpt}
                </Text>
              </Stack>
              
              <Inline gap="sm" size="micro" variant="mono" color="accent" className="group-hover:translate-x-1 transition-transform">
                Read Full Analysis <Icon icon={ArrowRight} size="xs" />
              </Inline>
            </Stack>
          </Motion>
        ))}
      </Motion>
    </Box>
  );
}
