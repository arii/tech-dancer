/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Send, Copy, Sparkles, Github, ArrowRight, ArrowLeft, Info, Badge as BadgeIcon, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '../components/ui/badge';

export default function Drafter() {
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
      setFormData({
        ...formData,
        ...parsed,
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
            {/* Sparkle burst flourish */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute -top-4 -right-4 w-12 h-12 text-white/50"
            >
              <Sparkles className="w-full h-full fill-current" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 mb-12 px-4 md:px-0">
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display uppercase text-5xl md:text-8xl leading-[1.0] text-text-main font-bold tracking-tighter"
        >
          Content Drafter.
        </motion.h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
          The Content Engine. Draft blog posts, gear guides, or research studies and send them directly to the automated publishing pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-7xl">
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
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
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Content / Commentary (Markdown)</label>
              <textarea 
                rows={10}
                value={formData.commentary}
                onChange={(e) => setFormData({...formData, commentary: e.target.value})}
                placeholder="The core analysis or story goes here..."
                className="w-full bg-bg border border-line px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </motion.div>

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
                const prompt = `Act as an expert technical copywriter for "The Tech Dancer" platform. Refine the following ${formData.type} draft. 
Maintain a balance between MIT researcher clinicality and WCS circuit excitement. Use "Bougie on a Budget" terminology where appropriate.

Draft Context:
Title: ${formData.title}
Tagline: ${formData.tagline}
Content: ${formData.commentary}

Return only a refined version of the content body in Markdown format or as a JSON object with keys: title, tagline, description, commentary, tags.`;
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
      </div>
    </section>
  );
}
