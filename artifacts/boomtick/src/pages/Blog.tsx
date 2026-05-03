import Sidebar from "@/components/Sidebar";
import { useMemo, useState } from "react";
import { blogFilters, blogPosts, tagColors } from "@/lib/content/blog";
import { siteName } from "@/lib/seo";

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const visiblePosts = useMemo(
    () => (activeFilter === "All Posts" ? blogPosts : blogPosts.filter((post) => post.tag === activeFilter)),
    [activeFilter, blogPosts],
  );

  if (typeof document !== "undefined") {
    document.title = `${siteName} | West Coast Swing Blog Posts`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "Browse West Coast Swing blog posts on training, travel, gear reviews, and dance research.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-6 md:py-14">
        <section className="max-w-6xl">
          <p className="mb-4 text-xs font-bold tracking-[0.35em] uppercase text-foreground/65">Insights</p>
          <h1 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">Blog Posts</h1>
          <p className="mb-8 max-w-3xl text-sm leading-7 text-foreground/72 sm:text-base">A searchable collection of West Coast Swing posts covering travel, lifestyle, gear reviews, and dance research.</p>
          <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-border/80 bg-card/70 p-3 shadow-sm">
            {blogFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveFilter(item)}
                aria-pressed={activeFilter === item}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${activeFilter === item ? "border-secondary bg-secondary text-background shadow-sm" : "border-border bg-background/40 text-foreground/70 hover:border-primary/40 hover:bg-background/70 hover:text-foreground"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post) => (
              <article key={post.href} className="flex min-h-[260px] flex-col gap-4 rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-colors hover:border-primary/30">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${tagColors[post.tag] ?? "text-foreground/70 border-border"}`}>{post.tag}</span>
                  <time className="text-[11px] font-mono text-foreground/70">{post.date}</time>
                </div>
                <h2 className="text-lg font-black leading-snug">{post.title}</h2>
                <p className="text-sm leading-7 text-foreground/72">{post.excerpt}</p>
                <a href={post.href} className="mt-auto rounded-sm text-xs font-bold uppercase tracking-[0.25em] text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60" aria-label={`Read article ${post.title}`}>Read Article</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
