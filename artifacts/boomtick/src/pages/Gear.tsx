import Sidebar from "@/components/Sidebar";
import { gearItems, tagColors } from "@/lib/content/gear";
import { siteName } from "@/lib/seo";

const Gear = () => {
  if (typeof document !== "undefined") {
    document.title = `West Coast Swing Gear Reviews | ${siteName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "West Coast Swing gear reviews, travel essentials, and practical picks for dancers.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-6 md:py-14">
        <section className="max-w-6xl">
          <p className="mb-4 text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground">The Toolbox</p>
          <h1 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">Gear Reviews</h1>
          <p className="mb-8 max-w-3xl text-sm text-foreground/72 sm:text-base">Honest reviews of the gear, travel essentials, and accessories that keep WCS dancers moving.</p>
          <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-border bg-card/60 p-3">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Best for travel</span>
            <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Highly recommended</span>
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Competition ready</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {gearItems.map((item) => (
              <article key={item.href} className="flex min-h-[280px] flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/30">
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${tagColors[item.tag] ?? "text-muted-foreground border-border"}`}>{item.tag}</span>
                  <div className="text-right">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80">{item.label}</div>
                    <div className="mt-1 font-mono text-xs text-foreground/75">{item.rating}/5</div>
                  </div>
                </div>
                <h2 className="text-lg font-black leading-snug">{item.title}</h2>
                <p className="text-sm leading-6 text-foreground/80">{item.description}</p>
                <a href={item.href} className="mt-auto rounded-sm text-xs font-bold uppercase tracking-[0.25em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" aria-label={`Read review ${item.title}`}>Read Review</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gear;
