import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Star, Music, MapPin } from 'lucide-react';
import { useProfile } from './useProfile';
import { ProfileSection, ProfileItem } from './types';

const IconMap = {
  star: Star,
  music: Music,
  'map-pin': MapPin,
};

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

        {section.cards && (
          <Stack gap={6} marginTop={2}>
            {section.cards.map((card, index) => (
              <Box key={index} padding={6} border radius="xl" className="bg-surface/30 border-line/10">
                <Text as="h3" variant="display" size="lg" weight="font-bold" marginBottom={2} className="uppercase tracking-wide">
                  {card.title}
                </Text>
                <Text variant="body" size="md" color="body" className="leading-relaxed">
                  {card.content}
                </Text>
              </Box>
            ))}
          </Stack>
        )}

        {section.items && (
          <Grid cols={{ base: 1, md: 3 }} gap={4} marginTop={2}>
            {section.items.map((item: ProfileItem, index: number) => {
              const Icon = item.icon ? IconMap[item.icon] : null;
              return (
                <Box key={index} padding={6} border radius="xl" className="bg-surface/30 border-line/10">
                  <Stack gap={3}>
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                    {item.title && (
                      <Text as="h3" variant="display" size="md" weight="font-bold" className="uppercase">
                        {item.title}
                      </Text>
                    )}
                    <Text variant="body" size="sm" color="dim">
                      {item.description}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        )}

        {section.gallery && (
          <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4} marginTop={6}>
            {section.gallery.map((image, index) => (
              <Box
                key={index}
                aspect="4/5"
                overflow="hidden"
                border
                radius="xl"
                className="border-line/20 bg-surface/50 group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Box>
            ))}
          </Grid>
        )}

        {section.links && (
          <Box display="flex" gap={4} wrap marginTop={4}>
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
          <Grid cols={{ base: 1, lg: 3 }} gap={12}>
            <Stack gap={12} className="lg:col-span-2">
              {bio.sections.map(renderSection)}
            </Stack>

            <Box className="relative">
              <Stack gap={8} position="sticky" top={24}>
                <Box padding={8} border radius="xl" className="bg-surface/50 border-line/20">
                  <Stack gap={8}>
                    <Stack gap={6}>
                      <Text variant="mono" size="xs" color="brand" weight="font-bold">AT A GLANCE</Text>
                      <Stack gap={4}>
                        {bio.details.map((detail) => (
                          <Stack key={detail.label} gap={1}>
                            <Text variant="mono" size="xs" color="brand" weight="font-bold">{detail.label}</Text>
                            <Text variant="body" size="sm" color="main" weight="font-semibold">{detail.value}</Text>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>

                    <Stack gap={6} border="t" paddingTop={8} className="border-line/20">
                      <Text variant="mono" size="xs" color="brand" weight="font-bold">CONNECT & NETWORKING</Text>
                      <Box display="flex" gap={4} wrap>
                        {bio.links.map((link) => (
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
