import { motion } from 'motion/react';
import { Dumbbell, Luggage, ShoppingBag, BarChart3, ArrowRight, Play, Zap } from 'lucide-react';
import Equalizer from '@/components/Equalizer';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 w-full overflow-hidden">
      <SEO
        title="Home"
        description="BoomTick.blog: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The West Coast Swing Lifestyle Blog by Tech Dancer."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-12 pb-20 flex flex-col justify-center w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-widest text-sm uppercase">West Coast Swing</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Built for dancers.<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Train smarter.</span><br/>
              Dance better.
            </h1>

            <p className="text-xl text-text-dim leading-relaxed max-w-lg">
              Data-driven insights, gear reviews, and travel strategies for the competitive West Coast Swing circuit.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button className="bg-primary text-primary-foreground px-8 py-4 font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                Enter The Lab <ArrowRight size={20} />
              </button>
              <button className="bg-secondary/10 text-secondary px-8 py-4 font-bold rounded-lg hover:bg-secondary/20 transition-colors flex items-center gap-2">
                <Play size={20} /> Watch Latest
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50 blur-2xl"></div>
            <Equalizer />
          </motion.div>
        </div>
      </section>

      {/* The Lab */}
      <section className="py-24 border-y border-line w-full rounded-3xl bg-surface-alt mt-8 px-6 lg:px-12">
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-12 justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-main">The Data Lab</h2>
              <p className="text-text-dim text-lg">We analyze thousands of competition results to uncover the real patterns behind tier progression and competitive success.</p>
            </div>
            <button className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold tracking-widest uppercase text-sm">
              View Methodology <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "12,450", label: "Competition results analyzed", trend: "+14% this month" },
              { stat: "98%", label: "Accuracy in tier progression models", trend: "Updated weekly" },
              { stat: "2.4M", label: "Data points collected", trend: "Since 2018" }
            ].map((item, i) => (
              <div key={i} className="bg-surface border border-line p-8 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl font-bold mb-2 font-mono tracking-tighter text-text-main">{item.stat}</div>
                <div className="text-text-body font-medium mb-4">{item.label}</div>
                <div className="text-sm text-secondary flex items-center gap-2">
                  <Zap size={14} /> {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-24 w-full">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-text-main">Latest Intel</h2>
          <button className="hidden md:flex items-center gap-2 text-text-dim hover:text-text-main transition-colors uppercase text-sm font-bold tracking-widest">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { tag: "TRAINING", title: "The biomechanics of a perfect anchor step", time: "5 MIN READ", img: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80" },
            { tag: "GEAR", title: "Review: The new SwayD competition line", time: "8 MIN READ", img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80" },
            { tag: "TRAVEL", title: "Navigating US Open: A survivor's guide", time: "12 MIN READ", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer flex flex-col gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={post.img} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.tag}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-text-dim mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  {post.time}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-text-main">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gear Picks */}
      <section className="py-24 border-y border-line w-full rounded-3xl bg-surface-alt px-6 lg:px-12 mt-8 mb-8">
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-main">Gear Picks</h2>
              <p className="text-text-dim text-lg mb-8">Stop slipping. Stop sticking. Find the exact shoes, soles, and training equipment the pros use.</p>
              <button className="border-2 border-text-main px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-text-main hover:text-bg transition-colors rounded-lg text-text-main">
                Shop The Guide
              </button>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { name: "SwayD Urban", type: "Dance Sneaker", price: "$110" },
                 { name: "Taygra Split", type: "Competition Boot", price: "$145" },
                 { name: "G-Franco", type: "Street Sole", price: "$95" },
                 { name: "Suede Brush", type: "Maintenance", price: "$12" }
               ].map((item, i) => (
                 <div key={i} className="bg-surface border border-line p-6 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                   <div className="aspect-square bg-surface-alt rounded-md mb-4 overflow-hidden flex items-center justify-center text-text-dim group-hover:text-primary transition-colors">
                     <ShoppingBag size={32} />
                   </div>
                   <div className="font-bold text-lg text-text-main">{item.name}</div>
                   <div className="flex justify-between items-center mt-2">
                     <span className="text-sm text-text-dim">{item.type}</span>
                     <span className="text-primary font-mono">{item.price}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Destinations */}
      <section className="py-24 w-full">
        <div className="w-full">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-text-main">The Circuit</h2>
          <p className="text-text-dim text-lg mb-12 text-center max-w-2xl mx-auto">Where to go, where to stay, and what to eat when you're not in the ballroom.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: "Burbank", event: "US Open", month: "November", img: "https://images.unsplash.com/photo-1580659324838-891000b080d9?auto=format&fit=crop&w=400&q=80" },
              { city: "Atlanta", event: "Swing Diego", month: "January", img: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=400&q=80" },
              { city: "Denver", event: "Atlanta WCS", month: "August", img: "https://images.unsplash.com/photo-1605338144211-137b2d131f6e?auto=format&fit=crop&w=400&q=80" },
              { city: "London", event: "UK Championships", month: "May", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80" }
            ].map((dest, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                <img src={dest.img} alt={dest.city} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="text-primary font-mono text-sm mb-1">{dest.month}</div>
                  <div className="text-2xl font-bold mb-1 text-white">{dest.city}</div>
                  <div className="text-white/80 text-sm font-medium">{dest.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-32 relative overflow-hidden w-full rounded-3xl bg-surface-alt mt-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-text-main">Never miss a beat.</h2>
          <p className="text-xl text-text-dim mb-10">Join 5,000+ competitive dancers receiving our weekly breakdown of training tactics, gear drops, and data insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-surface border border-line px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main font-mono placeholder:text-text-dim backdrop-blur-sm"
            />
            <button className="bg-primary text-primary-foreground px-8 py-4 font-bold rounded-lg hover:opacity-90 transition-colors uppercase tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
