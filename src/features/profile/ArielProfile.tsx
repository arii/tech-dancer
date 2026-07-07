import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SafeImage } from '@/components/ui/SafeImage';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import { ProfileSection, ProfileDetail } from './types';
import roboticistPhoto from '@/assets/roboticist.jpg';
import {
  ExperienceCards,
  ProfileItems,
  ProfileGallery,
  ProfileLinks
} from './components/ProfileComponents';

function ArielProfile() {
  const { bio } = useProfile();
  const socialLinks = bio.sections.find(s => s.id === 'connect')?.links || [];

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
        {section.gallery && <ProfileGallery images={section.gallery} />}
        {section.links && <ProfileLinks links={section.links} />}
      </Stack>
    );
  };

  const renderAtAGlance = () => (
    <Box width="full" padding={6} border radius="md" className="bg-surface/20 border-line/5">
      <Stack gap={6}>
        <Text variant="mono" size="sm" color="brand" weight="font-bold" className="uppercase tracking-widest">AT A GLANCE</Text>
        <Stack gap={4}>
          {bio.details.map((detail: ProfileDetail) => {
            const href = detail.url || (detail.value.includes('.') && !detail.value.includes(' ') ? (detail.value.startsWith('http') ? detail.value : `https://${detail.value}`) : null);

            return (
              <Stack key={detail.label} gap={1}>
                <Text variant="mono" size="micro" color="dim" weight="font-bold" className="uppercase tracking-wider">{detail.label}</Text>
                {href ? (
                  <Box as="a" href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    <Text variant="body" size="sm" color="main" weight="font-semibold" className="truncate">{detail.value.replace('https://', '').replace('http://', '')}</Text>
                  </Box>
                ) : (
                  <Text variant="body" size="sm" color="main" weight="font-semibold">{detail.value}</Text>
                )}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );

  const hasHash = !!window.location.hash;
  const professionalSection = bio.sections.find(s => s.id === 'professional');
  const otherSections = bio.sections.filter(s => s.id !== 'professional');

  return (
    <Box as="section" height="full" paddingBottom={{ base: 32, lg: 48 }}>
      <SEO
        title="About"
        description="Ariel Anders, PhD: MIT Roboticist, DevAI Engineer, and West Coast Swing dancer. Expert in robotics software and agentic CI/CD pipelines."
      />

      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      <Stack gap={16} marginTop={12}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            {/* Main Content Area */}
            <Stack gap={12} className="lg:col-span-8 order-2 lg:order-1">
              {/* Professional Section (MIT PhD, Waymo, cards, availability) */}
              {professionalSection && renderSection(professionalSection)}

              {/* Sidebar content injected here for mobile viewports */}
              <Box className="lg:hidden">
                <Stack gap={8}>
                  {renderAtAGlance()}
                  <Box width="full" padding={6} border radius="md" className="bg-surface/20 border-line/5">
                    <Stack gap={6}>
                      <Text variant="mono" size="sm" color="brand" weight="font-bold" className="uppercase tracking-widest">CONNECT</Text>
                      <ProfileLinks links={socialLinks} />
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              {/* Remaining Sections (Dance, Why, etc.) */}
              {otherSections.map(s => {
                // Ensure the 'connect' section links are rendered as intended instead of duplicated
                if (s.id === 'connect') return null;
                return renderSection(s);
              })}
            </Stack>

            {/* Sticky Sidebar (Desktop only view for the details box) */}
            <Box className="lg:col-span-4 relative order-1 lg:order-2">
              <Stack gap={8} position="sticky" top={12} align={{ base: "center", lg: "start" }}>
                {/* Profile portrait (Always on top or as ordered) */}
                <SafeImage
                  src={roboticistPhoto}
                  alt="Ariel Anders, PhD - Roboticist and WCS Dancer"
                  border
                  radius="md"
                  aspect={{ base: "3/4", lg: "1/1" }}
                  surface="default"
                  width={{ base: "48", md: "56", lg: "64" }}
                  shadow="2xl"
                  borderColor="line/10"
                  objectFit="cover"
                  objectPosition="center 20%"
                />

                {/* Hide these in mobile since they are now injected in the main column sequence */}
                <Box className="hidden lg:block w-full">
                  <Stack gap={8}>
                    {renderAtAGlance()}
                    <Box width="full" padding={6} border radius="md" className="bg-surface/20 border-line/5">
                      <Stack gap={6}>
                        <Text variant="mono" size="sm" color="brand" weight="font-bold" className="uppercase tracking-widest">CONNECT</Text>
                        <ProfileLinks links={socialLinks} />
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
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
