/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Send, Copy, Sparkles, Github, ArrowRight, ArrowLeft, Info, Badge as BadgeIcon, CheckCircle2, Activity, BarChart3, Terminal as TerminalIcon, Cpu, Globe, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '../components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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

export default function Drafter() {
  const [activeTool, setActiveTool] = useState<'drafter' | 'metrics'>('drafter');
  const [formData, setFormData] = useState({
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
    <section className="panel h-full overflow-y-auto">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed bottom-12 right-12 bg-accent text-white px-8 py-6 shadow-2xl z-[200] border-2 border-white/20 flex items-center gap-4"
          >
            <CheckCircle2 className="w-8 h-8" />
            <div className="space-y-1">
              <div className="font-display font-bold uppercase tracking-tight text-xl">SUCCESS_TRANSMITTED</div>
              <div className="text-[10px] font-mono opacity-80 uppercase tracking-widest">Buffer updated // integrity verified</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 mb-16 border-b border-line pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-accent mb-2">
            <TerminalIcon className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[4px]">Internal_Systems_Console</span>
          </div>
          <h1 className="font-display uppercase text-5xl md:text-8xl leading-[0.9] text-text-main font-bold tracking-tighter">
            The Hub.
          </h1>
          <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
            Administrative terminal for Content Orchestration and Audience Telemetry. Private engineering tools made public for transparency.
          </p>
        </div>

        <div className="flex bg-line p-1 gap-1 w-full md:w-auto">
          <button 
            onClick={() => setActiveTool('drafter')}
            className={`flex-1 md:flex-none px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
              activeTool === 'drafter' ? 'bg-accent text-white' : 'bg-transparent text-text-dim hover:text-text-main hover:bg-white/5'
            }`}
          >
            [ Content_Engine ]
          </button>
          <button 
            onClick={() => setActiveTool('metrics')}
            className={`flex-1 md:flex-none px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
              activeTool === 'metrics' ? 'bg-accent text-white' : 'bg-transparent text-text-dim hover:text-text-main hover:bg-white/5'
            }`}
          >
            [ Telemetry_Lab ]
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTool === 'drafter' ? (
          <motion.div 
            key="drafter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-7xl"
          >
            {/* Input Form */}
            <div className="space-y-8">
              <div className="bg-bg border border-line p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-line pb-4">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[2px] text-text-main">// CONFIG_INPUT</h3>
                  <motion.select 
                    whileFocus={{ borderColor: 'var(--color-accent)' }}
                    className="bg-bg border border-line px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-accent focus:outline-none focus:border-accent"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="post">Blog Post</option>
                    <option value="resource">Gear Guide</option>
                    <option value="study">Data Study</option>
                  </motion.select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Title</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="The Physics of the Pivot"
                      className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Category</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Tagline / Hook</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" 
                    value={formData.tagline}
                    onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                    placeholder="Why your choice of suede matters."
                    className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Short Excerpt</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="A brief summary for the index card..."
                    className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">SEO Keywords</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      value={formData.seoTerms}
                      onChange={(e) => setFormData({...formData, seoTerms: e.target.value})}
                      placeholder="wcs, engineering, gear"
                      className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Tags</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <AnimatePresence mode="popLayout">
                  {formData.type === 'resource' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-line overflow-hidden"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Product Name</label>
                        <input 
                          type="text" 
                          value={formData.productName}
                          onChange={(e) => setFormData({...formData, productName: e.target.value})}
                          placeholder="Loop Quiet 2"
                          className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Affiliate Link</label>
                        <input 
                          type="url" 
                          value={formData.itemLink}
                          onChange={(e) => setFormData({...formData, itemLink: e.target.value})}
                          placeholder="https://amzn.to/..."
                          className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Featured Image URL / Seed</label>
                  <div className="flex gap-4">
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://picsum.photos/seed/tech/1200/600"
                      className="flex-1 bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all"
                    />
                    <div className="w-12 h-12 bg-line border border-line overflow-hidden shrink-0">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/120/120';
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Content / Commentary (Markdown)</label>
                    <span className={`text-[9px] font-mono font-bold uppercase ${formData.commentary.length >= 2800 ? 'text-accent' : 'text-text-dim'}`}>
                      {formData.commentary.length} / 3000
                    </span>
                  </div>
                  <textarea 
                    rows={10}
                    value={formData.commentary}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.length <= 3000) {
                        setFormData({...formData, commentary: val});
                      }
                    }}
                    placeholder="The core analysis or story goes here..."
                    className={`w-full bg-bg border ${formData.commentary.length >= 3000 ? 'border-accent' : 'border-line'} px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent transition-colors`}
                  />
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-8 sticky top-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[2px] text-text-main">// OUTPUT_BUFFER</h3>
                <div className="flex gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    className="p-2 border border-line hover:border-accent hover:text-accent transition-colors group relative"
                    title="Copy Markdown"
                  >
                    <Copy className="w-4 h-4" />
                    <AnimatePresence>
                      {copied && (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] py-1 px-2 font-mono whitespace-nowrap"
                        >
                          COPIED_TO_CLIPBOARD
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>

              <motion.div 
                layout
                className="bg-surface border border-line overflow-hidden shadow-2xl"
              >
                <div className="bg-line/50 px-6 py-3 border-b border-line flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Markdown_Source</span>
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] font-mono text-accent"
                  >
                    STATUS: READY
                  </motion.span>
                </div>
                <pre className="p-6 text-xs text-text-body font-mono overflow-x-auto whitespace-pre-wrap max-h-[500px] custom-scrollbar">
                  {markdown}
                </pre>
              </motion.div>

              <div className="space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitToGithub}
                  className="w-full bg-text-main text-bg py-4 font-bold uppercase tracking-[3px] text-xs hover:bg-black transition-all flex items-center justify-center gap-3 group"
                >
                  <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  DEPLOY TO GITHUB PIPELINE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <p className="text-[9px] font-mono text-text-dim text-center px-8 leading-relaxed uppercase tracking-widest">
                  Submitting triggers the repository automation workflow. 
                  Manual PR review required for final deployment.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-accent/5 border border-accent/20 p-6 space-y-4"
              >
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest">AI_DRFT_PRO_MODULE</h4>
                </div>
                <p className="text-[11px] text-text-body leading-relaxed font-sans">
                  Request tone optimization for the current draft. Balanced for MIT research clinicality and circuit energy.
                </p>
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

                    const prompt = `Please act as an expert affiliate marketer and blog copywriter for my "Tech-Dancer" niche website. 

I am providing my current draft details in JSON format. Please improve and expand upon them, making the copy engaging, well-structured, naturally weaving in my commentary, and ensuring the provided SEO terms are naturally integrated into the text.

Maintain a balance between MIT researcher clinicality and WCS circuit excitement. Use "Bougie on a Budget" terminology where appropriate.

CRITICAL INSTRUCTION REGARDING IMAGES: Do NOT generate, hallucinate, or include any Markdown image tags (e.g., ![alt text](url)) in your response. I will handle the image placement separately within my generator. You MAY however suggest a relevant high-quality image URL or Picsum seed in the 'image' field if requested.

Current Data:
${JSON.stringify(currentData, null, 2)}

Respond ONLY with a valid JSON object using the exact same keys: 'title', 'tagline', 'description', 'seoTerms', 'productName', 'affiliateLink', 'commentary', 'tags', 'image'. The 'commentary' field should contain the full, expanded Markdown blog post body. Do not include any conversational text or markdown blocks like \`\`\`json outside the object.`;
                    
                    navigator.clipboard.writeText(prompt);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 2000);
                  }}
                  className="w-full py-2 border border-accent/30 text-accent text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-accent/10 transition-colors"
                >
                  GENERATE_AI_OPTIM_PROMPT
                </motion.button>

                <motion.div 
                  animate={aiError ? { x: [-2, 2, -2, 2, 0] } : {}}
                  className="pt-4 border-t border-accent/10 space-y-3"
                >
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">PASTE_AI_JSON_STREAM</label>
                  <textarea 
                    rows={3}
                    value={aiJson}
                    onChange={(e) => setAiJson(e.target.value)}
                    placeholder='{"title": "...", "commentary": "..."}'
                    className={`w-full bg-bg border ${aiError ? 'border-accent' : 'border-line'} px-4 py-3 text-[10px] font-mono focus:outline-none focus:border-accent transition-colors`}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyAiJson}
                    className="w-full py-2 bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-accent-orange transition-colors"
                  >
                    APPLY_AI_ARCHITECTURE
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="metrics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Active_Nodes', value: dummyMetrics.activeUsers, icon: Users, trend: '+12%' },
                { label: 'Signal_Strength', value: dummyMetrics.engagementRate, icon: Activity, trend: '+2.1%' },
                { label: 'Broadband_Reach', value: dummyMetrics.contentReach, icon: Globe, trend: '+452' },
                { label: 'System_Compute', value: dummyMetrics.systemLoad, icon: Cpu, trend: 'Optimal' },
              ].map((stat) => (
                <div key={stat.label} className="bg-bg border border-line p-6 space-y-4">
                  <div className="flex items-center justify-between text-text-dim">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-[10px] font-mono text-accent">{stat.trend}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-display font-black text-text-main">{stat.value}</div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-surface border border-line p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[2px] text-text-main">// AUDIENCE_TRAFFIC_WAVE</h3>
                  <BarChart3 className="w-4 h-4 text-accent" />
                </div>
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
                        stroke="var(--color-accent)" 
                        fill="var(--color-accent)" 
                        fillOpacity={0.1} 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-surface border border-line p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[2px] text-text-main">// SYSTEM_LOAD_LATENCY</h3>
                  <Activity className="w-4 h-4 text-accent" />
                </div>
                <div className="h-[300px] w-full">
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
                        stroke="var(--color-accent)" 
                        strokeWidth={2} 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-bg border border-line p-8">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[2px] text-text-main mb-8">// LIVE_SYSTEM_LOGS</h3>
              <div className="space-y-3 font-mono text-[10px] uppercase">
                <div className="flex gap-4 text-text-dim">
                  <span className="text-accent">[15:32:01]</span>
                  <span>Signal_Gateway: Authenticated admin_ari_anders</span>
                </div>
                <div className="flex gap-4 text-text-dim">
                  <span className="text-accent">[15:31:45]</span>
                  <span>Cache_Purge: Success // TTL reset for site_assets</span>
                </div>
                <div className="flex gap-4 text-text-dim">
                  <span className="text-accent">[15:30:12]</span>
                  <span>Inbound_Payload: Drafter_Buffer updated via AI_Module</span>
                </div>
                <div className="flex gap-4 text-text-dim/40 italic">
                  <span>[Listening for system events...]</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
