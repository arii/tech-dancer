/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, ExternalLink, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { affiliateManager } from '../lib/affiliateManager';
import { GearItem } from '../types';

export default function Lab() {
  const stacks = [
    {
      mission: 'The 3:00 AM Social Set',
      hardware: 'How to Suede Your Own Shoes for $15',
      justification: 'It’s 3:00 AM in a crowded ballroom and the floor is slick. These suede-modified soles ensure you maintain your connection and flow without losing your pivot on fast rotations.',
      tags: ['Gear', 'Performance']
    },
    {
      mission: 'The Carry-on Only Weekend',
      hardware: 'The 3 Recovery Tools I Never Fly Without',
      justification: 'When you’re hopping from the airport straight to the workshop, every cubic inch of momentum counts. Verified for TSA-efficiency to keep your social wear fresh and your luggage light.',
      tags: ['Travel', 'Recovery']
    },
    {
      mission: 'The Hotel-Room Office',
      hardware: 'How I Get Suites for the Price of a Standard Room',
      justification: 'Protect your focus without losing the beat. Whether it’s a noisy roommate or a nearby ballroom, these tools ensure your deep-work trajectory remains stable between social sets.',
      tags: ['Travel', 'Focus']
    }
  ];

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="mb-8 p-3 bg-line/30 border border-line rounded-sm italic text-[10px] text-text-dim max-w-2xl">
        Disclosure: This site contains affiliate links. If you use these links to buy something, I may earn a commission. 
        I only recommend gear I have personally tested for 8+ hour social dance durability.
      </div>

      <div className="space-y-8 mb-16">
        <h1 className="font-serif italic text-5xl md:text-7xl leading-[1.1] text-text-main font-bold">
          The Toolbox.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl">
          Solutions for the modern dancer. Tested for 8-hour social dance durability and hotel-room office efficiency.
        </p>
      </div>

      <div className="content-card mb-16 overflow-hidden !p-0">
        <div className="aspect-[21/9] bg-line">
          <img 
            src="https://picsum.photos/seed/dance-gear/1200/500" 
            alt="Dance Gear" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-8 space-y-4">
          <h3 className="text-2xl font-serif font-bold text-text-main">Lead with the Dance.</h3>
          <p className="text-[15px] text-text-body leading-[1.8]">
            I don't just review products; I test them in the wild. From the 2:00 AM social floor to the 8:00 AM airport dash, 
            these are the tools that survive the WCS circuit.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {stacks.map((stack, index) => (
          <motion.div
            key={stack.mission}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="content-card grid grid-cols-1 md:grid-cols-12 gap-8 relative hover:border-accent transition-colors"
          >
            <div className="col-span-3 space-y-4">
              <div className="text-xs font-bold uppercase tracking-[2px] text-accent">The Mission</div>
              <div className="text-xl font-serif font-bold text-text-main leading-tight">{stack.mission}</div>
              <div className="flex flex-wrap gap-2">
                {stack.tags.map(tag => (
                  <span key={tag} className="experience-chip border-accent/20">{tag}</span>
                ))}
              </div>
            </div>
            <div className="col-span-4 space-y-4">
              <div className="text-xs font-bold uppercase tracking-[2px] text-accent">Hardware / Apparel</div>
              <div className="text-[13px] text-text-main font-mono leading-relaxed bg-bg p-4 rounded border border-line">
                {stack.hardware}
              </div>
            </div>
            <div className="col-span-5 flex justify-between items-start gap-6">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-[2px] text-accent">Performance Justification</div>
                <div className="text-[14px] text-text-body leading-relaxed italic">
                  "{stack.justification}"
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all cursor-pointer shadow-sm">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DIY Section */}
      <div className="mt-16 space-y-8">
        <h3 className="text-2xl font-serif font-bold text-text-main">
          DIY: SHOE MODIFICATIONS
        </h3>
        <div className="content-card space-y-8 border-l-8 border-accent">
          <div className="flex items-center gap-4 text-accent">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="font-mono text-sm font-bold">01</span>
            </div>
            <h4 className="text-xl font-sans font-bold uppercase tracking-wider">How to Add Suede to Your Shoes</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-[14px] text-text-body leading-relaxed">
            <div className="space-y-3">
              <div className="text-text-main font-bold uppercase tracking-tighter border-b border-line pb-1">Step 1: Surface Prep</div>
              <p>Clean the sole thoroughly with isopropyl alcohol. Ensure no rubber residue or dust remains for maximum adhesive bond.</p>
            </div>
            <div className="space-y-3">
              <div className="text-text-main font-bold uppercase tracking-tighter border-b border-line pb-1">Step 2: Adhesive Application</div>
              <p>Apply a thin, even layer of Barge Cement to both the shoe sole and the suede backing. Wait 15 minutes until tacky.</p>
            </div>
            <div className="space-y-3">
              <div className="text-text-main font-bold uppercase tracking-tighter border-b border-line pb-1">Step 3: Compression</div>
              <p>Press firmly and use a rubber mallet to ensure contact. Let cure for 24 hours under pressure before dancing.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-surface border-l-2 border-accent">
        <h4 className="text-[10px] font-bold text-text-main uppercase tracking-wider mb-1">System Management Feature</h4>
        <p className="text-[10px] text-text-dim leading-relaxed">
          Affiliate metadata is injected via central manager. No hard-coded commercial CTAs in UI layer.
        </p>
      </div>
    </section>
  );
}
