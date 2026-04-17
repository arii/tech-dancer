/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Clock, ArrowRight, Database, Code, Plane, Scissors, Music, Calendar, ArrowLeft, Activity, Shield } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '../lib/content';

export default function Feed() {
  const [resources, setResources] = useState<ContentItem[]>([]);
  const [selectedResource, setSelectedResource] = useState<ContentItem | null>(null);

  useEffect(() => {
    const loadedResources = getAllContent('resources');
    setResources(loadedResources);
  }, []);

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

  if (selectedResource) {
    return (
      <section className="panel h-full overflow-y-auto">
        <button 
          onClick={() => setSelectedResource(null)}
          className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 relative">
            <div className="absolute top-0 right-0 text-[8px] font-mono opacity-30 select-none">ASSET_REF: {selectedResource.slug?.toUpperCase()}</div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-brand border border-accent-brand/20 px-3 py-1">
              {selectedResource.category}
            </span>
            <div className="flex items-center gap-2 text-text-dim text-[10px] font-mono uppercase tracking-widest">
              <Calendar className="w-3 h-3" />
              {selectedResource.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-bold text-text-main mb-12 leading-none uppercase tracking-tighter">
            {selectedResource.title}
          </h1>

          <div className="markdown-body prose prose-lg max-w-none text-text-body leading-relaxed space-y-6">
            <Markdown>{selectedResource.content}</Markdown>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="space-y-8 mb-16 px-4 md:px-0">
        <h1 className="font-display uppercase text-5xl md:text-8xl leading-[1.0] text-text-main font-bold tracking-tighter">
          Resources.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
          The Toolbox: Resources for the Road. Curated systems for travel, gear, and lifestyle optimization.
        </p>
      </div>

      <div className="content-card mb-16 overflow-hidden !p-0 border border-line">
        <div className="aspect-[21/7] bg-line overflow-hidden">
          <img 
            src="https://picsum.photos/seed/dance-resources/1200/500" 
            alt="Dance Resources" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-12 space-y-6">
          <h3 className="text-4xl font-display font-bold text-text-main uppercase tracking-tight">Optimized Assets.</h3>
          <p className="text-lg text-text-body leading-relaxed max-w-3xl font-sans">
            These are the protocols and hardware I use to maintain a high-performance WSDC Registry lifestyle. 
            From friction-coefficient mods to Titanium-status stacking, these systems are verified by 20+ weekends on the competition cycle annually.
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
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.category);
          // MECHANICAL_NOTE: Cards use a 7/5 asymmetrical split to break uniform grid dependency and create a 'Folio' rhythm.
          const isWide = index % 2 === 0;
          return (
            <motion.div
              key={resource.slug}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => setSelectedResource(resource)}
              className={`bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-colors flex flex-col h-full border-r border-b border-line scanline-hover ${isWide ? 'md:col-span-7' : 'md:col-span-5'}`}
            >
              <div className="text-accent-brand mb-8 flex justify-between items-start">
                <Icon className="w-8 h-8 stroke-1" />
                <span className="text-[10px] font-mono opacity-20">REF_{index.toString().padStart(3, '0')}</span>
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-brand">{resource.category}</span>
                  <div className="text-[9px] font-mono border border-accent-brand/30 text-accent-brand px-2 py-0.5 uppercase font-bold">Protocol</div>
                </div>
                <h4 className="text-2xl font-display font-bold text-text-main group-hover:text-accent-brand transition-colors leading-none uppercase tracking-tighter">{resource.title}</h4>
                <p className="text-sm text-text-body leading-relaxed line-clamp-3 font-sans opacity-80">{resource.excerpt}</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent-brand pt-10 group-hover:translate-x-1 transition-transform mt-auto">
                Access System <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
