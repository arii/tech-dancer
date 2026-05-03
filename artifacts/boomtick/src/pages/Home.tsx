import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Equalizer from "@/components/Equalizer";
import { homeHeroLinks, ArrowRight, Calendar, MapPin, blogPosts, tagColors, upcomingEvents } from "@/lib/content/home";
import { siteDescription, siteName } from "@/lib/seo";

const Home = () => {
  if (typeof document !== "undefined") {
    document.title = `${siteName} | West Coast Swing Lifestyle Blog`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", siteDescription);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 pt-0 md:pt-0">
        <section className="px-4 sm:px-6 md:px-10 pt-6 md:pt-14 pb-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.28em] sm:tracking-widest uppercase text-foreground/70 mb-3 sm:mb-4">Welcome to boomtick.blog</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">The West Coast Swing Lifestyle Blog</h1>
            <p className="text-sm sm:text-base md:text-lg leading-7 text-foreground/78 max-w-xl">Training tips, travel guides, gear picks, and data for dancers who want to get better and go further.</p>
          </motion.div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border/80 min-h-[280px] lg:grid-cols-2">
            <div className="relative min-h-[220px] overflow-hidden bg-[#0a0718] p-5 sm:min-h-[260px] sm:p-8 flex flex-col justify-end group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/25 to-transparent" />
              <div className="absolute inset-0 bg-[#05040d]/60" />
              <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 overflow-hidden opacity-10 pointer-events-none"><Equalizer compact /></div>
              <div className="relative z-10">
                <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">Train smarter.</h2>
                <p className="mb-5 max-w-xs text-sm leading-6 text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">Drills, breakdowns, and mindset for West Coast Swing dancers at every level.</p>
                <div className="flex flex-col gap-2">{homeHeroLinks[0].map((link) => (<a key={link.label} href={link.href} className="rounded-sm text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" data-testid={`train-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>{link.label}</a>))}</div>
              </div>
            </div>
            <div className="relative min-h-[220px] overflow-hidden border-t border-border bg-[#0c0a1e] p-5 sm:min-h-[260px] sm:p-8 flex flex-col justify-end group lg:border-t-0 lg:border-l">
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary/40 via-accent/25 to-transparent" />
              <div className="absolute inset-0 bg-[#070616]/60" />
              <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 overflow-hidden opacity-10 pointer-events-none"><Equalizer compact reverse /></div>
              <div className="relative z-10">
                <h2 className="mb-3 text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">Travel better.</h2>
                <p className="mb-5 max-w-xs text-sm leading-6 text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.</p>
                <div className="flex flex-col gap-2">{homeHeroLinks[1].map((link) => (<a key={link.label} href={link.href} className="rounded-sm text-sm font-semibold text-fuchsia-200 transition-colors hover:text-fuchsia-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" data-testid={`travel-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>{link.label}</a>))}</div>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-1 text-xs font-bold tracking-widest uppercase text-foreground/65">Latest Updates</p><h2 className="text-2xl font-black">Recent Posts</h2></div><a href="/blog" className="flex items-center gap-1.5 rounded-sm text-xs font-bold uppercase tracking-widest text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" data-testid="link-view-all-posts">View all posts <ArrowRight size={13} /></a></div>
          <div className="flex flex-col divide-y divide-border/80 rounded-2xl border border-border/70 bg-card/30 px-1">{blogPosts.map((post: { href: string; tag: string; date: string; title: string; excerpt: string }, i: number) => (<motion.a key={post.href} href={post.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }} className="group flex flex-col gap-3 rounded-lg px-3 py-5 transition-colors hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:-mx-2 sm:flex-row sm:items-start sm:gap-4 sm:px-5 sm:py-6" data-testid={`post-card-${i}`}><div className="flex shrink-0 flex-wrap items-center gap-2 pt-0.5 sm:w-44 sm:gap-3"><span className={`rounded border px-2 py-0.5 text-xs font-bold ${tagColors[post.tag] ?? "text-muted-foreground border-border"}`}>{post.tag}</span><time className="whitespace-nowrap font-mono text-xs text-foreground/70">{post.date}</time></div><div><h3 className="mb-1 text-base font-bold transition-colors group-hover:text-primary">{post.title}</h3><p className="text-sm leading-7 text-foreground/72">{post.excerpt}</p></div></motion.a>))}</div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-16">
          <div className="mb-6"><p className="mb-1 text-xs font-bold tracking-widest uppercase text-foreground/65">On the Circuit</p><h2 className="text-2xl font-black">Where Dancers Go</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{upcomingEvents.map((evt, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * i + 0.4 }} className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm transition-colors hover:border-primary/40" data-testid={`event-card-${i}`}><h3 className="mb-2 text-sm font-bold">{evt.name}</h3><div className="mb-1 flex items-center gap-1.5 text-xs text-foreground/72"><MapPin size={12} className="shrink-0 text-primary" />{evt.location}</div><div className="flex items-center gap-1.5 text-xs text-secondary/90"><Calendar size={12} className="shrink-0" />{evt.cadence}</div></motion.div>))}</div>
        </section>
        <section className="px-4 sm:px-6 md:px-10 pb-16">
          <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card/60 p-5 sm:flex-row sm:items-center sm:p-6"><div className="flex-1"><p className="mb-2 text-xs font-bold tracking-widest uppercase text-accent">Data Lab</p><h3 className="mb-1 text-lg font-black">WCS Competition Analytics</h3><p className="text-sm leading-7 text-foreground/72">Objective data on competition trends, scoring patterns, and point progression — because the numbers tell a story too.</p></div><a href="/research" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-accent/40 px-5 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60" data-testid="link-data-lab">Explore Data <ArrowRight size={14} /></a></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
