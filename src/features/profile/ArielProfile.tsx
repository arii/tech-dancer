import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import { ProfileSection } from './types';
import { ExperienceCards, ProfileItems, ProfileGallery } from './components/ProfileComponents';

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
          <Text variant="display" size="2xl" weight="font-bold" className="text-accent-navy uppercase tracking-tight">
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

        {section.links && (
          <Box display="flex" gap={3} wrap marginTop={4}>
            {section.links.map((link) => (
              <Box
                key={link.label}
                as="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                paddingX={4}
                paddingY={2}
                border
                radius="full"
                className="hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
                  {link.label}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
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
      />

      <Stack gap={12} marginTop={8}>
        <Reveal direction="up">
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            <Stack gap={16} className="lg:col-span-8">
              {bio.sections.map(renderSection)}
            </Stack>

            <Box className="lg:col-span-4 relative">
              <Stack gap={8} position="sticky" top={24}>
                <Box padding={8} border radius="xl" className="bg-surface/20 border-line/5">
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
              </Stack>
            </Box>
          </Grid>
        </Reveal>
      </Stack>
    </Box>
  );
}
