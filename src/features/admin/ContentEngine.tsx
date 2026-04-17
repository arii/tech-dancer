/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Send, Copy, Sparkles, Github, ArrowRight, ArrowLeft, Info, Badge as BadgeIcon, CheckCircle2, Activity, BarChart3, Terminal as TerminalIcon, Cpu, Globe, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import { cn } from '../../lib/utils';
import { layout, typography, inputs, buttons } from '../../styles/design-tokens';
import { useForm } from '../../hooks/use-form';
import { Box, Stack, Text, Grid } from '../../components/layout/Primitives';

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
  const { formData, setFormData, handleChange, setValues } = useForm({
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
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    
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
${tagArray.map(tag => `  - ${tag}`).join('\n')}
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
${tagArray.map(tag => `  - ${tag}`).join('\n')}
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
${tagArray.map(tag => `  - ${tag}`).join('\n')}
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
    <Box as="section" panel>
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed bottom-12 right-12 bg-accent text-white px-8 py-6 shadow-2xl z-[200] border-2 border-white/20 flex items-center gap-4"
          >
            <CheckCircle2 className="w-8 h-8" />
            <Stack gap={1}>
              <Text variant="headline" size="text-xl" className="text-white">SUCCESS_TRANSMITTED</Text>
              <Text variant="mono" className="opacity-80 text-white">Buffer updated // integrity verified</Text>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>

      <Box className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 mb-16 border-b border-line pb-12">
        <Stack gap={6}>
            <Stack direction="row" align="center" gap={3} className="text-accent-brand mb-2">
              <TerminalIcon className="w-5 h-5" />
              <Text variant="mono" className="tracking-[4px] font-bold">Internal_Systems_Console</Text>
            </Stack>
            <Text as="h1" variant="headline" size="text-5xl md:text-8xl">
              The Hub.
            </Text>
            <Text variant="body" size="text-lg md:text-xl">
              Administrative terminal for Content Orchestration and Audience Telemetry. Private engineering tools made public for transparency.
            </Text>
          </Stack>

          <Box className="flex bg-line p-1 gap-1 w-full md:w-auto">
            <button 
              onClick={() => setActiveTool('drafter')}
              className={cn(
                buttons.tab,
                activeTool === 'drafter' ? 'bg-accent text-white' : 'bg-transparent text-text-dim hover:text-text-main hover:bg-white/5'
              )}
            >
              [ Content_Engine ]
            </button>
            <button 
              onClick={() => setActiveTool('metrics')}
              className={cn(
                buttons.tab,
                activeTool === 'metrics' ? 'bg-accent text-white' : 'bg-transparent text-text-dim hover:text-text-main hover:bg-white/5'
              )}
            >
              [ Telemetry_Lab ]
            </button>
          </Box>
      </Box>

      <AnimatePresence mode="wait">
        {activeTool === 'drafter' ? (
          <motion.div 
            key="drafter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl"
          >
            {/* Input Form */}
            <Stack gap={8} className="md:col-span-7">
              <Box border surface className="p-8 space-y-6">
                <Box className="flex justify-between items-center border-b border-line pb-4">
                  <Text variant="mono">// CONFIG_INPUT</Text>
                  <motion.select 
                    whileFocus={{ borderColor: 'var(--color-accent)' }}
                    className={inputs.select}
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="post">Blog Post</option>
                    <option value="resource">Gear Guide</option>
                    <option value="study">Data Study</option>
                  </motion.select>
                </Box>

                <Grid cols={2} gap={6}>
                  <Stack gap={2}>
                    <Text as="label" variant="mono" className={inputs.label}>Title</Text>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="The Physics of the Pivot"
                      className={inputs.base}
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text as="label" variant="mono" className={inputs.label}>Category</Text>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={inputs.base}
                    />
                  </Stack>
                </Grid>

                <Stack gap={2}>
                  <Text as="label" variant="mono" className={inputs.label}>Tagline / Hook</Text>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" 
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Why your choice of suede matters."
                    className={inputs.base}
                  />
                </Stack>

                <Stack gap={2}>
                  <Text as="label" variant="mono" className={inputs.label}>Short Excerpt</Text>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    rows={2}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="A brief summary for the index card..."
                    className={inputs.base + " resize-none"}
                  />
                </Stack>

                <Grid cols={2} gap={6}>
                  <Stack gap={2}>
                    <Text as="label" variant="mono" className={inputs.label}>SEO Keywords</Text>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="seoTerms"
                      value={formData.seoTerms}
                      onChange={handleChange}
                      placeholder="wcs, engineering, gear"
                      className={inputs.base}
                    />
                  </Stack>
                  <Stack gap={2}>
                    <Text as="label" variant="mono" className={inputs.label}>Tags</Text>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className={inputs.base}
                    />
                  </Stack>
                </Grid>

                <AnimatePresence mode="popLayout">
                  {formData.type === 'resource' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Grid cols={2} gap={6} className="pt-4 border-t border-line">
                        <Stack gap={2}>
                          <Text as="label" variant="mono" className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Product Name</Text>
                          <input 
                            type="text" 
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Loop Quiet 2"
                            className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                          />
                        </Stack>
                        <Stack gap={2}>
                          <Text as="label" variant="mono" className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Affiliate Link</Text>
                          <input 
                            type="url" 
                            name="itemLink"
                            value={formData.itemLink}
                            onChange={handleChange}
                            placeholder="https://amzn.to/..."
                            className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                          />
                        </Stack>
                      </Grid>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Stack gap={2}>
                  <Text as="label" variant="mono" className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Featured Image URL / Seed</Text>
                  <Box className="flex gap-4">
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://picsum.photos/seed/tech/1200/600"
                      className="flex-1 bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                    />
                    <Box className="w-12 h-12 bg-line border border-line overflow-hidden shrink-0">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/120/120';
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>

                <Stack gap={2}>
                  <Box className="flex justify-between items-center">
                    <Text as="label" variant="mono" className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Content / Commentary (Markdown)</Text>
                    <Text variant="mono" weight="font-bold" className={`text-[9px] uppercase ${formData.commentary.length >= 2800 ? 'text-accent' : 'text-text-dim'}`}>
                      {formData.commentary.length} / 3000
                    </Text>
                  </Box>
                  <textarea 
                    rows={10}
                    name="commentary"
                    value={formData.commentary}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.length <= 3000) {
                        handleChange(e);
                      }
                    }}
                    placeholder="The core analysis or story goes here..."
                    className={`w-full bg-bg border ${formData.commentary.length >= 3000 ? 'border-accent' : 'border-line'} px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent transition-colors`}
                  />
                </Stack>
              </Box>
            </Stack>

            <Stack gap={8} className="sticky top-0 md:col-span-5">
              <Box className="flex items-center justify-between">
                <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-[2px] text-text-main">// OUTPUT_BUFFER</Text>
                <Box className="flex gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    className="p-2 border border-line hover:border-accent-brand hover:text-accent-brand transition-colors group relative"
                    title="Copy Markdown"
                  >
                    <Copy className="w-4 h-4" />
                    <AnimatePresence>
                      {copied && (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent-brand text-white text-[10px] py-1 px-2 font-mono whitespace-nowrap"
                        >
                          COPIED_TO_CLIPBOARD
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Box>
              </Box>

              <motion.div 
                layout
                className="bg-card-bg border border-line overflow-hidden shadow-2xl"
              >
                <Box className="bg-line/50 px-6 py-3 border-b border-line flex items-center justify-between">
                  <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-widest text-text-dim">Markdown_Source</Text>
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] font-mono text-accent-brand"
                  >
                    STATUS: READY
                  </motion.span>
                </Box>
                <pre className="p-6 text-xs text-text-body font-mono overflow-x-auto whitespace-pre-wrap max-h-[500px] custom-scrollbar">
                  {markdown}
                </pre>
              </motion.div>

              <Stack gap={4}>
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitToGithub}
                  className={buttons.primary + " group"}
                >
                  <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  DEPLOY TO GITHUB PIPELINE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <Text variant="mono" className="text-text-dim text-center px-8 leading-relaxed">
                  Submitting triggers the repository automation workflow. 
                  Manual PR review required for final deployment.
                </Text>
              </Stack>

              <Box as="motion.div" 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-accent-brand/5 border border-accent-brand/20 p-6 space-y-4"
              >
                <Stack direction="row" align="center" gap={3} className="text-accent-brand mb-2">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <Text variant="mono" weight="font-bold" size="text-[10px]" className="tracking-widest">AI_DRFT_PRO_MODULE</Text>
                </Stack>
                <Text variant="body" size="text-[11px]" className="leading-relaxed">
                  Request tone optimization for the current draft. Balanced for MIT structural integrity and WSDC Registry dynamics.
                </Text>
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
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
                  className="w-full py-2 border border-accent-brand/30 text-accent-brand text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-accent-brand/10 transition-colors"
                >
                  GENERATE_AI_OPTIM_PROMPT
                </motion.button>

                <Stack as="motion.div" 
                  animate={aiError ? { x: [-2, 2, -2, 2, 0] } : {}}
                  gap={3}
                  className="pt-4 border-t border-accent-brand/10"
                >
                  <Text as="label" variant="mono" size="text-[10px]" weight="font-bold" className="tracking-widest text-text-dim">PASTE_AI_JSON_STREAM</Text>
                  <textarea 
                    rows={3}
                    value={aiJson}
                    onChange={(e) => setAiJson(e.target.value)}
                    placeholder='{"title": "...", "commentary": "..."}'
                    className={`w-full bg-bg border ${aiError ? 'border-accent-brand' : 'border-line'} px-4 py-3 text-[10px] font-mono focus:outline-none focus:border-accent-brand transition-colors`}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyAiJson}
                    className="w-full py-2 bg-accent-brand text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                  >
                    APPLY_AI_ARCHITECTURE
                  </motion.button>
                </Stack>
              </Box>
            </Stack>
          </motion.div>
        ) : (
          <motion.div 
            key="metrics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <Grid cols={1} md={2} lg={4} gap={6}>
              {[
                { label: 'Active_Nodes', value: dummyMetrics.activeUsers, icon: Users, trend: '+12%' },
                { label: 'Signal_Strength', value: dummyMetrics.engagementRate, icon: Activity, trend: '+2.1%' },
                { label: 'Broadband_Reach', value: dummyMetrics.contentReach, icon: Globe, trend: '+452' },
                { label: 'System_Compute', value: dummyMetrics.systemLoad, icon: Cpu, trend: 'Optimal' },
              ].map((stat) => (
                <Box key={stat.label} border surface className="p-6 space-y-4 scanline-hover">
                  <Box className="flex items-center justify-between text-text-dim">
                    <stat.icon className="w-4 h-4" />
                    <Text variant="mono" size="text-[10px]" color="accent" weight="font-bold">{stat.trend}</Text>
                  </Box>
                  <Stack gap={1}>
                    <Text variant="headline" size="text-2xl" color="main" weight="font-black">{stat.value}</Text>
                    <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-widest text-text-dim">{stat.label}</Text>
                  </Stack>
                </Box>
              ))}
            </Grid>

            <Grid cols={1} gap={8} className="md:grid-cols-12">
              <Box border surface className="p-8 space-y-8 md:col-span-12 lg:col-span-7">
                <Box className="flex items-center justify-between">
                  <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-[2px] text-text-main">// AUDIENCE_TRAFFIC_WAVE</Text>
                  <BarChart3 className="w-4 h-4 text-accent-brand" />
                </Box>
                <div className="h-[300px] w-full">
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
                </div>
              </Box>

              <Box border surface className="p-8 space-y-8 md:col-span-12 lg:col-span-5">
                <Box className="flex items-center justify-between">
                  <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-[2px] text-text-main">// LOAD_LATENCY</Text>
                  <Activity className="w-4 h-4 text-accent-brand" />
                </Box>
                <div className="h-[150px] w-full">
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
                </div>
                <Box className="pt-8 border-t border-line">
                   <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-[2px] text-text-main mb-6">// SUBSYSTEM_REPORT</Text>
                   <Stack gap={4}>
                     {[
                       { name: 'Registry_Sync', status: 'Optimal', value: 98 },
                       { name: 'Analysis_Engine', status: 'Synced', value: 100 },
                       { name: 'Circuit_Buffer', status: 'Buffering', value: 45 },
                     ].map(item => (
                       <Stack key={item.name} gap={1}>
                         <Box className="flex justify-between text-[8px] font-mono uppercase tracking-widest text-text-dim">
                           <span>{item.name}</span>
                           <span>{item.status}</span>
                         </Box>
                         <div className="h-1 bg-line w-full overflow-hidden">
                           <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                            className="h-full bg-accent-brand" 
                           />
                         </div>
                       </Stack>
                     ))}
                   </Stack>
                </Box>
              </Box>
            </Grid>

            <Box border surface className="p-8">
              <Text variant="mono" size="text-[10px]" weight="font-bold" className="tracking-[2px] text-text-main mb-8">// LIVE_SYSTEM_LOGS</Text>
              <Stack gap={3} className="font-mono text-[10px] uppercase">
                <Box className="flex gap-4 text-text-dim">
                  <Text variant="mono" color="accent" weight="font-bold">[15:32:01]</Text>
                  <span>Signal_Gateway: Authenticated admin_ari_anders</span>
                </Box>
                <Box className="flex gap-4 text-text-dim">
                  <Text variant="mono" color="accent" weight="font-bold">[15:31:45]</Text>
                  <span>Cache_Purge: Success // TTL reset for site_assets</span>
                </Box>
                <Box className="flex gap-4 text-text-dim">
                  <Text variant="mono" color="accent" weight="font-bold">[15:30:12]</Text>
                  <span>Inbound_Payload: Drafter_Buffer updated via AI_Module</span>
                </Box>
                <Box className="flex gap-4 text-text-dim/40 italic">
                  <span>[Listening for system events...]</span>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
