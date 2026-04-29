import { useMemo } from 'react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL } from '@/config/constants';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import ProfileSidebar from './ProfileSidebar';
import BioContent from './BioContent';

export default function ArielProfile() {
  const { bio } = useProfile();

  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": ["AboutPage", "ProfilePage"],
      "mainEntity": {
        "@type": "Person",
        "name": bio.name,
        "description": bio.role,
        "image": `${BASE_URL}/assets/comp_analysis_hero.webp`,
        "jobTitle": bio.role,
        "url": `${BASE_URL}/about`,
        "sameAs": [
          "https://github.com/arii",
          "https://www.linkedin.com/in/arielanders/"
        ]
      }
    };
  }, [bio]);

  return (
    <Box as="section" maxWidth="screen-2xl" marginX="auto">
      <SEO
        title="About"
        description="Learn more about tech-dancer, the roboticist's guide to the West Coast Swing. Exploring the intersection of dance, physics, and engineering."
        type="profile"
      />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <Stack gap={12}>
        <PageHeader 
          label="ABOUT TECH-DANCER"
          title={bio.name}
          description={bio.role}
        />

        <Grid cols={{ base: 1, lg: "1fr 2fr" }} gap={{ base: 8, lg: 20 }}>
          <Reveal direction="right">
            <ProfileSidebar data={bio} />
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <BioContent data={bio} />
          </Reveal>
        </Grid>
      </Stack>
    </Box>
  );
}
