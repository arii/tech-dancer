/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Shield, Plane, Hotel, Activity, Code, Server, Music, ArrowRight, User, Calendar, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { affiliateManager } from '../lib/affiliateManager';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '../lib/content';

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
  const [studies, setStudies] = useState<ContentItem[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<ContentItem | null>(null);

  useEffect(() => {
    const loadedStudies = getAllContent('studies');
    setStudies(loadedStudies);
  }, []);

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
      <div className="space-y-8 mb-16 px-4 md:px-0">
        <h1 className="font-display uppercase text-5xl md:text-8xl leading-[1.0] text-text-main font-bold tracking-tighter">
          The Engine.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
          Deep-dive analysis on the mechanics of West Coast Swing. From judge variance to the physics of momentum.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16"
      >
        <div className="md:col-span-7 content-card overflow-hidden !p-0">
          <div className="aspect-video bg-line overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://picsum.photos/seed/dance-data/800/450"
              alt="Dance Data"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-3xl font-display font-bold text-text-main uppercase tracking-tighter">Data with a Heartbeat.</h3>
            <p className="text-[15px] text-text-body leading-[1.8] font-sans opacity-80">
              I use my robotics background to crack the code of West Coast Swing.
              From judge consistency to the physics of connection, this is data you can actually use on the floor.
            </p>
          </div>
        </div>
        <div className="md:col-span-5 space-y-8">
          <h3 className="text-sm font-sans font-bold uppercase tracking-[3px] text-text-main border-b border-line w-full pb-4 leading-none">Quick Insights</h3>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 gap-4"
          >
            {experiencePacks.map((pack) => (
              <motion.div
                key={pack.category}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5, borderColor: 'var(--color-accent-brand)' }}
                className="bg-bg border border-line !p-6 flex items-center gap-6 group hover:border-accent-brand transition-colors cursor-default scanline-hover"
              >
                <div className="w-12 h-12 bg-accent/5 border border-accent/10 flex items-center justify-center text-accent shrink-0">
                  <pack.icon className="w-6 h-6 stroke-1" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-accent-brand font-mono uppercase font-bold tracking-widest leading-none">{pack.category}</div>
                  <div className="text-xl font-display font-bold text-text-main leading-tight uppercase tracking-tight">{pack.focus}</div>
                  <div className="text-xs italic text-text-dim font-sans">"{pack.benefit}"</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {studies.map((paper, index) => (
          <motion.div
            key={paper.slug}
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="relative border border-line p-10 bg-surface hover:bg-card-bg transition-colors cursor-pointer group"
            onClick={() => setSelectedStudy(paper)}
          >
            {/* Replace side-stripe with a top-right index */}
            <div className="absolute top-6 right-8 font-mono text-[10px] text-accent font-bold tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
              REF_ID: 00{index + 1}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {paper.tags?.map(tag => (
                <span key={tag} className="text-[9px] font-mono tracking-tighter border border-line px-2 py-0.5 uppercase text-text-dim">
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="text-3xl font-display font-bold mb-8 max-w-2xl leading-tight">
              {paper.title}
            </h4>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[9px] font-mono font-bold uppercase text-accent tracking-[2px]">Abstract</div>
                <p className="text-sm text-text-body leading-relaxed line-clamp-2">
                  {paper.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent group-hover:translate-x-1 transition-transform">
                Read Full Analysis <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedStudy && (
        <div className="fixed inset-0 z-[100] bg-bg overflow-y-auto p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedStudy(null)}
              className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                {selectedStudy.category}
              </span>
              <div className="flex items-center gap-2 text-text-dim text-xs font-medium">
                <Calendar className="w-3 h-3" />
                {selectedStudy.date}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main mb-12 leading-tight">
              {selectedStudy.title}
            </h1>

            <div className="markdown-body prose prose-lg max-w-none text-text-body leading-relaxed space-y-6">
              <Markdown>{selectedStudy.content}</Markdown>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
