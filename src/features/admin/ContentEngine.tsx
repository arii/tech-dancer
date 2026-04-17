/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from 'motion/react';
import { PenTool, Send, Copy, Sparkles, Github, ArrowRight, ArrowLeft, Info, Badge as BadgeIcon, CheckCircle2, Activity, BarChart3, Terminal as TerminalIcon, Cpu, Globe, Users, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import { useForm } from '../../hooks/use-form';
import { Box, Stack, Text, Grid, Motion, Icon, Inline, Button, Input, Select, Textarea } from '../../components/layout/Primitives';

const dummyMetrics = {
  activeUsers: 4210,
  engagementRate: '12.4%',
  contentReach: '45.2K',
  systemLoad: '14.2%',
  timeline: [
    { time: '00:00', users: 1200, load: 12 },
    { time: '04:00', users: 800, load: 10 },
    { time: '08:00', users: 2400, load: 25 },
    { time: '12:00', users: 3800, load: 45 },
    { time: '16:00', users: 4100, load: 52 },
    { time: '20:00', users: 3200, load: 38 },
  ]
};

export default function ContentEngine() {
  const [activeTool, setActiveTool] = useState<'drafter' | 'metrics'>('drafter');
  const { formData, setFormData, handleChange } = useForm({
    type: 'post',
    title: '',
    tagline: '',
    description: '',
    seoTerms: '',
    productName: '',
    itemLink: '',
    commentary: '',
    category: 'Engineering | Dance',
    image: 'https://picsum.photos/seed/tech-dancer/1200/600',
    tags: 'wcs, technology',
  });

  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    const tagArray = formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
    
    let generatedMd = '';

    if (formData.type === 'post') {
      generatedMd = `---
type: post
title: "${formData.title || 'Your Post Title Here'}"
date: "${date}"
author: "Ariel Anders, PhD"
category: "${formData.category}"
excerpt: "${formData.description || 'One or two sentences that appear in the blog index card.'}"
image: "${formData.image}"
tags:
${tagArray.map((tag: string) => `  - ${tag}`).join('\n')}
---

## ${formData.tagline || 'The Hook'}

${formData.commentary || 'Open with a scene, a problem, or a bold claim.'}

---
*Target SEO Keywords: ${formData.seoTerms}*
*Post generated via Tech-Dancer Content Engine*`;
    } else if (formData.type === 'resource') {
      generatedMd = `---
type: resource
title: "${formData.title || 'Resource Title'}"
date: "${date}"
author: "Ariel Anders, PhD"
category: "${formData.category}"
excerpt: "${formData.description || 'What the reader will learn or get from this guide.'}"
tags:
${tagArray.map((tag: string) => `  - ${tag}`).join('\n')}
---

## Overview

${formData.commentary}

## The Tool: ${formData.productName}

[Check out the gear here](${formData.itemLink})

---
*Target SEO Keywords: ${formData.seoTerms}*`;
    } else {
      generatedMd = `---
type: study
title: "${formData.title || 'Study Title'}"
date: "${date}"
author: "Ariel Anders, PhD"
category: "${formData.category}"
excerpt: "${formData.description || 'One sentence abstract for the studies index.'}"
tags:
${tagArray.map((tag: string) => `  - ${tag}`).join('\n')}
---

## Abstract

${formData.commentary}

---
*Metadata: ${formData.seoTerms}*`;
    }

    setMarkdown(generatedMd);
  }, [formData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitToGithub = () => {
    const repoOwner = "arii"; 
    const repoName = "tech-dancer";
    const issueTitle = `Draft: ${formData.title || 'New Content'}`;
    const issueBody = `### New ${formData.type} Submission\n\n\`\`\`markdown\n${markdown}\n\`\`\``;
    
    const githubUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
    window.open(githubUrl, '_blank');
    
    // Simulate success feedback
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const [aiJson, setAiJson] = useState('');
  const [aiError, setAiError] = useState(false);
  const applyAiJson = () => {
    try {
      let cleanJson = aiJson.trim();
      if (cleanJson.startsWith('```json')) cleanJson = cleanJson.substring(7);
      if (cleanJson.startsWith('```')) cleanJson = cleanJson.substring(3);
      if (cleanJson.endsWith('```')) cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      
      const parsed = JSON.parse(cleanJson);
      
      // Handle key mapping for affiliateLink -> itemLink
      if (parsed.affiliateLink && !parsed.itemLink) {
        parsed.itemLink = parsed.affiliateLink;
      }

      // Enforce character limit on AI-applied commentary
      let limitedCommentary = parsed.commentary || formData.commentary;
      if (limitedCommentary.length > 3000) {
        limitedCommentary = limitedCommentary.substring(0, 3000);
      }

      setFormData({
        ...formData,
        ...parsed,
        commentary: limitedCommentary,
        tags: Array.isArray(parsed.tags) ? parsed.tags.join(', ') : (parsed.tags || formData.tags)
      });
      setAiJson('');
      setAiError(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      setAiError(true);
      setTimeout(() => setAiError(false), 500);
    }
  };

  return (
    <Box as="section" panel height="full" overflow="y-auto">
      <AnimatePresence>
        {showSuccess && (
          <Motion 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            position="fixed"
            insetBottom="xl"
            insetRight="xl"
            surface="contrast"
            paddingX="xl"
            paddingY="lg"
            shadow="lg"
            zIndex="max"
            border="accent"
            display="flex"
            alignItems="center"
            gap="md"
          >
            <Icon icon={CheckCircle2} size="lg" className="text-accent-brand" />
            <Stack gap={0}>
              <Text variant="headline" size="lg" className="text-bg">SUCCESS_TRANSMITTED</Text>
              <Text variant="mono" size="micro" className="opacity-80 text-bg">Buffer updated // integrity verified</Text>
            </Stack>
          </Motion>
        )}
      </AnimatePresence>

      <Box display="flex" flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "start", md: "end" }} justifyContent="between" gap="lg" marginBottom="2xl" border="b" paddingBottom="xl">
        <Stack gap="sm">
            <Inline gap="md" color="brand" marginBottom="xs">
              <Icon icon={TerminalIcon} size="sm" />
              <Text variant="mono" weight="font-bold" tracking="widest">Internal_Systems_Console</Text>
            </Inline>
            <Text as="h1" variant="headline" size="8xl">
              The Hub.
            </Text>
            <Text variant="body" size="lg">
              Administrative terminal for Content Orchestration and Audience Telemetry. Private engineering tools made public for transparency.
            </Text>
          </Stack>

          <Box display="flex" surface="muted" padding="xs" gap="xs" width={{ base: "full", md: "auto" }}>
            <Button 
              variant={activeTool === 'drafter' ? "solid" : "ghost"}
              onClick={() => setActiveTool('drafter')}
              radius="none"
              flex={{ base: "full", md: "initial" }}
            >
              <Text variant="mono" size="sys" weight="font-bold">[ Content_Engine ]</Text>
            </Button>
            <Button 
              variant={activeTool === 'metrics' ? "solid" : "ghost"}
              onClick={() => setActiveTool('metrics')}
              radius="none"
              flex={{ base: "full", md: "initial" }}
            >
              <Text variant="mono" size="sys" weight="font-bold">[ Telemetry_Lab ]</Text>
            </Button>
          </Box>
      </Box>

      <AnimatePresence mode="wait">
        {activeTool === 'drafter' ? (
          <Motion 
            key="drafter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            display="grid"
            cols={{ base: 1, md: 12 }}
            gap="xl"
            maxWidth="7xl"
          >
            {/* Input Form */}
            <Stack gap="lg" span={{ base: 12, md: 7 }}>
              <Box border surface="default" padding="xl">
                <Stack gap="lg">
                  <Inline justify="between" align="center" borderBottom paddingBottom="md" marginBottom="md">
                    <Text variant="mono" size="micro" color="dim">// CONFIG_INPUT</Text>
                    <Select 
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      width="auto"
                      paddingY="xs"
                      paddingX="sm"
                      size="micro"
                    >
                      <option value="post">Blog Post</option>
                      <option value="resource">Gear Guide</option>
                      <option value="study">Data Study</option>
                    </Select>
                  </Inline>

                  <Grid cols={2} gap="md">
                    <Stack gap="xs">
                      <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Title</Text>
                      <Motion 
                        as={Input}
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="The Physics of the Pivot"
                      />
                    </Stack>
                    <Stack gap="xs">
                      <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Category</Text>
                      <Motion 
                        as={Input}
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      />
                    </Stack>
                  </Grid>

                  <Stack gap="xs">
                    <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Tagline / Hook</Text>
                    <Motion 
                      as={Input}
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleChange}
                      placeholder="Why your choice of suede matters."
                    />
                  </Stack>

                  <Stack gap="xs">
                    <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Short Excerpt</Text>
                    <Motion 
                      as={Textarea}
                      whileFocus={{ scale: 1.01 }}
                      rows={2}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="A brief summary for the index card..."
                    />
                  </Stack>

                  <Grid cols={2} gap="md">
                    <Stack gap="xs">
                      <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">SEO Keywords</Text>
                      <Motion 
                        as={Input}
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="seoTerms"
                        value={formData.seoTerms}
                        onChange={handleChange}
                        placeholder="wcs, engineering, gear"
                      />
                    </Stack>
                    <Stack gap="xs">
                      <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Tags</Text>
                      <Motion 
                        as={Input}
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                      />
                    </Stack>
                  </Grid>

                  <AnimatePresence mode="popLayout">
                    {formData.type === 'resource' && (
                      <Motion 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        overflow="hidden"
                      >
                        <Grid cols={2} gap="md" paddingTop="md" borderTop>
                          <Stack gap="xs">
                            <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Product Name</Text>
                            <Input 
                              type="text" 
                              name="productName"
                              value={formData.productName}
                              onChange={handleChange}
                              placeholder="Loop Quiet 2"
                            />
                          </Stack>
                          <Stack gap="xs">
                            <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Affiliate Link</Text>
                            <Input 
                              type="url" 
                              name="itemLink"
                              value={formData.itemLink}
                              onChange={handleChange}
                              placeholder="https://amzn.to/..."
                            />
                          </Stack>
                        </Grid>
                      </Motion>
                    )}
                  </AnimatePresence>

                  <Stack gap="xs">
                    <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Featured Image URL / Seed</Text>
                    <Inline gap="md">
                      <Motion 
                        as={Input}
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://picsum.photos/seed/tech/1200/600"
                        flex="full"
                      />
                      <Box width={12} height={12} surface="muted" border overflow="hidden" flexShrink={0}>
                        <Box 
                          as="img"
                          src={formData.image} 
                          alt="Preview" 
                          width="full"
                          height="full"
                          className="object-cover grayscale hover:grayscale-0 transition-all"
                          referrerPolicy="no-referrer"
                          onError={(e: any) => {
                            e.target.src = 'https://picsum.photos/seed/error/120/120';
                          }}
                        />
                      </Box>
                    </Inline>
                  </Stack>

                  <Stack gap="xs">
                    <Inline justify="between" align="center">
                      <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="widest">Content / Commentary (Markdown)</Text>
                      <Text variant="mono" weight="font-bold" size="micro" color={formData.commentary.length >= 2800 ? "brand" : "dim"}>
                        {formData.commentary.length} / 3000
                      </Text>
                    </Inline>
                    <Textarea 
                      rows={10}
                      name="commentary"
                      value={formData.commentary}
                      onChange={(e: any) => {
                        const val = e.target.value;
                        if (val.length <= 3000) {
                          handleChange(e);
                        }
                      }}
                      placeholder="The core analysis or story goes here..."
                      border={formData.commentary.length >= 3000 ? "brand" : "default"}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Stack gap="lg" position="sticky" insetTop={0} span={{ base: 12, md: 5 }}>
              <Inline justify="between" align="center">
                <Text variant="mono" size="micro" weight="font-bold" tracking="widest" color="brand">// OUTPUT_BUFFER</Text>
                <Inline gap="sm">
                  <Motion 
                    as={Button}
                    variant="ghost"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    radius="none"
                    padding="xs"
                    position="relative"
                  >
                    <Icon icon={Copy} size="sm" />
                    <AnimatePresence>
                      {copied && (
                        <Motion 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          position="absolute"
                          insetTop={-40}
                          insetLeft="50%"
                          className="-translate-x-1/2"
                          surface="contrast"
                          paddingX="sm"
                          paddingY="xs"
                          zIndex="max"
                        >
                          <Text variant="mono" size="micro" className="text-bg whitespace-nowrap">COPIED_TO_CLIPBOARD</Text>
                        </Motion>
                      )}
                    </AnimatePresence>
                  </Motion>
                </Inline>
              </Inline>

              <Motion 
                layout
                surface="subsoil"
                border
                overflow="hidden"
                shadow="lg"
              >
                <Inline surface="muted" paddingX="lg" paddingY="sm" borderBottom justify="between">
                  <Text variant="mono" size="micro" weight="font-bold" tracking="widest" color="dim">Markdown_Source</Text>
                  <Motion 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Text variant="mono" size="micro" color="brand">STATUS: READY</Text>
                  </Motion>
                </Inline>
                <Box as="pre" padding="lg" size="micro" variant="mono" className="overflow-x-auto whitespace-pre-wrap max-h-[500px] custom-scrollbar text-text-body">
                  {markdown}
                </Box>
              </Motion>

              <Stack gap="md">
                <Button 
                  variant="solid"
                  onClick={submitToGithub}
                  radius="none"
                  paddingY="lg"
                >
                  <Inline gap="md">
                    <Icon icon={Github} size="md" />
                    <Text variant="mono" size="sys" weight="font-bold" tracking="widest">DEPLOY TO GITHUB PIPELINE</Text>
                    <Icon icon={ArrowRight} size="sm" />
                  </Inline>
                </Button>
                <Text variant="mono" size="micro" color="dim" textAlign="center" paddingX="xl" className="leading-relaxed">
                  Submitting triggers the repository automation workflow. 
                  Manual PR review required for final deployment.
                </Text>
              </Stack>

              <Motion 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                surface="accent"
                border="accent"
                padding="lg"
              >
                <Stack gap="md">
                  <Inline gap="md" color="brand" className="group">
                    <Icon icon={Sparkles} size="md" className="group-hover:rotate-12 transition-transform" />
                    <Text variant="mono" weight="font-bold" size="micro" tracking="widest">AI_DRFT_PRO_MODULE</Text>
                  </Inline>
                  <Text variant="body" size="micro" className="leading-relaxed">
                    Request tone optimization for the current draft. Balanced for MIT structural integrity and WSDC Registry dynamics.
                  </Text>
                  <Button 
                    variant="ghost"
                    intent="default"
                    radius="none"
                    onClick={() => {
                      const currentData = {
                        title: formData.title || "[No Title Provided]",
                        tagline: formData.tagline || "[No Tagline Provided]",
                        description: formData.description || "[No Description Provided]",
                        seoTerms: formData.seoTerms || "[No SEO Terms Provided]",
                        productName: formData.productName || "[No Product Name Provided]",
                        affiliateLink: formData.itemLink || "[No Link Provided]",
                        image: formData.image || "[No Image Provided]",
                        commentary: formData.commentary || "[No Commentary Provided]",
                        tags: formData.tags || "[No Tags Provided]"
                      };

                      const prompt = `Please act as an expert affiliate marketer and technical blog copywriter for my "Tech-Dancer" niche website. 
Maintain a balance between MIT structural integrity and WSDC Registry dynamics. Use "Bougie on a Budget" terminology where appropriate.

EDITORIAL PROTOCOL:
1. THE AFFILIATE BRIDGE: For any gear mentions (productName: ${formData.productName}), follow this sequence:
   - Identify a Social Floor Pain Point (e.g., foot fatigue, loud music).
   - Write 2 sentences validating the frustration ("Real Talk").
   - Insert the product as the systematic "Gear Solution".
2. TERMINOLOGY LINTING: Use "WSDC Registry" instead of "Circuit". Use "Compression", "Stretch", and "Anchor" accurately.
3. BURN-LIST: NEVER use "journey", "vibrant", "testament", or "unlock your potential".

I am providing my current draft details in JSON format. Please improve and expand upon them. Respond ONLY with a valid JSON object using keys: 'title', 'tagline', 'description', 'seoTerms', 'productName', 'affiliateLink', 'commentary', 'tags', 'image'.

Current Data:
${JSON.stringify(currentData, null, 2)}`;
                      
                      navigator.clipboard.writeText(prompt);
                      setShowSuccess(true);
                      setTimeout(() => setShowSuccess(false), 2000);
                    }}
                    paddingY="sm"
                    width="full"
                    border="accent"
                    className="hover:bg-accent-brand/10"
                  >
                    <Text variant="mono" size="micro" color="brand" weight="font-bold" tracking="widest" uppercase>GENERATE_AI_OPTIM_PROMPT</Text>
                  </Button>

                  <Stack gap="md" paddingTop="md" borderTop border="accent">
                    <Text as="label" variant="mono" size="micro" weight="font-bold" color="dim" tracking="widest">PASTE_AI_JSON_STREAM</Text>
                    <Textarea 
                      rows={3}
                      value={aiJson}
                      onChange={(e: any) => setAiJson(e.target.value)}
                      placeholder='{"title": "...", "commentary": "..."}'
                      size="micro"
                      border={aiError ? "brand" : "default"}
                    />
                    <Button 
                      variant="solid" 
                      onClick={applyAiJson}
                      width="full"
                      paddingY="sm"
                      radius="none"
                    >
                      <Text variant="mono" size="micro" weight="font-bold" tracking="widest" uppercase>APPLY_AI_ARCHITECTURE</Text>
                    </Button>
                  </Stack>
                </Stack>
              </Motion>
            </Stack>
          </Motion>
        ) : (
          <Motion 
            key="metrics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Stack gap="xl">
              <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
                {[
                  { label: 'Active_Nodes', value: dummyMetrics.activeUsers, icon: Users, trend: '+12%' },
                  { label: 'Signal_Strength', value: dummyMetrics.engagementRate, icon: Activity, trend: '+2.1%' },
                  { label: 'Broadband_Reach', value: dummyMetrics.contentReach, icon: Globe, trend: '+452' },
                  { label: 'System_Compute', value: dummyMetrics.systemLoad, icon: Cpu, trend: 'Optimal' },
                ].map((stat) => (
                  <Box key={stat.label} border surface="default" padding="lg" position="relative" overflow="hidden" className="group">
                    <Inline justify="between" align="center" marginBottom="md">
                      <Icon icon={stat.icon} size="sm" color="dim" />
                      <Text variant="mono" size="micro" color="brand" weight="font-bold">{stat.trend}</Text>
                    </Inline>
                    <Stack gap={0}>
                      <Text variant="headline" size="4xl" weight="font-black">{stat.value}</Text>
                      <Text variant="mono" size="micro" weight="font-bold" tracking="widest" color="dim">{stat.label}</Text>
                    </Stack>
                  </Box>
                ))}
              </Grid>

              <Grid cols={{ base: 1, md: 12 }} gap="xl">
                <Box border surface="default" padding="xl" span={{ base: 12, lg: 7 }} position="relative">
                  <Inline justify="between" align="center" marginBottom="xl">
                    <Text variant="mono" size="micro" weight="font-bold" tracking="widest">// AUDIENCE_TRAFFIC_WAVE</Text>
                    <Icon icon={BarChart3} size="sm" color="brand" />
                  </Inline>
                  <Box height={300} width="full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dummyMetrics.timeline}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'var(--color-text-dim)', fontSize: 10, fontFamily: 'monospace' }} 
                        />
                        <YAxis 
                          hide 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-line)', fontSize: 12 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="var(--color-accent-brand)" 
                          fill="var(--color-accent-brand)" 
                          fillOpacity={0.1} 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>

                <Box border surface="default" padding="xl" span={{ base: 12, lg: 5 }}>
                  <Stack gap="xl">
                    <Box>
                      <Inline justify="between" align="center" marginBottom="lg">
                        <Text variant="mono" size="micro" weight="font-bold" tracking="widest" color="brand">// LOAD_LATENCY</Text>
                        <Icon icon={Activity} size="sm" color="brand" />
                      </Inline>
                      <Box height={150} width="full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dummyMetrics.timeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
                            <XAxis 
                              dataKey="time" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: 'var(--color-text-dim)', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <YAxis hide />
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-line)', fontSize: 12 }}
                            />
                            <Line 
                              type="stepAfter" 
                              dataKey="load" 
                              stroke="var(--color-accent-brand)" 
                              strokeWidth={2} 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Box>

                    <Box paddingTop="lg" borderTop>
                       <Text variant="mono" size="micro" weight="font-bold" tracking="widest" color="brand" marginBottom="lg">// SUBSYSTEM_REPORT</Text>
                       <Stack gap="md">
                         {[
                           { name: 'Registry_Sync', status: 'Optimal', value: 98 },
                           { name: 'Analysis_Engine', status: 'Synced', value: 100 },
                           { name: 'Circuit_Buffer', status: 'Buffering', value: 45 },
                         ].map(item => (
                           <Stack key={item.name} gap="xs">
                             <Inline justify="between" size="micro" variant="mono" uppercase tracking="widest" color="dim">
                               <Text>{item.name}</Text>
                               <Text>{item.status}</Text>
                             </Inline>
                             <Box height={1} surface="muted" width="full" overflow="hidden">
                               <Motion 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1, ease: "circOut" }}
                                height="full"
                                surface="brand"
                               />
                             </Box>
                           </Stack>
                         ))}
                       </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Box border surface="default" padding="xl">
                <Text variant="mono" size="micro" weight="font-bold" tracking="widest" color="brand" marginBottom="lg">// LIVE_SYSTEM_LOGS</Text>
                <Stack gap="sm">
                  {[
                    { time: '15:32:01', msg: 'Signal_Gateway: Authenticated admin_ari_anders' },
                    { time: '15:31:45', msg: 'Cache_Purge: Success // TTL reset for site_assets' },
                    { time: '15:30:12', msg: 'Inbound_Payload: Drafter_Buffer updated via AI_Module' },
                  ].map((log, i) => (
                    <Inline key={i} gap="md" size="micro" variant="mono" uppercase opacity="80">
                      <Text color="brand" weight="font-bold">[{log.time}]</Text>
                      <Text color="dim">{log.msg}</Text>
                    </Inline>
                  ))}
                  <Text variant="mono" size="micro" color="dim" opacity="40" italic>[Listening for system events...]</Text>
                </Stack>
              </Box>
            </Stack>
          </Motion>
        )}
      </AnimatePresence>
    </Box>
  );
}
