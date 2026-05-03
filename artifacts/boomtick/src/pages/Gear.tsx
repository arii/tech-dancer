import Sidebar from "@/components/Sidebar";
import { useGearPageData } from "@/hooks/use-page-data";

const Gear = () => {
  const { gearItems, tagColors } = useGearPageData();

  if (typeof document !== "undefined") {
    document.title = "Gear Reviews | boomtick.blog";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "West Coast Swing gear reviews, travel essentials, and practical picks for dancers who want reliable equipment.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <section className="max-w-6xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">The Toolbox</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Gear Reviews</h1>
          <p className="text-sm md:text-base text-foreground/72 max-w-3xl mb-8">Rigorous testing and honest takes on the gear that keeps you moving.</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gearItems.map((item) => (
              <article key={item.href} className="border border-border bg-card rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${tagColors[item.tag] ?? "text-muted-foreground border-border"}`}>{item.tag}</span>
                  <div className="text-right">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/70">{item.label}</div>
                    <div className="text-xs font-mono text-foreground/65 mt-1">{item.rating}/5</div>
                  </div>
                </div>
                <h2 className="text-lg font-black leading-snug">{item.title}</h2>
                <p className="text-sm text-foreground/72 leading-6">{item.description}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs font-bold uppercase tracking-[0.25em] text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm">Read Review</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gear;
