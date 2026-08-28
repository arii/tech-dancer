import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { useProfile } from './useProfile';

const PortfolioCta = () => (
  <Box
    display="flex"
    wrap="wrap"
    align="start"
    justify="between"
    gap={4}
    marginTop={6}
    padding={6}
    radius="2xl"
    border
    className="border-brand-cyan/20 bg-gradient-to-r from-surface/90 via-brand-cyan/10 to-surface/90 backdrop-blur-md shadow-xl sm:items-center md:p-8"
  >
    <Stack gap={2} className="max-w-2xl">
      <Box
        as="span"
        paddingX={2.5}
        paddingY={0.5}
        radius="full"
        border
        className="inline-flex items-center text-xs font-mono font-medium tracking-wider uppercase bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 w-max"
      >
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
);

const LegalAndSocial = () => (
  <Box as="section" maxWidth="6xl" marginX="auto" paddingX={4} marginTop={20} paddingTop={12} border="t" className="border-line/80">
    <Grid cols={{ default: 1, md: 2 }} gap={12}>
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
);

const ArielProfile = () => {
  const { bio } = useProfile();
  const hasHash = Boolean(window.location.hash);

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

      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      <PortfolioCta />

      <div className="space-y-16 mt-12">
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <div className="space-y-16">
            {danceBackground && (
              <Stack gap={6}>
                <Stack gap={4} className="max-w-3xl">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {danceBackground.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {danceBackground.content}
                  </p>
                </Stack>
                {danceBackground.gallery && danceBackground.gallery.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl items-center">
                    {danceBackground.gallery.map((img, idx) => {
                      const isSquare = img.src.includes('first_comp') || idx === 1;
                      return (
                        <Box
                          key={img.src || idx}
                          width="full"
                          overflow="hidden"
                          radius="2xl"
                          border
                          className={`bg-surface border-line/40 shadow-lg group ${isSquare ? 'aspect-square max-w-md mx-auto' : 'aspect-[4/3]'}`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </Box>
                      );
                    })}
                  </div>
                )}
              </Stack>
            )}

            {/* 3. What I Love About WCS Section (Photo Left, 3 Feature Items Right) */}
            {wcsLove && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {wcsLove.gallery && wcsLove.gallery[0] && (
                  <div className="order-2 lg:order-1 flex justify-center w-full">
                    <Box
                      width="full"
                      overflow="hidden"
                      radius="2xl"
                      border
                      className="bg-surface border-line/40 shadow-lg group max-w-xs md:max-w-sm aspect-[2/3]"
                    >
                      <img
                        src={wcsLove.gallery[0].src}
                        alt={wcsLove.gallery[0].alt}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Box>
                  </div>
                )}
                <Stack gap={4} className="order-1 lg:order-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {wcsLove.title}
                  </h2>
                  <Stack gap={3}>
                    {wcsLove.items?.map((item, index) => (
                      <Box
                        key={item.title || index}
                        padding={4}
                        radius="xl"
                        border
                        className="border-line/60 bg-surface/40 hover:border-brand-cyan/30 transition-colors space-y-1"
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
              </div>
            )}

            {/* 4. Why I Built This Site Section (Text Left, Photo Right) */}
            {whyBuilt && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <Stack gap={4}>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {whyBuilt.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {whyBuilt.content}
                  </p>
                </Stack>
                {whyBuilt.gallery && whyBuilt.gallery[0] && (
                  <div className="flex justify-center w-full">
                    <Box
                      width="full"
                      overflow="hidden"
                      radius="2xl"
                      border
                      className="bg-surface border-line/40 shadow-lg group aspect-[3/2] max-w-xl"
                    >
                      <img
                        src={whyBuilt.gallery[0].src}
                        alt={whyBuilt.gallery[0].alt}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Box>
                  </div>
                )}
              </div>
            )}

            {/* 5. Financial Strategies Section (Photo Left, Text Right) */}
            {financialStrategies && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {financialStrategies.gallery && financialStrategies.gallery[0] && (
                  <div className="order-2 lg:order-1 flex justify-center w-full">
                    <Box
                      width="full"
                      overflow="hidden"
                      radius="2xl"
                      border
                      className="bg-surface border-line/40 shadow-lg group aspect-[3/2] max-w-xl"
                    >
                      <img
                        src={financialStrategies.gallery[0].src}
                        alt={financialStrategies.gallery[0].alt}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Box>
                  </div>
                )}
                <Stack gap={4} className="order-1 lg:order-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {financialStrategies.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {financialStrategies.content}
                  </p>
                </Stack>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <LegalAndSocial />
    </Box>
  );
};

export default ArielProfile;
