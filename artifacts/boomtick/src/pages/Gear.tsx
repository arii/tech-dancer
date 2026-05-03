import Sidebar from "@/components/Sidebar";
import { useGearPageData } from "@/hooks/use-page-data";

const Gear = () => {
  const { gearItems, tagColors } = useGearPageData();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <section className="max-w-6xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">The Toolbox</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Gear Reviews</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mb-8">Rigorous testing and honest takes on the gear that keeps you moving.</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gearItems.map((item) => (
              <article key={item.href} className="border border-border bg-card rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]"><span className={`inline-flex rounded border px-2 py-1 ${tagColors[item.tag] ?? "text-muted-foreground border-border"}`}>{item.tag}</span><span>{item.label}</span></div>
                <h2 className="text-lg font-bold leading-snug">{item.title}</h2>
                <p className="text-sm text-muted-foreground leading-6">{item.description}</p>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.rating}</div>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs font-bold uppercase tracking-[0.25em] text-primary">Read Review</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gear;
