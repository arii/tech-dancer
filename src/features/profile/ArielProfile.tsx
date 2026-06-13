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
    <Box as="section" height="full" position="relative">
      <SEO
        title="About"
        description="Ariel Anders, PhD: MIT Roboticist, WCS Tech-Dancer, and Engineer. Exploring the intersection of technology and creative movement."
      />

      {/* Sticky Anchor Nav */}
      <Box
        position="sticky"
        top={16}
        zIndex={40}
        width="full"
        surface="bg"
        border="b"
        className="bg-bg/80 backdrop-blur-md hidden lg:block"
      >
        <Stack direction="row" justify="center" gap={8} paddingY={4}>
          {['Dance', 'Work', 'Site', 'Connect'].map(section => (
            <Box
              as="a"
              key={section}
              href={`#${section.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest text-text-dim hover:text-accent transition-colors"
            >
              {section}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Hero Header */}
      <Box paddingY={16} border="b" className="border-line/20">
        <Grid cols={{ base: 1, lg: 12 }} gap={12} align="center">
           <Stack gap={6} span={{ lg: 7 }}>
              <Text variant="mono" size="xs" color="accent" weight="font-black" uppercase tracking="widest">Engineering Movement</Text>
              <Text variant="display" size="4xl" weight="font-black" leading="none">{bio.name}</Text>
              <Text variant="body" size="xl" color="dim" className="leading-relaxed text-pretty">
                {bio.role}
              </Text>
           </Stack>
           <Box span={{ lg: 5 }} display="flex" justify="center">
              <Box
                width={{ base: 64, md: 80 }}
                height={{ base: 64, md: 80 }}
                radius="full"
                border
                overflow="hidden"
                className="border-accent/20 shadow-glow relative"
              >
                <img
                  src={roboticistPhoto}
                  alt={bio.name}
                  className="w-full h-full object-cover object-center-20"
                />
                <Box position="absolute" inset className="bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />
              </Box>
           </Box>
        </Grid>
      </Box>

      <Stack gap={12} marginTop={12}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Grid cols={{ base: 1, lg: 12 }} gap={12}>
            <Stack gap={12} className="lg:col-span-8 order-2 lg:order-1">
              {bio.sections.map(renderSection)}
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
