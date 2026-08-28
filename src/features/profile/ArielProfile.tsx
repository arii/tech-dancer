import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import { ProfileLinks } from './components/ProfileComponents';

function ArielProfile() {
  const { bio } = useProfile();
  const hasHash = !!window.location.hash;

  const danceBackground = bio.sections.find(s => s.id === 'dance-background');
  const wcsLove = bio.sections.find(s => s.id === 'wcs-love');
  const whyBuilt = bio.sections.find(s => s.id === 'why-built');
  const financialStrategies = bio.sections.find(s => s.id === 'financial-strategies');
  const connectSection = bio.sections.find(s => s.id === 'connect');

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 p-5 rounded-lg border border-line/60 bg-surface/40">
        <div className="flex-1 min-w-0 space-y-1 pr-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-dim">
            Engineering &amp; Robotics Consulting
          </span>
          <p className="text-sm text-text-main leading-relaxed">
            I specialize in robotics software architecture, agentic engineering, front-end development, and technical leadership. Let's build together.
          </p>
        </div>
        <a
          href="https://arii.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2.5 rounded-md bg-text-main text-black font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
        >
          <span>Hire Me / View Portfolio →</span>
        </a>
      </div>

      <div className="space-y-16 mt-12">
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <div className="space-y-16">
            {/* 2. My Dance Background Section (Text Left, Photo Right) */}
            {danceBackground && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {danceBackground.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {danceBackground.content}
                  </p>
                </div>
                {danceBackground.gallery && danceBackground.gallery[0] && (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-line/40 bg-surface/30 shadow-md group">
                    <img
                      src={danceBackground.gallery[0].src}
                      alt={danceBackground.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 3. What I Love About WCS Section (Photo Left, 3 Feature Items Right) */}
            {wcsLove && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {wcsLove.gallery && wcsLove.gallery[0] && (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-line/40 bg-surface/30 shadow-md group order-2 lg:order-1">
                    <img
                      src={wcsLove.gallery[0].src}
                      alt={wcsLove.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="space-y-4 order-1 lg:order-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {wcsLove.title}
                  </h2>
                  <div className="space-y-3">
                    {wcsLove.items?.map((item, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-lg border border-line/40 bg-surface/30 space-y-1"
                      >
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-dim">
                          {item.title}
                        </span>
                        <p className="text-sm text-text-dim leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Why I Built This Site Section (Text Left, Photo Right) */}
            {whyBuilt && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {whyBuilt.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {whyBuilt.content}
                  </p>
                </div>
                {whyBuilt.gallery && whyBuilt.gallery[0] && (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-line/40 bg-surface/30 shadow-md group">
                    <img
                      src={whyBuilt.gallery[0].src}
                      alt={whyBuilt.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 5. Financial Strategies Section (Photo Left, Text Right) */}
            {financialStrategies && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {financialStrategies.gallery && financialStrategies.gallery[0] && (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-line/40 bg-surface/30 shadow-md group order-2 lg:order-1">
                    <img
                      src={financialStrategies.gallery[0].src}
                      alt={financialStrategies.gallery[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="space-y-4 order-1 lg:order-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-text-main">
                    {financialStrategies.title}
                  </h2>
                  <p className="text-base sm:text-lg text-text-dim leading-relaxed">
                    {financialStrategies.content}
                  </p>
                </div>
              </div>
            )}

            {/* Connect / Links */}
            {connectSection?.links && (
              <Stack gap={4} marginTop={4}>
                <Text as="h3" variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
                  Connect &amp; Social
                </Text>
                <ProfileLinks links={connectSection.links} />
              </Stack>
            )}
          </div>
        </Reveal>
      </div>

      {/* Legal & Privacy Sections - Clean spacing */}
      <Stack gap={8} marginTop={16} paddingX={4} border="t" paddingTop={12} className="border-line/20">
        <Stack id="privacy" gap={3} maxWidth="prose">
          <Text as="h2" variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="dim">
            Privacy Policy
          </Text>
          <Text variant="body" size="xs" color="dim" className="leading-relaxed opacity-80">
            This site (boomtick.blog) is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Any information provided through contact forms or newsletter signups is used solely for that purpose.
          </Text>
        </Stack>

        <Stack id="terms" gap={3} maxWidth="prose">
          <Text as="h2" variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="dim">
            Terms of Use
          </Text>
          <Text variant="body" size="xs" color="dim" className="leading-relaxed opacity-80">
            Content on this site is provided for informational and entertainment purposes. While we strive for accuracy, we are not responsible for any issues arising from the use of tools, products, or travel advice mentioned.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ArielProfile;
