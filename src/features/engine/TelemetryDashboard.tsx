/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Shield, Plane, Hotel, Activity, Code, Server, Music, ArrowRight, User, Calendar, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { affiliateManager } from '@/lib/affiliateManager';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';
import { cn } from '@/lib/utils';

import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';

const wcsData = [
  { month: 'Jan', scores: 45, events: 2 },
  { month: 'Feb', scores: 52, events: 3 },
  { month: 'Mar', scores: 48, events: 2 },
  { month: 'Apr', scores: 61, events: 4 },
  { month: 'May', scores: 55, events: 3 },
  { month: 'Jun', scores: 67, events: 5 },
];

const travelData = [
  { day: 'Mon', price: 450 },
  { day: 'Tue', price: 420 },
  { day: 'Wed', price: 380 },
  { day: 'Thu', price: 520 },
  { day: 'Fri', price: 680 },
  { day: 'Sat', price: 710 },
  { day: 'Sun', price: 590 },
];

export default function DataLab() {
  const [studies, setStudies] = useState<ContentItem[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<ContentItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedStudies = getAllContent('studies');
    setStudies(loadedStudies);
  }, []);

  const labTools = [
    {
      title: 'SEO Analysis & Engagement',
      label: '[COMING SOON]',
      desc: 'Real-time tracking of tech-dancer reach and keyword density analysis.',
      icon: Activity,
      path: null
    },
    {
      title: 'Drafter tool',
      label: '[ACTIVE]',
      desc: 'AI-assisted content architecture for automated blog post generation.',
      icon: Code,
      path: '/systems'
    },
    {
      title: 'WCS prelim scoring data scraper',
      label: '[COMING SOON]',
      desc: 'Automated retrieval and normalization of WSDC preliminary results.',
      icon: Shield,
      path: null
    },
    {
      title: 'Flight finder for WCS events',
      label: '[ACTIVE]',
      desc: 'Matrix-driven flight discovery optimized for convention circuit schedules.',
      icon: Plane,
      path: '#'
    }
  ];

  return (
    <Box as="section" padding="panel">
      <Stack gap={8} marginBottom={16} paddingY={4}>
        <Text variant="headline" size="9xl">
          Data & Development Lab.
        </Text>
        <Text variant="body" size="xl" maxWidth="4xl">
          Sophisticated pages for interactive data science, software development, and system integration. 
          Bridging the gap between robotics-grade architectures and the WCS ecosystem.
        </Text>
      </Stack>

      <Grid
        as={motion.div} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        cols={1} md={12} gap={8} marginBottom={16}
      >
        <Box 
          md={{ span: 5 }} 
          surface 
          overflow="hidden" 
          padding={0}
          className="content-card border border-line"
        >
          <Box aspect="video" surface="dim" overflow="hidden">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://picsum.photos/seed/dance-data-lab/800/450" 
              alt="Data Lab" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </Box>
          <Stack padding={8} gap={4}>
            <Text variant="headline" size="3xl">Systemic Reliability.</Text>
            <Text variant="body" size="base" opacity="80">
              Applying MIT robotics-grade testing to WCS logistics. My tools are designed to survive high-variance environments.
            </Text>
          </Stack>
        </Box>
        
        <Stack md={{ span: 7 }} gap={8}>
          <Text 
            variant="label" 
            size="sm" 
            weight="font-bold" 
            uppercase 
            tracking="wider" 
            paddingBottom={4} 
            border="b" 
            width="full"
          >
            Active_Deployments
          </Text>
          <Grid cols={1} sm={2} gap={4}>
            {labTools.map((tool) => (
              <Box 
                as={motion.div} 
                key={tool.title} 
                whileHover={tool.path ? { scale: 1.02, borderColor: 'var(--color-accent-brand)' } : {}}
                padding={6}
                surface
                border
                cursor={tool.path ? "pointer" : "default"}
                onClick={() => tool.path && navigate(tool.path)}
                className={cn("group scanline-hover opacity-100", !tool.path && "opacity-60")}
              >
                <Stack gap={4}>
                  <Box width={10} height={10} surface="dim" border emphasis="dim" display="flex" className="items-center justify-center text-accent shrink-0">
                    <tool.icon className="w-5 h-5 stroke-1" />
                  </Box>
                  <Stack gap={2}>
                    <Text variant="mono" color="brand" weight="font-bold" size="micro">{tool.label}</Text>
                    <Text variant="headline" size="xl" className="leading-tight">{tool.title}</Text>
                    <Text variant="body" size="xs" color="dim" className="line-clamp-2">{tool.desc}</Text>
                  </Stack>
                  {tool.path && (
                    <Stack direction="row" align="center" gap={2} marginTop={2}>
                      <Text variant="label" size="micro" color="accent">Access_Module</Text>
                      <ArrowRight className="w-3 h-3 text-accent" />
                    </Stack>
                  )}
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Grid>

      <Grid 
        as={motion.div} 
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
        cols={1} lg={2} gap={8}
      >
        {studies.map((paper, index) => (
          <Box
            as={motion.div}
            key={paper.slug}
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              visible: { opacity: 1, scale: 1 }
            }}
            position="relative"
            border
            padding={10}
            surface
            cursor="pointer"
            className="hover:bg-card-bg transition-colors group"
            onClick={() => setSelectedStudy(paper)}
          >
            <Text 
              variant="mono" 
              position="absolute"
              inset="top"
              className="top-6 right-8 text-accent font-bold opacity-40 group-hover:opacity-100 transition-opacity"
            >
              REF_ID: 00{index + 1}
            </Text>

            <Box display="flex" flex="wrap" gap={2} marginBottom={6}>
              {paper.tags?.map(tag => (
                <Text key={tag} variant="mono" border paddingX={2} paddingY={0.5} color="dim" size="micro">
                  {tag}
                </Text>
              ))}
            </Box>

            <Text variant="headline" size="3xl" marginBottom={8} className="leading-tight">
              {paper.title}
            </Text>

            <Stack gap={6}>
              <Stack gap={2}>
                <Text variant="mono" weight="font-bold" color="accent" tracking="wide">Abstract</Text>
                <Text variant="body" size="sm" className="line-clamp-2">
                  {paper.excerpt}
                </Text>
              </Stack>
              
              <Stack direction="row" align="center" gap={2}>
                <Text variant="label" size="micro" weight="font-bold" uppercase tracking="wide" color="accent" className="group-hover:translate-x-1 transition-transform">
                  Read Full Analysis
                </Text>
                <ArrowRight className="w-3 h-3 text-accent group-hover:translate-x-1 transition-transform" />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Grid>

      {selectedStudy && (
        <Box position="fixed" inset surface zIndex="top" overflow="auto" padding={{ base: 6, md: 12 }}>
          <Box maxWidth="4xl" marginX="auto">
            <button 
              onClick={() => setSelectedStudy(null)}
              className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </button>

            <Stack direction="row" align="center" gap={4} marginBottom={6}>
              <Box surface="dim" paddingX={3} paddingY={1} radius="full">
                <Text variant="label" size="micro" weight="font-bold" uppercase color="accent">
                  {selectedStudy.category}
                </Text>
              </Box>
              <Stack direction="row" align="center" gap={2}>
                <Calendar className="w-3 h-3 text-text-dim" />
                <Text color="dim" size="xs" weight="font-medium">
                  {selectedStudy.date}
                </Text>
              </Stack>
            </Stack>

            <Text as="h1" variant="display" size="9xl" marginBottom={12} className="leading-tight">
              {selectedStudy.title}
            </Text>

            <Box className="markdown-body prose prose-lg max-w-none text-text-body leading-relaxed space-y-6">
              <Markdown>{selectedStudy.content}</Markdown>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
