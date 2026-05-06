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

export default function ArielProfile() {
  const { bio } = useProfile();

  const renderSection = (section: ProfileSection) => {
    return (
      <Stack key={section.id} gap={4} maxWidth="prose">
        {section.eyebrow && (
          <Text variant="mono" size="xs" color="brand" weight="font-bold" className="uppercase tracking-widest">
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

  return (
    <Box as="section" height="full">
      <SEO
        title="About"
        description="Ariel Anders, PhD: MIT Roboticist, WCS Tech-Dancer, and Engineer. Exploring the intersection of technical systems and creative movement."
      />
      
      <Stack gap={8} width="full">
        <PageHeader
          label="BIOGRAPHY"
          title={bio.name}
          description={bio.role}
          titleSize="fluid-7"
        />
        
        {/* Featured Portrait for immediate personal branding */}
      </Stack>

      <Stack gap={12} marginTop={8} paddingTop={{ base: 4, lg: 20 }}>
        <Reveal direction="up">
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            <Stack gap={16} className="lg:col-span-8">
              <Box display={{ base: 'block', lg: 'none' }} marginBottom={8} maxWidth="md" marginX="auto" paddingX={4}>
                <Box border radius="lg" overflow="hidden" aspect="video" surface="alt" shadow="inner">
                  <img
                    src={roboticistPhoto}
                    alt="Ariel Anders in a professional robotics environment"
                    className="w-full h-full object-cover object-top"
                  />
                </Box>
              </Box>
              {bio.sections.map(renderSection)}
            </Stack>

            <Box className="lg:col-span-4 relative">
              <Stack gap={8} position="sticky" top={24}>
                <Box border radius="lg" overflow="hidden" display={{ base: 'none', lg: 'block' }} className="border-border-standard/20 bg-surface shadow-2xl">
                  <img
                    src={roboticistPhoto}
                    alt="Portrait of Ariel Anders, PhD"
                    loading="lazy"
                    className="hover:border-accent hover:bg-accent/5 transition-all group interactive-press focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg focus-visible:outline-none"
                  />
                </Box>
                <Box padding={8} border radius="lg" className="bg-surface/20 border-border-standard/5">
                  <Stack gap={6}>
                    <Text variant="mono" size="xs" color="brand" weight="font-bold" className="uppercase tracking-widest">AT A GLANCE</Text>
                    <Stack gap={4}>
                      {bio.details.map((detail) => (
                        <Stack key={detail.label} gap={1}>
                          <Text variant="mono" size="micro" color="dim" weight="font-bold" className="uppercase tracking-wider">{detail.label}</Text>
                          <Text variant="body" size="sm" color="main" weight="font-semibold">{detail.value}</Text>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>

                <Box padding={8} border radius="lg" className="bg-surface/20 border-border-standard/5">
                  <Stack gap={6}>
                    <Text variant="mono" size="xs" color="brand" weight="font-bold" className="uppercase tracking-widest">CONNECT</Text>
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
