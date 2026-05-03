// impeccable-ignore-file
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
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
      <Stack key={section.id} gap={4} maxWidth="[820px]" className={section.gallery ? "mt-14" : ""}>
        {section.eyebrow && (
          <Text variant="mono" size="xs" color="dim" weight="font-extrabold" className="uppercase tracking-[0.18em]" marginBottom={-2}>
            {section.eyebrow}
          </Text>
        )}

        {section.title && (
          <Text variant="display" size="[28px]" weight="font-bold" className="text-accent-navy">
            {section.title}
          </Text>
        )}

        {section.content && (
          <Text variant="body" size="[15px]" color="dim" className="leading-[1.75]">
            {section.content}
          </Text>
        )}

        {section.cards && (
          <Stack gap={3.5} marginTop={1}>
            {section.cards.map((card, index) => (
              <Box key={index} padding="[18px]" border radius="2xl" className="bg-white/[0.02] border-line/50">
                <Text as="h3" variant="display" size="xs" weight="font-bold" marginBottom={2} className="uppercase tracking-wide">
                  {card.title}
                </Text>
                <Text variant="body" size="sm" color="dim" className="leading-[1.75]">
                  {card.content}
                </Text>
              </Box>
            ))}
          </Stack>
        )}

        {section.items && (
          <Grid cols={{ base: 1, md: 3 }} gap={3.5} marginTop={1}>
            {section.items.map((item: ProfileItem, index: number) => {
              const Icon = item.icon ? IconMap[item.icon] : null;
              return (
                <Box key={index} padding="[18px]" border radius="2xl" className="bg-surface/50 border-line/50">
                  <Stack gap={Icon ? 2.5 : 2}>
                    {Icon && <Icon className="w-4 h-4 text-accent" strokeWidth={2} />}
                    {item.title && (
                      <Text as="h3" variant="mono" size="[11px]" color="dim" weight="font-bold" className="uppercase tracking-[0.16em]">
                        {item.title}
                      </Text>
                    )}
                    <Text variant="body" size="[15px]" color={Icon ? "dim" : "main"} weight={Icon ? "font-normal" : "font-normal"}>
                      {item.description}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        )}

        {section.gallery && (
          <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={3.5} marginTop={4}>
            {section.gallery.map((image, index) => (
              <Box
                key={index}
                aspect="4/5"
                overflow="hidden"
                border
                radius="2xl"
                className="border-line/50 bg-surface/50 group"
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
          <Box display="flex" gap={2.5} wrap marginTop={3}>
            {section.links.map((link) => (
              <Box
                key={link.label}
                as="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                paddingX="[14px]"
                paddingY="[10px]"
                border
                radius="full"
                className="border-line/50 hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <Text variant="mono" size="sm" weight="font-bold" color="dim" className="group-hover:text-accent">
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
      
      <Box paddingBottom="[34px]">
        <Stack gap="[18px]">
          <Text variant="mono" size="xs" color="dim" weight="font-extrabold" className="uppercase tracking-[0.18em]">
            Biography
          </Text>
          <Text as="h1" variant="headline" size="[74px]" weight="font-black" className="text-accent-navy leading-[0.96] max-w-[900px] -ml-1">
            {bio.name}
          </Text>
          {bio.role && (
            <Text variant="body" size="lg" color="dim" className="leading-[1.55] max-w-[760px] text-[18px]">
              {bio.role}
            </Text>
          )}
        </Stack>
      </Box>

      <Stack gap={10} marginTop={0}>
        <Reveal direction="up">
          <Grid cols={{ base: 1, lg: "1.4fr 0.9fr" }} gap={10}>
            <Stack gap={10}>
              {bio.sections.map(renderSection)}
            </Stack>

            <Box className="relative">
              <Stack gap={6} position="sticky" top={8}>
                <Box padding="[18px]" border radius="2xl" className="bg-surface/50 border-line/20">
                  <Stack gap={3}>
                    <Text variant="mono" size="[11px]" color="dim" weight="font-bold" className="uppercase tracking-[0.16em]">At a glance</Text>
                    <Stack gap={0}>
                      {bio.details.map((detail) => (
                        <Text key={detail.label} variant="body" size="sm" color="dim" className="leading-[1.8]">
                          {detail.value}
                        </Text>
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
