import { motion } from 'motion/react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { aboutPillars, photos, aboutConnectItems, aboutServiceCards } = useProfile();

  return (
    <Box as="section" className="bg-bg text-text-main">
      <SEO
        title="About Ariel Anders"
        description="About Ariel Anders, MIT roboticist, West Coast Swing creator, and consultant behind boomtick.blog."
      />
      <Box paddingX={{ base: 4, sm: 6, md: 10 }} paddingY={{ base: 6, md: 14 }}>
        <Box as="section" className="max-w-5xl">
          <Box as={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">
              Biography
            </Text>
            <Text as="h1" variant="display" size="5xl" weight="font-black" className="leading-tight text-3xl 4xl 5xl">
              Ariel Anders, PhD
            </Text>
            <Text variant="body" size="sm" className="border-b border-border leading-7 text-text-dim">
              MIT roboticist, creator of arii.github.io, and West Coast Swing writer
            </Text>
          </Box>

          <Grid cols={{ base: 1, lg: "1.4fr 0.9fr" }} gap={10} >
            <Stack className="max-w-3xl space-y-10">
              <Box as="section">
                <Text as="h2" variant="display" size="2xl" weight="font-black" >My Dance Background</Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">
                  I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into dancing at Lindy in the Park. A Mission City Swing series introduced me to West Coast Swing, and it clicked quickly — the music, the connection, and the creative feel of the dance made it easy to care deeply about. WCS became my main focus because it combines artistry, athleticism, and a genuinely welcoming community.
                </Text>
              </Box>
              <Box as="section">
                <Text as="h2" variant="display" size="2xl" weight="font-black" >Work With Me</Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">
                  I provide consulting and project-based digital execution for startups, artists, and niche brands. If you need someone who can move from strategy to delivery quickly, I’d love to talk.
                </Text>
                <Stack gap={4}>
                  {aboutServiceCards.map((card) => (
                    <Box key={card.title} className="rounded-xl border border-border/80 bg-surface shadow-sm">
                      <Box display="flex" align="center" gap={2} >
                        <card.icon size={16} className="text-accent" />
                        <Text as="h3" variant="display" size="sm" weight="font-bold">{card.title}</Text>
                      </Box>
                      <Text variant="body" size="sm" className="leading-7 text-text-dim">{card.text}</Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box as="section">
                <Text as="h2" variant="display" size="2xl" weight="font-black" >Why I Built This Site</Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">
                  boomtick.blog is where I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that actually helps, event tips, and the small optimizations that make a big difference over a season of dancing. It also serves as a clear portfolio for consulting and project-based work.
                </Text>
              </Box>
              <Box as="section">
                <Text as="h2" variant="display" size="2xl" weight="font-black" >What I Love About WCS</Text>
                <Grid cols={{ base: 1, sm: 3 }} gap={4}>
                  {aboutPillars.map((item) => (
                    <Box key={item.title} className="rounded-xl border border-border/80 bg-surface shadow-sm">
                      <item.icon size={18} className="text-accent" />
                      <Text as="h3" variant="display" size="sm" weight="font-bold" >{item.title}</Text>
                      <Text variant="body" size="sm" className="leading-7 text-text-dim">{item.text}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
              <Box as="section">
                <Text as="h2" variant="display" size="2xl" weight="font-black" >Why Clients Hire Me</Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">
                  I bring a mix of product thinking, technical execution, and clear communication. That means fewer handoffs, faster shipping, and work that stays aligned with the goal from start to finish.
                </Text>
              </Box>
              <Grid as="section" cols={{ base: 1, sm: 3 }} gap={4} >
                <Box className="rounded-xl border border-border/80 bg-surface shadow-sm">
                  <Text variant="sans" size="xs" uppercase className="tracking-widest text-text-dim">Education</Text>
                  <Text variant="body" size="sm" weight="font-semibold">PhD in Computer Science, MIT</Text>
                </Box>
                <Box className="rounded-xl border border-border/80 bg-surface shadow-sm">
                  <Text variant="sans" size="xs" uppercase className="tracking-widest text-text-dim">Focus</Text>
                  <Text variant="body" size="sm" weight="font-semibold">Robotics // AI // Data Analytics</Text>
                </Box>
                <Box className="rounded-xl border border-border/80 bg-surface shadow-sm">
                  <Text variant="sans" size="xs" uppercase className="tracking-widest text-text-dim">Dance Level</Text>
                  <Text variant="body" size="sm" weight="font-semibold">Competitive Intermediate Follow</Text>
                </Box>
              </Grid>
            </Stack>

            <Box as="aside" position="sticky" top={8} className="space-y-6">
              <Box className="rounded-xl border border-border/80 bg-surface shadow-sm">
                <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">At a glance</Text>
                <Stack gap={3} className="text-sm leading-7">
                  <Box className="text-text-dim">San Francisco, CA</Box>
                  <Box className="text-text-dim">West Coast Swing + Lindy Hop</Box>
                  <Box className="text-text-dim">Consulting + project-based work</Box>
                </Stack>
              </Box>
              <Box className="rounded-xl border border-border/80 bg-surface shadow-sm">
                <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">Connect & Networking</Text>
                <Box display="flex" wrap gap={3}>
                  {aboutConnectItems.map((item) => (
                    <Box as="a" key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" display="inline-flex" align="center" gap={2} paddingX={4} paddingY={2} className="min-h-11 rounded-full border border-border text-sm font-semibold text-text-dim transition-colors hover:border-primary/40 hover:text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" data-testid={`link-${item.label.toLowerCase()}`}>
                      <item.icon size={14} className="text-accent" />
                      {item.label}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Box as="section" >
            <Box display="flex" align="end" justify="between" >
              <Box>
                <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">Photo Gallery</Text>
                <Text as="h2" variant="display" size="2xl" weight="font-black">WCS Moments</Text>
              </Box>
            </Box>
            <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4}>
              {photos.map((photo, i) => (
                <Box key={i} className="aspect-auto overflow-hidden rounded-xl border border-border/80 bg-surface shadow-sm">
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" />
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
