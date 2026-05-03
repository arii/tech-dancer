import Sidebar from "@/components/Sidebar";
import { useContactPageData } from "@/hooks/use-page-data";
import { siteName } from "@/lib/seo";

const Contact = () => {
  const { contactInquiries } = useContactPageData();

  if (typeof document !== "undefined") {
    document.title = `Contact boomtick.blog | ${siteName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "Get in touch about West Coast Swing, travel, gear, or the site itself.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <a href="#contact-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60">
          Skip to content
        </a>
        <section id="contact-content" className="max-w-5xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-sm md:text-base text-foreground/72 max-w-3xl mb-8">Have a question about West Coast Swing, travel, gear, or the site itself? I’d love to hear from you.</p>
          <div className="border border-border bg-card rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-2xl font-black">Inquiries</h2>
              <p className="text-sm text-foreground/72 max-w-2xl">I’m open to new ideas, questions about reviews, or a good dance-scene conversation.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3 mb-8">
              {contactInquiries.map((item) => (
                <div key={item.title} className="border border-border rounded-lg p-4 bg-background/60">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/70">{item.subtitle}</div>
                  <div className="text-sm font-bold mt-2">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="sr-only" htmlFor="contact-name">Your Name</label>
              <input id="contact-name" className="border border-border bg-background px-4 py-3 rounded-lg outline-none transition-colors focus:border-primary text-foreground placeholder:text-foreground/45" placeholder="Your Name" />
              <label className="sr-only" htmlFor="contact-email">Your Email</label>
              <input id="contact-email" className="border border-border bg-background px-4 py-3 rounded-lg outline-none transition-colors focus:border-primary text-foreground placeholder:text-foreground/45" placeholder="Your Email" />
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" className="w-full border border-border bg-background px-4 py-3 rounded-lg outline-none transition-colors focus:border-primary text-foreground placeholder:text-foreground/45" placeholder="Subject" />
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" className="w-full min-h-40 border border-border bg-background px-4 py-3 rounded-lg outline-none transition-colors focus:border-primary text-foreground placeholder:text-foreground/45" placeholder="Message" />
            </div>
            <button className="mt-4 bg-secondary text-background px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Send Message</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;