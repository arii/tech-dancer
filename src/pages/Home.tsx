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
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-display uppercase text-5xl md:text-9xl leading-[0.9] text-text-main font-bold tracking-tighter"
          >
            The Roboticist's Guide to WCS.
          </motion.h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-text-body max-w-3xl font-sans leading-relaxed"
            >
              Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis to maximize your West Coast Swing trajectory.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="stats-widget !p-4 !m-0 border border-accent-brand bg-accent-brand/5 shrink-0 rounded-none shadow-none relative"
            >
              <div className="absolute top-1 right-1 text-[8px] font-mono opacity-30 select-none">REF_ID: STATUS_001</div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-brand mb-1">Status: Optimized</div>
              <div className="text-sm font-display font-medium">BOUGIE ON A BUDGET</div>
            </motion.div>
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
                staggerChildren: 0.1
              }
            }
          }}
          className="space-y-0 border-y border-line"
        >
          <div className="grid grid-cols-12 gap-0">
            {/* Main Feature */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => setActiveTab('lab')}
              className="col-span-12 lg:col-span-8 border-r border-line p-8 md:p-16 hover:bg-card-bg transition-colors cursor-pointer group"
            >
              <div className="aspect-[16/9] overflow-hidden bg-line">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
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
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[2px] text-accent"
                >
                  Explore The Lab <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Side Stack */}
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => setActiveTab('feed')}
                className="flex-1 p-8 md:p-12 border-b border-line bg-accent text-white hover:bg-accent-orange transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-white/60">COLLECTION: 01</div>
                <h3 className="text-3xl font-display font-bold uppercase mb-4">Logistics Logic</h3>
                <p className="text-sm text-white/80 mb-8 leading-relaxed">
                  High-efficiency travel protocols. Hotel block arbitrage, flight matrix optimization, and status stacking.
                </p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px]"
                >
                  Access Systems <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                onClick={() => setActiveTab('engine')}
                className="flex-1 p-8 md:p-12 bg-surface hover:bg-card-bg transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-accent">ANALYSIS: 02</div>
                <h3 className="text-3xl font-display font-bold uppercase mb-4 text-text-main">Predictive Engine</h3>
                <p className="text-sm text-text-body mb-8 leading-relaxed">
                  The physics of momentum and connection. Quantifying judge variance and heat density.
                </p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent"
                >
                  View Data <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Latest Updates Section */}
        <div className="mt-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between border-b border-line pb-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-[3px] text-text-main">Latest Updates</h3>
            <div className="text-[10px] text-text-dim font-mono uppercase tracking-widest">System Time: 2026.04.15</div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {latestUpdates.map((update, idx) => {
              const isFirst = idx === 0;
              return (
                <motion.div
                  key={update.title}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5, borderColor: 'var(--color-accent-brand)' }}
                  onClick={() => setActiveTab(update.link)}
                  className={`bg-surface border border-line p-8 rounded-none transition-all group cursor-pointer scanline-hover ${isFirst ? 'md:col-span-7' : 'md:col-span-5'}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-brand border border-accent-brand/20 px-3 py-1">
                      {update.type}
                    </span>
                    <span className="text-[10px] text-text-dim font-mono">{update.date}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-text-main group-hover:text-accent-brand transition-colors mb-4 uppercase tracking-tighter">
                    {update.title}
                  </h3>
                  <p className="text-base text-text-body leading-relaxed line-clamp-2 font-sans opacity-80">
                    {update.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[2px] text-accent-brand group-hover:translate-x-1 transition-transform">
                    Inspect Report <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* WSDC Registry Ledger Section */}
        <div className="mt-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between border-b border-line pb-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-[3px] text-text-main">WSDC Registry Ledger</h3>
            <div className="text-[10px] text-accent-brand animate-pulse font-mono uppercase tracking-widest font-bold">● Live Itinerary</div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-line bg-line"
          >
            {upcomingEvents.map((event, idx) => (
              <motion.div 
                key={event.name} 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="bg-bg p-6 border-line flex items-start gap-4 hover:bg-accent/5 transition-colors group cursor-default"
              >
                <div className="w-10 h-10 border border-line bg-line flex items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors">
                  <event.icon className="w-5 h-5 stroke-1" />
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] text-accent font-mono uppercase font-bold tracking-widest">{event.status}</div>
                  <div className="text-lg font-display font-bold text-text-main leading-tight uppercase tracking-tight">{event.name}</div>
                  <div className="text-xs text-text-dim flex items-center gap-2 font-mono">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="stats-widget mt-24 w-fit pb-12 relative">
          <div className="absolute top-2 right-2 text-[8px] font-mono opacity-30 select-none">DATA_REF: 099</div>
          <div className="font-display font-bold uppercase text-3xl text-accent-brand tracking-tighter">Registry Calibration</div>
          <div className="text-[10px] uppercase tracking-[2px] text-text-dim mt-2 font-mono">
            Currently Obsessed: Hypervolt Mini & Motown Monday
          </div>
        </div>
      </div>
    </section>
  );
}
