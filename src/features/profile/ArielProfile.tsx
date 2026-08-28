import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';

function ArielProfile() {
  const { bio } = useProfile();
  const hasHash = !!window.location.hash;

  const danceBackground = bio.sections.find(s => s.id === 'dance-background');
  const wcsLove = bio.sections.find(s => s.id === 'wcs-love');
  const whyBuilt = bio.sections.find(s => s.id === 'why-built');
  const financialStrategies = bio.sections.find(s => s.id === 'financial-strategies');

  return (
    <Box as="section" height="full" paddingBottom={{ base: 24, lg: 32 }}>
      <SEO
        title="About"
        description="Ariel Anders, PhD: West Coast Swing dancer, community builder, and creator of boomtick.blog. Personal site focused on dance lifestyle, travel strategies, and live web experiments."
      />

      {/* 1. Hero / Introduction Section (Full Width, No Photo Cluster) */}
      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      {/* Primary Portfolio CTA Banner */}
      <Box display="flex" wrap="wrap" align="start" justify="between" gap={4} marginTop={6} padding={6} radius="2xl" border className="border-brand-cyan/20 bg-gradient-to-r from-surface/90 via-brand-cyan/10 to-surface/90 backdrop-blur-md shadow-xl sm:items-center md:p-8">
        <Stack gap={2} className="max-w-2xl">
          <Box as="span" paddingX={2.5} paddingY={0.5} radius="full" border className="inline-flex items-center text-xs font-mono font-medium tracking-wider uppercase bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 w-max">
            Engineering &amp; Robotics Consulting
          </Box>
          <Text size="sm" color="dim" className="md:text-base leading-relaxed text-slate-300">
            Specializing in robotics software architecture, agentic engineering, front-end development, and technical leadership. Let's build together.
          </Text>
        </Stack>
        <a
          href="https://arii.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center whitespace-nowrap px-5 py-3 rounded-xl bg-brand-cyan text-black font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
        >
          <span>Hire Me / View Portfolio →</span>
        </a>
      </Box>

      <div className="space-y-16 mt-12">
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <div className="space-y-16">
            {/* 2. My Dance Background Section (Text Left, Photo Right) */}
            {danceBackground && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} className="items-start">
                <Stack gap={4}>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {danceBackground.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {danceBackground.content}
                  </p>
                </Stack>
                {danceBackground.gallery && danceBackground.gallery[0] && (
                  <Box width="full" overflow="hidden" radius="2xl" border className="bg-surface border-line/40 shadow-lg group aspect-square">
                    <img
                      src={danceBackground.gallery[0].src}
                      alt={danceBackground.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Box>
                )}
              </Grid>
            )}

            {/* 3. What I Love About WCS Section (Photo Left, 3 Feature Items Right) */}
            {wcsLove && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} className="items-start">
                {wcsLove.gallery && wcsLove.gallery[0] && (
                  <Box width="full" overflow="hidden" radius="2xl" border display="flex" align="center" justify="center" className="bg-surface border-line/40 shadow-lg group order-2 lg:order-1 aspect-square">
                    <img
                      src={wcsLove.gallery[0].src}
                      alt={wcsLove.gallery[0].alt}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Box>
                )}
                <Stack gap={4} className="order-1 lg:order-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {wcsLove.title}
                  </h2>
                  <Stack gap={3}>
                    {wcsLove.items?.map((item, index) => (
                      <Box
                        key={index}
                        padding={4} radius="xl" border className="border-line/60 bg-surface/40 hover:border-brand-cyan/30 transition-colors space-y-1"
                      >
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-dim">
                          {item.title}
                        </span>
                        <p className="text-sm text-text-dim leading-relaxed">
                          {item.description}
                        </p>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            )}

            {/* 4. Why I Built This Site Section (Text Left, Photo Right) */}
            {whyBuilt && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} className="items-start">
                <Stack gap={4}>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {whyBuilt.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {whyBuilt.content}
                  </p>
                </Stack>
                {whyBuilt.gallery && whyBuilt.gallery[0] && (
                  <Box width="full" overflow="hidden" radius="2xl" border className="bg-surface border-line/40 shadow-lg group aspect-square">
                    <img
                      src={whyBuilt.gallery[0].src}
                      alt={whyBuilt.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Box>
                )}
              </Grid>
            )}

            {/* 5. Financial Strategies Section (Photo Left, Text Right) */}
            {financialStrategies && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} className="items-start">
                {financialStrategies.gallery && financialStrategies.gallery[0] && (
                  <Box width="full" overflow="hidden" radius="2xl" border className="bg-surface border-line/40 shadow-lg group order-2 lg:order-1 aspect-square">
                    <img
                      src={financialStrategies.gallery[0].src}
                      alt={financialStrategies.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Box>
                )}
                <Stack gap={4} className="order-1 lg:order-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {financialStrategies.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {financialStrategies.content}
                  </p>
                </Stack>
              </Grid>
            )}

          </div>
        </Reveal>
      </div>

      {/* Legal & Privacy Sections - Clean spacing */}
      <Box as="section" maxWidth="6xl" marginX="auto" paddingX={4} marginTop={20} paddingTop={12} border="t" className="border-line/80">
        <Grid cols={{ default: 1, md: 2 }} gap={12}>

          {/* Left Column: Connect & Social */}
          <Stack gap={4}>
            <Text as="h4" variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" className="text-brand-cyan">
              Connect &amp; Social
            </Text>
            <Box display="flex" wrap gap={2.5}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
                INSTAGRAM
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
                LINKEDIN
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
                GITHUB
              </a>
            </Box>
          </Stack>

          {/* Right Column: Side-by-Side Legal Policies */}
          <Grid cols={{ default: 1, sm: 2 }} gap={6} className="text-xs text-text-dim border-t md:border-t-0 md:border-l md:border-line/40 md:pl-8 pt-8 md:pt-0">
            <div id="privacy" className="scroll-mt-24">
              <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Privacy Policy</Text>
              <p className="leading-relaxed text-text-dim">
                This site is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Form info is used solely for its intended purpose.
              </p>
            </div>
            <div id="terms" className="scroll-mt-24">
              <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Terms of Use</Text>
              <p className="leading-relaxed text-text-dim">
                Content is provided for informational and entertainment purposes. We are not responsible for issues arising from tools, products, or travel advice mentioned.
              </p>
            </div>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default ArielProfile;
