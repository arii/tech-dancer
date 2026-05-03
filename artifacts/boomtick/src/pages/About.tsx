import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Globe } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const About = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="ml-56 flex-1 min-h-screen px-10 py-14">
        <section className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Biography</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">Ariel Anders, PhD</h1>
            <p className="text-sm text-muted-foreground border-b border-border pb-6 mb-10">
              MIT Roboticist // WCS Tech-Dancer
            </p>
          </motion.div>

          <div className="space-y-14 max-w-3xl">
            <section>
              <h2 className="text-2xl font-black mb-4">My Dance Background</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022,
                I moved to San Francisco and resumed partner dancing at Lindy in the Park. Seeking a new challenge,
                I signed up for a series at Mission City Swing and discovered West Coast Swing. The music and style
                resonated with me. I started dancing both WCS and Lindy Hop, and attending WCS events helped me
                travel again after the pandemic. WCS gradually became my primary focus, though I still love Lindy and
                live swing music in SF. I’m a competitive intermediate-level follow who cares about weight transfer,
                clean lines, and timing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Why My PhD Matters</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                I believe in building things that work. Since 2010, I’ve dedicated myself to creating robotic systems
                that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don’t
                just study data — I engineer real-world systems that deliver results. I consider myself a pragmatic
                roboticist: I use machine learning, traditional AI, and solid software design to build systems that are
                functional, robust, and ready to complete the task at hand.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Why I Built This Site</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                People often ask me, “Where did you get that outfit?” and “How can you afford to travel to so many
                events?” I’m fortunate to have a strong career, but I’ve always focused on making my lifestyle as
                financially efficient as possible. This site is how I share the stacks I’ve built — everything from
                tested gear reviews to travel-hacking systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Financial Strategies for WCS</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                I love maximizing credit card perks and hotel benefits, which helps me make the WCS events lifestyle
                both high-end and entirely feasible. I’m known for bright, fun outfits and an optimized travel
                philosophy.
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="border border-border rounded-xl p-5 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Education</p>
                <p className="text-sm font-semibold">PhD in Computer Science, MIT</p>
              </div>
              <div className="border border-border rounded-xl p-5 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Focus</p>
                <p className="text-sm font-semibold">Robotics // AI // Data Analytics</p>
              </div>
              <div className="border border-border rounded-xl p-5 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Dance Level</p>
                <p className="text-sm font-semibold">Competitive Intermediate Follow</p>
              </div>
            </section>

            <section className="pt-2">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Connect & Networking</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Instagram", icon: Instagram, href: "https://instagram.com/" },
                  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/arianders" },
                  { label: "GitHub", icon: Github, href: "https://github.com/arii" },
                  { label: "Portfolio", icon: Globe, href: "https://arii.github.io/" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <item.icon size={14} className="text-primary" />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
