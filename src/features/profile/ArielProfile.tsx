import { motion } from 'motion/react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Star, Zap, Terminal, Globe2, Globe } from 'lucide-react';

const CONNECT_ITEMS = [
  { label: 'Instagram', href: 'https://instagram.com/arii' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arianders' },
  { label: 'GitHub', href: 'https://github.com/arii' },
  { label: 'Portfolio', href: 'https://arii.github.io' },
];

const SERVICE_CARDS = [
  {
    title: "Robotics & Engineering",
    text: "My background is in robot software engineering and architecture, helping startups build scalable, production-ready systems. My specialized skillsets include perception, motion planning, custom visualization tools, AWS IoT telemetry, and robust CI/CD and DevOps pipelines to keep autonomous fleets reliable and mission-ready.",
    icon: Terminal
  },
  {
    title: "AI Strategy",
    text: "I implement generative AI tools to automate internal workflows and content management. Products built with these tools include boomtick.blog and a heartrate-monitoring WebBluetooth fitness system.",
    icon: Zap
  },
  {
    title: "Digital Presence & Management",
    text: "I help artists and niche brands build the infrastructure they need to grow — from functional websites and merch stores to SEO, booking tools, and content workflows. I handle the technical logistics from start to finish so you can stay focused on your craft.",
    icon: Globe2
  }
];

const PHOTOS = [
  { url: '/attached_assets/first_comp_1777789859021.jpg', alt: 'WCS Competition' },
  { url: '/attached_assets/monterey_1777789859029.jpg', alt: 'Monterey Coast' },
  { url: '/attached_assets/mad_jam_ari_1777789859029.jpg', alt: 'Dancing at MadJam' },
  { url: '/attached_assets/glow_bunny_1777789859030.jpg', alt: 'Glow Bunny Costume' },
  { url: '/attached_assets/www_ari_1777789859030.jpg', alt: 'WCS Connection' },
  { url: '/attached_assets/roboticist_1777789859029.jpg', alt: 'Portrait' },
];

export default function ArielProfile() {
  return (
    <Box as="section" height="full" paddingBottom={20}>
      <SEO
        title="About Ariel Anders"
        description="MIT roboticist, West Coast Swing creator, and consultant behind boomtick.blog."
      />
      
      <Box maxWidth="6xl" marginX="auto" paddingX={{ base: 4, md: 8 }}>
        <Stack gap={12}>
          <PageHeader
            label="BIOGRAPHY"
            title="About Ariel Anders"
            description="MIT roboticist, PhD in Computer Science, and creator of boomtick.blog. I provide high-level technical consulting for startups and project-based digital execution for niche brands."
          />

          <Grid gap={12} cols={{ base: 1, lg: 12 }}>
            <Box className="lg:col-span-8">
              <Stack gap={12}>
                {/* Professional Services */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">What I Do Professionally</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90" marginBottom={4}>I provide high-level technical consulting for startups and project-based digital execution for niche brands.</Text>
                  <Grid cols={{ base: 1, md: 1 }} gap={4}>
                    {SERVICE_CARDS.map((card) => (
                      <Box key={card.title} padding={6} border radius="2xl" surface="surface" className="border-line/40 hover:border-primary/40 transition-colors group">
                        <Stack direction={{ base: 'col', sm: 'row' }} gap={6} align={{ sm: 'center' }}>
                          <Box 
                            display="flex" 
                            align="center" 
                            justify="center" 
                            width={12} 
                            height={12} 
                            radius="xl" 
                            className="bg-primary/10 border border-primary/20 shrink-0"
                          >
                            <card.icon size={24} className="text-primary" />
                          </Box>
                          <Stack gap={1}>
                            <Text weight="font-black" size="lg" className="text-white">{card.title}</Text>
                            <Text className="leading-relaxed text-text-body/80">{card.text}</Text>
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                  </Grid>
                </section>

                {/* Dance Background */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">My Dance Background</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90">
                    I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and rediscovered the floor at Lindy in the Park. 
                    A Mission City Swing series introduced me to West Coast Swing, and it clicked immediately — the music, the connection, and the creative feel of the dance made it easy to care deeply about. 
                    WCS became my main focus because it combines artistry, athleticism, and a genuinely welcoming community.
                  </Text>
                </section>

                {/* Why I Built This Site */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">Why I Built This Site</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90">
                    <span className="text-primary font-bold">boomtick.blog</span> is where I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that actually helps, event tips, and the small optimizations that make a big difference over a season of dancing.
                  </Text>
                </section>

                {/* What I Love About WCS */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">What I Love About WCS</Text>
                  <Grid cols={{ base: 1, sm: 3 }} gap={4}>
                    <Box padding={4} border radius="2xl" surface="surface" className="border-line/40">
                      <Stack gap={2}>
                        <Star size={24} className="text-primary" />
                        <Text as="h3" size="lg" weight="font-bold" className="text-white">Style</Text>
                        <Text className="text-text-body/80">Bright outfits, clean lines, and personal expression.</Text>
                      </Stack>
                    </Box>
                    <Box padding={4} border radius="2xl" surface="surface" className="border-line/40">
                      <Stack gap={2}>
                        <Zap size={24} className="text-primary" /> {/* Using Zap for Timing for now */}
                        <Text as="h3" size="lg" weight="font-bold" className="text-white">Timing</Text>
                        <Text className="text-text-body/80">Musicality and precision matter just as much as flash.</Text>
                      </Stack>
                    </Box>
                    <Box padding={4} border radius="2xl" surface="surface" className="border-line/40">
                      <Stack gap={2}>
                        <Globe size={24} className="text-primary" /> {/* Using Globe for Travel for now */}
                        <Text as="h3" size="lg" weight="font-bold" className="text-white">Travel</Text>
                        <Text className="text-text-body/80">Every weekend is a chance to see new floors, new people, and new ideas.</Text>
                      </Stack>
                    </Box>
                  </Grid>
                </section>

                {/* Financial Strategies for WCS */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">Financial Strategies for WCS</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90">
                    I love maximizing credit card perks and hotel benefits, which helps me make the WCS event lifestyle both high-end and feasible. The goal is to spend more energy dancing and less energy stressing over the logistics.
                  </Text>
                </section>
              </Stack>
            </Box>

            {/* Sidebar */}
            <Box as="aside" className="lg:col-span-4">
              <Stack gap={6} className="lg:sticky lg:top-8">
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50 shadow-xl">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>At a Glance</Text>
                  <Text className="text-text-body/80 leading-relaxed">
                    San Francisco, CA<br/>West Coast Swing + Lindy Hop<br/>Competitive Intermediate Follow
                  </Text>
                </Box>

                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>Connect & Networking</Text>
                  <Box display="flex" wrap gap={2}>
                    {CONNECT_ITEMS.map((item) => (
                      <Box 
                        key={item.label} 
                        as="a" 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        display="inline-flex" align="center" gap={2} paddingX={4} paddingY={2}
                        className="rounded-full border border-line text-sm font-semibold text-text-body transition-colors hover:border-primary/40 hover:text-white"
                      >
                        {item.label}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Photo Gallery */}
          <Box paddingTop={12} border="t" className="border-line/30">
            <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest" marginBottom={6}>Photo Gallery</Text>
            <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">WCS Moments</Text>
            <Grid cols={{ base: 2, md: 3, lg: 6 }} gap={4}>
               {PHOTOS.map((photo, i) => (
                 <Box 
                   key={photo.url}
                   as={motion.div}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                   radius="xl"
                   overflow="hidden"
                   border
                   aspect="4/5"
                   className="border-line/30 group"
                 >
                   <img 
                     src={photo.url} 
                     alt={photo.alt} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                 </Box>
               ))}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
