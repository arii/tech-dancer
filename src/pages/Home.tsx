/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Zap, Database, ArrowRight, Home as HomeIcon, Shield, Calendar } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const latestUpdates = [
    {
      type: 'Blog',
      title: 'The Physics of the Pivot',
      desc: 'Why your choice of suede matters for spin stability.',
      date: 'April 15',
      link: 'blog'
    },
    {
      type: 'Gear',
      title: 'Suede Your Own Shoes',
      desc: 'The $15 DIY hack for perfect traction.',
      date: 'April 12',
      link: 'lab'
    },
    {
      type: 'Data',
      title: 'Scoring Variance Analysis',
      desc: 'Understanding judge bias in Intermediate finals.',
      date: 'April 08',
      link: 'engine'
    }
  ];

  const upcomingEvents = [
    { name: 'Mission City Swing', date: 'Every Wednesday', status: 'Local Regular', icon: HomeIcon },
    { name: 'So Swing', date: 'May 2026', status: 'Featured Event', icon: Zap },
    { name: 'Jack & Jill Orama', date: 'June 2026', status: 'Region Captain (NorCal/Best Cal)', icon: Shield },
    { name: 'Phoenix 4th of July', date: 'July 2026', status: 'Featured Event', icon: Zap },
    { name: 'Swingtacular', date: 'August 2026', status: 'Featured Event', icon: Zap },
    { name: 'Boogie by the Bay', date: 'October 2026', status: 'Featured Event', icon: Zap },
  ];

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="min-h-full flex flex-col justify-center py-20">
        <span className="text-[10px] uppercase tracking-[3px] text-accent mb-4 block font-mono font-bold">
          // WELCOME
        </span>
        
        <div className="space-y-6 mb-24 px-4 md:px-0">
          <h1 className="font-display uppercase text-5xl md:text-9xl leading-[0.9] text-text-main font-bold tracking-tighter">
            The Roboticist's Guide to WCS.
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
            <p className="text-xl md:text-2xl text-text-body max-w-3xl font-sans leading-relaxed">
              Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis to maximize your West Coast Swing trajectory.
            </p>
            <div className="stats-widget !p-4 !m-0 border-l-2 border-accent bg-accent/5 shrink-0 rounded-none shadow-none">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-1">Status: Optimized</div>
              <div className="text-sm font-display font-medium">BOUGIE ON A BUDGET</div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-0 border-y border-line"
        >
          <div className="grid grid-cols-12 gap-0">
            {/* Main Feature */}
            <div 
              onClick={() => setActiveTab('lab')}
              className="col-span-12 lg:col-span-8 border-r border-line p-8 md:p-16 hover:bg-card-bg transition-colors cursor-pointer group"
            >
              <div className="aspect-[16/9] overflow-hidden bg-line">
                <img 
                  src="https://picsum.photos/seed/gear-stack/1200/675" 
                  alt="Hardware & Shell" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-12 space-y-6">
                <h3 className="text-4xl md:text-6xl font-display font-bold uppercase leading-none">Hardware & Shell</h3>
                <p className="text-lg md:text-xl text-text-body max-w-xl">
                  Stress-tested apparel and footwear for the 3:00 AM social floor. From friction-reduction DIYs to sustainable packing manifests.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[2px] text-accent">
                  Explore The Lab <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Side Stack */}
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <div 
                onClick={() => setActiveTab('feed')}
                className="flex-1 p-8 md:p-12 border-b border-line bg-accent text-white hover:bg-accent-orange transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-white/60">COLLECTION: 01</div>
                <h3 className="text-3xl font-display font-bold uppercase mb-4">Logistics Logic</h3>
                <p className="text-sm text-white/80 mb-8 leading-relaxed">
                  High-efficiency travel protocols. Hotel block arbitrage, flight matrix optimization, and status stacking.
                </p>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px]">
                  Access Systems <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div 
                onClick={() => setActiveTab('engine')}
                className="flex-1 p-8 md:p-12 bg-surface hover:bg-card-bg transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-accent">ANALYSIS: 02</div>
                <h3 className="text-3xl font-display font-bold uppercase mb-4 text-text-main">Predictive Engine</h3>
                <p className="text-sm text-text-body mb-8 leading-relaxed">
                  The physics of momentum and connection. Quantifying judge variance and heat density.
                </p>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent">
                  View Data <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Latest Updates Section */}
        <div className="mt-24 space-y-8">
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h3 className="text-sm font-bold uppercase tracking-[3px] text-text-main">Latest Updates</h3>
            <div className="text-[10px] text-text-dim font-mono uppercase tracking-widest">System Time: 2026.04.15</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestUpdates.map((update, idx) => (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                onClick={() => setActiveTab(update.link)}
                className="bg-surface border border-line p-5 rounded-lg hover:border-accent transition-all group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {update.type}
                  </span>
                  <span className="text-[9px] text-text-dim font-mono">{update.date}</span>
                </div>
                <h5 className="text-base font-serif font-bold text-text-main group-hover:text-accent transition-colors mb-2">
                  {update.title}
                </h5>
                <p className="text-xs text-text-body leading-relaxed line-clamp-2">
                  {update.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent group-hover:translate-x-1 transition-transform">
                  View <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Circuit Section */}
        <div className="mt-24 space-y-8">
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h3 className="text-sm font-bold uppercase tracking-[3px] text-text-main">Upcoming Circuit</h3>
            <div className="text-[10px] text-accent animate-pulse font-mono uppercase tracking-widest font-bold">● Live Itinerary</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, idx) => (
              <div key={event.name} className="bg-surface/50 border border-line p-6 rounded-lg flex items-start gap-4 hover:border-accent transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <event.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] text-accent font-mono uppercase font-bold tracking-widest">{event.status}</div>
                  <div className="text-lg font-serif font-bold text-text-main leading-tight">{event.name}</div>
                  <div className="text-xs text-text-dim flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-widget mt-24 w-fit pb-12">
          <div className="font-serif italic text-3xl text-accent">Connect With the Journey</div>
          <div className="text-[10px] uppercase tracking-[2px] text-text-dim mt-2 font-mono">
            Currently Obsessed: Hypervolt Mini & Motown Monday
          </div>
        </div>
      </div>
    </section>
  );
}
