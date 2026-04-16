/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Clock, ArrowRight, Database, Code, Plane, Scissors, Music } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function Feed() {
  const resources = [
    {
      title: 'The "Bougie on a Budget" Travel Stack',
      description: 'How I stack Marriott Bonvoy and Amex Platinum for WCS convention weekends. Maximize your hotel benefits and credit card perks.',
      category: 'Travel',
      icon: Plane
    },
    {
      title: 'DIY: Adding Suede to Your Dance Shoes',
      description: 'A step-by-step guide to adding custom suede to your Bloch Grecian Sandals or regular sneakers for the perfect friction coefficient.',
      category: 'Gear',
      icon: Scissors
    },
    {
      title: 'Surviving Noisy Ballrooms',
      description: 'Why Loop Quiet 2 Ear Plugs are a lifesaver for loud ballrooms and blocking out noisy roommates during marathon events.',
      category: 'Gear',
      icon: Music
    }
  ];

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="space-y-8 mb-16">
        <h1 className="font-serif italic text-5xl md:text-7xl leading-[1.1] text-text-main font-bold">
          Resources.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl">
          The Toolbox: Resources for the Road. Curated systems for travel, gear, and lifestyle optimization.
        </p>
      </div>

      <div className="content-card mb-16 overflow-hidden !p-0">
        <div className="aspect-[21/9] bg-line">
          <img 
            src="https://picsum.photos/seed/dance-resources/1200/500" 
            alt="Dance Resources" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-8 space-y-4">
          <h3 className="text-2xl font-serif font-bold text-text-main">Curated for the Circuit.</h3>
          <p className="text-[15px] text-text-body leading-[1.8]">
            These are the guides and tools I use to keep my dance life sustainable. 
            No fluff, just the systems that work when you're traveling 20+ weekends a year.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="content-card group cursor-pointer hover:border-accent transition-colors"
          >
            <div className="flex items-start gap-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <resource.icon className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">{resource.category}</span>
                  <Badge variant="outline" className="text-[10px] border-accent/30 text-accent uppercase font-bold">Guide</Badge>
                </div>
                <h4 className="text-2xl font-serif font-bold text-text-main group-hover:text-accent transition-colors">{resource.title}</h4>
                <p className="text-[15px] text-text-body leading-relaxed max-w-3xl">{resource.description}</p>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-accent pt-4 group-hover:translate-x-1 transition-transform">
                  View Resource <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
