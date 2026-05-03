import Sidebar from "@/components/Sidebar";
import { useContactPageData } from "@/hooks/use-page-data";
import { siteName } from "@/lib/seo";

const Contact = () => {
  const { contactInquiries } = useContactPageData();

  if (typeof document !== "undefined") {
    document.title = `Contact boomtick.blog | ${siteName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "Get in touch about West Coast Swing, consulting, project-based work, travel, gear, or the site itself.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-6 md:py-14">
        <a href="#contact-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60">
          Skip to content
        </a>
        <section id="contact-content" className="max-w-5xl">
          <p className="mb-4 text-xs font-bold tracking-[0.35em] uppercase text-foreground/65">Contact</p>
          <h1 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">Get in Touch</h1>
          <p className="mb-8 max-w-3xl text-sm leading-7 text-foreground/72 sm:text-base">Have a question about West Coast Swing, consulting, project work, travel, gear, or the site itself? I’d love to hear from you.</p>
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-2">
              <h2 className="text-2xl font-black">Inquiries</h2>
              <p className="max-w-2xl text-sm leading-7 text-foreground/72">I’m open to new ideas, questions about reviews, or a good dance-scene conversation.</p>
            </div>
            <div className="mb-8 grid gap-3 md:grid-cols-3">
              {contactInquiries.map((item) => (
                <div key={item.title} className="rounded-lg border border-border/80 bg-background/60 p-4 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/65">{item.subtitle}</div>
                  <div className="mt-2 text-sm font-bold">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="sr-only" htmlFor="contact-name">Your Name</label>
              <input id="contact-name" className="min-h-11 rounded-lg border border-border/80 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/45 focus:border-primary" placeholder="Your Name" />
              <label className="sr-only" htmlFor="contact-email">Your Email</label>
              <input id="contact-email" className="min-h-11 rounded-lg border border-border/80 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/45 focus:border-primary" placeholder="Your Email" />
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" className="min-h-11 w-full rounded-lg border border-border/80 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/45 focus:border-primary" placeholder="Subject" />
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" className="min-h-44 w-full rounded-lg border border-border/80 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/45 focus:border-primary" placeholder="Message" />
            </div>
            <button className="mt-4 min-h-11 rounded-lg bg-secondary px-5 py-3 font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Send Message</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
