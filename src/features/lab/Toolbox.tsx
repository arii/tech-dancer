/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, ExternalLink, Tag, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { affiliateManager } from '@/lib/affiliateManager';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '@/lib/content';

import { cn } from '@/lib/utils';
import { layout, typography, borders } from '@/styles/design-tokens';

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
      <section className={layout.panel}>
        <button 
          onClick={() => setSelectedGear(null)}
          className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Toolbox
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 relative">
            <div className="absolute -top-4 right-0 text-[8px] font-mono opacity-30 select-none">ITEM_REF: {selectedGear.slug?.toUpperCase()}</div>
            <span className={cn(typography.mono, "text-accent-brand border border-accent-brand/20 px-3 py-1")}>
              {selectedGear.category}
            </span>
            <div className={typography.mono + " text-text-dim flex items-center gap-2"}>
              <Calendar className="w-3 h-3" />
              {selectedGear.date}
            </div>
          </div>

          <h1 className={typography.headline + " text-4xl md:text-7xl mb-12"}>
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
    <section className={layout.panel}>
      <div className="mb-12 p-6 bg-accent-brand/5 border border-accent-brand/20 rounded-none text-[11px] text-text-dim max-w-2xl font-mono leading-relaxed relative">
        <div className="absolute top-2 right-2 text-[8px] opacity-30">REF_ID: ADV_001</div>
        <span className="text-accent-brand font-bold uppercase tracking-wider mr-2">Advisory:</span>
        This project ledger contains affiliate integrations. If you utilize these links for procurement, I may earn a commission. I exclusively advocate for hardware that has survived 12+ hour stress-tests in competition cycles.
      </div>

      <div className="space-y-8 mb-16 px-4 md:px-0">
        <h1 className={typography.headline + " text-5xl md:text-8xl"}>
          The Toolbox.
        </h1>
        <p className={typography.body + " text-lg md:text-xl"}>
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
          <h3 className="text-4xl font-display font-bold text-text-main uppercase tracking-tight">Lead with the Technical.</h3>
          <p className="text-lg text-text-body leading-relaxed max-w-3xl font-sans">
            I don't just review products; I benchmark them in high-variance environments. From the 2:00 AM social floor to the 8:00 AM airport dash, 
            this is the hardware that survives the WSDC Registry cycles.
          </p>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-l border-line bg-line"
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
              onClick={() => setSelectedGear(item)}
              className={`bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-colors flex flex-col h-full border-r border-b border-line scanline-hover opacity-90 hover:opacity-100 ${isWide ? 'md:col-span-8' : 'md:col-span-4'}`}
            >
              <div className="text-accent-brand mb-8 flex justify-between items-start">
                <ShoppingBag className="w-8 h-8 stroke-1" />
                <span className="text-[10px] font-mono opacity-20">ID_{index.toString().padStart(3, '0')}</span>
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <span className={typography.mono + " text-accent-brand font-bold"}>{item.category}</span>
                  <div className={typography.mono + " border border-accent-brand/30 text-accent-brand px-2 py-0.5 font-bold"}>Hardware</div>
                </div>
                <h4 className={typography.headline + " text-2xl group-hover:text-accent-brand transition-colors"}>{item.title}</h4>
                <p className={typography.body + " text-sm line-clamp-3 opacity-80"}>{item.excerpt}</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent-brand pt-10 group-hover:translate-x-1 transition-transform mt-auto">
                Inspect Tool <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
