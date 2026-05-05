import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { aboutConnectItems, aboutPillars, aboutServiceCards, photos } from "@/lib/content/about";
import { siteName } from "@/lib/seo";

const About = () => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `About Ariel Anders | ${siteName}`;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute("content", "About Ariel Anders, MIT roboticist, West Coast Swing creator, and consultant behind boomtick.blog.");
    }
  }, []); // Add an empty dependency array to run this effect only once when the component mounts

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-6 md:py-14">
        <section className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 text-xs font-bold tracking-widest uppercase text-foreground/65">Biography</p>
            <h1 className="mb-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">Ariel Anders, PhD</h1>
            <p className="mb-10 border-b border-border pb-6 text-sm leading-7 text-foreground/72">MIT roboticist, creator of arii.github.io, and West Coast Swing writer</p>
          </motion.div>
          <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="max-w-3xl space-y-10">
              <section><h2 className="mb-4 text-2xl font-black">My Dance Background</h2><p className="text-sm leading-7 text-foreground/72">I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into dancing at Lindy in the Park. A Mission City Swing series introduced me to West Coast Swing, and it clicked quickly — the music, the connection, and the creative feel of the dance made it easy to care deeply about. WCS became my main focus because it combines artistry, athleticism, and a genuinely welcoming community.</p></section>
              <section><h2 className="mb-4 text-2xl font-black">Work With Me</h2><p className="mb-5 text-sm leading-7 text-foreground/72">I provide consulting and project-based digital execution for startups, artists, and niche brands. If you need someone who can move from strategy to delivery quickly, I’d love to talk.</p><div className="space-y-4">{aboutServiceCards.map((card) => (<div key={card.title} className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><div className="mb-2 flex items-center gap-2"><card.icon size={16} className="text-primary" /><h3 className="text-sm font-bold">{card.title}</h3></div><p className="text-sm leading-7 text-foreground/72">{card.text}</p></div>))}</div></section>
              <section><h2 className="mb-4 text-2xl font-black">Why I Built This Site</h2><p className="text-sm leading-7 text-foreground/72">boomtick.blog is where I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that actually helps, event tips, and the small optimizations that make a big difference over a season of dancing. It also serves as a clear portfolio for consulting and project-based work.</p></section>
              <section><h2 className="mb-4 text-2xl font-black">What I Love About WCS</h2><div className="grid gap-4 sm:grid-cols-3">{aboutPillars.map((item) => (<div key={item.title} className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><item.icon size={18} className="mb-3 text-primary" /><h3 className="mb-2 text-sm font-bold">{item.title}</h3><p className="text-sm leading-7 text-foreground/72">{item.text}</p></div>))}</div></section>
              <section><h2 className="mb-4 text-2xl font-black">Why Clients Hire Me</h2><p className="text-sm leading-7 text-foreground/72">I bring a mix of product thinking, technical execution, and clear communication. That means fewer handoffs, faster shipping, and work that stays aligned with the goal from start to finish.</p></section>
              <section className="grid gap-4 pt-2 sm:grid-cols-3"><div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><p className="mb-2 text-xs uppercase tracking-widest text-foreground/65">Education</p><p className="text-sm font-semibold">PhD in Computer Science, MIT</p></div><div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><p className="mb-2 text-xs uppercase tracking-widest text-foreground/65">Focus</p><p className="text-sm font-semibold">Robotics // AI // Data Analytics</p></div><div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><p className="mb-2 text-xs uppercase tracking-widest text-foreground/65">Dance Level</p><p className="text-sm font-semibold">Competitive Intermediate Follow</p></div></section>
            </div>
            <aside className="space-y-6 lg:sticky lg:top-8"><div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm"><p className="mb-3 text-xs font-bold tracking-widest uppercase text-foreground/65">At a glance</p><div className="space-y-3 text-sm leading-7"><div className="text-foreground/72">San Francisco, CA</div><div className="text-foreground/72">West Coast Swing + Lindy Hop</div><div className="text-foreground/72">Consulting + project-based work</div></div></div><div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm"><p className="mb-4 text-xs font-bold tracking-widest uppercase text-foreground/65">Connect & Networking</p><div className="flex flex-wrap gap-3">{aboutConnectItems.map((item) => (<a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" data-testid={`link-${item.label.toLowerCase()}`}><item.icon size={14} className="text-primary" />{item.label}</a>))}</div></div></aside>
          </div>
          <section className="mt-16"><div className="mb-5 flex items-end justify-between"><div><p className="mb-1 text-xs font-bold tracking-widest uppercase text-foreground/65">Photo Gallery</p><h2 className="text-2xl font-black">WCS Moments</h2></div></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">{photos.map((photo, i) => (<div key={i} className="aspect-[4/5] overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm"><img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" /></div>))}</div></section>
        </section>
      </main>
    </div>
  );
};

export default About;