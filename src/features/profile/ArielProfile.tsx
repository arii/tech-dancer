/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Heart, Binary, Users, Repeat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import { layout, typography, borders } from '@/styles/design-tokens';

export default function About() {
  const chips = ['MIT PhD', 'Civ Robotics', 'CSAIL Researcher', 'Intermediate WCS', 'SF Local', 'Motown Monday'];

  return (
    <section className={layout.panel}>
      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className="w-full md:w-1/3 border border-line aspect-square overflow-hidden bg-line">
          <img 
            src="https://picsum.photos/seed/ariel-anders/600/600" 
            alt="Ariel Anders"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-6 relative">
          <div className="absolute top-0 right-0 text-[8px] font-mono opacity-30 select-none">FILE_REF: AA_001</div>
          <span className={typography.mono + " text-accent-brand block"}>
            // PERSONNEL_FILE: AA_001
          </span>
          <h1 className={typography.headline + " text-5xl md:text-8xl"}>
            Ariel Anders, PhD.
          </h1>
          <div className={typography.body + " text-xl md:text-2xl"}>
            MIT Roboticist. WCS Competitor. Data Architect.
          </div>
          <p className={typography.body + " text-lg opacity-80"}>
            I use my background in robotics to find the best gear, travel systems, and analysis platforms for the WSDC Registry. 
            Maximizing the WCS lifestyle through system-level optimization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-line bg-line mb-20">
        <div className="bg-bg p-8 md:p-12 border-b md:border-b-0 md:border-r border-line space-y-8 md:col-span-7">
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text-main">The Entry Point</h3>
          <p className="text-[15px] text-text-body leading-[1.8] font-sans">
            My initiation into partner dance started in 2019 with Lindy Hop and Fusion. Seeking progression in San Francisco, I signed up for a series at Mission City Swing—not realizing it wasn't a Lindy venue. They were playing music like "In Da Club" by 50 Cent and it was so much fun that I never left. WCS is now my primary focus, driven by the WSDC Registry Ledger and the specialized mechanics of the community.
          </p>
        </div>
        <div className="bg-bg p-8 md:p-12 space-y-8 md:col-span-5">
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text-main">Scientific Merit</h3>
          <p className="text-[15px] text-text-body leading-[1.8] font-sans">
            I care a lot about making things work. Since 2010, I’ve been dedicated to building robotic systems that remain reliable in complex and uncertain domains. From my PhD at MIT CSAIL to my work in industry, I build real-world systems that perform. I consider myself a pragmatic roboticist: I leverage machine learning alongside classical AI techniques to build robust modules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-x border-b border-line bg-line mb-20">
        <div className="bg-bg p-8 md:p-12 border-b md:border-b-0 md:border-r border-line space-y-8 relative md:col-span-5">
          <div className="absolute top-2 right-2 text-[8px] font-mono opacity-30 select-none">PROTOCOL: 004</div>
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text-main">Registry Ledger Protocol</h3>
          <p className="text-[15px] text-text-body leading-[1.8] font-sans">
            I’m a competitive Intermediate-level follow (and an occasional lead!) who loves the conversation and connection unique to WCS. Mission City Swing is my home base.
          </p>
        </div>
        <div className="bg-accent-brand text-white p-8 md:p-12 space-y-8 relative md:col-span-7">
          <div className="absolute top-2 right-2 text-[8px] font-mono opacity-40 select-none text-white">SYSTEM: B.O.B</div>
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white">Bougie on a Budget</h3>
          <p className="text-[15px] text-white/90 leading-[1.8] font-sans">
            I maximize credit card perks and hotel benefits to make the WSDC competition cycle lifestyle both high-end and highly feasible. I'm known for "efficiency-first" travel philosophy.
          </p>
        </div>
      </div>

      <div className="space-y-8 px-4 md:px-0">
        <h3 className={typography.mono + " text-text-dim"}>// SYSTEM_MANIFEST: BACKGROUND_DATA</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'MIT_PHD_ROBOTICS', 
            'MIT_CSAIL_RESEARCHER', 
            'CIV_ROBOTICS_ENGINEER', 
            'INTERMEDIATE_WCS_FOLLOW', 
            'MCS_REGULAR', 
            'SF_LOCAL', 
            'MARRIOTT_TITANIUM', 
            'AMEX_PLATINUM'
          ].map(chip => (
            <span key={chip} className={typography.mono + " border border-line px-3 py-1 bg-surface text-text-main font-bold"}>
              {chip}
            </span>
          ))}
        </div>
        <div className="pt-8">
          <a 
            href="https://arii.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent border border-accent/20 px-6 py-3 hover:bg-accent/10 transition-colors"
          >
            Request Full Log [External_Link] <Repeat className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
