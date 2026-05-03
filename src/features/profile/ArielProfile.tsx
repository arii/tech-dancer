import { motion } from 'motion/react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { Briefcase, Heart, Lightbulb, Instagram, Linkedin, Github, Globe, Star } from 'lucide-react';

const CONNECT_ITEMS = [
  { label: 'Instagram', href: 'https://instagram.com/arii', icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arianders', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/arii', icon: Github },
  { label: 'Portfolio', href: 'https://arii.github.io', icon: Globe },
];

const SERVICE_CARDS = [
  {
    title: "Digital Execution",
    text: "I build high-performance web applications and automated systems that move fast without breaking.",
    icon: Briefcase
  },
  {
    title: "Strategic Consulting",
    text: "Helping early-stage startups and niche brands align their technical stack with their business goals.",
    icon: Lightbulb
  }
];

const PILLARS = [
  { title: "Connection", text: "The nuanced communication between partners that makes WCS unique.", icon: Heart },
  { title: "Creativity", text: "Freedom to interpret any music from blues to modern pop.", icon: Lightbulb },
  { title: "Community", text: "A global network of dancers who support and challenge each other.", icon: Briefcase }
];

const PHOTOS = [
  { url: '/attached_assets/www_ari_1777789859030.jpg', alt: 'Ariel Anders - Creative Portrait', span: 'col-span-2 row-span-2' },
  { url: '/attached_assets/mad_jam_ari_1777789859029.jpg', alt: 'Dancing at MadJam', span: 'col-span-1 row-span-1' },
  { url: '/attached_assets/first_comp_1777789859021.jpg', alt: 'First Competition', span: 'col-span-1 row-span-1' },
  { url: '/attached_assets/glow_bunny_1777789859030.jpg', alt: 'Glow Bunny Costume', span: 'col-span-1 row-span-1' },
  { url: '/attached_assets/monterey_1777789859029.jpg', alt: 'Monterey Coast', span: 'col-span-1 row-span-1' },
];

export default function ArielProfile() {
  return (
    <Box as="section" height="full" paddingBottom={20}>
      <SEO
        title="About Ariel Anders"
        description="MIT roboticist, West Coast Swing creator, and consultant behind boomtick.blog."
      />
      
      <Box maxWidth="6xl" marginX="auto">
        <Stack gap={12}>
          {/* Hero Section */}
          <Grid gap={8} cols={{ base: 1, lg: 12 }} align="center">
            <Box className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Stack gap={4}>
                  <Box display="flex" align="center" gap={2}>
                    <Box height={1} width={12} surface="primary" />
                    <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest">Engineering // Artistry</Text>
                  </Box>
                  <Text as="h1" size="6xl" weight="font-black" className="leading-tight tracking-tighter">
                    Ariel Anders, <span className="text-primary italic">PhD</span>
                  </Text>
                  <Text size="lg" className="leading-relaxed text-text-body/80 max-w-2xl">
                    MIT roboticist, competitive West Coast Swing dancer, and digital consultant. 
                    I build systems that bridge the gap between technical complexity and human experience.
                  </Text>
                </Stack>
              </motion.div>
            </Box>
            <Box className="lg:col-span-5">
              <Box 
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                radius="2xl" 
                overflow="hidden" 
                border 
                className="aspect-[4/5] border-line/50 shadow-2xl relative"
              >
                <img 
                  src="/attached_assets/roboticist_1777789859029.jpg" 
                  alt="Ariel Anders" 
                  className="w-full h-full object-cover"
                />
                <Box position="absolute" bottom={4} left={4} right={4} padding={4} surface="surface" radius="xl" border className="bg-surface/80 backdrop-blur-md">
                   <Stack gap={1}>
                      <Text variant="mono" size="micro" weight="font-bold" color="brand" uppercase>Current Focus</Text>
                      <Text size="xs" weight="font-bold">Robotics // AI // Dance Analytics</Text>
                   </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Photo Gallery */}
          <Box>
            <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest" className="mb-6">Perspective // Lifestyle</Text>
            <Box display="grid" gridCols={{ base: 2, md: 4 }} gridRows={2} gap={4} className="aspect-[2/1] md:aspect-[3/1]">
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
                   className={`${photo.span} border-line/30 group cursor-crosshair`}
                 >
                   <img 
                     src={photo.url} 
                     alt={photo.alt} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                   />
                 </Box>
               ))}
            </Box>
          </Box>

          <Grid gap={12} cols={{ base: 1, lg: 12 }}>
            <Box className="lg:col-span-8">
              <Stack gap={12}>
                <section>
                  <Text as="h2" size="3xl" weight="font-black" className="mb-6 tracking-tight">The Dance Arc</Text>
                  <Text className="text-lg leading-relaxed text-text-body/80 mb-6">
                    I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and rediscovered the floor at Lindy in the Park. 
                  </Text>
                  <Text className="text-lg leading-relaxed text-text-body/80">
                    A Mission City Swing series introduced me to West Coast Swing, and it clicked immediately. The music, the connection, and the deep creative freedom of the dance made it easy to care deeply about. WCS became my main focus because it combines artistry, athleticism, and a genuinely welcoming community.
                  </Text>
                </section>

                <section>
                  <Text as="h2" size="3xl" weight="font-black" className="mb-6 tracking-tight">Work With Me</Text>
                  <Grid gap={6} cols={{ base: 1, md: 2 }}>
                    {SERVICE_CARDS.map((card) => (
                      <Box key={card.title} padding={8} border radius="2xl" surface="surface" className="border-line/50 hover:border-primary/50 transition-colors group">
                        <card.icon size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <Text weight="font-bold" size="xl" className="mb-3">{card.title}</Text>
                        <Text className="leading-relaxed text-text-body/70">{card.text}</Text>
                      </Box>
                    ))}
                  </Grid>
                </section>

                <section>
                   <Box padding={10} radius="3xl" surface="muted" border className="border-primary/20 bg-primary/5 relative overflow-hidden">
                      <Box position="absolute" top={-10} right={-10} width={40} height={40} surface="primary" opacity={0.05} radius="full" className="blur-3xl" />
                      <Stack gap={6} relative zIndex={10}>
                        <Text as="h2" size="3xl" weight="font-black">The Vision</Text>
                        <Text className="text-lg leading-relaxed text-text-body/80">
                          <span className="text-primary font-bold">boomtick.blog</span> is where I share the systems behind a sustainable WCS lifestyle. 
                          From practical travel advice and gear selection to event analysis and performance optimization. 
                          It's about finding the small efficiencies that make a big difference over a lifetime of dancing.
                        </Text>
                        <Box display="flex" gap={6} wrap>
                           <Box display="flex" align="center" gap={2}>
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <Text variant="mono" size="xs" weight="font-bold">DATA DRIVEN</Text>
                           </Box>
                           <Box display="flex" align="center" gap={2}>
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <Text variant="mono" size="xs" weight="font-bold">ARTISTICALLY CENTERED</Text>
                           </Box>
                           <Box display="flex" align="center" gap={2}>
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <Text variant="mono" size="xs" weight="font-bold">SYSTEMS FOCUSED</Text>
                           </Box>
                        </Box>
                      </Stack>
                   </Box>
                </section>
              </Stack>
            </Box>

            <Box as="aside" className="lg:col-span-4">
              <Stack gap={6} className="lg:sticky lg:top-8">
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50 shadow-xl">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" className="mb-6">Network // Connect</Text>
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
                        className="border-line/50 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                      >
                        <Box display="flex" align="center" gap={3}>
                           <item.icon size={18} className="text-text-dim group-hover:text-primary transition-colors" />
                           <Text weight="font-bold">{item.label}</Text>
                        </Box>
                        <Box className="w-2 h-2 rounded-full bg-line group-hover:bg-primary transition-colors" />
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box padding={8} border radius="2xl" surface="muted" className="border-line/50">
                   <Stack gap={4}>
                      <Box>
                         <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Education</Text>
                         <Text weight="font-bold">PhD in Computer Science, MIT</Text>
                      </Box>
                      <Box>
                         <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Dance Level</Text>
                         <Text weight="font-bold">Competitive Intermediate Follow</Text>
                      </Box>
                      <Box>
                         <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Location</Text>
                         <Text weight="font-bold">San Francisco, CA</Text>
                      </Box>
                   </Stack>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
