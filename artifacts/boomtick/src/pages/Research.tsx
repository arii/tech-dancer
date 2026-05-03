import Sidebar from "@/components/Sidebar";

const tools = [
  { status: "Coming Soon", title: "WCS Prelim Scoring Scraper", description: "A sophisticated scraper for extracting and analyzing preliminary scoring data from WCS competitions." },
  { status: "Active", title: "Blog Post Drafter", description: "Drafter tool to generate blog posts using AI with human feedback in the loop." },
  { status: "Active", title: "Visual UX Auditor", description: "Automated visual regression and UX improvement suggestions across viewports." },
];

const Research = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <section className="max-w-6xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">Technical Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Data & Development Lab</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mb-8">Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle.</p>
          <div className="grid gap-4 md:grid-cols-3 mb-10">
            {tools.map((tool) => (
              <article key={tool.title} className="border border-border bg-card rounded-xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">{tool.status}</p>
                <h2 className="text-lg font-bold mb-2">{tool.title}</h2>
                <p className="text-sm text-muted-foreground leading-6">{tool.description}</p>
              </article>
            ))}
          </div>
          <section className="border border-dashed border-border rounded-xl p-8 bg-muted/20 text-center">
            <h2 className="text-2xl font-black mb-2">ETL Pipeline Synchronizing...</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">The WCS Competition Data Scraper is currently ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.</p>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Research;
