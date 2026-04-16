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
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
              {selectedResource.category}
            </span>
            <div className="flex items-center gap-2 text-text-dim text-xs font-medium">
              <Calendar className="w-3 h-3" />
              {selectedResource.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main mb-12 leading-tight">
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
          <h3 className="text-3xl font-display font-bold text-text-main uppercase">Optimized Assets.</h3>
          <p className="text-lg text-text-body leading-relaxed max-w-3xl">
            These are the protocols and hardware I use to maintain a high-performance WCS (West Coast Swing) lifestyle. 
            From friction-coefficient mods to Titanium-status stacking, these systems are verified by 20+ weekends on the circuit annually.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-line bg-line">
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.category);
          return (
            <motion.div
              key={resource.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedResource(resource)}
              className="bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-colors flex flex-col h-full border-r border-b border-line"
            >
              <div className="text-accent mb-8">
                <Icon className="w-8 h-8 stroke-1" />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">{resource.category}</span>
                  <div className="text-[9px] font-mono border border-accent/30 text-accent px-2 py-0.5 uppercase font-bold">Protocol</div>
                </div>
                <h4 className="text-2xl font-display font-bold text-text-main group-hover:text-accent transition-colors leading-none uppercase">{resource.title}</h4>
                <p className="text-sm text-text-body leading-relaxed line-clamp-3 font-sans">{resource.excerpt}</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent pt-10 group-hover:translate-x-1 transition-transform mt-auto">
                Access System <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
