import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import { ProfileSection } from './types';
import {
  ExperienceCards,
  ProfileItems,
  ProfileGallery,
  ProfileLinks
} from './components/ProfileComponents';

function ArielProfile() {
  const { bio } = useProfile();
  const renderSection = (section: ProfileSection) => {
    return (
      <Stack key={section.id} gap={6} maxWidth="prose">
        {section.title && (
          <Text as="h2" variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
            {section.title}
          </Text>
        )}

        {section.content && (
          <Text variant="body" size="lg" color="body" className="leading-relaxed">
            {section.content}
          </Text>
        )}

        {section.cards && <ExperienceCards cards={section.cards} />}

        {section.availability && (
          <Box padding={6} radius="md" border className="bg-accent/5 border-accent/30">
            <Text variant="body" size="base" color="accent" weight="font-medium">
              {section.availability}
            </Text>
          </Box>
        )}
        {section.items && <ProfileItems items={section.items} />}
        {section.links && <ProfileLinks links={section.links} />}
      </Stack>
    );
  };

  const hasHash = !!window.location.hash;
  const sections = bio.sections;

  return (
    <Box as="section" height="full" paddingBottom={{ base: 32, lg: 48 }}>
      <SEO
        title="About"
        description="Ariel Anders, PhD: West Coast Swing dancer, community builder, and creator of boomtick.blog. Personal site focused on dance lifestyle, travel strategies, and live web experiments."
      />

      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      {/* Primary Portfolio CTA Banner */}
      <Stack
        direction={{ base: 'col', sm: 'row' }}
        align={{ base: 'start', sm: 'center' }}
        justify="between"
        gap={4}
        marginTop={6}
        padding={4}
        radius="md"
        border
        className="bg-accent/10 border-accent/30"
      >
        <Stack gap={1}>
          <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="wider">
            Professional Engineering & Robotics Inquiries
          </Text>
          <Text variant="body" size="sm" color="main">
            For robotics software, agentic engineering, and technical leadership, please visit my official primary portfolio.
          </Text>
        </Stack>
        <Box as="a" href="https://arii.github.io" target="_blank" rel="noopener noreferrer" shrink={0}>
          <Stack direction="row" align="center" gap={1}>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" className="hover:underline">
              arii.github.io →
            </Text>
          </Stack>
        </Box>
      </Stack>

      <Stack gap={16} marginTop={10}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            {/* Main Content Area */}
            <Stack gap={12} className="lg:col-span-7">

              {/* Sections (Dance, Why, etc.) */}
              {sections.map(s => {
                // Ensure the 'connect' section links are rendered as intended instead of duplicated
                if (s.id === 'connect') return null;
                return renderSection(s);
              })}
            </Stack>

            {/* Right Column: Dynamic action visuals gallery */}
            <Box className="lg:col-span-5 relative">
              <Stack gap={6} position="sticky" top={12}>
                <ProfileGallery images={bio.sections.flatMap(s => s.gallery || [])} />
              </Stack>
            </Box>
          </Grid>
        </Reveal>
      </Stack>

      {/* Legal & Privacy Sections - Required for compliance and smoke tests */}
      <Stack gap={12} marginTop={32} paddingX={4} border="t" paddingTop={16} className="border-line/10">
        <Stack id="privacy" gap={4} maxWidth="prose">
          <Text as="h2" variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="dim">
            Privacy Policy
          </Text>
          <Text variant="body" size="xs" color="dim" className="leading-relaxed opacity-70">
            This site (boomtick.blog) is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Any information provided through contact forms or newsletter signups is used solely for that purpose.
          </Text>
        </Stack>

        <Stack id="terms" gap={4} maxWidth="prose">
          <Text as="h2" variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" color="dim">
            Terms of Use
          </Text>
          <Text variant="body" size="xs" color="dim" className="leading-relaxed opacity-70">
            Content on this site is provided for informational and entertainment purposes. While we strive for accuracy, we are not responsible for any issues arising from the use of tools, products, or travel advice mentioned.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ArielProfile;
