/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Shield, Plane, Hotel, Activity, Code, Server, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { affiliateManager } from '../lib/affiliateManager';

const wcsData = [
  { month: 'Jan', scores: 45, events: 2 },
  { month: 'Feb', scores: 52, events: 3 },
  { month: 'Mar', scores: 48, events: 2 },
  { month: 'Apr', scores: 61, events: 4 },
  { month: 'May', scores: 55, events: 3 },
  { month: 'Jun', scores: 67, events: 5 },
];

const travelData = [
  { day: 'Mon', price: 450 },
  { day: 'Tue', price: 420 },
  { day: 'Wed', price: 380 },
  { day: 'Thu', price: 520 },
  { day: 'Fri', price: 680 },
  { day: 'Sat', price: 710 },
  { day: 'Sun', price: 590 },
];

export default function Engine() {
  const researchPapers = [
    {
      title: 'The Variance Engine: Why Some Judges Love Your Connection (and Others Don\'t)',
      abstract: 'An analysis of scoring outliers and judge agreement across national WCS events.',
      methodology: 'Aggregated scores from 12 national events to identify standard deviation in placement.',
      results: 'Identified a 14% variance in "Connection" scoring vs. "Timing" across the Intermediate division.',
      tags: ['Data', 'Scoring']
    },
    {
      title: 'Probability of Advancement: Can We Predict the Finals?',
      abstract: 'Using historical placement data to calculate the likelihood of advancing to finals based on heat density.',
      methodology: 'Monte Carlo simulations applied to 2024 competition rosters.',
      results: 'Advancement probability correlates 0.82 with "Lead-Follow Ratio" in heat distribution.',
      tags: ['Data', 'Competition']
    },
    {
      title: 'Line-of-Sight Bias: Why Judges Miss Your Best Moves',
      abstract: 'How judge positioning creates occlusion zones, similar to LIDAR blind spots in mobile manipulators.',
      methodology: 'Geometric mapping of judging circles based on dancer trajectory and judge orientation.',
      results: 'Verified a 22% "Occlusion Zone" where judge visibility is compromised by other couples.',
      tags: ['Robotics', 'Insights']
    }
  ];

  const experiencePacks = [
    {
      category: 'Footwear',
      focus: 'Biomechanics & Friction',
      benefit: 'Spin longer without knee pain.',
      icon: Activity
    },
    {
      category: 'Travel Rig',
      focus: 'Modular Efficiency',
      benefit: 'Work from the hotel, social dance all night.',
      icon: Plane
    },
    {
      category: 'Acoustics',
      focus: 'Frequency Response',
      benefit: 'Hear the leader’s breath and the bass line.',
      icon: Music
    }
  ];

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="space-y-8 mb-16">
        <h1 className="font-serif italic text-5xl md:text-7xl leading-[1.1] text-text-main font-bold">
          Dance Analytics.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl">
          A Quantitative Research Journal for the modern WCS dancer. Proving data science competency through the lens of social connection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="content-card overflow-hidden !p-0">
          <div className="aspect-video bg-line">
            <img 
              src="https://picsum.photos/seed/dance-data/800/450" 
              alt="Dance Data" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-text-main">Data with a Heartbeat.</h3>
            <p className="text-[15px] text-text-body leading-[1.8]">
              I use my robotics background to crack the code of West Coast Swing. 
              From judge consistency to the physics of connection, this is data you can actually use on the floor.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <h3 className="text-xl font-sans font-bold uppercase tracking-[1px] text-text-main border-b-2 border-accent w-fit pb-1">Quick Insights</h3>
          <div className="grid grid-cols-1 gap-4">
            {experiencePacks.map((pack) => (
              <div key={pack.category} className="content-card !p-6 flex items-center gap-6 group hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <pack.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-accent font-mono uppercase font-bold tracking-widest">{pack.category}</div>
                  <div className="text-lg font-serif font-bold text-text-main leading-tight">{pack.focus}</div>
                  <div className="text-sm italic text-text-body">"{pack.benefit}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <h3 className="text-3xl font-serif font-bold text-text-main">Research Journal</h3>
        {researchPapers.map((paper, index) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="content-card border-l-8 border-accent space-y-8"
          >
            <div className="flex flex-wrap gap-3">
              {paper.tags.map(tag => (
                <span key={tag} className="experience-chip border-accent/20 text-text-body font-medium px-4 py-2">
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="text-3xl font-serif font-bold text-text-main leading-tight">
              {paper.title}
            </h4>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase text-accent tracking-[2px]">The "Why"</div>
                <p className="text-[15px] text-text-body leading-relaxed italic">
                  {paper.abstract}
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase text-accent tracking-[2px]">The Method</div>
                <p className="text-[15px] text-text-body leading-relaxed">
                  {paper.methodology}
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase text-accent tracking-[2px]">The Result</div>
                <div className="p-6 bg-bg border border-line rounded-lg shadow-sm">
                  <p className="text-[14px] text-text-main font-mono leading-relaxed font-medium">
                    {paper.results}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
