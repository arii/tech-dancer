import Sidebar from "@/components/Sidebar";

const inquiries = [
  { title: "Data Inquiry", subtitle: "Dance Stats" },
  { title: "Gear Review", subtitle: "Product Feedback" },
  { title: "General", subtitle: "Discussion" },
];

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-56 px-4 sm:px-6 md:px-10 py-8 md:py-14">
        <section className="max-w-5xl">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-muted-foreground mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mb-8">Have a burning analytical question regarding WCS? Want a lifestyle post about financial literacy or building community? Or just have feedback on a gear review? I’d love to hear from you.</p>
          <div className="border border-border bg-card rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-black mb-2">Inquiries</h2>
            <p className="text-sm text-muted-foreground mb-8">I’m always open to new ideas, questions about my reviews, or just chat about the dance scene.</p>
            <div className="grid gap-3 md:grid-cols-3 mb-8">
              {inquiries.map((item) => (
                <div key={item.title} className="border border-border rounded-lg p-4 bg-background/60">
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{item.subtitle}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="border border-border bg-background px-4 py-3 rounded-lg" placeholder="Your Name" />
              <input className="border border-border bg-background px-4 py-3 rounded-lg" placeholder="Your Email" />
            </div>
            <div className="mt-4">
              <input className="w-full border border-border bg-background px-4 py-3 rounded-lg" placeholder="Subject" />
            </div>
            <div className="mt-4">
              <textarea className="w-full min-h-40 border border-border bg-background px-4 py-3 rounded-lg" placeholder="Message" />
            </div>
            <button className="mt-4 bg-slate-900 text-white px-5 py-3 rounded-lg font-semibold">Send Message</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
