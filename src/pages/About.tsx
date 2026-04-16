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
      <span className="text-[10px] uppercase tracking-[2px] text-accent mb-3 block font-mono">
        // THE ARCHITECT // PROFILE
      </span>
      
      <div className="space-y-8 mb-16">
        <h1 className="font-serif italic text-5xl md:text-7xl leading-[1.1] text-text-main font-bold">
          The Scientist who Cracked the WCS Travel Code.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl">
          I’m Ariel. I use my robotics background to find the best gear, travel hacks, and data for West Coast Swing. 
          Maximize your WCS lifestyle without the PhD-level stress.
        </p>
      </div>

      <div className="flex items-center gap-6 mb-16">
        <div className="w-[100px] h-[100px] bg-line rounded-full border-4 border-accent overflow-hidden shrink-0 shadow-lg">
          <img 
            src="https://picsum.photos/seed/ariel/200/200" 
            alt="Ariel Anders"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="text-3xl font-serif font-bold text-text-main">Ariel Anders, PhD</h2>
          <div className="text-sm text-accent font-bold tracking-[2px] uppercase mt-1">MIT Roboticist // WCS Tech-Dancer</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="content-card space-y-6">
          <h3 className="text-xl font-sans font-bold uppercase tracking-[1px] text-text-main border-b-2 border-accent w-fit pb-1">My Dance Journey</h3>
          <p className="text-[15px] text-text-body leading-[1.8]">
            I started dancing West Coast Swing in 2022 and haven't looked back! I compete in the Intermediate division 
            as a follow and will lead from time to time. You can find me at Mission City Swing in SF on Wednesdays, 
            likely vibing to Motown Monday—my favorite genre.
          </p>
        </div>
        <div className="content-card space-y-6">
          <h3 className="text-xl font-sans font-bold uppercase tracking-[1px] text-text-main border-b-2 border-accent w-fit pb-1">Why the PhD Matters</h3>
          <p className="text-[15px] text-text-body leading-[1.8]">
            My technical life is rooted in autonomous systems and robotics. I spent a decade at MIT learning how to 
            predict momentum and optimize trajectories. I bring that same analytical lens to the dance floor—not to 
            make it robotic, but to find the "hacks" that make the WCS lifestyle sustainable and stylish.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="content-card space-y-6">
          <h3 className="text-xl font-sans font-bold uppercase tracking-[1px] text-text-main border-b-2 border-accent w-fit pb-1">On the Floor</h3>
          <p className="text-[15px] text-text-body leading-[1.8]">
            I’m a competitive Intermediate-level follow (and an occasional lead!) who loves the conversation and connection unique to WCS. 
            Mission City Swing is where it all began for me. If it’s a Wednesday night in San Francisco, I'm there.
          </p>
        </div>
        <div className="content-card space-y-6">
          <h3 className="text-xl font-sans font-bold uppercase tracking-[1px] text-text-main border-b-2 border-accent w-fit pb-1">Why This Site Exists</h3>
          <p className="text-[15px] text-text-body leading-[1.8]">
            I am often asked: "Where did you get that outfit?" and "How do you afford to travel to so many events?" 
            While I'm grateful for a strong career, I’ve always tried to make my lifestyle as financially efficient as possible. 
            This site is my way of sharing the "stacks" I’ve built—from curated gear reviews to travel-hacking systems.
          </p>
        </div>
      </div>

      <div className="content-card mb-12 border-l-8 border-accent">
        <h3 className="text-xl font-sans font-bold uppercase tracking-[1px] text-accent mb-4 italic">Bougie on a Budget</h3>
        <p className="text-[15px] text-text-body leading-[1.8] max-w-3xl">
          I love maximizing credit card perks and hotel benefits to make the convention circuit lifestyle both high-end and highly feasible. 
          I’m known for my bright, fun outfits and my "bougie on a budget" travel philosophy.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-[2px] text-text-main">Where I've Been</h3>
        <div className="flex flex-wrap gap-3">
          {['MIT PhD', 'MIT CSAIL', 'Civ Robotics', 'Intermediate WCS', 'Mission City Swing', 'SF Local', 'Motown Monday', 'Marriott Titanium', 'Amex Platinum'].map(chip => (
            <span key={chip} className="experience-chip border-accent/20 text-text-body font-medium px-4 py-2">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
