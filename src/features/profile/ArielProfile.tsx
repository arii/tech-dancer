import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import { ProfileSection } from './types';
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
        {section.eyebrow && (
          <Text variant="mono" size="sm" color="brand" weight="font-bold" className="uppercase tracking-widest">
            {section.eyebrow}
          </Text>
        )}

        {section.title && (
          <Text variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
            {section.title}
          </Text>
        )}

        {section.content && (
          <Text variant="body" size="lg" color="body" className="leading-relaxed">
            {section.content}
          </Text>
        )}

        {section.cards && <ExperienceCards cards={section.cards} />}
        {section.items && <ProfileItems items={section.items} />}
        {section.gallery && <ProfileGallery images={section.gallery} />}
        {section.links && <ProfileLinks links={section.links} />}
      </Stack>
    );
  };

  const hasHash = !!window.location.hash;

  return (
    <Box as="section" height="full">
      <SEO
        title="About"
        description="Ariel Anders, PhD: MIT Roboticist, WCS Tech-Dancer, and Engineer. Exploring the intersection of technology and creative movement."
      />

      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      <Stack gap={12} marginTop={12}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            <Stack gap={12} className="lg:col-span-8 order-2 lg:order-1">
              {bio.sections.map(renderSection)}

              <Stack gap={8} marginTop={12} border="t" paddingTop={12}>
                <Stack gap={4}>
                  <Text id="privacy" variant="mono" size="sm" color="brand" weight="font-bold" scrollMarginTop={32} className="uppercase tracking-widest">Privacy Policy</Text>
                  <Text variant="body" size="base" color="dim">
                    We value your privacy. This site does not track personal data beyond what is necessary for functional performance. Any email addresses collected for the newsletter are kept confidential and never sold to third parties.
                  </Text>
                </Stack>
                <Stack gap={4}>
                  <Text id="terms" variant="mono" size="sm" color="brand" weight="font-bold" scrollMarginTop={32} className="uppercase tracking-widest">Terms of Use</Text>
                  <Text variant="body" size="base" color="dim">
                    By using this site, you agree to the terms and conditions. All content is for informational purposes. Portions of this site may contain affiliate links where we earn a small commission at no extra cost to you.
                  </Text>
                </Stack>
              </Stack>
            </Stack>

            <Box className="lg:col-span-4 relative order-1 lg:order-2">
              <Stack gap={8} position="sticky" top={12} align={{ base: "center", lg: "start" }}>
                {/* Profile portrait */}
                <Box
                  border
                  radius="lg"
                  overflow="hidden"
                  aspect={{ base: "3/4", lg: "1/1" }}
                  surface="default"
                  width={{ base: "48", md: "56", lg: "64" }}
                  className="shadow-2xl border-line/10 relative"
                >
                  {/* Profile photo with optimized focal point for portrait crop */}
                  <img
                    src={roboticistPhoto}
                    alt="Ariel Anders, PhD - Roboticist and WCS Dancer"
                    width={960}
                    height={949}
                    className="w-full h-full object-cover object-center-20"
                  />
                </Box>

                <Box width="full" padding={6} border radius="lg" className="bg-surface/20 border-line/5">
                  <Stack gap={6}>
                    <Text variant="mono" size="sm" color="brand" weight="font-bold" className="uppercase tracking-widest">AT A GLANCE</Text>
                    <Stack gap={4}>
                      {bio.details.map((detail) => (
                        <Stack key={detail.label} gap={1}>
                          <Text variant="mono" size="micro" color="dim" weight="font-bold" className="uppercase tracking-wider">{detail.label}</Text>
                          {detail.value.startsWith('http') ? (
                            <Box as="a" href={detail.value} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                              <Text variant="body" size="sm" color="main" weight="font-semibold" className="truncate">{detail.value.replace('https://', '')}</Text>
                            </Box>
                          ) : (
                            <Text variant="body" size="sm" color="main" weight="font-semibold">{detail.value}</Text>
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>

                <Box width="full" padding={6} border radius="lg" className="bg-surface/20 border-line/5">
                  <Stack gap={6}>
                    <Text variant="mono" size="sm" color="brand" weight="font-bold" className="uppercase tracking-widest">CONNECT</Text>
                    <ProfileLinks links={socialLinks} />
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
