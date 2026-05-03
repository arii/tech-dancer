import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Globe, MapPin, Sparkles, Clock3, Bot, Code2, Megaphone } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import firstComp from "@assets/first_comp_1777789859021.jpg";
import roboticist from "@assets/roboticist_1777789859029.jpg";
import monterey from "@assets/monterey_1777789859029.jpg";
import madJam from "@assets/mad_jam_ari_1777789859029.jpg";
import glowBunny from "@assets/glow_bunny_1777789859030.jpg";
import wwwAri from "@assets/www_ari_1777789859030.jpg";

const photos = [
  { src: firstComp, alt: "West Coast Swing competition moment" },
  { src: monterey, alt: "West Coast Swing stage pose" },
  { src: madJam, alt: "West Coast Swing social dance" },
  { src: glowBunny, alt: "Glow bunny dance costume" },
  { src: wwwAri, alt: "West Coast Swing floor connection" },
  { src: roboticist, alt: "Portrait photo" },
];

const About = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="ml-56 flex-1 min-h-screen px-10 py-14">
        <section className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Biography</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">Ariel Anders, PhD</h1>
            <p className="text-sm text-muted-foreground border-b border-border pb-6 mb-10">
              MIT Roboticist // WCS Tech-Dancer
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-10 items-start">
            <div className="space-y-10 max-w-3xl">
              <section>
                <h2 className="text-2xl font-black mb-4">My Dance Background</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022,
                  I moved to San Francisco and got back into dancing at Lindy in the Park. A Mission City Swing series
                  introduced me to West Coast Swing, and it clicked quickly — the music, the connection, and the
                  creative feel of the dance made it easy to care deeply about. WCS became my main focus because it
                  combines artistry, athleticism, and a genuinely welcoming community.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4">What I Do Professionally</h2>
                <p className="text-sm leading-7 text-muted-foreground mb-4">
                  I provide high-level technical consulting for startups and project-based digital execution for niche
                  brands.
                </p>

                <div className="space-y-4">
                  <div className="border border-border rounded-xl p-5 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 size={16} className="text-primary" />
                      <h3 className="font-bold text-sm">Robotics & Engineering</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-6">
                      My background is in robot software engineering and architecture, helping startups build
                      scalable, production-ready systems. My specialized skillsets include perception, motion planning,
                      custom visualization tools, AWS IoT telemetry, and robust CI/CD and DevOps pipelines to keep
                      autonomous fleets reliable and mission-ready.
                    </p>
                  </div>

                  <div className="border border-border rounded-xl p-5 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={16} className="text-primary" />
                      <h3 className="font-bold text-sm">AI Strategy (DevAI)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-6">
                      I implement generative AI tools to automate internal developer tasks and content management.
                      Products built with these DevAI tools include boomtick.blog and a heartrate-monitoring
                      WebBluetooth fitness system. The underlying agentic workflows and internal tools are visible on my
                      GitHub at github.com/arii.
                    </p>
                  </div>

                  <div className="border border-border rounded-xl p-5 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Megaphone size={16} className="text-primary" />
                      <h3 className="font-bold text-sm">Digital Presence & Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-6">
                      I help artists and niche brands build the infrastructure they need to grow — from functional
                      websites and merch stores to SEO, booking tools, and content workflows. I handle the technical
                      logistics from start to finish so you can stay focused on your craft.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4">Why I Built This Site</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  boomtick.blog is where I share the systems behind a sustainable WCS lifestyle: practical travel
                  advice, gear that actually helps, event tips, and the small optimizations that make a big difference
                  over a season of dancing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4">What I Love About WCS</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Sparkles, title: "Style", text: "Bright outfits, clean lines, and personal expression." },
                    { icon: Clock3, title: "Timing", text: "Musicality and precision matter just as much as flash." },
                    { icon: MapPin, title: "Travel", text: "Every weekend is a chance to see new floors, new people, and new ideas." },
                  ].map((item) => (
                    <div key={item.title} className="border border-border rounded-xl p-5 bg-card">
                      <item.icon size={18} className="text-primary mb-3" />
                      <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-6">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black mb-4">Financial Strategies for WCS</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  I love maximizing credit card perks and hotel benefits, which helps me make the WCS event lifestyle
                  both high-end and feasible. The goal is to spend more energy dancing and less energy stressing over
                  the logistics.
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
            </div>

            <aside className="space-y-6 lg:sticky lg:top-8">
              <div className="border border-border rounded-xl p-6 bg-card">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">At a glance</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={14} className="text-primary" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles size={14} className="text-primary" />
                    West Coast Swing + Lindy Hop
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 size={14} className="text-primary" />
                    Competitive Intermediate Follow
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-xl p-6 bg-card">
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
              </div>
            </aside>
          </div>

          <section className="mt-14">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Photo Gallery</p>
                <h2 className="text-2xl font-black">WCS Moments</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border bg-card aspect-[4/5]">
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default About;
