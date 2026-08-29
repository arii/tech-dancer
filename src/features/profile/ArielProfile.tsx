// impeccable-ignore-file
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { useProfile } from './useProfile';

const PortfolioCta = () => (
  <Box
    display="flex"
    wrap="wrap"
    align={{ base: "start", sm: "center" }}
    justify="between"
    gap={4}
    marginTop={6}
    padding={{ default: 6, md: 8 }}
    radius="2xl"
    border
    className="border-brand-cyan/20 bg-gradient-to-r from-surface/90 via-brand-cyan/10 to-surface/90 backdrop-blur-md shadow-xl"
  >
    <Stack gap={2} className="max-w-2xl">
      <Box
        as="span"
        display="inline-flex"
        align="center"
        paddingX={2.5}
        paddingY={0.5}
        radius="full"
        border
        className="text-xs font-mono font-medium tracking-wider uppercase bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 w-max"
      >
        Engineering &amp; Robotics Consulting
      </Box>
      <Text size="sm" color="dim" className="md:text-base leading-relaxed text-text-dim">
        Specializing in robotics software architecture, agentic engineering, front-end development, and technical leadership. Let's build together.
      </Text>
    </Stack>
    <Box
      as="a"
      href="https://arii.github.io"
      target="_blank"
      rel="noopener noreferrer"
      shrink={0}
      display="inline-flex"
      align="center"
      justify="center"
      paddingX={5}
      paddingY={3}
      radius="xl"
      className="whitespace-nowrap bg-brand-cyan text-black font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
    >
      <span>Hire Me / View Portfolio →</span>
    </Box>
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
          <Box as="a" href="https://instagram.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
            INSTAGRAM
          </Box>
          <Box as="a" href="https://linkedin.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
            LINKEDIN
          </Box>
          <Box as="a" href="https://github.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
            GITHUB
          </Box>
        </Box>
      </Stack>

      <Grid cols={{ default: 1, sm: 2 }} gap={6} paddingLeft={{ md: 8 }} paddingTop={{ default: 8, md: 0 }} className="text-xs text-text-dim border-t md:border-t-0 md:border-l md:border-line/40">
        <Box id="privacy" scrollMarginTop={24}>
          <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Privacy Policy</Text>
          <p className="leading-relaxed text-text-dim">
            This site is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Form info is used solely for its intended purpose.
          </p>
        </Box>
        <Box id="terms" scrollMarginTop={24}>
          <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Terms of Use</Text>
          <p className="leading-relaxed text-text-dim">
            Content is provided for informational and entertainment purposes. We are not responsible for issues arising from tools, products, or travel advice mentioned.
          </p>
        </Box>
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

      <Stack gap={16} marginTop={12}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Stack gap={16}>
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
                  <Grid cols={{ default: 1, md: 2 }} gap={6} align="center" className="max-w-5xl">
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
                  </Grid>
                )}
              </Stack>
            )}

            {/* 3. What I Love About WCS Section (Photo Left, 3 Feature Items Right) */}
            {wcsLove && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} align="center">
                {wcsLove.gallery && wcsLove.gallery[0] && (
                  <Box className="order-2 lg:order-1" display="flex" justify="center" width="full">
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
                  </Box>
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
              </Grid>
            )}

            {/* 4. Why I Built This Site Section (Text Left, Photo Right) */}
            {whyBuilt && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} align="center">
                <Stack gap={4}>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {whyBuilt.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {whyBuilt.content}
                  </p>
                </Stack>
                {whyBuilt.gallery && whyBuilt.gallery[0] && (
                  <Box display="flex" justify="center" width="full">
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
                  </Box>
                )}
              </Grid>
            )}

            {/* 5. Financial Strategies Section (Photo Left, Text Right) */}
            {financialStrategies && (
              <Grid cols={{ default: 1, lg: 2 }} gap={10} align="center">
                {financialStrategies.gallery && financialStrategies.gallery[0] && (
                  <Box className="order-2 lg:order-1" display="flex" justify="center" width="full">
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
          </Stack>
        </Reveal>
      </Stack>

      <LegalAndSocial />
    </Box>
  );
};

export default ArielProfile;
