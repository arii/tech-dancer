import Sidebar from "@/components/Sidebar";
import { blogPosts, tagColors } from "@/content/siteContent";

const Blog = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <section className="max-w-6xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">Insights</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Blog Posts</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mb-8">A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing.</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["All Posts", "Tech", "Travel", "Dance Research", "Travel/Lifestyle", "Gear Reviews", "Data & Dev Lab"].map((item, i) => (
              <button key={item} className={`border px-3 py-2 text-xs font-semibold ${i === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"}`}>{item}</button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {blogPosts.map((post) => (
              <article key={post.href} className="border border-border bg-card rounded-xl p-4 flex flex-col gap-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  <span className={`inline-flex rounded border px-2 py-1 ${tagColors[post.tag] ?? "text-muted-foreground border-border"}`}>{post.tag}</span>
                </div>
                <h2 className="text-lg font-bold leading-snug">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-6">{post.excerpt}</p>
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs font-bold uppercase tracking-[0.25em] text-primary">Read Article</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
