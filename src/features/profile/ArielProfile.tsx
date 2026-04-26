import { User } from 'lucide-react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { stroke } from '@/styles/design-tokens';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import ProfileSidebar from './ProfileSidebar';
import BioContent from './BioContent';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" maxWidth="screen-2xl" marginX="auto">
      <SEO
        title="About"
        description="Learn more about tech-dancer, the roboticist's guide to the West Coast Swing. Exploring the intersection of dance, physics, and engineering."
        type="profile"
      />
      <Stack gap={12}>
        <PageHeader 
          label="ABOUT TECH-DANCER"
          title={bio.name}
          description={bio.role}
          paddingBottom={20}
        />

        <Grid cols={{ base: 1, lg: "2fr 1fr" }} gap={{ base: 8, lg: 20 }}>
          <Stack gap={12}>
            <Reveal direction="up">
              <Box
                aspect="video"
                surface="muted"
                border
                overflow="hidden"
                display="flex"
                align="center"
                justify="center"
                width="full"
              >
                <User className={`w-24 h-24 text-text-dim ${stroke.thin}`} />
              </Box>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <BioContent data={bio} />
            </Reveal>
          </Stack>

          <Reveal direction="right" delay={0.2}>
            <ProfileSidebar data={bio} />
          </Reveal>
        </Grid>
      </Stack>
    </Box>
  );
}
