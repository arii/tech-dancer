/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Heart, Binary, Users, Repeat } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function About() {
  const chips = ['MIT PhD', 'Civ Robotics', 'CSAIL Researcher', 'Intermediate WCS', 'SF Local', 'Motown Monday'];

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className="w-full md:w-1/3 border border-line aspect-square overflow-hidden bg-line">
          <img 
            src="https://picsum.photos/seed/ariel-anders/600/600" 
            alt="Ariel Anders"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[3px] text-accent block">
            // PERSONNEL_FILE: AA_001
          </span>
          <h1 className="font-display uppercase text-5xl md:text-8xl leading-[0.9] text-text-main font-bold tracking-tighter">
            Ariel Anders, PhD.
          </h1>
          <div className="text-xl md:text-2xl text-text-body font-sans leading-relaxed max-w-2xl">
            MIT Roboticist. WCS Competitor. Data Architect.
          </div>
          <p className="text-lg text-text-body/80 max-w-xl font-sans">
            I use my background in robotics to find the best gear, travel systems, and analysis platforms for the West Coast Swing circuit. 
            Maximizing the WCS lifestyle through system-level optimization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line bg-line mb-20">
        <div className="bg-bg p-8 md:p-12 border-b md:border-b-0 md:border-r border-line space-y-8">
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text-main">The Origin Story</h3>
          <p className="text-[15px] text-text-body leading-[1.8] font-sans">
            My journey into partner dance started in 2019 with Lindy Hop and Fusion. Seeking progression in San Francisco, I signed up for a series at Mission City Swing—not realizing it wasn't a Lindy venue. They were playing music like "In Da Club" by 50 Cent and it was so much fun that I never left. WCS is now my primary focus, driven by the event circuit and the incredible quality of the community.
          </p>
        </div>
        <div className="bg-bg p-8 md:p-12 space-y-8">
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text-main">Scientific Merit</h3>
          <p className="text-[15px] text-text-body leading-[1.8] font-sans">
            I care a lot about making things work. Since 2010, I’ve been dedicated to building robotic systems that remain reliable in complex and uncertain domains. From my PhD at MIT CSAIL to my work in the industry, I don’t just analyze data to make sense of things—I build real-world systems that perform. I consider myself a pragmatic roboticist: I leverage machine learning alongside classical AI techniques and solid software design principles to build systems that are robust, functional, and ready for the task at hand.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-x border-b border-line bg-line mb-20">
        <div className="bg-bg p-8 md:p-12 border-b md:border-b-0 md:border-r border-line space-y-8">
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text-main">Circuit Protocol</h3>
          <p className="text-[15px] text-text-body leading-[1.8] font-sans">
            I’m a competitive Intermediate-level follow (and an occasional lead!) who loves the conversation and connection unique to WCS. Mission City Swing is my home base. If it’s a Wednesday night in San Francisco, you'll find me at the tech-bench or on the floor.
          </p>
        </div>
        <div className="bg-accent text-white p-8 md:p-12 space-y-8">
          <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Bougie on a Budget</h3>
          <p className="text-[15px] text-white/90 leading-[1.8] font-sans">
            I maximize credit card perks and hotel benefits to make the convention circuit lifestyle both high-end and highly feasible. I'm known for my bright, fun outfits and my "efficiency-first" travel philosophy.
          </p>
        </div>
      </div>

      <div className="space-y-8 px-4 md:px-0">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-[3px] text-text-dim">// SYSTEM_MANIFEST: BACKGROUND_DATA</h3>
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
            <span key={chip} className="text-[9px] font-mono font-bold border border-line px-3 py-1 bg-surface text-text-main tracking-widest">
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
