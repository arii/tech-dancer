/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, ExternalLink, Tag, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { affiliateManager } from '../lib/affiliateManager';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '../lib/content';

export default function Lab() {
  const [gear, setGear] = useState<ContentItem[]>([]);
  const [selectedGear, setSelectedGear] = useState<ContentItem | null>(null);

  useEffect(() => {
    const loadedResources = getAllContent('resources');
    // For Lab, we focus on Gear category or tag
    setGear(loadedResources.filter(r => r.category === 'Gear' || r.tags?.includes('gear')));
  }, []);

  if (selectedGear) {
    return (
      <section className="panel h-full overflow-y-auto">
        <button 
          onClick={() => setSelectedGear(null)}
          className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Toolbox
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
              {selectedGear.category}
            </span>
            <div className="flex items-center gap-2 text-text-dim text-xs font-medium">
              <Calendar className="w-3 h-3" />
              {selectedGear.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main mb-12 leading-tight">
            {selectedGear.title}
          </h1>

          <div className="markdown-body prose prose-lg max-w-none text-text-body leading-relaxed space-y-6">
            <Markdown>{selectedGear.content}</Markdown>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="mb-12 p-4 bg-accent/5 border border-accent/20 rounded-none italic text-[11px] text-text-dim max-w-2xl font-sans leading-relaxed">
        <span className="text-accent font-bold uppercase tracking-wider mr-2">Advisory:</span>
        This site contains affiliate links. If you use these links to buy something, I may earn a commission. I only recommend gear I have personally tested for 8+ hour social dance durability.
      </div>

      <div className="space-y-8 mb-16 px-4 md:px-0">
        <h1 className="font-display uppercase text-5xl md:text-8xl leading-[1.0] text-text-main font-bold tracking-tighter">
          The Toolbox.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
          Solutions for the modern dancer. Tested for 8-hour social dance durability and hotel-room office efficiency.
        </p>
      </div>

      <div className="content-card mb-20 overflow-hidden !p-0 border border-line">
        <div className="aspect-[21/7] bg-line overflow-hidden">
          <img 
            src="https://picsum.photos/seed/dance-gear/1200/500" 
            alt="Dance Gear" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-12 space-y-6">
          <h3 className="text-3xl font-display font-bold text-text-main uppercase">Lead with the Dance.</h3>
          <p className="text-lg text-text-body leading-relaxed max-w-3xl">
            I don't just review products; I test them in the wild. From the 2:00 AM social floor to the 8:00 AM airport dash, 
            these are the tools that survive the WCS circuit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-line bg-line">
        {gear.map((item, index) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedGear(item)}
            className="bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-colors flex flex-col h-full border-r border-b border-line"
          >
            <div className="text-accent mb-8">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">{item.category}</span>
                <div className="text-[9px] font-mono border border-accent/30 text-accent px-2 py-0.5 uppercase font-bold">Hardware</div>
              </div>
              <h4 className="text-2xl font-display font-bold text-text-main group-hover:text-accent transition-colors leading-none uppercase">{item.title}</h4>
              <p className="text-sm text-text-body leading-relaxed line-clamp-3 font-sans">{item.excerpt}</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent pt-10 group-hover:translate-x-1 transition-transform mt-auto">
              Inspect Tool <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
