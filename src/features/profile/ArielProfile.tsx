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

export default function ArielProfile() {
  const { bio } = useProfile();

  const galleryImages = bio.sections.find(s => s.id === 'gallery')?.gallery || [];
  const featuredImages = galleryImages.filter(img => img.featured);
  const danceExtensionPhoto = featuredImages.find(img => img.alt.includes('extension'));
  const socialDancePhoto = featuredImages.find(img => img.alt.includes('MadJam'));

  const renderSection = (section: ProfileSection) => {
    const isDanceBackground = section.id === "dance-background";
    const isWhyBuilt = section.id === "why-built";

    return (
      <Stack key={section.id} gap={6} marginBottom={12} maxWidth="prose">
        {section.eyebrow && (
          <Text variant="mono" size="base" color="brand" weight="font-black" className="uppercase tracking-widest">
            {section.eyebrow}
          </Text>
        )}

          <Stack direction={{ base: 'col', md: 'row' }} gap={8} align="start">
            <Stack gap={6} flex={1}>
              {section.content && (
                <Text variant="body" size="lg" color="body" className="leading-relaxed">
                  {section.content}
                </Text>
              )}

              {section.cards && <ExperienceCards cards={section.cards} />}
              {section.items && <ProfileItems items={section.items} />}
            </Stack>

            {isDanceBackground && danceExtensionPhoto && (
              <Box width={{ base: 'full', md: '72' }} aspect="1/1" radius="xl" overflow="hidden" border className="border-line/10 shadow-md shrink-0">
                <img src={danceExtensionPhoto.src} alt={danceExtensionPhoto.alt} width={300} height={300} className="w-full h-full object-cover" />
              </Box>
            )}

            {isWhyBuilt && socialDancePhoto && (
              <Box width={{ base: 'full', md: '72' }} aspect="1/1" radius="xl" overflow="hidden" border className="border-line/10 shadow-md shrink-0">
                <img src={socialDancePhoto.src} alt={socialDancePhoto.alt} width={300} height={300} className="w-full h-full object-cover" />
              </Box>
            )}
          </Stack>

          {isDanceBackground && danceExtensionPhoto && (
            <Box width={{ base: 'full', md: '72' }} aspect="1/1" radius="xl" overflow="hidden" border className="border-line/10 shadow-md shrink-0 max-w-screen-md max-h-screen">
              <img src={danceExtensionPhoto.src} alt={danceExtensionPhoto.alt} width={300} height={300} className="w-full h-full object-cover" loading="lazy" />
            </Box>
          )}

          {isWhyBuilt && socialDancePhoto && (
            <Box width={{ base: 'full', md: '72' }} aspect="1/1" radius="xl" overflow="hidden" border className="border-line/10 shadow-md shrink-0 max-w-screen-md max-h-screen">
              <img src={socialDancePhoto.src} alt={socialDancePhoto.alt} width={300} height={300} className="w-full h-full object-cover" loading="lazy" />
            </Box>
          )}
        </Stack>
      </Box>
    );
  };

  return (
    <Box as="section" height="full">
      <SEO
        title="About"
        description="Ariel Anders, PhD: MIT Roboticist, WCS Tech-Dancer, and Engineer. Exploring the intersection of technical systems and creative movement."
      />
      
      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
        titleSize="fluid-7"
        labelSize="base"
        labelWeight="font-black"
      />

      {/* Quick Facts Bar */}
      <Box paddingY={8} border="b" className="border-line/10" marginBottom={12}>
        <Grid cols={{ base: 2, md: 4 }} gap={6}>
          {bio.details.map((detail) => (
            <Stack key={detail.label} gap={1}>
              <Text variant="mono" size="micro" color="dim" weight="font-bold" className="uppercase tracking-wider">
                {detail.label}
              </Text>
              <Text variant="body" size="sm" color="main" weight="font-semibold">
                {detail.value}
              </Text>
            </Stack>
          ))}
        </Grid>
      </Box>

      <Stack gap={0} marginTop={12}>
        <Reveal direction="up">
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            <Stack gap={0} className="lg:col-span-8">
              {bio.sections.map(renderSection)}
            </Stack>

            <Box className="lg:col-span-4 relative">
              <Stack gap={8} position="sticky" top={24}>
                {bio.portrait && (
                  <Box
                    aspect="4/5"
                    radius="xl"
                    overflow="hidden"
                    border
                    className="border-line/10 shadow-lg"
                  >
                    <img
                      src={bio.portrait.src}
                      alt={bio.portrait.alt}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover max-h-full max-w-screen-md"
                      loading="lazy"
                    />
                  </Box>
                )}

                <Box padding={8} border radius="xl" className="bg-surface/20 border-line/5">
                  <Stack gap={6}>
                    <Text variant="mono" size="base" color="brand" weight="font-black" className="uppercase tracking-widest">CONNECT</Text>
                    <ProfileLinks links={bio.links} />
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
