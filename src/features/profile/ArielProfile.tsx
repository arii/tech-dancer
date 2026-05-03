import { motion } from 'motion/react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Briefcase, Lightbulb, Instagram, Linkedin, Github, Globe, Star, Zap, Terminal, Globe2 } from 'lucide-react';

const CONNECT_ITEMS = [
  { label: 'Instagram', href: 'https://instagram.com/arii', icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arianders', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/arii', icon: Github },
  { label: 'Portfolio', href: 'https://arii.github.io', icon: Globe },
];

const SERVICE_CARDS = [
  {
    title: "Robotics & Engineering",
    text: "Building scalable, production-ready systems with focus on perception, motion planning, custom visualization, and AWS IoT telemetry.",
    icon: Terminal
  },
  {
    title: "AI Strategy",
    text: "Implementing generative AI to automate internal workflows, content management, and specialized systems like WebBluetooth fitness tracking.",
    icon: Zap
  },
  {
    title: "Digital Presence",
    text: "Handling the technical logistics for artists and niche brands — from functional websites and SEO to booking tools and merch infrastructure.",
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

                {/* The Vision */}
                <section>
                   <Box padding={{ base: 6, md: 10 }} radius="3xl" surface="muted" border className="border-primary/20 bg-primary/5 relative overflow-hidden">
                      <Box position="absolute" top={-12} right={-12} width={40} height={40} surface="primary" opacity={0.05} radius="full" className="blur-3xl" />
                      <Stack gap={8} position="relative" zIndex={10}>
                        <Stack gap={4}>
                          <Text as="h2" size="3xl" weight="font-black" className="text-white">The Vision</Text>
                          <Text className="text-lg leading-relaxed text-text-body/90">
                            <span className="text-primary font-bold">boomtick.blog</span> is where I share the systems behind a sustainable WCS lifestyle. 
                            From practical travel advice and gear selection to event analysis and performance optimization. 
                            It's about finding the small efficiencies that make a big difference over a lifetime of dancing.
                          </Text>
                        </Stack>
                        
                        <Box display="flex" gap={6} wrap className="pt-2">
                           <Box display="flex" align="center" gap={2}>
                              <Star size={14} className="text-primary fill-primary shrink-0" />
                              <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase tracking-widest whitespace-nowrap">DATA DRIVEN</Text>
                           </Box>
                           <Box display="flex" align="center" gap={2}>
                              <Star size={14} className="text-primary fill-primary shrink-0" />
                              <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase tracking-widest whitespace-nowrap">ARTISTICALLY CENTERED</Text>
                           </Box>
                           <Box display="flex" align="center" gap={2}>
                              <Star size={14} className="text-primary fill-primary shrink-0" />
                              <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase tracking-widest whitespace-nowrap">SYSTEMS FOCUSED</Text>
                           </Box>
                        </Box>
                      </Stack>
                   </Box>
                </section>
              </Stack>
            </Box>

            {/* Sidebar */}
            <Box as="aside" className="lg:col-span-4">
              <Stack gap={6} className="lg:sticky lg:top-8">
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50 shadow-xl">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>At a Glance</Text>
                  <Stack gap={6}>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Location</Text>
                       <Text as="div" weight="font-bold" className="text-white">San Francisco, CA</Text>
                    </Box>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Dance Focus</Text>
                       <Text as="div" weight="font-bold" className="text-white">West Coast Swing + Lindy Hop</Text>
                    </Box>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Dance Level</Text>
                       <Text as="div" weight="font-bold" className="text-white">Competitive Intermediate Follow</Text>
                    </Box>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Education</Text>
                       <Text as="div" weight="font-bold" className="text-white">PhD in Computer Science, MIT</Text>
                    </Box>
                  </Stack>
                </Box>

                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>Connect</Text>
                  <Stack gap={3}>
                    {CONNECT_ITEMS.map((item) => (
                      <Box 
                        key={item.label} 
                        as="a" 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        display="flex"
                        align="center"
                        justify="between"
                        padding={4}
                        radius="xl"
                        border
                        className="border-line/50 hover:bg-white/5 hover:border-primary/30 transition-all group"
                      >
                        <Box display="flex" align="center" gap={3}>
                           <item.icon size={18} className="text-text-dim group-hover:text-primary transition-colors" />
                           <Text weight="font-bold" className="text-white group-hover:text-white">{item.label}</Text>
                        </Box>
                        <Box className="w-2 h-2 rounded-full bg-line group-hover:bg-primary transition-colors" />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Photo Gallery */}
          <Box paddingTop={12} border="t" className="border-line/30">
            <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest" marginBottom={6}>Photo Gallery // Moments</Text>
            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                   className="aspect-[4/5] border-line/30 group"
                 >
                   <img 
                     src={photo.url} 
                     alt={photo.alt} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                 </Box>
               ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
