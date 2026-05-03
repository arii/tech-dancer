import Sidebar from "@/components/Sidebar";
import { useMemo, useState } from "react";
import { useBlogPageData } from "@/hooks/use-page-data";

const Blog = () => {
  const { blogFilters, blogPosts, tagColors } = useBlogPageData();
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const visiblePosts = useMemo(
    () => (activeFilter === "All Posts" ? blogPosts : blogPosts.filter((post) => post.tag === activeFilter)),
    [activeFilter, blogPosts],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <section className="max-w-6xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">Insights</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Blog Posts</h1>
          <p className="text-sm md:text-base text-foreground/72 max-w-3xl mb-8">A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing.</p>
          <div className="flex flex-wrap gap-2 mb-8 rounded-xl border border-border bg-card/60 p-3">
            {blogFilters.map((item, i) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveFilter(item)}
                aria-pressed={activeFilter === item}
                className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${activeFilter === item ? "bg-secondary text-background border-secondary shadow-sm" : "bg-background/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground hover:bg-background/70"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visiblePosts.map((post) => (
              <article key={post.href} className="border border-border bg-card/80 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${tagColors[post.tag] ?? "text-muted-foreground border-border"}`}>{post.tag}</span>
                  <time className="text-[11px] font-mono text-foreground/65">{post.date}</time>
                </div>
                <h2 className="text-lg font-black leading-snug">{post.title}</h2>
                <p className="text-sm text-foreground/72 leading-6">{post.excerpt}</p>
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs font-bold uppercase tracking-[0.25em] text-secondary hover:text-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 rounded-sm">Read Article</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
