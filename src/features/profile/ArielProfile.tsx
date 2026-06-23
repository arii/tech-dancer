import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
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
          <Text as="h2" variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight" balance>
            {section.title}
          </Text>
        )}

        {section.content && (
          <Text variant="body" size="lg" color="body" leading="relaxed" pretty>
            {section.content}
          </Text>
        )}

        {section.cards && <ExperienceCards cards={section.cards} />}

        {section.availability && (
          <Box padding={6} radius="lg" border surface="accent">
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
    <Box width="full" padding={6} border radius="lg" surface="alt">
      <Stack gap={6}>
        <Text variant="mono" size="sm" color="brand" weight="font-bold" uppercase tracking="widest">AT A GLANCE</Text>
        <Stack gap={4}>
          {bio.details.map((detail: ProfileDetail) => {
            const href = detail.url || (detail.value.includes('.') && !detail.value.includes(' ') ? (detail.value.startsWith('http') ? detail.value : `https://${detail.value}`) : null);

            return (
              <Stack key={detail.label} gap={1}>
                <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="wider">{detail.label}</Text>
                {href ? (
                  <Box as="a" href={href} target="_blank" rel="noopener noreferrer">
                    <Text variant="body" size="sm" color="main" weight="font-semibold" truncate hoverColor="accent">
                      {detail.value.replace('https://', '').replace('http://', '')}
                    </Text>
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
    <Box as="section" height="full">
      <SEO
        title="About"
        description="Ariel Anders, PhD: MIT Roboticist, DevAI Engineer, and West Coast Swing dancer. Expert in robotics software and agentic CI/CD pipelines."
      />

      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      <Stack gap={12} marginTop={12}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            {/* Main Content Area */}
            <Stack gap={12} span={{ base: 12, lg: 8 }} order={{ base: 2, lg: 1 }}>
              {/* Professional Section (MIT PhD, Waymo, cards, availability) */}
              {professionalSection && renderSection(professionalSection)}

              {/* Sidebar content injected here for mobile viewports */}
              <Box display={{ base: "block", lg: "none" }}>
                <Stack gap={8}>
                  {renderAtAGlance()}
                  <Box width="full" padding={6} border radius="lg" surface="alt">
                    <Stack gap={6}>
                      <Text variant="mono" size="sm" color="brand" weight="font-bold" uppercase tracking="widest">CONNECT</Text>
                      <ProfileLinks links={socialLinks} />
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              {/* Remaining Sections (Dance, Why, etc.) */}
              {otherSections.map(renderSection)}

              <Stack gap={8} marginTop={12} border="t" paddingTop={12}>
                <Stack gap={4}>
                  <Text id="privacy" variant="mono" size="sm" color="brand" weight="font-bold" scrollMarginTop={8} uppercase tracking="widest">Privacy Policy</Text>
                  <Text variant="body" size="base" color="dim" pretty>
                    We value your privacy. This site does not track personal data beyond what is necessary for functional performance.
                  </Text>
                </Stack>
                <Stack gap={4}>
                  <Text id="terms" variant="mono" size="sm" color="brand" weight="font-bold" scrollMarginTop={8} uppercase tracking="widest">Terms of Use</Text>
                  <Text variant="body" size="base" color="dim" pretty>
                    By using this site, you agree to the terms and conditions. All content is for informational purposes. Portions of this site may contain affiliate links where we earn a small commission at no extra cost to you.
                  </Text>
                </Stack>
              </Stack>
            </Stack>

            {/* Sticky Sidebar (Desktop only view for the details box) */}
            <Box span={{ base: 12, lg: 4 }} position="relative" order={{ base: 1, lg: 2 }}>
              <Stack gap={8} position="sticky" top={12} align={{ base: "center", lg: "start" }}>
                {/* Profile portrait (Always on top or as ordered) */}
                <Box
                  border
                  radius="md"
                  overflow="hidden"
                  aspect={{ base: "3/4", lg: "1/1" }}
                  surface="default"
                  width={{ base: "48", md: "56", lg: "64" }}
                  shadow="2xl"
                  borderColor="line/10"
                  position="relative"
                >
                  <Box
                    as="img"
                    src={roboticistPhoto}
                    alt="Ariel Anders, PhD - Roboticist and WCS Dancer"
                    width="full"
                    height="full"
                    objectFit="cover"
                    objectPosition="center 20%"
                  />
                </Box>

                {/* Hide these in mobile since they are now injected in the main column sequence */}
                <Box display={{ base: "none", lg: "block" }} width="full">
                  <Stack gap={8}>
                    {renderAtAGlance()}
                    <Box width="full" padding={6} border radius="lg" surface="alt">
                      <Stack gap={6}>
                        <Text variant="mono" size="sm" color="brand" weight="font-bold" uppercase tracking="widest">CONNECT</Text>
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
    </Box>
  );
}

export default ArielProfile;
