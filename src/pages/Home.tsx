/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Zap, Database, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function Home() {
  return (
    <section className="panel h-full flex flex-col justify-center">
      <span className="text-[10px] uppercase tracking-[3px] text-accent mb-4 block font-mono font-bold">
        // WELCOME
      </span>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="space-y-6">
          <h1 className="font-serif italic text-6xl md:text-8xl leading-[1.1] text-text-main font-bold">
            Dance More, Stress Less.
          </h1>
          <p className="text-2xl md:text-3xl text-text-body font-serif max-w-3xl leading-relaxed">
            Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS lifestyle.
          </p>
          <p className="text-base text-accent font-bold uppercase tracking-[3px]">
            Maximize your WCS lifestyle without the PhD-level stress.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          <div className="content-card space-y-4 group cursor-pointer hover:border-accent transition-colors">
            <div className="aspect-square bg-line overflow-hidden rounded-lg mb-4">
              <img 
                src="https://picsum.photos/seed/style-stack/600/600" 
                alt="Style Stack" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-xl font-serif font-bold text-text-main">The Style Stack</h4>
            <p className="text-[15px] leading-[1.6] text-text-body">
              Bright, fun outfits and dance-floor-ready gear. Curated for performance and personality.
            </p>
          </div>
          <div className="content-card space-y-4 group cursor-pointer hover:border-accent transition-colors">
            <div className="aspect-square bg-line overflow-hidden rounded-lg mb-4">
              <img 
                src="https://picsum.photos/seed/travel-stack/600/600" 
                alt="Travel Stack" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-xl font-serif font-bold text-text-main">The Travel Stack</h4>
            <p className="text-[15px] leading-[1.6] text-text-body">
              "Bougie on a Budget" guides to hotel perks, points, and seamless convention travel.
            </p>
          </div>
          <div className="content-card space-y-4 group cursor-pointer hover:border-accent transition-colors">
            <div className="aspect-square bg-line overflow-hidden rounded-lg mb-4">
              <img 
                src="https://picsum.photos/seed/data-stack/600/600" 
                alt="Data Stack" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-xl font-serif font-bold text-text-main">The Data Stack</h4>
            <p className="text-[15px] leading-[1.6] text-text-body">
              Using an engineering lens to understand competition, scoring variance, and mindset.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="stats-widget mt-20 w-fit">
        <div className="font-serif italic text-3xl text-accent">Live From the Circuit</div>
        <div className="text-[10px] uppercase tracking-[2px] text-text-dim mt-2 font-mono">
          Currently Obsessed: Hypervolt Mini & Motown Monday
        </div>
      </div>
    </section>
  );
}
