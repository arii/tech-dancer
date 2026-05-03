import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Equalizer from "@/components/Equalizer";
import { useHomePageData } from "@/hooks/use-page-data";

const Home = () => {
  const { blogPosts, upcomingEvents, tagColors } = useHomePageData();

  return (
    <div className="flex min-h-screen bg-background text-foreground flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 min-h-screen md:ml-56 pt-0 md:pt-0">
        <section className="px-4 sm:px-6 md:px-10 pt-10 md:pt-14 pb-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Welcome to boomtick.blog</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">The West Coast Swing<br />Lifestyle Blog</h1>
            <p className="text-lg text-muted-foreground max-w-xl">Training tips, travel guides, gear picks, and data — for dancers who want to get better and go further. Written by <span className="text-primary font-semibold">Tech Dancer</span>.</p>
          </motion.div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[280px]">
            <div className="relative bg-[#0a0718] flex flex-col justify-end p-6 sm:p-8 group overflow-hidden min-h-[260px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-56 overflow-hidden opacity-18 pointer-events-none"><Equalizer compact /></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-white">Train smarter.</h2>
                <p className="text-sm text-white/70 mb-4 max-w-xs">Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.</p>
                <div className="flex flex-col gap-2">{[
                  { label: "WCS Training →", href: "https://boomtick.blog/blog?category=Training" },
                  { label: "Competition tips →", href: "https://boomtick.blog/blog?category=Lifestyle" },
                  { label: "Gear reviews →", href: "https://boomtick.blog/gear" },
                ].map((link) => (<a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors" data-testid={`train-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>{link.label}</a>))}</div>
              </div>
            </div>
            <div className="relative bg-[#0c0a1e] flex flex-col justify-end p-6 sm:p-8 group overflow-hidden border-l border-border min-h-[260px]">
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary/8 via-accent/4 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-56 overflow-hidden opacity-18 pointer-events-none"><Equalizer compact reverse /></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-white">Travel better.</h2>
                <p className="text-sm text-white/70 mb-4 max-w-xs">Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.</p>
                <div className="flex flex-col gap-2">{[
                  { label: "Travel guides →", href: "https://boomtick.blog/blog?category=Travel" },
                  { label: "Event calendar →", href: "https://boomtick.blog/blog" },
                  { label: "Packing lists →", href: "https://boomtick.blog/gear" },
                ].map((link) => (<a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-secondary/80 font-semibold transition-colors" data-testid={`travel-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>{link.label}</a>))}</div>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-14">
          <div className="flex items-end justify-between mb-6"><div><p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Latest Updates</p><h2 className="text-2xl font-black">Recent Posts</h2></div><a href="https://boomtick.blog/blog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors" data-testid="link-view-all-posts">View all posts <ArrowRight size={13} /></a></div>
          <div className="flex flex-col divide-y divide-border">{blogPosts.map((post, i) => (<motion.a key={i} href={post.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }} className="group flex flex-col sm:flex-row sm:items-start gap-4 py-6 hover:bg-muted/20 -mx-4 px-4 rounded-lg transition-colors cursor-pointer" data-testid={`post-card-${i}`}><div className="flex items-center gap-3 sm:w-44 shrink-0 pt-0.5"><span className={`text-xs font-bold px-2 py-0.5 rounded border ${tagColors[post.tag] ?? "text-muted-foreground border-border"}`}>{post.tag}</span><time className="text-xs text-muted-foreground whitespace-nowrap font-mono">{post.date}</time></div><div><h3 className="font-bold text-base group-hover:text-primary transition-colors mb-1">{post.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p></div></motion.a>))}</div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-16">
          <div className="mb-6"><p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">On the Circuit</p><h2 className="text-2xl font-black">Where Dancers Go</h2></div>
          <div className="grid sm:grid-cols-3 gap-4">{upcomingEvents.map((evt, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * i + 0.4 }} className="border border-border rounded-xl p-5 bg-card hover:border-primary/40 transition-colors" data-testid={`event-card-${i}`}><h3 className="font-bold text-sm mb-2">{evt.name}</h3><div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><MapPin size={12} className="text-primary shrink-0" />{evt.location}</div><div className="flex items-center gap-1.5 text-xs text-secondary"><Calendar size={12} className="shrink-0" />{evt.cadence}</div></motion.div>))}</div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-16">
          <div className="border border-border rounded-xl p-6 bg-card/50 flex flex-col sm:flex-row sm:items-center gap-6"><div className="flex-1"><p className="text-xs font-bold tracking-widest uppercase text-accent mb-2">Data Lab</p><h3 className="font-black text-lg mb-1">WCS Competition Analytics</h3><p className="text-sm text-muted-foreground">Objective data on competition trends, scoring patterns, and point progression — because the numbers tell a story too.</p></div><a href="https://boomtick.blog/research" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-2 border border-accent/40 text-accent text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-accent/10 transition-colors" data-testid="link-data-lab">Explore Data <ArrowRight size={14} /></a></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
