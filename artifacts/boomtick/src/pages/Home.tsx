import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Dumbbell, Luggage, ShoppingBag, BarChart3, ArrowRight, Play, Zap } from "lucide-react";
import Equalizer from "@/components/Equalizer";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <span className="text-gradient">Train smarter.</span><br/>
              Dance better.
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg mt-2">
              Training, travel, and data for competitive West Coast Swing dancers.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Dumbbell, label: "TRAIN SMARTER" },
                { icon: Luggage, label: "TRAVEL BETTER" },
                { icon: ShoppingBag, label: "SHOP SMARTER" },
                { icon: BarChart3, label: "USE DATA" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                  <div className="p-2 rounded-md bg-muted text-primary group-hover:bg-primary/10 transition-colors">
                    <item.icon size={20} />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <Equalizer />
          </div>
        </div>
      </section>

      {/* Data Lab Section */}
      <section className="py-24 px-6 md:px-12 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-secondary/10 to-transparent opacity-50 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Data Lab</h2>
              <p className="text-muted-foreground text-lg max-w-xl">Deep analytics on competition results, judging trends, and point progression. Because feelings are good, but facts are better.</p>
            </div>
            <button className="mt-6 md:mt-0 flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
              ENTER LAB <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "12,450", label: "Competition results analyzed", trend: "+14% this month" },
              { stat: "98%", label: "Accuracy in tier progression models", trend: "Updated weekly" },
              { stat: "2.4M", label: "Data points collected", trend: "Since 2018" }
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border p-8 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-kinetic opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl font-bold mb-2 font-mono tracking-tighter">{item.stat}</div>
                <div className="text-foreground/80 font-medium mb-4">{item.label}</div>
                <div className="text-sm text-secondary flex items-center gap-2">
                  <Zap size={14} /> {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Latest Intel</h2>
          <button className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase text-sm font-bold tracking-widest">
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={post.img} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.tag}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  {post.time}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gear Picks */}
      <section className="py-24 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Gear Picks</h2>
              <p className="text-muted-foreground text-lg mb-8">Stop slipping. Stop sticking. Find the exact shoes, soles, and training equipment the pros use.</p>
              <button className="border-2 border-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors rounded-lg">
                Shop The Guide
              </button>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 gap-4">
               {[
                 { name: "SwayD Urban", type: "Dance Sneaker", price: "$110" },
                 { name: "Taygra Split", type: "Competition Boot", price: "$145" },
                 { name: "G-Franco", type: "Street Sole", price: "$95" },
                 { name: "Suede Brush", type: "Maintenance", price: "$12" }
               ].map((item, i) => (
                 <div key={i} className="bg-background border border-border p-6 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                   <div className="aspect-square bg-muted rounded-md mb-4 overflow-hidden flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                     <ShoppingBag size={32} />
                   </div>
                   <div className="font-bold text-lg">{item.name}</div>
                   <div className="flex justify-between items-center mt-2">
                     <span className="text-sm text-muted-foreground">{item.type}</span>
                     <span className="text-primary font-mono">{item.price}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Destinations */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">The Circuit</h2>
          <p className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto">Where to go, where to stay, and what to eat when you're not in the ballroom.</p>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { city: "Burbank", event: "US Open", month: "November", img: "https://images.unsplash.com/photo-1580659324838-891000b080d9?auto=format&fit=crop&w=400&q=80" },
              { city: "Atlanta", event: "Swing Diego", month: "January", img: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=400&q=80" },
              { city: "Denver", event: "Atlanta WCS", month: "August", img: "https://images.unsplash.com/photo-1605338144211-137b2d131f6e?auto=format&fit=crop&w=400&q=80" },
              { city: "London", event: "UK Championships", month: "May", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80" }
            ].map((dest, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                <img src={dest.img} alt={dest.city} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="text-primary font-mono text-sm mb-1">{dest.month}</div>
                  <div className="text-2xl font-bold mb-1">{dest.city}</div>
                  <div className="text-muted-foreground text-sm font-medium">{dest.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-kinetic opacity-10"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Never miss a beat.</h2>
          <p className="text-xl text-muted-foreground mb-10">Join 5,000+ competitive dancers receiving our weekly breakdown of training tactics, gear drops, and data insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="flex-1 bg-background/50 border border-border px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono placeholder:text-muted-foreground backdrop-blur-sm"
            />
            <button className="bg-foreground text-background px-8 py-4 font-bold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <span>B\</span>
            <span>boomtick</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">BLOG</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">GEAR</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">DATA LAB</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">TRAVEL</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} boomtick.blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
