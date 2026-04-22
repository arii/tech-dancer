import { Box, Stack, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';
import ProfileSidebar from './ProfileSidebar';
import BioContent from './BioContent';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" maxWidth="screen-2xl" marginX="auto">
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
