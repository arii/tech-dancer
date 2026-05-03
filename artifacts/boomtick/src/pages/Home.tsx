import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Equalizer from "@/components/Equalizer";

const blogPosts = [
  {
    tag: "Tech",
    date: "2026-04-20",
    title: "Stop Wasting Vercel Credits: Deploy Every Branch to GitHub Pages",
    excerpt: "Time is your most precious commodity. Narrow the gap between coding and seeing your changes by deploying every branch to GitHub Pages.",
    href: "https://boomtick.blog/blog/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages",
  },
  {
    tag: "Travel",
    date: "2026-04-19",
    title: "The WCS Travel Pack: 3 Essentials You're Forgetting",
    excerpt: "Loop earplugs, industrial travel steamers, and portable sound. Why these three pieces of gear are the secret to a better dance weekend.",
    href: "https://boomtick.blog/blog/2026-04-19-gear-essentials",
  },
  {
    tag: "Dance Research",
    date: "2026-04-18",
    title: "Coming Soon: WCS Competition Data Scraper",
    excerpt: "Announcing a new tool for objective, ethical analysis of West Coast Swing competition data.",
    href: "https://boomtick.blog/blog/2026-04-18-competition-metrics",
  },
];

const tagColors: Record<string, string> = {
  Tech: "text-primary border-primary/40",
  Travel: "text-secondary border-secondary/40",
  "Dance Research": "text-accent border-accent/40",
};

const Home = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="ml-56 flex-1 min-h-screen">
        {/* Welcome / Hero */}
        <section className="px-10 pt-14 pb-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
              Welcome
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              The West Coast Swing Lifestyle Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Technical systems and travel hacks for the modern competitive dancer.
            </p>
          </motion.div>
        </section>

        {/* Split Hero Banner */}
        <section className="px-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-xl overflow-hidden grid grid-cols-2 min-h-[260px]"
          >
            {/* Left panel — Dancer */}
            <div className="relative bg-[#0a0718] flex flex-col justify-end p-8 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden opacity-50 group-hover:opacity-70 transition-opacity">
                <Equalizer compact />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-white">
                  Are you a dancer?
                </h2>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "WCS blog posts →", href: "https://boomtick.blog/blog?category=Lifestyle" },
                    { label: "Travel & Lifestyle →", href: "https://boomtick.blog/blog?category=Travel" },
                    { label: "Gear reviews →", href: "https://boomtick.blog/gear" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                      data-testid={`dancer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel — Roboticist */}
            <div className="relative bg-[#0c0a1e] flex flex-col justify-end p-8 group overflow-hidden border-l border-border">
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 via-secondary/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden opacity-50 group-hover:opacity-70 transition-opacity">
                <Equalizer compact reverse />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-white">
                  Hiring a roboticist?
                </h2>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Technical Portfolio →", href: "https://arii.github.io/" },
                    { label: "Tech blog posts →", href: "https://boomtick.blog/blog?category=Tech" },
                    { label: "Data & Development Lab →", href: "https://boomtick.blog/research" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent/80 font-semibold transition-colors"
                      data-testid={`roboticist-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Recent Blog Posts */}
        <section className="px-10 pb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">
                Latest Updates
              </p>
              <h2 className="text-2xl font-black">Recent Blog Posts</h2>
            </div>
            <a
              href="https://boomtick.blog/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-view-full-repository"
            >
              View full repository <ArrowRight size={13} />
            </a>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {blogPosts.map((post, i) => (
              <motion.a
                key={i}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 py-6 hover:bg-muted/20 -mx-4 px-4 rounded-lg transition-colors cursor-pointer"
                data-testid={`post-card-${i}`}
              >
                <div className="flex items-center gap-3 sm:w-44 shrink-0 pt-0.5">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded border ${tagColors[post.tag] ?? "text-muted-foreground border-border"}`}
                  >
                    {post.tag}
                  </span>
                  <time className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                    {post.date}
                  </time>
                </div>
                <div>
                  <h3 className="font-bold text-base group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Local Regular */}
        <section className="px-10 pb-16">
          <div className="border border-border rounded-xl p-6 bg-card max-w-sm">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
              Local Regular
            </p>
            <h3 className="font-black text-lg mb-1">Mission City Swing</h3>
            <p className="text-sm text-primary font-semibold">Every Wednesday</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
