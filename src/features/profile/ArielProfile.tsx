import { useMemo } from 'react';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { RoboticsPortfolioCard } from '@/components/ui/RoboticsPortfolioCard';
import { Box, Stack } from '@/layouts/Primitives';
import { STATIC_SCHEMAS } from '@/config/constants';
import { generateProfileGallerySchema } from '@/utils/schema';
import { useProfile } from './useProfile';
import ProfileStoryRow from './components/ProfileStoryRow';
import ProfileLegalAndSocial from './components/ProfileLegalAndSocial';

const ArielProfile = () => {
  const { bio } = useProfile();
  const hasHash = Boolean(window.location.hash);

  const danceBackground = bio.sections.find(s => s.id === 'dance-background');
  const stylePillar = bio.sections.find(s => s.id === 'style-expression');
  const timingPillar = bio.sections.find(s => s.id === 'timing-musicality');
  const travelPillar = bio.sections.find(s => s.id === 'financial-strategies');

  const profileSchema = useMemo(() => {
    const baseSchemas = STATIC_SCHEMAS.ABOUT(bio.name, bio.role);
    const galleryImageObjects = generateProfileGallerySchema(bio.sections);

    // Deep copy and attach gallery ImageObjects to the main Person entity's image property array
    return baseSchemas.map(s => {
      if (s["@type"] === "ProfilePage" && s.mainEntity) {
        const existingImages = Array.isArray(s.mainEntity.image)
          ? s.mainEntity.image
          : [s.mainEntity.image];

        return {
          ...s,
          mainEntity: {
            ...s.mainEntity,
            image: [...existingImages, ...galleryImageObjects]
          }
        };
      }
      return s;
    });
  }, [bio.name, bio.role, bio.sections]);

  return (
    <Box as="section" height="full" paddingBottom={{ base: 32, lg: 48 }}>
      <SEO
        title="About Ariel Anders | Roboticist & WCS Dancer"
        description="Learn about Ariel Anders, PhD: West Coast Swing dancer, roboticist, and creator of BoomTick. Discover dance lifestyle insights and robotics projects."
        type="profile"
        schema={profileSchema}
      />

      {/* 1. Page Header */}
      <PageHeader
        title={bio.name}
        description={bio.role}
      />

      {/* 2. Dance Story & Core Pillars */}
      <Stack gap={{ base: 16, lg: 24 }} marginTop={{ base: 12, lg: 16 }}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Stack gap={{ base: 20, lg: 28 }}>
            {/* Section 1: Dance Background & Site Origin (Text Left, Image Right) */}
            {danceBackground && (
              <ProfileStoryRow
                id={danceBackground.id}
                title={danceBackground.title || 'My Dance Story'}
                content={danceBackground.content}
                imageSrc={danceBackground.gallery?.[0]?.src}
                imageAlt={danceBackground.gallery?.[0]?.alt}
                caption={danceBackground.gallery?.[0]?.caption}
                reverse={false}
              />
            )}

            {/* Section 2: Core Pillar - Style & Expression (Image Left, Text Right) */}
            {stylePillar && (
              <ProfileStoryRow
                id={stylePillar.id}
                title={stylePillar.title || 'Style & Visual Expression'}
                content={stylePillar.content}
                imageSrc={stylePillar.gallery?.[0]?.src}
                imageAlt={stylePillar.gallery?.[0]?.alt}
                caption={stylePillar.gallery?.[0]?.caption}
                reverse={true}
              />
            )}

            {/* Section 3: Core Pillar - Timing & Musicality (Text Left, Image Right) */}
            {timingPillar && (
              <ProfileStoryRow
                id={timingPillar.id}
                title={timingPillar.title || 'Timing & Musicality'}
                content={timingPillar.content}
                imageSrc={timingPillar.gallery?.[0]?.src}
                imageAlt={timingPillar.gallery?.[0]?.alt}
                caption={timingPillar.gallery?.[0]?.caption}
                reverse={false}
              />
            )}

            {/* Section 4: Core Pillar - Travel & Hotel Points (Image Left, Text Right) */}
            {travelPillar && (
              <ProfileStoryRow
                id={travelPillar.id}
                title={travelPillar.title || 'Travel & Hotel Points Strategy'}
                content={travelPillar.content}
                imageSrc={travelPillar.gallery?.[0]?.src}
                imageAlt={travelPillar.gallery?.[0]?.alt}
                caption={travelPillar.gallery?.[0]?.caption}
                reverse={true}
              />
            )}
          </Stack>
        </Reveal>
      </Stack>

      {/* 3. Anchored Work & Engineering Section */}
      <Box marginTop={{ base: 20, lg: 28 }} marginBottom={{ base: 8, lg: 12 }}>
        <RoboticsPortfolioCard />
      </Box>

      {/* 4. Streamlined Footer & Legal Bar */}
      <ProfileLegalAndSocial />
    </Box>
  );
};

export default ArielProfile;
