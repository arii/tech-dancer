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
  const whyBuilt = bio.sections.find(s => s.id === 'why-built');
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

      {/* 1. Standardized Page Header (Consistent with Blog, Gear, Merch, Research) */}
      <PageHeader
        label="BIOGRAPHY"
        title={bio.name}
        description={bio.role}
      />

      {/* 2. Robotics & Autonomous Systems Portfolio CTA Card */}
      <Box marginTop={{ base: 8, lg: 12 }} marginBottom={{ base: 8, lg: 12 }}>
        <RoboticsPortfolioCard />
      </Box>

      {/* 3. Interspersed Alternating Zigzag Story Sections with Unique Photography */}
      <Stack gap={{ base: 20, lg: 28 }} marginTop={{ base: 12, lg: 16 }}>
        <Reveal direction={hasHash ? 'none' : 'up'} delay={hasHash ? 0 : undefined}>
          <Stack gap={{ base: 24, lg: 32 }}>
            {/* Section 1: Dance Background (Text Left, Image Right) */}
            {danceBackground && (
              <ProfileStoryRow
                id={danceBackground.id}
                eyebrow={danceBackground.eyebrow}
                title={danceBackground.title || 'My Dance Background'}
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
                eyebrow={stylePillar.eyebrow}
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
                eyebrow={timingPillar.eyebrow}
                title={timingPillar.title || 'Timing & Musicality'}
                content={timingPillar.content}
                imageSrc={timingPillar.gallery?.[0]?.src}
                imageAlt={timingPillar.gallery?.[0]?.alt}
                caption={timingPillar.gallery?.[0]?.caption}
                reverse={false}
              />
            )}

            {/* Section 4: Why I Built This Site (Image Left, Text Right) */}
            {whyBuilt && (
              <ProfileStoryRow
                id={whyBuilt.id}
                eyebrow={whyBuilt.eyebrow}
                title={whyBuilt.title || 'Why I Built This Site'}
                content={whyBuilt.content}
                imageSrc={whyBuilt.gallery?.[0]?.src}
                imageAlt={whyBuilt.gallery?.[0]?.alt}
                caption={whyBuilt.gallery?.[0]?.caption}
                reverse={true}
              />
            )}

            {/* Section 5: Core Pillar - Travel & Logistics (Text Left, Image Right) */}
            {travelPillar && (
              <ProfileStoryRow
                id={travelPillar.id}
                eyebrow={travelPillar.eyebrow}
                title={travelPillar.title || 'Travel & Sustainable Logistics'}
                content={travelPillar.content}
                imageSrc={travelPillar.gallery?.[0]?.src}
                imageAlt={travelPillar.gallery?.[0]?.alt}
                caption={travelPillar.gallery?.[0]?.caption}
                reverse={false}
              />
            )}
          </Stack>
        </Reveal>
      </Stack>

      {/* 4. Legal, Terms & Social Links */}
      <ProfileLegalAndSocial />
    </Box>
  );
};

export default ArielProfile;
