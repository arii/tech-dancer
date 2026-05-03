import { useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import { researchTools } from "@/lib/content/research";
import { siteName } from "@/lib/seo";

const Research = () => {
  useEffect(() => {
    if (typeof document !== "undefined") {
    document.title = `WCS Data & Development Lab | ${siteName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "Interactive data science, software development, and WCS research tools from boomtick.blog.");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-6 md:py-14">
        <section className="max-w-6xl">
          <p className="mb-4 text-xs font-bold tracking-[0.35em] uppercase text-foreground/65">Technical Portfolio</p>
          <h1 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">Data & Development Lab</h1>
          <p className="mb-8 max-w-3xl text-sm leading-7 text-foreground/72 sm:text-base">Interactive data science, software development, and specialized tools for West Coast Swing research and analysis.</p>
          <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {researchTools.map((tool) => (
              <article key={tool.title} className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-colors hover:border-primary/30">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/65">{tool.status}</p>
                <h2 className="mb-2 text-lg font-bold">{tool.title}</h2>
                <p className="text-sm leading-7 text-foreground/72">{tool.description}</p>
              </article>
            ))}
          </div>
          <section className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-6 text-center shadow-sm sm:p-8">
            <h2 className="mb-2 text-2xl font-black">ETL Pipeline Synchronizing...</h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-foreground/72">The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.</p>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Research;
